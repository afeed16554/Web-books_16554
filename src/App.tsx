import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  FIREBASE_PROJECT_ID,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from './firebase';
import {
  ALL_CLASS_LEVELS,
  AppThemeMode,
  BUILT_IN_PAGES,
  buildFolderHierarchy,
  canApproveModeratorContent,
  canApproveModeratorRequests,
  canManageSecondaryAdmins,
  canModifyMainAdmin,
  canSubmitTopicContent,
  ChapterItem,
  clampViewingAreaScroll,
  computeViewingAreaCollapseState,
  CurveProfile,
  CurveRadiusPreset,
  cycleAppThemeMode,
  detectDeviceFormFactor,
  doesContentRequireApproval,
  EfficiencyOverrideMode,
  extractMainTopicsFromHtml,
  FolderNode,
  formatCleanReaderHeader,
  getChaptersForSubjectPaper,
  getSubjectPaperCards,
  getThemeAwareAccentPair,
  isAuthorizedAdminEmail,
  LibraryTopicPage,
  normalizeClassName,
  PendingTopicSubmission,
  PRIMARY_ADMIN_EMAIL,
  resolveInitialTheme,
  resolveUserRole,
  RolePermissionRequest,
  SemiChapterItem,
  shouldEnableLowEndEfficiency,
  splitSubjectsByCategory,
  SubjectPaperCard,
  APP_CURRENT_VERSION,
  AppNotificationItem,
  detectAppVariant,
  evaluateReleaseUpdateStatus,
  FALLBACK_GITHUB_RELEASES,
  GitHubReleaseInfo,
  GITHUB_RELEASES_API_URL,
  GITHUB_RELEASES_URL,
  resolveNotificationTapAction,
} from './utils/libraryCatalog';
import { Bell, BellRing } from 'lucide-react';
import {
  getAllSectionsHtml,
  getBatch5NavigationLinksHtml,
} from './utils/chemistrySections';
import {
  SettingsPage,
  SettingsSectionId,
  VisualAnimationSettings,
} from './components/SettingsPage';
import {
  WebBooksLogo,
  useSyncWebBooksFavicon,
} from './components/WebBooksLogo';
import {
  NotificationsCenter,
  dispatchSystemPushNotification,
} from './components/NotificationsCenter';

declare global {
  interface Window {
    renderMathInElement?: (
      element: HTMLElement,
      options: {
        delimiters: Array<{ left: string; right: string; display: boolean }>;
        throwOnError: boolean;
      }
    ) => void;
    togglePanel?: (panelId: string) => void;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

type ViewMode = 'home' | 'reader';
type HomeDrillStage = 'subjects' | 'chapters' | 'topics';

interface FeedbackRecord {
  id: string;
  authorUid: string;
  authorName: string;
  phoneNumber: string;
  topicId: string;
  rating: number;
  message: string;
  createdAt?: unknown;
}

const LOCAL_CUSTOM_TOPICS_KEY = 'chem_reader_custom_topics_v1';
const LOCAL_THEME_KEY = 'organic_note_theme_v1';
const LOCAL_THEME_USER_LOCKED_KEY = 'web_books_theme_user_locked_v1';
const LOCAL_FONT_SCALE_KEY = 'organic_note_font_scale_v1';
const LOCAL_STUDENT_CLASS_KEY = 'organic_note_student_class_v1';
const LOCAL_STUDENT_SCHOOL_KEY = 'organic_note_student_school_v1';
const LOCAL_STUDENT_PHONE_KEY = 'organic_note_student_phone_v1';
const LOCAL_ADMIN_EMAILS_KEY = 'organic_note_selective_admins_v1';
const LOCAL_MODERATOR_EMAILS_KEY = 'web_books_moderator_emails_v1';
const LOCAL_ROLE_REQUESTS_KEY = 'web_books_role_requests_v1';
const LOCAL_PENDING_SUBMISSIONS_KEY = 'web_books_pending_submissions_v1';
const LOCAL_EFFICIENCY_MODE_KEY = 'web_books_efficiency_mode_v1';
const LOCAL_VISUAL_SETTINGS_KEY = 'web_books_visual_settings_v1';
export const LOCAL_CURVE_PROFILE_KEY = 'web_books_curve_profile_v1';
export const LOCAL_CURVE_RADIUS_KEY = 'web_books_curve_radius_v1';

/**
 * Custom Sidebar Toggle Icon:
 * Rounded square with vertical sidebar divider and directional arrow.
 */
function SidebarToggleIcon({
  isOpen,
  className = 'w-5 h-5',
}: {
  isOpen: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3.5" width="18" height="17" rx="4" />
      <line x1="9" y1="3.5" x2="9" y2="20.5" />
      {isOpen ? (
        <path d="M15.5 9.5L12.5 12l3 2.5" />
      ) : (
        <path d="M13 9.5L16 12l-3 2.5" />
      )}
    </svg>
  );
}

/**
 * Quick Topic / Table of Contents Icon:
 * Three bullet dots on the left paired with three horizontal content bars.
 */
function QuickTopicContentIcon({
  className = 'w-5 h-5',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      <line x1="9.5" y1="6.5" x2="19.5" y2="6.5" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <line x1="9.5" y1="12" x2="19.5" y2="12" />
      <circle cx="5" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
      <line x1="9.5" y1="17.5" x2="19.5" y2="17.5" />
    </svg>
  );
}

/**
 * Filled Folder Icon
 */
function FolderIcon({
  color = '#38bdf8',
  className = 'w-5 h-5 shrink-0',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h3.9a2 2 0 0 1 1.54.72l1.22 1.48c.19.23.47.36.77.36H18A2.5 2.5 0 0 1 20.5 9v8.5A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5v-11Z" />
    </svg>
  );
}

function CloseIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function StarIcon({
  filled,
  className = 'w-3.5 h-3.5',
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function App() {
  // View state: 'home' (Progressive Drill-Down) or 'reader' (Clean textbook reader)
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  // 3-Stage Home Drill-Down: 'subjects' -> 'chapters' -> 'topics' (expanded chapter page)
  const [homeStage, setHomeStage] = useState<HomeDrillStage>('subjects');

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [foldersExpandedInSidebar, setFoldersExpandedInSidebar] =
    useState<boolean>(true);

  // Auto-detect device appearance on first start; once user changes preference, lock and remember it
  const [isThemeAutoDetect, setIsThemeAutoDetect] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_THEME_USER_LOCKED_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  // 4 Appearance Modes: 'oled' (OLED Dark #000), 'dark' (Soft Dark Slate), 'yellow' (Warm Reading), 'light' (Clean Light)
  const [theme, setTheme] = useState<AppThemeMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_THEME_KEY);
      const userLocked =
        localStorage.getItem(LOCAL_THEME_USER_LOCKED_KEY) === 'true';
      const systemPrefersDark =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : true;
      return resolveInitialTheme(saved, userLocked, systemPrefersDark);
    } catch {
      return 'oled';
    }
  });

  const handleSelectTheme = (nextMode: AppThemeMode) => {
    setTheme(nextMode);
    setIsThemeAutoDetect(false);
    try {
      localStorage.setItem(LOCAL_THEME_USER_LOCKED_KEY, 'true');
      localStorage.setItem(LOCAL_THEME_KEY, nextMode);
    } catch {
      // ignore storage errors
    }
  };

  const handleEnableThemeAutoDetect = () => {
    setIsThemeAutoDetect(true);
    const systemPrefersDark =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : true;
    const resolved: AppThemeMode = systemPrefersDark ? 'oled' : 'light';
    setTheme(resolved);
    try {
      localStorage.setItem(LOCAL_THEME_USER_LOCKED_KEY, 'false');
      localStorage.setItem(LOCAL_THEME_KEY, resolved);
    } catch {
      // ignore storage errors
    }
    showShortcutToast(
      `Auto-Detect Active (${resolved === 'oled' ? 'OLED Dark' : 'Light'})`
    );
  };

  // Listen to OS appearance changes while Auto-Detect is active
  useEffect(() => {
    if (!isThemeAutoDetect || typeof window === 'undefined' || !window.matchMedia)
      return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'oled' : 'light');
    };
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, [isThemeAutoDetect]);

  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(LOCAL_FONT_SCALE_KEY));
      if (saved >= 14 && saved <= 26) return saved;
    } catch {
      // ignore storage errors
    }
    return 18;
  });

  // Corner Curvature Profile: G2 Continuous Curve (Squircle) vs Classic G1 (Circular Arc)
  const [curveProfile, setCurveProfile] = useState<CurveProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CURVE_PROFILE_KEY);
      if (saved === 'g2' || saved === 'classic') return saved;
    } catch {
      // ignore storage errors
    }
    return 'g2'; // Default to G2 Continuous Curve for enhanced eye comfort
  });

  // Corner Radius Depth Preset ('standard' = 28px, 'deep' = 38px default, 'ultra' = 46px)
  const [curveRadiusPreset, setCurveRadiusPreset] =
    useState<CurveRadiusPreset>(() => {
      try {
        const saved = localStorage.getItem(LOCAL_CURVE_RADIUS_KEY);
        if (saved === 'standard' || saved === 'deep' || saved === 'ultra') {
          return saved;
        }
      } catch {
        // ignore storage errors
      }
      return 'deep';
    });

  // Granular Visual & Animation Management (Default: Auto-Detect)
  const [visualSettings, setVisualSettings] =
    useState<VisualAnimationSettings>(() => {
      try {
        const saved = localStorage.getItem(LOCAL_VISUAL_SETTINGS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as VisualAnimationSettings;
          if (parsed && (parsed.mode === 'auto' || parsed.mode === 'custom')) {
            return parsed;
          }
        }
      } catch {
        // ignore storage errors
      }
      return {
        mode: 'auto',
        reduceAnimation: false,
        reduceBlur: false,
        reduceTransition: false,
      };
    });

  const [allDropdownsOpen, setAllDropdownsOpen] = useState<boolean>(false);

  // Header corner popovers / full-screen Settings Page
  const [quickTopicOpen, setQuickTopicOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [settingsSection, setSettingsSection] =
    useState<SettingsSectionId>('account');
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState<boolean>(false);
  const [shortcutToast, setShortcutToast] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showShortcutToast = (msg: string) => {
    setShortcutToast(msg);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setShortcutToast(null);
    }, 1400);
  };

  // Admin / Moderator Upload Modal & Code Export Modal
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [rawCodeModalOpen, setRawCodeModalOpen] = useState<boolean>(false);

  // Custom uploaded topic pages
  const [customPages, setCustomPages] = useState<LibraryTopicPage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CUSTOM_TOPICS_KEY);
      return saved ? (JSON.parse(saved) as LibraryTopicPage[]) : [];
    } catch {
      return [];
    }
  });

  const allPages = useMemo(
    () => [...BUILT_IN_PAGES, ...customPages],
    [customPages]
  );

  // Currently selected page for the Reader (or direct Semi-Chapter when a semi-chapter is opened directly)
  const [activePageId, setActivePageId] = useState<string>(
    BUILT_IN_PAGES[0].id
  );
  const [activeSemiChapter, setActiveSemiChapter] = useState<{
    chapter: ChapterItem;
    semi: SemiChapterItem;
  } | null>(null);
  const activePage = useMemo(
    () => allPages.find((p) => p.id === activePageId) || BUILT_IN_PAGES[0],
    [allPages, activePageId]
  );

  // Student Profile fields (Phone, Optional Class, Optional School)
  // Remembered locally AND synced to Firestore /users_private/{uid} when logged in
  const [studentClass, setStudentClass] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STUDENT_CLASS_KEY) || '';
    } catch {
      return '';
    }
  });
  const [schoolName, setSchoolName] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STUDENT_SCHOOL_KEY) || '';
    } catch {
      return '';
    }
  });
  const [phoneInput, setPhoneInput] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STUDENT_PHONE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [profileSaving, setProfileSaving] = useState<boolean>(false);
  const [profileStatusMsg, setProfileStatusMsg] = useState<string>('');

  // Drill-down & Filter states: Class -> Subject + Paper -> Chapter -> Topic
  const [selectedClass, setSelectedClass] = useState<string>(() => {
    try {
      const savedClass = localStorage.getItem(LOCAL_STUDENT_CLASS_KEY);
      if (savedClass && savedClass.trim()) {
        return normalizeClassName(savedClass);
      }
    } catch {
      // ignore storage errors
    }
    return 'ALL';
  });
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedPaper, setSelectedPaper] = useState<string>('ALL');
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expanded folders in the sidebar tree (All classes 1-8, 9-10 SSC, 11-12 HSC)
  const [expandedFolderIds, setExpandedFolderIds] = useState<
    Record<string, boolean>
  >({
    'class-class-11-12-hsc': true,
    'class-11-12-hsc': true,
    'class-11-12-chem': true,
    'class-11-12-chem-2nd': true,
  });

  // Firebase Auth & 4-Tier Role Governance state (Main Admin, Secondary Admin, Moderator, Reader)
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isFirestoreAdminDoc, setIsFirestoreAdminDoc] =
    useState<boolean>(false);

  // Secondary Admin emails (Main Admin fha16554@gmail.com is always preserved at root)
  const [selectiveAdminEmails, setSelectiveAdminEmails] = useState<string[]>(
    () => {
      try {
        const saved = localStorage.getItem(LOCAL_ADMIN_EMAILS_KEY);
        return saved ? (JSON.parse(saved) as string[]) : [PRIMARY_ADMIN_EMAIL];
      } catch {
        return [PRIMARY_ADMIN_EMAIL];
      }
    }
  );

  // Approved Moderator emails (Production-ready: starts empty with no demo emails)
  const [moderatorEmails, setModeratorEmails] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_MODERATOR_EMAILS_KEY);
      if (saved) {
        const parsed = (JSON.parse(saved) as string[]).filter(
          (e) => e && e.toLowerCase() !== 'moderator.hsc@gmail.com'
        );
        localStorage.setItem(
          LOCAL_MODERATOR_EMAILS_KEY,
          JSON.stringify(parsed)
        );
        return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Role Permission Requests Queue (Moderator & Secondary Admin requests — no demo requests)
  const [roleRequests, setRoleRequests] = useState<RolePermissionRequest[]>(
    () => {
      try {
        const saved = localStorage.getItem(LOCAL_ROLE_REQUESTS_KEY);
        if (saved) {
          const parsed = (JSON.parse(saved) as RolePermissionRequest[]).filter(
            (r) =>
              r &&
              r.id !== 'req-mod-sample-1' &&
              r.applicantEmail !== 'nafis.hsc@gmail.com'
          );
          localStorage.setItem(LOCAL_ROLE_REQUESTS_KEY, JSON.stringify(parsed));
          return parsed;
        }
      } catch {
        // ignore
      }
      return [];
    }
  );

  // Pending Moderator Content Submissions Queue (Requires Main Admin or Secondary Admin approval before publishing — no demo drafts)
  const [pendingSubmissions, setPendingSubmissions] = useState<
    PendingTopicSubmission[]
  >(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PENDING_SUBMISSIONS_KEY);
      if (saved) {
        const parsed = (JSON.parse(saved) as PendingTopicSubmission[]).filter(
          (s) => s && s.id !== 'sub-mod-sample-1'
        );
        localStorage.setItem(
          LOCAL_PENDING_SUBMISSIONS_KEY,
          JSON.stringify(parsed)
        );
        return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const userRole = useMemo(
    () =>
      resolveUserRole(
        user?.email,
        selectiveAdminEmails,
        moderatorEmails,
        isFirestoreAdminDoc
      ),
    [user?.email, selectiveAdminEmails, moderatorEmails, isFirestoreAdminDoc]
  );

  const isAdminUser = useMemo(() => {
    return userRole === 'main_admin' || userRole === 'secondary_admin';
  }, [userRole]);

  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackStatusMsg, setFeedbackStatusMsg] = useState<string>('');
  const [myFeedbacks, setMyFeedbacks] = useState<FeedbackRecord[]>([]);

  // Admin / Moderator Upload / Build New Topic Page form state
  const [newPageClass, setNewPageClass] = useState<string>(
    'Class 11-12 (HSC)'
  );
  const [newPageSubject, setNewPageSubject] = useState<string>('Chemistry');
  const [newPagePaper, setNewPagePaper] = useState<string>('2nd Paper');
  const [newPageChapter, setNewPageChapter] = useState<string>(
    '2nd Chapter: Organic Chemistry'
  );
  const [newPageTitle, setNewPageTitle] = useState<string>('');
  const [newPageHtml, setNewPageHtml] = useState<string>('');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string>('');

  const readerContainerRef = useRef<HTMLDivElement | null>(null);

  // Collapsible Viewing Area scroll & manual collapse tracking
  const [scrollY, setScrollY] = useState<number>(0);
  const [manualViewingCollapsed, setManualViewingCollapsed] =
    useState<boolean>(false);
  const viewingCollapse = useMemo(() => {
    if (manualViewingCollapsed) {
      return computeViewingAreaCollapseState(150, 110);
    }
    return computeViewingAreaCollapseState(scrollY, 110);
  }, [scrollY, manualViewingCollapsed]);

  // Sync favicon with the new Web Books Globe icon across Web, Android, and iOS
  useSyncWebBooksFavicon();

  // App Variant Detection (Android APK, Windows EXE, iOS Web, Web PWA)
  const appVariant = useMemo(() => {
    if (typeof window === 'undefined') {
      return detectAppVariant('', false, false, false);
    }
    const winAny = window as unknown as {
      Capacitor?: { isNativePlatform?: () => boolean };
      process?: { versions?: { electron?: string } };
    };
    const isCap = Boolean(winAny.Capacitor?.isNativePlatform?.());
    const isElec = Boolean(winAny.process?.versions?.electron);
    const isStandalone =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(display-mode: standalone)').matches;
    return detectAppVariant(
      window.navigator.userAgent,
      isCap,
      isElec,
      isStandalone
    );
  }, []);

  // Version & GitHub Releases State
  const [releasesList, setReleasesList] = useState<GitHubReleaseInfo[]>(
    FALLBACK_GITHUB_RELEASES
  );
  const [preferPrerelease, setPreferPrerelease] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wb_prefer_prerelease_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [checkingUpdates, setCheckingUpdates] = useState<boolean>(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string>('Just now');

  useEffect(() => {
    try {
      localStorage.setItem(
        'wb_prefer_prerelease_v1',
        preferPrerelease ? 'true' : 'false'
      );
    } catch {
      // ignore
    }
  }, [preferPrerelease]);

  const releaseSummary = useMemo(
    () =>
      evaluateReleaseUpdateStatus(
        APP_CURRENT_VERSION,
        releasesList,
        preferPrerelease
      ),
    [releasesList, preferPrerelease]
  );

  // Notifications Center State (Popover, Expanded Modal, Approval Detail Dialog, Push Permission)
  const [notificationsPopoverOpen, setNotificationsPopoverOpen] =
    useState<boolean>(false);
  const [notificationsExpandedOpen, setNotificationsExpandedOpen] =
    useState<boolean>(false);
  const [activeApprovalDetail, setActiveApprovalDetail] = useState<{
    title: string;
    details: string;
    category: string;
    targetSection?: SettingsSectionId;
    targetTopicId?: string;
  } | null>(null);
  const [pushPermission, setPushPermission] = useState<
    NotificationPermission | 'unsupported'
  >(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  const [notifications, setNotifications] = useState<AppNotificationItem[]>(
    () => {
      try {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('wb_notifications_v1');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              // Strip out any legacy demo or test notifications
              return parsed.filter(
                (n: AppNotificationItem) =>
                  n &&
                  !n.id.startsWith('notif-seed-') &&
                  !n.id.startsWith('notif-release-v1.') &&
                  n.id !== 'notif-release-v1.0.1' &&
                  n.id !== 'notif-prerelease-v1.1.0-beta.1' &&
                  n.id !== 'notif-approval-role-status' &&
                  n.id !== 'wb-push-test' &&
                  !n.id.includes('demo') &&
                  !n.title?.toLowerCase().includes('demo') &&
                  !n.title?.toLowerCase().includes('test push')
              );
            }
          }
        }
      } catch {
        // ignore storage errors
      }
      return [];
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        'wb_notifications_v1',
        JSON.stringify(notifications)
      );
    } catch {
      // ignore
    }
  }, [notifications]);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const pushNotificationItem = (newItem: AppNotificationItem) => {
    setNotifications((prev) => {
      const exists = prev.some((n) => n.id === newItem.id);
      if (exists) {
        return prev.map((n) => (n.id === newItem.id ? newItem : n));
      }
      return [newItem, ...prev];
    });
    void dispatchSystemPushNotification(
      newItem.title,
      newItem.approvalSummary || newItem.message,
      newItem.id
    );
  };

  const handleRequestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showShortcutToast('System Push Notifications not supported in this frame');
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setPushPermission(perm);
      if (perm === 'granted') {
        await dispatchSystemPushNotification(
          'Web Books Notifications Enabled',
          `You will receive version updates (${releaseSummary.targetRelease.tagName}) and approval alerts on ${appVariant.shortBadge}.`,
          'wb-push-test'
        );
        showShortcutToast(`Push Notifications Active (${appVariant.shortBadge})`);
      } else {
        showShortcutToast('Push permission not granted by browser');
      }
    } catch {
      showShortcutToast('Enable Push Notifications in browser site settings');
    }
  };

  const handleCheckForUpdates = async (silent: boolean = false) => {
    if (!silent) setCheckingUpdates(true);
    try {
      const res = await fetch(GITHUB_RELEASES_API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
          const mapped: GitHubReleaseInfo[] = raw.map(
            (r: {
              tag_name?: string;
              name?: string;
              html_url?: string;
              prerelease?: boolean;
              published_at?: string;
              body?: string;
              assets?: Array<{
                name?: string;
                browser_download_url?: string;
                size?: number;
              }>;
            }) => ({
              tagName: r.tag_name || 'v1.0.1',
              name: r.name || r.tag_name || 'Release',
              htmlUrl: r.html_url || GITHUB_RELEASES_URL,
              prerelease: Boolean(r.prerelease),
              publishedAt: r.published_at || new Date().toISOString(),
              body:
                r.body ||
                'Multi-platform release for Android APK, Windows Desktop EXE, and Web.',
              assets: Array.isArray(r.assets)
                ? r.assets.map((a) => ({
                    name: a.name || 'binary',
                    browserDownloadUrl:
                      a.browser_download_url || GITHUB_RELEASES_URL,
                    sizeBytes: a.size,
                  }))
                : [],
            })
          );
          // Preserve our Pre-release Beta entry if GitHub only returned stable tags so Beta channel is always testable
          const hasBeta = mapped.some((m) => m.prerelease);
          const fallbackBeta = FALLBACK_GITHUB_RELEASES.find(
            (f) => f.prerelease
          );
          const combined =
            !hasBeta && fallbackBeta ? [...mapped, fallbackBeta] : mapped;
          setReleasesList(combined);

          const summary = evaluateReleaseUpdateStatus(
            APP_CURRENT_VERSION,
            combined,
            preferPrerelease
          );
          if (summary.hasUpdate && !silent) {
            pushNotificationItem({
              id: `notif-release-${summary.targetRelease.tagName}`,
              category: summary.isTargetPrerelease
                ? 'prerelease_update'
                : 'version_update',
              title: summary.isTargetPrerelease
                ? `Pre-release Beta ${summary.targetRelease.tagName} Available`
                : `New Version ${summary.targetRelease.tagName} Available`,
              message: `Version ${summary.targetRelease.tagName} is available on GitHub for ${appVariant.shortBadge}. Tap to update now.`,
              targetAction: 'open_version_settings',
              targetSection: 'version',
              releaseUrl: summary.releasePageUrl,
              versionTag: summary.targetRelease.tagName,
              isPrerelease: summary.isTargetPrerelease,
              createdAt: new Date().toISOString(),
              read: false,
            });
          }
        }
      }
      setLastCheckedAt(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      if (!silent) {
        showShortcutToast('Checked GitHub Releases for Updates');
      }
    } catch {
      if (!silent) {
        showShortcutToast('Using cached GitHub release metadata');
      }
    } finally {
      if (!silent) setCheckingUpdates(false);
    }
  };

  // Check GitHub releases once on mount
  useEffect(() => {
    void handleCheckForUpdates(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectNotification = (item: AppNotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    const resolution = resolveNotificationTapAction(item);

    setNotificationsPopoverOpen(false);
    setNotificationsExpandedOpen(false);

    if (resolution.redirectView === 'settings') {
      setSettingsSection(resolution.settingsSection);
      setSettingsOpen(true);
      showShortcutToast(
        resolution.settingsSection === 'version'
          ? 'Opened App Version & Updates'
          : `Opened Settings: ${resolution.settingsSection}`
      );
      return;
    }

    // For normal approval notifications: tell the user what they are approved for!
    setActiveApprovalDetail({
      title: resolution.approvalTitle,
      details: resolution.approvalDetails,
      category: item.category,
      targetSection: resolution.settingsSection,
      targetTopicId: resolution.targetTopicId,
    });
  };

  // Low-End Device Efficiency Mode ('auto' | 'enabled' | 'disabled')
  const [efficiencyMode, setEfficiencyMode] = useState<EfficiencyOverrideMode>(
    () => {
      try {
        const saved = localStorage.getItem(LOCAL_EFFICIENCY_MODE_KEY);
        if (saved === 'auto' || saved === 'enabled' || saved === 'disabled') {
          return saved;
        }
      } catch {
        // ignore storage errors
      }
      return 'auto';
    }
  );

  const isLowEndEfficiencyActive = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const nav = window.navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return shouldEnableLowEndEfficiency({
      hardwareConcurrency: nav.hardwareConcurrency,
      deviceMemory: nav.deviceMemory,
      prefersReducedMotion,
      saveData: nav.connection?.saveData,
      userOverride: efficiencyMode,
    });
  }, [efficiencyMode]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_EFFICIENCY_MODE_KEY, efficiencyMode);
    } catch {
      // ignore storage errors
    }
    document.documentElement.setAttribute(
      'data-efficiency',
      isLowEndEfficiencyActive ? 'low-end' : 'standard'
    );
  }, [efficiencyMode, isLowEndEfficiencyActive]);

  // Apply granular visual & animation reduction attributes on documentElement
  useEffect(() => {
    const effectiveReduceAnim =
      visualSettings.mode === 'auto'
        ? isLowEndEfficiencyActive
        : visualSettings.reduceAnimation;
    const effectiveReduceBlur =
      visualSettings.mode === 'auto'
        ? isLowEndEfficiencyActive
        : visualSettings.reduceBlur;
    const effectiveReduceTrans =
      visualSettings.mode === 'auto'
        ? isLowEndEfficiencyActive
        : visualSettings.reduceTransition;

    document.documentElement.setAttribute(
      'data-reduce-animation',
      effectiveReduceAnim ? 'true' : 'false'
    );
    document.documentElement.setAttribute(
      'data-reduce-blur',
      effectiveReduceBlur ? 'true' : 'false'
    );
    document.documentElement.setAttribute(
      'data-reduce-transition',
      effectiveReduceTrans ? 'true' : 'false'
    );
    try {
      localStorage.setItem(
        LOCAL_VISUAL_SETTINGS_KEY,
        JSON.stringify(visualSettings)
      );
    } catch {
      // ignore
    }
  }, [visualSettings, isLowEndEfficiencyActive]);

  // Adaptive Form Factor detection (Phone, Passport Foldable, Tablet/Book Foldable, Desktop / Large Display)
  const [viewportSize, setViewportSize] = useState<{
    width: number;
    height: number;
  }>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const deviceProfile = useMemo(
    () => detectDeviceFormFactor(viewportSize.width, viewportSize.height),
    [viewportSize.width, viewportSize.height]
  );

  // Adaptive grid columns helper for Passport Foldables, Tablets, Phones, and Desktops
  const adaptiveHomeGridClass = useMemo(() => {
    if (deviceProfile.formFactor === 'passport-foldable') {
      return 'grid grid-cols-2 gap-3.5';
    }
    if (deviceProfile.formFactor === 'phone') {
      return 'grid grid-cols-1 gap-3.5';
    }
    if (deviceProfile.formFactor === 'tablet-foldable') {
      return 'grid grid-cols-2 lg:grid-cols-3 gap-4';
    }
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4';
  }, [deviceProfile.formFactor]);

  // PWA Install Prompt & copy status states
  const [deferredInstallPrompt, setDeferredInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalledPWA, setIsInstalledPWA] = useState<boolean>(false);
  const [domainCopied, setDomainCopied] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<string>('');

  // rAF-throttled & clamped scroll listener:
  useEffect(() => {
    if (viewMode !== 'home') return;
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const rawTop =
          window.scrollY || document.documentElement.scrollTop || 0;
        const clamped = clampViewingAreaScroll(rawTop, 120);
        setScrollY((prev) => (prev === clamped ? prev : clamped));
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [viewMode]);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    setIsInstalledPWA(isStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setIsInstalledPWA(true);
      setDeferredInstallPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  // Automatically close Quick Topic popover whenever leaving the content reader
  useEffect(() => {
    if (viewMode !== 'reader') {
      setQuickTopicOpen(false);
    }
    setScrollY(0);
  }, [viewMode, homeStage]);

  // Responsive sidebar & form factor tracking on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply and persist theme (OLED Dark, Soft Dark, Warm Reading, Clean Light)
  useEffect(() => {
    const themeAttr =
      theme === 'oled'
        ? 'oled'
        : theme === 'dark'
        ? 'dark'
        : theme === 'yellow'
        ? 'reading'
        : 'light';
    document.documentElement.setAttribute('data-theme', themeAttr);
    try {
      localStorage.setItem(LOCAL_THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Apply and persist font scale
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale',
      `${fontScale}px`
    );
    try {
      localStorage.setItem(LOCAL_FONT_SCALE_KEY, String(fontScale));
    } catch {
      // ignore storage errors
    }
  }, [fontScale]);

  // Apply and persist G2 Curvature profile and Radius depth on documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-curve', curveProfile);
    try {
      localStorage.setItem(LOCAL_CURVE_PROFILE_KEY, curveProfile);
    } catch {
      // ignore storage errors
    }
  }, [curveProfile]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-curve-radius',
      curveRadiusPreset
    );
    try {
      localStorage.setItem(LOCAL_CURVE_RADIUS_KEY, curveRadiusPreset);
    } catch {
      // ignore storage errors
    }
  }, [curveRadiusPreset]);

  // Expose window.togglePanel for legacy <a class="topic-link" onclick="togglePanel('topic-panel')"> links
  useEffect(() => {
    window.togglePanel = () => {
      setQuickTopicOpen(false);
    };
    return () => {
      delete window.togglePanel;
    };
  }, []);

  // Render KaTeX math & chemistry equations (\ce{}) whenever reader content renders
  useEffect(() => {
    if (viewMode !== 'reader') return;
    const container = readerContainerRef.current;
    if (!container) return;

    const timer = window.setTimeout(() => {
      if (window.renderMathInElement && readerContainerRef.current) {
        try {
          window.renderMathInElement(readerContainerRef.current, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true },
            ],
            throwOnError: false,
          });
        } catch (err) {
          console.error('KaTeX render error:', err);
        }
      }
    }, 60);

    return () => window.clearTimeout(timer);
  }, [viewMode, activePage]);

  // Listen to Firebase Auth state & load private student profile + admin status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (currentUser) {
        // Load isolated private profile (/users_private/{uid})
        const profilePath = `users_private/${currentUser.uid}`;
        try {
          const snap = await getDoc(doc(db, 'users_private', currentUser.uid));
          if (snap.exists()) {
            const data = snap.data();
            if (typeof data.phoneNumber === 'string') {
              setPhoneInput(data.phoneNumber);
              localStorage.setItem(LOCAL_STUDENT_PHONE_KEY, data.phoneNumber);
            }
            if (typeof data.studentClass === 'string') {
              setStudentClass(data.studentClass);
              localStorage.setItem(LOCAL_STUDENT_CLASS_KEY, data.studentClass);
              if (data.studentClass.trim()) {
                setSelectedClass(normalizeClassName(data.studentClass));
              }
            }
            if (typeof data.schoolName === 'string') {
              setSchoolName(data.schoolName);
              localStorage.setItem(LOCAL_STUDENT_SCHOOL_KEY, data.schoolName);
            }
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, profilePath);
        }

        // Check selective admin document (/admins/{uid})
        try {
          const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
          setIsFirestoreAdminDoc(adminSnap.exists());
        } catch {
          setIsFirestoreAdminDoc(false);
        }
      } else {
        setIsFirestoreAdminDoc(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to user's own feedbacks and custom topics when authenticated
  useEffect(() => {
    if (!authReady || !user) {
      setMyFeedbacks([]);
      return;
    }

    const fbQuery = query(
      collection(db, 'feedbacks'),
      where('authorUid', '==', user.uid)
    );
    const unsubFb = onSnapshot(
      fbQuery,
      (snap) => {
        const items: FeedbackRecord[] = [];
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          items.push({
            id: docSnap.id,
            authorUid: String(d.authorUid || ''),
            authorName: String(d.authorName || 'Student'),
            phoneNumber: String(d.phoneNumber || ''),
            topicId: String(d.topicId || ''),
            rating: Number(d.rating || 5),
            message: String(d.message || ''),
            createdAt: d.createdAt,
          });
        });
        setMyFeedbacks(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'feedbacks');
      }
    );

    const topicsQuery = query(
      collection(db, 'custom_topics'),
      where('authorUid', '==', user.uid)
    );
    const unsubTopics = onSnapshot(
      topicsQuery,
      (snap) => {
        const loaded: LibraryTopicPage[] = [];
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          const html = String(d.sectionsHtml || '');
          loaded.push({
            id: docSnap.id,
            className: normalizeClassName(
              String(d.className || 'Class 11-12 (HSC)')
            ),
            subject: String(d.subject || 'Chemistry'),
            paper: String(d.paper || '2nd Paper'),
            chapter: String(d.chapter || 'Custom Chapter'),
            title: String(d.title || 'Custom Topic'),
            subtitle: 'Custom Uploaded Topic Page',
            updatedDate: 'Custom',
            sectionsHtml: html,
            mainTopics: extractMainTopicsFromHtml(html),
            folderColor: '#10b981',
          });
        });
        if (loaded.length > 0) {
          setCustomPages(loaded);
          try {
            localStorage.setItem(
              LOCAL_CUSTOM_TOPICS_KEY,
              JSON.stringify(loaded)
            );
          } catch {
            // ignore storage errors
          }
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'custom_topics');
      }
    );

    return () => {
      unsubFb();
      unsubTopics();
    };
  }, [authReady, user]);

  // Build Sidebar Folder Tree (Always contains ALL classes from Class 1 to 8, 9-10 SSC, 11-12 HSC)
  const folderTree = useMemo(
    () => buildFolderHierarchy(allPages),
    [allPages]
  );

  // Effective class filter for the Subjects View:
  // - 'ALL' = Global Home page (where all subjects with their class are shown + option to quickly find My Class)
  // - Specific class (e.g. 'Class 11-12 (HSC)') = Only that class's subjects are shown
  const effectiveHomeClassFilter = useMemo(() => {
    if (selectedClass !== 'ALL') return normalizeClassName(selectedClass);
    return 'ALL';
  }, [selectedClass]);

  // Stage 1: Subject + Paper cards on the Home Page, split into Section 1 (Compulsory) & Section 2 (Divisional: P, C, H.M, B)
  const subjectPaperCards = useMemo(
    () => getSubjectPaperCards(allPages, effectiveHomeClassFilter),
    [allPages, effectiveHomeClassFilter]
  );

  const groupedSubjectSections = useMemo(
    () => splitSubjectsByCategory(subjectPaperCards),
    [subjectPaperCards]
  );

  // Stage 2: Chapters list for the currently selected Subject + Paper
  const chaptersForSelectedSubject = useMemo<ChapterItem[]>(() => {
    const activeCls =
      effectiveHomeClassFilter === 'ALL'
        ? 'Class 11-12 (HSC)'
        : effectiveHomeClassFilter;
    const subj = selectedSubject === 'ALL' ? 'Chemistry' : selectedSubject;
    const pap = selectedPaper === 'ALL' ? '2nd Paper' : selectedPaper;
    return getChaptersForSubjectPaper(allPages, activeCls, subj, pap);
  }, [allPages, effectiveHomeClassFilter, selectedSubject, selectedPaper]);

  // Stage 3: Expanded Chapter object and its Topic Pages
  const activeExpandedChapter = useMemo<ChapterItem | null>(() => {
    if (selectedChapter === 'ALL') {
      return chaptersForSelectedSubject[0] || null;
    }
    return (
      chaptersForSelectedSubject.find(
        (c) => c.chapterTitle === selectedChapter
      ) ||
      chaptersForSelectedSubject[0] ||
      null
    );
  }, [chaptersForSelectedSubject, selectedChapter]);

  // Distinct filter options for Search & Filter drawer
  const classOptions = useMemo(() => ALL_CLASS_LEVELS, []);
  const subjectOptions = useMemo(() => {
    const s = new Set<string>([
      'Chemistry',
      'Physics',
      'Higher Math',
      'Biology',
      'General Science',
    ]);
    allPages.forEach((p) => s.add(p.subject));
    return Array.from(s);
  }, [allPages]);
  const paperOptions = useMemo(() => {
    const s = new Set<string>(['1st Paper', '2nd Paper', 'SSC', 'Main Paper']);
    allPages.forEach((p) => s.add(p.paper));
    return Array.from(s);
  }, [allPages]);
  const chapterOptions = useMemo(() => {
    const s = new Set<string>(['2nd Chapter: Organic Chemistry']);
    chaptersForSelectedSubject.forEach((c) => s.add(c.chapterTitle));
    allPages.forEach((p) => s.add(p.chapter));
    return Array.from(s);
  }, [allPages, chaptersForSelectedSubject]);

  // Filtered pages for Search query or Expanded Chapter view
  const filteredPages = useMemo(() => {
    return allPages.filter((page) => {
      const normPageClass = normalizeClassName(page.className);
      if (
        effectiveHomeClassFilter !== 'ALL' &&
        normPageClass !== normalizeClassName(effectiveHomeClassFilter)
      ) {
        return false;
      }
      if (selectedSubject !== 'ALL' && page.subject !== selectedSubject)
        return false;
      if (selectedPaper !== 'ALL' && page.paper !== selectedPaper) return false;
      if (selectedChapter !== 'ALL' && page.chapter !== selectedChapter)
        return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = page.title.toLowerCase().includes(q);
        const matchChapter = page.chapter.toLowerCase().includes(q);
        const matchSubject = page.subject.toLowerCase().includes(q);
        const matchTopics = page.mainTopics.some((t) =>
          t.title.toLowerCase().includes(q)
        );
        return matchTitle || matchChapter || matchSubject || matchTopics;
      }
      return true;
    });
  }, [
    allPages,
    effectiveHomeClassFilter,
    selectedSubject,
    selectedPaper,
    selectedChapter,
    searchQuery,
  ]);

  // Toggle all <details class="interactive-drop"> in the active reader view
  const handleToggleAllDropdowns = (openState: boolean) => {
    setAllDropdownsOpen(openState);
    if (!readerContainerRef.current) return;
    const detailsList = readerContainerRef.current.querySelectorAll(
      'details.interactive-drop'
    );
    detailsList.forEach((el) => {
      if (openState) {
        el.setAttribute('open', '');
      } else {
        el.removeAttribute('open');
      }
    });
  };

  // Scroll to a main topic section smoothly
  const handleSelectTopicSection = (sectionId: string, pageId?: string) => {
    setActiveSemiChapter(null);
    if (pageId) {
      setActivePageId(pageId);
    }
    setQuickTopicOpen(false);
    if (viewMode !== 'reader') {
      setViewMode('reader');
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Google Sign-In handler with actionable diagnostic messages
  const [authErrorDetails, setAuthErrorDetails] = useState<{
    code: string;
    message: string;
    actionableTip?: string;
  } | null>(null);

  const handleGoogleLogin = async () => {
    setAuthError('');
    setAuthErrorDetails(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      let tip = '';
      let code = 'auth-error';

      if (errMsg.includes('auth/unauthorized-domain')) {
        code = 'unauthorized-domain';
        tip = `Domain "${window.location.hostname}" is not yet in Firebase Auth's Authorized Domains list. Add it in Firebase Console -> Authentication -> Settings -> Authorized Domains.`;
      } else if (
        errMsg.includes('auth/popup-blocked') ||
        errMsg.includes('popup-closed-by-user')
      ) {
        code = 'popup-blocked';
        tip =
          'The login popup was blocked by the browser or preview iframe. Open the app directly in a new tab or allow popups.';
      } else if (errMsg.includes('auth/operation-not-allowed')) {
        code = 'operation-not-allowed';
        tip =
          'Google Sign-In is disabled in your Firebase project. Enable "Google" under Firebase Console -> Authentication -> Sign-in method.';
      } else if (errMsg.includes('auth/network-request-failed')) {
        code = 'network-error';
        tip = 'Network connection failed. Please verify your internet connection.';
      }

      setAuthError(errMsg);
      setAuthErrorDetails({ code, message: errMsg, actionableTip: tip });
    }
  };

  const handleLogout = async () => {
    setAuthError('');
    setAuthErrorDetails(null);
    try {
      await signOut(auth);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Sign-Out failed.');
    }
  };

  // Save Student Profile (Optional Class, Optional School, Optional Phone)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatusMsg('');
    const trimmedPhone = phoneInput.trim().slice(0, 30);
    const trimmedClass = studentClass.trim().slice(0, 60);
    const trimmedSchool = schoolName.trim().slice(0, 160);

    // Always persist locally so student class filtering works immediately
    try {
      localStorage.setItem(LOCAL_STUDENT_CLASS_KEY, trimmedClass);
      localStorage.setItem(LOCAL_STUDENT_SCHOOL_KEY, trimmedSchool);
      localStorage.setItem(LOCAL_STUDENT_PHONE_KEY, trimmedPhone);
    } catch {
      // ignore local storage errors
    }

    // Switch directly to the student's saved class so they only see their class's subjects (or Home 'ALL' if cleared)
    setSelectedClass(
      trimmedClass ? normalizeClassName(trimmedClass) : 'ALL'
    );
    setHomeStage('subjects');

    if (!user) {
      setProfileStatusMsg(
        'Profile saved on this device! Sign in with Google to sync across devices.'
      );
      return;
    }

    setProfileSaving(true);
    const path = `users_private/${user.uid}`;
    try {
      await setDoc(doc(db, 'users_private', user.uid), {
        uid: user.uid,
        displayName: (user.displayName || 'Student').slice(0, 120),
        email: (user.email || 'student@example.com').slice(0, 200),
        phoneNumber: trimmedPhone,
        studentClass: trimmedClass,
        schoolName: trimmedSchool,
        updatedAt: serverTimestamp(),
      });
      setProfileStatusMsg(
        'Profile saved and synced to Cloud Firestore (/users_private)!'
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setProfileSaving(false);
    }
  };

  // Submit Feedback to Firestore /feedbacks/{feedbackId}
  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFeedbackStatusMsg(
        'Please sign in with Google first to submit feedback.'
      );
      return;
    }
    const cleanMsg = feedbackMessage.trim();
    if (!cleanMsg) {
      setFeedbackStatusMsg('Please enter your feedback message.');
      return;
    }
    setFeedbackSubmitting(true);
    setFeedbackStatusMsg('');
    const feedbackId = `fb_${user.uid.slice(0, 12)}_${Date.now()}`;
    const path = `feedbacks/${feedbackId}`;
    try {
      await setDoc(doc(db, 'feedbacks', feedbackId), {
        authorUid: user.uid,
        authorName: (user.displayName || 'Student').slice(0, 120),
        phoneNumber: phoneInput.trim().slice(0, 30),
        topicId: activePage.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128),
        rating: Math.min(5, Math.max(1, Math.round(feedbackRating))),
        message: cleanMsg.slice(0, 2000),
        createdAt: serverTimestamp(),
      });
      setFeedbackMessage('');
      setFeedbackStatusMsg(
        'Your feedback has been submitted successfully! Thank you.'
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!user) return;
    const path = `feedbacks/${id}`;
    try {
      await deleteDoc(doc(db, 'feedbacks', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  // Admin & Moderator: Create / Submit New Topic Page
  // - If Moderator: Enters Pending Content Approval Queue first to be checked & approved by Main/Secondary Admin.
  // - If Main Admin or Secondary Admin: Publishes directly.
  const handleCreateTopicPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitTopicContent(userRole)) {
      setUploadStatusMsg(
        'Only Approved Moderators, Secondary Admins, and the Main Admin can submit topic pages.'
      );
      return;
    }
    const cleanTitle = newPageTitle.trim();
    const cleanHtml = newPageHtml.trim();
    if (!cleanTitle || !cleanHtml) {
      setUploadStatusMsg(
        'Please provide a topic title and <section class="topic-section"> HTML.'
      );
      return;
    }

    const pageId = `custom_${Date.now()}`;
    const extractedTopics = extractMainTopicsFromHtml(cleanHtml);
    const normalizedCls = normalizeClassName(newPageClass.trim());
    const newPageObj: LibraryTopicPage = {
      id: pageId,
      className: normalizedCls,
      subject: newPageSubject.trim() || 'Chemistry',
      paper: newPagePaper.trim() || '2nd Paper',
      chapter: newPageChapter.trim() || '2nd Chapter: Organic Chemistry',
      title: cleanTitle,
      subtitle: `${extractedTopics.length || 1} Main Topics`,
      updatedDate: 'Just now',
      sectionsHtml: cleanHtml,
      mainTopics:
        extractedTopics.length > 0
          ? extractedTopics
          : [{ id: 'top', title: cleanTitle }],
      folderColor: '#10b981',
    };

    // Moderator submissions require checking and approval first!
    if (doesContentRequireApproval(userRole)) {
      const submission: PendingTopicSubmission = {
        id: `sub_${Date.now()}`,
        authorUid: user?.uid || 'mod-local',
        authorEmail: user?.email || 'moderator@webbooks.app',
        authorName: user?.displayName || 'Moderator',
        authorRole: userRole,
        page: newPageObj,
        status: 'pending',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const nextQueue = [submission, ...pendingSubmissions];
      setPendingSubmissions(nextQueue);
      try {
        localStorage.setItem(
          LOCAL_PENDING_SUBMISSIONS_KEY,
          JSON.stringify(nextQueue)
        );
      } catch {
        // ignore
      }
      setNewPageTitle('');
      setNewPageHtml('');
      setUploadStatusMsg(
        'Submitted to Content Approval Queue! Main Admin or a Secondary Admin will check and approve it before publishing.'
      );
      showShortcutToast('Submitted for Admin Review');
      return;
    }

    const updatedLocal = [...customPages, newPageObj];
    setCustomPages(updatedLocal);
    try {
      localStorage.setItem(
        LOCAL_CUSTOM_TOPICS_KEY,
        JSON.stringify(updatedLocal)
      );
    } catch {
      // ignore storage error
    }

    if (user && isAdminUser) {
      const path = `custom_topics/${pageId}`;
      try {
        await setDoc(doc(db, 'custom_topics', pageId), {
          authorUid: user.uid,
          className: newPageObj.className.slice(0, 80),
          subject: newPageObj.subject.slice(0, 80),
          paper: newPageObj.paper.slice(0, 80),
          chapter: newPageObj.chapter.slice(0, 160),
          title: newPageObj.title.slice(0, 160),
          sectionsHtml: newPageObj.sectionsHtml.slice(0, 200000),
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }

    setNewPageTitle('');
    setNewPageHtml('');
    setUploadStatusMsg('New topic page added to the library successfully!');
    setActiveSemiChapter(null);
    setActivePageId(pageId);
    setUploadModalOpen(false);
    setViewMode('reader');
  };

  // =========================================================================
  // 4-TIER ROLE GOVERNANCE & CONTENT MODERATION HANDLERS
  // =========================================================================
  const handleSubmitRoleRequest = (req: {
    applicantName: string;
    applicantEmail: string;
    requestedRole: 'moderator' | 'secondary_admin';
    expertiseSubject: string;
    reason: string;
  }) => {
    const newReq: RolePermissionRequest = {
      id: `req_${Date.now()}`,
      applicantUid: user?.uid || 'guest-applicant',
      applicantName: req.applicantName,
      applicantEmail: req.applicantEmail.trim().toLowerCase(),
      requestedRole: req.requestedRole,
      expertiseSubject: req.expertiseSubject,
      reason: req.reason,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const next = [newReq, ...roleRequests];
    setRoleRequests(next);
    try {
      localStorage.setItem(LOCAL_ROLE_REQUESTS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    showShortcutToast('Permission Request Submitted');
  };

  const handleApproveRoleRequest = (requestId: string) => {
    const target = roleRequests.find((r) => r.id === requestId);
    if (!target) return;

    // Strictly ONLY Main Admin can approve Secondary Admin requests
    if (target.requestedRole === 'secondary_admin') {
      if (!canManageSecondaryAdmins(userRole, user?.email)) {
        showShortcutToast('Only Main Admin can approve Secondary Admins');
        return;
      }
      handleAddSecondaryAdminEmail(target.applicantEmail);
    } else {
      // Main Admin or Secondary Admin can approve Moderator requests
      if (!canApproveModeratorRequests(userRole)) {
        showShortcutToast('Admin permission required to approve Moderators');
        return;
      }
      handleAddModeratorEmail(target.applicantEmail);
    }

    const next = roleRequests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: 'approved' as const,
            reviewedBy: user?.email || PRIMARY_ADMIN_EMAIL,
          }
        : r
    );
    setRoleRequests(next);
    try {
      localStorage.setItem(LOCAL_ROLE_REQUESTS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    const roleLabel =
      target.requestedRole === 'secondary_admin'
        ? 'Secondary Admin'
        : 'Approved Moderator';
    pushNotificationItem({
      id: `notif-role-approved-${target.id}`,
      category: 'role_approval',
      title: `Approved: ${roleLabel} Permission`,
      message: `${target.applicantName} (${target.applicantEmail}) has been approved as ${roleLabel} for ${target.expertiseSubject}.`,
      approvalSummary: `Approved for ${roleLabel} (${target.expertiseSubject})! ${
        target.requestedRole === 'secondary_admin'
          ? 'Can now publish chapters, approve Moderator requests, and review Moderator content.'
          : 'Can now build and submit new topic notes for Admin review and publication.'
      }`,
      targetAction: 'show_approval_detail',
      targetSection: 'admin',
      createdAt: new Date().toISOString(),
      read: false,
    });
    showShortcutToast(`Approved ${target.applicantName}`);
  };

  const handleRejectRoleRequest = (requestId: string) => {
    const target = roleRequests.find((r) => r.id === requestId);
    if (!target) return;
    if (
      target.requestedRole === 'secondary_admin' &&
      !canManageSecondaryAdmins(userRole, user?.email)
    ) {
      return;
    }
    if (
      target.requestedRole === 'moderator' &&
      !canApproveModeratorRequests(userRole)
    ) {
      return;
    }
    const next = roleRequests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: 'rejected' as const,
            reviewedBy: user?.email || PRIMARY_ADMIN_EMAIL,
          }
        : r
    );
    setRoleRequests(next);
    try {
      localStorage.setItem(LOCAL_ROLE_REQUESTS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    showShortcutToast(`Declined request from ${target.applicantName}`);
  };

  // Strictly ONLY Main Admin (fha16554@gmail.com) can add or remove Secondary Admins
  const handleAddSecondaryAdminEmail = (rawEmail: string) => {
    if (!canManageSecondaryAdmins(userRole, user?.email)) return;
    const cleanEmail = rawEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    if (!selectiveAdminEmails.includes(cleanEmail)) {
      const next = [...selectiveAdminEmails, cleanEmail];
      setSelectiveAdminEmails(next);
      try {
        localStorage.setItem(LOCAL_ADMIN_EMAILS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      showShortcutToast(`Added Secondary Admin: ${cleanEmail}`);
    }
  };

  const handleRemoveSecondaryAdminEmail = (emailToRemove: string) => {
    if (!canManageSecondaryAdmins(userRole, user?.email)) return;
    if (!canModifyMainAdmin(emailToRemove)) return; // Never remove Main Admin!
    const next = selectiveAdminEmails.filter(
      (e) => e.toLowerCase() !== emailToRemove.toLowerCase()
    );
    setSelectiveAdminEmails(next);
    try {
      localStorage.setItem(LOCAL_ADMIN_EMAILS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    showShortcutToast(`Removed Secondary Admin: ${emailToRemove}`);
  };

  // Both Main Admin and Secondary Admin can add or remove Moderators
  const handleAddModeratorEmail = (rawEmail: string) => {
    if (!canApproveModeratorRequests(userRole)) return;
    const cleanEmail = rawEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    if (!moderatorEmails.includes(cleanEmail)) {
      const next = [...moderatorEmails, cleanEmail];
      setModeratorEmails(next);
      try {
        localStorage.setItem(LOCAL_MODERATOR_EMAILS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      showShortcutToast(`Added Moderator: ${cleanEmail}`);
    }
  };

  const handleRemoveModeratorEmail = (emailToRemove: string) => {
    if (!canApproveModeratorRequests(userRole)) return;
    if (!canModifyMainAdmin(emailToRemove)) return;
    const next = moderatorEmails.filter(
      (e) => e.toLowerCase() !== emailToRemove.toLowerCase()
    );
    setModeratorEmails(next);
    try {
      localStorage.setItem(LOCAL_MODERATOR_EMAILS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    showShortcutToast(`Removed Moderator: ${emailToRemove}`);
  };

  // Both Main Admin and Secondary Admin can check & approve Moderator content submissions
  const handleApprovePendingSubmission = (submissionId: string) => {
    if (!canApproveModeratorContent(userRole)) return;
    const target = pendingSubmissions.find((s) => s.id === submissionId);
    if (!target || target.status !== 'pending') return;

    const approvedPage: LibraryTopicPage = {
      ...target.page,
      updatedDate: 'Approved & Published',
    };
    const updatedLocal = [...customPages, approvedPage];
    setCustomPages(updatedLocal);
    try {
      localStorage.setItem(
        LOCAL_CUSTOM_TOPICS_KEY,
        JSON.stringify(updatedLocal)
      );
    } catch {
      // ignore
    }

    const nextQueue = pendingSubmissions.map((s) =>
      s.id === submissionId
        ? {
            ...s,
            status: 'approved' as const,
            reviewedBy: user?.email || PRIMARY_ADMIN_EMAIL,
          }
        : s
    );
    setPendingSubmissions(nextQueue);
    try {
      localStorage.setItem(
        LOCAL_PENDING_SUBMISSIONS_KEY,
        JSON.stringify(nextQueue)
      );
    } catch {
      // ignore
    }
    pushNotificationItem({
      id: `notif-content-approved-${target.id}`,
      category: 'content_approval',
      title: `Approved: "${approvedPage.title}" Published`,
      message: `Topic submission by ${target.authorName} for ${approvedPage.subject} (${approvedPage.className}) was approved and published.`,
      approvalSummary: `Your topic "${approvedPage.title}" in ${approvedPage.className} · ${approvedPage.subject} (${approvedPage.paper}) · ${approvedPage.chapter} has been checked and approved for live reading!`,
      targetAction: 'show_approval_detail',
      targetSection: 'admin',
      targetTopicId: approvedPage.id,
      createdAt: new Date().toISOString(),
      read: false,
    });
    showShortcutToast(`Approved & Published: ${approvedPage.title}`);
  };

  const handleRejectPendingSubmission = (submissionId: string) => {
    if (!canApproveModeratorContent(userRole)) return;
    const nextQueue = pendingSubmissions.map((s) =>
      s.id === submissionId
        ? {
            ...s,
            status: 'rejected' as const,
            reviewedBy: user?.email || PRIMARY_ADMIN_EMAIL,
          }
        : s
    );
    setPendingSubmissions(nextQueue);
    try {
      localStorage.setItem(
        LOCAL_PENDING_SUBMISSIONS_KEY,
        JSON.stringify(nextQueue)
      );
    } catch {
      // ignore
    }
    showShortcutToast('Submission Rejected');
  };

  const toggleFolderExpand = (folderId: string) => {
    setExpandedFolderIds((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  // Auto-collapse sidebar on mobile viewports when navigating so the page uses 100% of screen width
  const autoCloseSidebarOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Navigate to Stage 1: Subjects (either 'ALL' for Home or a specific class for My Class)
  const goToSubjectsStage = (cls: string = 'ALL') => {
    setSelectedClass(cls);
    setSelectedSubject('ALL');
    setSelectedPaper('ALL');
    setSelectedChapter('ALL');
    setActiveSemiChapter(null);
    setHomeStage('subjects');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quickly set & jump to the student's class from the Home page
  const handleQuickFindMyClass = (cls: string) => {
    if (!cls || cls === 'ALL') {
      goToSubjectsStage('ALL');
      return;
    }
    const normalized = normalizeClassName(cls);
    setStudentClass(normalized);
    try {
      localStorage.setItem(LOCAL_STUDENT_CLASS_KEY, normalized);
    } catch {
      // ignore storage errors
    }
    goToSubjectsStage(normalized);
  };

  // Navigate to Stage 2: Chapters of a Subject + Paper
  const goToChaptersStage = (
    cls: string,
    subject: string,
    paper: string = '2nd Paper'
  ) => {
    setSelectedClass(cls);
    setSelectedSubject(subject);
    setSelectedPaper(paper);
    setSelectedChapter('ALL');
    setActiveSemiChapter(null);
    setHomeStage('chapters');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Stage 3: Expanded Chapter Topics Page
  const goToExpandedChapterStage = (chapterTitle: string) => {
    setSelectedChapter(chapterTitle);
    setActiveSemiChapter(null);
    setHomeStage('topics');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Directly open a Semi-Chapter (Unit / Prose / Poetry / Grammar / Composition) into the Reader page
  const handleOpenSemiChapter = (chap: ChapterItem, semi: SemiChapterItem) => {
    setSelectedClass(chap.className);
    setSelectedSubject(chap.subject);
    setSelectedPaper(chap.paper);
    setSelectedChapter(chap.chapterTitle);
    if (semi.page) {
      setActiveSemiChapter(null);
      setActivePageId(semi.page.id);
    } else {
      setActiveSemiChapter({ chapter: chap, semi });
    }
    setViewMode('reader');
    autoCloseSidebarOnMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard Navigation Shortcuts (e.g., 's' for Search, 't' for Theme, 'h' for Home, '[' / ']' for Font Size, '?' for Shortcuts Guide)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      // Escape key behavior (always works to defocus inputs or close modals / panels)
      if (e.key === 'Escape') {
        if (isTyping) {
          (target as HTMLElement).blur();
          return;
        }
        if (shortcutsModalOpen) {
          setShortcutsModalOpen(false);
          return;
        }
        if (settingsOpen) {
          setSettingsOpen(false);
          return;
        }
        if (uploadModalOpen) {
          setUploadModalOpen(false);
          return;
        }
        if (rawCodeModalOpen) {
          setRawCodeModalOpen(false);
          return;
        }
        if (searchOpen) {
          setSearchOpen(false);
          return;
        }
        if (quickTopicOpen) {
          setQuickTopicOpen(false);
          return;
        }
        if (viewMode === 'reader') {
          setViewMode('home');
          return;
        }
        if (viewMode === 'home' && homeStage === 'topics') {
          goToChaptersStage(selectedClass, selectedSubject, selectedPaper);
          return;
        }
        if (viewMode === 'home' && homeStage === 'chapters') {
          goToSubjectsStage(selectedClass);
          return;
        }
        return;
      }

      // Do not trigger navigation shortcuts when user is typing in form fields
      if (isTyping) return;

      // Focus Search Bar: 's', '/', or 'Ctrl+K' / 'Cmd+K'
      if (
        (e.key === 's' || e.key === 'S' || e.key === '/') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setSearchOpen(true);
        setQuickTopicOpen(false);
        window.setTimeout(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }, 50);
        showShortcutToast('Search (s / /)');
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchOpen(true);
        setQuickTopicOpen(false);
        window.setTimeout(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }, 50);
        return;
      }

      // Toggle Theme: 't' or 'T' (Cycles OLED Dark -> Dark -> Warm -> Light and locks preference)
      if (
        (e.key === 't' || e.key === 'T') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setIsThemeAutoDetect(false);
        setTheme((prev) => {
          const next = cycleAppThemeMode(prev);
          try {
            localStorage.setItem(LOCAL_THEME_USER_LOCKED_KEY, 'true');
            localStorage.setItem(LOCAL_THEME_KEY, next);
          } catch {
            // ignore
          }
          const label =
            next === 'oled'
              ? 'OLED Dark (#000)'
              : next === 'dark'
              ? 'Soft Dark Mode'
              : next === 'yellow'
              ? 'Warm Reading Mode'
              : 'Clean Light Mode';
          showShortcutToast(`${label} (t)`);
          return next;
        });
        return;
      }

      // Return to Home (All Subjects): 'h' or 'H'
      if (
        (e.key === 'h' || e.key === 'H') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        goToSubjectsStage(selectedClass || 'ALL');
        showShortcutToast('Home (h)');
        return;
      }

      // Decrease Font Scale: '['
      if (e.key === '[' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setFontScale((prev) => {
          const next = Math.max(14, prev - 1);
          showShortcutToast(`Font: ${next}px ([)`);
          return next;
        });
        return;
      }

      // Increase Font Scale: ']'
      if (e.key === ']' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setFontScale((prev) => {
          const next = Math.min(26, prev + 1);
          showShortcutToast(`Font: ${next}px (])`);
          return next;
        });
        return;
      }

      // Toggle Curvature Profile: 'c' or 'C'
      if (
        (e.key === 'c' || e.key === 'C') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        setCurveProfile((prev) => {
          const next = prev === 'g2' ? 'classic' : 'g2';
          const label =
            next === 'g2'
              ? 'G2 Continuous Curve (Squircle)'
              : 'Classic G1 Curve (Circular Arc)';
          showShortcutToast(`${label} (c)`);
          return next;
        });
        return;
      }

      // Toggle Keyboard Shortcuts Modal: '?'
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
        return;
      }
    };

    // Android Capacitor & WebView hardware/gesture back button support
    const handleAndroidBackButton = (e: Event) => {
      if (e.defaultPrevented) return;
      if (shortcutsModalOpen) {
        e.preventDefault();
        setShortcutsModalOpen(false);
        return;
      }
      if (settingsOpen) {
        e.preventDefault();
        setSettingsOpen(false);
        return;
      }
      if (uploadModalOpen) {
        e.preventDefault();
        setUploadModalOpen(false);
        return;
      }
      if (rawCodeModalOpen) {
        e.preventDefault();
        setRawCodeModalOpen(false);
        return;
      }
      if (searchOpen) {
        e.preventDefault();
        setSearchOpen(false);
        return;
      }
      if (quickTopicOpen) {
        e.preventDefault();
        setQuickTopicOpen(false);
        return;
      }
      if (viewMode === 'reader') {
        e.preventDefault();
        setViewMode('home');
        return;
      }
      if (viewMode === 'home' && homeStage === 'topics') {
        e.preventDefault();
        goToChaptersStage(selectedClass, selectedSubject, selectedPaper);
        return;
      }
      if (viewMode === 'home' && homeStage === 'chapters') {
        e.preventDefault();
        goToSubjectsStage(selectedClass);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('backbutton', handleAndroidBackButton);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('backbutton', handleAndroidBackButton);
    };
  }, [
    shortcutsModalOpen,
    settingsOpen,
    uploadModalOpen,
    rawCodeModalOpen,
    searchOpen,
    quickTopicOpen,
    viewMode,
    homeStage,
    selectedSubject,
    selectedPaper,
    selectedClass,
    curveProfile,
  ]);

  // Recursive Folder Tree renderer in Sidebar (all classes 1 to 12)
  const renderFolderTree = (
    nodes: FolderNode[],
    depth = 0,
    parentContext: { className?: string; subject?: string; paper?: string } = {}
  ) => {
    return nodes.map((node) => {
      const isExpanded = !!expandedFolderIds[node.id];
      const paddingLeft = depth * 12 + 12;
      const hasNested = node.children.length > 0 || node.pages.length > 0;

      const currentContext = {
        className:
          node.level === 'class' ? node.name : parentContext.className,
        subject:
          node.level === 'subject' ? node.name : parentContext.subject,
        paper: node.level === 'paper' ? node.name : parentContext.paper,
      };

      return (
        <div key={node.id} className="select-none">
          <button
            type="button"
            onClick={() => {
              if (hasNested) {
                toggleFolderExpand(node.id);
              }
              if (node.level === 'class') {
                goToSubjectsStage(node.name);
              } else if (node.level === 'subject') {
                const defaultPaper = node.children[0]?.name || '1st Paper';
                goToChaptersStage(
                  currentContext.className || 'Class 11-12 (HSC)',
                  node.name,
                  defaultPaper
                );
              } else if (node.level === 'paper') {
                goToChaptersStage(
                  currentContext.className || 'Class 11-12 (HSC)',
                  currentContext.subject || 'Chemistry',
                  node.name
                );
              } else if (node.level === 'chapter') {
                setSelectedClass(
                  currentContext.className || 'Class 11-12 (HSC)'
                );
                setSelectedSubject(currentContext.subject || 'Chemistry');
                setSelectedPaper(currentContext.paper || '2nd Paper');
                goToExpandedChapterStage(node.name);
              }
            }}
            style={{ paddingLeft: `${paddingLeft}px` }}
            className="w-full flex items-center justify-between py-2 pr-3 rounded-xl hover:bg-[var(--surface-subtle)] text-left transition-all duration-200 text-xs"
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className="w-3.5 h-3.5 inline-flex items-center justify-center opacity-70 shrink-0">
                {hasNested ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                )}
              </span>
              <FolderIcon
                color={getThemeAwareAccentPair(node.color, theme).fg}
                className="w-4 h-4 shrink-0"
              />
              <span className="truncate font-medium">{node.name}</span>
            </span>
            <span className="text-[11px] opacity-55 ml-2 shrink-0 tabular-nums">
              {node.count}
            </span>
          </button>

          {isExpanded && node.children.length > 0 && (
            <div className="mt-0.5 view-transition-enter">
              {renderFolderTree(node.children, depth + 1, currentContext)}
            </div>
          )}

          {isExpanded && node.pages.length > 0 && (
            <div className="mt-0.5 space-y-0.5 view-transition-enter">
              {node.pages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedClass(p.className);
                    setSelectedSubject(p.subject);
                    setSelectedPaper(p.paper);
                    setSelectedChapter(p.chapter);
                    setHomeStage('topics');
                    setActiveSemiChapter(null);
                    setActivePageId(p.id);
                    setViewMode('reader');
                    autoCloseSidebarOnMobile();
                  }}
                  style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
                  className={`w-full flex items-center justify-between py-1.5 pr-3 rounded-xl text-left text-xs transition-all duration-200 ${
                    activePage.id === p.id &&
                    !activeSemiChapter &&
                    viewMode === 'reader'
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                      : 'hover:bg-[var(--surface-subtle)] opacity-85'
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  // Clean header title:
  // In Reader mode: ONLY "Chapter Name : Topic Name" (or "Section : Semi-Chapter Name")
  // In Home mode: Reflects the active stage ("Web Books", "Chemistry 2nd Paper", or "2nd Chapter: Organic Chemistry")
  const headerDisplayTitle = useMemo(() => {
    if (viewMode === 'reader') {
      if (activeSemiChapter) {
        return formatCleanReaderHeader(
          activeSemiChapter.chapter.chapterTitle,
          activeSemiChapter.semi.banglaTitle || activeSemiChapter.semi.title
        );
      }
      return formatCleanReaderHeader(activePage.chapter, activePage.title);
    }
    if (homeStage === 'topics' && activeExpandedChapter) {
      return activeExpandedChapter.chapterTitle;
    }
    if (homeStage === 'chapters' && selectedSubject !== 'ALL') {
      return selectedPaper !== 'ALL' &&
        selectedPaper !== 'Single Paper' &&
        selectedPaper !== 'Main Paper' &&
        selectedPaper !== 'SSC' &&
        selectedPaper !== 'HSC'
        ? `${selectedSubject} ${selectedPaper}`
        : selectedSubject;
    }
    return 'Web Books';
  }, [
    viewMode,
    activePage,
    activeSemiChapter,
    homeStage,
    activeExpandedChapter,
    selectedSubject,
    selectedPaper,
  ]);

  // Dynamically synchronize document.title across browser tabs and mobile browsers
  useEffect(() => {
    if (viewMode === 'reader') {
      const readerTitle = activeSemiChapter
        ? formatCleanReaderHeader(
            activeSemiChapter.chapter.chapterTitle,
            activeSemiChapter.semi.banglaTitle || activeSemiChapter.semi.title
          )
        : formatCleanReaderHeader(activePage.chapter, activePage.title);
      document.title = `${readerTitle} — Web Books by Afeed`;
    } else if (homeStage === 'topics' && activeExpandedChapter) {
      document.title = `${activeExpandedChapter.chapterTitle} — Web Books by Afeed`;
    } else if (homeStage === 'chapters' && selectedSubject !== 'ALL') {
      const paperSuffix =
        selectedPaper !== 'ALL' &&
        selectedPaper !== 'Single Paper' &&
        selectedPaper !== 'Main Paper' &&
        selectedPaper !== 'SSC' &&
        selectedPaper !== 'HSC'
          ? ` ${selectedPaper}`
          : '';
      document.title = `${selectedSubject}${paperSuffix} — Web Books by Afeed`;
    } else {
      document.title = 'Web Books by Afeed';
    }
  }, [
    viewMode,
    activePage,
    activeSemiChapter,
    homeStage,
    activeExpandedChapter,
    selectedSubject,
    selectedPaper,
  ]);

  // Step-by-step Back button handler for hierarchical navigation
  const handleHeaderBack = () => {
    if (viewMode === 'reader') {
      if (activeSemiChapter) {
        setSelectedClass(activeSemiChapter.chapter.className);
        setSelectedSubject(activeSemiChapter.chapter.subject);
        setSelectedPaper(activeSemiChapter.chapter.paper);
        setSelectedChapter('ALL');
        setActiveSemiChapter(null);
        setHomeStage('chapters');
        setViewMode('home');
        return;
      }
      setSelectedClass(activePage.className);
      setSelectedSubject(activePage.subject);
      setSelectedPaper(activePage.paper);
      setSelectedChapter(activePage.chapter);
      setHomeStage('topics');
      setViewMode('home');
      return;
    }
    if (homeStage === 'topics') {
      setSelectedChapter('ALL');
      setHomeStage('chapters');
      return;
    }
    if (homeStage === 'chapters') {
      setSelectedSubject('ALL');
      setSelectedPaper('ALL');
      setSelectedChapter('ALL');
      setHomeStage('subjects');
    }
  };

  const showHeaderBackBtn =
    viewMode === 'reader' ||
    homeStage === 'chapters' ||
    homeStage === 'topics';

  return (
    <div
      data-form-factor={deviceProfile.formFactor}
      data-efficiency={isLowEndEfficiencyActive ? 'low-end' : 'standard'}
      className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-main)] relative overflow-x-clip"
    >
      {/* Mobile Backdrop when Sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-30 md:hidden transition-opacity duration-200"
        />
      )}

      {/* =====================================================================
          WEB BOOKS SIDEBAR (All Notes + All Classes 1-8, 9-10 SSC, 11-12 HSC)
          Uses .wb-sidebar + fixed-width .wb-sidebar-inner for 60fps/120fps
          GPU-accelerated open/close transitions without internal text reflow!
         ===================================================================== */}
      <aside
        aria-label="Web Books Navigation Sidebar"
        data-testid="wb-sidebar"
        className={`wb-sidebar ${sidebarOpen ? 'is-open' : 'is-closed'}`}
      >
        <div className="wb-sidebar-inner">
          {/* Top Row of Sidebar: Web Books Globe Logo + "Web Books / by Afeed" + Settings Gear at top-right */}
          <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between shrink-0 border-b border-[var(--border)]/50">
            <div className="flex items-center gap-2.5 select-none min-w-0">
              <WebBooksLogo
                variant="framed"
                className="w-7 h-7 rounded-xl shrink-0 shadow-xs"
                dataTestId="sidebar-globe-logo"
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span
                  data-testid="brand-title"
                  className="text-sm font-bold tracking-tight text-[var(--text-main)] truncate"
                >
                  Web Books
                </span>
                <span
                  data-testid="brand-subtitle"
                  className="text-[11px] font-medium text-[var(--text-muted)] opacity-55 truncate"
                >
                  by Afeed
                </span>
              </div>
            </div>
          <button
            type="button"
            onClick={() => {
              setSettingsSection('theme');
              setSettingsOpen(true);
              autoCloseSidebarOnMobile();
            }}
            aria-label="Open Settings App"
            data-testid="sidebar-settings-btn"
            className="p-2 rounded-xl hover:bg-[var(--surface-subtle)] opacity-75 hover:opacity-100 transition-all duration-200"
            title="Settings (Profile, Appearance & Theme, Visual & Animation, App Version, FAQ & Moderation)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-1">
          {/* Home Item (Shows All Subjects with Class + Quick Option to Find My Class) */}
          <button
            type="button"
            data-testid="sidebar-home-btn"
            onClick={() => {
              setSearchQuery('');
              goToSubjectsStage('ALL');
              autoCloseSidebarOnMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              viewMode === 'home' &&
              homeStage === 'subjects' &&
              selectedClass === 'ALL'
                ? 'bg-[var(--surface-subtle)] text-[var(--text-main)] font-semibold'
                : 'hover:bg-[var(--surface-subtle)] opacity-85'
            }`}
          >
            <span className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 opacity-80"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5" />
              </svg>
              <span>Home</span>
            </span>
            <span className="text-xs opacity-60 tabular-nums">
              {allPages.length}
            </span>
          </button>

          {/* Student's My Class Shortcut (Only shows their class's subjects!) */}
          {studentClass && (
            <button
              type="button"
              data-testid="sidebar-my-class-btn"
              onClick={() => {
                goToSubjectsStage(normalizeClassName(studentClass));
                autoCloseSidebarOnMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                effectiveHomeClassFilter === normalizeClassName(studentClass) &&
                viewMode === 'home' &&
                homeStage === 'subjects'
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                  : 'hover:bg-[var(--surface-subtle)] opacity-85'
              }`}
            >
              <span className="flex items-center gap-2.5 truncate">
                <FolderIcon
                  color={getThemeAwareAccentPair('#38bdf8', theme).fg}
                  className="w-4 h-4 shrink-0"
                />
                <span className="truncate">My Class: {studentClass}</span>
              </span>
            </button>
          )}

          <div className="my-2 border-t border-[var(--border)] opacity-60" />

          {/* Folders Section Header (All Classes 1 to 8, 9-10 SSC, 11-12 HSC) */}
          <div>
            <button
              type="button"
              onClick={() => setFoldersExpandedInSidebar((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold opacity-75 hover:opacity-100 hover:bg-[var(--surface-subtle)] transition-all duration-200"
            >
              <span className="flex items-center gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>Folders (Class 1 – 12)</span>
              </span>
              <span className="px-2 py-0.5 rounded-lg text-[10px] border border-[var(--border)]">
                {foldersExpandedInSidebar ? 'Hide' : 'See'}
              </span>
            </button>

            {foldersExpandedInSidebar && (
              <div
                className="mt-1 space-y-0.5 view-transition-enter"
                data-testid="sidebar-class-tree"
              >
                {renderFolderTree(folderTree)}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sidebar Footer: Account Status + Content/Admin Workspace button */}
        <div className="p-3 border-t border-[var(--border)] space-y-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSettingsSection('account');
              setSettingsOpen(true);
              autoCloseSidebarOnMobile();
            }}
            data-testid="sidebar-profile-btn"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--surface-subtle)] hover:opacity-90 transition-opacity text-left text-xs"
          >
            <div className="min-w-0">
              <div className="font-semibold truncate">
                {user ? user.displayName || user.email : 'Student Profile'}
              </div>
              <div className="text-[11px] opacity-65 truncate">
                {studentClass
                  ? `${studentClass}${schoolName ? ` · ${schoolName}` : ''}`
                  : user
                  ? 'Tap to set Class & School'
                  : 'Sign in with Google / Set Class'}
              </div>
            </div>
            <span className="text-[11px] font-medium text-[var(--accent)] shrink-0 ml-2">
              Settings
            </span>
          </button>

          {/* Content Creation Button — visible for Main Admin, Secondary Admin, and Moderator */}
          {canSubmitTopicContent(userRole) && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                data-testid="sidebar-new-topic-btn"
                onClick={() => setUploadModalOpen(true)}
                className="flex-1 py-2 px-2.5 rounded-lg btn-accent text-xs text-center whitespace-nowrap"
              >
                {userRole === 'moderator'
                  ? '+ Submit Topic (Review)'
                  : '+ New Topic Page'}
              </button>
              {isAdminUser && (
                <button
                  type="button"
                  onClick={() => setRawCodeModalOpen(true)}
                  className="py-2 px-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-subtle)] text-xs font-semibold whitespace-nowrap"
                  title="Export Raw HTML & Navigation Code"
                >
                  HTML
                </button>
              )}
            </div>
          )}
        </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE (COLLAPSIBLE VIEWING AREA + INTERACTION AREA)
          Automatically expands to fill 100% of viewport width when Sidebar closes!
         ===================================================================== */}
      <div className="flex-1 min-w-0 w-full flex flex-col smooth-workspace">
        {/* CLEAN HEADER
            Left: Sidebar Toggle + Back button (in Chapters, Expanded Chapter Topics, or Reader) + Clean Title
            Right Corner:
              - Quick Topic Content Button (ONLY in Reader mode — never outside of content!)
              - Search Button (with Filters)
              (Keyboard Shortcuts button moved exclusively inside Settings per user request) */}
        <header
          data-testid="wb-sticky-header"
          className={`sticky top-0 z-30 h-14 px-4 sm:px-6 bg-[var(--bg-primary)]/92 backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-200 ${
            viewMode === 'reader' || viewingCollapse.isCollapsed
              ? 'border-b border-[var(--border)] shadow-xs'
              : 'border-b border-transparent'
          }`}
        >
          {/* Left Zone: Sidebar Toggle + Step-Back Button + Clean Title (Cross-fades in as Viewing Area collapses on scroll) */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => {
                setSidebarOpen((prev) => {
                  const next = !prev;
                  if (!next) {
                    setQuickTopicOpen(false);
                  }
                  return next;
                });
              }}
              aria-label="Toggle Sidebar"
              data-testid="sidebar-toggle-btn"
              className="p-2 rounded-xl hover:bg-[var(--surface-subtle)] transition-all duration-200 shrink-0"
              title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              <SidebarToggleIcon isOpen={sidebarOpen} className="w-5 h-5" />
            </button>

            {showHeaderBackBtn && (
              <button
                type="button"
                onClick={handleHeaderBack}
                aria-label="Navigate Back"
                data-testid="header-back-btn"
                className="p-2 rounded-xl hover:bg-[var(--surface-subtle)] transition-all duration-200 shrink-0"
                title="Go Back"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div
              className="flex items-baseline gap-1.5 min-w-0 transition-all duration-200"
              style={
                viewMode === 'home'
                  ? {
                      opacity: viewingCollapse.isCollapsed
                        ? 1
                        : viewingCollapse.compactHeaderTitleOpacity,
                      transform: `translateY(${
                        viewingCollapse.isCollapsed
                          ? 0
                          : Math.round(
                              (1 - viewingCollapse.compactHeaderTitleOpacity) *
                                6
                            )
                      }px)`,
                    }
                  : undefined
              }
            >
              <h1
                data-testid="clean-header-title"
                className="text-sm sm:text-base font-bold truncate"
                title={headerDisplayTitle}
              >
                {headerDisplayTitle}
              </h1>
              {viewMode === 'home' && homeStage === 'subjects' && (
                <span className="text-[11px] font-medium text-[var(--text-muted)] opacity-60 shrink-0 hidden sm:inline select-none">
                  by Afeed
                </span>
              )}
            </div>
          </div>

          {/* Right Corner Zone: Notifications Button (replaces Collapse Toggle per user request) + Quick Topic Content Button (ONLY inside Reader content) + Search Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Notifications Button (Opens Floating Popover UI -> Expandable to Full Notification Center) */}
            <button
              type="button"
              onClick={() => {
                setNotificationsPopoverOpen((prev) => !prev);
                setQuickTopicOpen(false);
                setSearchOpen(false);
              }}
              aria-label={`Notifications${
                unreadNotificationsCount > 0
                  ? ` (${unreadNotificationsCount} unread)`
                  : ''
              }`}
              data-testid="header-notifications-btn"
              className={`relative p-2 rounded-xl border transition-all duration-200 ${
                notificationsPopoverOpen || notificationsExpandedOpen
                  ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                  : 'border-transparent hover:bg-[var(--surface-subtle)]'
              }`}
              title="Notifications (Version Updates & Approvals)"
            >
              {unreadNotificationsCount > 0 ? (
                <BellRing className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
              {unreadNotificationsCount > 0 && (
                <span
                  data-testid="header-notifications-badge"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-[10px] font-bold flex items-center justify-center tabular-nums"
                >
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {viewMode === 'reader' && !activeSemiChapter && (
              <button
                type="button"
                onClick={() => {
                  setQuickTopicOpen((prev) => !prev);
                  setSearchOpen(false);
                  setNotificationsPopoverOpen(false);
                }}
                aria-label="Quick Topic Contents"
                data-testid="quick-topic-btn"
                className={`p-2 rounded-xl border transition-all duration-200 ${
                  quickTopicOpen
                    ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent hover:bg-[var(--surface-subtle)]'
                }`}
                title="Quick Topic Contents"
              >
                <QuickTopicContentIcon className="w-5 h-5" />
              </button>
            )}

            {/* Search & Filter Button */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setQuickTopicOpen(false);
                setNotificationsPopoverOpen(false);
              }}
              aria-label="Search and Filter Notes (s or /)"
              data-testid="header-search-btn"
              className={`p-2 rounded-xl border transition-all duration-200 ${
                searchOpen
                  ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                  : 'border-transparent hover:bg-[var(--surface-subtle)]'
              }`}
              title="Search & Filter (Press 's' or '/')"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </header>

        {/* =====================================================================
            NOTIFICATIONS FLOATING POPOVER + EXPANDED MODAL + APPROVAL DIALOG
           ===================================================================== */}
        <NotificationsCenter
          notifications={notifications}
          unreadCount={unreadNotificationsCount}
          popoverOpen={notificationsPopoverOpen}
          expandedOpen={notificationsExpandedOpen}
          setPopoverOpen={setNotificationsPopoverOpen}
          setExpandedOpen={setNotificationsExpandedOpen}
          onMarkAsRead={(id) =>
            setNotifications((prev) =>
              prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            )
          }
          onMarkAllAsRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          onClearNotification={(id) =>
            setNotifications((prev) => prev.filter((n) => n.id !== id))
          }
          onSelectNotification={handleSelectNotification}
          activeApprovalDetail={activeApprovalDetail}
          onCloseApprovalDetail={() => setActiveApprovalDetail(null)}
          onNavigateFromApproval={() => {
            if (!activeApprovalDetail) return;
            const topicId = activeApprovalDetail.targetTopicId;
            const sec = activeApprovalDetail.targetSection || 'admin';
            setActiveApprovalDetail(null);
            if (topicId) {
              const targetPage = allPages.find((p) => p.id === topicId);
              if (targetPage) {
                setActivePageId(targetPage.id);
                setActiveSemiChapter(null);
                setViewMode('reader');
                setSettingsOpen(false);
                return;
              }
            }
            setSettingsSection(sec as SettingsSectionId);
            setSettingsOpen(true);
          }}
          appVariant={appVariant}
          pushPermission={pushPermission}
          onRequestPushPermission={handleRequestPushPermission}
        />

        {/* =====================================================================
            QUICK TOPIC POPOVER (Rendered ONLY inside Reader Content Mode)
           ===================================================================== */}
        {viewMode === 'reader' && quickTopicOpen && (
          <div
            data-testid="quick-topic-popover"
            className="fixed right-4 top-16 z-40 w-80 sm:w-96 max-h-[78vh] rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl flex flex-col overflow-hidden view-transition-enter"
          >
            <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between gap-2 bg-[var(--surface-subtle)]">
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">
                  Quick Topics ({activePage.mainTopics.length})
                </div>
                <div className="text-[11px] opacity-65 truncate">
                  {activePage.title}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleAllDropdowns(!allDropdownsOpen)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-colors whitespace-nowrap"
                >
                  {allDropdownsOpen ? 'Hide All' : 'See All'}
                </button>
                <button
                  type="button"
                  onClick={() => setQuickTopicOpen(false)}
                  aria-label="Close Quick Topics"
                  className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] opacity-75 hover:opacity-100"
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-2 overflow-y-auto space-y-1">
              {activePage.mainTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopicSection(topic.id)}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-medium hover:bg-[var(--surface-subtle)] hover:text-[var(--accent)] transition-colors flex items-center justify-between gap-2"
                >
                  <span className="truncate">{topic.title}</span>
                  <span className="text-[10px] opacity-50 shrink-0">Jump</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            SEARCH & FILTER PANEL (Opened via Header Search Button)
           ===================================================================== */}
        {searchOpen && (
          <div
            data-testid="search-filter-panel"
            className="border-b border-[var(--border)] bg-[var(--bg-card)] px-6 py-4 space-y-3 view-transition-enter"
          >
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (viewMode !== 'home') setViewMode('home');
                  }}
                  placeholder="Search topic, reaction, or chapter (e.g., Alkene, Ozonolysis)... [Press 's' or '/']"
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    goToSubjectsStage('ALL');
                  }}
                  className="px-4 py-2.5 rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-subtle)] text-xs font-medium whitespace-nowrap"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-[10px] opacity-60 mb-1">
                    Class
                  </label>
                  <select
                    aria-label="Filter by Class"
                    value={selectedClass}
                    onChange={(e) => {
                      goToSubjectsStage(e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                  >
                    <option value="ALL">
                      {studentClass
                        ? `Profile Class (${studentClass})`
                        : 'All Classes (1–12)'}
                    </option>
                    {classOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] opacity-60 mb-1">
                    Subject
                  </label>
                  <select
                    aria-label="Filter by Subject"
                    value={selectedSubject}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'ALL') {
                        goToSubjectsStage(selectedClass);
                      } else {
                        goToChaptersStage(
                          effectiveHomeClassFilter === 'ALL'
                            ? 'Class 11-12 (HSC)'
                            : effectiveHomeClassFilter,
                          val,
                          selectedPaper === 'ALL' ? '2nd Paper' : selectedPaper
                        );
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                  >
                    <option value="ALL">All Subjects</option>
                    {subjectOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] opacity-60 mb-1">
                    Paper
                  </label>
                  <select
                    aria-label="Filter by Paper"
                    value={selectedPaper}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedPaper(val);
                      if (selectedSubject !== 'ALL') {
                        setHomeStage('chapters');
                        setViewMode('home');
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                  >
                    <option value="ALL">All Papers</option>
                    {paperOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] opacity-60 mb-1">
                    Chapter
                  </label>
                  <select
                    aria-label="Filter by Chapter"
                    value={selectedChapter}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'ALL') {
                        setSelectedChapter('ALL');
                        setHomeStage('chapters');
                      } else {
                        goToExpandedChapterStage(val);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                  >
                    <option value="ALL">All Chapters</option>
                    {chapterOptions.map((ch) => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PROGRESSIVE HOME FLOW:
            - Stage 1: 'subjects' (Viewing Area + Subject Cards Grid)
            - Stage 2: 'chapters' (Viewing Area + Chapters of Selected Subject)
            - Stage 3: 'topics'   (Viewing Area + Expanded Chapter Topics & Sections)
           ===================================================================== */}
        {viewMode === 'home' && (
          <main className="flex-1 w-full max-w-none view-transition-enter">
            {/* If user typed a live search query, show instant Search Results Focus Block */}
            {searchQuery.trim() !== '' ? (
              <div>
                <section
                  data-collapsed={viewingCollapse.isCollapsed}
                  className={`wb-viewing-area ${
                    viewingCollapse.isCollapsed ? 'is-collapsed' : ''
                  }`}
                  style={{
                    opacity: viewingCollapse.viewingAreaOpacity,
                    transform: `translateY(-${Math.round(
                      viewingCollapse.collapseProgress * 18
                    )}px) scale(${viewingCollapse.viewingAreaScale})`,
                  }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Search Results
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">
                    Matching notes for &ldquo;{searchQuery}&rdquo; (
                    {filteredPages.length})
                  </p>
                </section>
                <section className="wb-interaction-area space-y-4">
                  <div className="wb-focus-block">
                    {filteredPages.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                        No matching topics found. Try searching for
                        &ldquo;Alkane&rdquo;, &ldquo;Alkene&rdquo;, or
                        &ldquo;Organic&rdquo;.
                      </div>
                    ) : (
                      filteredPages.map((page) => (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => {
                            setActivePageId(page.id);
                            setViewMode('reader');
                            autoCloseSidebarOnMobile();
                          }}
                          className="wb-list-row"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate">
                              {page.title}
                            </div>
                            <div className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                              {page.subject} {page.paper} · {page.chapter}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[var(--accent)] shrink-0">
                            Read →
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </section>
              </div>
            ) : (
              <>
                {/* ===============================================================
                    STAGE 1: SUBJECTS VIEW (homeStage === 'subjects')
                    Tapping any Subject + Paper opens its Chapters view!
                   =============================================================== */}
                {homeStage === 'subjects' && (
                  <div
                    data-testid="wb-stage-subjects"
                    className="view-transition-enter"
                  >
                    {/* COLLAPSIBLE VIEWING AREA (Collapses smoothly when scrolling down or toggled) */}
                    <section
                      aria-label="Viewing Area"
                      data-testid="wb-collapsible-viewing-area"
                      data-collapsed={viewingCollapse.isCollapsed}
                      className={`wb-viewing-area ${
                        viewingCollapse.isCollapsed ? 'is-collapsed' : ''
                      } ${
                        manualViewingCollapsed ? 'is-manually-collapsed' : ''
                      }`}
                      style={{
                        opacity: viewingCollapse.viewingAreaOpacity,
                        transform: `translateY(-${Math.round(
                          viewingCollapse.collapseProgress * 18
                        )}px) scale(${viewingCollapse.viewingAreaScale})`,
                      }}
                    >
                      {/* Homepage Brand Logo Crest */}
                      <div className="flex justify-center mb-3">
                        <WebBooksLogo
                          variant="framed"
                          className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md rounded-[22px] transition-transform duration-300 hover:scale-105"
                          dataTestId="homepage-hero-logo"
                          animated
                        />
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Web Books
                      </h2>
                      <div className="flex items-center justify-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)] opacity-70">
                          by Afeed
                        </span>
                        {effectiveHomeClassFilter !== 'ALL' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
                            {effectiveHomeClassFilter}
                          </span>
                        )}
                        {schoolName && (
                          <span className="text-xs text-[var(--text-muted)] opacity-70 truncate max-w-xs">
                            · {schoolName}
                          </span>
                        )}
                      </div>
                    </section>

                    {/* INTERACTION AREA (24dp keyline margins + 2 Clean Curriculum Sections) */}
                    <section
                      aria-label="Subject Folders Interaction Area"
                      className="wb-interaction-area space-y-6"
                    >
                      {/* QUICKLY FIND MY CLASS BAR — Shown ONLY on the global "Home" page (selectedClass === 'ALL') */}
                      {selectedClass === 'ALL' && (
                        <div
                          data-testid="quick-find-my-class-bar"
                          className="wb-breadcrumb-pill flex flex-wrap items-center justify-between gap-3"
                        >
                          <span className="text-xs font-bold text-[var(--text-main)]">
                            Home · All Classes
                          </span>

                          <div className="flex items-center gap-2 flex-wrap">
                            {studentClass ? (
                              <button
                                type="button"
                                data-testid="quick-open-my-class-btn"
                                onClick={() =>
                                  goToSubjectsStage(
                                    normalizeClassName(studentClass)
                                  )
                                }
                                className="px-3.5 py-1.5 rounded-xl btn-accent text-xs font-semibold whitespace-nowrap"
                              >
                                My Class ({normalizeClassName(studentClass)}) →
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  data-testid="quick-select-hsc"
                                  onClick={() =>
                                    handleQuickFindMyClass('Class 11-12 (HSC)')
                                  }
                                  className="px-3 py-1.5 rounded-xl btn-accent text-xs font-semibold whitespace-nowrap"
                                >
                                  My Class: HSC (11–12)
                                </button>
                                <button
                                  type="button"
                                  data-testid="quick-select-ssc"
                                  onClick={() =>
                                    handleQuickFindMyClass('Class 9-10 (SSC)')
                                  }
                                  className="px-3 py-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold whitespace-nowrap"
                                >
                                  My Class: SSC (9–10)
                                </button>
                              </>
                            )}

                            <select
                              aria-label="Quickly Find My Class"
                              data-testid="quick-find-class-select"
                              value={
                                studentClass
                                  ? normalizeClassName(studentClass)
                                  : ''
                              }
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleQuickFindMyClass(e.target.value);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-medium text-[var(--text-main)]"
                            >
                              <option value="">Find My Class...</option>
                              {ALL_CLASS_LEVELS.map((cls) => (
                                <option key={cls} value={cls}>
                                  {cls}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* ===========================================================
                          SECTION 1: GENERAL SUBJECTS
                         =========================================================== */}
                      {groupedSubjectSections.compulsory.length > 0 && (
                        <div
                          data-testid="section-compulsory-subjects"
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                              General Subjects
                            </h3>
                          </div>

                          <div
                            data-testid="home-compulsory-subject-grid"
                            className={adaptiveHomeGridClass}
                          >
                            {groupedSubjectSections.compulsory.map(
                              (card: SubjectPaperCard) => {
                                const accentPair = getThemeAwareAccentPair(
                                  card.color,
                                  theme
                                );
                                return (
                                  <button
                                    key={card.id}
                                    type="button"
                                    data-testid={`subject-card-${card.id}`}
                                    onClick={() =>
                                      goToChaptersStage(
                                        card.className,
                                        card.subject,
                                        card.paper
                                      )
                                    }
                                    className="wb-focus-card group min-h-[126px] text-left flex flex-col justify-between"
                                  >
                                    {/* Top Row: Folder Icon + Chapter/Item Count */}
                                    <div className="w-full flex items-start justify-between gap-2">
                                      <div
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
                                        style={{
                                          backgroundColor: accentPair.bgSoft,
                                        }}
                                      >
                                        <FolderIcon
                                          color={accentPair.fg}
                                          className="w-5 h-5"
                                        />
                                      </div>
                                      <div className="text-right text-xs text-[var(--text-muted)] tabular-nums">
                                        <div className="font-semibold text-[var(--text-main)]">
                                          {card.semiChapterCount
                                            ? `${card.semiChapterCount} lessons`
                                            : `${card.chapterCount} ${
                                                card.chapterCount === 1
                                                  ? 'unit'
                                                  : 'chapters'
                                              }`}
                                        </div>
                                        {card.count > 0 && (
                                          <div className="text-[11px] text-[var(--accent)] font-semibold">
                                            {card.count}{' '}
                                            {card.count === 1
                                              ? 'topic'
                                              : 'topics'}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Bottom Row: Subject Name (English + Bangla) & Class when in ALL view */}
                                    <div className="pt-3 space-y-0.5 w-full">
                                      <div className="text-sm sm:text-base font-bold leading-snug truncate group-hover:text-[var(--accent)] transition-colors">
                                        {card.displayName}
                                      </div>
                                      {card.banglaDisplayName && (
                                        <div className="text-xs text-[var(--text-secondary)] truncate">
                                          {card.banglaDisplayName}
                                        </div>
                                      )}
                                      {selectedClass === 'ALL' && (
                                        <div className="text-[11px] text-[var(--text-muted)] truncate pt-0.5">
                                          {card.className}
                                        </div>
                                      )}
                                    </div>
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}

                      {/* ===========================================================
                          SECTION 2: DIVISIONAL SUBJECTS
                         =========================================================== */}
                      {groupedSubjectSections.divisional.length > 0 && (
                        <div
                          data-testid="section-divisional-subjects"
                          className="space-y-3 pt-2"
                        >
                          <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                              Divisional Subjects
                            </h3>
                          </div>

                          <div
                            data-testid="home-subject-paper-grid"
                            className={adaptiveHomeGridClass}
                          >
                            {groupedSubjectSections.divisional.map(
                              (card: SubjectPaperCard) => {
                                const accentPair = getThemeAwareAccentPair(
                                  card.color,
                                  theme
                                );
                                return (
                                  <button
                                    key={card.id}
                                    type="button"
                                    data-testid={`subject-card-${card.id}`}
                                    onClick={() =>
                                      goToChaptersStage(
                                        card.className,
                                        card.subject,
                                        card.paper
                                      )
                                    }
                                    className="wb-focus-card group min-h-[126px] text-left flex flex-col justify-between"
                                  >
                                    {/* Top Row: Folder Icon + Chapter Count */}
                                    <div className="w-full flex items-start justify-between gap-2">
                                      <div
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
                                        style={{
                                          backgroundColor: accentPair.bgSoft,
                                        }}
                                      >
                                        <FolderIcon
                                          color={accentPair.fg}
                                          className="w-5 h-5"
                                        />
                                      </div>
                                      <div className="text-right text-xs text-[var(--text-muted)] tabular-nums">
                                        <div className="font-semibold text-[var(--text-main)]">
                                          {card.chapterCount}{' '}
                                          {card.chapterCount === 1
                                            ? 'chapter'
                                            : 'chapters'}
                                        </div>
                                        {card.count > 0 && (
                                          <div className="text-[11px] text-[var(--accent)] font-semibold">
                                            {card.count}{' '}
                                            {card.count === 1
                                              ? 'topic'
                                              : 'topics'}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Bottom Row: Subject + Paper Name (English & Bangla) */}
                                    <div className="pt-3 space-y-0.5 w-full">
                                      <div className="text-sm sm:text-base font-bold leading-snug truncate group-hover:text-[var(--accent)] transition-colors">
                                        {card.displayName}
                                      </div>
                                      {card.banglaDisplayName && (
                                        <div className="text-xs text-[var(--text-secondary)] truncate">
                                          {card.banglaDisplayName}
                                        </div>
                                      )}
                                      {selectedClass === 'ALL' && (
                                        <div className="text-[11px] text-[var(--text-muted)] truncate pt-0.5">
                                          {card.className}
                                        </div>
                                      )}
                                    </div>
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </section>
                  </div>
                )}

                {/* ===============================================================
                    STAGE 2: CHAPTERS & SEMI-CHAPTERS VIEW (homeStage === 'chapters')
                    Opened after tapping a Subject.
                    - For subjects with semi-chapters (Bangla & English: Units, Prose, Poetry, Grammar, Composition),
                      renders a direct clickable list of semi-chapters that immediately open the page!
                    - For standard subjects, renders clean chapter cards.
                   =============================================================== */}
                {homeStage === 'chapters' && (
                  <div
                    data-testid="wb-stage-chapters"
                    className="view-transition-enter"
                  >
                    {/* COLLAPSIBLE VIEWING AREA */}
                    <section
                      aria-label="Subject Viewing Area"
                      data-testid="wb-collapsible-viewing-area"
                      data-collapsed={viewingCollapse.isCollapsed}
                      className={`wb-viewing-area ${
                        viewingCollapse.isCollapsed ? 'is-collapsed' : ''
                      } ${
                        manualViewingCollapsed ? 'is-manually-collapsed' : ''
                      }`}
                      style={{
                        opacity: viewingCollapse.viewingAreaOpacity,
                        transform: `translateY(-${Math.round(
                          viewingCollapse.collapseProgress * 18
                        )}px) scale(${viewingCollapse.viewingAreaScale})`,
                      }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {selectedSubject}{' '}
                        {selectedPaper !== 'ALL' &&
                        selectedPaper !== 'Single Paper' &&
                        selectedPaper !== 'Main Paper' &&
                        selectedPaper !== 'SSC' &&
                        selectedPaper !== 'HSC'
                          ? selectedPaper
                          : ''}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                        {effectiveHomeClassFilter === 'ALL'
                          ? 'Class 11-12 (HSC)'
                          : effectiveHomeClassFilter}
                      </p>
                    </section>

                    {/* INTERACTION AREA */}
                    <section
                      aria-label="Chapters Interaction Area"
                      className="wb-interaction-area space-y-5"
                    >
                      {/* Pill Breadcrumb Bar */}
                      <div className="wb-breadcrumb-pill">
                        <nav
                          aria-label="Breadcrumb"
                          className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] min-w-0"
                        >
                          <button
                            type="button"
                            onClick={() => goToSubjectsStage(selectedClass)}
                            className="hover:text-[var(--accent)] font-medium transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>⌂</span>
                            <span>All Subjects</span>
                          </button>
                          <span aria-hidden="true">›</span>
                          <span className="text-[var(--text-main)] font-semibold inline-flex items-center gap-1.5 truncate">
                            <FolderIcon
                              color={
                                getThemeAwareAccentPair('#10b981', theme).fg
                              }
                              className="w-3.5 h-3.5 shrink-0"
                            />
                            <span>
                              {selectedSubject}{' '}
                              {selectedPaper !== 'ALL' &&
                              selectedPaper !== 'Main Paper' &&
                              selectedPaper !== 'SSC' &&
                              selectedPaper !== 'HSC'
                                ? selectedPaper
                                : ''}
                            </span>
                          </span>
                        </nav>

                        <button
                          type="button"
                          onClick={() => goToSubjectsStage(selectedClass)}
                          className="text-xs font-semibold text-[var(--accent)] hover:underline shrink-0"
                        >
                          ← Back to Subjects
                        </button>
                      </div>

                      {/* Show Under Construction Disclaimer ONLY when nothing is uploaded in this Subject yet */}
                      {chaptersForSelectedSubject.every(
                        (c) => c.pages.length === 0
                      ) && (
                        <div
                          data-testid="subject-under-construction-disclaimer"
                          className="caution-box flex flex-col sm:flex-row sm:items-center justify-between gap-3 !my-0"
                        >
                          <div className="space-y-0.5 text-xs">
                            <div className="font-bold flex items-center gap-2">
                              <span>🚧 Under Construction Disclaimer</span>
                            </div>
                            <p className="opacity-90 leading-relaxed">
                              No notes have been uploaded for{' '}
                              <strong>
                                {selectedSubject}{' '}
                                {selectedPaper !== 'ALL' &&
                                selectedPaper !== 'Main Paper' &&
                                selectedPaper !== 'SSC' &&
                                selectedPaper !== 'HSC'
                                  ? selectedPaper
                                  : ''}
                              </strong>{' '}
                              yet.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClass('Class 11-12 (HSC)');
                              setSelectedSubject('Chemistry');
                              setSelectedPaper('2nd Paper');
                              goToExpandedChapterStage(
                                '2nd Chapter: Organic Chemistry'
                              );
                            }}
                            className="px-3.5 py-2 rounded-xl btn-accent text-xs whitespace-nowrap shrink-0 self-start sm:self-center"
                          >
                            Read Live Chapter →
                          </button>
                        </div>
                      )}

                      {/* Check if this subject uses Semi-Chapters (Bangla & English: Prose, Poetry, Units, Grammar, Composition) */}
                      {chaptersForSelectedSubject.some(
                        (c) => c.semiChapters.length > 0
                      ) ? (
                        <div
                          data-testid="chapters-card-grid"
                          className="space-y-5"
                        >
                          {chaptersForSelectedSubject.map((chap) => {
                            const chapAccent = getThemeAwareAccentPair(
                              chap.color,
                              theme
                            );
                            return (
                              <div
                                key={chap.id}
                                data-testid={`chapter-card-${chap.chapterNumber}`}
                                className="space-y-2.5"
                              >
                                <div className="px-1 flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                      className="px-2.5 py-1 rounded-xl text-xs font-bold shrink-0"
                                      style={{
                                        backgroundColor: chapAccent.bgSoft,
                                        color: chapAccent.fg,
                                      }}
                                    >
                                      {chap.chapterCode ||
                                        `Unit ${chap.chapterNumber}`}
                                    </span>
                                    <div className="min-w-0">
                                      <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] truncate">
                                        {chap.chapterTitle}
                                      </h3>
                                      {chap.banglaTitle && (
                                        <p className="text-xs text-[var(--text-secondary)] truncate">
                                          {chap.banglaTitle}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-xs font-semibold text-[var(--text-muted)] shrink-0 tabular-nums">
                                    {chap.semiChapters.length}{' '}
                                    {chap.semiChapters.length === 1
                                      ? 'item'
                                      : 'items'}
                                  </span>
                                </div>

                                {/* Direct Clickable List of Semi-Chapters (Prose, Poetry, Units, Lessons) */}
                                <div
                                  data-testid={`semi-chapter-list-${chap.chapterNumber}`}
                                  className="wb-focus-block"
                                >
                                  {chap.semiChapters.map((semi) => (
                                    <button
                                      key={semi.id}
                                      type="button"
                                      data-testid={`semi-chapter-item-${semi.id}`}
                                      onClick={() =>
                                        handleOpenSemiChapter(chap, semi)
                                      }
                                      className="wb-list-row group"
                                    >
                                      <div className="flex items-center gap-3.5 min-w-0">
                                        <span
                                          className="px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 tabular-nums"
                                          style={{
                                            backgroundColor: chapAccent.bgSoft,
                                            color: chapAccent.fg,
                                          }}
                                        >
                                          {semi.code}
                                        </span>
                                        <div className="min-w-0">
                                          <div className="text-xs sm:text-sm font-semibold truncate group-hover:text-[var(--accent)] transition-colors">
                                            {semi.title}
                                          </div>
                                          {semi.banglaTitle && (
                                            <div className="text-xs text-[var(--text-secondary)] truncate">
                                              {semi.banglaTitle}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <span className="text-xs font-semibold text-[var(--accent)] shrink-0">
                                        {semi.page ? 'Read →' : 'Open →'}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Standard Chapter Cards Grid (Science, Math, Physics, Chemistry, Biology, ICT, BGS, Religion) */
                        <div
                          data-testid="chapters-card-grid"
                          className={adaptiveHomeGridClass}
                        >
                          {chaptersForSelectedSubject.map((chap) => {
                            const hasReadyTopics = chap.pages.length > 0;
                            const chapAccent = getThemeAwareAccentPair(
                              chap.color,
                              theme
                            );
                            return (
                              <button
                                key={chap.id}
                                type="button"
                                data-testid={`chapter-card-${chap.chapterNumber}`}
                                onClick={() =>
                                  goToExpandedChapterStage(chap.chapterTitle)
                                }
                                className="wb-focus-card group min-h-[124px] text-left flex flex-col justify-between"
                              >
                                <div className="w-full flex items-start justify-between gap-2">
                                  <div
                                    className="px-2.5 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                                    style={{
                                      backgroundColor: chapAccent.bgSoft,
                                      color: chapAccent.fg,
                                    }}
                                  >
                                    {chap.chapterCode ||
                                      `Ch ${chap.chapterNumber}`}
                                  </div>
                                  {hasReadyTopics && (
                                    <div className="text-xs text-[var(--accent)] font-semibold tabular-nums text-right shrink-0">
                                      {chap.pages.length}{' '}
                                      {chap.pages.length === 1
                                        ? 'topic'
                                        : 'topics'}
                                    </div>
                                  )}
                                </div>

                                <div className="pt-3 space-y-1 w-full">
                                  <div className="text-sm sm:text-base font-bold leading-snug group-hover:text-[var(--accent)] transition-colors">
                                    {chap.chapterTitle}
                                  </div>
                                  {chap.banglaTitle && (
                                    <div className="text-xs font-medium text-[var(--text-secondary)] line-clamp-1">
                                      {chap.banglaTitle}
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  </div>
                )}

                {/* ===============================================================
                    STAGE 3: EXPANDED CHAPTER TOPICS PAGE (homeStage === 'topics')
                    Opened after tapping a Chapter (e.g., 2nd Chapter: Organic Chemistry).
                    Tapping a Topic opens the distraction-free Reader!
                   =============================================================== */}
                {homeStage === 'topics' && activeExpandedChapter && (
                  <div
                    data-testid="wb-stage-topics"
                    className="view-transition-enter"
                  >
                    {/* COLLAPSIBLE VIEWING AREA */}
                    <section
                      aria-label="Chapter Viewing Area"
                      data-testid="wb-collapsible-viewing-area"
                      data-collapsed={viewingCollapse.isCollapsed}
                      className={`wb-viewing-area ${
                        viewingCollapse.isCollapsed ? 'is-collapsed' : ''
                      } ${
                        manualViewingCollapsed ? 'is-manually-collapsed' : ''
                      }`}
                      style={{
                        opacity: viewingCollapse.viewingAreaOpacity,
                        transform: `translateY(-${Math.round(
                          viewingCollapse.collapseProgress * 18
                        )}px) scale(${viewingCollapse.viewingAreaScale})`,
                      }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl">
                        {activeExpandedChapter.chapterTitle}
                      </h2>
                      {activeExpandedChapter.banglaTitle && (
                        <p className="text-sm font-semibold text-[var(--text-secondary)] mt-1 max-w-2xl">
                          {activeExpandedChapter.banglaTitle}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                        {activeExpandedChapter.subject}{' '}
                        {activeExpandedChapter.paper !== 'SSC' &&
                        activeExpandedChapter.paper !== 'HSC' &&
                        activeExpandedChapter.paper !== 'Main Paper'
                          ? activeExpandedChapter.paper
                          : ''}{' '}
                        · {activeExpandedChapter.className}
                      </p>
                    </section>

                    {/* INTERACTION AREA */}
                    <section
                      aria-label="Expanded Chapter Topics Interaction Area"
                      className="wb-interaction-area space-y-6"
                    >
                      {/* Pill Breadcrumb Bar */}
                      <div className="wb-breadcrumb-pill">
                        <nav
                          aria-label="Chapter Breadcrumb"
                          className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] min-w-0"
                        >
                          <button
                            type="button"
                            onClick={() => goToSubjectsStage(selectedClass)}
                            className="hover:text-[var(--accent)] font-medium transition-colors inline-flex items-center gap-1"
                          >
                            <span>⌂</span>
                            <span>All Subjects</span>
                          </button>
                          <span aria-hidden="true">›</span>
                          <button
                            type="button"
                            onClick={() =>
                              goToChaptersStage(
                                activeExpandedChapter.className,
                                activeExpandedChapter.subject,
                                activeExpandedChapter.paper
                              )
                            }
                            className="hover:text-[var(--accent)] font-medium transition-colors"
                          >
                            {activeExpandedChapter.subject}{' '}
                            {activeExpandedChapter.paper !== 'SSC' &&
                            activeExpandedChapter.paper !== 'HSC' &&
                            activeExpandedChapter.paper !== 'Main Paper'
                              ? activeExpandedChapter.paper
                              : ''}
                          </button>
                          <span aria-hidden="true">›</span>
                          <span className="text-[var(--text-main)] font-semibold inline-flex items-center gap-1.5 truncate">
                            <FolderIcon
                              color={
                                getThemeAwareAccentPair(
                                  activeExpandedChapter.color,
                                  theme
                                ).fg
                              }
                              className="w-3.5 h-3.5 shrink-0"
                            />
                            <span className="truncate">
                              {activeExpandedChapter.chapterTitle}
                            </span>
                          </span>
                        </nav>

                        <button
                          type="button"
                          onClick={() =>
                            goToChaptersStage(
                              activeExpandedChapter.className,
                              activeExpandedChapter.subject,
                              activeExpandedChapter.paper
                            )
                          }
                          className="text-xs font-semibold text-[var(--accent)] hover:underline shrink-0"
                        >
                          ← Back to Chapters
                        </button>
                      </div>

                      {activeExpandedChapter.semiChapters.length > 0 ? (
                        <div className="wb-focus-block">
                          {activeExpandedChapter.semiChapters.map((semi) => {
                            const chapAccent = getThemeAwareAccentPair(
                              activeExpandedChapter.color,
                              theme
                            );
                            return (
                              <button
                                key={semi.id}
                                type="button"
                                data-testid={`semi-chapter-item-${semi.id}`}
                                onClick={() =>
                                  handleOpenSemiChapter(
                                    activeExpandedChapter,
                                    semi
                                  )
                                }
                                className="wb-list-row group"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <span
                                    className="px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 tabular-nums"
                                    style={{
                                      backgroundColor: chapAccent.bgSoft,
                                      color: chapAccent.fg,
                                    }}
                                  >
                                    {semi.code}
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold truncate group-hover:text-[var(--accent)] transition-colors">
                                      {semi.title}
                                    </div>
                                    {semi.banglaTitle && (
                                      <div className="text-xs text-[var(--text-secondary)] truncate">
                                        {semi.banglaTitle}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-[var(--accent)] shrink-0">
                                  {semi.page ? 'Read →' : 'Open →'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : activeExpandedChapter.pages.length === 0 ? (
                        <div
                          data-testid="chapter-under-construction-card"
                          className="wb-focus-block p-8 sm:p-10 text-center space-y-4"
                        >
                          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold caution-box !my-0">
                            <span>🚧 Under Construction Disclaimer</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-base sm:text-lg font-bold">
                              {activeExpandedChapter.chapterTitle}
                            </div>
                            {activeExpandedChapter.banglaTitle && (
                              <div className="text-sm font-semibold text-[var(--text-secondary)]">
                                {activeExpandedChapter.banglaTitle}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
                            No notes have been uploaded for this chapter yet.
                            Switch to{' '}
                            <strong>
                              HSC Chemistry 2nd Paper → 2nd Chapter: Organic
                              Chemistry
                            </strong>{' '}
                            to read the completed{' '}
                            <strong>Alkane, Alkene &amp; Alkyne</strong> book.
                          </p>
                          <div className="pt-1 flex items-center justify-center gap-3 flex-wrap">
                            <button
                              type="button"
                              onClick={() =>
                                goToChaptersStage(
                                  activeExpandedChapter.className,
                                  activeExpandedChapter.subject,
                                  activeExpandedChapter.paper
                                )
                              }
                              className="px-4 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-semibold hover:border-[var(--accent)]"
                            >
                              ← Browse Other Chapters
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedClass('Class 11-12 (HSC)');
                                setSelectedSubject('Chemistry');
                                setSelectedPaper('2nd Paper');
                                goToExpandedChapterStage(
                                  '2nd Chapter: Organic Chemistry'
                                );
                              }}
                              className="px-4 py-2 rounded-2xl btn-accent text-xs"
                            >
                              Open 2nd Chapter: Organic Chemistry →
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* FOCUS BLOCK 1: Document Note Card(s) */}
                          <div className="space-y-2.5">
                            <div className="px-1 text-xs font-semibold text-[var(--text-muted)]">
                              Chapter Topic Books (
                              {activeExpandedChapter.pages.length})
                            </div>
                            <div
                              className={`grid gap-4 ${
                                activeExpandedChapter.pages.length === 1
                                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                              }`}
                            >
                              {activeExpandedChapter.pages.map((page) => {
                                const docAccent = getThemeAwareAccentPair(
                                  page.folderColor || '#ef4444',
                                  theme
                                );
                                return (
                                  <button
                                    key={page.id}
                                    type="button"
                                    data-testid={`topic-book-card-${page.id}`}
                                    onClick={() => {
                                      setActiveSemiChapter(null);
                                      setActivePageId(page.id);
                                      setViewMode('reader');
                                      autoCloseSidebarOnMobile();
                                      window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                      });
                                    }}
                                    className="wb-note-doc-card group text-left flex flex-col justify-between min-h-[188px]"
                                  >
                                    {/* Top High-Contrast Colored Banner */}
                                    <div
                                      className="w-full px-4 py-3 flex items-center justify-between"
                                      style={{
                                        backgroundColor: docAccent.bannerBg,
                                        color: docAccent.bannerFg,
                                      }}
                                    >
                                      <span className="text-[11px] font-bold tracking-wide uppercase truncate">
                                        {page.subject} · {page.paper}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-md bg-black/15 text-[10px] font-bold tabular-nums">
                                        {page.mainTopics.length} Topics
                                      </span>
                                    </div>

                                    {/* Clean Surface Body */}
                                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 w-full">
                                      <div className="space-y-1.5">
                                        <div className="text-xs text-[var(--text-muted)] truncate">
                                          {page.chapter}
                                        </div>
                                        <div className="text-base sm:text-lg font-bold leading-snug text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                                          {page.title}
                                        </div>
                                      </div>

                                      <div className="pt-3 border-t border-[var(--border)] w-full flex items-center justify-between text-xs">
                                        <span className="text-[var(--text-muted)] tabular-nums">
                                          {page.updatedDate}
                                        </span>
                                        <span className="font-bold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                                          Tap to Read →
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* FOCUS BLOCK 2: Grouped List of Sections inside the Chapter */}
                          {activeExpandedChapter.pages.map((page) => (
                            <div key={`sections-${page.id}`} className="space-y-2.5">
                              <div className="px-1 flex items-center justify-between">
                                <span className="text-xs font-semibold text-[var(--text-muted)]">
                                  Expanded Sections in {page.title} (
                                  {page.mainTopics.length})
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveSemiChapter(null);
                                    setActivePageId(page.id);
                                    setViewMode('reader');
                                    autoCloseSidebarOnMobile();
                                  }}
                                  className="text-xs font-semibold text-[var(--accent)] hover:underline"
                                >
                                  Read Full Topic Book →
                                </button>
                              </div>

                              <div
                                data-testid="expanded-chapter-sections-list"
                                className="wb-focus-block"
                              >
                                {page.mainTopics.map((sec, idx) => (
                                  <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() =>
                                      handleSelectTopicSection(sec.id, page.id)
                                    }
                                    className="wb-list-row group"
                                  >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                      <span className="w-8 h-8 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--accent)] shrink-0 tabular-nums">
                                        {idx + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <div className="text-xs sm:text-sm font-semibold truncate group-hover:text-[var(--accent)] transition-colors">
                                          {sec.title}
                                        </div>
                                      </div>
                                    </div>
                                    <span className="text-xs font-semibold text-[var(--accent)] shrink-0">
                                      Read
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                )}
              </>
            )}
          </main>
        )}

        {/* =====================================================================
            VIEW 2: FULL-WIDTH DISTRACTION-FREE READER
            Respects 24dp keyline margins and expands across 100% of available workspace!
           ===================================================================== */}
        {viewMode === 'reader' && (
          <main
            data-testid="reader-main-container"
            className="flex-1 w-full max-w-none wb-interaction-area pt-4 view-transition-enter"
          >
            {activeSemiChapter ? (
              <div
                data-testid="semi-chapter-direct-reader"
                className="reader-container space-y-5"
              >
                <section className="topic-section p-6 sm:p-8 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span className="px-2.5 py-0.5 rounded-lg font-bold bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--accent)]">
                          {activeSemiChapter.semi.code}
                        </span>
                        <span>
                          {activeSemiChapter.chapter.className} ·{' '}
                          {activeSemiChapter.chapter.subject}
                          {activeSemiChapter.chapter.paper !== 'Main Paper' &&
                          activeSemiChapter.chapter.paper !== 'SSC' &&
                          activeSemiChapter.chapter.paper !== 'HSC'
                            ? ` ${activeSemiChapter.chapter.paper}`
                            : ''}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
                        {activeSemiChapter.semi.title}
                      </h2>
                      {activeSemiChapter.semi.banglaTitle && (
                        <p className="text-sm sm:text-base font-semibold text-[var(--text-secondary)]">
                          {activeSemiChapter.semi.banglaTitle}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleHeaderBack}
                      className="px-3.5 py-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold"
                    >
                      ← Back to {activeSemiChapter.chapter.subject}
                    </button>
                  </div>

                  <div
                    data-testid="semi-chapter-under-construction-notice"
                    className="caution-box space-y-2 !my-0"
                  >
                    <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                      <span>🚧 Under Construction Disclaimer</span>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                      This semi-chapter page (
                      <strong>
                        {activeSemiChapter.semi.banglaTitle ||
                          activeSemiChapter.semi.title}
                      </strong>
                      ) opens directly and will contain all included topics and
                      notes on this page once uploaded.
                    </p>
                  </div>
                </section>
              </div>
            ) : (
              /* Render all <section class="topic-section"> blocks */
              <div
                ref={readerContainerRef}
                className="reader-container space-y-5"
                dangerouslySetInnerHTML={{ __html: activePage.sectionsHtml }}
              />
            )}
          </main>
        )}
      </div>

      {/* =====================================================================
          FLOATING SHORTCUT TOAST NOTIFICATION
         ===================================================================== */}
      {shortcutToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 pointer-events-none px-4 py-2 rounded-2xl bg-[var(--surface-card)] text-[var(--text-main)] border border-[var(--border)] shadow-xl text-xs font-semibold backdrop-blur-md transition-all animate-bounce"
        >
          {shortcutToast}
        </div>
      )}

      {/* =====================================================================
          KEYBOARD SHORTCUTS MODAL (Desktop, Laptop & External Display Guide)
         ===================================================================== */}
      {shortcutsModalOpen && (
        <div
          data-testid="shortcuts-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 view-transition-enter"
          onClick={() => setShortcutsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-subtle)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                  ⌨️
                </div>
                <div>
                  <h3 className="font-bold text-sm">Keyboard Shortcuts</h3>
                  <p className="text-[11px] opacity-60">
                    Fast navigation for Desktop, Laptop &amp; External Displays
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShortcutsModalOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--surface-card)] text-base"
                title="Close Shortcuts Modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Focus Search Bar</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">s</kbd>
                  <span className="opacity-40">or</span>
                  <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">/</kbd>
                  <span className="opacity-40">or</span>
                  <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">Ctrl+K</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Cycle Theme (OLED Dark / Dark / Warm / Light)</span>
                <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">t</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Toggle Curve Profile (G2 Squircle / Classic G1)</span>
                <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">c</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Return to Home (All Subjects)</span>
                <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">h</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Decrease / Increase Font Size</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">[</kbd>
                  <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">]</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
                <span className="opacity-80">Close Modals / Panels / Back</span>
                <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">Esc</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="opacity-80">Open this Shortcuts Guide</span>
                <kbd className="px-2 py-1 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">?</kbd>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between">
              <span className="text-[11px] opacity-60">Shortcuts are disabled while typing in inputs</span>
              <button
                type="button"
                onClick={() => setShortcutsModalOpen(false)}
                className="px-4 py-1.5 rounded-xl btn-accent text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DEDICATED PHONE & DESKTOP SETTINGS PAGE
          - Profile Card -> Theme (4 Modes + Auto-Detect + Deep G2 Curve Radius)
          - Visual & Animation Management (Adaptive Screen, 60fps Lite, Reduce Blur/Animation/Transition, Keyboard Shortcuts)
          - FAQ, Feedback & Moderator Request
          - Moderation & Admin Governance (Main Admin, Secondary Admin, Moderator + Content Approval Queue)
          - User Manual, Reading Guide & MIT License
         ===================================================================== */}
      {settingsOpen && (
        <SettingsPage
          onClose={() => setSettingsOpen(false)}
          activeSection={settingsSection}
          setActiveSection={setSettingsSection}
          user={user}
          userRole={userRole}
          handleGoogleLogin={handleGoogleLogin}
          handleLogout={handleLogout}
          authErrorDetails={authErrorDetails}
          firebaseProjectId={FIREBASE_PROJECT_ID}
          studentClass={studentClass}
          setStudentClass={setStudentClass}
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          phoneInput={phoneInput}
          setPhoneInput={setPhoneInput}
          profileSaving={profileSaving}
          profileStatusMsg={profileStatusMsg}
          handleSaveProfile={handleSaveProfile}
          theme={theme}
          onSelectTheme={handleSelectTheme}
          isThemeAutoDetect={isThemeAutoDetect}
          onEnableThemeAutoDetect={handleEnableThemeAutoDetect}
          fontScale={fontScale}
          setFontScale={setFontScale}
          curveProfile={curveProfile}
          setCurveProfile={setCurveProfile}
          curveRadiusPreset={curveRadiusPreset}
          setCurveRadiusPreset={setCurveRadiusPreset}
          handleToggleAllDropdowns={handleToggleAllDropdowns}
          deviceProfile={deviceProfile}
          viewportSize={viewportSize}
          manualViewingCollapsed={manualViewingCollapsed}
          setManualViewingCollapsed={setManualViewingCollapsed}
          efficiencyMode={efficiencyMode}
          setEfficiencyMode={setEfficiencyMode}
          isLowEndEfficiencyActive={isLowEndEfficiencyActive}
          visualSettings={visualSettings}
          setVisualSettings={setVisualSettings}
          onOpenShortcutsModal={() => {
            setSettingsOpen(false);
            setShortcutsModalOpen(true);
          }}
          activePageTitle={activePage.title}
          feedbackRating={feedbackRating}
          setFeedbackRating={setFeedbackRating}
          feedbackMessage={feedbackMessage}
          setFeedbackMessage={setFeedbackMessage}
          feedbackSubmitting={feedbackSubmitting}
          feedbackStatusMsg={feedbackStatusMsg}
          handleSubmitFeedback={handleSubmitFeedback}
          myFeedbacks={myFeedbacks}
          handleDeleteFeedback={handleDeleteFeedback}
          secondaryAdminEmails={selectiveAdminEmails}
          moderatorEmails={moderatorEmails}
          roleRequests={roleRequests}
          pendingSubmissions={pendingSubmissions}
          onSubmitRoleRequest={handleSubmitRoleRequest}
          onApproveRoleRequest={handleApproveRoleRequest}
          onRejectRoleRequest={handleRejectRoleRequest}
          onAddSecondaryAdminEmail={handleAddSecondaryAdminEmail}
          onRemoveSecondaryAdminEmail={handleRemoveSecondaryAdminEmail}
          onAddModeratorEmail={handleAddModeratorEmail}
          onRemoveModeratorEmail={handleRemoveModeratorEmail}
          onApprovePendingSubmission={handleApprovePendingSubmission}
          onRejectPendingSubmission={handleRejectPendingSubmission}
          onOpenUploadModal={() => {
            setSettingsOpen(false);
            setUploadModalOpen(true);
          }}
          onOpenRawCodeModal={() => {
            setSettingsOpen(false);
            setRawCodeModalOpen(true);
          }}
          showShortcutToast={showShortcutToast}
          allPages={allPages}
          currentVersion={APP_CURRENT_VERSION}
          appVariant={appVariant}
          releaseSummary={releaseSummary}
          releasesList={releasesList}
          preferPrerelease={preferPrerelease}
          setPreferPrerelease={setPreferPrerelease}
          checkingUpdates={checkingUpdates}
          lastCheckedAt={lastCheckedAt}
          onCheckForUpdates={() => void handleCheckForUpdates(false)}
        />
      )}

      {/* =====================================================================
          MODERATOR & ADMIN: UPLOAD / SUBMIT NEW TOPIC PAGE MODAL
          - Main Admin & Secondary Admin: Publishes immediately
          - Moderator: Submits to Pending Content Approval Queue for Admin review
         ===================================================================== */}
      {uploadModalOpen && canSubmitTopicContent(userRole) && (
        <div
          data-testid="upload-topic-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 view-transition-enter"
        >
          <div className="w-full max-w-2xl rounded-[38px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">
                  {doesContentRequireApproval(userRole)
                    ? 'Moderator: Submit New Topic Page for Approval'
                    : 'Admin: Upload / Build New Topic Page'}
                </h2>
                <p className="text-xs opacity-65">
                  {doesContentRequireApproval(userRole)
                    ? 'Submitted topics enter the Moderation Queue to be checked & approved by Main or Secondary Admin'
                    : 'Organize by Class → Subject → Paper → Chapter → Topic (Publishes Immediately)'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                aria-label="Close Upload Modal"
                className="p-1.5 rounded-lg hover:bg-[var(--surface-subtle)] opacity-75 hover:opacity-100"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleCreateTopicPage}
              className="p-6 overflow-y-auto space-y-4 text-xs"
            >
              {doesContentRequireApproval(userRole) && (
                <div className="p-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-[11px] leading-relaxed">
                  <strong>Moderator Content Review Policy:</strong> When you submit new content as a Moderator, it is first placed in the <strong>Pending Content Approval Queue</strong>. Once the Main Admin or a Secondary Admin verifies and approves the content, it is published live to the textbook library.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block opacity-75 mb-1 font-semibold">
                    Class
                  </label>
                  <select
                    value={newPageClass}
                    onChange={(e) => setNewPageClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]"
                  >
                    {ALL_CLASS_LEVELS.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block opacity-75 mb-1 font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newPageSubject}
                    onChange={(e) => setNewPageSubject(e.target.value)}
                    placeholder="e.g., Chemistry"
                    className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]"
                  />
                </div>
                <div>
                  <label className="block opacity-75 mb-1 font-semibold">
                    Paper
                  </label>
                  <input
                    type="text"
                    value={newPagePaper}
                    onChange={(e) => setNewPagePaper(e.target.value)}
                    placeholder="e.g., 2nd Paper"
                    className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]"
                  />
                </div>
                <div>
                  <label className="block opacity-75 mb-1 font-semibold">
                    Chapter Name
                  </label>
                  <input
                    type="text"
                    value={newPageChapter}
                    onChange={(e) => setNewPageChapter(e.target.value)}
                    placeholder="e.g., 2nd Chapter: Organic Chemistry"
                    className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]"
                  />
                </div>
              </div>

              <div>
                <label className="block opacity-75 mb-1 font-semibold">
                  Topic Title
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="e.g., Alcohol, Aldehyde & Carboxylic Acid"
                  className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]"
                />
              </div>

              <div>
                <label className="block opacity-75 mb-1 font-semibold">
                  HTML Sections (&lt;section class="topic-section" id="..."&gt;)
                </label>
                <textarea
                  rows={8}
                  value={newPageHtml}
                  onChange={(e) => setNewPageHtml(e.target.value)}
                  placeholder='<section class="topic-section" id="new-topic-1"><h2>1. New Topic</h2>...</section>'
                  className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-xs"
                />
              </div>

              {uploadStatusMsg && (
                <p className="text-[var(--accent)] font-medium">
                  {uploadStatusMsg}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-2xl border border-[var(--border)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl btn-accent"
                >
                  {doesContentRequireApproval(userRole)
                    ? 'Submit for Admin Approval'
                    : 'Save & Publish Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADMIN ONLY: RAW HTML & NAVIGATION LINKS EXPORT MODAL
         ===================================================================== */}
      {rawCodeModalOpen && isAdminUser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 view-transition-enter">
          <div className="w-full max-w-3xl rounded-[38px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-base font-bold">
                Admin: Raw HTML Sections &amp; Navigation Links
              </h2>
              <button
                type="button"
                onClick={() => setRawCodeModalOpen(false)}
                aria-label="Close Raw Code Modal"
                className="p-1.5 rounded-lg hover:bg-[var(--surface-subtle)] opacity-75 hover:opacity-100"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <div className="font-semibold mb-1">
                  Navigation Links (&lt;a class="topic-link"&gt;):
                </div>
                <textarea
                  readOnly
                  rows={5}
                  value={getBatch5NavigationLinksHtml()}
                  className="w-full p-3 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]"
                />
              </div>
              <div>
                <div className="font-semibold mb-1">
                  All 12 Topic Sections HTML (&lt;section class="topic-section"&gt;):
                </div>
                <textarea
                  readOnly
                  rows={12}
                  value={getAllSectionsHtml()}
                  className="w-full p-3 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
