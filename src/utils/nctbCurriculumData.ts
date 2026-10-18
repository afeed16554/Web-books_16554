export interface SeedSemiChapterEntry {
  code: string;
  title: string;
  bangla: string;
}

export interface SeedChapterEntry {
  chapterCode: string;
  chapterTitle: string;
  banglaTitle: string;
  shortDescription: string;
  subjectCode: string;
  color: string;
  semiChapters?: SeedSemiChapterEntry[];
}

const PALETTE = [
  '#38bdf8',
  '#10b981',
  '#f59e0b',
  '#a855f7',
  '#ec4899',
  '#84cc16',
  '#f97316',
  '#8b5cf6',
];

export function makeChapters(
  subjectCode: string,
  items: Array<{
    code: string;
    title: string;
    bangla: string;
    desc?: string;
    color?: string;
    semiChapters?: SeedSemiChapterEntry[];
  }>
): SeedChapterEntry[] {
  return items.map((item, idx) => ({
    chapterCode: item.code,
    chapterTitle: item.title,
    banglaTitle: item.bangla,
    shortDescription: item.desc || '',
    subjectCode,
    color: item.color || PALETTE[idx % PALETTE.length],
    semiChapters: item.semiChapters,
  }));
}

/**
 * Complete NCTB Curriculum Catalog across Class 1 to 8, Class 9–10 (SSC), and Class 11–12 (HSC).
 * Bangla and English subjects include structured `semiChapters` (Prose, Poetry, Co-reader, Units, Grammar, Composition)
 * that render as a direct clickable list and open their page directly.
 */
export const CURRICULUM_CHAPTERS: Record<string, SeedChapterEntry[]> = {
  // =========================================================================
  // HSC (CLASS 11–12) — COMPULSORY SUBJECTS
  // =========================================================================
  'Class 11-12 (HSC)::Bangla::1st Paper': makeChapters('101', [
    {
      code: 'গদ্য',
      title: 'Prose (গদ্য)',
      bangla: 'গদ্য (১২টি রচনা)',
      color: '#f97316',
      semiChapters: [
        {
          code: 'গদ্য ০১',
          title: 'Bangalar Nabya Lekhakdiger Prati Nibedan',
          bangla: 'বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন — বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
        },
        {
          code: 'গদ্য ০২',
          title: 'Oporichita',
          bangla: 'অপরিচিতা — রবীন্দ্রনাথ ঠাকুর',
        },
        {
          code: 'গদ্য ০৩',
          title: 'Bilashi',
          bangla: 'বিলাসী — শরৎচন্দ্র চট্টোপাধ্যায়',
        },
        {
          code: 'গদ্য ০৪',
          title: 'Griha',
          bangla: 'গৃহ — রোকেয়া সাখাওয়াত হোসেন',
        },
        {
          code: 'গদ্য ০৫',
          title: 'Ahban',
          bangla: 'আহ্বান — বিভূতিভূষণ বন্দ্যোপাধ্যায়',
        },
        {
          code: 'গদ্য ০৬',
          title: 'Amar Path',
          bangla: 'আমার পথ — কাজী নজরুল ইসলাম',
        },
        {
          code: 'গদ্য ০৭',
          title: 'Manab-Kalyan',
          bangla: 'মানব-কল্যাণ — আবুল ফজল',
        },
        {
          code: 'গদ্য ০৮',
          title: 'Masi-Pisi',
          bangla: 'মাসি-পিসি — মানিক বন্দ্যোপাধ্যায়',
        },
        {
          code: 'গদ্য ০৯',
          title: 'Bayannor Dingulo',
          bangla: 'বায়ান্নর দিনগুলো — শেখ মুজিবুর রহমান',
        },
        {
          code: 'গদ্য ১০',
          title: 'Raincoat',
          bangla: 'রেইনকোট — আখতারুজ্জামান ইলিয়াস',
        },
        {
          code: 'গদ্য ১১',
          title: 'Mahajagatik Curator',
          bangla: 'মহাজাগতিক কিউরেটর — মুহম্মদ জাফর ইকবাল',
        },
        {
          code: 'গদ্য ১২',
          title: 'Necklace',
          bangla: 'নেকলেস — গি দ্য মোপাসাঁ',
        },
      ],
    },
    {
      code: 'পদ্য',
      title: 'Poetry (পদ্য)',
      bangla: 'কবিতা (১২টি কবিতা)',
      color: '#10b981',
      semiChapters: [
        {
          code: 'পদ্য ০১',
          title: 'Bibhishoner Prati Meghnad',
          bangla: 'বিভীষণের প্রতি মেঘনাদ — মাইকেল মধুসূদন দত্ত',
        },
        {
          code: 'পদ্য ০২',
          title: 'Sonar Tori',
          bangla: 'সোনার তরী — রবীন্দ্রনাথ ঠাকুর',
        },
        {
          code: 'পদ্য ০৩',
          title: 'Bidrohi',
          bangla: 'বিদ্রোহী — কাজী নজরুল ইসলাম',
        },
        {
          code: 'পদ্য ০৪',
          title: 'Protidan',
          bangla: 'প্রতিদান — জসীমউদ্‌দীন',
        },
        {
          code: 'পদ্য ০৫',
          title: 'Suchetana',
          bangla: 'সুচেতনা — জীবনানন্দ দাশ',
        },
        {
          code: 'পদ্য ০৬',
          title: 'Taharei Pore Mone',
          bangla: 'তাহারেই পড়ে মনে — সুফিয়া কামাল',
        },
        {
          code: 'পদ্য ০৭',
          title: 'Padma',
          bangla: 'পদ্মা — ফররুখ আহমদ',
        },
        {
          code: 'পদ্য ০৮',
          title: 'Atharo Bochor Boyosh',
          bangla: 'আঠারো বছর বয়স — সুকান্ত ভট্টাচার্য',
        },
        {
          code: 'পদ্য ০৯',
          title: 'February 1969',
          bangla: 'ফেব্রুয়ারি ১৯৬৯ — শামসুর রাহমান',
        },
        {
          code: 'পদ্য ১০',
          title: 'Ami Kingbadantir Kotha Bolchi',
          bangla: 'আমি কিংবদন্তির কথা বলছি — আবু জাফর ওবায়দুল্লাহ',
        },
        {
          code: 'পদ্য ১১',
          title: 'Nuruldiner Kotha Mone Pore Jay',
          bangla: 'নূরলদীনের কথা মনে পড়ে যায় — সৈয়দ শামসুল হক',
        },
        {
          code: 'পদ্য ১২',
          title: 'Chobi',
          bangla: 'ছবি — আবু হেনা মোস্তফা কামাল',
        },
      ],
    },
    {
      code: 'সহপাঠ',
      title: 'Co-reader (সহপাঠ)',
      bangla: 'উপন্যাস ও নাটক',
      color: '#a855f7',
      semiChapters: [
        {
          code: 'উপন্যাস',
          title: 'Novel: Lalsalu',
          bangla: 'লালসালু — সৈয়দ ওয়ালীউল্লাহ',
        },
        {
          code: 'নাটক',
          title: 'Drama: Sirajuddaula',
          bangla: 'সিরাজউদ্দৌলা — সিকান্দার আবু জাফর',
        },
      ],
    },
  ]),

  'Class 11-12 (HSC)::Bangla::2nd Paper': makeChapters('102', [
    {
      code: 'ব্যাকরণ',
      title: 'Grammar (ব্যাকরণ)',
      bangla: 'বাংলা ব্যাকরণ অংশ',
      color: '#f59e0b',
      semiChapters: [
        {
          code: 'অধ্যায় ০১',
          title: 'Bengali Pronunciation Rules',
          bangla: 'বাংলা উচ্চারণের নিয়ম',
        },
        {
          code: 'অধ্যায় ০২',
          title: 'Bengali Spelling Rules',
          bangla: 'বাংলা বানানের নিয়ম',
        },
        {
          code: 'অধ্যায় ০৩',
          title: 'Grammatical Word Classes',
          bangla: 'ব্যাকরণিক শব্দশ্রেণি',
        },
        {
          code: 'অধ্যায় ০৪',
          title: 'Word Formation (Prefix, Suffix & Samas)',
          bangla: 'বাংলা শব্দ গঠন (উপসর্গ, প্রত্যয়, সমাস)',
        },
        {
          code: 'অধ্যায় ০৫',
          title: 'Syntax (Bakyotottwo)',
          bangla: 'বাক্যতত্ত্ব',
        },
        {
          code: 'অধ্যায় ০৬',
          title: 'Misuse and Correct Application of Bengali',
          bangla: 'বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ',
        },
      ],
    },
    {
      code: 'নির্মিতি',
      title: 'Composition (নির্মিতি)',
      bangla: 'নির্মিতি অংশ',
      color: '#10b981',
      semiChapters: [
        {
          code: 'অধ্যায় ০৭',
          title: 'Terminology & Translation',
          bangla: 'পারিভাষিক শব্দ ও অনুবাদ',
        },
        {
          code: 'অধ্যায় ০৮',
          title: 'Diary & Report Writing',
          bangla: 'দিনলিপি ও প্রতিবেদন',
        },
        {
          code: 'অধ্যায় ০৯',
          title: 'E-mail, SMS & Application',
          bangla: 'বৈদ্যুতিক চিঠি (ই-মেইল), খুদেবার্তা ও আবেদনপত্র',
        },
        {
          code: 'অধ্যায় ১০',
          title: 'Summary & Amplification',
          bangla: 'সারাংশ/সারমর্ম ও ভাব-সম্প্রসারণ',
        },
        {
          code: 'অধ্যায় ১১',
          title: 'Dialogue & Short Story',
          bangla: 'সংলাপ ও খুদে গল্প',
        },
        {
          code: 'অধ্যায় ১২',
          title: 'Essay Composition',
          bangla: 'প্রবন্ধ রচনা',
        },
      ],
    },
  ]),

  'Class 11-12 (HSC)::English::1st Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'Reading Units (English for Today)',
      bangla: 'ইংরেজি ১ম পত্র — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        {
          code: 'Unit 01',
          title: 'Unit 1: People or Institutions Making History',
          bangla: 'ইতিহাস নির্মাণকারী মানুষ বা প্রতিষ্ঠান',
        },
        {
          code: 'Unit 02',
          title: 'Unit 2: Education and Life',
          bangla: 'শিক্ষা ও জীবন',
        },
        {
          code: 'Unit 03',
          title: 'Unit 3: Dreams',
          bangla: 'স্বপ্ন',
        },
        {
          code: 'Unit 04',
          title: 'Unit 4: Youthful Achievers',
          bangla: 'তারুণ্যের অর্জন',
        },
        {
          code: 'Unit 05',
          title: 'Unit 5: Relationships',
          bangla: 'সম্পর্ক',
        },
        {
          code: 'Unit 06',
          title: 'Unit 6: Adolescence',
          bangla: 'বয়ঃসন্ধিকাল',
        },
        {
          code: 'Unit 07',
          title: 'Unit 7: Lifestyle',
          bangla: 'জীবনধারা',
        },
        {
          code: 'Unit 08',
          title: 'Unit 8: Human Rights',
          bangla: 'মানবাধিকার',
        },
        {
          code: 'Unit 09',
          title: 'Unit 9: Peace and Conflict',
          bangla: 'শান্তি ও সংঘাত',
        },
        {
          code: 'Unit 10',
          title: 'Unit 10: Environment and Nature',
          bangla: 'পরিবেশ ও প্রকৃতি',
        },
        {
          code: 'Unit 11',
          title: 'Unit 11: Art and Craft',
          bangla: 'শিল্প ও কারুকলা',
        },
        {
          code: 'Unit 12',
          title: 'Unit 12: Myths and Literature',
          bangla: 'মিথ ও সাহিত্য',
        },
      ],
    },
    {
      code: 'Writing',
      title: 'Guided Writing',
      bangla: 'লিখন অংশ',
      color: '#8b5cf6',
      semiChapters: [
        {
          code: 'Writing 01',
          title: 'Paragraph Writing',
          bangla: 'অনুচ্ছেদ রচনা',
        },
        {
          code: 'Writing 02',
          title: 'Completing a Story',
          bangla: 'গল্প সম্পূর্ণকরণ',
        },
        {
          code: 'Writing 03',
          title: 'Informal Letters & E-mails',
          bangla: 'ই-মেইল ও ব্যক্তিগত চিঠি লিখন',
        },
        {
          code: 'Writing 04',
          title: 'Analyzing Maps, Graphs & Charts',
          bangla: 'গ্রাফ ও চার্ট বিশ্লেষণ',
        },
        {
          code: 'Writing 05',
          title: 'Appreciating Short Stories & Poems',
          bangla: 'কবিতা ও গল্পের মূলভাব লিখন',
        },
      ],
    },
  ]),

  'Class 11-12 (HSC)::English::2nd Paper': makeChapters('108', [
    {
      code: 'Part A',
      title: 'Part A: Grammar',
      bangla: 'ব্যাকরণ অংশ (Grammar)',
      color: '#8b5cf6',
      semiChapters: [
        {
          code: 'Grammar 01',
          title: 'Articles',
          bangla: 'আর্টিকেল (Articles)',
        },
        {
          code: 'Grammar 02',
          title: 'Prepositions',
          bangla: 'প্রিপজিশন (Prepositions)',
        },
        {
          code: 'Grammar 03',
          title: 'Special Uses of Words & Phrases',
          bangla: 'বিশেষ ফ্রেজ ও শব্দের ব্যবহার',
        },
        {
          code: 'Grammar 04',
          title: 'Completing Sentences (Clauses & Phrases)',
          bangla: 'ক্লজ ও ফ্রেজ দিয়ে বাক্য সম্পূর্ণকরণ',
        },
        {
          code: 'Grammar 05',
          title: 'Right Form of Verbs',
          bangla: 'ক্রিয়ার সঠিক রূপ',
        },
        {
          code: 'Grammar 06',
          title: 'Transformation of Sentences',
          bangla: 'বাক্য রূপান্তর',
        },
        {
          code: 'Grammar 07',
          title: 'Narration (Direct & Indirect Speech)',
          bangla: 'ন্যারেশন (উক্তি পরিবর্তন)',
        },
        {
          code: 'Grammar 08',
          title: 'Pronoun Reference',
          bangla: 'প্রোনাউন রেফারেন্স',
        },
        {
          code: 'Grammar 09',
          title: 'Modifiers',
          bangla: 'মডিফায়ার্স',
        },
        {
          code: 'Grammar 10',
          title: 'Sentence Connectors',
          bangla: 'সেন্টেন্স কানেক্টর্স',
        },
        {
          code: 'Grammar 11',
          title: 'Synonyms and Antonyms',
          bangla: 'সমার্থক ও বিপরীতার্থক শব্দ',
        },
        {
          code: 'Grammar 12',
          title: 'Punctuation',
          bangla: 'বিরামচিহ্ন',
        },
      ],
    },
    {
      code: 'Part B',
      title: 'Part B: Composition',
      bangla: 'রচনা অংশ (Composition)',
      color: '#ec4899',
      semiChapters: [
        {
          code: 'Comp 01',
          title: 'Formal Letter, Application & E-mail',
          bangla: 'ফরমাল লেটার, অ্যাপ্লিকেশন ও ই-মেইল',
        },
        {
          code: 'Comp 02',
          title: 'Report Writing',
          bangla: 'প্রতিবেদন লিখন',
        },
        {
          code: 'Comp 03',
          title: 'Paragraph Writing',
          bangla: 'অনুচ্ছেদ রচনা',
        },
        {
          code: 'Comp 04',
          title: 'Composition / Essay Writing',
          bangla: 'প্রবন্ধ রচনা',
        },
      ],
    },
  ]),

  'Class 11-12 (HSC)::ICT::HSC': makeChapters('275', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: ICT: World and Bangladesh Perspective',
      bangla: 'তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Communication Systems and Networking',
      bangla: 'কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Number Systems and Digital Devices',
      bangla: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Introduction to Web Design and HTML',
      bangla: 'ওয়েব ডিজাইন পরিচিতি এবং HTML',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Programming Language (C Programming)',
      bangla: 'প্রোগ্রামিং ভাষা (সি প্রোগ্রামিং)',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Database Management System (DBMS)',
      bangla: 'ডেটাবেজ ম্যানেজমেন্ট সিস্টেম',
    },
  ]),

  // =========================================================================
  // HSC (CLASS 11–12) — DIVISIONAL SUBJECTS
  // =========================================================================
  'Class 11-12 (HSC)::Physics::1st Paper': makeChapters('174', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Physical World and Measurement',
      bangla: 'ভৌত জগৎ ও পরিমাপ',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Vector',
      bangla: 'ভেক্টর',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Dynamics (Kinematics)',
      bangla: 'গতিবিদ্যা',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Newtonian Mechanics',
      bangla: 'নিউটনিয়ান বলবিদ্যা',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Work, Energy and Power',
      bangla: 'কাজ, শক্তি ও ক্ষমতা',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Gravitation and Gravity',
      bangla: 'মহাকর্ষ ও অভিকর্ষ',
    },
    {
      code: 'Chapter 07',
      title: 'Chapter 07: Structural Properties of Matter',
      bangla: 'পদার্থের গাঠনিক ধর্ম',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Periodic Motion',
      bangla: 'পর্যাবৃত্ত গতি',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Waves',
      bangla: 'তরঙ্গ',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Ideal Gas and Kinetic Theory of Gases',
      bangla: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব',
    },
  ]),

  'Class 11-12 (HSC)::Physics::2nd Paper': makeChapters('175', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Thermodynamics',
      bangla: 'তাপগতিবিদ্যা',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Electrostatics',
      bangla: 'স্থির তড়িৎ',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Current Electricity',
      bangla: 'চল তড়িৎ',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Magnetic Effect of Electric Current and Magnetism',
      bangla: 'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Electromagnetic Induction and Alternating Current',
      bangla: 'তড়িৎচৌম্বকীয় আবেশ ও দিক পরিবর্তী প্রবাহ',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Geometrical Optics',
      bangla: 'জ্যামিতিক আলোকবিজ্ঞান',
    },
    {
      code: 'Chapter 07',
      title: 'Chapter 07: Physical Optics',
      bangla: 'ভৌত আলোকবিজ্ঞান',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Introduction to Modern Physics',
      bangla: 'আধুনিক পদার্থবিজ্ঞানের সূচনা',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Atomic Model and Nuclear Physics',
      bangla: 'পরমাণুর মডেল এবং নিউক্লিয়ার পদার্থবিজ্ঞান',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Semiconductor and Electronics',
      bangla: 'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স',
    },
    {
      code: 'Chapter 11',
      title: 'Chapter 11: Astronomy',
      bangla: 'জ্যোতির্বিজ্ঞান',
    },
  ]),

  'Class 11-12 (HSC)::Chemistry::1st Paper': makeChapters('176', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Safe Use of Laboratory',
      bangla: 'ল্যাবরেটরির নিরাপদ ব্যবহার',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Qualitative Chemistry',
      bangla: 'গুণগত রসায়ন',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Periodic Properties and Chemical Bonding of Elements',
      bangla: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Chemical Changes',
      bangla: 'রাসায়নিক পরিবর্তন',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Vocational Chemistry',
      bangla: 'কর্মমুখী রসায়ন',
    },
  ]),

  'Class 11-12 (HSC)::Chemistry::2nd Paper': makeChapters('177', [
    {
      code: 'Chapter 01',
      title: '1st Chapter: Environmental Chemistry',
      bangla: 'পরিবেশ রসায়ন',
      color: '#10b981',
    },
    {
      code: 'Chapter 02',
      title: '2nd Chapter: Organic Chemistry',
      bangla: 'জৈব রসায়ন',
      color: '#38bdf8',
    },
    {
      code: 'Chapter 03',
      title: '3rd Chapter: Quantitative Chemistry',
      bangla: 'পরিমাণগত রসায়ন',
      color: '#f59e0b',
    },
    {
      code: 'Chapter 04',
      title: '4th Chapter: Electrochemistry',
      bangla: 'তড়িৎ রসায়ন',
      color: '#a855f7',
    },
    {
      code: 'Chapter 05',
      title: '5th Chapter: Economic Chemistry',
      bangla: 'অর্থনৈতিক রসায়ন',
      color: '#ec4899',
    },
  ]),

  'Class 11-12 (HSC)::Higher Math::1st Paper': makeChapters('265', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Matrices and Determinants',
      bangla: 'ম্যাট্রিক্স ও নির্ণায়ক',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Vectors',
      bangla: 'ভেক্টর',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Straight Lines',
      bangla: 'সরলরেখা',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Circles',
      bangla: 'বৃত্ত',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Permutations and Combinations',
      bangla: 'বিন্যাস ও সমাবেশ',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Trigonometric Ratios',
      bangla: 'ত্রিকোণমিতিক অনুপাত',
    },
    {
      code: 'Chapter 07',
      title: 'Chapter 07: Trigonometric Ratios of Associated Angles',
      bangla: 'সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Functions and Graphs of Functions',
      bangla: 'ফাংশন ও ফাংশনের লেখচিত্র',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Differentiation',
      bangla: 'অন্তরীকরণ',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Integration',
      bangla: 'যোগজীকরণ',
    },
  ]),

  'Class 11-12 (HSC)::Higher Math::2nd Paper': makeChapters('266', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Real Numbers and Inequalities',
      bangla: 'বাস্তব সংখ্যা ও অসমতা',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Linear Programming',
      bangla: 'যোগাশ্রয়ী প্রোগ্রাম',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Complex Numbers',
      bangla: 'জটিল সংখ্যা',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Polynomials and Polynomial Equations',
      bangla: 'বহুপদী ও বহুপদী সমীকরণ',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Binomial Expansion',
      bangla: 'দ্বিপদী বিস্তৃতি',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Conics (Parabola, Ellipse & Hyperbola)',
      bangla: 'কণিক',
    },
    {
      code: 'Chapter 07',
      title:
        'Chapter 07: Inverse Trigonometric Functions and Trigonometric Equations',
      bangla: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Statics',
      bangla: 'স্থিতিবিদ্যা',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Motion of Particles in a Plane',
      bangla: 'সমতলে বস্তুকণার গতি',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Measures of Dispersion and Probability',
      bangla: 'বিস্তার পরিমাপ ও সম্ভাবনা',
    },
  ]),

  'Class 11-12 (HSC)::Biology::1st Paper': makeChapters('178', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Cell and Its Structure',
      bangla: 'কোষ ও এর গঠন',
    },
    {
      code: 'Chapter 02',
      title: 'Chapter 02: Cell Division',
      bangla: 'কোষ বিভাজন',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Cell Chemistry',
      bangla: 'কোষ রসায়ন',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Microorganisms',
      bangla: 'অণুজীব',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Algae and Fungi',
      bangla: 'শৈবাল ও ছত্রাক',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Bryophyta and Pteridophyta',
      bangla: 'ব্রায়োফাইটা ও টেরিডোফাইটা',
    },
    {
      code: 'Chapter 07',
      title: 'Chapter 07: Gymnosperms and Angiosperms',
      bangla: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Tissue and Tissue System',
      bangla: 'টিস্যু ও টিস্যুতন্ত্র',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Plant Physiology',
      bangla: 'উদ্ভিদ শারীরতত্ত্ব',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Plant Reproduction',
      bangla: 'উদ্ভিদ প্রজনন',
    },
    {
      code: 'Chapter 11',
      title: 'Chapter 11: Biotechnology',
      bangla: 'জীবপ্রযুক্তি',
    },
    {
      code: 'Chapter 12',
      title:
        'Chapter 12: Environment, Distribution and Conservation of Organisms',
      bangla: 'জীবের পরিবেশ, বিস্তার ও সংরক্ষণ',
    },
  ]),

  'Class 11-12 (HSC)::Biology::2nd Paper': makeChapters('179', [
    {
      code: 'Chapter 01',
      title: 'Chapter 01: Animal Diversity and Classification',
      bangla: 'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস',
    },
    {
      code: 'Chapter 02',
      title:
        'Chapter 02: Introduction to Animals (Hydra, Grasshopper & Rohu Fish)',
      bangla: 'প্রাণীর পরিচিতি (হাইড্রা, ঘাসফড়িং ও রুই মাছ)',
    },
    {
      code: 'Chapter 03',
      title: 'Chapter 03: Human Physiology: Digestion and Absorption',
      bangla: 'মানব শারীরতত্ত্ব: পরিপাক ও শোষণ',
    },
    {
      code: 'Chapter 04',
      title: 'Chapter 04: Human Physiology: Blood and Circulation',
      bangla: 'মানব শারীরতত্ত্ব: রক্ত ও সঞ্চালন',
    },
    {
      code: 'Chapter 05',
      title: 'Chapter 05: Human Physiology: Breathing and Respiration',
      bangla: 'মানব শারীরতত্ত্ব: শ্বাসক্রিয়া ও শ্বসন',
    },
    {
      code: 'Chapter 06',
      title: 'Chapter 06: Human Physiology: Excretion and Waste',
      bangla: 'মানব শারীরতত্ত্ব: বর্জ্য ও নিষ্কাশন',
    },
    {
      code: 'Chapter 07',
      title: 'Chapter 07: Human Physiology: Locomotion and Movement',
      bangla: 'মানব শারীরতত্ত্ব: চলন ও অঙ্গচালনা',
    },
    {
      code: 'Chapter 08',
      title: 'Chapter 08: Human Physiology: Coordination and Control',
      bangla: 'মানব শারীরতত্ত্ব: সমন্বয় ও নিয়ন্ত্রণ',
    },
    {
      code: 'Chapter 09',
      title: 'Chapter 09: Continuity of Human Life',
      bangla: 'মানব জীবনের ধারাবাহিকতা',
    },
    {
      code: 'Chapter 10',
      title: 'Chapter 10: Defense of Human Body (Immunity)',
      bangla: 'মানবদেহের প্রতিরক্ষা',
    },
    {
      code: 'Chapter 11',
      title: 'Chapter 11: Genetics and Evolution',
      bangla: 'জিনতত্ত্ব ও বিবর্তন',
    },
    {
      code: 'Chapter 12',
      title: 'Chapter 12: Animal Behavior',
      bangla: 'প্রাণীর আচরণ',
    },
  ]),

  // =========================================================================
  // SSC (CLASS 9–10) — COMPULSORY SUBJECTS
  // =========================================================================
  'Class 9-10 (SSC)::Bangla::1st Paper': makeChapters('101', [
    {
      code: 'গদ্য',
      title: 'Prose (গদ্য)',
      bangla: 'গদ্য (১৮টি রচনা)',
      color: '#f97316',
      semiChapters: [
        { code: 'গদ্য ০১', title: 'Pratyupakar', bangla: 'প্রত্যুপকার — ঈশ্বরচন্দ্র বিদ্যাসাগর' },
        { code: 'গদ্য ০২', title: 'Phuler Bibaho', bangla: 'ফুলের বিবাহ — বঙ্কিমচন্দ্র চট্টোপাধ্যায়' },
        { code: 'গদ্য ০৩', title: 'Subha', bangla: 'সুভা — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'গদ্য ০৪', title: 'Boi Pora', bangla: 'বই পড়া — প্রমথ চৌধুরী' },
        { code: 'গদ্য ০৫', title: 'Abhagir Swarga', bangla: 'অভাগীর স্বর্গ — শরৎচন্দ্র চট্টোপাধ্যায়' },
        { code: 'গদ্য ০৬', title: 'Niriho Bangali', bangla: 'নিরীহ বাঙালি — রোকেয়া সাখাওয়াত হোসেন' },
        { code: 'গদ্য ০৭', title: 'Palli Sahitya', bangla: 'পল্লিসাহিত্য — মুহম্মদ শহীদুল্লাহ' },
        { code: 'গদ্য ০৮', title: 'Aam-Antir Bhepu', bangla: 'আম-আঁটির ভেঁপু — বিভূতিভূষণ বন্দ্যোপাধ্যায়' },
        { code: 'গদ্য ০৯', title: 'Manush Muhammad (SM)', bangla: 'মানুষ মুহম্মদ (স.) — মোহাম্মদ ওয়াজেদ আলী' },
        { code: 'গদ্য ১০', title: 'Nimgach', bangla: 'নিমগাছ — বনফুল' },
        { code: 'গদ্য ১১', title: 'Upekshito Shaktir Udbodhon', bangla: 'উপেক্ষিত শক্তির উদ্বোধন — কাজী নজরুল ইসলাম' },
        { code: 'গদ্য ১২', title: 'Shiksha O Manushatwa', bangla: 'শিক্ষা ও মনুষ্যত্ব — মোতাহের হোসেন চৌধুরী' },
        { code: 'গদ্য ১৩', title: 'Probas Bondhu', bangla: 'প্রবাস বন্ধু — সৈয়দ মুজতবা আলী' },
        { code: 'গদ্য ১৪', title: 'Mamtadi', bangla: 'মমতাদি — মানিক বন্দ্যোপাধ্যায়' },
        { code: 'গদ্য ১৫', title: 'Ekattorer Dinguli', bangla: 'একাত্তরের দিনগুলি — জাহানারা ইমাম' },
        { code: 'গদ্য ১৬', title: 'Ekusher Golpo', bangla: 'একুশের গল্প — জহির রায়হান' },
        { code: 'গদ্য ১৭', title: 'Sahityer Roop O Reeti', bangla: 'সাহিত্যের রূপ ও রীতি — হায়াৎ মামুদ' },
        { code: 'গদ্য ১৮', title: 'Amader Notun Gourobgatha', bangla: 'আমাদের নতুন গৌরবগাথা' },
      ],
    },
    {
      code: 'পদ্য',
      title: 'Poetry (পদ্য)',
      bangla: 'কবিতা (২১টি কবিতা)',
      color: '#10b981',
      semiChapters: [
        { code: 'পদ্য ০১', title: 'Bandana', bangla: 'বন্দনা — শাহ মুহম্মদ সগীর' },
        { code: 'পদ্য ০২', title: 'Bangabani', bangla: 'বঙ্গবাণী — আবদুল হাকিম' },
        { code: 'পদ্য ০৩', title: 'Kopotaksho Nad', bangla: 'কপোতাক্ষ নদ — মাইকেল মধুসূদন দত্ত' },
        { code: 'পদ্য ০৪', title: 'Jibon-Sangeet', bangla: 'জীবন-সঙ্গীত — হেমচন্দ্র বন্দ্যোপাধ্যায়' },
        { code: 'পদ্য ০৫', title: 'Pran', bangla: 'প্রাণ — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পদ্য ০৬', title: 'Juta-Abishkar', bangla: 'জুতা-আবিষ্কার — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পদ্য ০৭', title: 'Andhabadhu', bangla: 'অন্ধবধূ — যতীন্দ্রমোহন বাগচী' },
        { code: 'পদ্য ০৮', title: 'Jhornar Gan', bangla: 'ঝর্ণার গান — সত্যেন্দ্রনাথ দত্ত' },
        { code: 'পদ্য ০৯', title: 'Jibon Binimoy', bangla: 'জীবন বিনিময় — গোলাম মোস্তফা' },
        { code: 'পদ্য ১০', title: 'Manush', bangla: 'মানুষ — কাজী নজরুল ইসলাম' },
        { code: 'পদ্য ১১', title: 'Umar Faruq', bangla: 'উমর ফারুক — কাজী নজরুল ইসলাম' },
        { code: 'পদ্য ১২', title: 'Seidin Ei Math', bangla: 'সেইদিন এই মাঠ — জীবনানন্দ দাশ' },
        { code: 'পদ্য ১৩', title: 'Pallijanani', bangla: 'পল্লিজননী — জসীমউদ্‌দীন' },
        { code: 'পদ্য ১৪', title: 'Jabo Ami Tomar Deshe', bangla: 'যাব আমি তোমার দেশে — সুফিয়া কামাল' },
        { code: 'পদ্য ১৫', title: 'Amar Desh', bangla: 'আমার দেশ — আহসান হাবীব' },
        { code: 'পদ্য ১৬', title: 'Asha', bangla: 'আশা — সিকান্দার আবু জাফর' },
        { code: 'পদ্য ১৭', title: 'Brishti', bangla: 'বৃষ্টি — ফররুখ আহমদ' },
        { code: 'পদ্য ১৮', title: 'Ami Kono Agantuk Noi', bangla: 'আমি কোনো আগন্তুক নই — আহসান হাবীব' },
        { code: 'পদ্য ১৯', title: 'Runner', bangla: 'রানার — সুকান্ত ভট্টাচার্য' },
        { code: 'পদ্য ২০', title: 'Tomake Pawar Jonye Hey Swadhinata', bangla: 'তোমাকে পাওয়ার জন্যে, হে স্বাধীনতা — শামসুর রাহমান' },
        { code: 'পদ্য ২১', title: 'Boshekh', bangla: 'বোশেখ — সৈয়দ শামসুল হক' },
      ],
    },
    {
      code: 'সহপাঠ',
      title: 'Co-reader (সহপাঠ)',
      bangla: 'উপন্যাস ও নাটক',
      color: '#a855f7',
      semiChapters: [
        { code: 'উপন্যাস', title: 'Novel: Kaktarua / 1971', bangla: 'উপন্যাস: কাকতাড়ুয়া — সেলিনা হোসেন / ১৯৭১ — হুমায়ূন আহমেদ' },
        { code: 'নাটক', title: 'Drama: Bohipir', bangla: 'নাটক: বহিপীর — সৈয়দ ওয়ালীউল্লাহ' },
      ],
    },
  ]),

  'Class 9-10 (SSC)::Bangla::2nd Paper': makeChapters('102', [
    {
      code: 'ব্যাকরণ',
      title: 'Grammar (ব্যাকরণ)',
      bangla: 'বাংলা ব্যাকরণ অংশ',
      color: '#f59e0b',
      semiChapters: [
        { code: 'পরিচ্ছেদ ০১', title: 'Language and Bengali Grammar', bangla: 'ভাষা ও বাংলা ব্যাকরণ' },
        { code: 'পরিচ্ছেদ ০২', title: 'Phonology (Sounds, Letters & Sandhi)', bangla: 'ধ্বনিতত্ত্ব (ধ্বনি, বর্ণ, সন্ধি)' },
        { code: 'পরিচ্ছেদ ০৩', title: 'Morphology (Prefixes, Suffixes, Samas & Parts of Speech)', bangla: 'রূপতত্ত্ব (উপসর্গ, প্রত্যয়, সমাস, পদ, বিভক্তি)' },
        { code: 'পরিচ্ছেদ ০৪', title: 'Syntax (Sentence, Voice & Narration)', bangla: 'বাক্যতত্ত্ব (বাক্য, বাচ্য, উক্তি)' },
        { code: 'পরিচ্ছেদ ০৫', title: 'Semantics (Idioms, Synonyms & Antonyms)', bangla: 'বাগর্থ (বাগ্ধারা, সমার্থক ও বিপরীতার্থক শব্দ)' },
      ],
    },
    {
      code: 'নির্মিতি',
      title: 'Composition (নির্মিতি)',
      bangla: 'নির্মিতি অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'পরিচ্ছেদ ০৬', title: 'Translation', bangla: 'অনুবাদ' },
        { code: 'পরিচ্ছেদ ০৭', title: 'Paragraph Writing', bangla: 'অনুচ্ছেদ রচনা' },
        { code: 'পরিচ্ছেদ ০৮', title: 'Summary & Substance', bangla: 'সারাংশ ও সারমর্ম' },
        { code: 'পরিচ্ছেদ ০৯', title: 'Amplification (Bhab-Samprasaran)', bangla: 'ভাব-সম্প্রসারণ' },
        { code: 'পরিচ্ছেদ ১০', title: 'Letters & Applications', bangla: 'চিঠিপত্র ও আবেদনপত্র' },
        { code: 'পরিচ্ছেদ ১১', title: 'Report Writing', bangla: 'প্রতিবেদন' },
        { code: 'পরিচ্ছেদ ১২', title: 'Dialogue & Short Story', bangla: 'সংলাপ ও খুদে গল্প' },
        { code: 'পরিচ্ছেদ ১৩', title: 'Essay Composition', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 9-10 (SSC)::English::1st Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'Reading Units (English for Today)',
      bangla: 'ইংরেজি ১ম পত্র — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Sense of Self', bangla: 'আত্মপরিচয়' },
        { code: 'Unit 02', title: 'Unit 2: Climate Change', bangla: 'জলবায়ু পরিবর্তন' },
        { code: 'Unit 03', title: 'Unit 3: Pastimes', bangla: 'অবসর বিনোদন' },
        { code: 'Unit 04', title: 'Unit 4: Events and Festivals', bangla: 'অনুষ্ঠান ও উৎসব' },
        { code: 'Unit 05', title: 'Unit 5: Problems Around Us', bangla: 'আমাদের চারপাশের সমস্যা' },
        { code: 'Unit 06', title: 'Unit 6: Our Neighbours', bangla: 'আমাদের প্রতিবেশী দেশসমূহ' },
        { code: 'Unit 07', title: 'Unit 7: People Who Stand Out', bangla: 'অনন্য ব্যক্তিত্ব' },
        { code: 'Unit 08', title: 'Unit 8: World Heritage', bangla: 'বিশ্ব ঐতিহ্য' },
        { code: 'Unit 09', title: 'Unit 9: Unconventional Jobs', bangla: 'ব্যতিক্রমী পেশা' },
        { code: 'Unit 10', title: 'Unit 10: Dreams', bangla: 'স্বপ্ন' },
        { code: 'Unit 11', title: 'Unit 11: Reading from English Literature', bangla: 'ইংরেজি সাহিত্য পাঠ' },
        { code: 'Unit 12', title: 'Unit 12: Roots', bangla: 'শেকড়' },
        { code: 'Unit 13', title: 'Unit 13: Loneliness', bangla: 'নিঃসঙ্গতা' },
        { code: 'Unit 14', title: 'Unit 14: Renewable Energy', bangla: 'নবায়নযোগ্য শক্তি' },
        { code: 'Unit 15', title: 'Unit 15: Media and Modes of E-communication', bangla: 'গণমাধ্যম ও ই-যোগাযোগ' },
        { code: 'Unit 16', title: 'Unit 16: Graffiti', bangla: 'গ্রাফিতি' },
      ],
    },
  ]),

  'Class 9-10 (SSC)::English::2nd Paper': makeChapters('108', [
    {
      code: 'Part A',
      title: 'Part A: Grammar',
      bangla: 'ব্যাকরণ অংশ (Grammar)',
      color: '#8b5cf6',
      semiChapters: [
        { code: 'Grammar 01', title: 'Gap Filling Activities (With & Without Clues)', bangla: 'শূন্যস্থান পূরণ' },
        { code: 'Grammar 02', title: 'Substitution Table', bangla: 'সাবস্টিটিউশন টেবিল' },
        { code: 'Grammar 03', title: 'Right Forms of Verbs', bangla: 'ক্রিয়ার সঠিক রূপ' },
        { code: 'Grammar 04', title: 'Narrative Style (Direct & Indirect)', bangla: 'ন্যারেশন' },
        { code: 'Grammar 05', title: 'Changing Sentences', bangla: 'বাক্য রূপান্তর' },
        { code: 'Grammar 06', title: 'Completing Sentences', bangla: 'বাক্য সম্পূর্ণকরণ' },
        { code: 'Grammar 07', title: 'Suffixes and Prefixes', bangla: 'উপসর্গ ও প্রত্যয়' },
        { code: 'Grammar 08', title: 'Tag Questions', bangla: 'ট্যাগ কোয়েশ্চন' },
        { code: 'Grammar 09', title: 'Sentence Connectors', bangla: 'সেন্টেন্স কানেক্টর্স' },
        { code: 'Grammar 10', title: 'Punctuation and Capitalization', bangla: 'বিরামচিহ্ন ও বড় হাতের অক্ষর' },
      ],
    },
    {
      code: 'Part B',
      title: 'Part B: Composition',
      bangla: 'রচনা অংশ (Composition)',
      color: '#ec4899',
      semiChapters: [
        { code: 'Comp 01', title: 'Writing CV with Cover Letter', bangla: 'সিভি ও কভার লেটার' },
        { code: 'Comp 02', title: 'Formal Letters & E-mails', bangla: 'ফরমাল লেটার ও ই-মেইল' },
        { code: 'Comp 03', title: 'Paragraph Writing', bangla: 'অনুচ্ছেদ রচনা' },
        { code: 'Comp 04', title: 'Composition Writing', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 9-10 (SSC)::General Math::SSC': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Real Numbers', bangla: 'বাস্তব সংখ্যা' },
    { code: 'Chapter 02', title: 'Chapter 02: Set and Function', bangla: 'সেট ও ফাংশন' },
    { code: 'Chapter 03', title: 'Chapter 03: Algebraic Expressions', bangla: 'বীজগাণিতিক রাশি' },
    { code: 'Chapter 04', title: 'Chapter 04: Exponents and Logarithms', bangla: 'সূচক ও লগারিদম' },
    { code: 'Chapter 05', title: 'Chapter 05: Equations in One Variable', bangla: 'এক চলকবিশিষ্ট সমীকরণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Lines, Angles and Triangles', bangla: 'রেখা, কোণ ও ত্রিভুজ' },
    { code: 'Chapter 07', title: 'Chapter 07: Practical Geometry', bangla: 'ব্যবহারিক জ্যামিতি' },
    { code: 'Chapter 08', title: 'Chapter 08: Circle', bangla: 'বৃত্ত' },
    { code: 'Chapter 09', title: 'Chapter 09: Trigonometric Ratio', bangla: 'ত্রিকোণমিতিক অনুপাত' },
    { code: 'Chapter 10', title: 'Chapter 10: Distance and Elevation', bangla: 'দূরত্ব ও উচ্চতা' },
    { code: 'Chapter 11', title: 'Chapter 11: Algebraic Ratio and Proportion', bangla: 'বীজগাণিতিক অনুপাত ও সমানুপাত' },
    { code: 'Chapter 12', title: 'Chapter 12: Simple Simultaneous Equations in Two Variables', bangla: 'দুই চলকবিশিষ্ট সরল সহসমীকরণ' },
    { code: 'Chapter 13', title: 'Chapter 13: Finite Series', bangla: 'সসীম ধারা' },
    { code: 'Chapter 14', title: 'Chapter 14: Ratio, Similarity and Symmetry', bangla: 'অনুপাত, সদৃশতা ও প্রতিসমতা' },
    { code: 'Chapter 15', title: 'Chapter 15: Area Related Theorems and Constructions', bangla: 'ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও সম্পাদ্য' },
    { code: 'Chapter 16', title: 'Chapter 16: Mensuration', bangla: 'পরিমিতি' },
    { code: 'Chapter 17', title: 'Chapter 17: Statistics', bangla: 'পরিসংখ্যান' },
  ]),

  'Class 9-10 (SSC)::ICT::SSC': makeChapters('154', [
    { code: 'Chapter 01', title: 'Chapter 01: ICT and Our Bangladesh', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তি এবং আমাদের বাংলাদেশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Computer and Computer User Security', bangla: 'কম্পিউটার ও কম্পিউটার ব্যবহারকারীর নিরাপত্তা' },
    { code: 'Chapter 03', title: 'Chapter 03: Internet in My Education', bangla: 'আমার শিক্ষায় ইন্টারনেট' },
    { code: 'Chapter 04', title: 'Chapter 04: My Writing and Accounts', bangla: 'আমার লেখালেখি ও হিসাব' },
    { code: 'Chapter 05', title: 'Chapter 05: Multimedia and Graphics', bangla: 'মাল্টিমিডিয়া ও গ্রাফিক্স' },
    { code: 'Chapter 06', title: 'Chapter 06: Database and Introduction to Programming', bangla: 'ডেটাবেজ ও প্রোগ্রামিং পরিচিতি' },
  ]),

  'Class 9-10 (SSC)::Bangladesh and Global Studies::SSC': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Movements in East Bengal and the Rise of Nationalism (1947–1970)', bangla: 'পূর্ব বাংলার আন্দোলন ও জাতীয়তাবাদের উত্থান (১৯৪৭–১৯৭০)' },
    { code: 'Chapter 02', title: 'Chapter 02: The Independence of Bangladesh', bangla: 'বাংলাদেশের স্বাধীনতা' },
    { code: 'Chapter 03', title: 'Chapter 03: The Solar System and the Earth', bangla: 'সৌরজগৎ ও ভূমণ্ডল' },
    { code: 'Chapter 04', title: 'Chapter 04: Physiography and Climate of Bangladesh', bangla: 'বাংলাদেশের ভূপ্রকৃতি ও জলবায়ু' },
    { code: 'Chapter 05', title: 'Chapter 05: Rivers of Bangladesh and Natural Resources', bangla: 'বাংলাদেশের নদ-নদী ও প্রাকৃতিক সম্পদ' },
    { code: 'Chapter 06', title: 'Chapter 06: The State, Citizenship and Law', bangla: 'রাষ্ট্র, নাগরিকতা ও আইন' },
    { code: 'Chapter 07', title: 'Chapter 07: Organs of Bangladesh Government and Administrative System', bangla: 'বাংলাদেশ সরকারের বিভিন্ন অঙ্গ ও প্রশাসন ব্যবস্থা' },
    { code: 'Chapter 08', title: 'Chapter 08: Democracy and Electoral System in Bangladesh', bangla: 'বাংলাদেশের গণতন্ত্র ও নির্বাচন ব্যবস্থা' },
    { code: 'Chapter 09', title: 'Chapter 09: The United Nations and Bangladesh', bangla: 'জাতিসংঘ ও বাংলাদেশ' },
    { code: 'Chapter 10', title: 'Chapter 10: National Wealth and Economic Systems', bangla: 'জাতীয় সম্পদ ও অর্থনৈতিক ব্যবস্থা' },
    { code: 'Chapter 11', title: 'Chapter 11: Economic Indicators and Nature of Bangladesh Economy', bangla: 'অর্থনৈতিক নির্দেশকসমূহ ও বাংলাদেশের অর্থনীতির প্রকৃতি' },
    { code: 'Chapter 12', title: 'Chapter 12: Government Finance and Banking System of Bangladesh', bangla: 'বাংলাদেশ সরকারের অর্থ ও ব্যাংক ব্যবস্থা' },
    { code: 'Chapter 13', title: 'Chapter 13: Family Structure of Bangladesh and Socialization', bangla: 'বাংলাদেশের পরিবার কাঠামো ও সামাজিকীকরণ' },
    { code: 'Chapter 14', title: 'Chapter 14: Social Change in Bangladesh', bangla: 'বাংলাদেশের সামাজিক পরিবর্তন' },
    { code: 'Chapter 15', title: 'Chapter 15: Social Problems in Bangladesh and Their Remedies', bangla: 'বাংলাদেশের সামাজিক সমস্যা ও প্রতিকার' },
    { code: 'Chapter 16', title: 'Chapter 16: Sustainable Development Goals (SDGs)', bangla: 'টেকসই উন্নয়ন অভিষ্ট (এসডিজি)' },
  ]),

  'Class 9-10 (SSC)::Religion::Islam & Moral Education': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Aqaid and Moral Life', bangla: 'আকাইদ ও নৈতিক জীবন' },
    { code: 'Chapter 02', title: 'Chapter 02: Sources of Shariah', bangla: 'শরিয়তের উৎস' },
    { code: 'Chapter 03', title: 'Chapter 03: Ibadat (Worship)', bangla: 'ইবাদত' },
    { code: 'Chapter 04', title: 'Chapter 04: Akhlaq (Moral Character)', bangla: 'আখলাক' },
    { code: 'Chapter 05', title: 'Chapter 05: Model Lives', bangla: 'আদর্শ জীবন চরিত' },
  ]),

  'Class 9-10 (SSC)::Religion::Hindu Religion & Moral Education': makeChapters('112', [
    { code: 'Chapter 01', title: 'Chapter 01: The Creator and the Creation', bangla: 'স্রষ্টা ও সৃষ্টি' },
    { code: 'Chapter 02', title: 'Chapter 02: Beliefs and Origin of Hindu Religion', bangla: 'হিন্দুধর্মের বিশ্বাস ও উৎপত্তি' },
    { code: 'Chapter 03', title: 'Chapter 03: Religious Practices and Festivals', bangla: 'ধর্মাচার ও ধর্মীয় অনুষ্ঠান' },
    { code: 'Chapter 04', title: 'Chapter 04: Hindu Samskaras (Rites of Passage)', bangla: 'হিন্দুধর্মের সংস্কার' },
    { code: 'Chapter 05', title: 'Chapter 05: Deities and Worship', bangla: 'দেব-দেবী ও পূজা-পার্বণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Yoga Sadhana', bangla: 'যোগসাধনা' },
    { code: 'Chapter 07', title: 'Chapter 07: Moral Teachings in Religious Scriptures', bangla: 'ধর্মগ্রন্থে নৈতিক শিক্ষা' },
    { code: 'Chapter 08', title: 'Chapter 08: Religious Stories and Moral Values', bangla: 'ধর্মীয় উপাখ্যান ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 09', title: 'Chapter 09: Ideal Lives and Paths to Liberation', bangla: 'আদর্শ জীবনচরিত ও মুক্তির পথ' },
  ]),

  'Class 9-10 (SSC)::Religion::Christian Religion & Moral Education': makeChapters('113', [
    { code: 'Chapter 01', title: 'Chapter 01: Search for God', bangla: 'ঈশ্বরের অন্বেষণ' },
    { code: 'Chapter 02', title: 'Chapter 02: God of Creation', bangla: 'সৃষ্টির ঈশ্বর' },
    { code: 'Chapter 03', title: 'Chapter 03: Ancestors of Faith', bangla: 'বিশ্বাসের পিতৃপুরুষগণ' },
    { code: 'Chapter 04', title: 'Chapter 04: Savior Jesus', bangla: 'মুক্তিদাতা যিশু' },
    { code: 'Chapter 05', title: 'Chapter 05: Life and Teachings of Jesus', bangla: 'যিশুর জীবন ও শিক্ষা' },
    { code: 'Chapter 06', title: 'Chapter 06: Guidance of the Holy Spirit', bangla: 'পবিত্র আত্মার পরিচালনা' },
    { code: 'Chapter 07', title: 'Chapter 07: The Christian Church', bangla: 'খ্রিষ্টীয় মণ্ডলী' },
    { code: 'Chapter 08', title: 'Chapter 08: Sacraments and Spiritual Life', bangla: 'ধর্মীয় অনুষ্ঠান ও আধ্যাত্মিক জীবন' },
    { code: 'Chapter 09', title: 'Chapter 09: Ten Commandments and Moral Values', bangla: 'দশ আজ্ঞা ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 10', title: 'Chapter 10: Family and Social Responsibility', bangla: 'পারিবারিক ও সামাজিক দায়িত্ব' },
    { code: 'Chapter 11', title: 'Chapter 11: Service and Charity', bangla: 'সেবা ও দানশীলতা' },
    { code: 'Chapter 12', title: 'Chapter 12: Peace and Justice', bangla: 'শান্তি ও ন্যায়বিচার' },
    { code: 'Chapter 13', title: 'Chapter 13: History of Christianity in Bangladesh', bangla: 'বাংলাদেশে খ্রিষ্টধর্মের ইতিহাস' },
    { code: 'Chapter 14', title: 'Chapter 14: Lives of Saints and Ideal Personalities', bangla: 'সাধু-সন্ত ও আদর্শ ব্যক্তিদের জীবনী' },
    { code: 'Chapter 15', title: 'Chapter 15: Eternal Life and Hope', bangla: 'অনন্ত জীবন ও প্রত্যাশা' },
  ]),

  'Class 9-10 (SSC)::Religion::Buddhist Religion & Moral Education': makeChapters('114', [
    { code: 'Chapter 01', title: 'Chapter 01: Gautama Buddha and Buddhism', bangla: 'গৌতম বুদ্ধ ও বৌদ্ধধর্ম' },
    { code: 'Chapter 02', title: 'Chapter 02: Triratna and Vandana', bangla: 'ত্রিরত্ন ও বন্দনা' },
    { code: 'Chapter 03', title: 'Chapter 03: Sila (Morality) and Precepts', bangla: 'শীল ও নীতিশিক্ষা' },
    { code: 'Chapter 04', title: 'Chapter 04: Introduction to Tripitaka', bangla: 'ত্রিপিটক পরিচিতি' },
    { code: 'Chapter 05', title: 'Chapter 05: Four Noble Truths and Eightfold Path', bangla: 'চতুরার্য সত্য ও আর্য অষ্টাঙ্গিক মার্গ' },
    { code: 'Chapter 06', title: 'Chapter 06: Karma and Rebirth', bangla: 'কর্ম ও পুনর্জন্ম' },
    { code: 'Chapter 07', title: 'Chapter 07: Jataka Tales and Moral Teachings', bangla: 'জাতক ও নৈতিক শিক্ষা' },
    { code: 'Chapter 08', title: 'Chapter 08: Buddhist Festivals and Ceremonies', bangla: 'বৌদ্ধ ধর্মীয় উৎসব ও অনুষ্ঠান' },
    { code: 'Chapter 09', title: 'Chapter 09: Biographies of Buddhist Disciples and Scholars', bangla: 'বৌদ্ধ শ্রাবক ও মনীষীদের জীবনী' },
    { code: 'Chapter 10', title: 'Chapter 10: Buddhist Heritage and Sacred Sites', bangla: 'বৌদ্ধ ঐতিহ্য ও তীর্থস্থান' },
    { code: 'Chapter 11', title: 'Chapter 11: Religion in Social and Family Life', bangla: 'পারিবারিক ও সামাজিক জীবনে ধর্ম' },
  ]),

  // =========================================================================
  // SSC (CLASS 9–10) — DIVISIONAL SUBJECTS
  // =========================================================================
  'Class 9-10 (SSC)::Physics::SSC': makeChapters('136', [
    { code: 'Chapter 01', title: 'Chapter 01: Physical Quantities and Their Measurements', bangla: 'ভৌত রাশি এবং পরিমাপ' },
    { code: 'Chapter 02', title: 'Chapter 02: Motion', bangla: 'গতি' },
    { code: 'Chapter 03', title: 'Chapter 03: Force', bangla: 'বল' },
    { code: 'Chapter 04', title: 'Chapter 04: Work, Power and Energy', bangla: 'কাজ, ক্ষমতা ও শক্তি' },
    { code: 'Chapter 05', title: 'Chapter 05: State of Matter and Pressure', bangla: 'পদার্থের অবস্থা ও চাপ' },
    { code: 'Chapter 06', title: 'Chapter 06: Effect of Heat on Matter', bangla: 'বস্তুর ওপর তাপের প্রভাব' },
    { code: 'Chapter 07', title: 'Chapter 07: Waves and Sound', bangla: 'তরঙ্গ ও শব্দ' },
    { code: 'Chapter 08', title: 'Chapter 08: Reflection of Light', bangla: 'আলোর প্রতিফলন' },
    { code: 'Chapter 09', title: 'Chapter 09: Refraction of Light', bangla: 'আলোর প্রতিসরণ' },
    { code: 'Chapter 10', title: 'Chapter 10: Static Electricity', bangla: 'স্থির বিদ্যুৎ' },
    { code: 'Chapter 11', title: 'Chapter 11: Current Electricity', bangla: 'চল বিদ্যুৎ' },
    { code: 'Chapter 12', title: 'Chapter 12: Magnetic Effects of Current', bangla: 'বিদ্যুতের চৌম্বক ক্রিয়া' },
    { code: 'Chapter 13', title: 'Chapter 13: Modern Physics and Electronics', bangla: 'আধুনিক পদার্থবিজ্ঞান ও ইলেকট্রনিকস' },
    { code: 'Chapter 14', title: 'Chapter 14: Physics to Save Life', bangla: 'জীবন বাঁচাতে পদার্থবিজ্ঞান' },
  ]),

  'Class 9-10 (SSC)::Chemistry::SSC': makeChapters('137', [
    { code: 'Chapter 01', title: 'Chapter 01: Concepts of Chemistry', bangla: 'রসায়নের ধারণা' },
    { code: 'Chapter 02', title: 'Chapter 02: States of Matter', bangla: 'পদার্থের অবস্থা' },
    { code: 'Chapter 03', title: 'Chapter 03: Structure of Matter', bangla: 'পদার্থের গঠন' },
    { code: 'Chapter 04', title: 'Chapter 04: Periodic Table', bangla: 'পর্যায় সারণি' },
    { code: 'Chapter 05', title: 'Chapter 05: Chemical Bond', bangla: 'রাসায়নিক বন্ধন' },
    { code: 'Chapter 06', title: 'Chapter 06: Concept of Mole and Chemical Counting', bangla: 'মোলের ধারণা ও রাসায়নিক গণনা' },
    { code: 'Chapter 07', title: 'Chapter 07: Chemical Reactions', bangla: 'রাসায়নিক বিক্রিয়া' },
    { code: 'Chapter 08', title: 'Chapter 08: Chemistry and Energy', bangla: 'রসায়ন ও শক্তি' },
    { code: 'Chapter 09', title: 'Chapter 09: Acid-Base Balance', bangla: 'এসিড-ক্ষারক সমতা' },
    { code: 'Chapter 10', title: 'Chapter 10: Mineral Resources: Metals and Non-metals', bangla: 'খনিজ সম্পদ: ধাতু-অধাতু' },
    { code: 'Chapter 11', title: 'Chapter 11: Mineral Resources: Fossils', bangla: 'খনিজ সম্পদ: জীবাশ্ম' },
    { code: 'Chapter 12', title: 'Chapter 12: Chemistry in Our Lives', bangla: 'আমাদের জীবনে রসায়ন' },
  ]),

  'Class 9-10 (SSC)::Higher Math::SSC': makeChapters('126', [
    { code: 'Chapter 01', title: 'Chapter 01: Set and Function', bangla: 'সেট ও ফাংশন' },
    { code: 'Chapter 02', title: 'Chapter 02: Algebraic Expression', bangla: 'বীজগাণিতিক রাশি' },
    { code: 'Chapter 03', title: 'Chapter 03: Geometry', bangla: 'জ্যামিতি' },
    { code: 'Chapter 04', title: 'Chapter 04: Geometric Constructions', bangla: 'জ্যামিতিক অঙ্কন' },
    { code: 'Chapter 05', title: 'Chapter 05: Equation', bangla: 'সমীকরণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Inequality', bangla: 'অসমতা' },
    { code: 'Chapter 07', title: 'Chapter 07: Infinite Series', bangla: 'অসীম ধারা' },
    { code: 'Chapter 08', title: 'Chapter 08: Trigonometry', bangla: 'ত্রিকোণমিতি' },
    { code: 'Chapter 09', title: 'Chapter 09: Exponential and Logarithmic Functions', bangla: 'সূচকীয় ও লগারিদমীয় ফাংশন' },
    { code: 'Chapter 10', title: 'Chapter 10: Binomial Expansion', bangla: 'দ্বিপদী বিস্তৃতি' },
    { code: 'Chapter 11', title: 'Chapter 11: Coordinate Geometry', bangla: 'স্থানাঙ্ক জ্যামিতি' },
    { code: 'Chapter 12', title: 'Chapter 12: Planar Vector', bangla: 'সমতলীয় ভেক্টর' },
    { code: 'Chapter 13', title: 'Chapter 13: Solid Geometry', bangla: 'ঘন জ্যামিতি' },
    { code: 'Chapter 14', title: 'Chapter 14: Probability', bangla: 'সম্ভাবনা' },
  ]),

  'Class 9-10 (SSC)::Biology::SSC': makeChapters('138', [
    { code: 'Chapter 01', title: 'Chapter 01: Lessons on Life', bangla: 'জীবন পাঠ' },
    { code: 'Chapter 02', title: 'Chapter 02: Cells and Tissues of Organisms', bangla: 'জীবকোষ ও টিস্যু' },
    { code: 'Chapter 03', title: 'Chapter 03: Cell Division', bangla: 'কোষ বিভাজন' },
    { code: 'Chapter 04', title: 'Chapter 04: Bioenergetics', bangla: 'জীবনীশক্তি' },
    { code: 'Chapter 05', title: 'Chapter 05: Food, Nutrition and Digestion', bangla: 'খাদ্য, পুষ্টি এবং পরিপাক' },
    { code: 'Chapter 06', title: 'Chapter 06: Transport in Organisms', bangla: 'জীবে পরিবহণ' },
    { code: 'Chapter 07', title: 'Chapter 07: Exchange of Gases', bangla: 'গ্যাসীয় বিনিময়' },
    { code: 'Chapter 08', title: 'Chapter 08: Excretory System', bangla: 'রেচন প্রক্রিয়া' },
    { code: 'Chapter 09', title: 'Chapter 09: Firmness and Locomotion', bangla: 'দৃঢ়তা প্রদান ও চলন' },
    { code: 'Chapter 10', title: 'Chapter 10: Co-ordination', bangla: 'সমন্বয়' },
    { code: 'Chapter 11', title: 'Chapter 11: Reproduction in Organisms', bangla: 'জীবের প্রজনন' },
    { code: 'Chapter 12', title: 'Chapter 12: Heredity in Organisms and Biological Evolution', bangla: 'জীবের বংশগতি ও জৈব অভিব্যক্তি' },
    { code: 'Chapter 13', title: 'Chapter 13: Environment of Life', bangla: 'জীবের পরিবেশ' },
    { code: 'Chapter 14', title: 'Chapter 14: Biotechnology', bangla: 'জীবপ্রযুক্তি' },
  ]),

  // =========================================================================
  // CLASS 8 (JSC) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 8::Bangla::1st Paper': makeChapters('101', [
    {
      code: 'গদ্য',
      title: 'Prose (গদ্য — সাহিত্য কণিকা)',
      bangla: 'সাহিত্য কণিকা — গদ্য অংশ',
      color: '#f97316',
      semiChapters: [
        { code: 'গদ্য ০১', title: 'Atithir Smriti', bangla: 'অতিথির স্মৃতি — শরৎচন্দ্র চট্টোপাধ্যায়' },
        { code: 'গদ্য ০২', title: 'Bhab O Kaja', bangla: 'ভাব ও কাজ — কাজী নজরুল ইসলাম' },
        { code: 'গদ্য ০৩', title: 'Pore Pawa', bangla: 'পড়ে পাওয়া — বিভূতিভূষণ বন্দ্যোপাধ্যায়' },
        { code: 'গদ্য ০৪', title: 'Tailachitra Bhoot', bangla: 'তৈলচিত্রের ভূত — মানিক বন্দ্যোপাধ্যায়' },
        { code: 'গদ্য ০৫', title: 'Ebarer Sangram Swadhinatar Sangram', bangla: 'এবারের সংগ্রাম স্বাধীনতার সংগ্রাম' },
        { code: 'গদ্য ০৬', title: 'Amader Lokashilpa', bangla: 'আমাদের লোকশিল্প — কামরুল হাসান' },
        { code: 'গদ্য ০৭', title: 'Sukhi Manush (Natika)', bangla: 'সুখী মানুষ — মমতাজউদ্‌দীন আহমদ' },
        { code: 'গদ্য ০৮', title: 'Mongrar Pathe', bangla: 'মংলার পথে — বিপ্রদাশ বড়ুয়া' },
        { code: 'গদ্য ০৯', title: 'Bangla Nababarsha', bangla: 'বাংলা নববর্ষ — শামসুজ্জামান খান' },
        { code: 'গদ্য ১০', title: 'Shilpakalar Nana Dik', bangla: 'শিল্পকলার নানা দিক — মুস্তাফা মনোয়ার' },
      ],
    },
    {
      code: 'পদ্য',
      title: 'Poetry (পদ্য — সাহিত্য কণিকা)',
      bangla: 'সাহিত্য কণিকা — কবিতা অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'পদ্য ০১', title: 'Manabdharmo', bangla: 'মানবধর্ম — লালন শাহ্' },
        { code: 'পদ্য ০২', title: 'Banga Bhumir Prati', bangla: 'বঙ্গভূমির প্রতি — মাইকেল মধুসূদন দত্ত' },
        { code: 'পদ্য ০৩', title: 'Dui Bigha Jomi', bangla: 'দুই বিঘা জমি — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পদ্য ০৪', title: 'Pache Loke Kichu Bole', bangla: 'পাছে লোকে কিছু বলে — কামিনী রায়' },
        { code: 'পদ্য ০৫', title: 'Nari', bangla: 'নারী — কাজী নজরুল ইসলাম' },
        { code: 'পদ্য ০৬', title: 'Abar Asibo Phire', bangla: 'আবার আসিব ফিরে — জীবনানন্দ দাশ' },
        { code: 'পদ্য ০৭', title: 'Rupai', bangla: 'রুপাই — জসীমউদ্‌দীন' },
        { code: 'পদ্য ০৮', title: 'Nadi', bangla: 'নদী — বুদ্ধদেব বসু' },
        { code: 'পদ্য ০৯', title: 'Prarthona', bangla: 'প্রার্থনা — কায়কোবাদ' },
        { code: 'পদ্য ১০', title: 'Ekushere Gan', bangla: 'একুশের গান — আবদুল গাফ্‌ফার চৌধুরী' },
      ],
    },
  ]),

  'Class 8::Bangla::2nd Paper': makeChapters('102', [
    {
      code: 'ব্যাকরণ',
      title: 'Grammar (বাংলা ব্যাকরণ)',
      bangla: 'বাংলা ব্যাকরণ অংশ',
      color: '#f59e0b',
      semiChapters: [
        { code: 'অধ্যায় ০১', title: 'Language and Bengali Language', bangla: 'ভাষা ও বাংলা ভাষা' },
        { code: 'অধ্যায় ০২', title: 'Sounds and Letters (Dhwani O Barna)', bangla: 'ধ্বনি ও বর্ণ' },
        { code: 'অধ্যায় ০৩', title: 'Sandhi (Euphonic Combination)', bangla: 'সন্ধি' },
        { code: 'অধ্যায় ০৪', title: 'Words and Parts of Speech (Shabda O Pad)', bangla: 'শব্দ ও পদ' },
        { code: 'অধ্যায় ০৫', title: 'Verbs and Tenses (Dhatu O Kal)', bangla: 'ধাতু ও ক্রিয়ার কাল' },
        { code: 'অধ্যায় ০৬', title: 'Sentence Structure and Punctuation', bangla: 'বাক্য ও বিরামচিহ্ন' },
        { code: 'অধ্যায় ০৭', title: 'Idioms, Synonyms and Antonyms', bangla: 'বাগ্ধারা, সমার্থক ও বিপরীতার্থক শব্দ' },
      ],
    },
    {
      code: 'নির্মিতি',
      title: 'Composition (নির্মিতি)',
      bangla: 'নির্মিতি অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'নির্মিতি ০১', title: 'Summary & Substance', bangla: 'সারাংশ ও সারমর্ম' },
        { code: 'নির্মিতি ০২', title: 'Amplification (Bhab-Samprasaran)', bangla: 'ভাব-সম্প্রসারণ' },
        { code: 'নির্মিতি ০৩', title: 'Paragraph Writing', bangla: 'অনুচ্ছেদ রচনা' },
        { code: 'নির্মিতি ০৪', title: 'Letters & Applications', bangla: 'পত্র ও আবেদনপত্র রচনা' },
        { code: 'নির্মিতি ০৫', title: 'Essay Composition', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 8::English::1st Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'Reading Units (English for Today)',
      bangla: 'ইংরেজি ১ম পত্র — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: A Glimpse of Our Culture', bangla: 'আমাদের সংস্কৃতির এক ঝলক' },
        { code: 'Unit 02', title: 'Unit 2: Food and Nutrition', bangla: 'খাদ্য ও পুষ্টি' },
        { code: 'Unit 03', title: 'Unit 3: Health and Hygiene', bangla: 'স্বাস্থ্য ও স্বাস্থ্যবিধি' },
        { code: 'Unit 04', title: 'Unit 4: Check Your Reference (Dictionary Skills)', bangla: 'অভিধান ও রেফারেন্স ব্যবহার' },
        { code: 'Unit 05', title: 'Unit 5: Bangabandhu and Bangladesh', bangla: 'ইতিহাস ও বাংলাদেশ' },
        { code: 'Unit 06', title: 'Unit 6: Going on a Foreign Trip', bangla: 'বিদেশ ভ্রমণ' },
        { code: 'Unit 07', title: 'Unit 7: Different People, Different Occupations', bangla: 'ভিন্ন মানুষ, ভিন্ন পেশা' },
        { code: 'Unit 08', title: 'Unit 8: News! News! News!', bangla: 'সংবাদ ও গণমাধ্যম' },
        { code: 'Unit 09', title: 'Unit 9: Things that Have Changed Our Life', bangla: 'যেসব আবিষ্কার আমাদের জীবন বদলে দিয়েছে' },
        { code: 'Unit 10', title: 'Unit 10: Climate Change and Nature', bangla: 'জলবায়ু পরিবর্তন ও প্রকৃতি' },
      ],
    },
  ]),

  'Class 8::English::2nd Paper': makeChapters('108', [
    {
      code: 'Part A',
      title: 'Part A: Grammar',
      bangla: 'ব্যাকরণ অংশ (Grammar)',
      color: '#8b5cf6',
      semiChapters: [
        { code: 'Grammar 01', title: 'Parts of Speech & Articles', bangla: 'পার্টস অব স্পিচ ও আর্টিকেল' },
        { code: 'Grammar 02', title: 'Prepositions & Gap Filling', bangla: 'প্রিপজিশন ও শূন্যস্থান পূরণ' },
        { code: 'Grammar 03', title: 'Substitution Table & Right Form of Verbs', bangla: 'সাবস্টিটিউশন টেবিল ও ক্রিয়ার সঠিক রূপ' },
        { code: 'Grammar 04', title: 'Changing Sentences (Voice, Degree, Affirmative/Negative)', bangla: 'বাক্য রূপান্তর' },
        { code: 'Grammar 05', title: 'Narration (Passage Narration)', bangla: 'ন্যারেশন' },
        { code: 'Grammar 06', title: 'Suffixes, Prefixes & Punctuation', bangla: 'উপসর্গ, প্রত্যয় ও বিরামচিহ্ন' },
      ],
    },
    {
      code: 'Part B',
      title: 'Part B: Composition',
      bangla: 'রচনা অংশ (Composition)',
      color: '#ec4899',
      semiChapters: [
        { code: 'Comp 01', title: 'Formal Letters & E-mails', bangla: 'ফরমাল লেটার ও ই-মেইল' },
        { code: 'Comp 02', title: 'Dialogue Writing', bangla: 'সংলাপ লিখন' },
        { code: 'Comp 03', title: 'Paragraph Writing', bangla: 'অনুচ্ছেদ রচনা' },
        { code: 'Comp 04', title: 'Short Composition', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 8::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Patterns', bangla: 'প্যাটার্ন' },
    { code: 'Chapter 02', title: 'Chapter 02: Profit (Simple & Compound)', bangla: 'মুনাফা' },
    { code: 'Chapter 03', title: 'Chapter 03: Measurement', bangla: 'পরিমাপ' },
    { code: 'Chapter 04', title: 'Chapter 04: Algebraic Formulae and Applications', bangla: 'বীজগণিতীয় সূত্রাবলি ও প্রয়োগ' },
    { code: 'Chapter 05', title: 'Chapter 05: Algebraic Fractions', bangla: 'বীজগণিতীয় ভগ্নাংশ' },
    { code: 'Chapter 06', title: 'Chapter 06: Simple Simultaneous Equations', bangla: 'সরল সহসমীকরণ' },
    { code: 'Chapter 07', title: 'Chapter 07: Set', bangla: 'সেট' },
    { code: 'Chapter 08', title: 'Chapter 08: Quadrilaterals', bangla: 'চতুর্ভুজ' },
    { code: 'Chapter 09', title: 'Chapter 09: Pythagoras Theorem', bangla: 'পিথাগোরাসের উপপাদ্য' },
    { code: 'Chapter 10', title: 'Chapter 10: Circle', bangla: 'বৃত্ত' },
    { code: 'Chapter 11', title: 'Chapter 11: Information and Data (Statistics)', bangla: 'তথ্য ও উপাত্ত' },
  ]),

  'Class 8::ICT::Main Paper': makeChapters('154', [
    { code: 'Chapter 01', title: 'Chapter 01: Importance of ICT', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তির গুরুত্ব' },
    { code: 'Chapter 02', title: 'Chapter 02: Computer Network', bangla: 'কম্পিউটার নেটওয়ার্ক' },
    { code: 'Chapter 03', title: 'Chapter 03: Safe and Ethical Use of ICT', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তির নিরাপদ ও নৈতিক ব্যবহার' },
    { code: 'Chapter 04', title: 'Chapter 04: Use of Spreadsheet', bangla: 'স্প্রেডশিটের ব্যবহার' },
    { code: 'Chapter 05', title: 'Chapter 05: Use of Internet in Education and Daily Life', bangla: 'শিক্ষা ও দৈনন্দিন জীবনে ইন্টারনেটের ব্যবহার' },
  ]),

  'Class 8::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Colonial Age and Liberation Struggle of Bengal', bangla: 'ঔপনিবেশিক যুগ ও বাংলার স্বাধীনতা সংগ্রাম' },
    { code: 'Chapter 02', title: 'Chapter 02: The Liberation War of Bangladesh', bangla: 'বাংলাদেশের মুক্তিযুদ্ধ' },
    { code: 'Chapter 03', title: 'Chapter 03: Cultural Change and Development of Bangladesh', bangla: 'বাংলাদেশের সাংস্কৃতিক পরিবর্তন ও উন্নয়ন' },
    { code: 'Chapter 04', title: 'Chapter 04: Colonial Age Archaeological Heritage in Bangladesh', bangla: 'ঔপনিবেশিক যুগের প্রত্নতাত্ত্বিক ঐতিহ্য' },
    { code: 'Chapter 05', title: 'Chapter 05: Socialization and Development', bangla: 'সামাজিকীকরণ ও উন্নয়ন' },
    { code: 'Chapter 06', title: 'Chapter 06: Economy of Bangladesh', bangla: 'বাংলাদেশের অর্থনীতি' },
    { code: 'Chapter 07', title: 'Chapter 07: State and Government System of Bangladesh', bangla: 'বাংলাদেশ রাষ্ট্র ও সরকার ব্যবস্থা' },
    { code: 'Chapter 08', title: 'Chapter 08: Disasters in Bangladesh', bangla: 'বাংলাদেশের দুর্যোগ' },
    { code: 'Chapter 09', title: 'Chapter 09: Population and Development of Bangladesh', bangla: 'বাংলাদেশের জনসংখ্যা ও উন্নয়ন' },
    { code: 'Chapter 10', title: 'Chapter 10: Social Problems of Bangladesh', bangla: 'বাংলাদেশের সামাজিক সমস্যা' },
    { code: 'Chapter 11', title: 'Chapter 11: Minority Ethnic Groups of Bangladesh', bangla: 'বাংলাদেশের ক্ষুদ্র নৃ-গোষ্ঠী' },
    { code: 'Chapter 12', title: 'Chapter 12: Natural Resources of Bangladesh', bangla: 'বাংলাদেশের প্রাকৃতিক সম্পদ' },
    { code: 'Chapter 13', title: 'Chapter 13: Bangladesh and Various Regional & International Organizations', bangla: 'বাংলাদেশ এবং বিভিন্ন আঞ্চলিক ও আন্তর্জাতিক সহযোগী সংস্থা' },
    { code: 'Chapter 14', title: 'Chapter 14: Sustainable Development Goals (SDG)', bangla: 'টেকসই উন্নয়ন অভিষ্ট (এসডিজি)' },
  ]),

  'Class 8::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Aqaid / Fundamental Beliefs', bangla: 'আকাইদ ও মৌলিক বিশ্বাস' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat / Religious Worship', bangla: 'ইবাদত ও ধর্মাচার' },
    { code: 'Chapter 03', title: 'Chapter 03: Quran, Hadith & Sacred Scriptures', bangla: 'কুরআন ও হাদিস শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 04', title: 'Chapter 04: Akhlaq (Moral Values)', bangla: 'আখলাক ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 05', title: 'Chapter 05: Model Lives', bangla: 'আদর্শ জীবনচরিত' },
  ]),

  'Class 8::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Classification of Animal Kingdom', bangla: 'প্রাণিজগতের শ্রেণিবিন্যাস' },
    { code: 'Chapter 02', title: 'Chapter 02: Growth and Heredity of Living Organisms', bangla: 'জীবের বৃদ্ধি ও বংশগতি' },
    { code: 'Chapter 03', title: 'Chapter 03: Diffusion, Osmosis and Absorption', bangla: 'ব্যাপন, অভিস্রবণ ও প্রস্বেদন' },
    { code: 'Chapter 04', title: 'Chapter 04: Reproduction in Plants', bangla: 'উদ্ভিদের বংশবৃদ্ধি' },
    { code: 'Chapter 05', title: 'Chapter 05: Coordination and Secretion', bangla: 'সমন্বয় ও নিঃসরণ' },
    { code: 'Chapter 06', title: 'Chapter 06: The Structure of Atoms', bangla: 'পরমাণুর গঠন' },
    { code: 'Chapter 07', title: 'Chapter 07: The Earth and Gravitation', bangla: 'পৃথিবী ও মহাকর্ষ' },
    { code: 'Chapter 08', title: 'Chapter 08: Chemical Reaction', bangla: 'রাসায়নিক বিক্রিয়া' },
    { code: 'Chapter 09', title: 'Chapter 09: Electric Circuits and Current Electricity', bangla: 'বর্তনী ও চলবিদ্যুৎ' },
    { code: 'Chapter 10', title: 'Chapter 10: Acid, Base and Salt', bangla: 'অম্ল, ক্ষারক ও লবণ' },
    { code: 'Chapter 11', title: 'Chapter 11: Light', bangla: 'আলো' },
    { code: 'Chapter 12', title: 'Chapter 12: Outer Space and Satellites', bangla: 'মহাকাশ ও উপগ্রহ' },
    { code: 'Chapter 13', title: 'Chapter 13: Food and Nutrition', bangla: 'খাদ্য ও পুষ্টি' },
    { code: 'Chapter 14', title: 'Chapter 14: Environment and Ecosystem', bangla: 'পরিবেশ এবং বাস্তুতন্ত্র' },
  ]),

  // =========================================================================
  // CLASS 7 — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 7::Bangla::1st Paper': makeChapters('101', [
    {
      code: 'গদ্য',
      title: 'Prose (গদ্য — সপ্তবর্ণা)',
      bangla: 'সপ্তবর্ণা — গদ্য অংশ',
      color: '#f97316',
      semiChapters: [
        { code: 'গদ্য ০১', title: 'Kabuliwala', bangla: 'কাবুলিওয়ালা — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'গদ্য ০২', title: 'Lohar Juta', bangla: 'লখার একুশে — আবুবকর সিদ্দিক' },
        { code: 'গদ্য ০৩', title: 'Marubhaskar', bangla: 'মরু-ভাস্কর — হবীবুল্লাহ্ বাহার' },
        { code: 'গদ্য ০৪', title: 'Shabdo Theke Kobita', bangla: 'শব্দ থেকে কবিতা — হুমায়ুন আজাদ' },
        { code: 'গদ্য ০৫', title: 'Pakhi', bangla: 'পাখি — লীলা মজুমদার' },
        { code: 'গদ্য ০৬', title: 'Pitrivumi O Swadesh', bangla: 'পিতৃপুরুষের গল্প — হারুন হাবীব' },
        { code: 'গদ্য ০৭', title: 'Chobir Rong', bangla: 'ছবির রং — হাশেম খান' },
        { code: 'গদ্য ০৮', title: 'Sei Cheleti', bangla: 'সেই ছেলেটি — মামুনুর রশীদ' },
        { code: 'গদ্য ০৯', title: 'Bahu Jatir Desh Bangladesh', bangla: 'বহু জাতিসত্তার দেশ বাংলাদেশ — একে শেরাম' },
      ],
    },
    {
      code: 'পদ্য',
      title: 'Poetry (পদ্য — সপ্তবর্ণা)',
      bangla: 'সপ্তবর্ণা — কবিতা অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'পদ্য ০১', title: 'Notun Desh', bangla: 'নতুন দেশ — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পদ্য ০২', title: 'Kuli-Mojur', bangla: 'কুলি-মজুর — কাজী নজরুল ইসলাম' },
        { code: 'পদ্য ০৩', title: 'Amar Bari', bangla: 'আমার বাড়ি — জসীমউদ্‌দীন' },
        { code: 'পদ্য ০৪', title: 'Srabon', bangla: 'শ্রাবণে — সুকুমার রায়' },
        { code: 'পদ্য ০৫', title: 'Gorobini Ma Janani', bangla: 'গরবিনী মা-জননী — সিকান্দার আবু জাফর' },
        { code: 'পদ্য ০৬', title: 'Sammobadi', bangla: 'সাম্য — সুফিয়া কামাল' },
        { code: 'পদ্য ০৭', title: 'Mela', bangla: 'মেলা — আহসান হাবীব' },
        { code: 'পদ্য ০৮', title: 'Ei Akhorei', bangla: 'এই অক্ষরে — মহাদেব সাহা' },
        { code: 'পদ্য ০৯', title: 'Sithi', bangla: 'সিঁথি — রফিক আজাদ' },
      ],
    },
  ]),

  'Class 7::Bangla::2nd Paper': makeChapters('102', [
    {
      code: 'ব্যাকরণ',
      title: 'Grammar (বাংলা ব্যাকরণ)',
      bangla: 'বাংলা ব্যাকরণ অংশ',
      color: '#f59e0b',
      semiChapters: [
        { code: 'অধ্যায় ০১', title: 'Language and Bengali Grammar', bangla: 'ভাষা ও বাংলা ব্যাকরণ' },
        { code: 'অধ্যায় ০২', title: 'Phonology and Sandhi', bangla: 'ধ্বনিতত্ত্ব ও সন্ধি' },
        { code: 'অধ্যায় ০৩', title: 'Morphology (Gender, Number, Prefix & Suffix)', bangla: 'রূপতত্ত্ব (লিঙ্গ, বচন, উপসর্গ, প্রত্যয়)' },
        { code: 'অধ্যায় ০৪', title: 'Case and Inflection (Karok O Bibhokti)', bangla: 'কারক ও বিভক্তি' },
        { code: 'অধ্যায় ০৫', title: 'Syntax and Vocabulary', bangla: 'বাক্যতত্ত্ব ও শব্দার্থ' },
      ],
    },
    {
      code: 'নির্মিতি',
      title: 'Composition (নির্মিতি)',
      bangla: 'নির্মিতি অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'নির্মিতি ০১', title: 'Summary & Substance', bangla: 'সারাংশ ও সারমর্ম' },
        { code: 'নির্মিতি ০২', title: 'Amplification', bangla: 'ভাব-সম্প্রসারণ' },
        { code: 'নির্মিতি ০৩', title: 'Paragraph Writing', bangla: 'অনুচ্ছেদ রচনা' },
        { code: 'নির্মিতি ০৪', title: 'Letters & Applications', bangla: 'পত্র ও আবেদনপত্র রচনা' },
        { code: 'নির্মিতি ০৫', title: 'Essay Composition', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 7::English::1st Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'Reading Units (English for Today)',
      bangla: 'ইংরেজি ১ম পত্র — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Attention, Please', bangla: 'মনোযোগ দিন' },
        { code: 'Unit 02', title: 'Unit 2: My Study Guide (Dictionary Skills)', bangla: 'অভিধান ব্যবহার' },
        { code: 'Unit 03', title: 'Unit 3: What Are Friends For?', bangla: 'বন্ধুত্ব' },
        { code: 'Unit 04', title: 'Unit 4: People Who Make a Difference', bangla: 'যাঁরা পরিবর্তন আনেন' },
        { code: 'Unit 05', title: 'Unit 5: Great Women to Remember', bangla: 'স্মরণীয় মহীয়সী নারী' },
        { code: 'Unit 06', title: 'Unit 6: Leisure', bangla: 'অবসর' },
        { code: 'Unit 07', title: 'Unit 7: Games and Sports', bangla: 'খেলাধুলা' },
        { code: 'Unit 08', title: 'Unit 8: Likes and Dislikes', bangla: 'পছন্দ ও অপছন্দ' },
        { code: 'Unit 09', title: 'Unit 9: Climate Change', bangla: 'জলবায়ু পরিবর্তন' },
      ],
    },
  ]),

  'Class 7::English::2nd Paper': makeChapters('108', [
    {
      code: 'Part A',
      title: 'Part A: Grammar',
      bangla: 'ব্যাকরণ অংশ (Grammar)',
      color: '#8b5cf6',
      semiChapters: [
        { code: 'Grammar 01', title: 'Parts of Speech (Nouns, Pronouns, Adjectives, Verbs)', bangla: 'পার্টস অব স্পিচ' },
        { code: 'Grammar 02', title: 'Articles & Prepositions', bangla: 'আর্টিকেল ও প্রিপজিশন' },
        { code: 'Grammar 03', title: 'Tense & Right Form of Verbs', bangla: 'টেন্স ও ক্রিয়ার সঠিক রূপ' },
        { code: 'Grammar 04', title: 'Changing Sentences (Voice, Degree, Affirmative/Negative)', bangla: 'বাক্য রূপান্তর' },
        { code: 'Grammar 05', title: 'Punctuation & Capitalization', bangla: 'বিরামচিহ্ন ও বড় হাতের অক্ষর' },
      ],
    },
    {
      code: 'Part B',
      title: 'Part B: Composition',
      bangla: 'রচনা অংশ (Composition)',
      color: '#ec4899',
      semiChapters: [
        { code: 'Comp 01', title: 'Formal & Informal Letters / E-mails', bangla: 'চিঠি, আবেদনপত্র ও ই-মেইল' },
        { code: 'Comp 02', title: 'Paragraph & Short Composition', bangla: 'অনুচ্ছেদ ও প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 7::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Rational and Irrational Numbers', bangla: 'মূলদ ও অমূলদ সংখ্যা' },
    { code: 'Chapter 02', title: 'Chapter 02: Proportion and Profit-Loss', bangla: 'সমানুপাত ও লাভ-ক্ষতি' },
    { code: 'Chapter 03', title: 'Chapter 03: Measurement', bangla: 'পরিমাপ' },
    { code: 'Chapter 04', title: 'Chapter 04: Multiplication and Division of Algebraic Expressions', bangla: 'বীজগণিতীয় রাশির গুণ ও ভাগ' },
    { code: 'Chapter 05', title: 'Chapter 05: Algebraic Formulae and Applications', bangla: 'বীজগণিতীয় সূত্রাবলি ও প্রয়োগ' },
    { code: 'Chapter 06', title: 'Chapter 06: Algebraic Fractions', bangla: 'বীজগণিতীয় ভগ্নাংশ' },
    { code: 'Chapter 07', title: 'Chapter 07: Simple Equations', bangla: 'সরল সমীকরণ' },
    { code: 'Chapter 08', title: 'Chapter 08: Parallel Straight Lines', bangla: 'সমান্তরাল সরলরেখা' },
    { code: 'Chapter 09', title: 'Chapter 09: Triangles', bangla: 'ত্রিভুজ' },
    { code: 'Chapter 10', title: 'Chapter 10: Congruence and Similarity', bangla: 'সর্বসমতা ও সদৃশতা' },
    { code: 'Chapter 11', title: 'Chapter 11: Information and Data', bangla: 'তথ্য ও উপাত্ত' },
  ]),

  'Class 7::ICT::Main Paper': makeChapters('154', [
    { code: 'Chapter 01', title: 'Chapter 01: ICT in Daily Life', bangla: 'প্রাত্যহিক জীবনে তথ্য ও যোগাযোগ প্রযুক্তি' },
    { code: 'Chapter 02', title: 'Chapter 02: Computer Related Devices', bangla: 'কম্পিউটার সংশ্লিষ্ট যন্ত্রপাতি' },
    { code: 'Chapter 03', title: 'Chapter 03: Safe and Ethical Use of ICT', bangla: 'নিরাপদ ও নৈতিক ব্যবহার' },
    { code: 'Chapter 04', title: 'Chapter 04: Word Processing', bangla: 'ওয়ার্ড প্রসেসিং' },
    { code: 'Chapter 05', title: 'Chapter 05: Use of Internet in Education', bangla: 'শিক্ষায় ইন্টারনেটের ব্যবহার' },
  ]),

  'Class 7::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Liberation Struggle of Bangladesh', bangla: 'বাংলাদেশের মুক্তিসংগ্রাম' },
    { code: 'Chapter 02', title: 'Chapter 02: Culture and Cultural Diversity of Bangladesh', bangla: 'বাংলাদেশের সংস্কৃতি ও সাংস্কৃতিক বৈচিত্র্য' },
    { code: 'Chapter 03', title: 'Chapter 03: Role of Family in the Development of a Child', bangla: 'পরিবারে শিশুর বেড়ে ওঠা' },
    { code: 'Chapter 04', title: 'Chapter 04: Economy of Bangladesh', bangla: 'বাংলাদেশের অর্থনীতি' },
    { code: 'Chapter 05', title: 'Chapter 05: Bangladesh and Citizens of Bangladesh', bangla: 'বাংলাদেশ ও বাংলাদেশের নাগরিক' },
    { code: 'Chapter 06', title: 'Chapter 06: Election System of Bangladesh', bangla: 'বাংলাদেশের নির্বাচন ব্যবস্থা' },
    { code: 'Chapter 07', title: 'Chapter 07: Climate of Bangladesh', bangla: 'বাংলাদেশের জলবায়ু' },
    { code: 'Chapter 08', title: 'Chapter 08: Introduction to Population of Bangladesh', bangla: 'বাংলাদেশের জনসংখ্যা পরিচিতি' },
    { code: 'Chapter 09', title: 'Chapter 09: Rights of Senior Citizens and Women in Bangladesh', bangla: 'বাংলাদেশের প্রবীণ ব্যক্তি ও নারীর অধিকার' },
    { code: 'Chapter 10', title: 'Chapter 10: Social Problems of Bangladesh', bangla: 'বাংলাদেশের সামাজিক সমস্যা' },
    { code: 'Chapter 11', title: 'Chapter 11: Some Countries in Asia', bangla: 'এশিয়ার কয়েকটি দেশ' },
    { code: 'Chapter 12', title: 'Chapter 12: Bangladesh and International Cooperation', bangla: 'বাংলাদেশ ও আন্তর্জাতিক সহযোগিতা' },
    { code: 'Chapter 13', title: 'Chapter 13: Sustainable Development Goals (SDG)', bangla: 'টেকসই উন্নয়ন অভিষ্ট (এসডিজি)' },
  ]),

  'Class 7::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Aqaid / Fundamental Beliefs', bangla: 'আকাইদ ও মৌলিক বিশ্বাস' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat / Religious Worship', bangla: 'ইবাদত ও ধর্মাচার' },
    { code: 'Chapter 03', title: 'Chapter 03: Quran, Hadith & Sacred Scriptures', bangla: 'কুরআন ও হাদিস শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 04', title: 'Chapter 04: Akhlaq (Moral Values)', bangla: 'আখলাক ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 05', title: 'Chapter 05: Model Lives', bangla: 'আদর্শ জীবনচরিত' },
  ]),

  'Class 7::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Lower Organisms', bangla: 'নিম্নশ্রেণির জীব' },
    { code: 'Chapter 02', title: 'Chapter 02: Cellular Organization of Plants and Animals', bangla: 'উদ্ভিদ ও প্রাণীর কোষীয় সংগঠন' },
    { code: 'Chapter 03', title: 'Chapter 03: External Morphology of Plants', bangla: 'উদ্ভিদের বাহ্যিক বৈশিষ্ট্য' },
    { code: 'Chapter 04', title: 'Chapter 04: Respiration', bangla: 'শ্বসন' },
    { code: 'Chapter 05', title: 'Chapter 05: Digestive System and Blood Circulation System', bangla: 'পরিপাকতন্ত্র এবং রক্ত সংবহনতন্ত্র' },
    { code: 'Chapter 06', title: 'Chapter 06: Structure of Matter', bangla: 'পদার্থের গঠন' },
    { code: 'Chapter 07', title: 'Chapter 07: The Use of Energy', bangla: 'শক্তির ব্যবহার' },
    { code: 'Chapter 08', title: 'Chapter 08: About Sound', bangla: 'শব্দের কথা' },
    { code: 'Chapter 09', title: 'Chapter 09: Heat and Temperature', bangla: 'তাপ ও তাপমাত্রা' },
    { code: 'Chapter 10', title: 'Chapter 10: Phenomena of Electricity and Magnet', bangla: 'বিদ্যুৎ ও চুম্বকের ঘটনা' },
    { code: 'Chapter 11', title: 'Chapter 11: Change in Surrounding and Various Incidents', bangla: 'পারিপার্শ্বিক পরিবর্তন ও বিভিন্ন ঘটনা' },
    { code: 'Chapter 12', title: 'Chapter 12: The Solar System and Our Earth', bangla: 'সৌরজগৎ ও আমাদের পৃথিবী' },
    { code: 'Chapter 13', title: 'Chapter 13: Environment and Pollution', bangla: 'প্রাকৃতিক পরিবেশ এবং দূষণ' },
    { code: 'Chapter 14', title: 'Chapter 14: Change of Climate', bangla: 'জলবায়ু পরিবর্তন' },
  ]),

  // =========================================================================
  // CLASS 6 — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 6::Bangla::1st Paper': makeChapters('101', [
    {
      code: 'গদ্য',
      title: 'Prose (গদ্য — চারুপাঠ)',
      bangla: 'চারুপাঠ — গদ্য অংশ',
      color: '#f97316',
      semiChapters: [
        { code: 'গদ্য ০১', title: 'Satotar Puraskar', bangla: 'সততার পুরস্কার — মুহম্মদ শহীদুল্লাহ্' },
        { code: 'গদ্য ০২', title: 'Minu', bangla: 'মিনু — বনফুল' },
        { code: 'গদ্য ০৩', title: 'Nilnad Ar Pyramider Desh', bangla: 'নীলনদ আর পিরামিডের দেশ — সৈয়দ মুজতবা আলী' },
        { code: 'গদ্য ০৪', title: 'Amar Dekha Naya Chin', bangla: 'অমর একুশে — রফিকুল ইসলাম' },
        { code: 'গদ্য ০৫', title: 'Akash', bangla: 'আকাশ — আবদুল্লাহ আল-মুতী' },
        { code: 'গদ্য ০৬', title: 'Mother Teresa', bangla: 'মাদার তেরেসা — সনজীদা খাতুন' },
        { code: 'গদ্য ০৭', title: 'Koto Dike Koto Karigar', bangla: 'কত দিকে কত কারিগর — সৈয়দ শামসুল হক' },
        { code: 'গদ্য ০৮', title: 'Toltolar Gopon Kotha', bangla: 'তোলপাড় — শওকত ওসমান' },
      ],
    },
    {
      code: 'পদ্য',
      title: 'Poetry (পদ্য — চারুপাঠ)',
      bangla: 'চারুপাঠ — কবিতা অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'পদ্য ০১', title: 'Jonmobhumi', bangla: 'জন্মভূমি — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পদ্য ০২', title: 'Sukh', bangla: 'সুখ — কামিনী রায়' },
        { code: 'পদ্য ০৩', title: 'Manush Jati', bangla: 'মানুষ জাতি — সত্যেন্দ্রনাথ দত্ত' },
        { code: 'পদ্য ০৪', title: 'Jhinge Phul', bangla: 'ঝিঙে ফুল — কাজী নজরুল ইসলাম' },
        { code: 'পদ্য ০৫', title: 'Asmani', bangla: 'আসমানী — জসীমউদ্‌দীন' },
        { code: 'পদ্য ০৬', title: 'Mujib', bangla: 'বাঁচতে দাও — শামসুর রাহমান' },
        { code: 'পদ্য ০৭', title: 'Pakhir Kache Phuler Kache', bangla: 'পাখির কাছে ফুলের কাছে — আল মাহমুদ' },
        { code: 'পদ্য ০৮', title: 'Phagun Mas', bangla: 'ফাগুন মাস — হুমায়ুন আজাদ' },
      ],
    },
  ]),

  'Class 6::Bangla::2nd Paper': makeChapters('102', [
    {
      code: 'ব্যাকরণ',
      title: 'Grammar (বাংলা ব্যাকরণ)',
      bangla: 'বাংলা ব্যাকরণ অংশ',
      color: '#f59e0b',
      semiChapters: [
        { code: 'অধ্যায় ০১', title: 'Language and Bengali Language', bangla: 'ভাষা ও বাংলা ভাষা' },
        { code: 'অধ্যায় ০২', title: 'Phonology (Dhwani O Barna)', bangla: 'ধ্বনিতত্ত্ব' },
        { code: 'অধ্যায় ০৩', title: 'Morphology (Parts of Speech, Gender & Number)', bangla: 'রূপতত্ত্ব (পদ, লিঙ্গ, বচন)' },
        { code: 'অধ্যায় ০৪', title: 'Sandhi (Euphonic Combination)', bangla: 'সন্ধি' },
        { code: 'অধ্যায় ০৫', title: 'Sentence Structure and Vocabulary', bangla: 'বাক্যতত্ত্ব ও শব্দার্থ' },
      ],
    },
    {
      code: 'নির্মিতি',
      title: 'Composition (নির্মিতি)',
      bangla: 'নির্মিতি অংশ',
      color: '#10b981',
      semiChapters: [
        { code: 'নির্মিতি ০১', title: 'Summary & Substance', bangla: 'সারাংশ ও সারমর্ম' },
        { code: 'নির্মিতি ০২', title: 'Amplification', bangla: 'ভাব-সম্প্রসারণ' },
        { code: 'নির্মিতি ০৩', title: 'Paragraph & Letters', bangla: 'অনুচ্ছেদ ও পত্র রচনা' },
        { code: 'নির্মিতি ০৪', title: 'Essay Composition', bangla: 'প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 6::English::1st Paper': makeChapters('107', [
    {
      code: 'Lessons',
      title: 'Reading Lessons (English for Today)',
      bangla: 'ইংরেজি ১ম পত্র — লেসনসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Lesson 01', title: 'Lesson 1: Going to a New School', bangla: 'নতুন বিদ্যালয়ে যাত্রা' },
        { code: 'Lesson 02', title: 'Lesson 2: Congratulations! Well Done!', bangla: 'অভিনন্দন!' },
        { code: 'Lesson 03', title: 'Lesson 3: At a Railway Station', bangla: 'রেলস্টেশনে' },
        { code: 'Lesson 04', title: 'Lesson 4: Where Are You From?', bangla: 'তুমি কোথা থেকে এসেছ?' },
        { code: 'Lesson 05', title: 'Lesson 5: Thanks for Your Work', bangla: 'তোমার কাজের জন্য ধন্যবাদ' },
        { code: 'Lesson 06', title: 'Lesson 6: It Smells Good!', bangla: 'সুস্বাদু খাবার' },
        { code: 'Lesson 07', title: 'Lesson 7: Holding Hands', bangla: 'হাতে হাত রাখা' },
        { code: 'Lesson 08', title: 'Lesson 8: Grocery Shopping', bangla: 'কেনাকাটা' },
        { code: 'Lesson 09', title: 'Lesson 9: Health is Wealth', bangla: 'স্বাস্থ্যই সম্পদ' },
        { code: 'Lesson 10', title: 'Lesson 10: Remedies: Modern and Traditional', bangla: 'আধুনিক ও ঐতিহ্যবাহী চিকিৎসা' },
        { code: 'Lesson 11', title: 'Lesson 11: Are You Listening?', bangla: 'মনোযোগ দিয়ে শোনা' },
        { code: 'Lesson 12', title: 'Lesson 12: Birds of Bangladesh', bangla: 'বাংলাদেশের পাখি' },
        { code: 'Lesson 13', title: 'Lesson 13: An Unseen Beauty of Bangladesh', bangla: 'বাংলাদেশের অপরূপ সৌন্দর্য' },
        { code: 'Lesson 14', title: 'Lesson 14: Our Pride', bangla: 'আমাদের গর্ব' },
        { code: 'Lesson 15', title: 'Lesson 15: The Lion’s Mane', bangla: 'সিংহের কেশর' },
      ],
    },
  ]),

  'Class 6::English::2nd Paper': makeChapters('108', [
    {
      code: 'Part A',
      title: 'Part A: Grammar',
      bangla: 'ব্যাকরণ অংশ (Grammar)',
      color: '#8b5cf6',
      semiChapters: [
        { code: 'Grammar 01', title: 'Parts of Speech', bangla: 'পার্টস অব স্পিচ' },
        { code: 'Grammar 02', title: 'Articles (A, An, The)', bangla: 'আর্টিকেল' },
        { code: 'Grammar 03', title: 'Prepositions', bangla: 'প্রিপজিশন' },
        { code: 'Grammar 04', title: 'Tense and Right Form of Verbs', bangla: 'টেন্স ও ক্রিয়ার সঠিক রূপ' },
        { code: 'Grammar 05', title: 'Kinds of Sentences & Transformation', bangla: 'বাক্যের প্রকারভেদ ও রূপান্তর' },
        { code: 'Grammar 06', title: 'Punctuation and Capitalization', bangla: 'বিরামচিহ্ন ও বড় হাতের অক্ষর' },
      ],
    },
    {
      code: 'Part B',
      title: 'Part B: Composition',
      bangla: 'রচনা অংশ (Composition)',
      color: '#ec4899',
      semiChapters: [
        { code: 'Comp 01', title: 'Formal & Informal Letters / E-mails', bangla: 'চিঠি, আবেদনপত্র ও ই-মেইল' },
        { code: 'Comp 02', title: 'Paragraph & Short Composition', bangla: 'অনুচ্ছেদ ও প্রবন্ধ রচনা' },
      ],
    },
  ]),

  'Class 6::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Natural Numbers and Fractions', bangla: 'স্বাভাবিক সংখ্যা ও ভগ্নাংশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Ratio and Percentage', bangla: 'অনুপাত ও শতকরা' },
    { code: 'Chapter 03', title: 'Chapter 03: Integers', bangla: 'পূর্ণসংখ্যা' },
    { code: 'Chapter 04', title: 'Chapter 04: Algebraic Expressions', bangla: 'বীজগণিতীয় রাশি' },
    { code: 'Chapter 05', title: 'Chapter 05: Simple Equations', bangla: 'সরল সমীকরণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Basic Concepts of Geometry', bangla: 'জ্যামিতির মৌলিক ধারণা' },
    { code: 'Chapter 07', title: 'Chapter 07: Practical Geometry', bangla: 'ব্যবহারিক জ্যামিতি' },
    { code: 'Chapter 08', title: 'Chapter 08: Information and Data', bangla: 'তথ্য ও উপাত্ত' },
  ]),

  'Class 6::ICT::Main Paper': makeChapters('154', [
    { code: 'Chapter 01', title: 'Chapter 01: Introducing Information and Communication Technology', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তি পরিচিতি' },
    { code: 'Chapter 02', title: 'Chapter 02: Instruments Related to ICT', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তি সংশ্লিষ্ট যন্ত্রপাতি' },
    { code: 'Chapter 03', title: 'Chapter 03: Safe Use of ICT', bangla: 'তথ্য ও যোগাযোগ প্রযুক্তির নিরাপদ ব্যবহার' },
    { code: 'Chapter 04', title: 'Chapter 04: Word Processing', bangla: 'ওয়ার্ড প্রসেসিং' },
    { code: 'Chapter 05', title: 'Chapter 05: Introducing Internet', bangla: 'ইন্টারনেট পরিচিতি' },
  ]),

  'Class 6::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: History of Bangladesh', bangla: 'বাংলাদেশের ইতিহাস' },
    { code: 'Chapter 02', title: 'Chapter 02: Bangladesh and World Civilization', bangla: 'বাংলাদেশ ও বিশ্বসভ্যতা' },
    { code: 'Chapter 03', title: 'Chapter 03: Bangladesh in the Global Geographical Environment', bangla: 'বিশ্ব-ভৌগোলিক পরিমণ্ডলে বাংলাদেশ' },
    { code: 'Chapter 04', title: 'Chapter 04: Introduction to Population of Bangladesh', bangla: 'বাংলাদেশের জনসংখ্যা পরিচিতি' },
    { code: 'Chapter 05', title: 'Chapter 05: Society of Bangladesh', bangla: 'বাংলাদেশের সমাজ' },
    { code: 'Chapter 06', title: 'Chapter 06: Culture of Bangladesh', bangla: 'বাংলাদেশের সংস্কৃতি' },
    { code: 'Chapter 07', title: 'Chapter 07: Economy of Bangladesh', bangla: 'বাংলাদেশের অর্থনীতি' },
    { code: 'Chapter 08', title: 'Chapter 08: Bangladesh and Its Citizens', bangla: 'বাংলাদেশ ও বাংলাদেশের নাগরিক' },
    { code: 'Chapter 09', title: 'Chapter 09: Environment of Bangladesh', bangla: 'বাংলাদেশের পরিবেশ' },
    { code: 'Chapter 10', title: 'Chapter 10: Rights of Children in Bangladesh', bangla: 'বাংলাদেশে শিশুর অধিকার' },
    { code: 'Chapter 11', title: 'Chapter 11: Growing Up and Obstacles of Children in Bangladesh', bangla: 'বাংলাদেশের শিশুর বেড়ে ওঠা ও প্রতিবন্ধকতা' },
    { code: 'Chapter 12', title: 'Chapter 12: Bangladesh and Regional Cooperation', bangla: 'বাংলাদেশ ও আঞ্চলিক সহযোগিতা' },
    { code: 'Chapter 13', title: 'Chapter 13: Sustainable Development Goals (SDG)', bangla: 'টেকসই উন্নয়ন অভিষ্ট (এসডিজি)' },
  ]),

  'Class 6::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Aqaid / Fundamental Beliefs', bangla: 'আকাইদ ও মৌলিক বিশ্বাস' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat / Religious Worship', bangla: 'ইবাদত ও ধর্মাচার' },
    { code: 'Chapter 03', title: 'Chapter 03: Quran, Hadith & Sacred Scriptures', bangla: 'কুরআন ও হাদিস শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 04', title: 'Chapter 04: Akhlaq (Moral Values)', bangla: 'আখলাক ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 05', title: 'Chapter 05: Model Lives', bangla: 'আদর্শ জীবনচরিত' },
  ]),

  'Class 6::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Scientific Process and Measurement', bangla: 'বৈজ্ঞানিক প্রক্রিয়া ও পরিমাপ' },
    { code: 'Chapter 02', title: 'Chapter 02: The Living World', bangla: 'জীবজগৎ' },
    { code: 'Chapter 03', title: 'Chapter 03: Cellular Organization of Plants and Animals', bangla: 'উদ্ভিদ ও প্রাণীর কোষীয় সংগঠন' },
    { code: 'Chapter 04', title: 'Chapter 04: External Characteristics of Plants', bangla: 'উদ্ভিদের বাহ্যিক বৈশিষ্ট্য' },
    { code: 'Chapter 05', title: 'Chapter 05: Photosynthesis', bangla: 'সালোকসংশ্লেষণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Sensory Organs', bangla: 'সংবেদী অঙ্গ' },
    { code: 'Chapter 07', title: 'Chapter 07: Properties of Matter and External Effects', bangla: 'পদার্থের বৈশিষ্ট্য এবং বাহ্যিক প্রভাব' },
    { code: 'Chapter 08', title: 'Chapter 08: Mixture', bangla: 'মিশ্রণ' },
    { code: 'Chapter 09', title: 'Chapter 09: Phenomenon of Light', bangla: 'আলোর ঘটনা' },
    { code: 'Chapter 10', title: 'Chapter 10: Motion', bangla: 'গতি' },
    { code: 'Chapter 11', title: 'Chapter 11: Force and Simple Machines', bangla: 'বল এবং সরল যন্ত্র' },
    { code: 'Chapter 12', title: 'Chapter 12: Origin and Formation of the Earth', bangla: 'পৃথিবীর উৎপত্তি ও গঠন' },
    { code: 'Chapter 13', title: 'Chapter 13: Food and Nutrition', bangla: 'খাদ্য ও পুষ্টি' },
    { code: 'Chapter 14', title: 'Chapter 14: Environmental Balance and Our Life', bangla: 'পরিবেশের ভারসাম্য এবং আমাদের জীবন' },
  ]),

  // =========================================================================
  // CLASS 5 (PRIMARY) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 5::Bangla::Main Paper': makeChapters('101', [
    {
      code: 'গদ্য ও পদ্য',
      title: 'Amar Bangla Boi (আমার বাংলা বই)',
      bangla: 'গদ্য ও কবিতা পাঠসমূহ',
      color: '#f97316',
      semiChapters: [
        { code: 'পাঠ ০১', title: 'Ei Desh Ei Manush', bangla: 'এই দেশ এই মানুষ' },
        { code: 'পাঠ ০২', title: 'Sankalpa (Poem)', bangla: 'সংকল্প — কাজী নজরুল ইসলাম' },
        { code: 'পাঠ ০৩', title: 'Sundarbaner Prani', bangla: 'সুন্দরবনের প্রাণী' },
        { code: 'পাঠ ০৪', title: 'Haatir Ar Shiyaler Golpo', bangla: 'হাতি আর শেয়ালের গল্প' },
        { code: 'পাঠ ০৫', title: 'Football Kheloyar (Poem)', bangla: 'ফুটবল খেলোয়াড় — জসীমউদ্‌দীন' },
        { code: 'পাঠ ০৬', title: 'Birer Rokte Swadhin Ei Desh', bangla: 'বীরের রক্তে স্বাধীন এ দেশ' },
        { code: 'পাঠ ০৭', title: 'Februarir Gan (Poem)', bangla: 'ফেব্রুয়ারির গান — লুৎফর রহমান রিটন' },
        { code: 'পাঠ ০৮', title: 'Shokher Mritsilpa', bangla: 'শখের মৃৎশিল্প' },
        { code: 'পাঠ ০৯', title: 'Shabdo Dushon (Poem)', bangla: 'শব্দদূষণ — সুকুমার বড়ুয়া' },
        { code: 'পাঠ ১০', title: 'Smaraniya Jara Chiradin', bangla: 'স্মরণীয় যাঁরা চিরদিন' },
        { code: 'পাঠ ১১', title: 'Swadesh (Poem)', bangla: 'স্বদেশ — আহসান হাবীব' },
        { code: 'পাঠ ১২', title: 'Kanchanmala Ar Kankonmala', bangla: 'কাঞ্চনমালা আর কাঁকনমালা' },
        { code: 'পাঠ ১৩', title: 'Obak Jolpan', bangla: 'অবাক জলপান — সুকুমার রায়' },
        { code: 'পাঠ ১৪', title: 'Ghasphul (Poem)', bangla: 'ঘাসফুল — জ্যোতিরিন্দ্র মৈত্র' },
        { code: 'পাঠ ১৫', title: 'Matir Niche Je Shohor', bangla: 'মাটির নিচে যে শহর' },
        { code: 'পাঠ ১৬', title: 'Shikshagurur Morjada (Poem)', bangla: 'শিক্ষাগুরুর মর্যাদা — কাজী কাদের নেওয়াজ' },
        { code: 'পাঠ ১৭', title: 'Bhabuk Cheleti', bangla: 'ভাবুক ছেলেটি (জগদীশচন্দ্র বসু)' },
        { code: 'পাঠ ১৮', title: 'Dui Tire (Poem)', bangla: 'দুই তীরে — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পাঠ ১৯', title: 'Biday Hajj', bangla: 'বিদায় হজ' },
        { code: 'পাঠ ২০', title: 'Roudra Lekhe Joy (Poem)', bangla: 'রৌদ্র লেখে জয় — শামসুর রাহমান' },
      ],
    },
  ]),

  'Class 5::English::Main Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'English for Today (Units)',
      bangla: 'ইংলিশ ফর টুডে — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Hello! / At the Library', bangla: 'পরিচয় ও সংলাপ' },
        { code: 'Unit 02', title: 'Unit 2: See You! / Sound Practice', bangla: 'বিদায় সম্ভাষণ ও উচ্চারণ' },
        { code: 'Unit 03', title: 'Unit 3: Saikat’s Family', bangla: 'সৈকতের পরিবার' },
        { code: 'Unit 04', title: 'Unit 4: Leisure Time', bangla: 'অবসর সময়' },
        { code: 'Unit 05', title: 'Unit 5: Days in a Calendar', bangla: 'ক্যালেন্ডারের দিনসমূহ' },
        { code: 'Unit 06', title: 'Unit 6: Eat Healthy', bangla: 'স্বাস্থ্যকর খাবার' },
        { code: 'Unit 07', title: 'Unit 7: Be Healthy', bangla: 'সুস্থ থাকা' },
        { code: 'Unit 08', title: 'Unit 8: Write to Me Soon!', bangla: 'চিঠি লেখা' },
        { code: 'Unit 09', title: 'Unit 9: Occupations', bangla: 'পেশাসমূহ' },
        { code: 'Unit 10', title: 'Unit 10: My Home District', bangla: 'আমার নিজ জেলা' },
        { code: 'Unit 11', title: 'Unit 11: Where’s the Library?', bangla: 'গ্রন্থাগারটি কোথায়?' },
        { code: 'Unit 12', title: 'Unit 12: How Far Is Saint Martin’s?', bangla: 'সেন্ট মার্টিন কত দূরে?' },
        { code: 'Unit 13', title: 'Unit 13: Telling the Time', bangla: 'সময় বলা' },
        { code: 'Unit 14', title: 'Unit 14: Story: The Hare and the Tortoise', bangla: 'খরগোশ ও কচ্ছপের গল্প' },
        { code: 'Unit 15', title: 'Unit 15: Happy Birthday', bangla: 'শুভ জন্মদিন' },
        { code: 'Unit 16', title: 'Unit 16: May I Come In?', bangla: 'অনুমতি ও অনুরোধ' },
        { code: 'Unit 17', title: 'Unit 17: Sport', bangla: 'খেলাধুলা' },
        { code: 'Unit 18', title: 'Unit 18: City and Country (Poem)', bangla: 'শহর ও গ্রাম' },
        { code: 'Unit 19', title: 'Unit 19: The Liberation War Museum', bangla: 'মুক্তিযুদ্ধ জাদুঘর' },
        { code: 'Unit 20', title: 'Unit 20: Life Is Beautiful!', bangla: 'জীবন সুন্দর!' },
      ],
    },
  ]),

  'Class 5::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Multiplication', bangla: 'গুণ' },
    { code: 'Chapter 02', title: 'Chapter 02: Division', bangla: 'ভাগ' },
    { code: 'Chapter 03', title: 'Chapter 03: Problems Involving Four Operations', bangla: 'চার প্রক্রিয়া সম্পর্কিত সমস্যাবলি' },
    { code: 'Chapter 04', title: 'Chapter 04: Mathematical Symbols andSentences', bangla: 'গাণিতিক প্রতীক' },
    { code: 'Chapter 05', title: 'Chapter 05: Multiples and Factors', bangla: 'গুণিতক এবং গুণনীয়ক' },
    { code: 'Chapter 06', title: 'Chapter 06: Fractions', bangla: 'ভগ্নাংশ' },
    { code: 'Chapter 07', title: 'Chapter 07: Decimal Fractions', bangla: 'দশমিক ভগ্নাংশ' },
    { code: 'Chapter 08', title: 'Chapter 08: Average', bangla: 'গড়' },
    { code: 'Chapter 09', title: 'Chapter 09: Percentage', bangla: 'শতকরা' },
    { code: 'Chapter 10', title: 'Chapter 10: Geometry', bangla: 'জ্যামিতি' },
    { code: 'Chapter 11', title: 'Chapter 11: Measurement', bangla: 'পরিমাপ' },
    { code: 'Chapter 12', title: 'Chapter 12: Time', bangla: 'সময়' },
    { code: 'Chapter 13', title: 'Chapter 13: Data Arrangement', bangla: 'উপাত্ত বিন্যস্তকরণ' },
    { code: 'Chapter 14', title: 'Chapter 14: Calculator and Computer', bangla: 'ক্যালকুলেটর ও কম্পিউটার' },
  ]),

  'Class 5::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Our Liberation War', bangla: 'আমাদের মুক্তিযুদ্ধ' },
    { code: 'Chapter 02', title: 'Chapter 02: British Rule', bangla: 'ব্রিটিশ শাসন' },
    { code: 'Chapter 03', title: 'Chapter 03: Historical Monuments in Bangladesh', bangla: 'বাংলাদেশের ঐতিহাসিক স্থান ও নিদর্শন' },
    { code: 'Chapter 04', title: 'Chapter 04: Our Economy: Agriculture and Industry', bangla: 'আমাদের অর্থনীতি: কৃষি ও শিল্প' },
    { code: 'Chapter 05', title: 'Chapter 05: Population', bangla: 'জনসংখ্যা' },
    { code: 'Chapter 06', title: 'Chapter 06: Climate and Disaster', bangla: 'জলবায়ু এবং দুর্যোগ' },
    { code: 'Chapter 07', title: 'Chapter 07: Human Rights', bangla: 'মানবাধিকার' },
    { code: 'Chapter 08', title: 'Chapter 08: Gender Equality', bangla: 'নারী-পুরুষ সমতা' },
    { code: 'Chapter 09', title: 'Chapter 09: Our Duties and Responsibilities', bangla: 'আমাদের দায়িত্ব ও কর্তব্য' },
    { code: 'Chapter 10', title: 'Chapter 10: Democratic Attitude', bangla: 'গণতান্ত্রিক মনোভাব' },
    { code: 'Chapter 11', title: 'Chapter 11: Ethnic Groups in Bangladesh', bangla: 'বাংলাদেশের ক্ষুদ্র নৃ-গোষ্ঠী' },
    { code: 'Chapter 12', title: 'Chapter 12: Bangladesh in World Politics (UN & SAARC)', bangla: 'বাংলাদেশ ও বিশ্ব' },
  ]),

  'Class 5::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Iman and Aqaid (Beliefs)', bangla: 'ইমান ও আকাইদ' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat (Worship)', bangla: 'ইবাদত' },
    { code: 'Chapter 03', title: 'Chapter 03: Akhlaq (Character and Moral Values)', bangla: 'আখলাক বা চরিত্র ও নৈতিক মূল্যবোধ' },
    { code: 'Chapter 04', title: 'Chapter 04: Teaching of the Glorious Quran / Scriptures', bangla: 'কুরআন মজিদ শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 05', title: 'Chapter 05: Ideal Lives (Adarsha Jiboncharit)', bangla: 'আদর্শ জীবনচরিত' },
  ]),

  'Class 5::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Our Environment', bangla: 'আমাদের পরিবেশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Environmental Pollution', bangla: 'পরিবেশ দূষণ' },
    { code: 'Chapter 03', title: 'Chapter 03: Water for Life', bangla: 'জীবনের জন্য পানি' },
    { code: 'Chapter 04', title: 'Chapter 04: Air', bangla: 'বায়ু' },
    { code: 'Chapter 05', title: 'Chapter 05: Matter and Energy', bangla: 'পদার্থ ও শক্তি' },
    { code: 'Chapter 06', title: 'Chapter 06: Food for Good Health', bangla: 'সুস্থ জীবনের জন্য খাদ্য' },
    { code: 'Chapter 07', title: 'Chapter 07: Healthy Lifestyle', bangla: 'স্বাস্থ্যবিধি' },
    { code: 'Chapter 08', title: 'Chapter 08: The Universe', bangla: 'মহাবিশ্ব' },
    { code: 'Chapter 09', title: 'Chapter 09: Technology in Our Life', bangla: 'আমাদের জীবনে প্রযুক্তি' },
    { code: 'Chapter 10', title: 'Chapter 10: Information in Our Life', bangla: 'আমাদের জীবনে তথ্য' },
    { code: 'Chapter 11', title: 'Chapter 11: Weather and Climate', bangla: 'আবহাওয়া ও জলবায়ু' },
    { code: 'Chapter 12', title: 'Chapter 12: Climate Change', bangla: 'জলবায়ু পরিবর্তন' },
    { code: 'Chapter 13', title: 'Chapter 13: Natural Resources', bangla: 'প্রাকৃতিক সম্পদ' },
    { code: 'Chapter 14', title: 'Chapter 14: Population and Natural Environment', bangla: 'জনসংখ্যা ও প্রাকৃতিক পরিবেশ' },
  ]),

  // =========================================================================
  // CLASS 4 (PRIMARY) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 4::Bangla::Main Paper': makeChapters('101', [
    {
      code: 'গদ্য ও পদ্য',
      title: 'Amar Bangla Boi (আমার বাংলা বই)',
      bangla: 'গদ্য ও কবিতা পাঠসমূহ',
      color: '#f97316',
      semiChapters: [
        { code: 'পাঠ ০১', title: 'Bangladesher Prokriti', bangla: 'বাংলাদেশের প্রকৃতি' },
        { code: 'পাঠ ০২', title: 'Palkir Gan (Poem)', bangla: 'পালকির গান — সত্যেন্দ্রনাথ দত্ত' },
        { code: 'পাঠ ০৩', title: 'Muktijuddher Ekdin', bangla: 'আজকে আমার ছুটি চাই' },
        { code: 'পাঠ ০৪', title: 'Banglar Khoka', bangla: 'বাংলার খোকা' },
        { code: 'পাঠ ০৫', title: 'Mora Boro Hote Chai (Poem)', bangla: 'আবোল তাবোল — সুকুমার রায়' },
        { code: 'পাঠ ০৬', title: 'Birsresthoder Birgatha', bangla: 'বীরশ্রেষ্ঠদের বীরগাথা' },
        { code: 'পাঠ ০৭', title: 'Mohiyoshi Rokeya', bangla: 'মহীয়সী রোকেয়া' },
        { code: 'পাঠ ০৮', title: 'Nemontonno (Poem)', bangla: 'নেমন্তন্ন — অন্নদাশঙ্কর রায়' },
        { code: 'পাঠ ০৯', title: 'Mobile Phone', bangla: 'মোবাইল ফোন' },
        { code: 'পাঠ ১০', title: 'Hath Dhuye Nao', bangla: 'হাত ধুয়ে নাও' },
        { code: 'পাঠ ১১', title: 'Moder Bangla Bhasha (Poem)', bangla: 'মোদের বাংলা ভাষা — সুফিয়া কামাল' },
        { code: 'পাঠ ১২', title: 'Bhaowalider Golpo', bangla: 'বাওয়ালিদের গল্প' },
        { code: 'পাঠ ১৩', title: 'Pakhir Jogot', bangla: 'পাখির জগৎ' },
        { code: 'পাঠ ১৪', title: 'Kajla Didi (Poem)', bangla: 'কাজলা দিদি — যতীন্দ্রমোহন বাগচী' },
        { code: 'পাঠ ১৫', title: 'Pathan Muluke', bangla: 'পাঠান মুলুকে — সৈয়দ মুজতবা আলী' },
        { code: 'পাঠ ১৬', title: 'Maa (Poem)', bangla: 'মা — কাজী নজরুল ইসলাম' },
      ],
    },
  ]),

  'Class 4::English::Main Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'English for Today (Units)',
      bangla: 'ইংলিশ ফর টুডে — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Introducing One Another', bangla: 'একে অপরের সাথে পরিচয়' },
        { code: 'Unit 02', title: 'Unit 2: Have a Great Day', bangla: 'শুভেচ্ছা ও সম্ভাষণ' },
        { code: 'Unit 03', title: 'Unit 3: My School Assembly', bangla: 'বিদ্যালয়ের সমাবেশ' },
        { code: 'Unit 04', title: 'Unit 4: Family Tree', bangla: 'পরিবার পরিচিতি' },
        { code: 'Unit 05', title: 'Unit 5: Classroom Language', bangla: 'শ্রেণিকক্ষের ভাষা' },
        { code: 'Unit 06', title: 'Unit 6: At the Shop', bangla: 'দোকানে কেনাকাটা' },
        { code: 'Unit 07', title: 'Unit 7: Making Requests', bangla: 'অনুরোধ করা' },
        { code: 'Unit 08', title: 'Unit 8: My Family Activities', bangla: 'পারিবারিক কাজকর্ম' },
        { code: 'Unit 09', title: 'Unit 9: Gardening Activities & Traffic Rules', bangla: 'বাগান করা ও ট্রাফিক নিয়ম' },
        { code: 'Unit 10', title: 'Unit 10: A Letter to a Friend', bangla: 'বন্ধুর কাছে চিঠি' },
        { code: 'Unit 11', title: 'Unit 11: A Holiday Trip', bangla: 'ছুটির দিনের ভ্রমণ' },
        { code: 'Unit 12', title: 'Unit 12: Making Friends & Food Around the World', bangla: 'বন্ধু তৈরি ও বিশ্বের খাবার' },
      ],
    },
  ]),

  'Class 4::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Large Numbers and Place Value', bangla: 'বড় সংখ্যা ও স্থানীয় মান' },
    { code: 'Chapter 02', title: 'Chapter 02: Addition and Subtraction', bangla: 'যোগ ও বিয়োগ' },
    { code: 'Chapter 03', title: 'Chapter 03: Multiplication', bangla: 'গুণ' },
    { code: 'Chapter 04', title: 'Chapter 04: Division', bangla: 'ভাগ' },
    { code: 'Chapter 05', title: 'Chapter 05: Problems Related to Four Operations', bangla: 'যোগ, বিয়োগ, গুণ ও ভাগ সংক্রান্ত সমস্যা' },
    { code: 'Chapter 06', title: 'Chapter 06: Mathematical Symbols', bangla: 'গাণিতিক প্রতীক' },
    { code: 'Chapter 07', title: 'Chapter 07: Multiples and Factors', bangla: 'গুণিতক ও গুণনীয়ক' },
    { code: 'Chapter 08', title: 'Chapter 08: Fractions', bangla: 'সাধারণ ভগ্নাংশ' },
    { code: 'Chapter 09', title: 'Chapter 09: Decimal Fractions', bangla: 'দশমিক ভগ্নাংশ' },
    { code: 'Chapter 10', title: 'Chapter 10: Measurement', bangla: 'পরিমাপ' },
    { code: 'Chapter 11', title: 'Chapter 11: Time', bangla: 'সময়' },
    { code: 'Chapter 12', title: 'Chapter 12: Collection and Arrangement of Data', bangla: 'উপাত্ত সংগ্রহ এবং বিন্যস্তকরণ' },
    { code: 'Chapter 13', title: 'Chapter 13: Lines and Angles', bangla: 'রেখা ও কোণ' },
    { code: 'Chapter 14', title: 'Chapter 14: Triangles', bangla: 'ত্রিভুজ' },
  ]),

  'Class 4::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Our Environment and Society', bangla: 'আমাদের পরিবেশ ও সমাজ' },
    { code: 'Chapter 02', title: 'Chapter 02: Cooperation in Society', bangla: 'সমাজে পরস্পরের সহযোগিতা' },
    { code: 'Chapter 03', title: 'Chapter 03: Ethnic Groups in Bangladesh', bangla: 'বাংলাদেশের ক্ষুদ্র নৃ-গোষ্ঠী' },
    { code: 'Chapter 04', title: 'Chapter 04: The Rights of Citizens', bangla: 'নাগরিকের অধিকার' },
    { code: 'Chapter 05', title: 'Chapter 05: Values and Behaviour', bangla: 'মূল্যবোধ ও আচরণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Tolerance to Others’ Opinion', bangla: 'পরমতসহিষ্ণুতা' },
    { code: 'Chapter 07', title: 'Chapter 07: The Dignity of Work', bangla: 'কাজের মর্যাদা' },
    { code: 'Chapter 08', title: 'Chapter 08: Social and State Assets', bangla: 'সামাজিক এবং রাষ্ট্রীয় সম্পদ' },
    { code: 'Chapter 09', title: 'Chapter 09: Development of Our Locality', bangla: 'এলাকার উন্নয়ন' },
    { code: 'Chapter 10', title: 'Chapter 10: Geography of Asia', bangla: 'এশিয়া মহাদেশ' },
    { code: 'Chapter 11', title: 'Chapter 11: Geography of Bangladesh', bangla: 'বাংলাদেশের ভূপ্রকৃতি' },
    { code: 'Chapter 12', title: 'Chapter 12: Disaster Management', bangla: 'দুর্যোগ মোকাবিলা' },
    { code: 'Chapter 13', title: 'Chapter 13: Population of Bangladesh', bangla: 'বাংলাদেশের জনসংখ্যা' },
    { code: 'Chapter 14', title: 'Chapter 14: Our History', bangla: 'আমাদের ইতিহাস' },
    { code: 'Chapter 15', title: 'Chapter 15: Our Liberation War', bangla: 'আমাদের মুক্তিযুদ্ধ' },
    { code: 'Chapter 16', title: 'Chapter 16: Our Culture', bangla: 'আমাদের সংস্কৃতি' },
  ]),

  'Class 4::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Iman and Aqaid (Beliefs)', bangla: 'ইমান ও আকাইদ' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat (Worship)', bangla: 'ইবাদত' },
    { code: 'Chapter 03', title: 'Chapter 03: Akhlaq (Character and Moral Values)', bangla: 'আখলাক' },
    { code: 'Chapter 04', title: 'Chapter 04: Teaching of the Quran / Scriptures', bangla: 'কুরআন মজিদ শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 05', title: 'Chapter 05: Ideal Lives (Prophets & Great Personalities)', bangla: 'নবি-রাসুলগণের পরিচয় ও জীবনাদর্শ' },
  ]),

  'Class 4::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Living Things and Environment', bangla: 'জীব ও পরিবেশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Plants and Animals', bangla: 'উদ্ভিদ ও প্রাণী' },
    { code: 'Chapter 03', title: 'Chapter 03: Soil', bangla: 'মাটি' },
    { code: 'Chapter 04', title: 'Chapter 04: Food', bangla: 'খাদ্য' },
    { code: 'Chapter 05', title: 'Chapter 05: Healthy Lifestyle', bangla: 'স্বাস্থ্যবিধি' },
    { code: 'Chapter 06', title: 'Chapter 06: Matter', bangla: 'পদার্থ' },
    { code: 'Chapter 07', title: 'Chapter 07: Natural Resources', bangla: 'প্রাকৃতিক সম্পদ' },
    { code: 'Chapter 08', title: 'Chapter 08: The Universe', bangla: 'মহাবিশ্ব' },
    { code: 'Chapter 09', title: 'Chapter 09: Technology in Our Life', bangla: 'আমাদের জীবনে প্রযুক্তি' },
    { code: 'Chapter 10', title: 'Chapter 10: Weather and Climate', bangla: 'আবহাওয়া ও জলবায়ু' },
    { code: 'Chapter 11', title: 'Chapter 11: Life Safety and First Aid', bangla: 'জীবনের নিরাপত্তা এবং প্রাথমিক চিকিৎসা' },
    { code: 'Chapter 12', title: 'Chapter 12: Information in Our Life', bangla: 'আমাদের জীবনে তথ্য' },
    { code: 'Chapter 13', title: 'Chapter 13: Population and Natural Environment', bangla: 'জনসংখ্যা ও প্রাকৃতিক পরিবেশ' },
  ]),

  // =========================================================================
  // CLASS 3 (PRIMARY) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 3::Bangla::Main Paper': makeChapters('101', [
    {
      code: 'গদ্য ও পদ্য',
      title: 'Amar Bangla Boi (আমার বাংলা বই)',
      bangla: 'গদ্য ও কবিতা পাঠসমূহ',
      color: '#f97316',
      semiChapters: [
        { code: 'পাঠ ০১', title: 'Chobir Galpo: Bangi O Khargosh', bangla: 'ব্যাঙের সাজা' },
        { code: 'পাঠ ০২', title: 'Amader Ei Bangladesh (Poem)', bangla: 'আমাদের এই বাংলাদেশ — সৈয়দ শামসুল হক' },
        { code: 'পাঠ ০৩', title: 'Raja O Tar Tin Kanya', bangla: 'রাজা ও তাঁর তিন কন্যা' },
        { code: 'পাঠ ০৪', title: 'Haste Jano To (Poem)', bangla: 'হাসির গান' },
        { code: 'পাঠ ০৫', title: 'Bhasha Shahidder Kotha', bangla: 'ভাষা শহিদদের কথা' },
        { code: 'পাঠ ০৬', title: 'Chal Chal Chal (Poem)', bangla: 'চল্ চল্ চল্ — কাজী নজরুল ইসলাম' },
        { code: 'পাঠ ০৭', title: 'Swadhinata Diboshke Ghire', bangla: 'স্বাধীনতা দিবসকে ঘিরে' },
        { code: 'পাঠ ০৮', title: 'Kুঁড়ির ভেতর কাঁদছে খুকু', bangla: 'তালগাছ — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পাঠ ০৯', title: 'Kujo Burir Golpo', bangla: 'কুঁজো বুড়ির গল্প' },
        { code: 'পাঠ ১০', title: 'Amader Gram (Poem)', bangla: 'আমাদের গ্রাম — বন্দে আলী মিয়া' },
        { code: 'পাঠ ১১', title: 'Ekai Ekti Durg (Birsrestho Mostafa Kamal)', bangla: 'একাই একটি দুর্গ' },
        { code: 'পাঠ ১২', title: 'Adarsha Chele (Poem)', bangla: 'আদর্শ ছেলে — কুসুমকুমারী দাশ' },
        { code: 'পাঠ ১৩', title: 'Pakhiplader Kotha', bangla: 'পাখিদের কথা' },
        { code: 'পাঠ ১৪', title: 'Nirapod Parapar', bangla: 'নিরাপদে চলাচল' },
      ],
    },
  ]),

  'Class 3::English::Main Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'English for Today (Units)',
      bangla: 'ইংলিশ ফর টুডে — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Greetings and Introductions', bangla: 'সম্ভাষণ ও পরিচয়' },
        { code: 'Unit 02', title: 'Unit 2: Knowing Your Friends', bangla: 'বন্ধুদের জানা' },
        { code: 'Unit 03', title: 'Unit 3: Commands and Instructions', bangla: 'আদেশ ও নির্দেশনা' },
        { code: 'Unit 04', title: 'Unit 4: Numbers and Counting', bangla: 'সংখ্যা ও গণনা' },
        { code: 'Unit 05', title: 'Unit 5: Cursive Letters and Words', bangla: 'টানা হাতের লেখা ও শব্দ' },
        { code: 'Unit 06', title: 'Unit 6: People and Occupations', bangla: 'মানুষ ও পেশা' },
        { code: 'Unit 07', title: 'Unit 7: Days of the Week & Calendar', bangla: 'সপ্তাহের দিন ও ক্যালেন্ডার' },
        { code: 'Unit 08', title: 'Unit 8: Prepositions and Punctuation', bangla: 'প্রিপজিশন ও বিরামচিহ্ন' },
        { code: 'Unit 09', title: 'Unit 9: Story: The Crow / The Cow and the Frog', bangla: 'গল্প পাঠ' },
        { code: 'Unit 10', title: 'Unit 10: My Family and What Food Should We Eat?', bangla: 'আমার পরিবার ও স্বাস্থ্যকর খাবার' },
      ],
    },
  ]),

  'Class 3::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Numbers', bangla: 'সংখ্যা' },
    { code: 'Chapter 02', title: 'Chapter 02: Addition', bangla: 'যোগ' },
    { code: 'Chapter 03', title: 'Chapter 03: Subtraction', bangla: 'বিয়োগ' },
    { code: 'Chapter 04', title: 'Chapter 04: Multiplication', bangla: 'গুণ' },
    { code: 'Chapter 05', title: 'Chapter 05: Division', bangla: 'ভাগ' },
    { code: 'Chapter 06', title: 'Chapter 06: Problems Related to Addition, Subtraction, Multiplication & Division', bangla: 'যোগ, বিয়োগ, গুণ ও ভাগ সংক্রান্ত সমস্যা' },
    { code: 'Chapter 07', title: 'Chapter 07: Bangladeshi Coins and Notes', bangla: 'বাংলাদেশি মুদ্রা ও নোট' },
    { code: 'Chapter 08', title: 'Chapter 08: Fractions', bangla: 'ভগ্নাংশ' },
    { code: 'Chapter 09', title: 'Chapter 09: Measurement', bangla: 'পরিমাপ' },
    { code: 'Chapter 10', title: 'Chapter 10: Time', bangla: 'সময়' },
    { code: 'Chapter 11', title: 'Chapter 11: Geometry (Points, Lines, Angles, Quadrilaterals)', bangla: 'জ্যামিতি' },
  ]),

  'Class 3::Bangladesh and Global Studies::Main Paper': makeChapters('150', [
    { code: 'Chapter 01', title: 'Chapter 01: Natural and Social Environment', bangla: 'প্রাকৃতিক ও সামাজিক পরিবেশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Living Together in Harmony', bangla: 'মিলেমিশে থাকা' },
    { code: 'Chapter 03', title: 'Chapter 03: Our Rights and Responsibilities', bangla: 'আমাদের অধিকার ও দায়িত্ব' },
    { code: 'Chapter 04', title: 'Chapter 04: Different Occupations of Society', bangla: 'সমাজের বিভিন্ন পেশা' },
    { code: 'Chapter 05', title: 'Chapter 05: Human Qualities', bangla: 'মানুষের গুণ' },
    { code: 'Chapter 06', title: 'Chapter 06: Development of Family and Social Environment', bangla: 'পরিবার ও বিদ্যালয়ে উন্নয়ন কাজ' },
    { code: 'Chapter 07', title: 'Chapter 07: Preservation of Environment', bangla: 'পরিবেশ সংরক্ষণ ও উন্নয়ন' },
    { code: 'Chapter 08', title: 'Chapter 08: Continents and Oceans', bangla: 'মহাদেশ ও মহাসাগর' },
    { code: 'Chapter 09', title: 'Chapter 09: Our Bangladesh', bangla: 'আমাদের বাংলাদেশ' },
    { code: 'Chapter 10', title: 'Chapter 10: Father of the Nation and National Leaders', bangla: 'আমাদের ইতিহাস ও জাতীয় নেতা' },
    { code: 'Chapter 11', title: 'Chapter 11: Our History and Culture', bangla: 'আমাদের ইতিহাস ও সংস্কৃতি' },
    { code: 'Chapter 12', title: 'Chapter 12: Population of Bangladesh', bangla: 'বাংলাদেশের জনসংখ্যা' },
  ]),

  'Class 3::Religion::Main Paper': makeChapters('111', [
    { code: 'Chapter 01', title: 'Chapter 01: Iman and Aqaid (Beliefs)', bangla: 'ইমান ও আকাইদ' },
    { code: 'Chapter 02', title: 'Chapter 02: Ibadat (Worship)', bangla: 'ইবাদত' },
    { code: 'Chapter 03', title: 'Chapter 03: Akhlaq (Character and Moral Values)', bangla: 'আখলাক' },
    { code: 'Chapter 04', title: 'Chapter 04: Learning the Quran / Sacred Texts', bangla: 'কুরআন মজিদ শিক্ষা / ধর্মগ্রন্থ' },
    { code: 'Chapter 05', title: 'Chapter 05: Prophets and Ideal Personalities', bangla: 'নবি ও রাসুলগণের পরিচয়' },
  ]),

  'Class 3::General Science::Main Paper': makeChapters('127', [
    { code: 'Chapter 01', title: 'Chapter 01: Our Environment', bangla: 'আমাদের পরিবেশ' },
    { code: 'Chapter 02', title: 'Chapter 02: Living and Non-living Things', bangla: 'জীব ও জড়' },
    { code: 'Chapter 03', title: 'Chapter 03: Different Types of Matter', bangla: 'বিভিন্ন ধরনের পদার্থ' },
    { code: 'Chapter 04', title: 'Chapter 04: Water for Life', bangla: 'জীবনের জন্য পানি' },
    { code: 'Chapter 05', title: 'Chapter 05: Soil', bangla: 'মাটি' },
    { code: 'Chapter 06', title: 'Chapter 06: Air', bangla: 'বায়ু' },
    { code: 'Chapter 07', title: 'Chapter 07: Food for Good Health', bangla: 'খাদ্য' },
    { code: 'Chapter 08', title: 'Chapter 08: Hygiene', bangla: 'স্বাস্থ্যবিধি' },
    { code: 'Chapter 09', title: 'Chapter 09: Energy', bangla: 'শক্তি' },
    { code: 'Chapter 10', title: 'Chapter 10: Introduction to Technology', bangla: 'প্রযুক্তির সাথে পরিচয়' },
    { code: 'Chapter 11', title: 'Chapter 11: Information and Communication', bangla: 'তথ্য ও যোগাযোগ' },
    { code: 'Chapter 12', title: 'Chapter 12: Population and Natural Environment', bangla: 'জনসংখ্যা ও প্রাকৃতিক পরিবেশ' },
  ]),

  // =========================================================================
  // CLASS 2 (PRIMARY) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 2::Bangla::Main Paper': makeChapters('101', [
    {
      code: 'গদ্য ও পদ্য',
      title: 'Amar Bangla Boi (আমার বাংলা বই)',
      bangla: 'ছড়া, কবিতা ও গল্প পাঠসমূহ',
      color: '#f97316',
      semiChapters: [
        { code: 'পাঠ ০১', title: 'Amar Parichay O Sohopathi', bangla: 'আমার পরিচয় ও সহপাঠী' },
        { code: 'পাঠ ০২', title: 'Sundarban O Prani', bangla: 'সুন্দরবন' },
        { code: 'পাঠ ০৩', title: 'Amader Choto Nodi (Poem)', bangla: 'আমাদের ছোট নদী — রবীন্দ্রনাথ ঠাকুর' },
        { code: 'পাঠ ০৪', title: 'Jolpori O Kathure', bangla: 'জলপরি ও কাঠুরে' },
        { code: 'পাঠ ০৫', title: 'Bhor Holo (Poem)', bangla: 'ভোর হলো — কাজী নজরুল ইসলাম' },
        { code: 'পাঠ ০৬', title: 'Nana Ronger Phulphal', bangla: 'নানা রঙের ফুলফল' },
        { code: 'পাঠ ০৭', title: 'Dadurbari Majar Bari', bangla: 'দাদির হাতের মজার পিঠা' },
        { code: 'পাঠ ০৮', title: 'Dukhur Chelebela', bangla: 'দুখুর ছেলেবেলা' },
        { code: 'পাঠ ০৯', title: 'Prarthona (Poem)', bangla: 'প্রার্থনা — সুফিয়া কামাল' },
        { code: 'পাঠ ১০', title: 'Kাজের আনন্দ (Poem)', bangla: 'কাজের আনন্দ — নবকৃষ্ণ ভট্টাচার্য' },
        { code: 'পাঠ ১১', title: 'Choy Ritur Desh', bangla: 'ছয় ঋতুর দেশ' },
        { code: 'পাঠ ১২', title: 'Muktijuddher Ekuser Kotha', bangla: 'সবাই মিলে কাজ করি' },
      ],
    },
  ]),

  'Class 2::English::Main Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'English for Today (Units)',
      bangla: 'ইংলিশ ফর টুডে — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Greetings and Introductions', bangla: 'সম্ভাষণ ও পরিচয়' },
        { code: 'Unit 02', title: 'Unit 2: Alphabet and Words (A–Z)', bangla: 'বর্ণমালা ও শব্দ' },
        { code: 'Unit 03', title: 'Unit 3: Commands and Instructions', bangla: 'নির্দেশনা ও কমান্ড' },
        { code: 'Unit 04', title: 'Unit 4: Numbers and Counting', bangla: 'সংখ্যা ও গণনা' },
        { code: 'Unit 05', title: 'Unit 5: How Old Are You?', bangla: 'তোমার বয়স কত?' },
        { code: 'Unit 06', title: 'Unit 6: Shapes and Sizes', bangla: 'আকৃতি ও আকার' },
        { code: 'Unit 07', title: 'Unit 7: Colours and Rhymes', bangla: 'রং ও ছড়া' },
        { code: 'Unit 08', title: 'Unit 8: Animals and Where Do They Live?', bangla: 'প্রাণী ও তাদের আবাসস্থল' },
        { code: 'Unit 09', title: 'Unit 9: Life Everyday', bangla: 'দৈনন্দিন জীবন' },
        { code: 'Unit 10', title: 'Unit 10: Story: The Golden Goose', bangla: 'সোনার ডিম পাড়া হাঁস' },
      ],
    },
  ]),

  'Class 2::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Numbers and Place Value', bangla: 'সংখ্যা ও স্থানীয় মান' },
    { code: 'Chapter 02', title: 'Chapter 02: Addition and Subtraction', bangla: 'যোগ ও বিয়োগ' },
    { code: 'Chapter 03', title: 'Chapter 03: Multiplication', bangla: 'গুণ' },
    { code: 'Chapter 04', title: 'Chapter 04: Division', bangla: 'ভাগ' },
    { code: 'Chapter 05', title: 'Chapter 05: Geometric Shapes and Patterns', bangla: 'জ্যামিতিক আকৃতি ও প্যাটার্ন' },
    { code: 'Chapter 06', title: 'Chapter 06: Measurement (Length, Weight, Volume & Time)', bangla: 'পরিমাপ' },
    { code: 'Chapter 07', title: 'Chapter 07: Bangladeshi Currency', bangla: 'বাংলাদেশি মুদ্রা' },
    { code: 'Chapter 08', title: 'Chapter 08: Fractions and Data Collection', bangla: 'ভগ্নাংশ ও উপাত্ত' },
  ]),

  // =========================================================================
  // CLASS 1 (PRIMARY) — COMPLETE NCTB CURRICULUM
  // =========================================================================
  'Class 1::Bangla::Main Paper': makeChapters('101', [
    {
      code: 'পাঠসমূহ',
      title: 'Amar Bangla Boi (আমার বাংলা বই)',
      bangla: 'বর্ণ পরিচয়, ছড়া ও গল্প পাঠসমূহ',
      color: '#f97316',
      semiChapters: [
        { code: 'পাঠ ০১', title: 'Ami O Amar Poribar', bangla: 'আমি ও আমার পরিবার' },
        { code: 'পাঠ ০২', title: 'Amader Paribesh O Kheladhula', bangla: 'আমাদের পরিবেশ ও খেলাধুলা' },
        { code: 'পাঠ ০৩', title: 'Swaraborna Parichay (অ – ঔ)', bangla: 'স্বরবর্ণ পরিচয় (অ থেকে ঔ)' },
        { code: 'পাঠ ০৪', title: 'Ata Gache Tota Pakhi (Rhyme)', bangla: 'আতা গাছে তোতা পাখি (ছড়া)' },
        { code: 'পাঠ ০৫', title: 'Byanjanbarna Parichay (ক – ঁ)', bangla: 'ব্যঞ্জনবর্ণ পরিচয় (ক থেকে ঁ)' },
        { code: 'পাঠ ০৬', title: 'Bakbakum Payra (Rhyme)', bangla: 'বাকবাকুম পায়রা (ছড়া)' },
        { code: 'পাঠ ০৭', title: 'Kar-Chinha Parichay (া – ৌ)', bangla: 'কার-চিহ্ন পরিচয় (া থেকে ৌ)' },
        { code: 'পাঠ ০৮', title: 'Itol Bitol Gacher Pata (Rhyme)', bangla: 'ইতল বিতল গাছের পাতা — সুফিয়া কামাল' },
        { code: 'পাঠ ০৯', title: 'Pippra O Ghughu', bangla: 'পিঁপড়া ও ঘুঘু' },
        { code: 'পাঠ ১০', title: 'Mamura Bari (Rhyme)', bangla: 'মামার বাড়ি — জসীমউদ্‌দীন' },
        { code: 'পাঠ ১১', title: 'Mayer Bhalobasha', bangla: 'মায়ের ভালোবাসা' },
        { code: 'পাঠ ১২', title: 'Muktijuddho O Bangladesh', bangla: 'মুক্তিযুদ্ধ ও আমাদের দেশ' },
      ],
    },
  ]),

  'Class 1::English::Main Paper': makeChapters('107', [
    {
      code: 'Units',
      title: 'English for Today (Units)',
      bangla: 'ইংলিশ ফর টুডে — ইউনিটসমূহ',
      color: '#38bdf8',
      semiChapters: [
        { code: 'Unit 01', title: 'Unit 1: Greetings and Farewells (Good Morning)', bangla: 'সম্ভাষণ ও বিদায়' },
        { code: 'Unit 02', title: 'Unit 2: Introductions (What’s Your Name?)', bangla: 'নিজের পরিচয়' },
        { code: 'Unit 03', title: 'Unit 3: Classroom Commands', bangla: 'শ্রেণিকক্ষের নির্দেশনা' },
        { code: 'Unit 04', title: 'Unit 4: Alphabet and Phonics (A–H)', bangla: 'বর্ণমালা ও ধ্বনি (A–H)' },
        { code: 'Unit 05', title: 'Unit 5: Numbers (1–5)', bangla: 'সংখ্যা গণনা (১–৫)' },
        { code: 'Unit 06', title: 'Unit 6: Alphabet and Phonics (I–P)', bangla: 'বর্ণমালা ও ধ্বনি (I–P)' },
        { code: 'Unit 07', title: 'Unit 7: Rhymes and Body Parts', bangla: 'ছড়া ও শরীরের অঙ্গপ্রত্যঙ্গ' },
        { code: 'Unit 08', title: 'Unit 8: Alphabet and Phonics (Q–Z)', bangla: 'বর্ণমালা ও ধ্বনি (Q–Z)' },
        { code: 'Unit 09', title: 'Unit 9: Numbers (6–10)', bangla: 'সংখ্যা গণনা (৬–১০)' },
        { code: 'Unit 10', title: 'Unit 10: In the Village and In the City', bangla: 'গ্রামে ও শহরে' },
      ],
    },
  ]),

  'Class 1::General Math::Main Paper': makeChapters('109', [
    { code: 'Chapter 01', title: 'Chapter 01: Let Us Compare', bangla: 'তুলনা করি' },
    { code: 'Chapter 02', title: 'Chapter 02: Counting', bangla: 'গণনা' },
    { code: 'Chapter 03', title: 'Chapter 03: Numbers (1 to 10)', bangla: 'সংখ্যা (১ থেকে ১০)' },
    { code: 'Chapter 04', title: 'Chapter 04: Concept of Addition', bangla: 'যোগের ধারণা' },
    { code: 'Chapter 05', title: 'Chapter 05: Concept of Subtraction', bangla: 'বিয়োগের ধারণা' },
    { code: 'Chapter 06', title: 'Chapter 06: Numbers (11 to 20)', bangla: 'সংখ্যা (১১ থেকে ২০)' },
    { code: 'Chapter 07', title: 'Chapter 07: Addition (11 to 20)', bangla: 'যোগ (১১ থেকে ২০)' },
    { code: 'Chapter 08', title: 'Chapter 08: Subtraction (11 to 20)', bangla: 'বিয়োগ (১১ থেকে ২০)' },
    { code: 'Chapter 09', title: 'Chapter 09: Numbers (21 to 40)', bangla: 'সংখ্যা (২১ থেকে ৪০)' },
    { code: 'Chapter 10', title: 'Chapter 10: Place Value', bangla: 'স্থানীয় মান' },
    { code: 'Chapter 11', title: 'Chapter 11: Geometry and Shapes', bangla: 'জ্যামিতিক আকৃতি' },
    { code: 'Chapter 12', title: 'Chapter 12: Patterns', bangla: 'প্যাটার্ন' },
    { code: 'Chapter 13', title: 'Chapter 13: Numbers (41 to 100)', bangla: 'সংখ্যা (৪১ থেকে ১০০)' },
    { code: 'Chapter 14', title: 'Chapter 14: Bangladeshi Currency', bangla: 'বাংলাদেশি মুদ্রা' },
  ]),
};
