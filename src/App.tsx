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
  googleProvider,
  handleFirestoreError,
  OperationType,
} from './firebase';
import {
  ALL_CLASS_LEVELS,
  BUILT_IN_PAGES,
  buildFolderHierarchy,
  ChapterItem,
  clampViewingAreaScroll,
  computeViewingAreaCollapseState,
  detectDeviceFormFactor,
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
  PRIMARY_ADMIN_EMAIL,
  shouldEnableLowEndEfficiency,
  SubjectPaperCard,
} from './utils/libraryCatalog';
import {
  getAllSectionsHtml,
  getBatch5NavigationLinksHtml,
} from './utils/chemistrySections';

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

type ThemeMode = 'dark' | 'yellow' | 'light';
type ViewMode = 'home' | 'reader';
type HomeDrillStage = 'subjects' | 'chapters' | 'topics';
type SettingsTab = 'display' | 'account' | 'feedback' | 'admin' | 'manual';

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
const LOCAL_FONT_SCALE_KEY = 'organic_note_font_scale_v1';
const LOCAL_STUDENT_CLASS_KEY = 'organic_note_student_class_v1';
const LOCAL_STUDENT_SCHOOL_KEY = 'organic_note_student_school_v1';
const LOCAL_STUDENT_PHONE_KEY = 'organic_note_student_phone_v1';
const LOCAL_ADMIN_EMAILS_KEY = 'organic_note_selective_admins_v1';
const LOCAL_EFFICIENCY_MODE_KEY = 'web_books_efficiency_mode_v1';

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

  // Persistent Display Mode & Font Scale (Remembers user preference in localStorage; defaults to OLED Dark '#000000')
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_THEME_KEY);
      if (saved === 'dark' || saved === 'yellow' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(LOCAL_FONT_SCALE_KEY));
      if (saved >= 14 && saved <= 26) return saved;
    } catch {
      // ignore storage errors
    }
    return 18;
  });

  const [allDropdownsOpen, setAllDropdownsOpen] = useState<boolean>(false);

  // Header corner popovers / modals
  const [quickTopicOpen, setQuickTopicOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('display');

  // Admin Upload / Editor Modal & Code Export Modal (Admin Only)
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

  // Currently selected page for the Reader
  const [activePageId, setActivePageId] = useState<string>(
    BUILT_IN_PAGES[0].id
  );
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
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
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

  // Firebase Auth & Selective Admin state
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isFirestoreAdminDoc, setIsFirestoreAdminDoc] =
    useState<boolean>(false);
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
  const [newAdminEmailInput, setNewAdminEmailInput] = useState<string>('');

  const isAdminUser = useMemo(() => {
    if (!user) return false;
    return (
      isFirestoreAdminDoc ||
      isAuthorizedAdminEmail(user.email, selectiveAdminEmails)
    );
  }, [user, isFirestoreAdminDoc, selectiveAdminEmails]);

  // Feedback state
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackStatusMsg, setFeedbackStatusMsg] = useState<string>('');
  const [myFeedbacks, setMyFeedbacks] = useState<FeedbackRecord[]>([]);

  // Admin Upload / Build New Topic Page form state
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

  // Adaptive Form Factor detection (Phone, Passport Foldable, Tablet/Book Foldable, DeX / Desktop PC)
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

  // Adaptive grid columns helper for Passport Foldables, Tablets, Phones, and DeX / Desktop PC
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
  // Only updates state within the top [0, 120px] collapse range in Home mode,
  // preventing unnecessary React re-renders during deep page scrolling on low-end devices.
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

  // Apply and persist theme (OLED Dark, Reading Sepia, Light)
  useEffect(() => {
    const themeAttr =
      theme === 'dark' ? 'oled' : theme === 'yellow' ? 'reading' : 'light';
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

  // Effective class filter for the Home Page:
  // If the user explicitly clicked a class in the Sidebar or Search Filter, use `selectedClass`.
  // Otherwise, if the student set their optional Class in their profile (`studentClass`), show ONLY their class on the Home Page!
  const effectiveHomeClassFilter = useMemo(() => {
    if (selectedClass !== 'ALL') return selectedClass;
    if (studentClass.trim()) return normalizeClassName(studentClass);
    return 'ALL';
  }, [selectedClass, studentClass]);

  // Stage 1: Subject + Paper cards on the Home Page
  const subjectPaperCards = useMemo(
    () => getSubjectPaperCards(allPages, effectiveHomeClassFilter),
    [allPages, effectiveHomeClassFilter]
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

    // Reset manual sidebar class override so their new profile class takes effect on the Home Page
    setSelectedClass('ALL');
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

  // Admin Only: Create / Upload New Topic Page
  const handleCreateTopicPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminUser) {
      setUploadStatusMsg('Only authorized admins can add new topic pages.');
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
    setActivePageId(pageId);
    setUploadModalOpen(false);
    setViewMode('reader');
  };

  // Admin Only: Add selective admin email
  const handleAddSelectiveAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminUser) return;
    const cleanEmail = newAdminEmailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    if (!selectiveAdminEmails.includes(cleanEmail)) {
      const next = [...selectiveAdminEmails, cleanEmail];
      setSelectiveAdminEmails(next);
      try {
        localStorage.setItem(LOCAL_ADMIN_EMAILS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage error
      }
    }
    setNewAdminEmailInput('');
  };

  const handleRemoveSelectiveAdminEmail = (emailToRemove: string) => {
    if (emailToRemove.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase())
      return;
    const next = selectiveAdminEmails.filter(
      (e) => e.toLowerCase() !== emailToRemove.toLowerCase()
    );
    setSelectiveAdminEmails(next);
    try {
      localStorage.setItem(LOCAL_ADMIN_EMAILS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage error
    }
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

  // Navigate to Stage 1: All Subjects
  const goToSubjectsStage = (cls: string = 'ALL') => {
    setSelectedClass(cls);
    setSelectedSubject('ALL');
    setSelectedPaper('ALL');
    setSelectedChapter('ALL');
    setHomeStage('subjects');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setHomeStage('chapters');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Stage 3: Expanded Chapter Topics Page
  const goToExpandedChapterStage = (chapterTitle: string) => {
    setSelectedChapter(chapterTitle);
    setHomeStage('topics');
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                    setActivePageId(p.id);
                    setViewMode('reader');
                    autoCloseSidebarOnMobile();
                  }}
                  style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
                  className={`w-full flex items-center justify-between py-1.5 pr-3 rounded-xl text-left text-xs transition-all duration-200 ${
                    activePage.id === p.id && viewMode === 'reader'
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
  // In Reader mode: ONLY "Chapter Name : Topic Name"
  // In Home mode: Reflects the active stage ("Web Books", "Chemistry 2nd Paper", or "2nd Chapter: Organic Chemistry")
  const headerDisplayTitle = useMemo(() => {
    if (viewMode === 'reader') {
      return formatCleanReaderHeader(activePage.chapter, activePage.title);
    }
    if (homeStage === 'topics' && activeExpandedChapter) {
      return activeExpandedChapter.chapterTitle;
    }
    if (homeStage === 'chapters' && selectedSubject !== 'ALL') {
      return selectedPaper !== 'ALL' && selectedPaper !== 'Single Paper'
        ? `${selectedSubject} ${selectedPaper}`
        : selectedSubject;
    }
    return 'Web Books';
  }, [
    viewMode,
    activePage,
    homeStage,
    activeExpandedChapter,
    selectedSubject,
    selectedPaper,
  ]);

  // Dynamically synchronize document.title across browser tabs and mobile browsers
  useEffect(() => {
    if (viewMode === 'reader') {
      document.title = `${formatCleanReaderHeader(
        activePage.chapter,
        activePage.title
      )} — Web Books by Afeed`;
    } else if (homeStage === 'topics' && activeExpandedChapter) {
      document.title = `${activeExpandedChapter.chapterTitle} — Web Books by Afeed`;
    } else if (homeStage === 'chapters' && selectedSubject !== 'ALL') {
      const paperSuffix =
        selectedPaper !== 'ALL' && selectedPaper !== 'Single Paper'
          ? ` ${selectedPaper}`
          : '';
      document.title = `${selectedSubject}${paperSuffix} — Web Books by Afeed`;
    } else {
      document.title = 'Web Books by Afeed';
    }
  }, [
    viewMode,
    activePage,
    homeStage,
    activeExpandedChapter,
    selectedSubject,
    selectedPaper,
  ]);

  // Step-by-step Back button handler for hierarchical navigation
  const handleHeaderBack = () => {
    if (viewMode === 'reader') {
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
          {/* Top Row of Sidebar: "Web Books / by Afeed" + Settings Gear at top-right */}
          <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between shrink-0 border-b border-[var(--border)]/50">
            <div className="flex flex-col leading-tight select-none">
              <span
                data-testid="brand-title"
                className="text-sm font-bold tracking-tight text-[var(--text-main)]"
              >
                Web Books
              </span>
              <span
                data-testid="brand-subtitle"
                className="text-[11px] font-medium text-[var(--text-muted)] opacity-55"
              >
                by Afeed
              </span>
            </div>
          <button
            type="button"
            onClick={() => {
              setSettingsTab('display');
              setSettingsOpen(true);
            }}
            aria-label="Open Settings Menu"
            data-testid="sidebar-settings-btn"
            className="p-2 rounded-xl hover:bg-[var(--surface-subtle)] opacity-75 hover:opacity-100 transition-all duration-200"
            title="Settings (Display Mode, Google Login, Student Profile & Feedback)"
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
          {/* All Notes Item (Returns to Stage 1: Subjects Home) */}
          <button
            type="button"
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
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 opacity-80"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="13" y2="17" />
              </svg>
              <span>All notes</span>
            </span>
            <span className="text-xs opacity-60 tabular-nums">
              {allPages.length}
            </span>
          </button>

          {/* Student's My Class Shortcut (if student configured optional Class in Profile) */}
          {studentClass && (
            <button
              type="button"
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

        {/* Bottom Sidebar Footer: Account Status + Admin Workspace button (ONLY if Admin) */}
        <div className="p-3 border-t border-[var(--border)] space-y-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSettingsTab('account');
              setSettingsOpen(true);
            }}
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
              Edit
            </span>
          </button>

          {/* Selective Admin Editor Button — strictly hidden for regular users */}
          {isAdminUser && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setUploadModalOpen(true)}
                className="flex-1 py-2 px-2.5 rounded-lg btn-accent text-xs text-center whitespace-nowrap"
              >
                + New Topic Page
              </button>
              <button
                type="button"
                onClick={() => setRawCodeModalOpen(true)}
                className="py-2 px-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-subtle)] text-xs font-semibold whitespace-nowrap"
                title="Export Raw HTML & Navigation Code"
              >
                HTML
              </button>
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
              - Search Button (with Filters) */}
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

          {/* Right Corner Zone: Adaptive Form-Factor Badge + Viewing Area Collapse Toggle + Quick Topic Content Button (ONLY inside Reader content) + Search Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Adaptive Form-Factor Indicator Badge (DeX / Foldable / Tablet / Phone) */}
            <button
              type="button"
              onClick={() => {
                setSettingsTab('display');
                setSettingsOpen(true);
              }}
              data-testid="adaptive-form-factor-badge"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] transition-colors"
              title={`Adaptive Layout: ${deviceProfile.label} (${viewportSize.width}×${viewportSize.height})`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>{deviceProfile.label}</span>
            </button>

            {/* Viewing Area Collapse / Expand Toggle Button (in Home Mode) */}
            {viewMode === 'home' && (
              <button
                type="button"
                onClick={() => setManualViewingCollapsed((prev) => !prev)}
                aria-label={
                  viewingCollapse.isCollapsed
                    ? 'Expand Viewing Area'
                    : 'Collapse Viewing Area'
                }
                data-testid="toggle-viewing-area-btn"
                className={`p-2 rounded-xl border transition-all duration-200 ${
                  manualViewingCollapsed
                    ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent hover:bg-[var(--surface-subtle)]'
                }`}
                title={
                  viewingCollapse.isCollapsed
                    ? 'Expand Viewing Area'
                    : 'Collapse Viewing Area'
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    viewingCollapse.isCollapsed ? 'rotate-180' : ''
                  }`}
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            )}

            {viewMode === 'reader' && (
              <button
                type="button"
                onClick={() => {
                  setQuickTopicOpen((prev) => !prev);
                  setSearchOpen(false);
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
              }}
              aria-label="Search and Filter Notes"
              data-testid="header-search-btn"
              className={`p-2 rounded-xl border transition-all duration-200 ${
                searchOpen
                  ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]'
                  : 'border-transparent hover:bg-[var(--surface-subtle)]'
              }`}
              title="Search & Filter"
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
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (viewMode !== 'home') setViewMode('home');
                  }}
                  placeholder="Search topic, reaction, or chapter (e.g., Alkene, Ozonolysis, Markovnikov)..."
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
                      <p className="text-xs text-[var(--text-muted)] opacity-75 mt-1">
                        {subjectPaperCards.length} Subjects — Select a subject
                        to view its chapters
                      </p>
                    </section>

                    {/* INTERACTION AREA (24dp keyline margins + Adaptive Multi-Form-Factor Grid) */}
                    <section
                      aria-label="Subject Folders Interaction Area"
                      className="wb-interaction-area space-y-4"
                    >
                      <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Subjects &amp; Papers ({subjectPaperCards.length})
                        </span>
                        {selectedClass !== 'ALL' && (
                          <button
                            type="button"
                            onClick={() => goToSubjectsStage('ALL')}
                            className="text-xs font-semibold text-[var(--accent)] hover:underline"
                          >
                            Show Default Class
                          </button>
                        )}
                      </div>

                      <div
                        data-testid="home-subject-paper-grid"
                        className={adaptiveHomeGridClass}
                      >
                        {subjectPaperCards.map((card: SubjectPaperCard) => {
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
                              className="wb-focus-card group min-h-[138px] text-left flex flex-col justify-between"
                            >
                              {/* Top Row: Folder Container Icon + Unboxed Chapter & Note Metadata */}
                              <div className="w-full flex items-start justify-between gap-3">
                                <div
                                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0"
                                  style={{ backgroundColor: accentPair.bgSoft }}
                                >
                                  <FolderIcon
                                    color={accentPair.fg}
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="text-right text-xs text-[var(--text-muted)] tabular-nums">
                                  <span className="font-semibold text-[var(--text-main)]">
                                    {card.chapterCount}{' '}
                                    {card.chapterCount === 1
                                      ? 'chapter'
                                      : 'chapters'}
                                  </span>
                                  {card.count > 0 && (
                                    <>
                                      <span aria-hidden="true"> · </span>
                                      <span className="text-[var(--accent)] font-semibold">
                                        {card.count}{' '}
                                        {card.count === 1 ? 'topic' : 'topics'}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Bottom Row: Subject + Paper Name & Class */}
                              <div className="pt-4 space-y-0.5 w-full">
                                <div className="text-sm sm:text-base font-bold leading-snug truncate group-hover:text-[var(--accent)] transition-colors">
                                  {card.displayName}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] truncate flex items-center justify-between">
                                  <span>{card.className}</span>
                                  <span className="text-[var(--accent)] font-medium group-hover:translate-x-0.5 transition-transform">
                                    Open Chapters →
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                )}

                {/* ===============================================================
                    STAGE 2: CHAPTERS VIEW (homeStage === 'chapters')
                    Opened after tapping a Subject (e.g., Chemistry 2nd Paper).
                    Tapping a Chapter opens the Expanded Chapter Topics view!
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
                        selectedPaper !== 'Single Paper'
                          ? selectedPaper
                          : ''}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">
                        {effectiveHomeClassFilter === 'ALL'
                          ? 'Class 11-12 (HSC)'
                          : effectiveHomeClassFilter}{' '}
                        · {chaptersForSelectedSubject.length} Chapters — Tap a
                        chapter to view its topics
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
                              {selectedPaper !== 'ALL' ? selectedPaper : ''}
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

                      {/* Adaptive Card Grid Focus Block for Chapters */}
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
                              className="wb-focus-card group min-h-[148px] text-left flex flex-col justify-between"
                            >
                              <div className="w-full flex items-start justify-between gap-3">
                                <div
                                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0"
                                  style={{
                                    backgroundColor: chapAccent.bgSoft,
                                    color: chapAccent.fg,
                                  }}
                                >
                                  Ch {chap.chapterNumber}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] tabular-nums">
                                  {hasReadyTopics ? (
                                    <span className="font-semibold text-[var(--accent)]">
                                      {chap.pages.length}{' '}
                                      {chap.pages.length === 1
                                        ? 'topic book'
                                        : 'topic books'}{' '}
                                      ·{' '}
                                      {chap.pages.reduce(
                                        (acc, p) => acc + p.mainTopics.length,
                                        0
                                      )}{' '}
                                      sections
                                    </span>
                                  ) : (
                                    <span>0 topics</span>
                                  )}
                                </div>
                              </div>

                              <div className="pt-3.5 space-y-1 w-full">
                                <div className="text-sm sm:text-base font-bold leading-snug group-hover:text-[var(--accent)] transition-colors">
                                  {chap.chapterTitle}
                                </div>
                                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                                  {chap.shortDescription}
                                </p>
                              </div>

                              <div className="pt-3 mt-2 border-t border-[var(--border)] w-full flex items-center justify-between text-xs">
                                <span className="text-[var(--text-muted)]">
                                  {selectedSubject} {selectedPaper}
                                </span>
                                <span className="font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                                  Open Chapter →
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
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
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-xl">
                        {activeExpandedChapter.subject}{' '}
                        {activeExpandedChapter.paper} ·{' '}
                        {activeExpandedChapter.className} —{' '}
                        {activeExpandedChapter.pages.length}{' '}
                        {activeExpandedChapter.pages.length === 1
                          ? 'note'
                          : 'notes'}
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
                            {activeExpandedChapter.paper}
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

                      {activeExpandedChapter.pages.length === 0 ? (
                        <div className="wb-focus-block p-10 text-center space-y-3">
                          <div className="text-sm font-bold">
                            No topic notes uploaded in this chapter yet
                          </div>
                          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                            {activeExpandedChapter.shortDescription}. Switch to{' '}
                            <strong>2nd Chapter: Organic Chemistry</strong> to
                            read <strong>Alkane, Alkene &amp; Alkyne</strong>.
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
                              Browse Other Chapters
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
                              Open 2nd Chapter: Organic Chemistry
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

                                    {/* Clean Surface Body (White in Light Mode, #121215 in OLED Dark Mode) */}
                                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 w-full">
                                      <div className="space-y-1.5">
                                        <div className="text-xs text-[var(--text-muted)] truncate">
                                          {page.chapter}
                                        </div>
                                        <div className="text-base sm:text-lg font-bold leading-snug text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                                          {page.title}
                                        </div>
                                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                                          {page.subtitle}
                                        </p>
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
                                        <div className="text-[11px] text-[var(--text-muted)] truncate">
                                          {page.title} · Section {idx + 1}
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
            {/* Render all <section class="topic-section"> blocks */}
            <div
              ref={readerContainerRef}
              className="reader-container space-y-5"
              dangerouslySetInnerHTML={{ __html: activePage.sectionsHtml }}
            />
          </main>
        )}
      </div>

      {/* =====================================================================
          SETTINGS MENU MODAL (Display Mode, Google Login & Profile, Feedback, Admin)
          100% English System Language + 26px Squircle Modal Radius
         ===================================================================== */}
      {settingsOpen && (
        <div
          data-testid="settings-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 view-transition-enter"
        >
          <div className="w-full max-w-lg rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Settings</h2>
                <p className="text-[11px] opacity-55">Web Books by Afeed</p>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close Settings"
                className="p-1.5 rounded-lg hover:bg-[var(--surface-subtle)] opacity-75 hover:opacity-100"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Settings Navigation Tabs */}
            <div className="px-5 pt-3 border-b border-[var(--border)] flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setSettingsTab('display')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  settingsTab === 'display'
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                Display Mode
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab('account')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  settingsTab === 'account'
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                Account &amp; Student Profile
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab('feedback')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  settingsTab === 'feedback'
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                Feedback
              </button>
              {isAdminUser && (
                <button
                  type="button"
                  onClick={() => setSettingsTab('admin')}
                  className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    settingsTab === 'admin'
                      ? 'border-[var(--accent)] text-[var(--accent)]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  Admin Panel
                </button>
              )}
              <button
                type="button"
                onClick={() => setSettingsTab('manual')}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  settingsTab === 'manual'
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                Manual &amp; License
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs">
              {/* TAB 1: DISPLAY MODE (Pitch-Black OLED, Reading Sepia, Light + Font Size) */}
              {settingsTab === 'display' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block font-semibold opacity-80">
                      Color Theme (Automatically remembered)
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setTheme('dark')}
                        className={`py-3 px-3 rounded-2xl border text-center font-semibold transition-all ${
                          theme === 'dark'
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-80'
                        }`}
                      >
                        OLED Dark (#000)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme('yellow')}
                        className={`py-3 px-3 rounded-2xl border text-center font-semibold transition-all ${
                          theme === 'yellow'
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-80'
                        }`}
                      >
                        Reading Sepia
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={`py-3 px-3 rounded-2xl border text-center font-semibold transition-all ${
                          theme === 'light'
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-80'
                        }`}
                      >
                        Clean Light
                      </button>
                    </div>
                  </div>

                  {/* Font Scale */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold opacity-80">
                        Reader Font Size
                      </span>
                      <span className="font-mono">{fontScale}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFontScale((s) => Math.max(14, s - 1))
                        }
                        className="flex-1 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-bold"
                      >
                        A- (Smaller)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontScale(18)}
                        className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)]"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFontScale((s) => Math.min(24, s + 1))
                        }
                        className="flex-1 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-bold"
                      >
                        A+ (Larger)
                      </button>
                    </div>
                  </div>

                   {/* See / Hide All Dropdowns in Reader (English only) */}
                  <div className="space-y-2">
                    <span className="block font-semibold opacity-80">
                      Interactive Mechanism &amp; Note Dropdowns
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleToggleAllDropdowns(true)}
                        className="py-2.5 px-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-semibold hover:border-[var(--accent)]"
                      >
                        See All
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleAllDropdowns(false)}
                        className="py-2.5 px-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-semibold hover:border-[var(--accent)]"
                      >
                        Hide All
                      </button>
                    </div>
                  </div>

                  {/* Adaptive Screen Form Factor & Viewing Area Control */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[var(--accent)]">
                        Adaptive Screen Profile
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-success">
                        {deviceProfile.label}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Viewport: <span className="font-mono">{viewportSize.width}×{viewportSize.height}px</span> · Recommended Grid: <span className="font-mono">{deviceProfile.recommendedColumns} col(s)</span>. Automatically adapts layout margins and focus blocks for Phones, Passport Square Foldables, Book Foldables, DeX, and Desktop PCs.
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium">
                        Top Viewing Area
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setManualViewingCollapsed((prev) => !prev)
                        }
                        className="px-3 py-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[11px] font-semibold hover:border-[var(--accent)]"
                      >
                        {manualViewingCollapsed
                          ? 'Expand Viewing Area'
                          : 'Collapse Viewing Area'}
                      </button>
                    </div>

                    {/* Low-End Device Efficiency Mode (60fps Lite) */}
                    <div className="pt-2 border-t border-[var(--border)] space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium">
                          Low-End Device Efficiency (60fps Lite)
                        </span>
                        <span className="text-[10px] font-semibold text-[var(--accent)]">
                          {isLowEndEfficiencyActive ? 'Active' : 'Standard GPU'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['auto', 'enabled', 'disabled'] as const).map(
                          (mode) => (
                            <button
                              key={mode}
                              type="button"
                              data-testid={`efficiency-mode-${mode}`}
                              onClick={() => setEfficiencyMode(mode)}
                              className={`py-1.5 px-2 rounded-xl border text-[11px] font-semibold capitalize transition-all ${
                                efficiencyMode === mode
                                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                                  : 'border-[var(--border)] bg-[var(--bg-card)] opacity-80 hover:opacity-100'
                              }`}
                            >
                              {mode === 'auto'
                                ? 'Auto Detect'
                                : mode === 'enabled'
                                ? 'Always On'
                                : 'Standard'}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GOOGLE ACCOUNT & STUDENT PROFILE (Optional Class, School, Phone) */}
              {settingsTab === 'account' && (
                <div className="space-y-5">
                  {/* Google Account Login Card */}
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-3">
                    <div className="font-semibold">Google Account</div>
                    {!user ? (
                      <div className="space-y-2">
                        <p className="opacity-75 leading-relaxed">
                          Sign in with your Google Account to sync your profile
                          to Cloud Firestore, submit feedback, or access
                          selective Admin tools.
                        </p>
                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          className="w-full py-2.5 px-4 rounded-2xl btn-accent"
                        >
                          Continue with Google
                        </button>
                        {authErrorDetails && (
                          <div className="p-3 rounded-xl alert-danger text-[11px] space-y-2">
                            <div className="font-semibold flex items-center justify-between">
                              <span>Authentication Issue:</span>
                              <span className="font-mono text-[10px] opacity-80">
                                {authErrorDetails.code}
                              </span>
                            </div>
                            <p className="text-[var(--text-main)] opacity-90 leading-relaxed">
                              {authErrorDetails.actionableTip ||
                                authErrorDetails.message}
                            </p>
                            {authErrorDetails.code === 'unauthorized-domain' && (
                              <div className="pt-1 flex flex-wrap gap-2 items-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.hostname
                                    );
                                    setDomainCopied(true);
                                    window.setTimeout(
                                      () => setDomainCopied(false),
                                      3000
                                    );
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border)] font-semibold hover:border-[var(--accent)]"
                                >
                                  {domainCopied
                                    ? `Copied: ${window.location.hostname}`
                                    : `Copy Domain: ${window.location.hostname}`}
                                </button>
                              </div>
                            )}
                            {authErrorDetails.code === 'popup-blocked' && (
                              <div className="pt-1">
                                <a
                                  href={window.location.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-block px-2.5 py-1 rounded-lg btn-accent"
                                >
                                  Open App in Full Browser Tab ↗
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-bold truncate">
                            {user.displayName || 'User'}
                          </div>
                          <div className="opacity-70 truncate">{user.email}</div>
                          {isAdminUser && (
                            <div className="text-[11px] text-[var(--accent)] font-semibold mt-0.5">
                              Role: Selective Admin
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="px-3 py-1.5 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-card)] shrink-0"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Student Profile Form: Optional Class (filters Home Page!), Optional School, Optional Phone */}
                  <form onSubmit={handleSaveProfile} className="space-y-3.5">
                    <div className="font-semibold">
                      Student Profile (Optional)
                    </div>
                    <p className="text-[11px] opacity-70 leading-relaxed">
                      If you select your Class below, the Home Page will
                      automatically show only your Class subjects while all
                      classes (1–12) remain accessible in the Sidebar.
                    </p>

                    <div>
                      <label className="block text-[11px] opacity-75 mb-1">
                        Class (Optional)
                      </label>
                      <select
                        aria-label="Student Class"
                        data-testid="profile-class-select"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="">All Classes (No Filter)</option>
                        {ALL_CLASS_LEVELS.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] opacity-75 mb-1">
                        School / College Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g., Notre Dame College / Viqarunnisa Noon School"
                        className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] opacity-75 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="+8801XXXXXXXXX"
                        className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={profileSaving}
                      data-testid="save-profile-btn"
                      className="w-full py-2.5 rounded-2xl btn-accent disabled:opacity-50"
                    >
                      {profileSaving ? 'Saving...' : 'Save Student Profile'}
                    </button>

                    {profileStatusMsg && (
                      <p className="text-[var(--success-text)] font-medium text-[11px]">
                        {profileStatusMsg}
                      </p>
                    )}
                  </form>

                  {/* User Data Storage Destinations Overview */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5 text-[11px] opacity-80">
                    <div className="font-semibold text-[var(--accent)]">
                      Where Your Data Is Stored
                    </div>
                    <p>
                      • <strong>Student Profile:</strong> Cloud Firestore{' '}
                      <code className="px-1 py-0.5 rounded bg-[var(--bg-card)]">
                        /users_private/&#123;uid&#125;
                      </code>{' '}
                      (isolated private document) &amp; device{' '}
                      <code className="px-1 py-0.5 rounded bg-[var(--bg-card)]">
                        localStorage
                      </code>
                      .
                    </p>
                    <p>
                      • <strong>Topic Feedbacks:</strong> Cloud Firestore{' '}
                      <code className="px-1 py-0.5 rounded bg-[var(--bg-card)]">
                        /feedbacks/&#123;feedbackId&#125;
                      </code>
                      .
                    </p>
                    <p>
                      • <strong>Display Theme &amp; Font Size:</strong> Device{' '}
                      <code className="px-1 py-0.5 rounded bg-[var(--bg-card)]">
                        localStorage
                      </code>{' '}
                      for instant recall.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: FEEDBACK */}
              {settingsTab === 'feedback' && (
                <div className="space-y-4">
                  <form onSubmit={handleSubmitFeedback} className="space-y-3">
                    <div className="font-semibold">
                      Submit Feedback for: {activePage.title}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1 transition-all ${
                            feedbackRating >= star
                              ? 'bg-[var(--caution-bg)] border-[var(--caution-border)] text-[var(--caution-text)]'
                              : 'border-[var(--border)] opacity-45'
                          }`}
                        >
                          <StarIcon
                            filled={feedbackRating >= star}
                            className="w-3.5 h-3.5"
                          />
                          <span>{star}</span>
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="Write your feedback, question, or suggestion..."
                      className="w-full px-3 py-2 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                    />

                    <button
                      type="submit"
                      disabled={feedbackSubmitting}
                      className="w-full py-2.5 rounded-2xl btn-accent disabled:opacity-50"
                    >
                      {feedbackSubmitting ? 'Sending...' : 'Send Feedback'}
                    </button>

                    {feedbackStatusMsg && (
                      <p className="text-[11px] text-[var(--accent)]">
                        {feedbackStatusMsg}
                      </p>
                    )}
                  </form>

                  {myFeedbacks.length > 0 && (
                    <div className="pt-3 border-t border-[var(--border)] space-y-2">
                      <div className="font-semibold opacity-75">
                        Your Submitted Feedbacks ({myFeedbacks.length})
                      </div>
                      {myFeedbacks.map((fb) => (
                        <div
                          key={fb.id}
                          className="p-3 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--caution-border)] font-bold inline-flex items-center gap-0.5">
                              {Array.from({ length: fb.rating }).map(
                                (_, idx) => (
                                  <StarIcon
                                    key={idx}
                                    filled={true}
                                    className="w-3 h-3"
                                  />
                                )
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteFeedback(fb.id)}
                              className="text-[var(--danger-text)] font-medium hover:underline text-[11px]"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="opacity-90">{fb.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SELECTIVE ADMIN PANEL (Strictly visible only to authorized Admin email) */}
              {settingsTab === 'admin' && isAdminUser && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-3">
                    <div className="font-bold text-[var(--accent)]">
                      Admin Editor Actions
                    </div>
                    <p className="opacity-75">
                      Build or upload new textbook topic pages or export raw
                      HTML sections.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsOpen(false);
                          setUploadModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-2xl btn-accent"
                      >
                        + Upload / Build New Topic Page
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsOpen(false);
                          setRawCodeModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] font-semibold"
                      >
                        Export Raw HTML &amp; Links
                      </button>
                    </div>
                  </div>

                  {/* Selective Admin Email Allowlist Manager */}
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-3">
                    <div className="font-bold">
                      Selective Admin Emails Allowlist
                    </div>
                    <form
                      onSubmit={handleAddSelectiveAdminEmail}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        value={newAdminEmailInput}
                        onChange={(e) => setNewAdminEmailInput(e.target.value)}
                        placeholder="Add admin email (e.g. teacher@gmail.com)"
                        className="flex-1 px-3 py-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-xs"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-2xl btn-accent shrink-0"
                      >
                        Add
                      </button>
                    </form>
                    <div className="space-y-1.5">
                      {selectiveAdminEmails.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
                        >
                          <span className="truncate">{email}</span>
                          {email.toLowerCase() ===
                          PRIMARY_ADMIN_EMAIL.toLowerCase() ? (
                            <span className="text-[10px] opacity-60">
                              Primary Admin
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSelectiveAdminEmail(email)
                              }
                              className="text-[var(--danger-text)] font-medium hover:underline text-[11px]"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: INSTRUCTIONS MANUAL, MULTI-OS NATIVE APP PLAN & OPEN SOURCE LICENSE */}
              {settingsTab === 'manual' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[var(--accent)]">
                        Web Books by Afeed
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-success">
                        MIT Open Source
                      </span>
                    </div>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      A distraction-free multi-platform digital textbook reader and chemistry notebook featuring collapsible Viewing Areas, adaptive layouts for Phones, Passport Foldables, Book Foldables, DeX &amp; Desktop PCs, and theme-safe OLED / Sepia / Light palettes.
                    </p>
                    {deferredInstallPrompt && !isInstalledPWA && (
                      <button
                        type="button"
                        onClick={async () => {
                          await deferredInstallPrompt.prompt();
                          const choice = await deferredInstallPrompt.userChoice;
                          if (choice.outcome === 'accepted') {
                            setIsInstalledPWA(true);
                          }
                          setDeferredInstallPrompt(null);
                        }}
                        className="w-full py-2 px-3 rounded-xl btn-accent text-xs"
                      >
                        Install Web Books App on This Device
                      </button>
                    )}
                  </div>

                  {/* MULTI-OS NATIVE APP ARCHITECTURE & BUILD PLAN (Android, iOS, Windows, macOS, Linux — ARM64 & x86_64) */}
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--accent)]">
                      Native App Plan: Android, iOS, Windows, macOS &amp; Linux (ARM64 &amp; x86_64)
                    </h4>
                    <div className="space-y-2.5 text-[11px] leading-relaxed">
                      <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                        <div className="font-bold text-[var(--text-main)]">
                          1. Android (.apk / .aab) &amp; iOS (.ipa) — Capacitor 6
                        </div>
                        <p className="opacity-80">
                          Wraps this Vite build into native Android Studio &amp; Xcode projects with full offline storage, DeX multi-window resize support, and foldable continuity.
                        </p>
                        <pre className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] font-mono text-[10px] overflow-x-auto">
{`npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "Web Books" com.afeed.webbooks --web-dir=dist
npm run build && npx cap add android && npx cap add ios && npx cap sync`}
                        </pre>
                        <p className="opacity-75 text-[10px]">
                          • <strong>Android ARM64 &amp; x86_64:</strong> In <code className="font-mono">android/app/build.gradle</code> set <code className="font-mono">ndk.abiFilters &quot;arm64-v8a&quot;, &quot;x86_64&quot;</code> for phones/foldables (ARM64) and Chromebooks/Android PC (x86_64).<br />
                          • <strong>iOS ARM64:</strong> Archive in Xcode for iPhone &amp; iPad (<code className="font-mono">arm64</code>).
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                        <div className="font-bold text-[var(--text-main)]">
                          2. Windows, macOS &amp; Linux (ARM64 + x86_64) — Tauri v2 (Rust)
                        </div>
                        <p className="opacity-80">
                          Compiles tiny (~6 MB) native OS binaries using the native OS WebView (WebView2 on Windows, WebKit on macOS/Linux) instead of bundling a 150 MB Electron runtime:
                        </p>
                        <pre className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] font-mono text-[10px] overflow-x-auto">
{`npm i -D @tauri-apps/cli@latest && npx tauri init
# Windows x86_64 & ARM64 (.msi / .exe NSIS):
npx tauri build --target x86_64-pc-windows-msvc
npx tauri build --target aarch64-pc-windows-msvc
# macOS Universal Binary (Apple Silicon ARM64 + Intel x86_64 .dmg/.app):
npx tauri build --target universal-apple-darwin
# Linux x86_64 & ARM64 (.deb / .AppImage / .rpm):
npx tauri build --target x86_64-unknown-linux-gnu
npx tauri build --target aarch64-unknown-linux-gnu`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--accent)]">
                      Instructions Manual &amp; Reading Tips
                    </h4>
                    <div className="space-y-2 opacity-85 leading-relaxed text-[11px]">
                      <div>
                        <strong>1. Three-Tier Navigation Flow:</strong> Tap any Subject &amp; Paper card → Tap Chapter → Tap Topic module to launch the reader.
                      </div>
                      <div>
                        <strong>2. Collapsible Viewing Area:</strong> Scroll down (or tap the collapse chevron <span className="font-mono">^</span> in the header) to smoothly collapse the top Viewing Area into the compact sticky bar.
                      </div>
                      <div>
                        <strong>3. Adaptive DeX, Foldable &amp; Passport Layout:</strong> Automatically scales across Phones (1 col), Passport Square Foldables (2 cols + compact header), Book Foldables/Tablets (3 cols), and DeX / Desktop PCs (4–5 cols).
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-2">
                    <div className="font-bold text-xs">MIT Open Source License</div>
                    <pre className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[10px] font-mono whitespace-pre-wrap leading-tight opacity-75 max-h-36 overflow-y-auto">
{`MIT License
Copyright (c) 2026 Afeed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.`}
                    </pre>
                    <p className="text-[10px] opacity-65">
                      Connected to GitHub with full README.md instructions manual and LICENSE file ready to share.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADMIN ONLY: UPLOAD / BUILD NEW TOPIC PAGE MODAL
         ===================================================================== */}
      {uploadModalOpen && isAdminUser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 view-transition-enter">
          <div className="w-full max-w-2xl rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">
                  Admin: Upload / Build New Topic Page
                </h2>
                <p className="text-xs opacity-65">
                  Organize by Class → Subject → Paper → Chapter → Topic
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
                  Save &amp; Publish Page
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
          <div className="w-full max-w-3xl rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
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
