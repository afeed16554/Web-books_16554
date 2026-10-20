import {
  MAIN_NAVIGATION_TOPICS,
  getAllSectionsHtml,
} from './chemistrySections.ts';
import {
  CURRICULUM_CHAPTERS,
  makeChapters,
} from './nctbCurriculumData.ts';
import type {
  SeedChapterEntry,
  SeedSemiChapterEntry,
} from './nctbCurriculumData.ts';

export { CURRICULUM_CHAPTERS, makeChapters };
export type { SeedChapterEntry, SeedSemiChapterEntry };

export const ALL_CLASS_LEVELS: string[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9-10 (SSC)',
  'Class 11-12 (HSC)',
];

export const PRIMARY_ADMIN_EMAIL = 'fha16554@gmail.com';

export interface LibraryTopicPage {
  id: string;
  className: string;
  subject: string;
  paper: string;
  chapter: string;
  title: string;
  subtitle: string;
  updatedDate: string;
  sectionsHtml: string;
  mainTopics: { id: string; title: string }[];
  isBuiltIn?: boolean;
  folderColor?: string;
}

export interface FolderNode {
  id: string;
  name: string;
  level: 'class' | 'subject' | 'paper' | 'chapter';
  color: string;
  count: number;
  children: FolderNode[];
  pages: LibraryTopicPage[];
}

export type SubjectCategory = 'compulsory' | 'divisional';

export interface SubjectPaperCard {
  id: string;
  className: string;
  subject: string;
  paper: string;
  displayName: string;
  banglaDisplayName?: string;
  subjectCode?: string;
  category: SubjectCategory;
  color: string;
  chapterCount: number;
  semiChapterCount?: number;
  count: number;
  pages: LibraryTopicPage[];
}

export interface SemiChapterItem {
  id: string;
  code: string;
  title: string;
  banglaTitle?: string;
  chapterTitle: string;
  className: string;
  subject: string;
  paper: string;
  page?: LibraryTopicPage;
}

export interface ChapterItem {
  id: string;
  chapterNumber: number;
  chapterCode?: string;
  subjectCode?: string;
  className: string;
  subject: string;
  paper: string;
  chapterTitle: string;
  banglaTitle?: string;
  shortDescription: string;
  color: string;
  pages: LibraryTopicPage[];
  semiChapters: SemiChapterItem[];
}

export function normalizeClassName(rawClass: string): string {
  const trimmed = (rawClass || '').trim();
  if (trimmed === 'Class 11-12' || trimmed === '11-12' || trimmed === 'HSC') {
    return 'Class 11-12 (HSC)';
  }
  if (trimmed === 'Class 9-10' || trimmed === '9-10' || trimmed === 'SSC') {
    return 'Class 9-10 (SSC)';
  }
  return trimmed || 'Class 11-12 (HSC)';
}

export function isAuthorizedAdminEmail(
  email: string | null | undefined,
  extraAllowedEmails: string[] = []
): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (normalized === PRIMARY_ADMIN_EMAIL.toLowerCase()) return true;
  return extraAllowedEmails.some((e) => e.trim().toLowerCase() === normalized);
}

export function formatCleanReaderHeader(
  chapter: string,
  topicTitle: string
): string {
  const cleanChapter = (chapter || '').trim();
  const cleanTopic = (topicTitle || '').trim();
  if (!cleanChapter) return cleanTopic;
  if (!cleanTopic) return cleanChapter;
  return `${cleanChapter} : ${cleanTopic}`;
}

export const ENGLISH_MAIN_TOPICS: { id: string; title: string }[] = [
  { id: 'sec-1', title: '1. Aliphatic Hydrocarbons: Sources & Knocking' },
  { id: 'sec-2', title: '2. Alkanes: Preparation & Identification' },
  { id: 'sec-3', title: '3. Alkanes: Physical Properties & Halogenation' },
  { id: 'sec-4', title: '4. Alkanes: Combustion, Pyrolysis & Reforming' },
  { id: 'sec-5', title: '5. Alkenes: Laboratory & Industrial Preparation' },
  { id: 'sec-6', title: '6. Electrophilic Addition & Markovnikov Rule' },
  { id: 'sec-7', title: '7. Alkenes: Addition Reactions & Ozonolysis' },
  { id: 'sec-8', title: '8. Alkenes: Baeyer Test, Polymerization & Tests' },
  { id: 'sec-9', title: '9. Alkynes: Preparation from CaC2 & Dihaloalkanes' },
  { id: 'sec-10', title: '10. Acidic Character of 1-Alkynes & Precipitate Tests' },
  { id: 'sec-11', title: '11. Alkynes: Hydrogenation, Halogenation & Hydration' },
  { id: 'sec-12', title: '12. Alkynes: Cyclic Polymerization & Ozonolysis' },
];

export const BUILT_IN_PAGES: LibraryTopicPage[] = [
  {
    id: 'hsc-chem-2nd-ch2-alkane-alkene-alkyne',
    className: 'Class 11-12 (HSC)',
    subject: 'Chemistry',
    paper: '2nd Paper',
    chapter: '2nd Chapter: Organic Chemistry',
    title: 'Alkane, Alkene & Alkyne',
    subtitle:
      'Hydrocarbons: Preparation, Properties, Mechanism, Ozonolysis & Identification Tests (12 Main Topics)',
    updatedDate: '18 Oct',
    sectionsHtml: getAllSectionsHtml(),
    mainTopics: ENGLISH_MAIN_TOPICS.map((t) => ({
      id: t.id,
      title: t.title,
    })),
    isBuiltIn: true,
    folderColor: '#ef4444',
  },
];

/**
 * Extracts <section class="topic-section" id="..."> and first <h2> title from raw HTML
 * so newly uploaded/pasted pages automatically populate the Quick Topic picker.
 */
export function extractMainTopicsFromHtml(
  html: string
): { id: string; title: string }[] {
  const results: { id: string; title: string }[] = [];
  const sectionRegex =
    /<section[^>]*class=["'][^"']*topic-section[^"']*["'][^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
  let match: RegExpExecArray | null;
  while ((match = sectionRegex.exec(html)) !== null) {
    const id = match[1].trim();
    const inner = match[2];
    const h2Match = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(inner);
    const rawTitle = h2Match
      ? h2Match[1].replace(/<[^>]+>/g, '').trim()
      : id;
    results.push({
      id,
      title: rawTitle || id,
    });
  }
  return results;
}

const CLASS_COLORS: Record<string, string> = {
  'Class 1': '#38bdf8',
  'Class 2': '#34d399',
  'Class 3': '#fbbf24',
  'Class 4': '#f87171',
  'Class 5': '#a78bfa',
  'Class 6': '#fb923c',
  'Class 7': '#2dd4bf',
  'Class 8': '#60a5fa',
  'Class 9-10 (SSC)': '#ec4899',
  'Class 11-12 (HSC)': '#f43f5e',
};

function makeClass6To8Subjects(
  className: string,
  banglaBookName: string
): Omit<SubjectPaperCard, 'count' | 'pages' | 'chapterCount'>[] {
  const slug = className.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return [
    {
      id: `${slug}-bangla-1st`,
      className,
      subject: 'Bangla',
      paper: '1st Paper',
      displayName: 'Bangla 1st Paper',
      banglaDisplayName: `বাংলা ১ম পত্র (${banglaBookName})`,
      subjectCode: '101',
      category: 'compulsory',
      color: '#f97316',
    },
    {
      id: `${slug}-bangla-2nd`,
      className,
      subject: 'Bangla',
      paper: '2nd Paper',
      displayName: 'Bangla 2nd Paper',
      banglaDisplayName: 'বাংলা ব্যাকরণ ও নির্মিতি',
      subjectCode: '102',
      category: 'compulsory',
      color: '#f59e0b',
    },
    {
      id: `${slug}-english-1st`,
      className,
      subject: 'English',
      paper: '1st Paper',
      displayName: 'English 1st Paper',
      banglaDisplayName: 'ইংরেজি ১ম পত্র (English for Today)',
      subjectCode: '107',
      category: 'compulsory',
      color: '#38bdf8',
    },
    {
      id: `${slug}-english-2nd`,
      className,
      subject: 'English',
      paper: '2nd Paper',
      displayName: 'English 2nd Paper',
      banglaDisplayName: 'ইংরেজি ২য় পত্র (Grammar & Composition)',
      subjectCode: '108',
      category: 'compulsory',
      color: '#8b5cf6',
    },
    {
      id: `${slug}-math`,
      className,
      subject: 'General Math',
      paper: 'Main Paper',
      displayName: 'General Math',
      banglaDisplayName: 'গণিত',
      subjectCode: '109',
      category: 'compulsory',
      color: '#84cc16',
    },
    {
      id: `${slug}-ict`,
      className,
      subject: 'ICT',
      paper: 'Main Paper',
      displayName: 'ICT',
      banglaDisplayName: 'তথ্য ও যোগাযোগ প্রযুক্তি',
      subjectCode: '154',
      category: 'compulsory',
      color: '#10b981',
    },
    {
      id: `${slug}-bgs`,
      className,
      subject: 'Bangladesh and Global Studies',
      paper: 'Main Paper',
      displayName: 'Bangladesh and Global Studies',
      banglaDisplayName: 'বাংলাদেশ ও বিশ্বপরিচয়',
      subjectCode: '150',
      category: 'compulsory',
      color: '#ec4899',
    },
    {
      id: `${slug}-religion`,
      className,
      subject: 'Religion',
      paper: 'Main Paper',
      displayName: 'Religion & Moral Education',
      banglaDisplayName: 'ধর্ম ও নৈতিক শিক্ষা',
      subjectCode: '111',
      category: 'compulsory',
      color: '#a855f7',
    },
    {
      id: `${slug}-science`,
      className,
      subject: 'General Science',
      paper: 'Main Paper',
      displayName: 'General Science',
      banglaDisplayName: 'বিজ্ঞান',
      subjectCode: '127',
      category: 'divisional',
      color: '#38bdf8',
    },
  ];
}

function makeClass3To5Subjects(
  className: string
): Omit<SubjectPaperCard, 'count' | 'pages' | 'chapterCount'>[] {
  const slug = className.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return [
    {
      id: `${slug}-bangla`,
      className,
      subject: 'Bangla',
      paper: 'Main Paper',
      displayName: 'Bangla',
      banglaDisplayName: 'আমার বাংলা বই',
      subjectCode: '101',
      category: 'compulsory',
      color: '#f97316',
    },
    {
      id: `${slug}-english`,
      className,
      subject: 'English',
      paper: 'Main Paper',
      displayName: 'English',
      banglaDisplayName: 'English for Today',
      subjectCode: '107',
      category: 'compulsory',
      color: '#38bdf8',
    },
    {
      id: `${slug}-math`,
      className,
      subject: 'General Math',
      paper: 'Main Paper',
      displayName: 'Elementary Mathematics',
      banglaDisplayName: 'প্রাথমিক গণিত',
      subjectCode: '109',
      category: 'compulsory',
      color: '#84cc16',
    },
    {
      id: `${slug}-bgs`,
      className,
      subject: 'Bangladesh and Global Studies',
      paper: 'Main Paper',
      displayName: 'Bangladesh and Global Studies',
      banglaDisplayName: 'বাংলাদেশ ও বিশ্বপরিচয়',
      subjectCode: '150',
      category: 'compulsory',
      color: '#ec4899',
    },
    {
      id: `${slug}-religion`,
      className,
      subject: 'Religion',
      paper: 'Main Paper',
      displayName: 'Religion & Moral Education',
      banglaDisplayName: 'ধর্ম ও নৈতিক শিক্ষা',
      subjectCode: '111',
      category: 'compulsory',
      color: '#a855f7',
    },
    {
      id: `${slug}-science`,
      className,
      subject: 'General Science',
      paper: 'Main Paper',
      displayName: 'Elementary Science',
      banglaDisplayName: 'প্রাথমিক বিজ্ঞান',
      subjectCode: '127',
      category: 'divisional',
      color: '#10b981',
    },
  ];
}

function makeClass1To2Subjects(
  className: string
): Omit<SubjectPaperCard, 'count' | 'pages' | 'chapterCount'>[] {
  const slug = className.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return [
    {
      id: `${slug}-bangla`,
      className,
      subject: 'Bangla',
      paper: 'Main Paper',
      displayName: 'Bangla',
      banglaDisplayName: 'আমার বাংলা বই',
      subjectCode: '101',
      category: 'compulsory',
      color: '#f97316',
    },
    {
      id: `${slug}-english`,
      className,
      subject: 'English',
      paper: 'Main Paper',
      displayName: 'English',
      banglaDisplayName: 'English for Today',
      subjectCode: '107',
      category: 'compulsory',
      color: '#38bdf8',
    },
    {
      id: `${slug}-math`,
      className,
      subject: 'General Math',
      paper: 'Main Paper',
      displayName: 'Elementary Mathematics',
      banglaDisplayName: 'প্রাথমিক গণিত',
      subjectCode: '109',
      category: 'compulsory',
      color: '#84cc16',
    },
  ];
}

/**
 * Master ordered preset of Compulsory and Divisional Subject + Paper cards
 * across HSC (Class 11–12), SSC (Class 9–10), and Classes 1 to 8.
 */
export const DEFAULT_SUBJECT_PAPERS: Omit<
  SubjectPaperCard,
  'count' | 'pages' | 'chapterCount'
>[] = [
  // =========================================================================
  // HSC (CLASS 11–12) — COMPULSORY SUBJECTS
  // =========================================================================
  {
    id: 'hsc-bangla-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'Bangla',
    paper: '1st Paper',
    displayName: 'Bangla 1st Paper',
    banglaDisplayName: 'বাংলা ১ম পত্র',
    subjectCode: '101',
    category: 'compulsory',
    color: '#f97316',
  },
  {
    id: 'hsc-bangla-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'Bangla',
    paper: '2nd Paper',
    displayName: 'Bangla 2nd Paper',
    banglaDisplayName: 'বাংলা ২য় পত্র',
    subjectCode: '102',
    category: 'compulsory',
    color: '#f59e0b',
  },
  {
    id: 'hsc-english-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'English',
    paper: '1st Paper',
    displayName: 'English 1st Paper',
    banglaDisplayName: 'ইংরেজি ১ম পত্র',
    subjectCode: '107',
    category: 'compulsory',
    color: '#38bdf8',
  },
  {
    id: 'hsc-english-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'English',
    paper: '2nd Paper',
    displayName: 'English 2nd Paper',
    banglaDisplayName: 'ইংরেজি ২য় পত্র',
    subjectCode: '108',
    category: 'compulsory',
    color: '#8b5cf6',
  },
  {
    id: 'hsc-ict',
    className: 'Class 11-12 (HSC)',
    subject: 'ICT',
    paper: 'HSC',
    displayName: 'ICT',
    banglaDisplayName: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    subjectCode: '275',
    category: 'compulsory',
    color: '#10b981',
  },

  // =========================================================================
  // HSC (CLASS 11–12) — DIVISIONAL SUBJECTS
  // =========================================================================
  {
    id: 'hsc-physics-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'Physics',
    paper: '1st Paper',
    displayName: 'Physics 1st Paper',
    banglaDisplayName: 'পদার্থবিজ্ঞান ১ম পত্র',
    subjectCode: '174',
    category: 'divisional',
    color: '#f59e0b',
  },
  {
    id: 'hsc-physics-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'Physics',
    paper: '2nd Paper',
    displayName: 'Physics 2nd Paper',
    banglaDisplayName: 'পদার্থবিজ্ঞান ২য় পত্র',
    subjectCode: '175',
    category: 'divisional',
    color: '#a855f7',
  },
  {
    id: 'hsc-chemistry-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'Chemistry',
    paper: '1st Paper',
    displayName: 'Chemistry 1st Paper',
    banglaDisplayName: 'রসায়ন ১ম পত্র',
    subjectCode: '176',
    category: 'divisional',
    color: '#10b981',
  },
  {
    id: 'hsc-chemistry-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'Chemistry',
    paper: '2nd Paper',
    displayName: 'Chemistry 2nd Paper',
    banglaDisplayName: 'রসায়ন ২য় পত্র',
    subjectCode: '177',
    category: 'divisional',
    color: '#38bdf8',
  },
  {
    id: 'hsc-math-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'Higher Math',
    paper: '1st Paper',
    displayName: 'Higher Math 1st Paper',
    banglaDisplayName: 'উচ্চতর গণিত ১ম পত্র',
    subjectCode: '265',
    category: 'divisional',
    color: '#84cc16',
  },
  {
    id: 'hsc-math-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'Higher Math',
    paper: '2nd Paper',
    displayName: 'Higher Math 2nd Paper',
    banglaDisplayName: 'উচ্চতর গণিত ২য় পত্র',
    subjectCode: '266',
    category: 'divisional',
    color: '#f97316',
  },
  {
    id: 'hsc-bio-1st',
    className: 'Class 11-12 (HSC)',
    subject: 'Biology',
    paper: '1st Paper',
    displayName: 'Biology 1st Paper',
    banglaDisplayName: 'জীববিজ্ঞান ১ম পত্র',
    subjectCode: '178',
    category: 'divisional',
    color: '#ec4899',
  },
  {
    id: 'hsc-bio-2nd',
    className: 'Class 11-12 (HSC)',
    subject: 'Biology',
    paper: '2nd Paper',
    displayName: 'Biology 2nd Paper',
    banglaDisplayName: 'জীববিজ্ঞান ২য় পত্র',
    subjectCode: '179',
    category: 'divisional',
    color: '#8b5cf6',
  },

  // =========================================================================
  // SSC (CLASS 9–10) — COMPULSORY SUBJECTS
  // =========================================================================
  {
    id: 'ssc-bangla-1st',
    className: 'Class 9-10 (SSC)',
    subject: 'Bangla',
    paper: '1st Paper',
    displayName: 'Bangla 1st Paper',
    banglaDisplayName: 'বাংলা ১ম পত্র',
    subjectCode: '101',
    category: 'compulsory',
    color: '#f97316',
  },
  {
    id: 'ssc-bangla-2nd',
    className: 'Class 9-10 (SSC)',
    subject: 'Bangla',
    paper: '2nd Paper',
    displayName: 'Bangla 2nd Paper',
    banglaDisplayName: 'বাংলা ২য় পত্র',
    subjectCode: '102',
    category: 'compulsory',
    color: '#f59e0b',
  },
  {
    id: 'ssc-english-1st',
    className: 'Class 9-10 (SSC)',
    subject: 'English',
    paper: '1st Paper',
    displayName: 'English 1st Paper',
    banglaDisplayName: 'ইংরেজি ১ম পত্র',
    subjectCode: '107',
    category: 'compulsory',
    color: '#38bdf8',
  },
  {
    id: 'ssc-english-2nd',
    className: 'Class 9-10 (SSC)',
    subject: 'English',
    paper: '2nd Paper',
    displayName: 'English 2nd Paper',
    banglaDisplayName: 'ইংরেজি ২য় পত্র',
    subjectCode: '108',
    category: 'compulsory',
    color: '#8b5cf6',
  },
  {
    id: 'ssc-general-math',
    className: 'Class 9-10 (SSC)',
    subject: 'General Math',
    paper: 'SSC',
    displayName: 'General Math',
    banglaDisplayName: 'গণিত',
    subjectCode: '109',
    category: 'compulsory',
    color: '#84cc16',
  },
  {
    id: 'ssc-ict',
    className: 'Class 9-10 (SSC)',
    subject: 'ICT',
    paper: 'SSC',
    displayName: 'ICT',
    banglaDisplayName: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    subjectCode: '154',
    category: 'compulsory',
    color: '#10b981',
  },
  {
    id: 'ssc-bgs',
    className: 'Class 9-10 (SSC)',
    subject: 'Bangladesh and Global Studies',
    paper: 'SSC',
    displayName: 'Bangladesh and Global Studies',
    banglaDisplayName: 'বাংলাদেশ ও বিশ্বপরিচয়',
    subjectCode: '150',
    category: 'compulsory',
    color: '#ec4899',
  },
  {
    id: 'ssc-religion-islam',
    className: 'Class 9-10 (SSC)',
    subject: 'Religion',
    paper: 'Islam & Moral Education',
    displayName: 'Islam & Moral Education',
    banglaDisplayName: 'ইসলাম ও নৈতিক শিক্ষা',
    subjectCode: '111',
    category: 'compulsory',
    color: '#a855f7',
  },
  {
    id: 'ssc-religion-hindu',
    className: 'Class 9-10 (SSC)',
    subject: 'Religion',
    paper: 'Hindu Religion & Moral Education',
    displayName: 'Hindu Religion & Moral Education',
    banglaDisplayName: 'হিন্দুধর্ম ও নৈতিক শিক্ষা',
    subjectCode: '112',
    category: 'compulsory',
    color: '#f59e0b',
  },
  {
    id: 'ssc-religion-christian',
    className: 'Class 9-10 (SSC)',
    subject: 'Religion',
    paper: 'Christian Religion & Moral Education',
    displayName: 'Christian Religion & Moral Education',
    banglaDisplayName: 'খ্রিষ্টধর্ম ও নৈতিক শিক্ষা',
    subjectCode: '113',
    category: 'compulsory',
    color: '#38bdf8',
  },
  {
    id: 'ssc-religion-buddhist',
    className: 'Class 9-10 (SSC)',
    subject: 'Religion',
    paper: 'Buddhist Religion & Moral Education',
    displayName: 'Buddhist Religion & Moral Education',
    banglaDisplayName: 'বৌদ্ধধর্ম ও নৈতিক শিক্ষা',
    subjectCode: '114',
    category: 'compulsory',
    color: '#10b981',
  },

  // =========================================================================
  // SSC (CLASS 9–10) — DIVISIONAL SUBJECTS
  // =========================================================================
  {
    id: 'ssc-physics',
    className: 'Class 9-10 (SSC)',
    subject: 'Physics',
    paper: 'SSC',
    displayName: 'Physics',
    banglaDisplayName: 'পদার্থবিজ্ঞান',
    subjectCode: '136',
    category: 'divisional',
    color: '#f59e0b',
  },
  {
    id: 'ssc-chemistry',
    className: 'Class 9-10 (SSC)',
    subject: 'Chemistry',
    paper: 'SSC',
    displayName: 'Chemistry',
    banglaDisplayName: 'রসায়ন',
    subjectCode: '137',
    category: 'divisional',
    color: '#10b981',
  },
  {
    id: 'ssc-higher-math',
    className: 'Class 9-10 (SSC)',
    subject: 'Higher Math',
    paper: 'SSC',
    displayName: 'Higher Math',
    banglaDisplayName: 'উচ্চতর গণিত',
    subjectCode: '126',
    category: 'divisional',
    color: '#84cc16',
  },
  {
    id: 'ssc-biology',
    className: 'Class 9-10 (SSC)',
    subject: 'Biology',
    paper: 'SSC',
    displayName: 'Biology',
    banglaDisplayName: 'জীববিজ্ঞান',
    subjectCode: '138',
    category: 'divisional',
    color: '#ec4899',
  },

  // =========================================================================
  // CLASS 8, 7, 6 (JUNIOR SECONDARY) & CLASS 5, 4, 3, 2, 1 (PRIMARY)
  // =========================================================================
  ...makeClass6To8Subjects('Class 8', 'সাহিত্য কণিকা'),
  ...makeClass6To8Subjects('Class 7', 'সপ্তবর্ণা'),
  ...makeClass6To8Subjects('Class 6', 'চারুপাঠ'),
  ...makeClass3To5Subjects('Class 5'),
  ...makeClass3To5Subjects('Class 4'),
  ...makeClass3To5Subjects('Class 3'),
  ...makeClass1To2Subjects('Class 2'),
  ...makeClass1To2Subjects('Class 1'),
];

/**
 * Splits a list of SubjectPaperCards into the 2 ordered curriculum sections:
 * 1. General / Compulsory Subjects
 * 2. Divisional / Science Subjects
 */
export function splitSubjectsByCategory(cards: SubjectPaperCard[]): {
  compulsory: SubjectPaperCard[];
  divisional: SubjectPaperCard[];
} {
  return {
    compulsory: cards.filter((c) => c.category === 'compulsory'),
    divisional: cards.filter((c) => c.category === 'divisional'),
  };
}

/**
 * Organizes all pages into a hierarchical Class -> Subject -> Paper -> Chapter tree
 * with all classes from Class 1 to 8, Class 9-10 (SSC), and Class 11-12 (HSC) present in the Sidebar.
 */
export function buildFolderHierarchy(
  pages: LibraryTopicPage[]
): FolderNode[] {
  const ensureNode = (
    parentList: FolderNode[],
    id: string,
    name: string,
    level: FolderNode['level'],
    color: string
  ): FolderNode => {
    let existing = parentList.find((n) => n.name === name);
    if (!existing) {
      existing = {
        id,
        name,
        level,
        color,
        count: 0,
        children: [],
        pages: [],
      };
      parentList.push(existing);
    }
    return existing;
  };

  const rootList: FolderNode[] = [];

  for (const cls of ALL_CLASS_LEVELS) {
    const slug = cls.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    ensureNode(
      rootList,
      `class-${slug}`,
      cls,
      'class',
      CLASS_COLORS[cls] || '#38bdf8'
    );
  }

  for (const preset of DEFAULT_SUBJECT_PAPERS) {
    const cNode = ensureNode(
      rootList,
      `class-${preset.className.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      preset.className,
      'class',
      CLASS_COLORS[preset.className] || '#38bdf8'
    );
    const sNode = ensureNode(
      cNode.children,
      `subj-${preset.className}-${preset.subject}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      preset.subject,
      'subject',
      preset.color
    );
    ensureNode(
      sNode.children,
      `paper-${preset.id}`,
      preset.paper,
      'paper',
      preset.color
    );
  }

  for (const page of pages) {
    const normalizedClass = normalizeClassName(page.className);
    const cNode = ensureNode(
      rootList,
      `class-${normalizedClass.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      normalizedClass,
      'class',
      CLASS_COLORS[normalizedClass] || '#f43f5e'
    );
    const sNode = ensureNode(
      cNode.children,
      `subj-${normalizedClass}-${page.subject}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      page.subject,
      'subject',
      '#3b82f6'
    );
    const pNode = ensureNode(
      sNode.children,
      `paper-${normalizedClass}-${page.subject}-${page.paper}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      page.paper,
      'paper',
      '#38bdf8'
    );
    const chNode = ensureNode(
      pNode.children,
      `chap-${normalizedClass}-${page.subject}-${page.paper}-${page.chapter}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      page.chapter,
      'chapter',
      '#f59e0b'
    );

    chNode.pages.push(page);
    chNode.count += 1;
    pNode.count += 1;
    sNode.count += 1;
    cNode.count += 1;
  }

  return rootList;
}

/**
 * Returns the Subject + Paper folder cards for the Home Page or a specific Class.
 */
export function getSubjectPaperCards(
  pages: LibraryTopicPage[],
  activeClassFilter: string = 'ALL'
): SubjectPaperCard[] {
  const cardMap = new Map<string, SubjectPaperCard>();

  for (const preset of DEFAULT_SUBJECT_PAPERS) {
    const key = `${preset.className}::${preset.subject}::${preset.paper}`;
    const presetChapters = CURRICULUM_CHAPTERS[key] || [];
    const totalSemiChapters = presetChapters.reduce(
      (sum, ch) => sum + (ch.semiChapters ? ch.semiChapters.length : 0),
      0
    );
    cardMap.set(key, {
      ...preset,
      chapterCount: presetChapters.length || 1,
      semiChapterCount: totalSemiChapters > 0 ? totalSemiChapters : undefined,
      count: 0,
      pages: [],
    });
  }

  for (const page of pages) {
    const normClass = normalizeClassName(page.className);
    const key = `${normClass}::${page.subject}::${page.paper}`;
    let card = cardMap.get(key);
    if (!card) {
      const displayName =
        page.paper && page.paper !== 'Single Paper' && page.paper !== 'Main Paper'
          ? `${page.subject} ${page.paper}`
          : page.subject;
      const isDivisional = [
        'Physics',
        'Chemistry',
        'Higher Math',
        'Biology',
        'General Science',
      ].includes(page.subject);
      card = {
        id: `sp-${normClass}-${page.subject}-${page.paper}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        className: normClass,
        subject: page.subject,
        paper: page.paper,
        displayName,
        category: isDivisional ? 'divisional' : 'compulsory',
        color: page.folderColor || '#38bdf8',
        chapterCount: 1,
        count: 0,
        pages: [],
      };
      cardMap.set(key, card);
    }
    card.pages.push(page);
    card.count += 1;
  }

  const allCards = Array.from(cardMap.values());
  if (!activeClassFilter || activeClassFilter === 'ALL') {
    return allCards;
  }

  const normalizedFilter = normalizeClassName(activeClassFilter);
  return allCards.filter((c) => c.className === normalizedFilter);
}

/**
 * Returns the Chapters list (including direct clickable `semiChapters` for Bangla and English)
 * for a selected Subject + Paper.
 */
export function getChaptersForSubjectPaper(
  pages: LibraryTopicPage[],
  className: string,
  subject: string,
  paper: string
): ChapterItem[] {
  const normClass = normalizeClassName(className);
  const key = `${normClass}::${subject}::${paper}`;
  const seeded = CURRICULUM_CHAPTERS[key] || [];

  const matchingPages = pages.filter(
    (p) =>
      normalizeClassName(p.className) === normClass &&
      p.subject === subject &&
      p.paper === paper
  );

  const chapterMap = new Map<string, ChapterItem>();

  seeded.forEach((ch, idx) => {
    const semiItems: SemiChapterItem[] = (ch.semiChapters || []).map(
      (semi, sIdx) => {
        const semiId = `semi-${normClass}-${subject}-${paper}-${idx + 1}-${sIdx + 1}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        const matchedPage = matchingPages.find(
          (p) =>
            p.chapter === semi.title ||
            p.title === semi.title ||
            p.chapter === `${ch.chapterTitle} — ${semi.title}`
        );
        return {
          id: semiId,
          code: semi.code,
          title: semi.title,
          banglaTitle: semi.bangla,
          chapterTitle: ch.chapterTitle,
          className: normClass,
          subject,
          paper,
          page: matchedPage,
        };
      }
    );

    chapterMap.set(ch.chapterTitle, {
      id: `ch-${normClass}-${subject}-${paper}-${idx + 1}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      chapterNumber: idx + 1,
      chapterCode: ch.chapterCode,
      subjectCode: ch.subjectCode,
      className: normClass,
      subject,
      paper,
      chapterTitle: ch.chapterTitle,
      banglaTitle: ch.banglaTitle,
      shortDescription: ch.shortDescription,
      color: ch.color,
      pages: [],
      semiChapters: semiItems,
    });
  });

  for (const page of matchingPages) {
    let chItem = chapterMap.get(page.chapter);
    if (!chItem) {
      // Check if this page matches a semi-chapter inside one of the seeded chapters
      for (const existingChap of chapterMap.values()) {
        if (
          existingChap.semiChapters.some(
            (s) => s.title === page.chapter || s.title === page.title
          )
        ) {
          chItem = existingChap;
          break;
        }
      }
    }
    if (!chItem) {
      const nextNum = chapterMap.size + 1;
      chItem = {
        id: `ch-${normClass}-${subject}-${paper}-${page.chapter}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        chapterNumber: nextNum,
        chapterCode: `Chapter ${String(nextNum).padStart(2, '0')}`,
        className: normClass,
        subject,
        paper,
        chapterTitle: page.chapter,
        shortDescription: page.subtitle || '',
        color: page.folderColor || '#38bdf8',
        pages: [],
        semiChapters: [],
      };
      chapterMap.set(page.chapter, chItem);
    }
    chItem.pages.push(page);
  }

  return Array.from(chapterMap.values());
}

export interface ViewingAreaCollapseState {
  isCollapsed: boolean;
  collapseProgress: number;
  viewingAreaOpacity: number;
  viewingAreaScale: number;
  compactHeaderTitleOpacity: number;
}

export function computeViewingAreaCollapseState(
  scrollTop: number,
  threshold: number = 110
): ViewingAreaCollapseState {
  const safeThreshold = Math.max(20, threshold);
  const clampedScroll = Math.max(0, scrollTop);
  const collapseProgress = Math.min(1, clampedScroll / safeThreshold);
  const isCollapsed = collapseProgress >= 0.62;
  const viewingAreaOpacity = Number(
    Math.max(0, 1 - collapseProgress * 1.35).toFixed(3)
  );
  const viewingAreaScale = Number((1 - collapseProgress * 0.08).toFixed(3));
  const compactHeaderTitleOpacity = Number(
    Math.min(1, Math.max(0, (collapseProgress - 0.35) / 0.65)).toFixed(3)
  );

  return {
    isCollapsed,
    collapseProgress: Number(collapseProgress.toFixed(3)),
    viewingAreaOpacity,
    viewingAreaScale,
    compactHeaderTitleOpacity,
  };
}

export type DeviceFormFactor =
  | 'phone'
  | 'passport-foldable'
  | 'tablet-foldable'
  | 'desktop';

export interface AdaptiveLayoutProfile {
  formFactor: DeviceFormFactor;
  label: string;
  showCompactRailWhenCollapsed: boolean;
  recommendedColumns: number;
}

export function detectDeviceFormFactor(
  width: number,
  height: number
): AdaptiveLayoutProfile {
  const safeW = Math.max(320, width);
  const safeH = Math.max(320, height);
  const aspectRatio = safeW / safeH;

  if (safeW >= 600 && safeW < 940 && aspectRatio >= 0.78 && aspectRatio <= 1.38) {
    return {
      formFactor: 'passport-foldable',
      label: 'Passport / Square Foldable',
      showCompactRailWhenCollapsed: true,
      recommendedColumns: 2,
    };
  }

  if (safeW < 640) {
    return {
      formFactor: 'phone',
      label: 'Phone',
      showCompactRailWhenCollapsed: false,
      recommendedColumns: 1,
    };
  }

  if (safeW < 1180) {
    return {
      formFactor: 'tablet-foldable',
      label: 'Tablet / Book Foldable',
      showCompactRailWhenCollapsed: true,
      recommendedColumns: 3,
    };
  }

  return {
    formFactor: 'desktop',
    label: 'Desktop / Large Display',
    showCompactRailWhenCollapsed: true,
    recommendedColumns: safeW >= 1536 ? 5 : 4,
  };
}

export type AppThemeMode = 'oled' | 'dark' | 'yellow' | 'light';

export function getThemeAwareAccentPair(
  hexColor: string,
  theme: AppThemeMode
): { fg: string; bgSoft: string; bannerBg: string; bannerFg: string } {
  const normalized = (hexColor || '#38bdf8').toLowerCase();

  const lightModeShadeMap: Record<string, string> = {
    '#38bdf8': '#0284c7',
    '#10b981': '#059669',
    '#f59e0b': '#d97706',
    '#a855f7': '#7e22ce',
    '#ec4899': '#db2777',
    '#f87171': '#dc2626',
    '#ef4444': '#dc2626',
    '#84cc16': '#4d7c0f',
    '#f97316': '#ea580c',
    '#8b5cf6': '#6d28d9',
  };

  if (theme === 'dark' || theme === 'oled') {
    const needsWhiteOnDarkBanner = [
      '#ef4444',
      '#dc2626',
      '#f87171',
      '#a855f7',
      '#ec4899',
      '#8b5cf6',
    ].includes(normalized);
    return {
      fg: hexColor,
      bgSoft: `${hexColor}22`,
      bannerBg: hexColor,
      bannerFg: needsWhiteOnDarkBanner ? '#ffffff' : '#020617',
    };
  }

  const deepColor = lightModeShadeMap[normalized] || '#0284c7';
  return {
    fg: deepColor,
    bgSoft: `${deepColor}18`,
    bannerBg: deepColor,
    bannerFg: '#ffffff',
  };
}

/**
 * Resolves the initial theme:
 * - On first start (or when auto-detect is active and user hasn't locked a manual preference),
 *   checks the user's device appearance (`systemPrefersDark`).
 * - Once the user changes their preference (`userHasSetPreference === true`),
 *   it stays exactly as the user set it across sessions.
 */
export function resolveInitialTheme(
  savedTheme: string | null | undefined,
  userHasSetPreference: boolean,
  systemPrefersDark: boolean
): AppThemeMode {
  if (
    userHasSetPreference &&
    (savedTheme === 'oled' ||
      savedTheme === 'dark' ||
      savedTheme === 'yellow' ||
      savedTheme === 'light')
  ) {
    return savedTheme;
  }
  return systemPrefersDark ? 'oled' : 'light';
}

export function cycleAppThemeMode(current: AppThemeMode): AppThemeMode {
  if (current === 'oled') return 'dark';
  if (current === 'dark') return 'yellow';
  if (current === 'yellow') return 'light';
  return 'oled';
}

export function clampViewingAreaScroll(
  scrollTop: number,
  maxThreshold: number = 120
): number {
  const safeMax = Math.max(20, maxThreshold);
  if (!Number.isFinite(scrollTop) || scrollTop <= 0) return 0;
  if (scrollTop >= safeMax) return safeMax;
  return Math.round(scrollTop);
}

export type EfficiencyOverrideMode = 'auto' | 'enabled' | 'disabled';

export interface HardwareEfficiencyInput {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  prefersReducedMotion?: boolean;
  saveData?: boolean;
  userOverride?: EfficiencyOverrideMode;
}

export function shouldEnableLowEndEfficiency(
  input: HardwareEfficiencyInput
): boolean {
  if (input.userOverride === 'enabled') return true;
  if (input.userOverride === 'disabled') return false;
  if (input.prefersReducedMotion || input.saveData) return true;
  if (typeof input.deviceMemory === 'number' && input.deviceMemory <= 4) {
    return true;
  }
  if (
    typeof input.hardwareConcurrency === 'number' &&
    input.hardwareConcurrency <= 4
  ) {
    return true;
  }
  return false;
}

export type CurveProfile = 'g2' | 'classic';
export type CurveRadiusPreset = 'standard' | 'deep' | 'ultra';

export interface CurveProfileConfig {
  profile: CurveProfile;
  label: string;
  cornerShape: 'squircle' | 'round';
  electronSmoothing: number;
  description: string;
  eyeComfortScore: number;
  defaultRadiusPx: number;
}

export function getCurveRadiusPx(preset: CurveRadiusPreset): number {
  if (preset === 'standard') return 28;
  if (preset === 'ultra') return 46;
  return 38; // 'deep' default — richer, more pronounced curveness
}

/**
 * Returns configuration metadata for the selected corner curvature profile.
 * G2 profile provides continuous curvature (squircle) with a deeper 38px default radius.
 */
export function getCurveProfileConfig(
  profile: CurveProfile
): CurveProfileConfig {
  if (profile === 'g2') {
    return {
      profile: 'g2',
      label: 'G2 Continuous Curve (Squircle)',
      cornerShape: 'squircle',
      electronSmoothing: 1,
      description:
        'Superellipse geometry (n=4) with continuous curvature derivative (dκ/ds = 0 at tangents) and deep 38px radius. Eliminates harsh corner pinch for maximum eye comfort.',
      eyeComfortScore: 10,
      defaultRadiusPx: 38,
    };
  }
  return {
    profile: 'classic',
    label: 'Classic G1 (Circular Arc)',
    cornerShape: 'round',
    electronSmoothing: 0,
    description:
      'Traditional circular arc border-radius with standard 90° tangent step.',
    eyeComfortScore: 6,
    defaultRadiusPx: 28,
  };
}

/**
 * Cycles between G2 Continuous Curve and Classic G1.
 */
export function cycleCurveProfile(current: CurveProfile): CurveProfile {
  return current === 'g2' ? 'classic' : 'g2';
}

/* =====================================================================
   4-TIER ROLE GOVERNANCE & CONTENT MODERATION ENGINE
   1. main_admin (fha16554@gmail.com): Immutable root owner. Only Main Admin
      can accept/manage Secondary Admins. Cannot be removed or overridden.
   2. secondary_admin: Can do everything a Moderator does + can approve
      Moderator role requests and Moderator content submissions, but CANNOT
      take over Main Admin or manage Secondary Admins.
   3. moderator: Can submit new topic/chapter content, which enters the
      Pending Content Queue first to be checked and approved by Main/Secondary Admin.
   4. reader: Standard student/reader. Can submit feedback, ask questions,
      and request Moderator or Secondary Admin permission.
   ===================================================================== */
export type UserRole =
  | 'main_admin'
  | 'secondary_admin'
  | 'moderator'
  | 'reader';

export interface RolePermissionRequest {
  id: string;
  applicantUid: string;
  applicantEmail: string;
  applicantName: string;
  requestedRole: 'moderator' | 'secondary_admin';
  expertiseSubject: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  createdAt: string;
}

export interface PendingTopicSubmission {
  id: string;
  authorUid: string;
  authorEmail: string;
  authorName: string;
  authorRole: UserRole;
  page: LibraryTopicPage;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  createdAt: string;
}

export function resolveUserRole(
  email: string | null | undefined,
  secondaryAdminEmails: string[] = [],
  moderatorEmails: string[] = [],
  isFirestoreAdmin: boolean = false
): UserRole {
  if (!email || typeof email !== 'string') return 'reader';
  const clean = email.trim().toLowerCase();
  if (!clean) return 'reader';

  if (clean === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return 'main_admin';
  }

  const normalizedSecondary = secondaryAdminEmails
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e && e !== PRIMARY_ADMIN_EMAIL.toLowerCase());
  if (normalizedSecondary.includes(clean) || isFirestoreAdmin) {
    return 'secondary_admin';
  }

  const normalizedModerators = moderatorEmails
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (normalizedModerators.includes(clean)) {
    return 'moderator';
  }

  return 'reader';
}

/**
 * Strictly ONLY the Main Admin (fha16554@gmail.com) can approve, add, or remove Secondary Admins.
 * Secondary Admins can never promote anyone to Secondary Admin or take over Main Admin.
 */
export function canManageSecondaryAdmins(
  role: UserRole,
  email?: string | null
): boolean {
  if (role !== 'main_admin') return false;
  if (!email) return false;
  return email.trim().toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();
}

/**
 * Nobody can ever remove, demote, or take over the Main Admin account.
 */
export function canModifyMainAdmin(targetEmail: string): boolean {
  if (!targetEmail) return false;
  if (targetEmail.trim().toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return false;
  }
  return true;
}

/**
 * Both Main Admin and Secondary Admins can approve/manage Moderator requests.
 */
export function canApproveModeratorRequests(role: UserRole): boolean {
  return role === 'main_admin' || role === 'secondary_admin';
}

/**
 * Both Main Admin and Secondary Admins can review and approve/reject Pending Content from Moderators.
 */
export function canApproveModeratorContent(role: UserRole): boolean {
  return role === 'main_admin' || role === 'secondary_admin';
}

/**
 * Main Admin, Secondary Admin, and Moderators can submit new topic content.
 */
export function canSubmitTopicContent(role: UserRole): boolean {
  return (
    role === 'main_admin' ||
    role === 'secondary_admin' ||
    role === 'moderator'
  );
}

/**
 * When a Moderator adds new content, it MUST be checked and approved first (`true`).
 * Main Admin and Secondary Admin can publish directly (`false`).
 */
export function doesContentRequireApproval(role: UserRole): boolean {
  return role === 'moderator';
}

// ============================================================================
// APP VERSION, VARIANT DETECTION, GITHUB RELEASE & NOTIFICATION SYSTEM
// ============================================================================

export const APP_CURRENT_VERSION = '1.0.2';
export const GITHUB_REPO_OWNER = 'afeed16554';
export const GITHUB_REPO_NAME = 'Web-books_16554';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
export const GITHUB_RELEASES_URL = `${GITHUB_REPO_URL}/releases`;
export const GITHUB_RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;

export type AppPlatformVariant =
  | 'android-apk'
  | 'windows-exe'
  | 'ios-web'
  | 'web-pwa';

export interface AppVariantMetadata {
  variant: AppPlatformVariant;
  label: string;
  shortBadge: string;
  runtimeDescription: string;
  platformFamily: 'Android' | 'Windows' | 'iOS' | 'Web';
}

export function detectAppVariant(
  userAgent: string = '',
  isCapacitorNative: boolean = false,
  isElectronDesktop: boolean = false,
  isStandalonePwa: boolean = false
): AppVariantMetadata {
  const ua = userAgent.toLowerCase();

  if (isElectronDesktop || ua.includes('electron')) {
    return {
      variant: 'windows-exe',
      label: 'Windows Desktop App (EXE)',
      shortBadge: 'Windows EXE',
      runtimeDescription: 'Native Electron Desktop Build (x64)',
      platformFamily: 'Windows',
    };
  }

  if (
    isCapacitorNative ||
    ua.includes('capacitor') ||
    (ua.includes('android') && ua.includes('wv'))
  ) {
    return {
      variant: 'android-apk',
      label: 'Android Native App (APK)',
      shortBadge: 'Android APK',
      runtimeDescription: 'Capacitor Android Runtime Package',
      platformFamily: 'Android',
    };
  }

  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    return {
      variant: 'ios-web',
      label: isStandalonePwa
        ? 'iOS Home Screen App (PWA)'
        : 'iOS Web App',
      shortBadge: 'iOS Web / PWA',
      runtimeDescription: 'Mobile WebKit & Home Screen Web App',
      platformFamily: 'iOS',
    };
  }

  if (ua.includes('android')) {
    return {
      variant: 'web-pwa',
      label: isStandalonePwa
        ? 'Android Installed Web App (PWA)'
        : 'Android Mobile Web',
      shortBadge: 'Android Web / PWA',
      runtimeDescription: 'Progressive Web App & Offline Service Worker',
      platformFamily: 'Android',
    };
  }

  return {
    variant: 'web-pwa',
    label: isStandalonePwa
      ? 'Desktop Installed Web App (PWA)'
      : 'Web Browser Edition (PWA)',
    shortBadge: 'Web / PWA',
    runtimeDescription: 'Multi-Platform Web & Offline Service Worker',
    platformFamily: 'Web',
  };
}

export interface ParsedSemver {
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
  isPrerelease: boolean;
  cleanTag: string;
}

export function parseSemver(versionStr: string): ParsedSemver {
  const raw = (versionStr || '0.0.0').trim().replace(/^v/i, '');
  const compactMatch = raw.match(
    /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:(-)?([a-zA-Z][\w.-]*))?$/
  );
  if (compactMatch) {
    const major = Number.parseInt(compactMatch[1] || '0', 10) || 0;
    const minor = Number.parseInt(compactMatch[2] || '0', 10) || 0;
    const patch = Number.parseInt(compactMatch[3] || '0', 10) || 0;
    const sep = compactMatch[4] || '';
    const prerelease = compactMatch[5] ? compactMatch[5] : null;
    return {
      major,
      minor,
      patch,
      prerelease,
      isPrerelease: Boolean(prerelease),
      cleanTag: `v${major}.${minor}.${patch}${prerelease ? `${sep}${prerelease}` : ''}`,
    };
  }

  const [corePart, ...preParts] = raw.split('-');
  const prerelease = preParts.length > 0 ? preParts.join('-') : null;
  const nums = (corePart || '0.0.0')
    .split('.')
    .map((n) => Number.parseInt(n, 10) || 0);
  const major = nums[0] || 0;
  const minor = nums[1] || 0;
  const patch = nums[2] || 0;
  return {
    major,
    minor,
    patch,
    prerelease,
    isPrerelease: Boolean(prerelease),
    cleanTag: `v${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ''}`,
  };
}

/**
 * Compares two semantic version strings (e.g. "v1.0.2" vs "1.0.1" or "v1.0.2pre" vs "v1.0.2").
 * Returns 1 if vA > vB, -1 if vA < vB, 0 if equal.
 */
export function compareSemver(vA: string, vB: string): number {
  const a = parseSemver(vA);
  const b = parseSemver(vB);

  if (a.major !== b.major) return a.major > b.major ? 1 : -1;
  if (a.minor !== b.minor) return a.minor > b.minor ? 1 : -1;
  if (a.patch !== b.patch) return a.patch > b.patch ? 1 : -1;

  // Same major.minor.patch: stable release is higher than prerelease (e.g. 1.0.2 > 1.0.2pre)
  if (!a.isPrerelease && b.isPrerelease) return 1;
  if (a.isPrerelease && !b.isPrerelease) return -1;
  if (a.prerelease && b.prerelease && a.prerelease !== b.prerelease) {
    return a.prerelease.localeCompare(b.prerelease);
  }
  return 0;
}

export interface GitHubReleaseAssetInfo {
  name: string;
  browserDownloadUrl: string;
  sizeBytes?: number;
}

export interface GitHubReleaseInfo {
  tagName: string;
  name: string;
  htmlUrl: string;
  prerelease: boolean;
  publishedAt: string;
  body?: string;
  assets: GitHubReleaseAssetInfo[];
}

export interface ReleaseUpdateSummary {
  currentVersionTag: string;
  latestStable: GitHubReleaseInfo | null;
  latestPrerelease: GitHubReleaseInfo | null;
  targetRelease: GitHubReleaseInfo;
  hasUpdate: boolean;
  hasStableUpdate: boolean;
  hasPrereleaseUpdate: boolean;
  isTargetPrerelease: boolean;
  apkDownloadUrl: string;
  exeDownloadUrl: string;
  releasePageUrl: string;
  repoUrl: string;
}

export const FALLBACK_GITHUB_RELEASES: GitHubReleaseInfo[] = [
  {
    tagName: 'v1.0.2',
    name: 'v1.0.2 — Unified App Drawer Icon & Dark Theme Refinement',
    htmlUrl: `${GITHUB_RELEASES_URL}/tag/v1.0.2`,
    prerelease: false,
    publishedAt: '2026-10-20T08:00:00Z',
    body: 'Unified Android app drawer adaptive icon and Windows EXE icon with the in-app Web Books globe emblem, refined neutral dark theme palette, and updated version tracking.',
    assets: [
      {
        name: 'app-debug.apk',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.2/app-debug.apk`,
      },
      {
        name: 'Web.Books.Setup.1.0.2.exe',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.2/Web.Books.Setup.1.0.2.exe`,
      },
    ],
  },
  {
    tagName: 'v1.0.2pre',
    name: 'v1.0.2pre — Pre-Release Build',
    htmlUrl: `${GITHUB_RELEASES_URL}/tag/v1.0.2pre`,
    prerelease: true,
    publishedAt: '2026-10-19T14:45:45Z',
    body: 'Pre-release build for Android APK and Windows Desktop EXE.',
    assets: [
      {
        name: 'app-debug.apk',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.2pre/app-debug.apk`,
      },
      {
        name: 'Web.Books.Setup.1.0.0.exe',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.2pre/Web.Books.Setup.1.0.0.exe`,
      },
    ],
  },
  {
    tagName: 'v1.0.1',
    name: 'v1.0.1 — Multi-Platform Release & Curvature',
    htmlUrl: `${GITHUB_RELEASES_URL}/tag/v1.0.1`,
    prerelease: false,
    publishedAt: '2026-10-18T17:15:35Z',
    body: 'Official multi-platform release for Android APK, Windows Desktop EXE, and Web with Dex optimization.',
    assets: [
      {
        name: 'app-debug.apk',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.1/app-debug.apk`,
      },
      {
        name: 'Web.Books.Setup.1.0.0.exe',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.1/Web.Books.Setup.1.0.0.exe`,
      },
    ],
  },
  {
    tagName: 'v1.0.0',
    name: 'v1.0.0 — Initial Public Release',
    htmlUrl: `${GITHUB_RELEASES_URL}/tag/v1.0.0`,
    prerelease: false,
    publishedAt: '2026-10-18T15:44:55Z',
    body: 'Initial release of Web Books by Afeed.',
    assets: [
      {
        name: 'app-debug.apk',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.0/app-debug.apk`,
      },
      {
        name: 'Web.Books.Setup.1.0.0.exe',
        browserDownloadUrl: `${GITHUB_RELEASES_URL}/download/v1.0.0/Web.Books.Setup.1.0.0.exe`,
      },
    ],
  },
];

export function evaluateReleaseUpdateStatus(
  currentVersion: string,
  releases: GitHubReleaseInfo[] = FALLBACK_GITHUB_RELEASES,
  preferPrereleaseChannel: boolean = false
): ReleaseUpdateSummary {
  const safeList =
    Array.isArray(releases) && releases.length > 0
      ? releases
      : FALLBACK_GITHUB_RELEASES;

  const sortedAll = [...safeList].sort((a, b) =>
    compareSemver(b.tagName, a.tagName)
  );
  const stableList = sortedAll.filter(
    (r) => !r.prerelease && !parseSemver(r.tagName).isPrerelease
  );
  const prereleaseList = sortedAll.filter(
    (r) => r.prerelease || parseSemver(r.tagName).isPrerelease
  );

  const latestStable = stableList[0] || sortedAll[0] || null;
  const latestPrerelease = prereleaseList[0] || null;

  const hasStableUpdate = latestStable
    ? compareSemver(latestStable.tagName, currentVersion) > 0
    : false;
  const hasPrereleaseUpdate = latestPrerelease
    ? compareSemver(latestPrerelease.tagName, currentVersion) > 0
    : false;

  const targetRelease =
    preferPrereleaseChannel && latestPrerelease
      ? latestPrerelease
      : latestStable || sortedAll[0];

  const isTargetPrerelease = Boolean(
    targetRelease.prerelease || parseSemver(targetRelease.tagName).isPrerelease
  );
  const hasUpdate = preferPrereleaseChannel
    ? hasPrereleaseUpdate || hasStableUpdate
    : hasStableUpdate;

  const apkAsset = targetRelease.assets.find((a) =>
    a.name.toLowerCase().endsWith('.apk')
  );
  const exeAsset = targetRelease.assets.find((a) =>
    a.name.toLowerCase().endsWith('.exe')
  );

  return {
    currentVersionTag: parseSemver(currentVersion).cleanTag,
    latestStable,
    latestPrerelease,
    targetRelease,
    hasUpdate,
    hasStableUpdate,
    hasPrereleaseUpdate,
    isTargetPrerelease,
    apkDownloadUrl: apkAsset?.browserDownloadUrl || GITHUB_RELEASES_URL,
    exeDownloadUrl: exeAsset?.browserDownloadUrl || GITHUB_RELEASES_URL,
    releasePageUrl: targetRelease.htmlUrl || GITHUB_RELEASES_URL,
    repoUrl: GITHUB_REPO_URL,
  };
}

export type AppNotificationCategory =
  | 'version_update'
  | 'prerelease_update'
  | 'role_approval'
  | 'content_approval';

export interface AppNotificationItem {
  id: string;
  category: AppNotificationCategory;
  title: string;
  message: string;
  approvalSummary?: string;
  targetAction:
    | 'open_version_settings'
    | 'open_admin_settings'
    | 'open_profile_settings'
    | 'open_reader_topic'
    | 'show_approval_detail';
  targetSection?:
    | 'account'
    | 'theme'
    | 'visual'
    | 'version'
    | 'faq'
    | 'admin'
    | 'manual';
  targetTopicId?: string;
  releaseUrl?: string;
  versionTag?: string;
  isPrerelease?: boolean;
  createdAt: string;
  read: boolean;
}

export interface NotificationTapResolution {
  redirectView: 'settings' | 'reader' | 'approval_detail';
  settingsSection:
    | 'account'
    | 'theme'
    | 'visual'
    | 'version'
    | 'faq'
    | 'admin'
    | 'manual';
  showApprovalBanner: boolean;
  approvalTitle: string;
  approvalDetails: string;
  targetTopicId?: string;
}

/**
 * Pure resolver for notification clicks:
 * - Version / Update / App setting change notifications redirect directly to the corresponding Settings section (e.g. 'version').
 * - Normal Approval notifications (Role approval or Content approval) tell the user what they were approved for and allow navigating to the relevant page.
 */
export function resolveNotificationTapAction(
  notification: AppNotificationItem
): NotificationTapResolution {
  if (
    notification.category === 'version_update' ||
    notification.category === 'prerelease_update' ||
    notification.targetAction === 'open_version_settings'
  ) {
    return {
      redirectView: 'settings',
      settingsSection: notification.targetSection || 'version',
      showApprovalBanner: false,
      approvalTitle: '',
      approvalDetails: '',
    };
  }

  if (notification.targetAction === 'open_admin_settings') {
    return {
      redirectView: 'settings',
      settingsSection: 'admin',
      showApprovalBanner: Boolean(notification.approvalSummary),
      approvalTitle: notification.title,
      approvalDetails: notification.approvalSummary || notification.message,
    };
  }

  // Normal approval notifications: tell the user what they are approved for!
  return {
    redirectView: notification.targetTopicId ? 'reader' : 'approval_detail',
    settingsSection: notification.targetSection || 'account',
    showApprovalBanner: true,
    approvalTitle: notification.title,
    approvalDetails: notification.approvalSummary || notification.message,
    targetTopicId: notification.targetTopicId,
  };
}



