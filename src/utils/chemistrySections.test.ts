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
  getRawBatch3SectionsHtml,
  getBatch3NavigationLinksHtml,
  getRawBatch4SectionsHtml,
  getBatch4NavigationLinksHtml,
  getRawBatch5SectionsHtml,
  getBatch5NavigationLinksHtml
} from './chemistrySections.ts';

test('BATCH_5_SECTIONS contains valid <section class="topic-section" id="..."> blocks for Alkyne Oxidation, Polymerization, and Hydrocarbon Comparison', () => {
  assert.equal(BATCH_5_SECTIONS.length, 2);
  for (const section of BATCH_5_SECTIONS) {
    assert.ok(
      section.html.includes(`<section class="topic-section" id="${section.id}">`),
      `Missing section tag with id="${section.id}"`
    );
    assert.ok(section.html.includes('</section>'));
  }
});

test('getBatch5NavigationLinksHtml generates exact <a class="topic-link" href="#..." onclick="togglePanel(\'topic-panel\')"> tags', () => {
  const navHtml = getBatch5NavigationLinksHtml();
  assert.ok(
    navHtml.includes(
      '<a class="topic-link" href="#topic-alkyne-oxidation-polymerization" onclick="togglePanel(\'topic-panel\')">১১. অ্যালকাইনের জারণ ও পলিমারকরণ বিক্রিয়া</a>'
    )
  );
  assert.ok(
    navHtml.includes(
      '<a class="topic-link" href="#topic-hydrocarbon-comparison-tests" onclick="togglePanel(\'topic-panel\')">১২. অ্যালকেন, অ্যালকিন ও অ্যালকাইনের পার্থক্য, রূপান্তর ও শনাক্তকরণ</a>'
    )
  );
});

test('MAIN_NAVIGATION_TOPICS includes all 12 main topics and excludes minor sub-tables', () => {
  assert.equal(MAIN_NAVIGATION_TOPICS.length, 12);
  assert.equal(
    MAIN_NAVIGATION_TOPICS.some((t) => t.id === 'topic-reforming-table'),
    false
  );
  assert.equal(
    ALL_SECTIONS.length,
    BATCH_1_SECTIONS.length +
      BATCH_2_SECTIONS.length +
      BATCH_3_SECTIONS.length +
      BATCH_4_SECTIONS.length +
      BATCH_5_SECTIONS.length
  );
  assert.ok(getBatch3NavigationLinksHtml().includes('#topic-alkene-addition-ozonolysis'));
  assert.ok(getRawBatch3SectionsHtml().includes('২-মিথাইলবিউট-২-ইন'));
  assert.ok(getBatch4NavigationLinksHtml().includes('#topic-alkyne-prep-acidity'));
  assert.ok(getRawBatch4SectionsHtml().includes("Kucherov's reaction"));
});

test('Zero data loss check for Batch 5 Alkyne Oxidation, Polymerization & Hydrocarbon Comparison Pages', () => {
  const html = getRawBatch5SectionsHtml();

  // Page 1: Alkyne Oxidation (KMnO4 & K2Cr2O7), Oxy-acetylene flame, Aromatic Polymerization (Benzene & Mesitylene)
  assert.ok(html.includes('অ্যালকাইনের শনাক্তকরণ বেয়ার পরীক্ষা'));
  assert.ok(html.includes('অক্সালিক এসিড উৎপন্ন হয়'));
  assert.ok(html.includes('HOOC-COOH'));
  assert.ok(html.includes('অম্লীয় $\\ce{K2Cr2O7}$ দ্বারা জারণ'));
  assert.ok(html.includes('অক্সি-অ্যাসিটিলিন শিখা'));
  assert.ok(html.includes('3500^\\circ\\text{C}'));
  assert.ok(html.includes('2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(g)'));
  assert.ok(html.includes('অ্যারোমেটিক পলিমার গঠন'));
  assert.ok(html.includes('450^\\circ\\text{C}'));
  assert.ok(html.includes('600^\\circ\\text{C}'));
  assert.ok(html.includes('মেসিটিইলিন ($1,3,5$-ট্রাইমিথাইল বেনজিন)'));

  // Page 2: Comparison of Alkane, Alkene, Alkyne, Interconversion triangle, Distinguishing tests
  assert.ok(html.includes('অ্যালকেন, অ্যালকিন, অ্যালকাইনের পার্থক্য এবং পারস্পরিক রূপান্তর'));
  assert.ok(html.includes('চতুস্তলকীয়'));
  assert.ok(html.includes('ত্রিকোণীয় সমতলীয়'));
  assert.ok(html.includes('সরলরৈখিক সমতলীয়'));
  assert.ok(html.includes('109.5^\\circ'));
  assert.ok(html.includes('120^\\circ'));
  assert.ok(html.includes('180^\\circ'));
  assert.ok(html.includes('0.154\\text{ nm}'));
  assert.ok(html.includes('0.134\\text{ nm}'));
  assert.ok(html.includes('0.120\\text{ nm}'));
  assert.ok(html.includes('পারস্পরিক রূপান্তর'));
  assert.ok(html.includes('অ্যালকিন-1, অ্যালকাইন-1 এর পার্থক্যকারী বিক্রিয়া'));
  assert.ok(html.includes('সিলভার অ্যালকাইনাইড (বা অ্যাসিটিলাইড) এর সাদা অধঃক্ষেপ পড়ে'));
  assert.ok(html.includes('কপার অ্যালকাইনাইড বা অ্যাসিটিলাইড এর লাল অধঃক্ষেপ পড়ে'));
});
