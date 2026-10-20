import { initializeApp } from 'firebase/app';
import {
  browserPopupRedirectResolver,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { doc, getDocFromServer, getFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {
  buildDirectGoogleOAuthUrl,
  parseGoogleAuthCallbackTokens,
} from './utils/googleAuthHelper';

declare global {
  interface Window {
    WebBooksAndroidAuth?: {
      openGoogleLogin?: (oauthUrl: string) => void;
      onAuthCallback?: (callbackUrl: string) => void;
      closeAuthDialog?: () => void;
    };
    __handleWebBooksGoogleAuthCallback?: (callbackUrl: string) => void;
  }
}

// Flexible runtime configuration supporting both environment variables and config file
const runtimeConfig = {
  apiKey:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) ||
    firebaseConfig.apiKey,
  authDomain:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) ||
    firebaseConfig.authDomain,
  projectId:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) ||
    firebaseConfig.projectId,
  storageBucket:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) ||
    firebaseConfig.storageBucket,
  messagingSenderId:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
    firebaseConfig.messagingSenderId,
  appId:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID) ||
    firebaseConfig.appId,
  firestoreDatabaseId:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_DATABASE_ID) ||
    firebaseConfig.firestoreDatabaseId,
  oAuthClientId:
    (firebaseConfig as { oAuthClientId?: string }).oAuthClientId ||
    '937406227590-6qalufn1bafkp6ifoaq20kpaof6i4a9r.apps.googleusercontent.com',
};

// Set Firestore log level to silent so background connection retries and offline states don't emit console errors
setLogLevel('silent');

const app = initializeApp(runtimeConfig);
export const db = getFirestore(app, runtimeConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const FIREBASE_PROJECT_ID = runtimeConfig.projectId;
export const FIREBASE_AUTH_DOMAIN = runtimeConfig.authDomain;
export const FIREBASE_OAUTH_CLIENT_ID = runtimeConfig.oAuthClientId;

export function getDirectGoogleOAuthUrl(): string {
  return buildDirectGoogleOAuthUrl({
    clientId: FIREBASE_OAUTH_CLIENT_ID,
    authDomain: FIREBASE_AUTH_DOMAIN,
  });
}

export async function signInWithGoogleCallbackUrlOrToken(
  rawUrlOrToken: string
): Promise<UserCredential> {
  const parsed = parseGoogleAuthCallbackTokens(rawUrlOrToken);
  if (parsed.error) {
    throw new Error(`Google OAuth error: ${parsed.error}`);
  }
  if (!parsed.accessToken && !parsed.idToken) {
    throw new Error(
      'No Google access_token or id_token found in the provided URL or token.'
    );
  }
  // Prefer access_token first because it does not require a matching sessionStorage sessionId/nonce
  if (parsed.accessToken) {
    const credential = GoogleAuthProvider.credential(null, parsed.accessToken);
    return signInWithPopupOrCredentialHelper(credential, parsed.idToken);
  }
  const credential = GoogleAuthProvider.credential(parsed.idToken);
  return signInWithCredential(auth, credential);
}

async function signInWithPopupOrCredentialHelper(
  primaryCredential: ReturnType<typeof GoogleAuthProvider.credential>,
  fallbackIdToken: string | null
): Promise<UserCredential> {
  try {
    return await signInWithCredential(auth, primaryCredential);
  } catch (err) {
    if (fallbackIdToken) {
      const backupCred = GoogleAuthProvider.credential(fallbackIdToken);
      return await signInWithCredential(auth, backupCred);
    }
    throw err;
  }
}

let pendingNativeAuthResolve: ((cred: UserCredential) => void) | null = null;
let pendingNativeAuthReject: ((err: Error) => void) | null = null;

// Proactively warm up Firebase's popup redirect resolver on startup so the hidden auth iframe
// is already initialized before the user clicks "Continue with Google"
function warmUpFirebasePopupResolver(): void {
  if (typeof window === 'undefined') return;
  try {
    const resolverInternal = browserPopupRedirectResolver as unknown as {
      _initialize?: (authInstance: typeof auth) => Promise<unknown>;
    };
    if (typeof resolverInternal._initialize === 'function') {
      resolverInternal._initialize(auth).catch(() => {
        // Ignore background warmup errors when offline
      });
    }
  } catch {
    // Ignore
  }

  // Register global callback for Native Android WebBooksJsBridge & postMessage
  window.__handleWebBooksGoogleAuthCallback = async (callbackUrl: string) => {
    try {
      const cred = await signInWithGoogleCallbackUrlOrToken(callbackUrl);
      if (pendingNativeAuthResolve) {
        pendingNativeAuthResolve(cred);
        pendingNativeAuthResolve = null;
        pendingNativeAuthReject = null;
      }
    } catch (err) {
      if (pendingNativeAuthReject) {
        pendingNativeAuthReject(
          err instanceof Error ? err : new Error(String(err))
        );
        pendingNativeAuthResolve = null;
        pendingNativeAuthReject = null;
      }
    }
  };

  window.addEventListener('message', (event) => {
    const data = event?.data;
    if (
      data &&
      typeof data === 'object' &&
      data.type === 'WEBBOOKS_GOOGLE_AUTH_CALLBACK' &&
      typeof data.url === 'string'
    ) {
      window.__handleWebBooksGoogleAuthCallback?.(data.url);
    }
  });

  // If the page itself was loaded with an OAuth #access_token= or #id_token= in the hash, consume it automatically
  if (
    window.location.hash &&
    (window.location.hash.includes('access_token=') ||
      window.location.hash.includes('id_token='))
  ) {
    const hashCopy = window.location.hash;
    try {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    } catch {
      // ignore
    }
    signInWithGoogleCallbackUrlOrToken(hashCopy).catch((e) => {
      console.warn('Auto hash sign-in notice:', e);
    });
  }
}

warmUpFirebasePopupResolver();

/**
 * Permanent cross-platform Google Sign-In handler:
 * 1. Inside Android APK (Capacitor): Uses the native in-app WebBooksAndroidAuth dialog
 *    with direct token capture, completely avoiding popup-blocked and sessionStorage missing initial state.
 * 2. Inside Web Browsers & Preview Iframes: Synchronously opens and reserves the popup window
 *    on the exact click event tick (before any async await) so popup blockers never trigger,
 *    and routes Firebase's signInWithPopup into that reserved window.
 */
export async function signInWithGooglePermanent(): Promise<UserCredential> {
  // 1. Native Android APK Bridge Path (Zero sessionStorage / Zero external browser handoff)
  if (
    typeof window !== 'undefined' &&
    window.WebBooksAndroidAuth &&
    typeof window.WebBooksAndroidAuth.openGoogleLogin === 'function'
  ) {
    const directOAuthUrl = getDirectGoogleOAuthUrl();
    return new Promise<UserCredential>((resolve, reject) => {
      pendingNativeAuthResolve = resolve;
      pendingNativeAuthReject = reject;
      window.WebBooksAndroidAuth?.openGoogleLogin?.(directOAuthUrl);
    });
  }

  // 2. Web Browser & Preview Iframe Path: Synchronous popup reservation on user click
  let reservedPopup: Window | null = null;
  const origWindowOpen =
    typeof window !== 'undefined' ? window.open.bind(window) : null;

  if (typeof window !== 'undefined' && origWindowOpen) {
    const width = 500;
    const height = 620;
    const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2));
    const features = `width=${width},height=${height},left=${left},top=${top},location=yes,resizable=yes,scrollbars=yes,status=yes`;

    try {
      reservedPopup = origWindowOpen('about:blank', 'webbooks_google_auth', features);
      if (reservedPopup && !reservedPopup.closed) {
        try {
          reservedPopup.document.write(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sign in with Google · Web Books</title></head>' +
              '<body style="background:#080d1a;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">' +
              '<div style="text-align:center;padding:24px;">' +
              '<div style="font-size:16px;font-weight:700;color:#38bdf8;margin-bottom:8px;">Connecting to Google Sign-In…</div>' +
              '<div style="font-size:13px;color:#94a3b8;">Please wait while Web Books opens the secure login prompt.</div>' +
              '</div></body></html>'
          );
          reservedPopup.document.close();
        } catch {
          // Ignore cross-origin document write errors if any
        }

        window.open = ((
          url?: string | URL,
          target?: string,
          windowFeatures?: string
        ): Window | null => {
          window.open = origWindowOpen;
          if (url && reservedPopup && !reservedPopup.closed) {
            reservedPopup.location.replace(String(url));
            try {
              reservedPopup.focus();
            } catch {
              // ignore focus error
            }
            return reservedPopup;
          }
          return origWindowOpen(url, target, windowFeatures);
        }) as typeof window.open;
      }
    } catch {
      if (origWindowOpen) {
        window.open = origWindowOpen;
      }
    }
  }

  try {
    return await signInWithPopup(
      auth,
      googleProvider,
      browserPopupRedirectResolver
    );
  } catch (err) {
    if (reservedPopup && !reservedPopup.closed) {
      try {
        reservedPopup.close();
      } catch {
        // ignore
      }
    }
    throw err;
  } finally {
    if (typeof window !== 'undefined' && origWindowOpen) {
      window.open = origWindowOpen;
    }
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never | void {
  const errMsg = error instanceof Error ? error.message : String(error);
  const lower = errMsg.toLowerCase();

  // Gracefully handle offline connectivity, network timeouts, and unreachable backend without throwing fatal unhandled errors
  if (
    lower.includes('offline') ||
    lower.includes('unavailable') ||
    lower.includes("didn't respond") ||
    lower.includes('could not reach') ||
    lower.includes('network') ||
    lower.includes('timeout')
  ) {
    console.warn(
      `[Firestore Offline] ${operationType} on ${path || 'unknown'}: ${errMsg}. Operating in local offline mode.`
    );
    return;
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    console.warn('[Firestore] Device is offline. Operating in local offline mode.');
    return;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.toLowerCase().includes('offline') ||
        error.message.toLowerCase().includes('unavailable') ||
        error.message.toLowerCase().includes("didn't respond") ||
        error.message.toLowerCase().includes('network'))
    ) {
      console.warn('Operating in offline mode or waiting for Cloud Firestore connection.');
    }
  }
}

testConnection();
