import React, { useEffect, useMemo, useState } from 'react';
import { User } from 'firebase/auth';
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  Check,
  ChevronRight,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  MonitorSmartphone,
  PackageCheck,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  UserCircle,
  X,
} from 'lucide-react';
import {
  ALL_CLASS_LEVELS,
  AppThemeMode,
  AppVariantMetadata,
  canApproveModeratorContent,
  canApproveModeratorRequests,
  canManageSecondaryAdmins,
  canModifyMainAdmin,
  canSubmitTopicContent,
  CurveProfile,
  CurveRadiusPreset,
  doesContentRequireApproval,
  EfficiencyOverrideMode,
  getCurveRadiusPx,
  GitHubReleaseInfo,
  LibraryTopicPage,
  PendingTopicSubmission,
  PRIMARY_ADMIN_EMAIL,
  ReleaseUpdateSummary,
  RolePermissionRequest,
  UserRole,
} from '../utils/libraryCatalog';
import {
  getDirectGoogleOAuthUrl,
  signInWithGoogleCallbackUrlOrToken,
} from '../firebase';
import { AI_STUDIO_BUILD_GUARDRAILS_PROMPT } from '../utils/googleAuthHelper';
import { AppVersionSection } from './AppVersionSection';

export type SettingsSectionId =
  | 'account'
  | 'theme'
  | 'visual'
  | 'version'
  | 'faq'
  | 'admin'
  | 'manual';

export interface VisualAnimationSettings {
  mode: 'auto' | 'custom';
  reduceAnimation: boolean;
  reduceBlur: boolean;
  reduceTransition: boolean;
}

import { OFFICIAL_MIT_LICENSE_TEXT } from '../utils/brandAssets';
export { OFFICIAL_MIT_LICENSE_TEXT };

interface SettingsPageProps {
  onClose: () => void;
  activeSection: SettingsSectionId;
  setActiveSection: (section: SettingsSectionId) => void;
  // User & Profile
  user: User | null;
  userRole: UserRole;
  handleGoogleLogin: () => void;
  handleLogout: () => void;
  authErrorDetails: {
    code: string;
    message: string;
    actionableTip?: string;
  } | null;
  firebaseProjectId: string;
  studentClass: string;
  setStudentClass: (v: string) => void;
  schoolName: string;
  setSchoolName: (v: string) => void;
  phoneInput: string;
  setPhoneInput: (v: string) => void;
  profileSaving: boolean;
  profileStatusMsg: string;
  handleSaveProfile: (e: React.FormEvent) => void;
  // Theme & Curvature
  theme: AppThemeMode;
  onSelectTheme: (mode: AppThemeMode) => void;
  isThemeAutoDetect: boolean;
  onEnableThemeAutoDetect: () => void;
  fontScale: number;
  setFontScale: React.Dispatch<React.SetStateAction<number>>;
  curveProfile: CurveProfile;
  setCurveProfile: (p: CurveProfile) => void;
  curveRadiusPreset: CurveRadiusPreset;
  setCurveRadiusPreset: (r: CurveRadiusPreset) => void;
  handleToggleAllDropdowns: (open: boolean) => void;
  // Visual & Animation Management
  deviceProfile: {
    formFactor: string;
    label: string;
    showCompactRailWhenCollapsed: boolean;
    recommendedColumns: number;
  };
  viewportSize: { width: number; height: number };
  manualViewingCollapsed: boolean;
  setManualViewingCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  efficiencyMode: EfficiencyOverrideMode;
  setEfficiencyMode: (m: EfficiencyOverrideMode) => void;
  isLowEndEfficiencyActive: boolean;
  visualSettings: VisualAnimationSettings;
  setVisualSettings: React.Dispatch<
    React.SetStateAction<VisualAnimationSettings>
  >;
  onOpenShortcutsModal: () => void;
  // FAQ, Feedback & Moderator Request
  activePageTitle: string;
  feedbackRating: number;
  setFeedbackRating: (r: number) => void;
  feedbackMessage: string;
  setFeedbackMessage: (m: string) => void;
  feedbackSubmitting: boolean;
  feedbackStatusMsg: string;
  handleSubmitFeedback: (e: React.FormEvent) => void;
  myFeedbacks: Array<{
    id: string;
    rating: number;
    message: string;
  }>;
  handleDeleteFeedback: (id: string) => void;
  // Role Governance & Moderation
  secondaryAdminEmails: string[];
  moderatorEmails: string[];
  roleRequests: RolePermissionRequest[];
  pendingSubmissions: PendingTopicSubmission[];
  onSubmitRoleRequest: (req: {
    applicantName: string;
    applicantEmail: string;
    requestedRole: 'moderator' | 'secondary_admin';
    expertiseSubject: string;
    reason: string;
  }) => void;
  onApproveRoleRequest: (requestId: string) => void;
  onRejectRoleRequest: (requestId: string) => void;
  onAddSecondaryAdminEmail: (email: string) => void;
  onRemoveSecondaryAdminEmail: (email: string) => void;
  onAddModeratorEmail: (email: string) => void;
  onRemoveModeratorEmail: (email: string) => void;
  onApprovePendingSubmission: (submissionId: string) => void;
  onRejectPendingSubmission: (submissionId: string) => void;
  onOpenUploadModal: () => void;
  onOpenRawCodeModal: () => void;
  showShortcutToast: (msg: string) => void;
  allPages: LibraryTopicPage[];
  // App Version & Updates System
  currentVersion: string;
  appVariant: AppVariantMetadata;
  releaseSummary: ReleaseUpdateSummary;
  releasesList: GitHubReleaseInfo[];
  preferPrerelease: boolean;
  setPreferPrerelease: (val: boolean) => void;
  checkingUpdates: boolean;
  lastCheckedAt: string;
  onCheckForUpdates: () => void;
}

const ROLE_LABELS: Record<UserRole, string> = {
  main_admin: 'Main Admin (Owner)',
  secondary_admin: 'Secondary Admin',
  moderator: 'Approved Moderator',
  reader: 'Student / Reader',
};

export function SettingsPage({
  onClose,
  activeSection,
  setActiveSection,
  user,
  userRole,
  handleGoogleLogin,
  handleLogout,
  authErrorDetails,
  firebaseProjectId,
  studentClass,
  setStudentClass,
  schoolName,
  setSchoolName,
  phoneInput,
  setPhoneInput,
  profileSaving,
  profileStatusMsg,
  handleSaveProfile,
  theme,
  onSelectTheme,
  isThemeAutoDetect,
  onEnableThemeAutoDetect,
  fontScale,
  setFontScale,
  curveProfile,
  setCurveProfile,
  curveRadiusPreset,
  setCurveRadiusPreset,
  handleToggleAllDropdowns,
  deviceProfile,
  viewportSize,
  manualViewingCollapsed,
  setManualViewingCollapsed,
  efficiencyMode,
  setEfficiencyMode,
  isLowEndEfficiencyActive,
  visualSettings,
  setVisualSettings,
  onOpenShortcutsModal,
  activePageTitle,
  feedbackRating,
  setFeedbackRating,
  feedbackMessage,
  setFeedbackMessage,
  feedbackSubmitting,
  feedbackStatusMsg,
  handleSubmitFeedback,
  myFeedbacks,
  handleDeleteFeedback,
  secondaryAdminEmails,
  moderatorEmails,
  roleRequests,
  pendingSubmissions,
  onSubmitRoleRequest,
  onApproveRoleRequest,
  onRejectRoleRequest,
  onAddSecondaryAdminEmail,
  onRemoveSecondaryAdminEmail,
  onAddModeratorEmail,
  onRemoveModeratorEmail,
  onApprovePendingSubmission,
  onRejectPendingSubmission,
  onOpenUploadModal,
  onOpenRawCodeModal,
  showShortcutToast,
  currentVersion,
  appVariant,
  releaseSummary,
  releasesList,
  preferPrerelease,
  setPreferPrerelease,
  checkingUpdates,
  lastCheckedAt,
  onCheckForUpdates,
}: SettingsPageProps) {
  // Mobile drill-down state: on mobile (<768px), show the main Settings list first, or the selected detail view
  const [mobileDetailOpen, setMobileDetailOpen] = useState<boolean>(
    activeSection === 'version'
  );
  const [settingsSearch, setSettingsSearch] = useState<string>('');
  const [domainCopied, setDomainCopied] = useState<boolean>(false);
  const [licenseCopied, setLicenseCopied] = useState<boolean>(false);
  const [guardrailsCopied, setGuardrailsCopied] = useState<boolean>(false);
  const [directAuthInput, setDirectAuthInput] = useState<string>('');
  const [directAuthStatus, setDirectAuthStatus] = useState<string>('');

  const handleCopyGuardrails = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(AI_STUDIO_BUILD_GUARDRAILS_PROMPT);
        setGuardrailsCopied(true);
        setTimeout(() => setGuardrailsCopied(false), 2400);
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyLicense = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(OFFICIAL_MIT_LICENSE_TEXT);
        setLicenseCopied(true);
        setTimeout(() => setLicenseCopied(false), 2400);
      }
    } catch {
      // Fallback
    }
  };

  const handleDownloadLicense = () => {
    try {
      const blob = new Blob([OFFICIAL_MIT_LICENSE_TEXT], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'LICENSE.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback
    }
  };

  // Android hardware/gesture back button & mobile detail step-back support
  useEffect(() => {
    const handleAndroidBack = (e: Event) => {
      if (
        typeof window !== 'undefined' &&
        window.innerWidth < 768 &&
        mobileDetailOpen
      ) {
        e.preventDefault();
        e.stopPropagation();
        setMobileDetailOpen(false);
      }
    };
    document.addEventListener('backbutton', handleAndroidBack, true);
    return () =>
      document.removeEventListener('backbutton', handleAndroidBack, true);
  }, [mobileDetailOpen]);

  // Moderator / Role Request Form state
  const [reqName, setReqName] = useState<string>(user?.displayName || '');
  const [reqEmail, setReqEmail] = useState<string>(user?.email || '');
  const [reqRoleType, setReqRoleType] = useState<
    'moderator' | 'secondary_admin'
  >('moderator');
  const [reqSubject, setReqSubject] = useState<string>(
    'Class 11-12 Chemistry'
  );
  const [reqReason, setReqReason] = useState<string>('');
  const [reqSubmittedMsg, setReqSubmittedMsg] = useState<string>('');

  // Admin inputs
  const [newSecondaryEmailInput, setNewSecondaryEmailInput] =
    useState<string>('');
  const [newModeratorEmailInput, setNewModeratorEmailInput] =
    useState<string>('');

  // Previewing a pending submission's HTML
  const [previewSubmissionId, setPreviewSubmissionId] = useState<string | null>(
    null
  );

  const canManageSecAdmins = canManageSecondaryAdmins(userRole, user?.email);
  const canApproveMods = canApproveModeratorRequests(userRole);
  const canApproveContent = canApproveModeratorContent(userRole);
  const canSubmitContent = canSubmitTopicContent(userRole);
  const requiresApproval = doesContentRequireApproval(userRole);

  const pendingModRequestsCount = useMemo(
    () => roleRequests.filter((r) => r.status === 'pending').length,
    [roleRequests]
  );
  const pendingContentCount = useMemo(
    () => pendingSubmissions.filter((s) => s.status === 'pending').length,
    [pendingSubmissions]
  );

  const sectionsList = useMemo(
    () => [
      {
        id: 'account' as SettingsSectionId,
        title: 'Profile & Student Account',
        subtitle: 'Google sign-in, class filter, school & role status',
        keywords: 'profile account google login student class school phone role',
        groupAfter: true,
        icon: <UserCircle className="w-4 h-4" />,
      },
      {
        id: 'theme' as SettingsSectionId,
        title: 'Theme & Corner Curvature',
        subtitle:
          'Auto-detect, OLED Dark, Dark, Warm, Light & Deep G2 Squircle',
        keywords:
          'theme appearance dark oled warm sepia light g2 curve squircle corner radius font size',
        groupAfter: false,
        icon: <Palette className="w-4 h-4" />,
      },
      {
        id: 'visual' as SettingsSectionId,
        title: 'Visual & Animation Management',
        subtitle:
          'Adaptive screen, 60fps efficiency, blur/transition controls & shortcuts',
        keywords:
          'visual animation blur transition efficiency 60fps adaptive foldable tablet desktop keyboard shortcuts',
        groupAfter: false,
        icon: <MonitorSmartphone className="w-4 h-4" />,
      },
      {
        id: 'version' as SettingsSectionId,
        title: 'App Version & Updates',
        subtitle: `${releaseSummary.currentVersionTag} · ${appVariant.shortBadge} · ${
          releaseSummary.hasUpdate
            ? `Update ${releaseSummary.targetRelease.tagName} Available`
            : 'Up to Date'
        }`,
        keywords:
          'version update release beta prerelease github apk exe variant build',
        groupAfter: true,
        badgeCount: releaseSummary.hasUpdate ? 1 : 0,
        icon: <PackageCheck className="w-4 h-4" />,
      },
      {
        id: 'faq' as SettingsSectionId,
        title: 'FAQ, Feedback & Moderator Request',
        subtitle: 'Ask questions, send feedback, or apply to become a Moderator',
        keywords:
          'faq help contact feedback rating moderator request permission apply content review',
        groupAfter: false,
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        id: 'admin' as SettingsSectionId,
        title: 'Moderation & Admin Governance',
        subtitle:
          'Main Admin, Secondary Admins, Moderators & Content Approval Queue',
        keywords:
          'admin secondary admin moderator governance approve pending content upload html',
        groupAfter: true,
        badgeCount: pendingModRequestsCount + pendingContentCount,
        icon: <ShieldCheck className="w-4 h-4" />,
      },
      {
        id: 'manual' as SettingsSectionId,
        title: 'User Manual & Open Source License',
        subtitle:
          'How to find books, read comfortably, find & keep the MIT license',
        keywords:
          'manual user guide how to find read books chapters topics search bookmarks themes license mit open source keep attribution terms copyright download copy',
        groupAfter: false,
        icon: <BookOpenCheck className="w-4 h-4" />,
      },
    ],
    [
      pendingModRequestsCount,
      pendingContentCount,
      releaseSummary,
      appVariant.shortBadge,
    ]
  );

  const filteredSections = useMemo(() => {
    const q = settingsSearch.trim().toLowerCase();
    if (!q) return sectionsList;
    return sectionsList.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.keywords.includes(q)
    );
  }, [sectionsList, settingsSearch]);

  const handleSelectSection = (id: SettingsSectionId) => {
    setActiveSection(id);
    setMobileDetailOpen(true);
  };

  const activeSectionMeta =
    sectionsList.find((s) => s.id === activeSection) || sectionsList[0];

  const handleRoleRequestFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = (reqName || user?.displayName || '').trim();
    const cleanEmail = (reqEmail || user?.email || '').trim().toLowerCase();
    const cleanReason = reqReason.trim();
    if (!cleanName || !cleanEmail || !cleanEmail.includes('@') || !cleanReason) {
      setReqSubmittedMsg(
        'Please provide your name, valid email address, and a brief reason for your request.'
      );
      return;
    }
    onSubmitRoleRequest({
      applicantName: cleanName,
      applicantEmail: cleanEmail,
      requestedRole: reqRoleType,
      expertiseSubject: reqSubject.trim() || 'General',
      reason: cleanReason,
    });
    setReqReason('');
    setReqSubmittedMsg(
      reqRoleType === 'secondary_admin'
        ? 'Secondary Admin request submitted! Only the Main Admin (Afeed) can review and approve Secondary Admin requests.'
        : 'Moderator request submitted! A Main Admin or Secondary Admin will review your request.'
    );
  };

  return (
    <div
      data-testid="settings-modal"
      className="wb-settings-page-shell fixed inset-0 z-50 bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col overflow-hidden view-transition-enter"
    >
      {/* Split Master-Detail Phone, Tablet & Desktop Settings Layout */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col md:grid md:grid-cols-[310px_1fr] lg:grid-cols-[370px_1fr] xl:grid-cols-[400px_1fr] h-full overflow-hidden">
        {/* =====================================================================
            LEFT MASTER PANE: SETTINGS NAVIGATION LIST
           ===================================================================== */}
        <aside
          aria-label="Settings Categories"
          className={`flex flex-col h-full border-r border-[var(--border)]/60 bg-[var(--bg-primary)] px-3.5 sm:px-4 pt-4 sm:pt-5 pb-4 overflow-y-auto ${
            mobileDetailOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Top Bar: Back to Reader/Home + Settings Title */}
          <div className="flex items-center justify-between px-1.5 mb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Settings"
                data-testid="close-settings-btn"
                className="w-11 h-11 rounded-2xl flex items-center justify-center hover:bg-[var(--surface-subtle)] transition-colors"
                title="Back to Web Books"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                Settings
              </h1>
            </div>
          </div>

          {/* Top Profile Card with right circular avatar */}
          <button
            type="button"
            data-testid="settings-nav-profile-hero"
            onClick={() => handleSelectSection('account')}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-3xl text-left border transition-all shrink-0 ${
              activeSection === 'account'
                ? 'bg-[var(--accent-soft)] border-[var(--accent)]/40'
                : 'bg-[var(--surface-subtle)]/55 border-[var(--border)] hover:bg-[var(--surface-subtle)]'
            }`}
          >
            <div className="min-w-0">
              <div className="font-bold text-sm sm:text-base truncate text-[var(--text-main)]">
                {user ? user.displayName || user.email || 'Profile' : 'Profile'}
              </div>
              <div className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                {user?.email
                  ? `${user.email} · ${ROLE_LABELS[userRole]}`
                  : `Web Books Account · ${
                      studentClass || 'Tap to set Class & Profile'
                    }`}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {(user?.displayName || user?.email || 'Profile')
                    .slice(0, 1)
                    .toUpperCase()}
                </span>
              )}
            </div>
          </button>

          <div className="wb-dotted-divider my-2.5" />

          {/* Section Navigation Rows (Unified Lucide Icons, Fonts & Theme Colors) */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-0.5">
            {filteredSections.map((sec) => {
              const isSelected = activeSection === sec.id;
              return (
                <React.Fragment key={sec.id}>
                  <button
                    type="button"
                    data-testid={`settings-section-${sec.id}`}
                    onClick={() => handleSelectSection(sec.id)}
                    className={`w-full min-h-[54px] flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] border-[var(--accent)]/40 text-[var(--text-main)] font-semibold shadow-xs'
                        : 'border-transparent hover:bg-[var(--surface-subtle)]/75 text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)]'
                            : 'bg-[var(--surface-subtle)] text-[var(--accent)] border-[var(--border)]'
                        }`}
                      >
                        {sec.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold truncate">
                          {sec.title}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                          {sec.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {typeof sec.badgeCount === 'number' &&
                        sec.badgeCount > 0 && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[var(--accent)] text-[var(--accent-contrast)] tabular-nums">
                            {sec.badgeCount}
                          </span>
                        )}
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)] md:opacity-60" />
                    </div>
                  </button>
                  {sec.groupAfter && <div className="wb-dotted-divider my-2" />}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Bottom Search Input inside Settings */}
          <div className="pt-3 mt-2 shrink-0">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]">
              <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              <input
                type="search"
                value={settingsSearch}
                onChange={(e) => setSettingsSearch(e.target.value)}
                placeholder="Search settings (version, theme, moderator...)"
                aria-label="Search Settings"
                className="w-full bg-transparent text-xs focus:outline-none"
              />
              {settingsSearch && (
                <button
                  type="button"
                  onClick={() => setSettingsSearch('')}
                  aria-label="Clear settings search"
                  className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* =====================================================================
            RIGHT DETAIL PANE: ACTIVE SETTINGS SECTION CONTENT
           ===================================================================== */}
        <main
          aria-label="Settings Section Details"
          className={`flex-1 h-full overflow-y-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 ${
            mobileDetailOpen ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Detail Pane Header */}
          <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile Back to Settings List Button */}
              <button
                type="button"
                data-testid="settings-mobile-back-btn"
                onClick={() => setMobileDetailOpen(false)}
                aria-label="Back to Settings List"
                className="md:hidden w-11 h-11 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-bold tracking-tight truncate">
                  {activeSectionMeta.title}
                </h2>
                <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                  {activeSectionMeta.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs font-semibold transition-colors shrink-0"
            >
              Done
            </button>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 pb-16 text-xs sm:text-sm">
            {/* =================================================================
                SECTION 1: PROFILE & STUDENT ACCOUNT
               ================================================================= */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                {/* Google Account Card */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base">Google Account</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Sync your student profile, submit feedback, or access
                        role tools
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      {ROLE_LABELS[userRole]}
                    </span>
                  </div>

                  {!user ? (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full py-3 px-4 rounded-2xl btn-accent text-xs sm:text-sm font-semibold"
                      >
                        Continue with Google
                      </button>

                      {authErrorDetails && (
                        <div className="p-4 rounded-2xl alert-danger text-xs space-y-2">
                          <div className="font-semibold flex items-center justify-between">
                            <span>Authentication Notice</span>
                            <span className="font-mono text-[11px] opacity-80">
                              {authErrorDetails.code}
                            </span>
                          </div>
                          <p className="opacity-90 leading-relaxed">
                            {authErrorDetails.actionableTip ||
                              authErrorDetails.message}
                          </p>
                          {authErrorDetails.code === 'unauthorized-domain' && (
                            <div className="pt-2 flex flex-wrap gap-2 items-center">
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    window.location.hostname || 'localhost'
                                  );
                                  setDomainCopied(true);
                                  window.setTimeout(
                                    () => setDomainCopied(false),
                                    3000
                                  );
                                }}
                                className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border)] font-semibold"
                              >
                                {domainCopied
                                  ? `Copied: ${
                                      window.location.hostname || 'localhost'
                                    }`
                                  : `Copy Domain: ${
                                      window.location.hostname || 'localhost'
                                    }`}
                              </button>
                              <a
                                href={`https://console.firebase.google.com/project/${firebaseProjectId}/authentication/settings`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-xl btn-accent text-xs font-semibold"
                              >
                                Open Firebase Auth Settings ↗
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Direct Google Sign-In Fallback for Partitioned Browsers / Blocked Popups */}
                      <details
                        open={Boolean(authErrorDetails)}
                        className="rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] p-3.5 text-xs"
                      >
                        <summary className="cursor-pointer font-semibold text-[var(--text-main)] select-none flex items-center justify-between">
                          <span>
                            Direct Google Sign-In (Bypass Popup / SessionStorage)
                          </span>
                          <span className="text-[11px] text-[var(--accent)]">
                            Trouble signing in?
                          </span>
                        </summary>
                        <div className="mt-3 space-y-2.5 text-[var(--text-muted)] leading-relaxed">
                          <p>
                            If your browser shows{' '}
                            <code className="text-[var(--text-main)]">
                              popup-blocked
                            </code>{' '}
                            or{' '}
                            <code className="text-[var(--text-main)]">
                              Unable to process request due to missing initial
                              state
                            </code>
                            , sign in directly below without relying on browser{' '}
                            <code>sessionStorage</code>:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={getDirectGoogleOAuthUrl()}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl btn-accent text-xs font-semibold"
                            >
                              <span>1. Open Direct Google Login Tab ↗</span>
                            </a>
                          </div>
                          <p className="text-[11px]">
                            2. After selecting your Google account, if the tab
                            does not close automatically, copy the full URL from
                            that tab&apos;s address bar (which contains{' '}
                            <code>#access_token=...</code>) and paste it below:
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={directAuthInput}
                              onChange={(e) => {
                                setDirectAuthInput(e.target.value);
                                setDirectAuthStatus('');
                              }}
                              placeholder="Paste callback URL (#access_token=...) or token here"
                              aria-label="Direct Google OAuth callback URL or token"
                              className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-main)] text-xs focus:outline-none focus:border-[var(--accent)]"
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                if (!directAuthInput.trim()) {
                                  setDirectAuthStatus(
                                    'Please paste the redirect URL or token first.'
                                  );
                                  return;
                                }
                                setDirectAuthStatus('Verifying token...');
                                try {
                                  await signInWithGoogleCallbackUrlOrToken(
                                    directAuthInput
                                  );
                                  setDirectAuthInput('');
                                  setDirectAuthStatus(
                                    'Signed in with Google!'
                                  );
                                } catch (e) {
                                  setDirectAuthStatus(
                                    e instanceof Error
                                      ? e.message
                                      : 'Could not verify token.'
                                  );
                                }
                              }}
                              className="px-4 py-2 rounded-xl btn-accent text-xs font-semibold shrink-0"
                            >
                              Verify &amp; Sign In
                            </button>
                          </div>
                          {directAuthStatus && (
                            <p className="text-[11px] font-semibold text-[var(--accent)]">
                              {directAuthStatus}
                            </p>
                          )}
                        </div>
                      </details>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]">
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate">
                          {user.displayName || 'Signed-In User'}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] truncate">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs font-semibold shrink-0"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Student Profile Form */}
                <form
                  onSubmit={handleSaveProfile}
                  className="wb-settings-group p-6 space-y-4"
                >
                  <div>
                    <h3 className="font-bold text-base">
                      Student Profile &amp; Default Class Filter
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                      Selecting your Class automatically focuses the Home Page
                      on your Class subjects while keeping all Classes (1–12)
                      accessible in the Sidebar.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium opacity-80 mb-1.5">
                      Student Class
                    </label>
                    <select
                      aria-label="Student Class"
                      data-testid="profile-class-select"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)]"
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
                    <label className="block text-xs font-medium opacity-80 mb-1.5">
                      School / College Name
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g., Notre Dame College / Rajuk Uttara Model College"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium opacity-80 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+8801XXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={profileSaving}
                    data-testid="save-profile-btn"
                    className="w-full py-3 rounded-2xl btn-accent text-xs sm:text-sm disabled:opacity-50"
                  >
                    {profileSaving ? 'Saving...' : 'Save Student Profile'}
                  </button>

                  {profileStatusMsg && (
                    <p className="text-[var(--success-text)] font-medium text-xs">
                      {profileStatusMsg}
                    </p>
                  )}
                </form>
              </div>
            )}

            {/* =================================================================
                SECTION 2: THEME, APPEARANCE & DEEP G2 CORNER CURVATURE
               ================================================================= */}
            {activeSection === 'theme' && (
              <div className="space-y-6">
                {/* Appearance & Auto-Detect System Card */}
                <div className="wb-settings-group p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base">
                        Appearance &amp; Color Theme
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Auto-detects your device appearance on first launch, and
                        remembers your manual choice once changed.
                      </p>
                    </div>
                    <button
                      type="button"
                      data-testid="theme-auto-detect-btn"
                      onClick={onEnableThemeAutoDetect}
                      className={`px-3.5 py-2 rounded-2xl border text-xs font-semibold transition-all ${
                        isThemeAutoDetect
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      {isThemeAutoDetect
                        ? 'Auto-Detect: Active'
                        : 'Use Device Auto-Detect'}
                    </button>
                  </div>

                  {/* 4 Appearance Options: OLED Dark, Dark, Warm, Light */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(
                      [
                        {
                          id: 'oled',
                          label: 'OLED Dark',
                          sub: 'Pitch Black #000',
                          swatch: '#000000',
                          textCol: '#f5f5f7',
                        },
                        {
                          id: 'dark',
                          label: 'Dark',
                          sub: 'Gray & Lightgrey-Black',
                          swatch: '#1c1c20',
                          textCol: '#f4f4f6',
                        },
                        {
                          id: 'yellow',
                          label: 'Warm',
                          sub: 'Reading Paper',
                          swatch: '#f4ecd8',
                          textCol: '#261c15',
                        },
                        {
                          id: 'light',
                          label: 'Light',
                          sub: 'Daylight Canvas',
                          swatch: '#f2f2f7',
                          textCol: '#0f172a',
                        },
                      ] as const
                    ).map((item) => {
                      const active = theme === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-testid={`theme-option-${item.id}`}
                          onClick={() => onSelectTheme(item.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                            active
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm'
                              : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-85 hover:opacity-100'
                          }`}
                        >
                          <div
                            className="w-full h-10 rounded-xl border border-white/15 flex items-center justify-center text-[11px] font-bold shadow-inner"
                            style={{
                              backgroundColor: item.swatch,
                              color: item.textCol,
                            }}
                          >
                            Aa
                          </div>
                          <div>
                            <div className="font-bold text-xs">
                              {item.label}
                            </div>
                            <div className="text-[10px] opacity-75">
                              {item.sub}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Deep G2 Corner Curvature & Radius Depth Card */}
                <div className="wb-settings-group p-6 space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Corner Curvature &amp; Radius Depth
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                        G2 Continuous Curve uses superellipse geometry with a
                        deeper corner radius ({getCurveRadiusPx(curveRadiusPreset)}
                        px) so cards feel lush, organic, and gentle on the eyes.
                      </p>
                    </div>
                  </div>

                  {/* G2 Continuous vs Classic G1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      data-testid="curve-profile-g2"
                      onClick={() => {
                        setCurveProfile('g2');
                        showShortcutToast(
                          'G2 Continuous Curve (Squircle) Active'
                        );
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        curveProfile === 'g2'
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">
                        G2 Continuous Curve (Squircle)
                      </div>
                      <div className="text-xs opacity-85 leading-relaxed">
                        Smooth curvature ramp (dκ/ds = 0) · Zero corner pinch ·
                        Best for eye comfort.
                      </div>
                    </button>

                    <button
                      type="button"
                      data-testid="curve-profile-classic"
                      onClick={() => {
                        setCurveProfile('classic');
                        showShortcutToast('Classic G1 (Circular Arc) Active');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        curveProfile === 'classic'
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">
                        Classic G1 (Circular Arc)
                      </div>
                      <div className="text-xs opacity-85 leading-relaxed">
                        Traditional circular border-radius with standard 90°
                        tangent transition.
                      </div>
                    </button>
                  </div>

                  {/* Curve Radius Depth Selector (More Curveness!) */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">
                        Corner Radius Depth (Curveness)
                      </span>
                      <span className="font-mono text-xs text-[var(--accent)] font-bold">
                        {getCurveRadiusPx(curveRadiusPreset)}px
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(
                        [
                          {
                            id: 'standard',
                            label: 'Standard (28px)',
                          },
                          {
                            id: 'deep',
                            label: 'Deep Curve (38px)',
                          },
                          {
                            id: 'ultra',
                            label: 'Ultra Curved (46px)',
                          },
                        ] as const
                      ).map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          data-testid={`curve-radius-${r.id}`}
                          onClick={() => {
                            setCurveRadiusPreset(r.id);
                            showShortcutToast(`Corner Radius: ${r.label}`);
                          }}
                          className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                            curveRadiusPreset === r.id
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                              : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-80 hover:opacity-100'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Visual Comparison Preview */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] flex flex-col items-center gap-2 text-center">
                      <div
                        className="w-24 h-16 border-2 border-amber-500/80 bg-amber-500/10 flex items-center justify-center text-xs font-mono font-bold"
                        style={{ borderRadius: '20px' }}
                      >
                        G1 (20px)
                      </div>
                      <span className="text-[11px] opacity-75">
                        Standard Circular Arc
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] flex flex-col items-center gap-2 text-center">
                      <div
                        className="w-24 h-16 border-2 border-[var(--accent)] bg-[var(--accent-soft)] flex items-center justify-center text-xs font-mono font-bold"
                        style={{
                          borderRadius: `${getCurveRadiusPx(
                            curveRadiusPreset
                          )}px`,
                          // @ts-expect-error modern CSS corner-shape
                          cornerShape: 'squircle',
                          WebkitCornerShape: 'squircle',
                        }}
                      >
                        G2 ({getCurveRadiusPx(curveRadiusPreset)}px)
                      </div>
                      <span className="text-[11px] text-[var(--accent)] font-semibold">
                        Deep G2 Squircle · Easy on Eyes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reader Font Size & Interactive Dropdowns */}
                <div className="wb-settings-group p-6 space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">
                        Reader Font Size
                      </span>
                      <span className="font-mono font-bold text-[var(--accent)] tabular-nums">
                        {fontScale}px
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFontScale((s) => Math.max(14, s - 1))}
                        className="flex-1 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-bold"
                      >
                        A- (Smaller)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontScale(18)}
                        className="px-5 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-semibold"
                      >
                        Reset (18px)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontScale((s) => Math.min(26, s + 1))}
                        className="flex-1 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-bold"
                      >
                        A+ (Larger)
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
                    <span className="block font-bold text-sm">
                      Interactive Mechanism &amp; Note Dropdowns
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleAllDropdowns(true)}
                        className="py-2.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-semibold hover:border-[var(--accent)]"
                      >
                        Expand All Notes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleAllDropdowns(false)}
                        className="py-2.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] font-semibold hover:border-[var(--accent)]"
                      >
                        Collapse All Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                SECTION 3: VISUAL & ANIMATION MANAGEMENT (+ KEYBOARD SHORTCUTS)
               ================================================================= */}
            {activeSection === 'visual' && (
              <div className="space-y-6">
                {/* Adaptive Screen Profile */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Adaptive Screen Profile
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Automatically scales focus blocks and margins for
                        Phones, Foldables, Tablets &amp; Desktops
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[var(--accent)]">
                      {deviceProfile.label}
                    </span>
                  </div>

                  <p className="text-xs opacity-80 leading-relaxed">
                    Current Viewport:{' '}
                    <span className="font-mono tabular-nums">
                      {viewportSize.width}×{viewportSize.height}px
                    </span>{' '}
                    · Recommended Grid:{' '}
                    <span className="font-mono tabular-nums">
                      {deviceProfile.recommendedColumns} column(s)
                    </span>
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <span className="text-xs font-medium">
                      Top Collapsible Viewing Area
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setManualViewingCollapsed((prev) => !prev)
                      }
                      className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold hover:border-[var(--accent)]"
                    >
                      {manualViewingCollapsed
                        ? 'Expand Viewing Area'
                        : 'Collapse Viewing Area'}
                    </button>
                  </div>
                </div>

                {/* Efficiency Panel & Animation / Blur / Transition Reduction */}
                <div className="wb-settings-group p-6 space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Efficiency &amp; Motion Management
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Defaults to Auto Detect. Customize animation, glass
                        blur, and page transitions below.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      {isLowEndEfficiencyActive
                        ? '60fps Lite Active'
                        : 'Standard GPU'}
                    </span>
                  </div>

                  {/* Hardware Efficiency Mode (Default: Auto Detect) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold opacity-85">
                      Hardware Efficiency Preset
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(['auto', 'enabled', 'disabled'] as const).map(
                        (mode) => (
                          <button
                            key={mode}
                            type="button"
                            data-testid={`efficiency-mode-${mode}`}
                            onClick={() => {
                              setEfficiencyMode(mode);
                              if (mode === 'auto') {
                                setVisualSettings((prev) => ({
                                  ...prev,
                                  mode: 'auto',
                                }));
                              } else if (mode === 'enabled') {
                                setVisualSettings({
                                  mode: 'custom',
                                  reduceAnimation: true,
                                  reduceBlur: true,
                                  reduceTransition: true,
                                });
                              } else {
                                setVisualSettings({
                                  mode: 'custom',
                                  reduceAnimation: false,
                                  reduceBlur: false,
                                  reduceTransition: false,
                                });
                              }
                            }}
                            className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                              efficiencyMode === mode
                                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                                : 'border-[var(--border)] bg-[var(--surface-subtle)] opacity-80 hover:opacity-100'
                            }`}
                          >
                            {mode === 'auto'
                              ? 'Auto Detect (Default)'
                              : mode === 'enabled'
                              ? '60fps Lite (Reduce All)'
                              : 'Full Visuals'}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Granular Toggles: Reduce Animation, Reduce Blur, Reduce Transition */}
                  <div className="pt-3 border-t border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs">
                          Reduce Animations
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          Disables keyframe animations and micro-bounces
                        </div>
                      </div>
                      <button
                        type="button"
                        data-testid="toggle-reduce-animation"
                        onClick={() =>
                          setVisualSettings((prev) => ({
                            ...prev,
                            mode: 'custom',
                            reduceAnimation: !prev.reduceAnimation,
                          }))
                        }
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          visualSettings.reduceAnimation
                            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)]'
                            : 'bg-[var(--surface-subtle)] border-[var(--border)]'
                        }`}
                      >
                        {visualSettings.reduceAnimation ? 'Reduced' : 'Normal'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs">
                          Reduce Glass Blur (Backdrop Filter)
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          Replaces translucent Gaussian blur headers with solid
                          surfaces for faster scrolling
                        </div>
                      </div>
                      <button
                        type="button"
                        data-testid="toggle-reduce-blur"
                        onClick={() =>
                          setVisualSettings((prev) => ({
                            ...prev,
                            mode: 'custom',
                            reduceBlur: !prev.reduceBlur,
                          }))
                        }
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          visualSettings.reduceBlur
                            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)]'
                            : 'bg-[var(--surface-subtle)] border-[var(--border)]'
                        }`}
                      >
                        {visualSettings.reduceBlur ? 'Blur Off' : 'Blur On'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs">
                          Reduce Page &amp; Drawer Transitions
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          Makes sidebar and view switches instantaneous
                        </div>
                      </div>
                      <button
                        type="button"
                        data-testid="toggle-reduce-transition"
                        onClick={() =>
                          setVisualSettings((prev) => ({
                            ...prev,
                            mode: 'custom',
                            reduceTransition: !prev.reduceTransition,
                          }))
                        }
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          visualSettings.reduceTransition
                            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)]'
                            : 'bg-[var(--surface-subtle)] border-[var(--border)]'
                        }`}
                      >
                        {visualSettings.reduceTransition
                          ? 'Instant'
                          : 'Smooth'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Keyboard Shortcuts List (Moved from Home Header into Settings!) */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Keyboard Shortcuts
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Global hotkeys for rapid navigation when not typing in
                        an input field
                      </p>
                    </div>
                    <button
                      type="button"
                      data-testid="open-shortcuts-from-settings-btn"
                      onClick={onOpenShortcutsModal}
                      className="px-3.5 py-2 rounded-2xl btn-accent text-xs"
                    >
                      Popup Guide (?)
                    </button>
                  </div>

                  <div className="divide-y divide-[var(--border)] text-xs">
                    {[
                      {
                        label: 'Focus Search Bar',
                        keys: 's / / / Ctrl+K',
                      },
                      {
                        label:
                          'Cycle Theme (OLED Dark / Dark / Warm / Light)',
                        keys: 't',
                      },
                      {
                        label:
                          'Toggle Corner Curve (G2 Squircle / Classic G1)',
                        keys: 'c',
                      },
                      {
                        label: 'Return to Home (All Subjects)',
                        keys: 'h',
                      },
                      {
                        label: 'Decrease / Increase Reader Font Size',
                        keys: '[  or  ]',
                      },
                      {
                        label: 'Close Settings / Modals / Go Back',
                        keys: 'Esc',
                      },
                    ].map((sc) => (
                      <div
                        key={sc.label}
                        className="py-2.5 flex items-center justify-between gap-2"
                      >
                        <span className="opacity-85">{sc.label}</span>
                        <kbd className="px-2.5 py-1 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-[11px]">
                          {sc.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                SECTION 3.5: APP VERSION, UPDATES & PRE-RELEASE (BETA) SYSTEM
               ================================================================= */}
            {activeSection === 'version' && (
              <AppVersionSection
                currentVersion={currentVersion}
                appVariant={appVariant}
                deviceFormFactorLabel={deviceProfile.label}
                releaseSummary={releaseSummary}
                releasesList={releasesList}
                preferPrerelease={preferPrerelease}
                setPreferPrerelease={setPreferPrerelease}
                checkingUpdates={checkingUpdates}
                lastCheckedAt={lastCheckedAt}
                onCheckForUpdates={onCheckForUpdates}
              />
            )}

            {/* =================================================================
                SECTION 4: FAQ, FEEDBACK & MODERATOR ACCESS REQUEST
               ================================================================= */}
            {activeSection === 'faq' && (
              <div className="space-y-6">
                {/* Frequently Asked Questions */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-base">
                      Frequently Asked Questions (FAQ)
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Common questions about Web Books, offline mode, and
                      contributing notes
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <details className="interactive-drop" open>
                      <summary>
                        How do I become a Moderator to add new chapters or notes?
                      </summary>
                      <div className="drop-content text-xs space-y-1.5">
                        <p>
                          Fill out the{' '}
                          <strong>Request Moderator Permission</strong> form
                          below! Once approved by the Main Admin or a Secondary
                          Admin, you can upload new topic pages. Every topic
                          added by a Moderator enters the{' '}
                          <strong>Content Approval Queue</strong> first so
                          admins can verify accuracy before publishing.
                        </p>
                      </div>
                    </details>

                    <details className="interactive-drop">
                      <summary>
                        What is the difference between Main Admin, Secondary
                        Admin, and Moderator?
                      </summary>
                      <div className="drop-content text-xs space-y-1.5">
                        <p>
                          • <strong>Main Admin ({PRIMARY_ADMIN_EMAIL}):</strong>{' '}
                          Root owner. Only the Main Admin can approve or manage
                          Secondary Admins. Cannot be removed or overridden.
                        </p>
                        <p>
                          • <strong>Secondary Admin:</strong> Can do everything
                          a Moderator does, plus review and approve Moderator
                          requests and Moderator content submissions. Cannot
                          modify or take over the Main Admin.
                        </p>
                        <p>
                          • <strong>Moderator:</strong> Can build and submit new
                          chapters/topics, which are checked and approved by an
                          Admin before going live.
                        </p>
                      </div>
                    </details>

                    <details className="interactive-drop">
                      <summary>
                        Does Web Books work offline on Android APK &amp; Windows
                        Desktop EXE?
                      </summary>
                      <div className="drop-content text-xs">
                        <p>
                          Yes! Built-in NCTB curriculum subjects, chemistry
                          mechanisms, theme preferences, and your Student
                          Profile work 100% offline. Cloud Firestore syncs
                          automatically whenever internet connectivity is
                          available.
                        </p>
                      </div>
                    </details>
                  </div>
                </div>

                {/* Request Permission to be a Moderator (or Secondary Admin) */}
                <form
                  onSubmit={handleRoleRequestFormSubmit}
                  className="wb-settings-group p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Request Moderator or Secondary Admin Permission
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                        Apply to contribute new chapters and topic notes.
                        Moderator submissions are reviewed before publishing.
                        Secondary Admin applications can only be accepted by the
                        Main Admin.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium opacity-80 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        data-testid="role-req-name"
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        placeholder="e.g., Tanvir Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium opacity-80 mb-1">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        data-testid="role-req-email"
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium opacity-80 mb-1">
                        Requested Role
                      </label>
                      <select
                        aria-label="Requested Role"
                        data-testid="role-req-type"
                        value={reqRoleType}
                        onChange={(e) =>
                          setReqRoleType(
                            e.target.value as 'moderator' | 'secondary_admin'
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      >
                        <option value="moderator">
                          Moderator (Add Content with Review Approval)
                        </option>
                        <option value="secondary_admin">
                          Secondary Admin (Requires Main Admin Approval Only)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium opacity-80 mb-1">
                        Subject / Class Area
                      </label>
                      <input
                        type="text"
                        value={reqSubject}
                        onChange={(e) => setReqSubject(e.target.value)}
                        placeholder="e.g., HSC Chemistry / Physics"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium opacity-80 mb-1">
                      Why would you like to join &amp; what notes will you
                      contribute?
                    </label>
                    <textarea
                      rows={3}
                      data-testid="role-req-reason"
                      value={reqReason}
                      onChange={(e) => setReqReason(e.target.value)}
                      placeholder="Describe the chapters or topics you want to add..."
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    data-testid="submit-role-req-btn"
                    className="w-full py-3 rounded-2xl btn-accent text-xs sm:text-sm"
                  >
                    Submit Permission Request
                  </button>

                  {reqSubmittedMsg && (
                    <p
                      data-testid="role-req-status"
                      className="text-xs font-medium text-[var(--accent)]"
                    >
                      {reqSubmittedMsg}
                    </p>
                  )}
                </form>

                {/* Connect / Ask a Question or Send Feedback */}
                <div className="wb-settings-group p-6 space-y-4">
                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div>
                      <h3 className="font-bold text-base">
                        Connect with Afeed &amp; Send Feedback
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Ask a question or rate current topic:{' '}
                        <strong>{activePageTitle}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1 transition-all ${
                            feedbackRating >= star
                              ? 'bg-[var(--caution-bg)] border-[var(--caution-border)] text-[var(--caution-text)]'
                              : 'border-[var(--border)] opacity-50'
                          }`}
                        >
                          <span>★</span>
                          <span>{star}</span>
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="Write your question, feedback, or chapter request..."
                      className="w-full px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--accent)]"
                    />

                    <button
                      type="submit"
                      disabled={feedbackSubmitting}
                      className="w-full py-3 rounded-2xl btn-accent text-xs sm:text-sm disabled:opacity-50"
                    >
                      {feedbackSubmitting
                        ? 'Sending...'
                        : 'Send Question / Feedback'}
                    </button>

                    {feedbackStatusMsg && (
                      <p className="text-xs text-[var(--accent)] font-medium">
                        {feedbackStatusMsg}
                      </p>
                    )}
                  </form>

                  {myFeedbacks.length > 0 && (
                    <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
                      <div className="font-semibold text-xs opacity-80">
                        Your Submitted Messages ({myFeedbacks.length})
                      </div>
                      {myFeedbacks.map((fb) => (
                        <div
                          key={fb.id}
                          className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--caution-border)] font-bold text-xs">
                              {'★'.repeat(fb.rating)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteFeedback(fb.id)}
                              className="text-[var(--danger-text)] font-medium hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="text-xs opacity-90">{fb.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                SECTION 5: MODERATION & ADMIN GOVERNANCE CENTER
               ================================================================= */}
            {activeSection === 'admin' && (
              <div className="space-y-6">
                {/* Role Hierarchy Status Banner */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Role Governance &amp; Content Moderation
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Your current role:{' '}
                        <strong className="text-[var(--accent)]">
                          {ROLE_LABELS[userRole]}
                        </strong>
                      </p>
                    </div>
                    {canSubmitContent && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          data-testid="settings-open-upload-btn"
                          onClick={onOpenUploadModal}
                          className="px-4 py-2 rounded-2xl btn-accent text-xs"
                        >
                          {requiresApproval
                            ? '+ Submit Topic for Approval'
                            : '+ Upload / Publish Topic Page'}
                        </button>
                        {(userRole === 'main_admin' ||
                          userRole === 'secondary_admin') && (
                          <button
                            type="button"
                            onClick={onOpenRawCodeModal}
                            className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold"
                          >
                            Export Raw HTML
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Clear Governance Rules Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                      <div className="font-bold text-[var(--accent)]">
                        1. Main Admin (Owner)
                      </div>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        Immutable owner ({PRIMARY_ADMIN_EMAIL}). Exclusively
                        approves Secondary Admins, Moderators, and content.
                        Cannot be removed or overridden.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                      <div className="font-bold text-[var(--success-text)]">
                        2. Secondary Admin
                      </div>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        Has all Moderator capabilities + can approve Moderator
                        requests &amp; Moderator content. Cannot take over Main
                        Admin or manage Secondary Admins.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                      <div className="font-bold text-[var(--caution-text)]">
                        3. Moderator
                      </div>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        Allowed to add new chapter/topic content. All new
                        Moderator content is checked first and must be approved
                        by an Admin before going live.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PENDING CONTENT APPROVAL QUEUE (Moderators submit -> Main/Secondary Admin checks & approves) */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Moderator Content Approval Queue (
                        {pendingSubmissions.length})
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        New chapters/topics added by Moderators wait here until
                        checked and approved by Main Admin or a Secondary Admin.
                      </p>
                    </div>
                  </div>

                  {pendingSubmissions.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
                      No moderator topic submissions in the queue right now.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          data-testid={`pending-submission-${sub.id}`}
                          className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <div className="font-bold text-sm">
                                {sub.page.title}
                              </div>
                              <div className="text-[11px] text-[var(--text-muted)]">
                                {sub.page.className} · {sub.page.subject} (
                                {sub.page.paper}) · {sub.page.chapter}
                              </div>
                              <div className="text-[11px] opacity-75 mt-0.5">
                                Submitted by: {sub.authorName} (
                                {sub.authorEmail}) · Status:{' '}
                                <strong className="uppercase">
                                  {sub.status}
                                </strong>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewSubmissionId(
                                    previewSubmissionId === sub.id
                                      ? null
                                      : sub.id
                                  )
                                }
                                className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-semibold"
                              >
                                {previewSubmissionId === sub.id
                                  ? 'Hide Check'
                                  : 'Check Content'}
                              </button>
                              {canApproveContent &&
                                sub.status === 'pending' && (
                                  <>
                                    <button
                                      type="button"
                                      data-testid={`approve-submission-${sub.id}`}
                                      onClick={() =>
                                        onApprovePendingSubmission(sub.id)
                                      }
                                      className="px-3.5 py-1.5 rounded-xl btn-accent text-xs font-semibold"
                                    >
                                      Approve &amp; Publish
                                    </button>
                                    <button
                                      type="button"
                                      data-testid={`reject-submission-${sub.id}`}
                                      onClick={() =>
                                        onRejectPendingSubmission(sub.id)
                                      }
                                      className="px-3 py-1.5 rounded-xl alert-danger text-xs font-semibold"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                            </div>
                          </div>

                          {previewSubmissionId === sub.id && (
                            <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                              {sub.page.sectionsHtml}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ROLE REQUESTS QUEUE (Moderator & Secondary Admin Requests) */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-base">
                      Permission Requests Queue ({roleRequests.length})
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Secondary Admins &amp; Main Admin can approve Moderator
                      requests. Only Main Admin ({PRIMARY_ADMIN_EMAIL}) can
                      approve Secondary Admin requests.
                    </p>
                  </div>

                  {roleRequests.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
                      No pending role requests. Users can apply in the FAQ &amp;
                      Moderator Request section.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {roleRequests.map((req) => {
                        const isSecAdminReq =
                          req.requestedRole === 'secondary_admin';
                        const canCurrentUserDecide = isSecAdminReq
                          ? canManageSecAdmins
                          : canApproveMods;

                        return (
                          <div
                            key={req.id}
                            data-testid={`role-request-item-${req.id}`}
                            className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5 min-w-0">
                              <div className="font-bold text-xs sm:text-sm">
                                {req.applicantName} ({req.applicantEmail})
                              </div>
                              <div className="text-[11px] text-[var(--accent)] font-semibold">
                                Requested:{' '}
                                {isSecAdminReq
                                  ? 'Secondary Admin (Main Admin Approval Only)'
                                  : 'Moderator'}{' '}
                                · {req.expertiseSubject}
                              </div>
                              <p className="text-xs opacity-85">{req.reason}</p>
                              <div className="text-[10px] opacity-65">
                                Status:{' '}
                                <strong className="uppercase">
                                  {req.status}
                                </strong>
                                {req.reviewedBy
                                  ? ` · Reviewed by ${req.reviewedBy}`
                                  : ''}
                              </div>
                            </div>

                            {req.status === 'pending' && (
                              <div className="flex items-center gap-2 shrink-0">
                                {canCurrentUserDecide ? (
                                  <>
                                    <button
                                      type="button"
                                      data-testid={`approve-role-req-${req.id}`}
                                      onClick={() =>
                                        onApproveRoleRequest(req.id)
                                      }
                                      className="px-3.5 py-1.5 rounded-xl btn-accent text-xs font-semibold"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      type="button"
                                      data-testid={`reject-role-req-${req.id}`}
                                      onClick={() =>
                                        onRejectRoleRequest(req.id)
                                      }
                                      className="px-3 py-1.5 rounded-xl alert-danger text-xs font-semibold"
                                    >
                                      Decline
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-[11px] opacity-65 italic">
                                    {isSecAdminReq
                                      ? 'Only Main Admin can approve Secondary Admins'
                                      : 'Admin permission required'}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* MODERATOR ALLOWLIST (Managed by Main Admin OR Secondary Admin) */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-base">
                      Approved Moderators ({moderatorEmails.length})
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Moderators can submit new chapters/topics for approval.
                      Managed by Main Admin and Secondary Admins.
                    </p>
                  </div>

                  {canApproveMods && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newModeratorEmailInput.trim()) return;
                        onAddModeratorEmail(newModeratorEmailInput);
                        setNewModeratorEmailInput('');
                      }}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        type="email"
                        data-testid="add-moderator-input"
                        value={newModeratorEmailInput}
                        onChange={(e) =>
                          setNewModeratorEmailInput(e.target.value)
                        }
                        placeholder="Add moderator email (e.g., contributor@gmail.com)"
                        className="flex-1 px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      />
                      <button
                        type="submit"
                        data-testid="add-moderator-btn"
                        className="px-4 py-2.5 rounded-2xl btn-accent text-xs shrink-0"
                      >
                        Add Moderator
                      </button>
                    </form>
                  )}

                  <div className="space-y-1.5">
                    {moderatorEmails.length === 0 ? (
                      <div className="text-xs text-[var(--text-muted)]">
                        No separate moderators added yet.
                      </div>
                    ) : (
                      moderatorEmails.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                        >
                          <span className="truncate">{email}</span>
                          {canApproveMods && canModifyMainAdmin(email) && (
                            <button
                              type="button"
                              onClick={() => onRemoveModeratorEmail(email)}
                              className="text-[var(--danger-text)] font-semibold hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* SECONDARY ADMIN ALLOWLIST (Strictly ONLY Main Admin can add/remove!) */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">
                        Secondary Admins &amp; Main Admin Lock
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Only the Main Admin ({PRIMARY_ADMIN_EMAIL}) can add or
                        remove Secondary Admins. Secondary Admins cannot take
                        over or remove the Main Admin.
                      </p>
                    </div>
                  </div>

                  {canManageSecAdmins ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newSecondaryEmailInput.trim()) return;
                        onAddSecondaryAdminEmail(newSecondaryEmailInput);
                        setNewSecondaryEmailInput('');
                      }}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        type="email"
                        data-testid="add-secondary-admin-input"
                        value={newSecondaryEmailInput}
                        onChange={(e) =>
                          setNewSecondaryEmailInput(e.target.value)
                        }
                        placeholder="Add Secondary Admin email (Main Admin only)"
                        className="flex-1 px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                      />
                      <button
                        type="submit"
                        data-testid="add-secondary-admin-btn"
                        className="px-4 py-2.5 rounded-2xl btn-accent text-xs shrink-0"
                      >
                        Add Secondary Admin
                      </button>
                    </form>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
                      Locked: Only the Main Admin ({PRIMARY_ADMIN_EMAIL}) can
                      accept or modify Secondary Admins.
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {secondaryAdminEmails.map((email) => {
                      const isPrimary =
                        email.toLowerCase() ===
                        PRIMARY_ADMIN_EMAIL.toLowerCase();
                      return (
                        <div
                          key={email}
                          className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                        >
                          <span className="truncate font-medium">{email}</span>
                          {isPrimary ? (
                            <span className="text-[11px] font-bold text-[var(--accent)]">
                              Main Admin (Protected Owner)
                            </span>
                          ) : canManageSecAdmins ? (
                            <button
                              type="button"
                              onClick={() => onRemoveSecondaryAdminEmail(email)}
                              className="text-[var(--danger-text)] font-semibold hover:underline"
                            >
                              Remove Secondary Admin
                            </button>
                          ) : (
                            <span className="text-[11px] opacity-65">
                              Secondary Admin
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                SECTION 6: USER MANUAL & OPEN SOURCE LICENSE GUIDE
               ================================================================= */}
            {activeSection === 'manual' && (
              <div className="space-y-6" data-testid="settings-manual-section">
                {/* Header & Quick Action Card */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                          <BookOpen className="w-4 h-4" />
                        </span>
                        <h3 className="font-bold text-base text-[var(--text-main)]">
                          User Manual &amp; MIT License Guide
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                        A complete guide to navigating Web Books, personalizing
                        your reading workflow, understanding the MIT Open Source
                        License, and keeping your copy compliant.
                      </p>
                    </div>

                    {/* Quick License Actions */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <button
                        type="button"
                        onClick={handleCopyLicense}
                        aria-label="Copy MIT License"
                        data-testid="copy-license-btn"
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          licenseCopied
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                            : 'bg-[var(--surface-subtle)] border-[var(--border)] text-[var(--text-main)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                        }`}
                      >
                        {licenseCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy License</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadLicense}
                        aria-label="Download LICENSE file"
                        data-testid="download-license-btn"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--text-main)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
                        title="Download official LICENSE.txt file to your device"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download LICENSE</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary badges */}
                  <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[var(--border)]/60 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent)]/30">
                      MIT Open Source
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
                      Author: Afeed (2026)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Free for Study &amp; Distribution
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      Attribution Required
                    </span>
                  </div>
                </div>

                {/* Chapter 1: How to Find Books, Chapters & Topics */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Compass className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-main)]">
                      1. How to Find Books, Classes &amp; Topics
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)] flex items-center gap-2">
                        <span>🎓 Class &amp; Grade Switcher</span>
                      </div>
                      <p className="text-[var(--text-muted)]">
                        Use the <strong>Home (All Classes)</strong> view or tap{' '}
                        <strong>My Class</strong> (e.g., HSC, SSC, or Class
                        1–8) in the top breadcrumb pill or sidebar to filter
                        your subjects instantly.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)] flex items-center gap-2">
                        <span>📚 Subject &amp; Paper Drill-Down</span>
                      </div>
                      <p className="text-[var(--text-muted)]">
                        Tap any Subject card (e.g. <em>Chemistry 2nd Paper</em>)
                        to view its chapters. Tap a Chapter card to reveal all
                        individual topic sections and reading modules.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)] flex items-center gap-2">
                        <span>🔍 Fast Keyboard &amp; Header Search</span>
                      </div>
                      <p className="text-[var(--text-muted)]">
                        Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-[10px]">/</kbd>{' '}
                        on your physical keyboard or tap the search icon in the
                        header to search topics, yields, equations, and
                        definitions in real time.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)] flex items-center gap-2">
                        <span>📑 Clickable Prose, Poetry &amp; Units</span>
                      </div>
                      <p className="text-[var(--text-muted)]">
                        In Bangla and English papers, chapters are divided into
                        clickable semi-chapters (individual prose pieces, poems,
                        and grammar units) for direct 1-tap reading.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter 2: How to Read & Personalize Study */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-main)]">
                      2. How to Read &amp; Customize Your Study Experience
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)]">
                        📖 Distraction-Free Reading Mode
                      </div>
                      <p className="text-[var(--text-muted)]">
                        When opening any topic, sidebar navigation tucks away
                        and the top Viewing Area collapses smoothly as you
                        scroll, maximizing screen area for textbooks and notes.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)]">
                        🎨 4 Eye-Care Display Themes
                      </div>
                      <p className="text-[var(--text-muted)]">
                        In <strong>Settings → Appearance &amp; Theme</strong>,
                        choose between <em>Dex Charcoal Night</em>,{' '}
                        <em>AMOLED Pure Black</em>, <em>Dex Day Mode</em>, and{' '}
                        <em>Warm Sepia</em> for fatigue-free night reading.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)]">
                        📐 Deep G2 Continuous Curvature (38px Squircle)
                      </div>
                      <p className="text-[var(--text-muted)]">
                        Cards and UI panels use mathematically continuous G2
                        superellipse rounding (38px / 46px squircle) to ensure
                        organic corner continuity and high eye comfort.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1.5">
                      <div className="font-bold text-[var(--text-main)]">
                        💾 Offline Study &amp; Local Persistence
                      </div>
                      <p className="text-[var(--text-muted)]">
                        All built-in curriculum notes, reading positions, and
                        preferences persist on your device, allowing you to
                        study smoothly without requiring active internet access.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter 3: How to Find & Read the License */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                      <FileText className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-main)]">
                      3. How to Find &amp; Read the License
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                      <div className="font-bold text-[var(--text-main)]">
                        Where is the License Found?
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)]">
                        <li>
                          <strong>In the App:</strong> Always accessible at any
                          time right here under{' '}
                          <code>Settings → User Manual &amp; License</code>.
                        </li>
                        <li>
                          <strong>In the Source Code &amp; Binaries:</strong> An
                          official plain-text file named <code>LICENSE</code> is
                          stored in the root directory of the Web Books
                          repository and included in all releases.
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                      <div className="font-bold text-[var(--text-main)]">
                        What Rights Does the MIT License Grant You?
                      </div>
                      <p className="text-[var(--text-muted)]">
                        The MIT License is one of the most generous and
                        open-ended licenses in software and education. It grants
                        every user, reader, student, and educator the right to:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]/60">
                          <span className="font-semibold text-emerald-400">
                            ✓ Free of Charge:
                          </span>{' '}
                          No purchase, royalty fees, or subscription required.
                        </div>
                        <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]/60">
                          <span className="font-semibold text-emerald-400">
                            ✓ Study &amp; Read:
                          </span>{' '}
                          Free to use for personal, academic, or classroom
                          study.
                        </div>
                        <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]/60">
                          <span className="font-semibold text-emerald-400">
                            ✓ Share &amp; Distribute:
                          </span>{' '}
                          Free to distribute copies to classmates and schools.
                        </div>
                        <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]/60">
                          <span className="font-semibold text-emerald-400">
                            ✓ Modify &amp; Adapt:
                          </span>{' '}
                          Free to build extensions, add regional curriculums, or
                          remix notes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter 4: How to Keep & Comply with the License */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-main)]">
                      4. How to Keep &amp; Comply with the License
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                      <div className="font-bold text-[var(--text-main)]">
                        The Single Legal Requirement: Retain the Copyright &amp;
                        Permission Notice
                      </div>
                      <p className="text-[var(--text-muted)]">
                        To keep and comply with the license when sharing,
                        forking, or publishing derivative editions of Web Books:
                      </p>
                      <p className="text-[var(--text-main)] font-medium">
                        You must simply include the original copyright notice (
                        <code>Copyright (c) 2026 Afeed</code>) and the
                        permission notice in all copies or substantial portions
                        of the software and notes.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                      <div className="font-bold text-[var(--text-main)]">
                        How to Keep a Copy Offline:
                      </div>
                      <div className="flex items-center gap-3 flex-wrap pt-1">
                        <button
                          type="button"
                          onClick={handleCopyLicense}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold btn-accent flex items-center gap-1.5"
                        >
                          {licenseCopied ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy Full License Text</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleDownloadLicense}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--border)] text-[var(--text-main)] hover:border-[var(--accent)] flex items-center gap-1.5 transition-all duration-200"
                        >
                          <Download className="w-4 h-4" />
                          <span>Save as LICENSE.txt</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1 opacity-80">
                        Saving <code>LICENSE.txt</code> to your computer or
                        phone repository preserves the legal attribution and
                        protects your right to use and distribute the project
                        perpetually.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter 5: Verbatim Official MIT License */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                        <FileText className="w-4 h-4" />
                      </span>
                      <h3 className="font-bold text-sm text-[var(--text-main)]">
                        5. Official MIT License (Verbatim Text)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLicense}
                      className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                    >
                      {licenseCopied ? '✓ Copied!' : 'Copy Text'}
                    </button>
                  </div>

                  <pre className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-[var(--text-secondary)] select-all overflow-x-auto">
                    {OFFICIAL_MIT_LICENSE_TEXT}
                  </pre>
                </div>

                {/* Chapter 6: AI Studio Build & Versioning Guardrails Prompt */}
                <div className="wb-settings-group p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                      <h3 className="font-bold text-sm text-[var(--text-main)]">
                        6. AI Studio Build &amp; Versioning Guardrails (Copy-Paste Instructions)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyGuardrails}
                      className="px-3 py-1.5 rounded-xl btn-accent text-xs font-semibold flex items-center gap-1.5"
                    >
                      {guardrailsCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Instructions!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Instructions</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Use these system instructions in AI Studio so native build configs remain protected and the version number is only updated when you explicitly say <strong>&quot;ready&quot;</strong> (with beta or stable version):
                  </p>
                  <pre className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-[var(--text-secondary)] select-all overflow-x-auto">
                    {AI_STUDIO_BUILD_GUARDRAILS_PROMPT}
                  </pre>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
