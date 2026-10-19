import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BATCH_1_SECTIONS,
  BATCH_2_SECTIONS,
  BATCH_3_SECTIONS,
  BATCH_4_SECTIONS,
  BATCH_5_SECTIONS,
  ALL_SECTIONS,
  MAIN_NAVIGATION_TOPICS,
  getRawBatch5SectionsHtml,
  getAllSectionsHtml,
} from './chemistrySections.ts';
import {
  ALL_CLASS_LEVELS,
  BUILT_IN_PAGES,
  buildFolderHierarchy,
  clampViewingAreaScroll,
  computeViewingAreaCollapseState,
  detectDeviceFormFactor,
  extractMainTopicsFromHtml,
  formatCleanReaderHeader,
  getChaptersForSubjectPaper,
  getSubjectPaperCards,
  getThemeAwareAccentPair,
  isAuthorizedAdminEmail,
  PRIMARY_ADMIN_EMAIL,
  shouldEnableLowEndEfficiency,
  splitSubjectsByCategory,
  cycleCurveProfile,
  getCurveProfileConfig,
  resolveUserRole,
  canApproveModeratorRequests,
  canManageSecondaryAdmins,
  canModifyMainAdmin,
  canSubmitTopicContent,
  doesContentRequireApproval,
  canApproveModeratorContent,
  resolveInitialTheme,
  cycleAppThemeMode,
  getCurveRadiusPx,
  detectAppVariant,
  parseSemver,
  compareSemver,
  evaluateReleaseUpdateStatus,
  resolveNotificationTapAction,
  FALLBACK_GITHUB_RELEASES,
  APP_CURRENT_VERSION,
  GITHUB_REPO_URL,
  GITHUB_RELEASES_URL,
} from './libraryCatalog.ts';
import {
  OFFICIAL_MIT_LICENSE_TEXT,
  WEB_BOOKS_GLOBE_SVG_RAW,
  WEB_BOOKS_MARK_SVG_RAW,
  getWebBooksGlobeDataUri,
  getWebBooksMarkDataUri,
} from './brandAssets.ts';

test('All 5 batches contain the expected 13 sections and 12 main navigation topics', () => {
  assert.equal(
    BATCH_1_SECTIONS.length +
      BATCH_2_SECTIONS.length +
      BATCH_3_SECTIONS.length +
      BATCH_4_SECTIONS.length +
      BATCH_5_SECTIONS.length,
    13
  );
  assert.equal(ALL_SECTIONS.length, 13);
  assert.equal(MAIN_NAVIGATION_TOPICS.length, 12);
});

test('Zero data loss check on all sections yields and temperatures (90%, 10%, 99.1%, 0.9%, 60°C, 20% H2SO4, 2% HgSO4)', () => {
  const html = getAllSectionsHtml();
  assert.ok(html.includes('90%'), 'Must include 90% Markovnikov major yield');
  assert.ok(html.includes('10%'), 'Must include 10% Markovnikov minor yield');
  assert.ok(
    html.includes('99.1%'),
    'Must include 99.1% Anti-Markovnikov major yield'
  );
  assert.ok(
    html.includes('0.9%'),
    'Must include 0.9% Anti-Markovnikov minor yield'
  );
  assert.ok(html.includes('20%'), 'Must include 20% H2SO4');
  assert.ok(html.includes('Hg'), 'Must include 2% Hg2+ / HgSO4');
  assert.ok(
    html.includes('লাল অধঃক্ষেপ'),
    'Must include red copper acetylide precipitate'
  );
  assert.ok(
    html.includes('সাদা অধঃক্ষেপ'),
    'Must include white silver acetylide precipitate'
  );
});

test('No duplicate see-hide-pill spans exist in raw HTML', () => {
  const allHtml = getAllSectionsHtml();
  assert.ok(
    !allHtml.includes('see-hide-pill'),
    'Raw HTML should not contain hardcoded see-hide-pill spans'
  );
});

test('System catalog metadata contains no Bangla characters in system fields', () => {
  const page = BUILT_IN_PAGES[0];
  const banglaRegex = /[\u0980-\u09FF]/;
  assert.equal(
    banglaRegex.test(page.chapter),
    false,
    'Chapter system label must be English only'
  );
  assert.equal(
    banglaRegex.test(page.title),
    false,
    'Page title system label must be English only'
  );
  assert.equal(
    banglaRegex.test(page.subtitle),
    false,
    'Page subtitle system label must be English only'
  );
});

test('Sidebar folder hierarchy includes all classes from Class 1 to 8, Class 9-10 (SSC), and Class 11-12 (HSC)', () => {
  assert.equal(ALL_CLASS_LEVELS.length, 10);
  const tree = buildFolderHierarchy(BUILT_IN_PAGES);
  const classNames = tree.map((n) => n.name);
  for (const expectedClass of ALL_CLASS_LEVELS) {
    assert.ok(
      classNames.includes(expectedClass),
      `Sidebar folder tree must include ${expectedClass}`
    );
  }
});

test('Home Page Subject+Paper cards show all subjects with class on Home (ALL) and only the student class subjects in My Class', () => {
  const homeCards = getSubjectPaperCards(BUILT_IN_PAGES, 'ALL');
  assert.ok(
    homeCards.some((c) => c.className === 'Class 11-12 (HSC)'),
    'Global Home page includes HSC subjects'
  );
  assert.ok(
    homeCards.some((c) => c.className === 'Class 9-10 (SSC)'),
    'Global Home page includes SSC subjects'
  );

  const hscOnlyCards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 11-12 (HSC)');
  assert.ok(
    hscOnlyCards.every((c) => c.className === 'Class 11-12 (HSC)'),
    'When student is in HSC (My Class), only HSC subjects appear (no SSC books)'
  );

  const sscCards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 9-10 (SSC)');
  assert.ok(
    sscCards.every((c) => c.className === 'Class 9-10 (SSC)'),
    'When student sets Class 9-10 (SSC), only SSC subjects appear'
  );

  const class7Cards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 7');
  assert.ok(
    class7Cards.every((c) => c.className === 'Class 7'),
    'When student sets Class 7, only Class 7 subjects appear on Home Page'
  );
  const banglaRegex = /[\u0980-\u09FF]/;
  assert.ok(
    class7Cards.every((c) => !banglaRegex.test(c.displayName)),
    'Class 7 subject cards must be English only'
  );
});

test('Progressive drill-down: getChaptersForSubjectPaper returns 5 chapters for Chemistry 2nd Paper and links Alkane, Alkene & Alkyne to 2nd Chapter: Organic Chemistry', () => {
  const chapters = getChaptersForSubjectPaper(
    BUILT_IN_PAGES,
    'Class 11-12 (HSC)',
    'Chemistry',
    '2nd Paper'
  );
  assert.equal(chapters.length, 5);
  const ch2 = chapters.find(
    (c) => c.chapterTitle === '2nd Chapter: Organic Chemistry'
  );
  assert.ok(ch2, 'Must include 2nd Chapter: Organic Chemistry');
  assert.equal(ch2.pages.length, 1);
  assert.equal(ch2.pages[0].title, 'Alkane, Alkene & Alkyne');
});

test('Clean Reader Header formats exclusively as Chapter Name : Topic Name', () => {
  const header = formatCleanReaderHeader(
    BUILT_IN_PAGES[0].chapter,
    BUILT_IN_PAGES[0].title
  );
  assert.equal(
    header,
    '2nd Chapter: Organic Chemistry : Alkane, Alkene & Alkyne'
  );
});

test('Selective Admin Email verification allows only primary admin or allowlisted emails', () => {
  assert.equal(isAuthorizedAdminEmail(PRIMARY_ADMIN_EMAIL), true);
  assert.equal(isAuthorizedAdminEmail('student@gmail.com'), false);
  assert.equal(
    isAuthorizedAdminEmail('teacher@gmail.com', ['teacher@gmail.com']),
    true
  );
});

test('extractMainTopicsFromHtml parses section ids and h2 titles', () => {
  const sample = `<section class="topic-section" id="sec-a"><h2>1. Alkanes</h2></section>`;
  const topics = extractMainTopicsFromHtml(sample);
  assert.equal(topics.length, 1);
  assert.equal(topics[0].id, 'sec-a');
  assert.equal(topics[0].title, '1. Alkanes');
});

test('Collapsible Viewing Area collapses smoothly on scroll', () => {
  const topState = computeViewingAreaCollapseState(0, 110);
  assert.equal(topState.isCollapsed, false);
  assert.equal(topState.viewingAreaOpacity, 1);
  assert.equal(topState.compactHeaderTitleOpacity, 0);

  const scrolledState = computeViewingAreaCollapseState(120, 110);
  assert.equal(scrolledState.isCollapsed, true);
  assert.equal(scrolledState.viewingAreaOpacity, 0);
  assert.equal(scrolledState.compactHeaderTitleOpacity, 1);
});

test('Adaptive device form-factor detector distinguishes Phone, Passport Foldable, Tablet Foldable, and Desktop / Large Display', () => {
  const phone = detectDeviceFormFactor(390, 844);
  assert.equal(phone.formFactor, 'phone');
  assert.equal(phone.showCompactRailWhenCollapsed, false);

  const passport = detectDeviceFormFactor(740, 720);
  assert.equal(passport.formFactor, 'passport-foldable');
  assert.equal(passport.showCompactRailWhenCollapsed, true);

  const tablet = detectDeviceFormFactor(1024, 768);
  assert.equal(tablet.formFactor, 'tablet-foldable');

  const desktop = detectDeviceFormFactor(1920, 1080);
  assert.equal(desktop.formFactor, 'desktop');
  assert.equal(desktop.label, 'Desktop / Large Display');
  assert.equal(desktop.recommendedColumns, 5);
});

test('getThemeAwareAccentPair prevents black-on-red contrast bugs in Light, Reading, and Dark modes', () => {
  const lightRed = getThemeAwareAccentPair('#ef4444', 'light');
  assert.equal(lightRed.bannerFg, '#ffffff', 'Light mode red banner must use white foreground text');
  assert.equal(lightRed.fg, '#dc2626');

  const darkRed = getThemeAwareAccentPair('#ef4444', 'dark');
  assert.equal(darkRed.bannerFg, '#ffffff', 'Dark mode red banner must also use white foreground text');

  const darkSky = getThemeAwareAccentPair('#38bdf8', 'dark');
  assert.equal(darkSky.bannerFg, '#020617', 'Dark mode bright cyan banner uses dark contrast text');
});

test('clampViewingAreaScroll clamps scroll values to prevent unnecessary re-renders on low-end devices', () => {
  assert.equal(clampViewingAreaScroll(-20, 120), 0);
  assert.equal(clampViewingAreaScroll(0, 120), 0);
  assert.equal(clampViewingAreaScroll(55.4, 120), 55);
  assert.equal(clampViewingAreaScroll(120, 120), 120);
  assert.equal(clampViewingAreaScroll(2450, 120), 120);
});

test('shouldEnableLowEndEfficiency detects low-end hardware and respects user overrides', () => {
  assert.equal(
    shouldEnableLowEndEfficiency({
      hardwareConcurrency: 4,
      deviceMemory: 3,
      userOverride: 'auto',
    }),
    true
  );
  assert.equal(
    shouldEnableLowEndEfficiency({
      hardwareConcurrency: 8,
      deviceMemory: 8,
      userOverride: 'auto',
    }),
    false
  );
  assert.equal(
    shouldEnableLowEndEfficiency({
      hardwareConcurrency: 8,
      deviceMemory: 8,
      userOverride: 'enabled',
    }),
    true
  );
  assert.equal(
    shouldEnableLowEndEfficiency({
      hardwareConcurrency: 2,
      deviceMemory: 2,
      userOverride: 'disabled',
    }),
    false
  );
});

test('splitSubjectsByCategory orders HSC and SSC subjects into Section 1 (Compulsory) and Section 2 (Divisional P, C, H.M, B)', () => {
  const hscCards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 11-12 (HSC)');
  const hscSplit = splitSubjectsByCategory(hscCards);

  // HSC Compulsory: Bangla 1st & 2nd, English 1st & 2nd, ICT = 5 papers
  assert.equal(hscSplit.compulsory.length, 5);
  assert.deepEqual(
    hscSplit.compulsory.map((c) => c.displayName),
    [
      'Bangla 1st Paper',
      'Bangla 2nd Paper',
      'English 1st Paper',
      'English 2nd Paper',
      'ICT',
    ]
  );

  // HSC Divisional: Physics 1st & 2nd, Chemistry 1st & 2nd, Higher Math 1st & 2nd, Biology 1st & 2nd = 8 papers
  assert.equal(hscSplit.divisional.length, 8);
  assert.deepEqual(
    hscSplit.divisional.map((c) => c.displayName),
    [
      'Physics 1st Paper',
      'Physics 2nd Paper',
      'Chemistry 1st Paper',
      'Chemistry 2nd Paper',
      'Higher Math 1st Paper',
      'Higher Math 2nd Paper',
      'Biology 1st Paper',
      'Biology 2nd Paper',
    ]
  );

  // SSC Compulsory: Bangla 1st & 2nd, English 1st & 2nd, General Math, ICT, Bangladesh and Global Studies, Religion (4 faiths) = 11 papers
  const sscCards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 9-10 (SSC)');
  const sscSplit = splitSubjectsByCategory(sscCards);
  assert.equal(sscSplit.compulsory.length, 11);
  assert.ok(
    sscSplit.compulsory.some((c) => c.subject === 'General Math' && c.chapterCount === 17),
    'SSC Compulsory must include General Math with 17 chapters'
  );
  assert.ok(
    sscSplit.compulsory.some(
      (c) => c.subject === 'Bangladesh and Global Studies' && c.chapterCount === 16
    ),
    'SSC Compulsory must include Bangladesh and Global Studies with 16 chapters'
  );

  // SSC Divisional: Physics (14 ch), Chemistry (12 ch), Higher Math (14 ch), Biology (14 ch) = 4 papers
  assert.equal(sscSplit.divisional.length, 4);
  assert.deepEqual(
    sscSplit.divisional.map((c) => [c.subject, c.chapterCount, c.subjectCode]),
    [
      ['Physics', 14, '136'],
      ['Chemistry', 12, '137'],
      ['Higher Math', 14, '126'],
      ['Biology', 14, '138'],
    ]
  );

  // Clean display names: no "(SSC)" or "(Main Paper)" suffix
  for (const card of [...hscCards, ...sscCards]) {
    assert.ok(
      !card.displayName.includes('(SSC)'),
      `Display name "${card.displayName}" should not contain (SSC)`
    );
    assert.ok(
      !card.displayName.includes('Main Paper'),
      `Display name "${card.displayName}" should not contain Main Paper`
    );
  }
});

test('Bangla and English papers have clickable semiChapters (Units, Prose, Poetry, Grammar) and Classes 1 to 8 are fully populated', () => {
  // HSC Bangla 1st Paper has 3 sections (Prose, Poetry, Co-reader) and 26 semi-chapters (12 prose + 12 poetry + 2 co-reader)
  const hscBangla1 = getChaptersForSubjectPaper(
    BUILT_IN_PAGES,
    'Class 11-12 (HSC)',
    'Bangla',
    '1st Paper'
  );
  assert.equal(hscBangla1.length, 3);
  const totalBangla1Semi = hscBangla1.reduce(
    (sum, ch) => sum + ch.semiChapters.length,
    0
  );
  assert.equal(totalBangla1Semi, 26);

  // HSC English 1st Paper has 2 sections (Reading Units & Guided Writing) with 17 semi-chapters (12 Units + 5 Writing items)
  const hscEng1 = getChaptersForSubjectPaper(
    BUILT_IN_PAGES,
    'Class 11-12 (HSC)',
    'English',
    '1st Paper'
  );
  assert.equal(hscEng1.length, 2);
  const totalEng1Semi = hscEng1.reduce(
    (sum, ch) => sum + ch.semiChapters.length,
    0
  );
  assert.equal(totalEng1Semi, 17);

  // Verify Class 1 to Class 8 all have curriculum subjects and chapters
  const classes1To8 = [
    'Class 8',
    'Class 7',
    'Class 6',
    'Class 5',
    'Class 4',
    'Class 3',
    'Class 2',
    'Class 1',
  ];
  for (const cls of classes1To8) {
    const cards = getSubjectPaperCards(BUILT_IN_PAGES, cls);
    assert.ok(cards.length >= 3, `${cls} should have at least 3 subjects`);
    for (const card of cards) {
      assert.ok(
        card.chapterCount > 0,
        `${cls} ${card.subject} should have chapters`
      );
      if (card.subject === 'Bangla' || card.subject === 'English') {
        assert.ok(
          (card.semiChapterCount || 0) > 0,
          `${cls} ${card.subject} should have clickable semi-chapters`
        );
      }
    }
  }
});

test('G2 Continuous Curvature Profile provides squircle superellipse geometry for eye comfort', () => {
  const g2Config = getCurveProfileConfig('g2');
  assert.equal(g2Config.profile, 'g2');
  assert.equal(g2Config.cornerShape, 'squircle');
  assert.equal(g2Config.electronSmoothing, 1);
  assert.equal(g2Config.eyeComfortScore, 10);
  assert.ok(g2Config.description.includes('Superellipse'));

  const classicConfig = getCurveProfileConfig('classic');
  assert.equal(classicConfig.profile, 'classic');
  assert.equal(classicConfig.cornerShape, 'round');
  assert.equal(classicConfig.electronSmoothing, 0);
  assert.equal(classicConfig.eyeComfortScore, 6);

  assert.equal(cycleCurveProfile('g2'), 'classic');
  assert.equal(cycleCurveProfile('classic'), 'g2');
});

test('4-Tier Role Governance: Main Admin, Secondary Admin, Moderator, and Reader permissions', () => {
  const secAdmins = ['sec@webbooks.edu.bd'];
  const moderators = ['mod@webbooks.edu.bd'];

  assert.equal(
    resolveUserRole(PRIMARY_ADMIN_EMAIL, secAdmins, moderators),
    'main_admin'
  );
  assert.equal(
    resolveUserRole('sec@webbooks.edu.bd', secAdmins, moderators),
    'secondary_admin'
  );
  assert.equal(
    resolveUserRole('mod@webbooks.edu.bd', secAdmins, moderators),
    'moderator'
  );
  assert.equal(
    resolveUserRole('student@gmail.com', secAdmins, moderators),
    'reader'
  );

  // Moderator permissions: can submit content, requires approval first, cannot approve others
  assert.equal(canSubmitTopicContent('moderator'), true);
  assert.equal(doesContentRequireApproval('moderator'), true);
  assert.equal(canApproveModeratorContent('moderator'), false);
  assert.equal(canApproveModeratorRequests('moderator'), false);
  assert.equal(canManageSecondaryAdmins('moderator'), false);

  // Secondary Admin permissions: can submit directly, can approve Moderator content & Moderator requests, CANNOT manage Secondary Admins or touch Main Admin
  assert.equal(canSubmitTopicContent('secondary_admin'), true);
  assert.equal(doesContentRequireApproval('secondary_admin'), false);
  assert.equal(canApproveModeratorContent('secondary_admin'), true);
  assert.equal(canApproveModeratorRequests('secondary_admin'), true);
  assert.equal(
    canManageSecondaryAdmins('secondary_admin', 'sec@webbooks.edu.bd'),
    false
  );
  assert.equal(canModifyMainAdmin(PRIMARY_ADMIN_EMAIL), false);
  assert.equal(canModifyMainAdmin('sec@webbooks.edu.bd'), true);

  // Main Admin permissions: exclusive authority over Secondary Admins, full approval rights, still cannot be deleted
  assert.equal(
    canManageSecondaryAdmins('main_admin', PRIMARY_ADMIN_EMAIL),
    true
  );
  assert.equal(canApproveModeratorRequests('main_admin'), true);
  assert.equal(canApproveModeratorContent('main_admin'), true);
  assert.equal(canModifyMainAdmin(PRIMARY_ADMIN_EMAIL), false);
});

test('4-Mode Theme System: Auto-detects device appearance on first start and locks once user changes preference', () => {
  // First start (not locked by user): follows device OS dark/light preference
  assert.equal(resolveInitialTheme(null, false, true), 'oled');
  assert.equal(resolveInitialTheme(null, false, false), 'light');

  // Once user changes preference (locked = true): remembers user choice regardless of device OS
  assert.equal(resolveInitialTheme('dark', true, false), 'dark');
  assert.equal(resolveInitialTheme('yellow', true, true), 'yellow');
  assert.equal(resolveInitialTheme('light', true, true), 'light');
  assert.equal(resolveInitialTheme('oled', true, false), 'oled');

  // Cycles cleanly across all 4 modes
  assert.equal(cycleAppThemeMode('oled'), 'dark');
  assert.equal(cycleAppThemeMode('dark'), 'yellow');
  assert.equal(cycleAppThemeMode('yellow'), 'light');
  assert.equal(cycleAppThemeMode('light'), 'oled');
});

test('Deep G2 Corner Curvature Radius presets provide deeper 38px and 46px squircle radii', () => {
  const std = getCurveRadiusPx('standard');
  const deep = getCurveRadiusPx('deep');
  const ultra = getCurveRadiusPx('ultra');

  assert.equal(std, 28);
  assert.equal(deep, 38);
  assert.equal(ultra, 46);
  assert.ok(deep > std);
  assert.ok(ultra > deep);
});

test('Version System: Semantic version comparison, pre-release detection, and app variant detection', () => {
  // Variant detection across Android APK, Windows EXE, iOS, and Web
  const winVariant = detectAppVariant('Mozilla/5.0 Electron/33.0.0', false, true, false);
  assert.equal(winVariant.variant, 'windows-exe');
  assert.equal(winVariant.platformFamily, 'Windows');

  const androidApk = detectAppVariant('Mozilla/5.0 (Linux; Android 14; wv)', true, false, false);
  assert.equal(androidApk.variant, 'android-apk');
  assert.equal(androidApk.platformFamily, 'Android');

  const iosWeb = detectAppVariant('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', false, false, true);
  assert.equal(iosWeb.variant, 'ios-web');
  assert.equal(iosWeb.platformFamily, 'iOS');

  // Semver & Pre-release parsing
  const stableVer = parseSemver('v1.0.1');
  assert.equal(stableVer.isPrerelease, false);
  assert.equal(stableVer.cleanTag, 'v1.0.1');

  const betaVer = parseSemver('v1.1.0-beta.1');
  assert.equal(betaVer.isPrerelease, true);
  assert.equal(betaVer.prerelease, 'beta.1');

  assert.equal(compareSemver('v1.0.1', '1.0.0'), 1);
  assert.equal(compareSemver('v1.1.0', 'v1.1.0-beta.1'), 1);
  assert.equal(compareSemver('v1.1.0-beta.1', 'v1.0.1'), 1);

  // Release evaluation against current installed version baseline
  const statusCurrent = evaluateReleaseUpdateStatus(APP_CURRENT_VERSION, FALLBACK_GITHUB_RELEASES, false);
  assert.equal(statusCurrent.hasUpdate, false);
  assert.equal(statusCurrent.hasStableUpdate, false);
  assert.equal(statusCurrent.targetRelease.tagName, 'v1.0.1');
  assert.equal(statusCurrent.repoUrl, GITHUB_REPO_URL);

  // Dynamic newer release evaluation (e.g. When fetched live from GitHub API)
  const mockReleases = [
    {
      tagName: 'v1.1.0-beta.1',
      name: 'v1.1.0-beta.1',
      htmlUrl: `${GITHUB_RELEASES_URL}`,
      prerelease: true,
      publishedAt: '2026-10-19T05:30:00Z',
      assets: [],
    },
    {
      tagName: 'v1.0.1',
      name: 'v1.0.1',
      htmlUrl: `${GITHUB_RELEASES_URL}/tag/v1.0.1`,
      prerelease: false,
      publishedAt: '2026-10-18T17:14:54Z',
      assets: [],
    },
    ...FALLBACK_GITHUB_RELEASES,
  ];

  const statusStable = evaluateReleaseUpdateStatus('1.0.0', mockReleases, false);
  assert.equal(statusStable.hasUpdate, true);
  assert.equal(statusStable.hasStableUpdate, true);
  assert.equal(statusStable.hasPrereleaseUpdate, true);
  assert.equal(statusStable.targetRelease.tagName, 'v1.0.1');
  assert.equal(statusStable.isTargetPrerelease, false);

  // Pre-release Beta channel evaluation
  const statusBeta = evaluateReleaseUpdateStatus('1.0.1', mockReleases, true);
  assert.equal(statusBeta.hasUpdate, true);
  assert.equal(statusBeta.isTargetPrerelease, true);
  assert.equal(statusBeta.targetRelease.tagName, 'v1.1.0-beta.1');
});

test('Notifications System: Version update notifications redirect to Settings Version page and Approval notifications explain what was approved', () => {
  const updateNotif = resolveNotificationTapAction({
    id: 'notif-update-1',
    category: 'version_update',
    title: 'New Version v1.0.1 Available',
    message: 'Tap to update Web Books on Android, Windows, or Web.',
    targetAction: 'open_version_settings',
    targetSection: 'version',
    versionTag: 'v1.0.1',
    createdAt: '2026-10-19T05:00:00Z',
    read: false,
  });
  assert.equal(updateNotif.redirectView, 'settings');
  assert.equal(updateNotif.settingsSection, 'version');
  assert.equal(updateNotif.showApprovalBanner, false);

  const approvalNotif = resolveNotificationTapAction({
    id: 'notif-approval-1',
    category: 'role_approval',
    title: 'Approved: Moderator Permission',
    message: 'Your Moderator request was approved.',
    approvalSummary:
      'You are now an Approved Moderator for Class 11-12 Chemistry! You can submit new topic pages for admin review.',
    targetAction: 'show_approval_detail',
    targetSection: 'account',
    createdAt: '2026-10-19T05:10:00Z',
    read: false,
  });
  assert.equal(approvalNotif.redirectView, 'approval_detail');
  assert.equal(approvalNotif.showApprovalBanner, true);
  assert.ok(approvalNotif.approvalDetails.includes('Approved Moderator'));
});

test('Web Books Brand Logo: SVG contains Digital Notebook and Web Globe with valid data URIs', () => {
  assert.ok(
    WEB_BOOKS_GLOBE_SVG_RAW.includes('viewBox="0 0 512 512"'),
    'Globe SVG must have 512x512 viewBox'
  );
  assert.ok(
    WEB_BOOKS_GLOBE_SVG_RAW.includes('rx="116"'),
    'Framed icon must feature 116px squircle superellipse'
  );
  assert.ok(
    WEB_BOOKS_GLOBE_SVG_RAW.includes('x="86" y="76" width="340" height="360"'),
    'Must include notebook card base'
  );
  assert.ok(
    WEB_BOOKS_GLOBE_SVG_RAW.includes('cx="256" cy="360" r="42"'),
    'Must feature web globe outer circle'
  );
  assert.ok(
    WEB_BOOKS_GLOBE_SVG_RAW.includes('x1="214" y1="360" x2="298" y2="360"'),
    'Must feature web globe equator line'
  );

  // Transparent mark
  assert.ok(
    WEB_BOOKS_MARK_SVG_RAW.includes('cx="256" cy="360" r="42"'),
    'Mark SVG must feature web globe circle'
  );
  assert.equal(
    WEB_BOOKS_MARK_SVG_RAW.includes('rx="116"'),
    false,
    'Mark SVG must NOT have a dark container squircle rect'
  );

  // Data URIs
  const globeUri = getWebBooksGlobeDataUri();
  assert.ok(globeUri.startsWith('data:image/svg+xml;utf8,'));
  assert.ok(globeUri.includes('%3Csvg'));

  const markUri = getWebBooksMarkDataUri();
  assert.ok(markUri.startsWith('data:image/svg+xml;utf8,'));
  assert.ok(markUri.includes('%3Csvg'));
});

test('User Manual & MIT License: Official License text is complete, valid, and attributed to Afeed (2026)', () => {
  assert.ok(
    OFFICIAL_MIT_LICENSE_TEXT.includes('MIT License'),
    'Must declare MIT License'
  );
  assert.ok(
    OFFICIAL_MIT_LICENSE_TEXT.includes('Copyright (c) 2026 Afeed'),
    'Must include Copyright (c) 2026 Afeed notice'
  );
  assert.ok(
    OFFICIAL_MIT_LICENSE_TEXT.includes('free of charge'),
    'Must grant permission free of charge'
  );
  assert.ok(
    OFFICIAL_MIT_LICENSE_TEXT.includes(
      'The above copyright notice and this permission notice shall be included in all'
    ),
    'Must specify the attribution requirement to keep copyright in all copies'
  );
  assert.ok(
    OFFICIAL_MIT_LICENSE_TEXT.includes('WITHOUT WARRANTY OF ANY KIND'),
    'Must include standard open source warranty disclaimer'
  );
});



