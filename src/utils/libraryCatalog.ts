import {
  MAIN_NAVIGATION_TOPICS,
  getAllSectionsHtml,
} from './chemistrySections.ts';
import type { TopicItem } from './chemistrySections.ts';

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

export interface SubjectPaperCard {
  id: string;
  className: string;
  subject: string;
  paper: string;
  displayName: string; // e.g., "Chemistry 2nd Paper"
  color: string;
  chapterCount: number;
  count: number;
  pages: LibraryTopicPage[];
}

export interface ChapterItem {
  id: string;
  chapterNumber: number;
  className: string;
  subject: string;
  paper: string;
  chapterTitle: string; // e.g., "2nd Chapter: Organic Chemistry"
  shortDescription: string;
  color: string;
  pages: LibraryTopicPage[];
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
    mainTopics: ENGLISH_MAIN_TOPICS.map((t: TopicItem) => ({
      id: t.id,
      title: t.title,
    })),
    isBuiltIn: true,
    folderColor: '#38bdf8',
  },
];

/**
 * Curriculum chapters catalog so tapping a Subject + Paper opens its Chapters view first.
 */
export const CURRICULUM_CHAPTERS: Record<
  string,
  Array<{ chapterTitle: string; shortDescription: string; color: string }>
> = {
  'Class 11-12 (HSC)::Chemistry::2nd Paper': [
    {
      chapterTitle: '1st Chapter: Environmental Chemistry',
      shortDescription: 'Gas laws, acid rain, water purity & atmospheric chemistry',
      color: '#10b981',
    },
    {
      chapterTitle: '2nd Chapter: Organic Chemistry',
      shortDescription:
        'Hydrocarbons (Alkane, Alkene, Alkyne), reaction mechanisms, ozonolysis & functional groups',
      color: '#38bdf8',
    },
    {
      chapterTitle: '3rd Chapter: Quantitative Chemistry',
      shortDescription: 'Stoichiometry, molarity, titration & redox calculations',
      color: '#f59e0b',
    },
    {
      chapterTitle: '4th Chapter: Electrochemistry',
      shortDescription: 'Electrolytic conductance, Faraday laws, Nernst equation & cells',
      color: '#a855f7',
    },
    {
      chapterTitle: '5th Chapter: Economic Chemistry',
      shortDescription: 'Industrial chemistry, glass, ceramics, pulp, paper & nanoceramics',
      color: '#ec4899',
    },
  ],
  'Class 11-12 (HSC)::Chemistry::1st Paper': [
    {
      chapterTitle: '1st Chapter: Safe Use of Laboratory',
      shortDescription: 'Apparatus safety, reagent handling & analytical balance',
      color: '#10b981',
    },
    {
      chapterTitle: '2nd Chapter: Qualitative Chemistry',
      shortDescription: 'Atomic models, quantum numbers, spectra & solubility product',
      color: '#38bdf8',
    },
    {
      chapterTitle: '3rd Chapter: Periodic Properties & Chemical Bonding',
      shortDescription: 'Hybridization, VSEPR, Fajan rules & periodic trends',
      color: '#f59e0b',
    },
    {
      chapterTitle: '4th Chapter: Chemical Changes',
      shortDescription: 'Chemical kinetics, equilibrium, Le Chatelier, pH & buffers',
      color: '#a855f7',
    },
    {
      chapterTitle: '5th Chapter: Vocational Chemistry',
      shortDescription: 'Food safety, preservatives, vinegar & household suspension',
      color: '#ec4899',
    },
  ],
  'Class 11-12 (HSC)::Physics::1st Paper': [
    {
      chapterTitle: '1st Chapter: Physical World & Measurement',
      shortDescription: 'Dimensions, significant figures & error analysis',
      color: '#f59e0b',
    },
    {
      chapterTitle: '2nd Chapter: Vector',
      shortDescription: 'Vector calculus, dot/cross products, river-boat & rain problems',
      color: '#38bdf8',
    },
    {
      chapterTitle: '3rd Chapter: Dynamics',
      shortDescription: 'Projectile motion, circular motion & equations of kinematics',
      color: '#10b981',
    },
    {
      chapterTitle: '4th Chapter: Newtonian Mechanics',
      shortDescription: 'Conservation of momentum, moment of inertia & banking of roads',
      color: '#a855f7',
    },
    {
      chapterTitle: '5th Chapter: Work, Energy & Power',
      shortDescription: 'Work-energy theorem, spring potential & efficiency',
      color: '#ec4899',
    },
  ],
  'Class 11-12 (HSC)::Physics::2nd Paper': [
    {
      chapterTitle: '1st Chapter: Thermodynamics',
      shortDescription: 'First & second laws, Carnot cycle & entropy',
      color: '#a855f7',
    },
    {
      chapterTitle: '2nd Chapter: Static Electricity',
      shortDescription: 'Coulomb law, electric field, Gauss law & capacitors',
      color: '#38bdf8',
    },
    {
      chapterTitle: '3rd Chapter: Current Electricity',
      shortDescription: 'Kirchhoff laws, Wheatstone bridge, meter bridge & potentiometer',
      color: '#10b981',
    },
  ],
  'Class 11-12 (HSC)::Higher Math::1st Paper': [
    {
      chapterTitle: '1st Chapter: Matrices & Determinants',
      shortDescription: 'Matrix inversion, system of equations & determinant properties',
      color: '#84cc16',
    },
    {
      chapterTitle: '3rd Chapter: Straight Lines',
      shortDescription: 'Cartesian & polar coordinates, locus, slope & angle bisectors',
      color: '#38bdf8',
    },
    {
      chapterTitle: '9th Chapter: Differentiation',
      shortDescription: 'Limits, continuity, successive derivatives & extrema',
      color: '#f59e0b',
    },
  ],
  'Class 11-12 (HSC)::Higher Math::2nd Paper': [
    {
      chapterTitle: '1st Chapter: Real Numbers & Inequalities',
      shortDescription: 'Absolute value inequalities & order properties',
      color: '#f97316',
    },
    {
      chapterTitle: '3rd Chapter: Complex Numbers',
      shortDescription: 'Argand diagram, modulus-argument, cube roots of unity',
      color: '#38bdf8',
    },
    {
      chapterTitle: '6th Chapter: Conics',
      shortDescription: 'Parabola, ellipse & hyperbola standard forms',
      color: '#a855f7',
    },
  ],
  'Class 11-12 (HSC)::Biology::1st Paper': [
    {
      chapterTitle: '1st Chapter: Cell & Its Structure',
      shortDescription: 'Organelles, plasma membrane, chromosomes & DNA/RNA',
      color: '#ec4899',
    },
    {
      chapterTitle: '2nd Chapter: Cell Division',
      shortDescription: 'Mitosis, meiosis, crossing over & cell cycle checkpoints',
      color: '#10b981',
    },
  ],
  'Class 11-12 (HSC)::Biology::2nd Paper': [
    {
      chapterTitle: '1st Chapter: Animal Diversity & Classification',
      shortDescription: 'Symmetry, coelom, chordate & non-chordate phyla',
      color: '#8b5cf6',
    },
    {
      chapterTitle: '2nd Chapter: Introduction to Animals',
      shortDescription: 'Hydra, grasshopper & Ruho fish anatomy and physiology',
      color: '#38bdf8',
    },
  ],
  'Class 9-10 (SSC)::Chemistry::SSC': [
    {
      chapterTitle: '11th Chapter: Mineral Resources — Fossils',
      shortDescription: 'Hydrocarbons, alkanes, alkenes, alkynes & polymers',
      color: '#10b981',
    },
  ],
  'Class 9-10 (SSC)::Physics::SSC': [
    {
      chapterTitle: '2nd Chapter: Motion',
      shortDescription: 'Equations of motion, acceleration & falling bodies',
      color: '#f59e0b',
    },
  ],
};

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

  // 1. Seed all classes from Class 1 to 8, Class 9-10 (SSC), Class 11-12 (HSC)
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

  // 2. Seed SSC (Class 9-10) core science subjects
  const sscNode = ensureNode(
    rootList,
    'class-9-10-ssc',
    'Class 9-10 (SSC)',
    'class',
    CLASS_COLORS['Class 9-10 (SSC)']
  );
  ensureNode(sscNode.children, 'ssc-chem', 'Chemistry', 'subject', '#10b981');
  ensureNode(sscNode.children, 'ssc-phys', 'Physics', 'subject', '#f59e0b');
  ensureNode(sscNode.children, 'ssc-bio', 'Biology', 'subject', '#a855f7');
  ensureNode(sscNode.children, 'ssc-math', 'Higher Math', 'subject', '#3b82f6');

  // 3. Seed HSC (Class 11-12) subjects & papers
  const hscNode = ensureNode(
    rootList,
    'class-11-12-hsc',
    'Class 11-12 (HSC)',
    'class',
    CLASS_COLORS['Class 11-12 (HSC)']
  );
  const chemNode = ensureNode(
    hscNode.children,
    'class-11-12-chem',
    'Chemistry',
    'subject',
    '#3b82f6'
  );
  ensureNode(
    chemNode.children,
    'class-11-12-chem-1st',
    '1st Paper',
    'paper',
    '#10b981'
  );
  const chem2ndNode = ensureNode(
    chemNode.children,
    'class-11-12-chem-2nd',
    '2nd Paper',
    'paper',
    '#38bdf8'
  );
  ensureNode(
    chem2ndNode.children,
    'class-11-12-chem-2nd-ch2',
    '2nd Chapter: Organic Chemistry',
    'chapter',
    '#f59e0b'
  );

  const physNode = ensureNode(
    hscNode.children,
    'class-11-12-phys',
    'Physics',
    'subject',
    '#ef4444'
  );
  ensureNode(
    physNode.children,
    'class-11-12-phys-1st',
    '1st Paper',
    'paper',
    '#14b8a6'
  );
  ensureNode(
    physNode.children,
    'class-11-12-phys-2nd',
    '2nd Paper',
    'paper',
    '#a855f7'
  );

  const mathNode = ensureNode(
    hscNode.children,
    'class-11-12-math',
    'Higher Math',
    'subject',
    '#84cc16'
  );
  ensureNode(
    mathNode.children,
    'class-11-12-math-1st',
    '1st Paper',
    'paper',
    '#06b6d4'
  );
  ensureNode(
    mathNode.children,
    'class-11-12-math-2nd',
    '2nd Paper',
    'paper',
    '#f97316'
  );

  const bioNode = ensureNode(
    hscNode.children,
    'class-11-12-bio',
    'Biology',
    'subject',
    '#ec4899'
  );
  ensureNode(
    bioNode.children,
    'class-11-12-bio-1st',
    '1st Paper',
    'paper',
    '#ec4899'
  );
  ensureNode(
    bioNode.children,
    'class-11-12-bio-2nd',
    '2nd Paper',
    'paper',
    '#8b5cf6'
  );

  for (const page of pages) {
    const normalizedClass = normalizeClassName(page.className);
    const cNode = ensureNode(
      rootList,
      `class-${normalizedClass}`,
      normalizedClass,
      'class',
      CLASS_COLORS[normalizedClass] || '#f43f5e'
    );
    const sNode = ensureNode(
      cNode.children,
      `subj-${normalizedClass}-${page.subject}`,
      page.subject,
      'subject',
      '#3b82f6'
    );
    const pNode = ensureNode(
      sNode.children,
      `paper-${normalizedClass}-${page.subject}-${page.paper}`,
      page.paper,
      'paper',
      '#38bdf8'
    );
    const chNode = ensureNode(
      pNode.children,
      `chap-${normalizedClass}-${page.subject}-${page.paper}-${page.chapter}`,
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
 * Returns the "Subject Name with Paper" folder cards for the Home Page.
 * If a student has configured their class in their profile (or selected a class filter),
 * only that class's Subject + Paper folders are returned.
 */
export function getSubjectPaperCards(
  pages: LibraryTopicPage[],
  activeClassFilter: string = 'ALL'
): SubjectPaperCard[] {
  const DEFAULT_SUBJECT_PAPERS: Omit<
    SubjectPaperCard,
    'count' | 'pages' | 'chapterCount'
  >[] = [
    {
      id: 'hsc-chemistry-2nd',
      className: 'Class 11-12 (HSC)',
      subject: 'Chemistry',
      paper: '2nd Paper',
      displayName: 'Chemistry 2nd Paper',
      color: '#38bdf8',
    },
    {
      id: 'hsc-chemistry-1st',
      className: 'Class 11-12 (HSC)',
      subject: 'Chemistry',
      paper: '1st Paper',
      displayName: 'Chemistry 1st Paper',
      color: '#10b981',
    },
    {
      id: 'hsc-physics-1st',
      className: 'Class 11-12 (HSC)',
      subject: 'Physics',
      paper: '1st Paper',
      displayName: 'Physics 1st Paper',
      color: '#f59e0b',
    },
    {
      id: 'hsc-physics-2nd',
      className: 'Class 11-12 (HSC)',
      subject: 'Physics',
      paper: '2nd Paper',
      displayName: 'Physics 2nd Paper',
      color: '#a855f7',
    },
    {
      id: 'hsc-math-1st',
      className: 'Class 11-12 (HSC)',
      subject: 'Higher Math',
      paper: '1st Paper',
      displayName: 'Higher Math 1st Paper',
      color: '#84cc16',
    },
    {
      id: 'hsc-math-2nd',
      className: 'Class 11-12 (HSC)',
      subject: 'Higher Math',
      paper: '2nd Paper',
      displayName: 'Higher Math 2nd Paper',
      color: '#f97316',
    },
    {
      id: 'hsc-bio-1st',
      className: 'Class 11-12 (HSC)',
      subject: 'Biology',
      paper: '1st Paper',
      displayName: 'Biology 1st Paper',
      color: '#ec4899',
    },
    {
      id: 'hsc-bio-2nd',
      className: 'Class 11-12 (HSC)',
      subject: 'Biology',
      paper: '2nd Paper',
      displayName: 'Biology 2nd Paper',
      color: '#8b5cf6',
    },
    {
      id: 'ssc-chemistry',
      className: 'Class 9-10 (SSC)',
      subject: 'Chemistry',
      paper: 'SSC',
      displayName: 'Chemistry (SSC)',
      color: '#10b981',
    },
    {
      id: 'ssc-physics',
      className: 'Class 9-10 (SSC)',
      subject: 'Physics',
      paper: 'SSC',
      displayName: 'Physics (SSC)',
      color: '#f59e0b',
    },
  ];

  const cardMap = new Map<string, SubjectPaperCard>();

  for (const preset of DEFAULT_SUBJECT_PAPERS) {
    const key = `${preset.className}::${preset.subject}::${preset.paper}`;
    const presetChapters = CURRICULUM_CHAPTERS[key] || [];
    cardMap.set(key, {
      ...preset,
      chapterCount: presetChapters.length || 1,
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
        page.paper && page.paper !== 'Single Paper'
          ? `${page.subject} ${page.paper}`
          : page.subject;
      card = {
        id: `sp-${normClass}-${page.subject}-${page.paper}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        className: normClass,
        subject: page.subject,
        paper: page.paper,
        displayName,
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
    return allCards.filter(
      (c) => c.className === 'Class 11-12 (HSC)' || c.count > 0
    );
  }

  const normalizedFilter = normalizeClassName(activeClassFilter);
  const filtered = allCards.filter((c) => c.className === normalizedFilter);
  if (filtered.length > 0) {
    return filtered;
  }

  // For Class 1 to Class 8 when selected by student profile or sidebar, return clean English Subject cards
  return [
    {
      id: `${normalizedFilter}-science`,
      className: normalizedFilter,
      subject: 'General Science',
      paper: 'Main Paper',
      displayName: 'General Science',
      color: CLASS_COLORS[normalizedFilter] || '#38bdf8',
      chapterCount: 3,
      count: 0,
      pages: [],
    },
    {
      id: `${normalizedFilter}-math`,
      className: normalizedFilter,
      subject: 'Mathematics',
      paper: 'Main Paper',
      displayName: 'Mathematics',
      color: '#10b981',
      chapterCount: 3,
      count: 0,
      pages: [],
    },
    {
      id: `${normalizedFilter}-ict`,
      className: normalizedFilter,
      subject: 'ICT',
      paper: 'Main Paper',
      displayName: 'ICT',
      color: '#f59e0b',
      chapterCount: 2,
      count: 0,
      pages: [],
    },
  ];
}

/**
 * Returns the Chapters list for a selected Subject + Paper so tapping a Subject
 * opens its Chapters view first, and tapping a Chapter opens the Expanded Chapter Topics view.
 */
export function getChaptersForSubjectPaper(
  pages: LibraryTopicPage[],
  className: string,
  subject: string,
  paper: string
): ChapterItem[] {
  const normClass = normalizeClassName(className);
  const key = `${normClass}::${subject}::${paper}`;
  const seeded = CURRICULUM_CHAPTERS[key] || [
    {
      chapterTitle: '1st Chapter: Introduction & Core Concepts',
      shortDescription: `Core foundational principles of ${subject}`,
      color: '#38bdf8',
    },
    {
      chapterTitle: '2nd Chapter: Advanced Applications',
      shortDescription: `Key formulas, problem solving & structured notes`,
      color: '#10b981',
    },
  ];

  const chapterMap = new Map<string, ChapterItem>();

  seeded.forEach((ch, idx) => {
    chapterMap.set(ch.chapterTitle, {
      id: `ch-${normClass}-${subject}-${paper}-${idx + 1}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      chapterNumber: idx + 1,
      className: normClass,
      subject,
      paper,
      chapterTitle: ch.chapterTitle,
      shortDescription: ch.shortDescription,
      color: ch.color,
      pages: [],
    });
  });

  const matchingPages = pages.filter(
    (p) =>
      normalizeClassName(p.className) === normClass &&
      p.subject === subject &&
      p.paper === paper
  );

  for (const page of matchingPages) {
    let chItem = chapterMap.get(page.chapter);
    if (!chItem) {
      const nextNum = chapterMap.size + 1;
      chItem = {
        id: `ch-${normClass}-${subject}-${paper}-${page.chapter}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        chapterNumber: nextNum,
        className: normClass,
        subject,
        paper,
        chapterTitle: page.chapter,
        shortDescription: page.subtitle || 'Custom Chapter Notes',
        color: page.folderColor || '#38bdf8',
        pages: [],
      };
      chapterMap.set(page.chapter, chItem);
    }
    chItem.pages.push(page);
  }

  return Array.from(chapterMap.values());
}
