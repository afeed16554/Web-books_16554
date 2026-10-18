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
  | 'dex-desktop';

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
    formFactor: 'dex-desktop',
    label: 'DeX / Desktop PC',
    showCompactRailWhenCollapsed: true,
    recommendedColumns: safeW >= 1536 ? 5 : 4,
  };
}

export function getThemeAwareAccentPair(
  hexColor: string,
  theme: 'dark' | 'yellow' | 'light'
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

  if (theme === 'dark') {
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
