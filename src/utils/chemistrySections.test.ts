import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BATCH_1_ALKANE_SECTIONS,
  BATCH_2_ALKENE_SECTIONS,
  ALL_SECTIONS,
  getRawBatch2SectionsHtml,
  getAllSectionsHtml,
  filterSectionsByCategory
} from './chemistrySections.ts';

test('BATCH_2_ALKENE_SECTIONS contains the 3 exact topic-section blocks from the attached 3 pages', () => {
  assert.equal(BATCH_2_ALKENE_SECTIONS.length, 3);
  for (const section of BATCH_2_ALKENE_SECTIONS) {
    assert.ok(section.html.includes(`<section id="${section.id}" class="topic-section">`));
    assert.ok(section.html.includes('</section>'));
  }
});

test('Zero data loss check for Batch 2 Page 1: Reforming table (n-Hexane, n-Heptane, n-Octane)', () => {
  const html = getRawBatch2SectionsHtml();
  assert.ok(html.includes('যৌগ'));
  assert.ok(html.includes('প্রভাবক'));
  assert.ok(html.includes('উৎপাদ'));
  assert.ok(html.includes('n-হেক্সেন'));
  assert.ok(html.includes('Pt, Al, V2O5, Al2O3'));
  assert.ok(html.includes('বেনজিন'));
  assert.ok(html.includes('n-হেপ্টেন'));
  assert.ok(html.includes('টলুইন'));
  assert.ok(html.includes('n- অক্টেন'));
  assert.ok(html.includes('জাইলিন/ইথাইল বেনজিন'));
});

test('Zero data loss check for Batch 2 Page 2 & 3: Alkene preparation, Electrophilic addition, Markovnikov & Anti-Markovnikov', () => {
  const html = getRawBatch2SectionsHtml();
  // Page 2 & 3 top: Alkene preparation
  assert.ok(html.includes('C_nH_{2n}'));
  assert.ok(html.includes('অ্যালকোহলের প্রভাবকীয় নিরুদন'));
  assert.ok(html.includes('অ্যালকিন-1'));
  assert.ok(html.includes('140^\\circ\\text{C}'));
  assert.ok(html.includes('ভিসিনাল (সন্নিহিত) ডাইহ্যালাইড থেকে'));
  assert.ok(html.includes('হ্যালোঅ্যালকেন থেকে'));
  assert.ok(html.includes('(major)'));
  assert.ok(html.includes('(minor)'));
  assert.ok(html.includes('সাইজেফ নীতি'));
  assert.ok(html.includes('Pd}-$সিলিকাজেলও'));
  // Page 3 bottom: Electrophilic addition & Markovnikov / Anti-Markovnikov
  assert.ok(html.includes('অ্যালকিনের ইলেকট্রোফিলিক সংযোজন বিক্রিয়া (সাধারণ কৌশল)'));
  assert.ok(html.includes('(অস্থায়ী কার্বোনিয়াম আয়ন)'));
  assert.ok(html.includes('(ইথাইল কার্বোনিয়াম আয়ন)'));
  assert.ok(html.includes('তেলা মাথায় তেল দেওয়া'));
  assert.ok(html.includes('90%'));
  assert.ok(html.includes('10%'));
  assert.ok(html.includes('বেশি স্থিতিশীল (99.1%)'));
  assert.ok(html.includes('0.9%'));
  assert.ok(html.includes('+ROH'));
  assert.ok(html.includes('শুধুমাত্র $\\ce{HBr}$ এন্টিমার্কনিকভ নিয়ম অনুযায়ী বিক্রিয়া করে'));
  // Ensure un-uploaded Ozonolysis is NOT present
  assert.equal(getAllSectionsHtml().includes('ওজোনীকরণ'), false);
});

test('filterSectionsByCategory filters Batch 1 and Batch 2 accurately', () => {
  assert.equal(filterSectionsByCategory('all').length, ALL_SECTIONS.length);
  assert.equal(filterSectionsByCategory('batch-1-alkane').length, BATCH_1_ALKANE_SECTIONS.length);
  assert.equal(filterSectionsByCategory('batch-2-alkene').length, BATCH_2_ALKENE_SECTIONS.length);
});
