import React, { useState } from 'react';
import {
  Bell,
  BellRing,
  CheckCheck,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Minimize2,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AppNotificationItem,
  AppVariantMetadata,
  resolveNotificationTapAction,
} from '../utils/libraryCatalog';
import { getWebBooksGlobeDataUri } from './WebBooksLogo';

/**
 * Dispatches a real system/push notification across Web (Service Worker + Notification API),
 * Android (Capacitor WebView / PWA Service Worker), and Windows Desktop (Electron native bridge).
 */
export async function dispatchSystemPushNotification(
  title: string,
  body: string,
  urlOrTag: string = 'web-books-notification'
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }
    if (permission !== 'granted') {
      return false;
    }

    const iconUri = getWebBooksGlobeDataUri();

    // Try Service Worker showNotification first (required for Android Chrome/PWA & background web push)
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && typeof reg.showNotification === 'function') {
          await reg.showNotification(title, {
            body,
            icon: '/pwa-192x192.png',
            badge: '/pwa-192x192.png',
            tag: urlOrTag,
          });
          return true;
        }
      } catch {
        // Fallback to standard Notification constructor (used by Electron Windows & Desktop browsers)
      }
    }

    new window.Notification(title, {
      body,
      icon: iconUri,
      tag: urlOrTag,
    });
    return true;
  } catch {
    return false;
  }
}

interface NotificationsCenterProps {
  notifications: AppNotificationItem[];
  unreadCount: number;
  popoverOpen: boolean;
  expandedOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setExpandedOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
  onSelectNotification: (item: AppNotificationItem) => void;
  activeApprovalDetail: {
    title: string;
    details: string;
    category: string;
    targetSection?: string;
    targetTopicId?: string;
  } | null;
  onCloseApprovalDetail: () => void;
  onNavigateFromApproval: () => void;
  appVariant: AppVariantMetadata;
  pushPermission: NotificationPermission | 'unsupported';
  onRequestPushPermission: () => void;
}

export function NotificationsCenter({
  notifications,
  unreadCount,
  popoverOpen,
  expandedOpen,
  setPopoverOpen,
  setExpandedOpen,
  onMarkAllAsRead,
  onClearNotification,
  onSelectNotification,
  activeApprovalDetail,
  onCloseApprovalDetail,
  onNavigateFromApproval,
  appVariant,
  pushPermission,
  onRequestPushPermission,
}: NotificationsCenterProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'updates' | 'approvals'>(
    'all'
  );

  const filteredList = notifications.filter((item) => {
    if (filterTab === 'updates') {
      return (
        item.category === 'version_update' ||
        item.category === 'prerelease_update'
      );
    }
    if (filterTab === 'approvals') {
      return (
        item.category === 'role_approval' ||
        item.category === 'content_approval'
      );
    }
    return true;
  });

  const renderNotificationCard = (
    item: AppNotificationItem,
    compact: boolean = false
  ) => {
    const isUpdate =
      item.category === 'version_update' ||
      item.category === 'prerelease_update';
    const isPrerelease =
      item.category === 'prerelease_update' || Boolean(item.isPrerelease);
    const resolution = resolveNotificationTapAction(item);

    return (
      <div
        key={item.id}
        data-testid={`notification-item-${item.id}`}
        className={`group relative rounded-2xl border transition-all duration-200 ${
          item.read
            ? 'bg-[var(--surface-subtle)]/65 border-[var(--border)] opacity-85 hover:opacity-100'
            : 'bg-[var(--surface-subtle)] border-[var(--accent)]/60 shadow-xs'
        } ${compact ? 'p-3' : 'p-4'}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isUpdate
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'bg-[var(--success-bg)] text-[var(--success-text)]'
            }`}
          >
            {isUpdate ? (
              isPrerelease ? (
                <Sparkles className="w-4 h-4" />
              ) : (
                <PackageCheck className="w-4 h-4" />
              )
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
          </div>

          <button
            type="button"
            data-testid={`notification-tap-${item.id}`}
            onClick={() => onSelectNotification(item)}
            className="flex-1 min-w-0 text-left focus:outline-none"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                {item.title}
              </span>
              {!item.read && (
                <span className="text-[10px] font-bold text-[var(--accent)] shrink-0">
                  NEW
                </span>
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
              {item.message}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--accent)] inline-flex items-center gap-1">
                {resolution.redirectView === 'settings'
                  ? 'Tap to open Settings & Update'
                  : 'Tap to view approval details'}
                <ExternalLink className="w-3 h-3" />
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {isUpdate
                  ? isPrerelease
                    ? 'Pre-release (Beta)'
                    : 'App Version Update'
                  : 'Approval Notice'}
              </span>
            </div>
          </button>

          {!compact && (
            <button
              type="button"
              onClick={() => onClearNotification(item.id)}
              aria-label={`Dismiss ${item.title}`}
              className="p-1.5 rounded-lg opacity-50 hover:opacity-100 hover:bg-[var(--bg-card)] transition-opacity shrink-0"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* =====================================================================
          STAGE 1: COMPACT FLOATING POPOVER MENU (Anchored below Header Bell)
         ===================================================================== */}
      {popoverOpen && !expandedOpen && (
        <>
          <div
            onClick={() => setPopoverOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-30"
          />
          <div
            data-testid="notifications-popover"
            role="dialog"
            aria-label="Notifications Menu"
            className="fixed right-3 sm:right-6 top-16 z-40 w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-md rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl flex flex-col overflow-hidden view-transition-enter"
          >
            {/* Popover Top Header with Expand Button */}
            <div className="px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <BellRing className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="font-bold text-xs sm:text-sm truncate">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="text-xs font-bold text-[var(--accent)] tabular-nums">
                    ({unreadCount} unread)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    data-testid="notifications-mark-all-read-btn"
                    onClick={onMarkAllAsRead}
                    className="px-2.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Read All</span>
                  </button>
                )}
                <button
                  type="button"
                  data-testid="notifications-expand-btn"
                  onClick={() => {
                    setPopoverOpen(false);
                    setExpandedOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl btn-accent text-[11px] font-semibold inline-flex items-center gap-1"
                  title="Expand Notifications Center"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand</span>
                </button>
              </div>
            </div>

            {/* Push Notification Status Strip */}
            <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-primary)]/50 flex items-center justify-between gap-2 text-[11px]">
              <span className="text-[var(--text-muted)] truncate">
                {appVariant.shortBadge} Push Alerts:{' '}
                <strong className="text-[var(--text-main)]">
                  {pushPermission === 'granted'
                    ? 'Enabled'
                    : pushPermission === 'denied'
                    ? 'Blocked by Browser'
                    : 'Ready to Enable'}
                </strong>
              </span>
              {pushPermission !== 'granted' &&
                pushPermission !== 'unsupported' && (
                  <button
                    type="button"
                    data-testid="enable-push-alerts-btn"
                    onClick={onRequestPushPermission}
                    className="font-semibold text-[var(--accent)] hover:underline shrink-0"
                  >
                    Enable Push
                  </button>
                )}
            </div>

            {/* Popover Notification List */}
            <div className="p-3 space-y-2.5 max-h-[60vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-8 px-4 text-center text-xs text-[var(--text-muted)] space-y-1.5">
                  <Bell className="w-6 h-6 mx-auto opacity-40" />
                  <div className="font-semibold text-[var(--text-main)]">
                    All caught up!
                  </div>
                  <p>
                    New version updates and moderator/role approvals will appear
                    here.
                  </p>
                </div>
              ) : (
                notifications
                  .slice(0, 4)
                  .map((item) => renderNotificationCard(item, true))
              )}
            </div>

            {/* Bottom Footer to Expand */}
            <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--text-muted)]">
                Showing {Math.min(notifications.length, 4)} of{' '}
                {notifications.length} notifications
              </span>
              <button
                type="button"
                onClick={() => {
                  setPopoverOpen(false);
                  setExpandedOpen(true);
                }}
                className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>Open Full View</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          STAGE 2: EXPANDED NOTIFICATION CENTER MODAL
         ===================================================================== */}
      {expandedOpen && (
        <div
          data-testid="notifications-expanded-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Notification Center"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 view-transition-enter"
        >
          <div className="w-full max-w-2xl max-h-[88vh] rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <BellRing className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-base sm:text-lg truncate">
                    Notification Center
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    App version updates &amp; role/content approvals across Web,
                    Android &amp; Windows
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setExpandedOpen(false);
                    setPopoverOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs font-semibold inline-flex items-center gap-1.5"
                  title="Collapse to Compact Popover"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compact</span>
                </button>
                <button
                  type="button"
                  data-testid="close-expanded-notifications-btn"
                  onClick={() => setExpandedOpen(false)}
                  aria-label="Close Notification Center"
                  className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs + Push Notification Controls */}
            <div className="px-5 sm:px-6 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-primary)]/40">
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: `All (${notifications.length})` },
                    { id: 'updates', label: 'Version Updates' },
                    { id: 'approvals', label: 'Approvals' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-testid={`notif-filter-${tab.id}`}
                    onClick={() => setFilterTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                      filterTab === tab.id
                        ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                        : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark All Read</span>
                  </button>
                )}
                {pushPermission === 'granted' ? (
                  <span className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-muted)] text-xs font-semibold inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Push Active
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onRequestPushPermission}
                    className="px-3 py-1.5 rounded-xl border border-[var(--accent)]/50 bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold"
                  >
                    Enable System Push
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Notification List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
              {filteredList.length === 0 ? (
                <div className="py-12 text-center text-xs sm:text-sm text-[var(--text-muted)] space-y-2">
                  <Bell className="w-8 h-8 mx-auto opacity-35" />
                  <div className="font-bold text-[var(--text-main)]">
                    No notifications in this category
                  </div>
                  <p>
                    When a new app version or approval arrives, you will be
                    notified here and via native push notifications.
                  </p>
                </div>
              ) : (
                filteredList.map((item) => renderNotificationCard(item, false))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          APPROVAL DETAILS DIALOG (Shown when a user taps an Approval notification)
          Tells them clearly what they were approved for + button to open the page!
         ===================================================================== */}
      {activeApprovalDetail && (
        <div
          data-testid="approval-notification-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Approval Notification Details"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 view-transition-enter"
        >
          <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[var(--success-bg)] text-[var(--success-text)] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--success-text)]">
                    Approval Confirmed
                  </div>
                  <h3 className="font-bold text-base text-[var(--text-main)]">
                    {activeApprovalDetail.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseApprovalDetail}
                aria-label="Close Approval Notice"
                className="p-1.5 rounded-xl hover:bg-[var(--surface-subtle)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs sm:text-sm leading-relaxed text-[var(--text-main)]">
              {activeApprovalDetail.details}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={onCloseApprovalDetail}
                className="px-4 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                data-testid="approval-detail-open-page-btn"
                onClick={onNavigateFromApproval}
                className="px-4 py-2.5 rounded-2xl btn-accent text-xs font-semibold"
              >
                Open Related Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
