import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BATCH_1_SECTIONS,
  BATCH_2_SECTIONS,
  BATCH_3_SECTIONS,
  ALL_SECTIONS,
  MAIN_NAVIGATION_TOPICS,
  getRawBatch3SectionsHtml,
  getBatch3NavigationLinksHtml,
  getAllSectionsHtml
} from './chemistrySections.ts';

test('BATCH_3_SECTIONS contains valid <section class="topic-section" id="..."> blocks for pages 8, 9, and 10', () => {
  assert.equal(BATCH_3_SECTIONS.length, 2);
  for (const section of BATCH_3_SECTIONS) {
    assert.ok(
      section.html.includes(`<section class="topic-section" id="${section.id}">`),
      `Missing section tag with id="${section.id}"`
    );
    assert.ok(section.html.includes('</section>'));
  }
});

test('getBatch3NavigationLinksHtml generates exact <a class="topic-link" href="#..." onclick="togglePanel(\'topic-panel\')"> tags', () => {
  const navHtml = getBatch3NavigationLinksHtml();
  assert.ok(
    navHtml.includes(
      '<a class="topic-link" href="#topic-alkene-addition-ozonolysis" onclick="togglePanel(\'topic-panel\')">৭. অ্যালকিনের সংযোজন ও ওজোনীকরণ বিক্রিয়া</a>'
    )
  );
  assert.ok(
    navHtml.includes(
      '<a class="topic-link" href="#topic-alkene-oxidation-tests" onclick="togglePanel(\'topic-panel\')">৮. অ্যালকিনের জারণ ও শনাক্তকরণ পরীক্ষা</a>'
    )
  );
});

test('MAIN_NAVIGATION_TOPICS includes only main topics (excludes minor sub-tables like topic-reforming-table)', () => {
  assert.equal(MAIN_NAVIGATION_TOPICS.length, 8);
  assert.equal(
    MAIN_NAVIGATION_TOPICS.some((t) => t.id === 'topic-reforming-table'),
    false
  );
  assert.equal(ALL_SECTIONS.length, BATCH_1_SECTIONS.length + BATCH_2_SECTIONS.length + BATCH_3_SECTIONS.length);
});

test('Zero data loss check for Pages 8, 9, and 10 (Addition, Ozonolysis, Oxidation, Baeyer & Bromine tests, Alkenyl radicals)', () => {
  const html = getRawBatch3SectionsHtml();

  // Page 8: Addition table & HOX / H2SO4 notes
  assert.ok(html.includes('অ্যালকিনের সংযোজন বিক্রিয়া'));
  assert.ok(html.includes('ইথিলিন ক্লোরো হাইড্রিন'));
  assert.ok(html.includes('প্রোপিলিন ব্রোমোহাইড্রিন বা 1-ব্রোমো-2-প্রোপানল'));
  assert.ok(html.includes('iso-অ্যালকাইল হাইড্রোজেন সালফেট'));
  assert.ok(html.includes('হাইপোহ্যালাস এসিড অ্যালকিনের সাথে বিক্রিয়ায় হ্যালোহাইড্রিন উৎপন্ন করে'));

  // Page 9 & Top of Page 10: Ozonolysis reactions (a), (b), (c) and double-bond position trick
  assert.ok(html.includes('ওজোন সংযোজন বিক্রিয়া (ওজোনীকরণ বিক্রিয়া)'));
  assert.ok(html.includes('Zn + H2O2 -> ZnO + H2O'));
  assert.ok(html.includes('CH3COCH3'));
  assert.ok(html.includes('মনে মনে উৎপাদ দুটিকে জোড়া লাগাও'));
  assert.ok(html.includes('এক অণু প্রোপানোন ও এক অণু ইথান্যাল পাওয়া গেল'));
  assert.ok(html.includes('[ডটগুলো শুধু কৌশলটি বোঝানোর জন্য ব্যবহার করা হয়েছে]'));
  assert.ok(html.includes('২-মিথাইলবিউট-২-ইন'));

  // Page 10: Oxidation, Bromine test, Baeyer test, Alkenyl/Vinyl/Allyl radicals
  assert.ok(html.includes('প্রবল জারক দ্বারা অ্যালকিনের জারণ'));
  assert.ok(html.includes('ইথানোয়িক এসিড'));
  assert.ok(html.includes('অ্যালকিনের শনাক্তকরণ'));
  assert.ok(html.includes('ব্রোমিন দ্রবণ পরীক্ষা'));
  assert.ok(html.includes('লাল বর্ণের দ্রবণ বর্ণহীন হয়'));
  assert.ok(html.includes('বেয়ার পরীক্ষা'));
  assert.ok(html.includes('গোলাপি বর্ণের দ্রবণ বর্ণহীন হয়'));
  assert.ok(html.includes('অ্যালকিনাইল মূলক'));
  assert.ok(html.includes('ভিনাইল মূলক'));
  assert.ok(html.includes('প্রোপিনাইল বা অ্যালাইল মূলক'));
});
