import React from 'react';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  FlaskConical,
  FolderGit2,
  Globe,
  Laptop,
  PackageCheck,
  RefreshCw,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import {
  AppVariantMetadata,
  GitHubReleaseInfo,
  GITHUB_RELEASES_URL,
  GITHUB_REPO_URL,
  ReleaseUpdateSummary,
} from '../utils/libraryCatalog';
import { WebBooksLogo } from './WebBooksLogo';

interface AppVersionSectionProps {
  currentVersion: string;
  appVariant: AppVariantMetadata;
  deviceFormFactorLabel: string;
  releaseSummary: ReleaseUpdateSummary;
  releasesList: GitHubReleaseInfo[];
  preferPrerelease: boolean;
  setPreferPrerelease: (val: boolean) => void;
  checkingUpdates: boolean;
  lastCheckedAt: string;
  onCheckForUpdates: () => void;
}

export function AppVersionSection({
  currentVersion,
  appVariant,
  deviceFormFactorLabel,
  releaseSummary,
  releasesList,
  preferPrerelease,
  setPreferPrerelease,
  checkingUpdates,
  lastCheckedAt,
  onCheckForUpdates,
}: AppVersionSectionProps) {
  const targetRelease = releaseSummary.targetRelease;
  const cleanReleaseBody = (targetRelease.body || '')
    .replace(/\*\*/g, '')
    .trim();

  return (
    <div
      data-testid="settings-version-section"
      className="space-y-6 view-transition-enter"
    >
      {/* =====================================================================
          1. ANIMATED APP VERSION & VARIANT SHOWCASE CARD
         ===================================================================== */}
      <div className="wb-settings-group p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Animated Logo Showcase with Dual Orbital Rings */}
          <div className="relative flex items-center justify-center py-2">
            <div
              aria-hidden="true"
              className="absolute w-36 h-36 rounded-[42px] border border-dashed border-[var(--accent)]/30 animate-[spin_24s_linear_infinite]"
            />
            <div
              aria-hidden="true"
              className="absolute w-32 h-32 rounded-[38px] border border-[var(--accent)]/20 animate-pulse"
            />
            <div className="relative w-28 h-28 rounded-[34px] border border-[var(--accent)]/40 bg-[var(--accent-soft)]/45 flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-105">
              <WebBooksLogo
                className="w-20 h-20 drop-shadow-md"
                animated
                dataTestId="version-hero-globe-logo"
              />
            </div>
          </div>

          {/* Animated App Version & Variant Display */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)]">
              Web Books by Afeed
            </h3>

            {/* Animated Version Number & Variant Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              <span
                data-testid="installed-version-label"
                className="font-mono font-bold text-sm sm:text-base text-[var(--accent)] tabular-nums"
              >
                Version {releaseSummary.currentVersionTag}
              </span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">
                ·
              </span>
              <span
                data-testid="detected-app-variant"
                className="font-semibold text-[var(--text-main)]"
              >
                {appVariant.label}
              </span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">
                ·
              </span>
              <span className="text-[var(--text-muted)]">
                {deviceFormFactorLabel}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto">
              {appVariant.runtimeDescription} · Last checked {lastCheckedAt}
            </p>
          </div>

          {/* Channel Selector + Check for Updates Action */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <div className="inline-flex items-center p-1 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)]">
              <button
                type="button"
                data-testid="channel-stable-btn"
                onClick={() => setPreferPrerelease(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  !preferPrerelease
                    ? 'bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                Stable Channel
              </button>
              <button
                type="button"
                data-testid="channel-beta-btn"
                onClick={() => setPreferPrerelease(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 whitespace-nowrap ${
                  preferPrerelease
                    ? 'bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Pre-release (Beta)</span>
              </button>
            </div>

            <button
              type="button"
              data-testid="check-for-updates-btn"
              onClick={onCheckForUpdates}
              disabled={checkingUpdates}
              className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--accent)] text-xs font-semibold inline-flex items-center gap-2 transition-all disabled:opacity-60"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[var(--accent)] ${
                  checkingUpdates ? 'animate-spin' : ''
                }`}
              />
              <span>
                {checkingUpdates ? 'Checking GitHub...' : 'Check for Updates'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. NEW VERSION AVAILABLE / UPDATE & PRE-RELEASE PANEL
         ===================================================================== */}
      <div
        data-testid="version-update-status-card"
        className="wb-settings-group p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                releaseSummary.hasUpdate
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'bg-[var(--success-bg)] text-[var(--success-text)]'
              }`}
            >
              {releaseSummary.isTargetPrerelease ? (
                <FlaskConical className="w-5 h-5" />
              ) : releaseSummary.hasUpdate ? (
                <PackageCheck className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-base text-[var(--text-main)]">
                  {releaseSummary.hasUpdate
                    ? `New Version Available: ${targetRelease.tagName}`
                    : `Up to Date (${currentVersion})`}
                </h4>
                <span className="text-xs font-semibold text-[var(--accent)]">
                  {releaseSummary.isTargetPrerelease
                    ? 'Pre-release (Beta Version)'
                    : 'Official Stable Release'}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {targetRelease.name && targetRelease.name !== targetRelease.tagName
                  ? targetRelease.name
                  : `Multi-platform release (${targetRelease.tagName}) available on GitHub for Android APK, Windows PC EXE, and Web.`}
              </p>
              {cleanReleaseBody && (
                <p className="text-xs text-[var(--text-main)]/85 leading-relaxed pt-1 break-all sm:break-normal">
                  {cleanReleaseBody}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* All Update & Platform Redirect Buttons (Mobile, PC, and Web) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--border)]">
          {/* Primary Update / Release Redirect Button */}
          <a
            href={releaseSummary.releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="version-update-now-btn"
            className="py-3 px-4 rounded-2xl btn-accent text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-center"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              {releaseSummary.isTargetPrerelease
                ? `Update to Beta (${targetRelease.tagName})`
                : `Update Now (${targetRelease.tagName})`}
            </span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Pre-release / Beta Versions Redirect Button */}
          <a
            href={
              releaseSummary.latestPrerelease?.htmlUrl || GITHUB_RELEASES_URL
            }
            target="_blank"
            rel="noopener noreferrer"
            data-testid="version-prerelease-btn"
            onClick={() => setPreferPrerelease(true)}
            className="py-3 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--accent)] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-center transition-colors"
          >
            <FlaskConical className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              {releaseSummary.latestPrerelease
                ? `Pre-release Beta (${releaseSummary.latestPrerelease.tagName})`
                : 'View Pre-release (Beta) Builds'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
          </a>

          {/* Android APK Direct Release Link */}
          <a
            href={releaseSummary.apkDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="version-download-apk-btn"
            className="py-2.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--accent)] text-xs font-semibold flex items-center justify-between gap-2 transition-colors"
          >
            <span className="flex items-center gap-2 truncate">
              <Smartphone className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span className="truncate">Android APK Update</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[var(--accent)] shrink-0">
              <Download className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </span>
          </a>

          {/* Windows Desktop EXE Direct Release Link */}
          <a
            href={releaseSummary.exeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="version-download-exe-btn"
            className="py-2.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--accent)] text-xs font-semibold flex items-center justify-between gap-2 transition-colors"
          >
            <span className="flex items-center gap-2 truncate">
              <Laptop className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span className="truncate">Windows PC EXE Update</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[var(--accent)] shrink-0">
              <Download className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </span>
          </a>
        </div>
      </div>

      {/* =====================================================================
          3. VISIT GITHUB REPOSITORY & RELEASE TIMELINE CARD
         ===================================================================== */}
      <div className="wb-settings-group p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--accent)]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[var(--text-main)]">
                Official GitHub Repository
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Open source code, release notes, Android APK &amp; Windows EXE
                builds on GitHub
              </p>
            </div>
          </div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="visit-github-repo-btn"
            className="px-4 py-2.5 rounded-2xl btn-accent text-xs font-semibold inline-flex items-center justify-center gap-2 shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>Visit GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Release Channels & Recent Tags */}
        <div className="pt-3 border-t border-[var(--border)] space-y-2">
          <div className="text-xs font-semibold text-[var(--text-muted)]">
            Available GitHub Releases ({releasesList.length})
          </div>
          <div className="space-y-2">
            {releasesList.slice(0, 4).map((rel) => (
              <div
                key={rel.tagName}
                className="p-3.5 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--text-main)]">
                      {rel.tagName}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--accent)]">
                      {rel.prerelease ? 'Pre-release (Beta)' : 'Stable Release'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                    {rel.name || rel.tagName}
                  </div>
                </div>

                <a
                  href={rel.htmlUrl || GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] font-semibold inline-flex items-center gap-1.5 shrink-0"
                >
                  <span>Open in Browser</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
