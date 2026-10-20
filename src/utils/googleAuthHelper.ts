export interface GoogleOAuthParsedTokens {
  accessToken: string | null;
  idToken: string | null;
  error: string | null;
}

export const AI_STUDIO_BUILD_GUARDRAILS_PROMPT = `[BUILD GUARDRAILS — DO NOT OVERWRITE CONFIGS]
Project: Web Books by Afeed (React 19 + TypeScript + Vite + Tailwind CSS One UI).
Targets: Android APK (Capacitor), and Windows Desktop EXE (Electron).

Strict Development Rules:
1. ONLY modify files inside the "src/" directory (components, data files, hooks, styles).
2. NEVER modify, overwrite, or delete:
   - main.cjs (Electron desktop runner)
   - capacitor.config.json (Android configuration)
   - .github/workflows/release-binaries.yml (GitHub Actions CI/CD pipeline)
3. In package.json, ALWAYS preserve:
   - "build": "vite build --base=./" (Required for local asset loading in APK & EXE)
   - "main": "main.cjs" and "type": "module"
   - "electron:dist": "electron-builder --win --x64 --publish never"
   - "build": { "appId": "com.afeed.webbooks", ... }
   - All capacitor and electron dependencies
4. Keep all asset imports and internal links relative (./) so they load seamlessly in webviews and local file systems.
5. Do NOT import Node-only desktop APIs (fs, child_process) directly inside frontend React code.
6. VERSIONING & RELEASE RULE: Do NOT update the version number during regular feature or chapter edits. ONLY update the version number (in APP_CURRENT_VERSION, FALLBACK_GITHUB_RELEASES, package.json, and Android build metadata) when I explicitly say "ready" and specify whether it is a beta/pre-release (e.g., "ready for beta" -> v1.0.3pre / 1.0.3-beta.1) or a stable release (e.g., "ready for stable" -> v1.0.3).

Now, here is what I want to change/add:
[TYPE YOUR NEW CHAPTER OR FEATURE REQUEST HERE]`;

export function buildDirectGoogleOAuthUrl(params: {
  clientId: string;
  authDomain: string;
  nonce?: string;
  state?: string;
}): string {
  const redirectUri = `https://${params.authDomain}/__/auth/handler`;
  const nonce =
    params.nonce ||
    `wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const state = params.state || `wb_state_${Date.now().toString(36)}`;

  const search = new URLSearchParams({
    client_id: params.clientId,
    redirect_uri: redirectUri,
    response_type: 'token id_token',
    scope: 'openid email profile',
    prompt: 'select_account',
    include_granted_scopes: 'true',
    nonce,
    state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${search.toString()}`;
}

export function parseGoogleAuthCallbackTokens(
  rawInput: string
): GoogleOAuthParsedTokens {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return { accessToken: null, idToken: null, error: null };
  }

  // Direct Google access token pasted (starts with ya29.)
  if (/^ya29\.[A-Za-z0-9\-_]+/.test(trimmed) && !trimmed.includes('=')) {
    return { accessToken: trimmed, idToken: null, error: null };
  }

  // Direct JWT id_token pasted (3 base64url segments separated by dots)
  if (
    /^eyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(trimmed)
  ) {
    return { accessToken: null, idToken: trimmed, error: null };
  }

  const candidateParams: URLSearchParams[] = [];

  try {
    if (trimmed.includes('#')) {
      const hashPart = trimmed.slice(trimmed.indexOf('#') + 1);
      candidateParams.push(new URLSearchParams(hashPart));
    }
    if (trimmed.includes('?')) {
      const qStart = trimmed.indexOf('?') + 1;
      const qEnd = trimmed.includes('#') ? trimmed.indexOf('#') : trimmed.length;
      if (qEnd > qStart) {
        candidateParams.push(new URLSearchParams(trimmed.slice(qStart, qEnd)));
      }
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      candidateParams.push(
        new URLSearchParams(trimmed.replace(/^[#?]/, ''))
      );
    }
  } catch {
    // fallback to regex extraction below
  }

  for (const params of candidateParams) {
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const error = params.get('error') || params.get('firebaseError');
    if (accessToken || idToken || error) {
      return {
        accessToken: accessToken ? accessToken.trim() : null,
        idToken: idToken ? idToken.trim() : null,
        error: error ? error.trim() : null,
      };
    }
  }

  // Regex fallback for partially copied URLs or text containing access_token / id_token
  const accessMatch = trimmed.match(/(?:^|[#?&])access_token=([^&#\s]+)/);
  const idMatch = trimmed.match(/(?:^|[#?&])id_token=([^&#\s]+)/);
  const errMatch = trimmed.match(/(?:^|[#?&])error=([^&#\s]+)/);

  return {
    accessToken: accessMatch ? decodeURIComponent(accessMatch[1]) : null,
    idToken: idMatch ? decodeURIComponent(idMatch[1]) : null,
    error: errMatch ? decodeURIComponent(errMatch[1]) : null,
  };
}
