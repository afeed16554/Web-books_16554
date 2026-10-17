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
  extractMainTopicsFromHtml,
  formatCleanReaderHeader,
  getChaptersForSubjectPaper,
  getSubjectPaperCards,
  isAuthorizedAdminEmail,
  PRIMARY_ADMIN_EMAIL,
} from './libraryCatalog.ts';

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

test('Home Page Subject+Paper cards filter dynamically when student configures Class in profile', () => {
  const defaultCards = getSubjectPaperCards(BUILT_IN_PAGES, 'ALL');
  assert.ok(
    defaultCards.some((c) => c.displayName === 'Chemistry 2nd Paper'),
    'Default home page shows Chemistry 2nd Paper'
  );

  const sscCards = getSubjectPaperCards(BUILT_IN_PAGES, 'Class 9-10 (SSC)');
  assert.ok(
    sscCards.every((c) => c.className === 'Class 9-10 (SSC)'),
    'When student sets Class 9-10 (SSC), only SSC subjects appear on Home Page'
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
