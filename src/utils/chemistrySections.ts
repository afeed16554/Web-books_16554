export interface TopicItem {
  id: string;
  title: string;
  isMainTopic?: boolean;
  batch: 'batch-1' | 'batch-2' | 'batch-3' | 'batch-4' | 'batch-5';
  html: string;
}

/**
 * Batch 1: Aliphatic Hydrocarbons & Alkanes (Pages 1-4)
 */
export const BATCH_1_SECTIONS: TopicItem[] = [
  {
    id: 'topic-aliphatic-sources',
    title: '১. অ্যালিফেটিক হাইড্রোকার্বনের উৎস ও নকিং',
    isMainTopic: true,
    batch: 'batch-1',
    html: `  <!-- SECTION A1: ALIPHATIC HYDROCARBON SOURCES & KNOCKING -->
  <section class="topic-section" id="topic-aliphatic-sources">
    <div class="topic-badge">অ্যালিফেটিক হাইড্রোকার্বন (Concept)</div>
    <h2>অ্যালিফেটিক হাইড্রোকার্বনের উৎস</h2>
    <p><strong>(i) প্রাকৃতিক গ্যাস:</strong> প্রাকৃতিক গ্যাসে প্রাপ্ত অ্যালকেনের কার্বন সংখ্যা $1 - 4$।</p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>গ্যাস</th>
            <th>শুষ্ক গ্যাসে শতকরা পরিমাণ</th>
            <th>গ্যাস</th>
            <th>শুষ্ক গ্যাসে শতকরা পরিমাণ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$\\ce{CH4}$</td>
            <td>$93\\% - 99\\%$</td>
            <td>$\\ce{C4H10}$</td>
            <td>$0.1 - 1.23\\%$</td>
          </tr>
          <tr>
            <td>$\\ce{C2H6}$</td>
            <td>$0.1 - 4\\%$</td>
            <td>$\\ce{N2}$</td>
            <td>$0.02 - 0.99\\%$</td>
          </tr>
          <tr>
            <td>$\\ce{C3H8}$</td>
            <td>$0.1 - 1\\%$</td>
            <td>$\\ce{CO2}$</td>
            <td>$0.05 - 0.9\\%$</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="margin-top: 0.75rem;"><strong>(ii) পেট্রোলিয়াম খনিজ তেল:</strong> পেট্রোলিয়ামের প্রধান উপাদান অ্যালকেন, সাইক্লো অ্যালকেন ও অ্যারোমেটিক হাইড্রোকার্বন। অশোধিত পেট্রোলিয়ামে $\\ce{C1}$ থেকে $\\ce{C40}$ কার্বন পরমাণুঘটিত হাইড্রোকার্বনের মিশ্রণ থাকে।</p>

    <details class="interactive-drop" open>
      <summary>Good to know: নকিং (Knocking) ও অকটেন নাম্বার</summary>
      <div class="drop-content">
        <ul>
          <li><strong>নকিং (Knocking):</strong> গাড়ির ইঞ্জিনে পিস্টন সঠিক অবস্থানে না থাকার কারণে উৎপন্ন জ্বালানি ও বায়ু মিশ্রণের প্রবল চাপ হঠাৎ পিস্টনকে প্রচণ্ড ধাক্কা দেয়। এতে ইঞ্জিনে বিকট ধাতব শব্দ সৃষ্টি হয়। একে নকিং (knocking) বলে।</li>
          <li><strong>অকটেন নাম্বার:</strong> কোনো জ্বালানির অকটেন নাম্বার $85$ বলতে বোঝানো হয় যে, ঐ জ্বালানিটি $15\\%$ n-হেপ্টেন ও $85\\%$ iso অকটেন মিশ্রণের সমান 'জ্বালানি দক্ষতা' সম্পন্ন জ্বালানি। যে জ্বালানির অকটেন নাম্বার যত বেশি সে জ্বালানি তত বেশি উৎকৃষ্ট।</li>
        </ul>
        <p style="margin-top: 0.6rem;"><strong>জ্বালানির অকটেন নাম্বার বৃদ্ধি করার উপায়:</strong></p>
        <ul>
          <li>(i) জ্বালানির সাথে টেট্রাইথাইল লেড (TEL), টেট্রামিথাইল লেড (TML), আয়রন পেন্টাকার্বনিল ($\\ce{Fe(CO)5}$) বা টলুইন ($\\ce{C6H5-CH3}$) ইত্যাদি পদার্থের যে কোন একটি মিশানো হয়।</li>
          <li>(ii) উচ্চতর হাইড্রোকার্বনের তাপীয় বিয়োজন বা ক্র্যাকিং করে অপেক্ষাকৃত ছোট অণুর হাইড্রোকার্বন তৈরি করা হয়।</li>
        </ul>
        $$\\underset{\\text{অক্টাডেকেন}}{\\ce{C18H38(s)}} \\xrightarrow{\\ce{Al2O3}, 100^\\circ\\text{C}} \\underset{\\text{অকটেন}}{\\ce{C8H18(l)}} + \\underset{\\text{ইথিন}}{\\ce{5C2H4(g)}}$$
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-alkane-prep',
    title: '২. অ্যালকেনের প্রস্তুত প্রণালী ও শনাক্তকরণ',
    isMainTopic: true,
    batch: 'batch-1',
    html: `  <!-- SECTION A2: ALKANE PREPARATION, WURTZ & SCHIEVER'S TEST -->
  <section class="topic-section" id="topic-alkane-prep">
    <div class="topic-badge">অ্যালকেন (Alkane)</div>
    <p><strong>সাধারণ সংকেত:</strong> অ্যালকেনের সাধারণ সংকেত $\\ce{C_nH_{2n+2}}$।</p>

    <h2>অ্যালকেনের সাধারণ প্রস্তুত প্রণালী</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>শর্ত ও প্রভাবক</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(i) উর্টজ বিক্রিয়া</td>
            <td>শুষ্ক ইথার</td>
            <td>
              $$\\ce{2R-X + 2Na ->[\\text{শুষ্ক}][\\text{ইথার}] R-R + 2NaX}$$
              $$\\ce{2CH3CH2Cl + 2Na ->[\\text{শুষ্ক}][\\text{ইথার}] CH3-CH2-CH2-CH3 + 2NaCl}$$
            </td>
          </tr>
          <tr>
            <td>(ii) ডিকার্বক্সিলেশন বিক্রিয়া</td>
            <td>তাপ</td>
            <td>
              $$\\ce{R-COONa + NaOH(CaO) ->[\\Delta] R-H + Na2CO3(CaO)}$$
              $$\\ce{CH3CH2COONa + NaOH(CaO) ->[\\Delta] CH3-CH3 + Na2CO3(CaO)}$$
            </td>
          </tr>
          <tr>
            <td>(iii) হাইড্রোজিনেশন</td>
            <td>$150^\\circ - 200^\\circ\\text{C}$,<br>$\\ce{Ni}$</td>
            <td>
              $$\\text{অ্যালকিন থেকে: } \\ce{R-CH=CH2 + H2 ->[\\ce{Ni}][150^\\circ-200^\\circ\\text{C}] R-CH2-CH3}$$
              $$\\text{অ্যালকাইন থেকে: } \\ce{R-C#CH + 2H2 ->[\\ce{Ni}][150^\\circ-200^\\circ\\text{C}] R-CH2-CH3}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>বিক্রিয়া (i), (ii) ও (iii) এর গুরুত্বপূর্ণ তথ্য ও কৌশল (Important Notes)</summary>
      <div class="drop-content">
        <p style="margin-top: 0.4rem;"><strong>(i) উর্টজ বিক্রিয়ার বৈশিষ্ট্য:</strong></p>
        <ul>
          <li>উর্টজ বিক্রিয়ার মাধ্যমে কার্বন শিকলে কার্বন সংখ্যা বৃদ্ধি করা যায়।</li>
          <li>এ বিক্রিয়ায় এমন একটা বিক্রিয়ক দরকার যাতে উৎপাদের অর্ধেক সংখ্যক বা উৎপাদের চেয়ে কম সংখ্যক কার্বন থাকবে।</li>
          <li>এ বিক্রিয়ার মাধ্যমে মিথেন প্রস্তুত করা যায় না।</li>
        </ul>
        <p style="margin-top: 0.6rem;"><strong>(ii) ডিকার্বক্সিলেশন বিক্রিয়ার বৈশিষ্ট্য:</strong></p>
        <ul>
          <li>এটি একটি অবরোহ পদ্ধতি।</li>
          <li>উৎপন্ন অ্যালকেনের কার্বন সংখ্যা, কার্বক্সিলেট লবণের কার্বন সংখ্যা থেকে $1$ কমে যায়। তাই এই বিক্রিয়াকে বলে ডিকার্বক্সিলেশন বিক্রিয়া।</li>
          <li>$\\ce{CaO}$ এখানে নিরুদক হিসেবে কাজ করে $\\ce{NaOH}$ কে শুষ্ক রাখে।</li>
          <li>এই বিক্রিয়াকে <strong>ডুমা বিক্রিয়াও</strong> বলা হয়।</li>
        </ul>
        <p style="margin-top: 0.6rem;"><strong>(iii) হাইড্রোজিনেশন বিক্রিয়ার বৈশিষ্ট্য:</strong></p>
        <ul>
          <li>প্রভাবক $\\ce{Pt}$ বা $\\ce{Pd}$ ধাতুর উপস্থিতিতে সাধারণ তাপমাত্রায় অথবা প্রভাবক $\\ce{Ni}$ ধাতুর উপস্থিতিতে $150^\\circ - 200^\\circ\\text{C}$ তাপমাত্রায় হাইড্রোজিনেশন ঘটে।</li>
          <li>কক্ষ তাপমাত্রায় এক আয়তন $\\ce{Pd}$ $200$ আয়তন $\\ce{H2}$ গ্যাস শোষণ করতে পারে।</li>
        </ul>
      </div>
    </details>

    <div class="caution-box">
      ⚠️ <strong>সতর্কতা:</strong> $3^\\circ$ অ্যালকাইল হ্যালাইড উর্টজ বিক্রিয়া দেয় না। কারণ, উর্টজ বিক্রিয়া ২ ধাপে ঘটে। বিক্রিয়ার দ্বিতীয় ধাপ $\\text{S}_{\\text{N}}2$ মেকানিজমে ঘটে। আর, $3^\\circ$ অ্যালকাইল হ্যালাইড $\\text{S}_{\\text{N}}2$ বিক্রিয়া দেয় না।
    </div>

    <details class="interactive-drop" open>
      <summary>Good to know: বিজোড় কার্বনবিশিষ্ট অ্যালকেন, স্কিভারের বিকারক ও $\\ce{CH4}$ শনাক্তকরণ</summary>
      <div class="drop-content">
        <p style="margin-top: 0.5rem;"><strong>বিজোড় কার্বন সংখ্যাবিশিষ্ট অ্যালকেন পাওয়ার জন্য করার জন্য কী করব?</strong></p>
        <p>কোনো একক অ্যালকাইল হ্যালাইডের দুইটি অণুর পরিবর্তে এ বিক্রিয়ায় একাধিক অ্যালকাইল হ্যালাইডের মিশ্রণ ব্যবহার করা হলে বিজোড় সংখ্যক কার্বন বিশিষ্ট অ্যালকেন উৎপন্ন হয়। যেমন-</p>
        $$\\ce{3R-X + 3R'-X + 6Na ->[\\text{শুষ্ক ইথার}] 6NaX + R-R + R'-R' + R-R'}$$
        $$\\ce{3CH3I + 3CH3-CH2I + 6Na ->[\\text{শুষ্ক ইথার}] CH3-CH3 + CH3-CH2-CH2-CH3 + CH3-CH2-CH3 + 6NaI}$$
        <p>বিজোড় কার্বন সংখ্যার অ্যালকেনের পাশাপাশি আরও দুটি জোড় কার্বন সংখ্যাবিশিষ্ট অ্যালকেন প্রস্তুত হয়েছে। এসব অ্যালকেনের স্ফুটনাঙ্ক প্রায় কাছাকাছি হওয়ায় পাতন প্রক্রিয়ায় মিশ্রণের উপাদান থেকে এদেরকে পৃথক করাও কষ্টসাধ্য। তাই, বাণিজ্যিকভাবে বিজোড় কার্বন সংখ্যার অ্যালকেন প্রস্তুত করতে উর্টজ বিক্রিয়া ব্যবহার করা হয় না।</p>

        <p style="margin-top: 0.85rem;"><strong>স্কিভারের বিকারক:</strong></p>
        <p>$2\\text{ mL}$ জলীয় ফিনাইল হাইড্রাজিন হাইড্রোক্লোরাইড এবং $1\\text{ mL } 5\\%(\\text{W/V}) \\ce{K4[Fe(CN)6]}$ দ্রবণে $5\\text{ mL}$ গাঢ় $\\ce{HCl}$ যোগ করলে যে দ্রবণ উৎপন্ন হয় তাই “স্কিভারের বিকারক”।</p>

        <p style="margin-top: 0.85rem;"><strong>$\\ce{CH4}$ শনাক্তকারী পরীক্ষা:</strong></p>
        $$\\ce{CH4 + 2O3 -> H-CHO + H2O + 2O2}$$
        <p>এক্ষেত্রে মিথান্যালের ঝাঁঝালো গন্ধ পাওয়া যায়। এ দ্রবণকে পরীক্ষানলে নিয়ে তাতে $2 - 4$ ফোঁটা স্কিভারের বিকারক যোগ করলে দ্রবণের বর্ণ গোলাপি লাল ধারণ করে।</p>
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-alkane-halogenation',
    title: '৩. অ্যালকেনের ভৌত ধর্ম ও হ্যালোজেনেশন বিক্রিয়া',
    isMainTopic: true,
    batch: 'batch-1',
    html: `  <!-- SECTION A3: PHYSICAL PROPERTIES & HALOGENATION OF ALKANES -->
  <section class="topic-section" id="topic-alkane-halogenation">
    <h2>অ্যালকেনসমূহের ভৌত ধর্ম ও হ্যালোজেনেশন বিক্রিয়া</h2>

    <details class="interactive-drop" open>
      <summary>জেনে রাখো: অ্যালকেনসমূহের ভৌত ধর্ম</summary>
      <div class="drop-content">
        <ul>
          <li>অ্যালকেনসমূহ অপোলার সমযোজী যৌগ।</li>
          <li>এদের অণুগুলোর মাঝে দুর্বল ভ্যানডার ওয়ালস আকর্ষণ বল কাজ করে।</li>
          <li>কার্বন সংখ্যা বৃদ্ধির সাথে অ্যালকেনসমূহের স্ফুটনাঙ্ক ক্রমশ বৃদ্ধি পায়।</li>
          <li>কক্ষ তাপমাত্রায় $\\ce{C1 - C4}$ বিশিষ্ট অ্যালকেনসমূহ গ্যাসীয়, $\\ce{C5 - C17}$ অ্যালকেনসমূহ তরল আর $\\ce{C18}$ থেকে উচ্চতর অ্যালকেনসমূহ মোমের ন্যায় কঠিন পদার্থ।</li>
        </ul>
      </div>
    </details>

    <p style="margin: 0.85rem 0;"><strong>অ্যালকেনের বিক্রিয়া:</strong> অ্যালকেন কম সক্রিয়; তাই এদের বলা হয় <strong>প্যারাফিন/আসক্তিহীন</strong>।</p>

    <h2>অ্যালকেনের হ্যালোজেনেশন</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>শর্ত</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>মৃদু সূর্যালোক</td>
            <td>
              $$\\ce{CH4 ->[h\\nu, +\\ce{Cl2}][-\\ce{HCl}] CH3Cl ->[h\\nu, +\\ce{Cl2}][-\\ce{HCl}] CH2Cl2 ->[h\\nu, +\\ce{Cl2}][-\\ce{HCl}] CHCl3 ->[h\\nu, +\\ce{Cl2}][-\\ce{HCl}] CCl4}$$
            </td>
          </tr>
          <tr>
            <td>প্রখর সূর্যালোক</td>
            <td>
              $$\\ce{CH4 + 4Cl2 ->[\\text{প্রখর সূর্যালোক}] CCl4 + 4HCl}$$
            </td>
          </tr>
          <tr>
            <td>$400^\\circ\\text{C}$ তাপমাত্রার লৌহনল</td>
            <td>
              $$\\ce{R-H + Cl2 ->[\\ce{Fe}][400^\\circ\\text{C}] R-Cl + HCl}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>Good to know: প্রোপেন ও Iso-বিউটেনের হ্যালোজেনেশন এবং সক্রিয়তার ক্রম</summary>
      <div class="drop-content">
        <p style="margin-top: 0.5rem;"><strong>প্রোপেনের ক্লোরিনেশন:</strong></p>
        $$\\ce{CH3-\\overset{2^\\circ}{C}H2-\\overset{1^\\circ}{C}H3 + Cl2 ->[\\text{আলোক}][25^\\circ\\text{C}] \\underset{\\text{n-প্রোপাইলক্লোরাইড (45\\%)}}{CH3-CH2-CH2-Cl} + \\underset{\\text{iso-প্রোপাইলক্লোরাইড (55\\%)}}{CH3-\\overset{\\overset{\\ce{Cl}}{|}}{C}H-CH3}}$$

        <p style="margin-top: 0.75rem;"><strong>প্রোপেনের ব্রোমিনেশন:</strong></p>
        $$\\ce{\\overset{1^\\circ}{C}H3-\\overset{2^\\circ}{C}H2-\\overset{1^\\circ}{C}H3 + Br2 ->[\\text{আলোক}][30^\\circ\\text{C}] \\underset{\\text{n-প্রোপাইলব্রোমাইড (5\\%)}}{CH3-CH2-CH2-Br} + \\underset{\\text{iso-প্রোপাইলব্রোমাইড (95\\%)}}{CH3-\\overset{\\overset{\\ce{Br}}{|}}{C}H-CH3}}$$

        <p style="margin-top: 0.75rem;"><strong>Iso-বিউটেনের ব্রোমিনেশন:</strong></p>
        $$\\ce{\\overset{1^\\circ}{C}H3-\\overset{\\overset{\\ce{CH3}}{|}}{\\underset{3^\\circ}{C}}H-\\overset{1^\\circ}{C}H3 + Br2 ->[300^\\circ\\text{C}] \\underset{\\text{tert-বিউটাইল ব্রোমাইড (99\\%)}}{CH3-\\overset{\\overset{\\ce{CH3}}{|}}{\\underset{\\underset{\\ce{Br}}{|}}{C}}-CH3} + \\underset{\\text{iso-বিউটাইল ব্রোমাইড (1\\%)}}{CH3-\\overset{\\overset{\\ce{CH3}}{|}}{C}H-CH2Br}}$$

        <div class="caution-box">
          <strong>অ্যালকেনের প্রতিস্থাপনের ক্ষেত্রে –</strong><br>
          • হ্যালোজেনের সক্রিয়তার ক্রম হল : $\\ce{Cl2 > Br2}$ এবং আয়োডিন দ্বারা অ্যালকেনে প্রতিস্থাপন ঘটে না।<br>
          • অ্যালকেনের $\\ce{H}$ – পরমাণু প্রতিস্থাপনের সক্রিয়তার ক্রম : $3^\\circ > 2^\\circ > 1^\\circ > \\ce{CH3-H}$
        </div>
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-alkane-reforming',
    title: '৪. অ্যালকেনের অন্যান্য বিক্রিয়া ও রিফরমিং (Reforming)',
    isMainTopic: true,
    batch: 'batch-1',
    html: `  <!-- SECTION A4: FURTHER ALKANE REACTIONS & REFORMING / AROMATIZATION -->
  <section class="topic-section" id="topic-alkane-reforming">
    <h2>অ্যালকেনের আরও কিছু বিক্রিয়া ও রিফরমিং প্রক্রিয়া</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>শর্ত ও প্রভাবক</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>পেট্রোল সংশ্লেষণ</td>
            <td>$200^\\circ\\text{C}, \\ce{Co}$<br>$5 - 10\\text{ atm}$</td>
            <td>
              $$\\ce{nCO + (2n + 1)H2 ->[200^\\circ\\text{C, Co}][5-10\\text{ atm}] \\underset{\\text{তরল অ্যালকেন}}{C_nH_{2n+2}} + nH2O}$$
            </td>
          </tr>
          <tr>
            <td>অ্যালকেনের নাইট্রেশন</td>
            <td>$400^\\circ\\text{C}$</td>
            <td>
              $$\\underset{\\text{অ্যালকেন}}{\\ce{R}}-\\boxed{\\ce{H + HO}}-\\ce{NO2 ->[400^\\circ\\text{C}] \\underset{\\text{নাইট্রোঅ্যালকেন}}{R-NO2} + H2O}$$
              $$\\ce{CH3}-\\boxed{\\ce{H + HO}}-\\ce{NO2 ->[400^\\circ\\text{C}] CH3-NO2 + H2O}$$
            </td>
          </tr>
          <tr>
            <td>অ্যালকেনের তাপীয় বিয়োজন (Pyrolysis)</td>
            <td>$500^\\circ\\text{C} - 600^\\circ\\text{C}$</td>
            <td>
              $$\\ce{3CH3-CH3 ->[500^\\circ\\text{C}] 2CH2=CH2 + 2CH4 + H2}$$
              $$\\ce{2CH3-CH2-CH3 ->[600^\\circ\\text{C}] CH3-CH=CH2 + CH2=CH2 + CH4 + H2}$$
            </td>
          </tr>
          <tr>
            <td>অ্যালকেনের সমাণুকরণ</td>
            <td>$300^\\circ\\text{C}$,<br>$\\ce{AlCl3, HCl}$</td>
            <td>
              $$\\ce{CH3-CH2-CH2-CH3 ->[\\ce{AlCl3, HCl}][300^\\circ\\text{C}] CH3-\\overset{\\overset{\\ce{CH3}}{|}}{C}H-CH3}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="caution-box">
      💡 <strong>Catalytic Cracking:</strong> $\\ce{Al2O3}$ অথবা $\\ce{SiO2}$ প্রভাবকের উপস্থিতিতে অ্যালকেনের প্রভাবকীয় তাপীয় বিয়োজন নিম্নতর তাপমাত্রায় যেমন, $400^\\circ\\text{C} - 500^\\circ\\text{C}$ এর মধ্যে ঘটে। এটাকে <strong>Catalytic cracking</strong> বলে।
    </div>

    <details class="interactive-drop" open>
      <summary>রিফরমিং প্রক্রিয়া বা অ্যারোমেটিকরণ বিক্রিয়া (Reforming / Aromatization)</summary>
      <div class="drop-content">
        <p style="margin-top: 0.5rem;"><strong>সংজ্ঞা:</strong> প্রভাবকের উপস্থিতিতে মুক্ত শিকল হাইড্রোকার্বন থেকে অ্যারোমেটিক হাইড্রোকার্বন প্রস্তুতির প্রক্রিয়াকে অ্যারোমেটিকরণ বা রিফরমিং প্রক্রিয়া (reforming) বলা হয়।</p>
        <p>n-হেক্সেন থেকে বেনজিন, n-হেপ্টেন থেকে টলুইন এবং n- অক্টেন থেকে জাইলিন পাওয়া যায়।</p>

        <div class="svg-diagram">
          <svg viewBox="0 0 860 390" width="100%" height="390" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="25,65 43,47 61,65 79,47 97,65 115,47" />
            <text x="45" y="92" fill="currentColor" stroke="none" font-size="14">n-হেক্সেন</text>

            <line x1="135" y1="56" x2="235" y2="56" />
            <polygon points="238,56 230,52 230,60" fill="currentColor" stroke="none" />
            <text x="145" y="46" fill="currentColor" stroke="none" font-size="13">Pt, Al, V<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">5</tspan></text>
            <text x="140" y="74" fill="currentColor" stroke="none" font-size="13">550°C, 15 atm</text>

            <polyline points="255,65 271,43 287,65 303,43 319,65 335,43" />
            <text x="278" y="92" fill="currentColor" stroke="none" font-size="14">হেক্সিন</text>

            <line x1="350" y1="56" x2="430" y2="56" />
            <polygon points="433,56 425,52 425,60" fill="currentColor" stroke="none" />
            <text x="360" y="45" fill="currentColor" stroke="none" font-size="13">চাক্রিকীকরণ</text>

            <polygon points="475,30 498,43 498,69 475,82 452,69 452,43" />

            <line x1="518" y1="56" x2="600" y2="56" />
            <polygon points="603,56 595,52 595,60" fill="currentColor" stroke="none" />
            <text x="532" y="46" fill="currentColor" stroke="none" font-size="13">Pt, Al<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">3</tspan></text>

            <polygon points="645,30 668,43 668,69 645,82 622,69 622,43" />
            <circle cx="645" cy="56" r="13" />
            <text x="685" y="61" fill="currentColor" stroke="none" font-size="15">+  3H<tspan dy="3" font-size="11">2</tspan></text>

            <polyline points="95,180 113,162 131,180 149,162 167,180 185,162 203,180" />
            <text x="125" y="205" fill="currentColor" stroke="none" font-size="14">n-হেপ্টেন</text>

            <line x1="220" y1="171" x2="320" y2="171" />
            <polygon points="323,171 315,167 315,175" fill="currentColor" stroke="none" />
            <text x="230" y="161" fill="currentColor" stroke="none" font-size="13">Pt, Al, V<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">5</tspan></text>
            <text x="225" y="189" fill="currentColor" stroke="none" font-size="13">550°C, 15 atm</text>

            <polygon points="365,148 388,161 388,187 365,200 342,187 342,161" />
            <line x1="365" y1="148" x2="365" y2="132" />
            <text x="353" y="127" fill="currentColor" stroke="none" font-size="13">CH<tspan dy="3" font-size="10">3</tspan></text>
            <text x="345" y="216" fill="currentColor" stroke="none" font-size="13">মিথাইল</text>
            <text x="328" y="231" fill="currentColor" stroke="none" font-size="13">সাইক্লোহেক্সেন</text>

            <line x1="408" y1="171" x2="490" y2="171" />
            <polygon points="493,171 485,167 485,175" fill="currentColor" stroke="none" />
            <text x="422" y="161" fill="currentColor" stroke="none" font-size="13">Pt/Al<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">3</tspan></text>

            <polygon points="535,148 558,161 558,187 535,200 512,187 512,161" />
            <circle cx="535" cy="174" r="13" />
            <line x1="535" y1="148" x2="535" y2="132" />
            <text x="523" y="127" fill="currentColor" stroke="none" font-size="13">CH<tspan dy="3" font-size="10">3</tspan></text>
            <text x="520" y="218" fill="currentColor" stroke="none" font-size="14">টলুইন</text>
            <text x="575" y="178" fill="currentColor" stroke="none" font-size="15">+  3H<tspan dy="3" font-size="11">2</tspan></text>

            <polyline points="15,315 31,297 47,315 63,297 79,315 95,297 111,315 127,297" />
            <text x="45" y="362" fill="currentColor" stroke="none" font-size="14">n-অক্টেন</text>

            <line x1="142" y1="306" x2="242" y2="306" />
            <polygon points="245,306 237,302 237,310" fill="currentColor" stroke="none" />
            <text x="152" y="296" fill="currentColor" stroke="none" font-size="13">Pt, Al, V<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">5</tspan></text>
            <text x="147" y="324" fill="currentColor" stroke="none" font-size="13">550°C, 15 atm</text>

            <polygon points="285,280 308,293 308,319 285,332 262,319 262,293" />
            <line x1="285" y1="280" x2="285" y2="265" />
            <text x="273" y="260" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <line x1="308" y1="293" x2="321" y2="285" />
            <text x="323" y="287" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>

            <text x="332" y="311" fill="currentColor" stroke="none" font-size="15">+</text>

            <polygon points="375,280 398,293 398,319 375,332 352,319 352,293" />
            <line x1="375" y1="280" x2="375" y2="265" />
            <text x="363" y="260" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <line x1="375" y1="332" x2="375" y2="346" />
            <text x="363" y="358" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>

            <text x="295" y="362" fill="currentColor" stroke="none" font-size="13">ডাইমিথাইল</text>
            <text x="285" y="376" fill="currentColor" stroke="none" font-size="13">সাইক্লোহেক্সেন</text>

            <line x1="415" y1="306" x2="495" y2="306" />
            <polygon points="498,306 490,302 490,310" fill="currentColor" stroke="none" />
            <text x="428" y="296" fill="currentColor" stroke="none" font-size="13">Pt, Al<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">3</tspan></text>

            <polygon points="540,280 563,293 563,319 540,332 517,319 517,293" />
            <circle cx="540" cy="306" r="13" />
            <line x1="540" y1="280" x2="540" y2="265" />
            <text x="528" y="260" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <line x1="563" y1="293" x2="576" y2="285" />
            <text x="578" y="287" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <text x="515" y="368" fill="currentColor" stroke="none" font-size="13">অর্থো জাইলিন</text>

            <text x="598" y="311" fill="currentColor" stroke="none" font-size="15">+</text>

            <polygon points="645,280 668,293 668,319 645,332 622,319 622,293" />
            <circle cx="645" cy="306" r="13" />
            <line x1="645" y1="280" x2="645" y2="265" />
            <text x="633" y="260" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <line x1="645" y1="332" x2="645" y2="346" />
            <text x="633" y="358" fill="currentColor" stroke="none" font-size="12">CH<tspan dy="3" font-size="9">3</tspan></text>
            <text x="618" y="372" fill="currentColor" stroke="none" font-size="13">প্যারা জাইলিন</text>

            <text x="685" y="311" fill="currentColor" stroke="none" font-size="15">+  6H<tspan dy="3" font-size="11">2</tspan></text>
          </svg>
        </div>
      </div>
    </details>
  </section>`
  }
];

/**
 * Batch 2: Reforming Summary Table, Alkene Preparation, Electrophilic Addition & Markovnikov (Pages 5-7)
 */
export const BATCH_2_SECTIONS: TopicItem[] = [
  {
    id: 'topic-reforming-table',
    title: 'রিফরমিং (অ্যারোমেটিকরণ) বিক্রিয়ার সারণি',
    isMainTopic: false,
    batch: 'batch-2',
    html: `  <!-- SECTION B1: REFORMING / AROMATIZATION SUMMARY TABLE -->
  <section class="topic-section" id="topic-reforming-table">
    <h2>রিফরমিং (অ্যারোমেটিকরণ) বিক্রিয়ার প্রভাবক ও উৎপাদ</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>যৌগ</th>
            <th>প্রভাবক</th>
            <th>উৎপাদ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>n-হেক্সেন</td>
            <td>$\\ce{Pt, Al, V2O5, Al2O3}$</td>
            <td>বেনজিন</td>
          </tr>
          <tr>
            <td>n-হেপ্টেন</td>
            <td>$\\ce{Pt, Al, V2O5, Al2O3}$</td>
            <td>টলুইন</td>
          </tr>
          <tr>
            <td>n- অক্টেন</td>
            <td>$\\ce{Pt, Al, V2O5, Al2O3}$</td>
            <td>জাইলিন/ইথাইল বেনজিন</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`
  },
  {
    id: 'topic-alkene-prep',
    title: '৫. অ্যালকিনের প্রস্তুত প্রণালী',
    isMainTopic: true,
    batch: 'batch-2',
    html: `  <!-- SECTION B2: ALKENE INTRO & PREPARATION -->
  <section class="topic-section" id="topic-alkene-prep">
    <div class="topic-badge">অ্যালকিন</div>
    <p><strong>সাধারণ সংকেত:</strong> অ্যালকিনের সাধারণ সংকেত $\\ce{C_nH_{2n}}$। এরা অসম্পৃক্ত যৌগ এবং দ্বি-বন্ধনযুক্ত দুটি কার্বনের মাঝে একটি $\\pi$ বন্ধন থাকে।</p>

    <h2>অ্যালকিনের সাধারণ প্রস্তুত প্রণালী</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>শর্ত ও প্রভাবক</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(i) অ্যালকোহলের প্রভাবকীয় নিরুদন</td>
            <td>$\\ce{Al2O3}$,<br>$350^\\circ - 400^\\circ\\text{C}$</td>
            <td>
              $$\\underset{\\text{অ্যালকোহল}}{\\ce{RCH2-CH2-OH}} \\xrightarrow{\\ce{Al2O3}, \\Delta} \\underset{\\text{অ্যালকিন-1}}{\\ce{RCH=CH2}} + \\ce{H2O}$$
              $$\\ce{CH3CH2-CH2-OH ->[\\ce{Al2O3}][350^\\circ - 400^\\circ\\text{C}] CH3CH=CH2 + H2O}$$
            </td>
          </tr>
          <tr>
            <td>(ii) $\\ce{H2SO4}$ বা $\\ce{H3PO4}$ দ্বারা অ্যালকোহলের নিরুদন</td>
            <td>$170^\\circ\\text{C}$</td>
            <td>
              $$\\ce{R-CH2-CH2-OH + H2SO4 ->[100^\\circ\\text{C}] R-CH2-CH2-OSO3H + H2O}$$
              $$\\ce{R-CH2-CH2-OSO3H ->[\\Delta][170^\\circ\\text{C}] R-CH=CH2 + H2SO4}$$
            </td>
          </tr>
          <tr>
            <td>(iii) ভিসিনাল (সন্নিহিত) ডাইহ্যালাইড থেকে</td>
            <td>$\\ce{Zn}$</td>
            <td>
              $$\\ce{R-\\overset{\\overset{\\ce{X}}{|}}{C}H-\\overset{\\overset{\\ce{X}}{|}}{C}H2 ->[\\ce{Zn}] R-CH=CH2 + ZnX2}$$
            </td>
          </tr>
          <tr>
            <td>(iv) হ্যালোঅ্যালকেন থেকে</td>
            <td>তাপ,<br>$\\ce{KOH(alc.)}$</td>
            <td>
              $$\\ce{R-CH2-CH2-X + KOH(alc.) ->[\\text{তাপ}] R-CH=CH2 + KX + H2O}$$
              $$\\ce{R-CH2-\\overset{\\overset{\\ce{X}}{|}}{C}H-CH3 + KOH(alc.) ->[\\text{তাপ}]} \\underset{\\text{(major)}}{\\ce{R-CH=CH-CH3}} + \\underset{\\text{(minor)}}{\\ce{R-CH2-CH=CH2}}$$
            </td>
          </tr>
          <tr>
            <td>(v) অ্যালকাইনের নিয়ন্ত্রিত বিজারণ</td>
            <td>$\\ce{Pd - BaSO4}$,<br>$200^\\circ\\text{C}$</td>
            <td>
              $$\\ce{CH#CH + H2 ->[\\ce{Pd-BaSO4}][200^\\circ\\text{C}] CH2=CH2}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="caution-box">
      ⚠️ <strong>সাবধানতা:</strong> অতিরিক্ত অ্যালকোহলকে $140^\\circ\\text{C}$ তাপমাত্রায় নিরুদক গাঢ় $\\ce{H2SO4}$ মিশ্রণের উপর দিয়ে চালনা করলে অ্যালকিনের পরিবর্তে ইথার তৈরি হবে।
    </div>

    <details class="interactive-drop" open>
      <summary>বিক্রিয়া (iv) ও (v) এর গুরুত্বপূর্ণ তথ্য ও কৌশল (Important Notes)</summary>
      <div class="drop-content">
        <ul>
          <li>এটি একটি অপসারণ বিক্রিয়া। এখানে <strong>সাইজেফ নীতি</strong> প্রযোজ্য হবে।</li>
          <li>$3^\\circ \\ce{RX}$ $\\text{E}_1$ বিক্রিয়া দেয়। $1^\\circ \\ce{RX}$ $\\text{E}_2$ বিক্রিয়া দেয়।</li>
          <li>$\\ce{KOH_{(alc)}}$ এর পরিবর্তে $\\ce{KOH_{(aq)}}$ ব্যবহার করলে প্রতিস্থাপন বিক্রিয়া সংঘটিত হবে এবং অ্যালকোহল উৎপন্ন হবে।</li>
          <li>এক্ষেত্রে $\\ce{Pd}$ প্রভাবক এবং $\\ce{BaSO4}$ প্রভাবক বিষ হিসেবে কাজ করে। অন্যথায় অ্যালকিন পুনরায় বিজারিত হয়ে অ্যালকেন তৈরি করতো।</li>
          <li>প্রভাবক হিসেবে $\\ce{Pd}-$সিলিকাজেলও ব্যবহার করা যায়।</li>
        </ul>
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-markovnikov',
    title: '৬. ইলেকট্রোফিলিক সংযোজন ও মার্কনিকভের নীতি',
    isMainTopic: true,
    batch: 'batch-2',
    html: `  <!-- SECTION B3: ELECTROPHILIC ADDITION, MARKOVNIKOV & ANTI-MARKOVNIKOV -->
  <section class="topic-section" id="topic-markovnikov">
    <h2>অ্যালকিনের ইলেকট্রোফিলিক সংযোজন বিক্রিয়া (সাধারণ কৌশল)</h2>

    <div class="svg-diagram">
      <svg viewBox="0 0 760 220" width="100%" height="220" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top Row: General Electrophilic Addition -->
        <line x1="34" y1="40" x2="48" y2="50" />
        <line x1="34" y1="64" x2="48" y2="54" />
        <text x="56" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="66" y1="50" x2="82" y2="50" />
        <line x1="66" y1="55" x2="82" y2="55" />
        <text x="92" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="100" y1="50" x2="114" y2="40" />
        <line x1="100" y1="54" x2="114" y2="64" />
        <text x="74" y="88" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">(অ্যালকিন)</text>

        <!-- Curved arrow from pi bond to right C -->
        <path d="M 74 46 Q 82 32 90 42" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="91,44 85,40 90,37" fill="#38bdf8" stroke="none" />

        <text x="132" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">+</text>
        <text x="158" y="58" fill="currentColor" stroke="none" font-size="18" font-weight="bold" text-anchor="middle">A</text>
        <text x="169" y="46" fill="currentColor" stroke="none" font-size="13" font-weight="bold" text-anchor="middle">+</text>

        <!-- Curved arrow from right C to A+ -->
        <path d="M 96 40 Q 126 20 152 40" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="154,42 146,39 150,34" fill="#38bdf8" stroke="none" />

        <!-- Arrow 1 -->
        <line x1="184" y1="52" x2="236" y2="52" />
        <polygon points="239,52 231,48 231,56" fill="currentColor" stroke="none" />

        <!-- Carbocation Intermediate: >C+ – C(|)(|) – A -->
        <line x1="254" y1="40" x2="268" y2="50" />
        <line x1="254" y1="64" x2="268" y2="54" />
        <text x="276" y="40" fill="currentColor" stroke="none" font-size="14" font-weight="bold" text-anchor="middle">+</text>
        <text x="276" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="286" y1="52" x2="302" y2="52" />
        <text x="312" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="312" y1="30" x2="312" y2="43" />
        <line x1="312" y1="63" x2="312" y2="76" />
        <line x1="322" y1="52" x2="338" y2="52" />
        <text x="348" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">A</text>
        <text x="306" y="96" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">(অস্থায়ী কার্বোনিয়াম আয়ন)</text>

        <!-- Arrow 2 -->
        <text x="412" y="42" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">B<tspan dy="-5" font-size="12">−</tspan></text>
        <line x1="376" y1="52" x2="448" y2="52" />
        <polygon points="451,52 443,48 443,56" fill="currentColor" stroke="none" />
        <text x="412" y="72" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">খুব দ্রুত</text>

        <!-- Product: B – C(|)(|) – C(|)(|) – A -->
        <text x="472" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">B</text>
        <line x1="482" y1="52" x2="498" y2="52" />
        <text x="508" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="508" y1="30" x2="508" y2="43" />
        <line x1="508" y1="63" x2="508" y2="76" />
        <line x1="518" y1="52" x2="534" y2="52" />
        <text x="544" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">C</text>
        <line x1="544" y1="30" x2="544" y2="43" />
        <line x1="544" y1="63" x2="544" y2="76" />
        <line x1="554" y1="52" x2="570" y2="52" />
        <text x="580" y="58" fill="currentColor" stroke="none" font-size="18" text-anchor="middle">A</text>
        <text x="526" y="96" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">(যুত যৌগ)</text>

        <!-- Bottom Row: Ethene + HCl Example -->
        <text x="96" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">CH<tspan dy="3" font-size="12">2</tspan></text>
        <line x1="116" y1="160" x2="132" y2="160" />
        <line x1="116" y1="165" x2="132" y2="165" />
        <text x="152" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">CH<tspan dy="3" font-size="12">2</tspan></text>
        <text x="180" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">+</text>
        <text x="200" y="149" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">+</text>
        <text x="200" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">H</text>
        <text x="220" y="149" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">−</text>
        <text x="220" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">Cl</text>

        <!-- Curved arrow from pi bond to right CH2 -->
        <path d="M 124 156 Q 136 142 148 152" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="150,154 142,151 146,146" fill="#38bdf8" stroke="none" />

        <line x1="244" y1="162" x2="296" y2="162" />
        <polygon points="299,162 291,158 291,166" fill="currentColor" stroke="none" />

        <!-- Ethyl Carbocation + Cl- -->
        <text x="326" y="149" fill="currentColor" stroke="none" font-size="13" font-weight="bold" text-anchor="middle">+</text>
        <text x="326" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">CH<tspan dy="3" font-size="12">2</tspan></text>
        <line x1="346" y1="162" x2="362" y2="162" />
        <text x="382" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">CH<tspan dy="3" font-size="12">3</tspan></text>
        <text x="410" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">+</text>
        <text x="434" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">Cl<tspan dy="-6" font-size="12">−</tspan></text>

        <!-- Curved arrow from CH2+ to Cl- -->
        <path d="M 332 148 Q 380 130 426 148" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="428,150 420,148 424,143" fill="#38bdf8" stroke="none" />
        <text x="366" y="196" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">(ইথাইল কার্বোনিয়াম আয়ন)</text>

        <line x1="460" y1="162" x2="524" y2="162" />
        <polygon points="527,162 519,158 519,166" fill="currentColor" stroke="none" />
        <text x="492" y="152" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">খুব দ্রুত</text>

        <text x="564" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">ClCH<tspan dy="3" font-size="12">2</tspan></text>
        <line x1="592" y1="162" x2="608" y2="162" />
        <text x="628" y="168" fill="currentColor" stroke="none" font-size="17" text-anchor="middle">CH<tspan dy="3" font-size="12">3</tspan></text>
      </svg>
    </div>

    <details class="interactive-drop" open>
      <summary>মার্কনিকভের নীতি ও এন্টিমার্কনিকভ নীতি / বিপরীত মার্কনিকভ নীতি (খারাস এর পার অক্সাইড ফলাফল)</summary>
      <div class="drop-content">
        <p style="margin-top:0.75rem"><strong>মার্কনিকভের নীতি:</strong> “অপ্রতিসম অ্যালকিন এবং অপ্রতিসম বিকারকের সংযোজন বিক্রিয়ার ক্ষেত্রে বিকারক অণুর $\\ce{H}$ বা আপেক্ষিক ধনাত্মক ($\\delta+$) অংশ সেই কার্বনের সাথে যুক্ত হবে যার সাথে আগের থেকে যুক্ত $\\ce{H}$ সংখ্যা বেশি।” সুতরাং, মার্কনিকভের নীতিকে নিচের প্রবাদ দ্বারা প্রকাশ করা যায়- <em>“তেলা মাথায় তেল দেওয়া”</em>। এর মূল কারণ $\\rightarrow 2^\\circ$ কার্বোক্যাটায়ন $> 1^\\circ$ কার্বোক্যাটায়ন (স্থিতিশীলতা)</p>

        <div class="svg-diagram">
          <svg viewBox="0 0 780 155" width="100%" height="155" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- Propene: CH3(32) – CH(76) = CH2(124) -->
            <text x="32" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="50" y1="83" x2="62" y2="83" />
            <text x="76" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH</text>
            <line x1="90" y1="80" x2="106" y2="80" />
            <line x1="90" y1="85" x2="106" y2="85" />
            <text x="124" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>

            <!-- Curved arrow between CH2(124) and H+Br-(182) -->
            <path d="M 124 70 Q 152 44 178 62" stroke="#38bdf8" stroke-width="1.8" fill="none" />
            <polygon points="180,64 172,62 176,57" fill="#38bdf8" stroke="none" />

            <text x="190" y="76" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H<tspan dy="-5" font-size="11">+</tspan><tspan dy="5">Br</tspan><tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="150" y1="84" x2="235" y2="84" />

            <line x1="235" y1="42" x2="235" y2="122" />
            <line x1="235" y1="42" x2="275" y2="42" />
            <polygon points="278,42 270,38 270,46" fill="currentColor" stroke="none" />
            <line x1="235" y1="122" x2="275" y2="122" />
            <polygon points="278,122 270,118 270,126" fill="currentColor" stroke="none" />

            <!-- Top Branch: 2° Carbocation CH3(304) – CH+(348) – CH3(392) -->
            <text x="304" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="322" y1="41" x2="334" y2="41" />
            <text x="348" y="29" fill="currentColor" stroke="none" font-size="13" font-weight="bold" text-anchor="middle">+</text>
            <text x="348" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH</text>
            <line x1="362" y1="41" x2="374" y2="41" />
            <text x="392" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <text x="348" y="68" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">2° কার্বোক্যাটায়ন (90%)</text>

            <text x="476" y="34" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">Br<tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="445" y1="42" x2="510" y2="42" />
            <polygon points="513,42 505,38 505,46" fill="currentColor" stroke="none" />

            <text x="595" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CHBr–CH</tspan><tspan dy="3" font-size="11">3</tspan></text>
            <text x="595" y="68" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">90%</text>

            <!-- Bottom Branch: 1° Carbocation CH3(304) – CH2(350) – CH2+(398) -->
            <text x="304" y="126" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="322" y1="121" x2="334" y2="121" />
            <text x="352" y="126" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>
            <line x1="370" y1="121" x2="382" y2="121" />
            <text x="400" y="109" fill="currentColor" stroke="none" font-size="13" font-weight="bold" text-anchor="middle">+</text>
            <text x="400" y="126" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>
            <text x="352" y="146" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">1° কার্বোক্যাটায়ন (10%)</text>

            <text x="476" y="114" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">Br<tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="445" y1="122" x2="510" y2="122" />
            <polygon points="513,122 505,118 505,126" fill="currentColor" stroke="none" />

            <text x="595" y="126" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="595" y="146" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">10%</text>
          </svg>
        </div>

        <p style="margin-top:1rem"><strong>এন্টিমার্কনিকভ নীতি/ বিপরীত মার্কনিকভ নীতি (খারাস এর পার অক্সাইড ফলাফল):</strong> $\\ce{R2O2}$ বা, $\\ce{H2O2}$ এর উপস্থিতিতে মার্কনিকভের নিয়মের ঠিক উল্টোটা ঘটে অর্থাৎ যে কার্বনে কম সংখ্যক $\\ce{H}$ যুক্ত আছে, বিকারকের $\\ce{H}$ সেই কার্বনে যুক্ত হয়। এর কারণ $2^\\circ \\text{ free radical} > 1^\\circ \\text{ free radical}$ (স্থিতিশীলতা)</p>

        <div class="svg-diagram">
          <svg viewBox="0 0 780 185" width="100%" height="185" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- Propene: CH3(32) – CH(76) = CH2(124) -->
            <text x="32" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="50" y1="83" x2="62" y2="83" />
            <text x="76" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH</text>
            <line x1="90" y1="80" x2="106" y2="80" />
            <line x1="90" y1="85" x2="106" y2="85" />
            <text x="124" y="88" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>

            <text x="182" y="76" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">HBr</text>
            <line x1="145" y1="84" x2="225" y2="84" />
            <text x="182" y="103" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">R<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">2</tspan></text>

            <line x1="182" y1="112" x2="182" y2="142" />
            <polygon points="182,145 178,137 186,137" fill="currentColor" stroke="none" />
            <text x="182" y="164" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">Br<tspan dy="-6" font-size="13">•</tspan><tspan dy="6"> + ROH</tspan></text>

            <!-- Curved arrow from Br• to terminal CH2(124) -->
            <path d="M 142 158 Q 124 148 124 100" stroke="#38bdf8" stroke-width="1.8" fill="none" />
            <polygon points="124,97 120,105 128,105" fill="#38bdf8" stroke="none" />

            <line x1="225" y1="42" x2="225" y2="128" />
            <line x1="225" y1="42" x2="265" y2="42" />
            <polygon points="268,42 260,38 260,46" fill="currentColor" stroke="none" />
            <line x1="225" y1="128" x2="265" y2="128" />
            <polygon points="268,128 260,124 260,132" fill="currentColor" stroke="none" />

            <!-- Top Branch: 2° Free Radical CH3(296) – CH•(340) – CH2Br(396) -->
            <text x="296" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="314" y1="41" x2="326" y2="41" />
            <text x="340" y="30" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">•</text>
            <text x="340" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH</text>
            <line x1="354" y1="41" x2="366" y2="41" />
            <text x="396" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="348" y="66" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">2° মুক্ত মূলক</text>
            <text x="348" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বেশি স্থিতিশীল (99.1%)</text>

            <text x="482" y="34" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H<tspan dy="-6" font-size="13">•</tspan></text>
            <line x1="450" y1="42" x2="515" y2="42" />
            <polygon points="518,42 510,38 510,46" fill="currentColor" stroke="none" />

            <text x="598" y="46" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="598" y="68" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">99.1%</text>

            <!-- Bottom Branch: 1° Free Radical CH3(296) – CHBr(348) – CH2•(404) -->
            <text x="296" y="132" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="314" y1="127" x2="324" y2="127" />
            <text x="348" y="132" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CHBr</text>
            <line x1="372" y1="127" x2="384" y2="127" />
            <text x="404" y="116" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">•</text>
            <text x="404" y="132" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>
            <text x="348" y="152" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">1° মুক্তমূলক (0.9%)</text>

            <text x="482" y="120" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H<tspan dy="-6" font-size="13">•</tspan></text>
            <line x1="450" y1="128" x2="515" y2="128" />
            <polygon points="518,128 510,124 510,132" fill="currentColor" stroke="none" />

            <text x="598" y="132" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CHBr–CH</tspan><tspan dy="3" font-size="11">3</tspan></text>
            <text x="598" y="152" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">0.9%</text>
          </svg>
        </div>
      </div>
    </details>

    <div class="caution-box">
      ❗ <strong>সতর্কতা!</strong> শুধুমাত্র $\\ce{HBr}$ এন্টিমার্কনিকভ নিয়ম অনুযায়ী বিক্রিয়া করে।
    </div>
  </section>`
  }
];

/**
 * Batch 3 (Pages 8, 9, and 10 from current upload):
 * - Section C1 (id="topic-alkene-addition-ozonolysis"): অ্যালকিনের সংযোজন ও ওজোনীকরণ বিক্রিয়া (Ozonolysis)
 * - Section C2 (id="topic-alkene-oxidation-tests"): প্রবল জারক দ্বারা অ্যালকিনের জারণ ও শনাক্তকরণ পরীক্ষা
 */
export const BATCH_3_SECTIONS: TopicItem[] = [
  {
    id: 'topic-alkene-addition-ozonolysis',
    title: '৭. অ্যালকিনের সংযোজন ও ওজোনীকরণ বিক্রিয়া',
    isMainTopic: true,
    batch: 'batch-3',
    html: `  <!-- SECTION C1: ALKENE ADDITION REACTIONS & OZONOLYSIS (From Page 8, 9 & Top of Page 10) -->
  <section class="topic-section" id="topic-alkene-addition-ozonolysis">
    <h2>অ্যালকিনের সংযোজন বিক্রিয়া</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>শর্ত ও প্রভাবক</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$\\ce{H2}$ সংযোজন</td>
            <td>$\\ce{Ni}, 150^\\circ - 200^\\circ\\text{C}$</td>
            <td>
              $$\\ce{R-CH=CH2 + H2 ->[\\ce{Ni}][150^\\circ-200^\\circ\\text{C}] R-CH2-CH3}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{X2}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\ce{R-CH=CH2 + X2 -> R-CHX-CH2X}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{HX}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\ce{R-CH=CH2 + HX -> R-CHX-CH3}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{HOX}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\underset{\\text{ইথিন}}{\\ce{CH2=CH2}} + \\ce{H\\overset{-}{O}\\overset{+}{Cl}} \\longrightarrow \\underset{\\text{ইথিলিন ক্লোরো হাইড্রিন}}{\\ce{ClCH2-CH2OH}}$$
              $$\\underset{\\text{প্রোপিন বা প্রোপিলিন}}{\\ce{CH3CH=CH2}} + \\ce{H\\overset{-}{O}\\overset{+}{Br}} \\longrightarrow \\underset{\\text{প্রোপিলিন ব্রোমোহাইড্রিন বা 1-ব্রোমো-2-প্রোপানল}}{\\ce{CH3CH(OH)-CH2Br}}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{H2SO4}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\underset{\\text{অ্যালকিন-1}}{\\ce{R-CH=CH2}} + \\underset{\\text{সালফিউরিক এসিড}}{\\ce{H-OSO3H}} \\longrightarrow \\underset{\\text{iso-অ্যালকাইল হাইড্রোজেন সালফেট}}{\\ce{R-\\underset{\\underset{\\ce{OSO3H}}{|}}{C}H-CH3}} \\xrightarrow[\\Delta]{\\ce{H2O}} \\underset{2^\\circ \\text{ অ্যালকোহল}}{\\ce{R-\\underset{\\underset{\\ce{OH}}{|}}{C}H-CH3}} + \\ce{H2SO4}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>$\\ce{HOX}$ ও $\\ce{H2SO4}$ সংযোজন বিক্রিয়ার গুরুত্বপূর্ণ তথ্য ও কৌশল (Important Notes)</summary>
      <div class="drop-content">
        <p style="margin-top: 0.4rem;"><strong>$\\ce{HOX}$ সংযোজনের বৈশিষ্ট্য:</strong></p>
        <ul>
          <li>হাইপোহ্যালাস এসিড অ্যালকিনের সাথে বিক্রিয়ায় হ্যালোহাইড্রিন উৎপন্ন করে।</li>
          <li>মার্কনিকভের নিয়ম এক্ষেত্রে অনুসৃত হয়; তবে $\\ce{OH-}$ মূলক ঋণাত্মক ও হ্যালোজেন পরমাণু ধনাত্মক ($\\ce{X+}$) রূপে ক্রিয়া করে।</li>
        </ul>
        <p style="margin-top: 0.6rem;"><strong>$\\ce{H2SO4}$ সংযোজনের বৈশিষ্ট্য:</strong></p>
        <ul>
          <li>কক্ষ তাপমাত্রায় গাঢ় $\\ce{H2SO4}$ অ্যালকিনের সঙ্গে যুত বিক্রিয়ায় অ্যালকাইল হাইড্রোজেন সালফেট গঠন করে।</li>
          <li>এক্ষেত্রেও অপ্রতিসম অ্যালকিনের বেলায় মার্কনিকভের সূত্র প্রযোজ্য। উৎপন্ন যুত যৌগের আর্দ্র বিশ্লেষণে অ্যালকোহল উৎপন্ন হয়।</li>
        </ul>
      </div>
    </details>

    <details class="interactive-drop" open>
      <summary>ওজোন সংযোজন বিক্রিয়া (ওজোনীকরণ বিক্রিয়া) ও দ্বিবন্ধনের অবস্থান নির্ণয়</summary>
      <div class="drop-content">
        <ul style="margin: 0.75rem 0 1rem 1.25rem;">
          <li>অ্যালকিনের গঠন ও দ্বি-বন্ধনের অবস্থান অনুযায়ী অ্যালডিহাইড বা কিটোন ও $\\ce{H2O2}$ উৎপন্ন হয়।</li>
          <li>$\\ce{Zn}$ ব্যবহার করলে নিম্নোক্ত বিক্রিয়া ঘটে যার ফলে $\\ce{H2O2}$ জারক হিসেবে কাজ করতে পারে না। নতুবা তা উৎপন্ন অ্যালডিহাইডকে জারিত করে কার্বক্সিলিক এসিডে পরিণত করতে পারে।
            $$\\ce{Zn + H2O2 -> ZnO + H2O}$$
          </li>
          <li>$\\ce{H2O2}$ দুর্বল জারক বিধায় তা কিটোন $\\ce{CH3COCH3}$ কে জারিত করতে পারে না।</li>
        </ul>

        <p><strong>যেমন:</strong></p>

        <!-- Custom Adaptive SVG for Ozonolysis Reactions (a), (b), and (c) -->
        <div class="svg-diagram">
          <svg viewBox="0 0 820 435" width="100%" height="435" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- ================= REACTION (a): But-1-ene ================= -->
            <text x="16" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">(a)</text>
            <text x="48" y="52" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">4</text>
            <text x="48" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="65" y1="65" x2="77" y2="65" />
            <text x="94" y="52" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">3</text>
            <text x="94" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>
            <line x1="111" y1="65" x2="123" y2="65" />
            <text x="137" y="52" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">2</text>
            <text x="137" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH</text>
            <line x1="151" y1="62" x2="165" y2="62" />
            <line x1="151" y1="67" x2="165" y2="67" />
            <text x="182" y="52" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">1</text>
            <text x="182" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">2</tspan></text>

            <text x="228" y="57" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O<tspan dy="3" font-size="10">3</tspan></text>
            <line x1="204" y1="65" x2="252" y2="65" />
            <polygon points="255,65 247,61 247,69" fill="currentColor" stroke="none" />
            <text x="228" y="83" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">CHCl<tspan dy="3" font-size="10">3</tspan></text>

            <!-- Ozonide Ring (a): Left vertex C at x=352, Top O at x=375, Right vertex C at x=398 -->
            <text x="336" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">–</tspan></text>
            <text x="348" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">HC</text>
            <text x="375" y="38" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="354" y1="56" x2="368" y2="40" />
            <line x1="396" y1="56" x2="382" y2="40" />
            <text x="392" y="70" fill="currentColor" stroke="none" font-size="15" text-anchor="start">CH<tspan dy="3" font-size="11">2</tspan></text>
            <line x1="354" y1="76" x2="354" y2="96" />
            <line x1="396" y1="76" x2="396" y2="96" />
            <text x="354" y="111" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <text x="396" y="111" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="363" y1="106" x2="387" y2="106" />
            <!-- Dotted cleavage lines -->
            <line x1="363" y1="32" x2="391" y2="62" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="387" y1="32" x2="359" y2="62" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="375" y1="92" x2="375" y2="118" stroke="#f59e0b" stroke-dasharray="3 3" />

            <!-- Branched Arrows (a) -->
            <line x1="432" y1="65" x2="452" y2="65" />
            <polygon points="455,65 448,61 448,69" fill="currentColor" stroke="none" />
            <line x1="458" y1="34" x2="458" y2="98" />
            <line x1="458" y1="34" x2="525" y2="34" />
            <polygon points="528,34 520,30 520,38" fill="currentColor" stroke="none" />
            <text x="490" y="25" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="490" y="49" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">Zn</text>
            <text x="536" y="39" fill="currentColor" stroke="none" font-size="15">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">CHO + HCHO + ZnO</tspan></text>

            <line x1="458" y1="98" x2="525" y2="98" />
            <polygon points="528,98 520,94 520,102" fill="currentColor" stroke="none" />
            <text x="490" y="89" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="536" y="103" fill="currentColor" stroke="none" font-size="15">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">COOH + HCOOH + H</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">O</tspan></text>

            <!-- ================= REACTION (b): But-2-ene ================= -->
            <text x="16" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">(b)</text>
            <text x="52" y="182" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">4</text>
            <text x="52" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="69" y1="195" x2="79" y2="195" />
            <text x="93" y="182" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">3</text>
            <text x="93" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH</text>
            <line x1="107" y1="192" x2="121" y2="192" />
            <line x1="107" y1="197" x2="121" y2="197" />
            <text x="135" y="182" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">2</text>
            <text x="135" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH</text>
            <line x1="149" y1="195" x2="159" y2="195" />
            <text x="176" y="182" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">1</text>
            <text x="176" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>

            <text x="228" y="187" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O<tspan dy="3" font-size="10">3</tspan></text>
            <line x1="204" y1="195" x2="252" y2="195" />
            <polygon points="255,195 247,191 247,199" fill="currentColor" stroke="none" />
            <text x="228" y="213" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">CHCl<tspan dy="3" font-size="10">3</tspan></text>

            <!-- Ozonide Ring (b): Left vertex at x=354, Top O at x=375, Right vertex at x=396 -->
            <text x="336" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–</tspan></text>
            <text x="348" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">HC</text>
            <text x="375" y="168" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="354" y1="186" x2="368" y2="170" />
            <line x1="396" y1="186" x2="382" y2="170" />
            <text x="392" y="200" fill="currentColor" stroke="none" font-size="15" text-anchor="start">CH–CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="354" y1="206" x2="354" y2="226" />
            <line x1="396" y1="206" x2="396" y2="226" />
            <text x="354" y="241" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <text x="396" y="241" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="363" y1="236" x2="387" y2="236" />
            <line x1="363" y1="162" x2="391" y2="192" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="387" y1="162" x2="359" y2="192" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="375" y1="222" x2="375" y2="248" stroke="#f59e0b" stroke-dasharray="3 3" />

            <!-- Branched Arrows (b) -->
            <line x1="452" y1="195" x2="468" y2="195" />
            <polygon points="471,195 464,191 464,199" fill="currentColor" stroke="none" />
            <line x1="474" y1="164" x2="474" y2="228" />
            <line x1="474" y1="164" x2="532" y2="164" />
            <polygon points="535,164 527,160 527,168" fill="currentColor" stroke="none" />
            <text x="502" y="155" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="502" y="179" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">Zn</text>
            <text x="542" y="169" fill="currentColor" stroke="none" font-size="15">2CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3"> – CHO + ZnO</tspan></text>

            <line x1="474" y1="228" x2="532" y2="228" />
            <polygon points="535,228 527,224 527,232" fill="currentColor" stroke="none" />
            <text x="502" y="219" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="542" y="233" fill="currentColor" stroke="none" font-size="15">2CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">COOH + H</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">O</tspan></text>

            <!-- ================= REACTION (c): 2,3-Dimethylbut-2-ene ================= -->
            <text x="16" y="346" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">(c)</text>
            <text x="54" y="308" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">4</text>
            <text x="64" y="324" fill="currentColor" stroke="none" font-size="14" text-anchor="end">H<tspan dy="3" font-size="10">3</tspan><tspan dy="-3">C</tspan></text>
            <text x="64" y="366" fill="currentColor" stroke="none" font-size="14" text-anchor="end">H<tspan dy="3" font-size="10">3</tspan><tspan dy="-3">C</tspan></text>
            <line x1="68" y1="322" x2="82" y2="336" />
            <line x1="68" y1="360" x2="82" y2="346" />
            <text x="90" y="328" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">3</text>
            <text x="90" y="346" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
            <line x1="99" y1="339" x2="115" y2="339" />
            <line x1="99" y1="343" x2="115" y2="343" />
            <text x="124" y="328" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">2</text>
            <text x="124" y="346" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
            <line x1="132" y1="336" x2="146" y2="322" />
            <line x1="132" y1="346" x2="146" y2="360" />
            <text x="160" y="308" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">1</text>
            <text x="150" y="324" fill="currentColor" stroke="none" font-size="14" text-anchor="start">CH<tspan dy="3" font-size="10">3</tspan></text>
            <text x="150" y="366" fill="currentColor" stroke="none" font-size="14" text-anchor="start">CH<tspan dy="3" font-size="10">3</tspan></text>

            <text x="228" y="332" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O<tspan dy="3" font-size="10">3</tspan></text>
            <line x1="204" y1="340" x2="252" y2="340" />
            <polygon points="255,340 247,336 247,344" fill="currentColor" stroke="none" />
            <text x="228" y="358" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">CHCl<tspan dy="3" font-size="10">3</tspan></text>

            <!-- Ozonide Ring (c): Left C at x=330, Top O at x=352, Right C at x=374 -->
            <text x="304" y="324" fill="currentColor" stroke="none" font-size="13" text-anchor="end">H<tspan dy="3" font-size="9">3</tspan><tspan dy="-3">C</tspan></text>
            <text x="304" y="364" fill="currentColor" stroke="none" font-size="13" text-anchor="end">H<tspan dy="3" font-size="9">3</tspan><tspan dy="-3">C</tspan></text>
            <line x1="308" y1="322" x2="322" y2="336" />
            <line x1="308" y1="358" x2="322" y2="344" />
            <text x="330" y="346" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>

            <text x="352" y="314" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="334" y1="332" x2="346" y2="316" />
            <line x1="370" y1="332" x2="358" y2="316" />

            <text x="374" y="346" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
            <line x1="382" y1="336" x2="396" y2="322" />
            <line x1="382" y1="344" x2="396" y2="358" />
            <text x="400" y="324" fill="currentColor" stroke="none" font-size="13" text-anchor="start">CH<tspan dy="3" font-size="9">3</tspan></text>
            <text x="400" y="364" fill="currentColor" stroke="none" font-size="13" text-anchor="start">CH<tspan dy="3" font-size="9">3</tspan></text>

            <line x1="330" y1="352" x2="330" y2="372" />
            <line x1="374" y1="352" x2="374" y2="372" />
            <text x="330" y="387" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <text x="374" y="387" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
            <line x1="339" y1="382" x2="365" y2="382" />
            <line x1="340" y1="308" x2="368" y2="338" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="364" y1="308" x2="336" y2="338" stroke="#f59e0b" stroke-dasharray="3 3" />
            <line x1="352" y1="368" x2="352" y2="394" stroke="#f59e0b" stroke-dasharray="3 3" />

            <!-- Branched Arrows (c) -->
            <line x1="436" y1="340" x2="452" y2="340" />
            <polygon points="455,340 448,336 448,344" fill="currentColor" stroke="none" />
            <line x1="458" y1="310" x2="458" y2="374" />
            <line x1="458" y1="310" x2="525" y2="310" />
            <polygon points="528,310 520,306 520,314" fill="currentColor" stroke="none" />
            <text x="490" y="301" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="490" y="325" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">Zn</text>
            <text x="536" y="315" fill="currentColor" stroke="none" font-size="15">2CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">COCH</tspan><tspan dy="3" font-size="11">3</tspan><tspan dy="-3"> + ZnO</tspan></text>

            <line x1="458" y1="374" x2="525" y2="374" />
            <polygon points="528,374 520,370 520,378" fill="currentColor" stroke="none" />
            <text x="490" y="365" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O, Δ</tspan></text>
            <text x="536" y="379" fill="currentColor" stroke="none" font-size="15">2CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">COCH</tspan><tspan dy="3" font-size="11">3</tspan><tspan dy="-3"> + H</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="11">2</tspan></text>
          </svg>
        </div>

        <p style="margin-top: 1rem;"><strong>তাহলে দ্বিবন্ধনের অবস্থান বের করার জন্য-</strong></p>
        <ul>
          <li>(i) মনে মনে উৎপাদ দুটিকে জোড়া লাগাও।</li>
          <li>(ii) যে বরাবর যুক্ত করবে সেই বরাবর দ্বিবন্ধন চিন্তা কর এবং</li>
          <li>(iii) উৎপাদ দুটির প্রতিটি থেকে $\\ce{O}$ পরমাণু বাদ দিয়ে চিন্তা করবে কারণ, $\\ce{O}$ পরমাণুটি ওজোন থেকে এসেছিল।</li>
        </ul>

        <p style="margin-top: 0.75rem;"><strong>উদাহরণ:</strong> একটি অ্যালকিনকে ওজোনোলাইসিস করে এক অণু প্রোপানোন ও এক অণু ইথান্যাল পাওয়া গেল। অ্যালকিনটি বের করতে হবে।</p>

        <!-- Custom Adaptive SVG for Ozonolysis Double-Bond Reconstruction Trick (Page 10 Top) -->
        <div class="svg-diagram">
          <svg viewBox="0 0 780 115" width="100%" height="115" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- Left Carbonyl: CH3(42) – C(67)(|H) = O(104) -->
            <text x="42" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="46" y1="43" x2="58" y2="43" />
            <text x="67" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">C</text>
            <line x1="67" y1="54" x2="67" y2="71" />
            <text x="67" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

            <!-- Dashed Box around = O   O = -->
            <rect x="78" y="26" width="84" height="30" stroke="#38bdf8" stroke-dasharray="4 3" rx="3" />
            <line x1="82" y1="41" x2="94" y2="41" />
            <line x1="82" y1="45" x2="94" y2="45" />
            <text x="104" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">O</text>
            <text x="136" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">O</text>
            <line x1="146" y1="41" x2="158" y2="41" />
            <line x1="146" y1="45" x2="158" y2="45" />

            <!-- Right Carbonyl: C(173)(|CH3) – CH3(198) -->
            <text x="173" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">C</text>
            <line x1="173" y1="54" x2="173" y2="71" />
            <text x="173" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="182" y1="43" x2="194" y2="43" />
            <text x="198" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="start">CH<tspan dy="3" font-size="11">3</tspan></text>

            <!-- Reaction Arrow -->
            <line x1="238" y1="43" x2="278" y2="43" />
            <polygon points="281,43 273,39 273,47" fill="currentColor" stroke="none" />

            <!-- Resulting Alkene: CH3(312) – C(337)(|H) = C(371)(|CH3) – CH3(396) -->
            <text x="312" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="316" y1="43" x2="328" y2="43" />
            <text x="337" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">C</text>
            <line x1="337" y1="54" x2="337" y2="71" />
            <text x="337" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

            <line x1="346" y1="41" x2="362" y2="41" />
            <line x1="346" y1="45" x2="362" y2="45" />

            <text x="371" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="middle">C</text>
            <line x1="371" y1="54" x2="371" y2="71" />
            <text x="371" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH<tspan dy="3" font-size="11">3</tspan></text>
            <line x1="380" y1="43" x2="392" y2="43" />
            <text x="396" y="48" fill="currentColor" stroke="none" font-size="16" text-anchor="start">CH<tspan dy="3" font-size="11">3</tspan></text>

            <!-- Bracketed Explanation Note -->
            <text x="442" y="62" fill="currentColor" stroke="none" font-size="14">[ডটগুলো শুধু কৌশলটি বোঝানোর জন্য ব্যবহার করা হয়েছে]</text>
          </svg>
        </div>

        <p>সুতরাং, অ্যালকিনটি হলো <strong>২-মিথাইলবিউট-২-ইন</strong>।</p>
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-alkene-oxidation-tests',
    title: '৮. অ্যালকিনের জারণ ও শনাক্তকরণ পরীক্ষা',
    isMainTopic: true,
    batch: 'batch-3',
    html: `  <!-- SECTION C2: ALKENE OXIDATION, IDENTIFICATION TESTS & ALKENYL RADICALS (From Page 10) -->
  <section class="topic-section" id="topic-alkene-oxidation-tests">
    <h2>প্রবল জারক দ্বারা অ্যালকিনের জারণ</h2>
    $$\\underset{\\text{অ্যালকিন-1}}{\\ce{R-CH=CH2}} + \\ce{5[O]} \\xrightarrow[\\ce{H2SO4}]{\\text{উত্তপ্ত } \\ce{KMnO4}} \\underset{\\text{কার্বক্সিলিক এসিড}}{\\ce{R-COOH}} + \\ce{CO2 + H2O}$$
    $$\\underset{\\text{প্রোপিন}}{\\ce{CH3-CH=CH2}} + \\ce{5[O]} \\xrightarrow[\\ce{H2SO4}]{\\text{উত্তপ্ত } \\ce{KMnO4}} \\underset{\\text{ইথানোয়িক এসিড}}{\\ce{CH3COOH}} + \\ce{CO2 + H2O}$$

    <h2>অ্যালকিনের শনাক্তকরণ</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>শনাক্তকারী পরীক্ষা</th>
            <th>শনাক্তকরণে ব্যবহৃত বিকারক</th>
            <th>বিক্রিয়া</th>
            <th>পর্যবেক্ষণ/পরিবর্তন</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ব্রোমিন দ্রবণ পরীক্ষা</td>
            <td>$\\ce{Br2(CCl4)}$</td>
            <td>
              $$\\ce{R-CH=CH2 + Br2 ->[\\ce{CCl4}] R-CHBr-CH2Br}$$
            </td>
            <td>লাল বর্ণের দ্রবণ বর্ণহীন হয়</td>
          </tr>
          <tr>
            <td>বেয়ার পরীক্ষা</td>
            <td>ক্ষারীয় $\\ce{KMnO4}$</td>
            <td>
              $$\\ce{2KMnO4 + 2KOH -> 2K2MnO4 + H2O + [O]}$$
              $$\\ce{R-CH=CH2 + H2O + [O] ->[\\ce{KMnO4}][\\ce{KOH}] R-\\overset{\\overset{\\ce{OH}}{|}}{C}H-\\overset{\\overset{\\ce{OH}}{|}}{C}H2}$$
            </td>
            <td>গোলাপি বর্ণের দ্রবণ বর্ণহীন হয়</td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>Good to know: অ্যালকিনাইল মূলক, ভিনাইল মূলক ও অ্যালাইল মূলক</summary>
      <div class="drop-content">
        <ul>
          <li>অ্যালকিন অণু থেকে একটি $\\ce{H}$ পরমাণুকে অপসারিত করলে যে একযোজী মূলক সৃষ্টি হয়, তাকে <strong>“অ্যালকিনাইল মূলক”</strong> বলে। অনেকটা অ্যালকেন হতে অ্যালকাইল মূলক এর অনুরূপ।</li>
          <li>ইথিন ($\\ce{CH2=CH2}$) থেকে সৃষ্ট মূলক হল <strong>ভিনাইল মূলক</strong> ($\\ce{CH2=CH-}$)।</li>
          <li>প্রোপিন ($\\ce{CH3-CH=CH2}$) থেকে সৃষ্ট মূলক হল <strong>প্রোপিনাইল বা অ্যালাইল মূলক</strong> ($\\ce{CH2=CH-CH2-}$)।</li>
        </ul>
      </div>
    </details>
  </section>`
  }
];

/**
 * Batch 4 (Alkyne Pages 1, 2, and 3 from current upload):
 * - Section D1 (id="topic-alkyne-prep-acidity"): অ্যালকাইনের প্রস্তুতি, অ্যাসিটিলিন ও অ্যালকাইন-1 এর অম্লধর্মীতা
 * - Section D2 (id="topic-alkyne-addition-hydration-ozonolysis"): অ্যালকাইনের সংযোজন, হাইড্রেশন (Kucherov), ভিনাইলেশন ও ওজোনীকরণ
 */
export const BATCH_4_SECTIONS: TopicItem[] = [
  {
    id: 'topic-alkyne-prep-acidity',
    title: '৯. অ্যালকাইন: প্রস্তুতি ও অম্লধর্মীতা',
    isMainTopic: true,
    batch: 'batch-4',
    html: `  <!-- SECTION D1: ALKYNE PREPARATION, ACETYLENE & ACIDITY OF ALKYNE-1 (From Alkyne Page 1 & 2) -->
  <section class="topic-section" id="topic-alkyne-prep-acidity">
    <div class="topic-badge">অ্যালকাইন</div>
    <p><strong>সাধারণ সংকেত:</strong> অ্যালকাইনের সাধারণ সংকেত $\\ce{C_nH_{2n-2}}$। এরা অসম্পৃক্ত যৌগ এবং ত্রিবন্ধনযুক্ত দুটি কার্বনের মাঝে দুইটি $\\pi$ বন্ধন থাকে।</p>

    <h2>অ্যালকাইনের সাধারণ প্রস্তুতি</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(i) ভিসিন্যাল ডাইহ্যালাইড হতে</td>
            <td>
              $$\\ce{R-\\overset{\\overset{\\ce{X}}{|}}{C}H-\\overset{\\overset{\\ce{X}}{|}}{C}H2 + 2KOH(alc) ->[\\Delta] R-C#CH + 2KX + 2H2O}$$
            </td>
          </tr>
          <tr>
            <td>(ii) জেমিনাল ডাইহ্যালাইড হতে</td>
            <td>
              $$\\ce{R-\\overset{\\overset{\\ce{X}}{|}}{\\underset{\\underset{\\ce{X}}{|}}{C}}-\\overset{\\overset{\\ce{H}}{|}}{\\underset{\\underset{\\ce{H}}{|}}{C}}-H + 2KOH(alc) ->[\\Delta] R-C#C-H + 2KX + 2H2O}$$
            </td>
          </tr>
          <tr>
            <td>(iii) টেট্রাহ্যালো অ্যালকেন হতে</td>
            <td>
              $$\\ce{R-\\overset{\\overset{\\ce{X}}{|}}{\\underset{\\underset{\\ce{X}}{|}}{C}}-\\overset{\\overset{\\ce{X}}{|}}{\\underset{\\underset{\\ce{X}}{|}}{C}}-H + 2Zn ->[\\Delta] R-C#C-H + 2ZnX2}$$
            </td>
          </tr>
          <tr>
            <td>(iv) সোডিয়াম অ্যালকাইনাইড হতে</td>
            <td>
              $$\\ce{R-C#CNa + H2O -> R-C#CH + NaOH}$$
              $$\\ce{CH3-C#CNa + H2O -> CH3-C#CH + NaOH}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>ভিসিন্যাল (Vicinal) ও জেমিনাল (Geminal) ডাইহ্যালাইড বিক্রিয়ার গুরুত্বপূর্ণ তথ্য</summary>
      <div class="drop-content">
        <p style="margin-top: 0.4rem;"><strong>(i) ভিসিন্যাল ডাইহ্যালাইড হতে:</strong></p>
        <ul>
          <li>$\\text{Vicinal (সন্নিহিত)} =$ পাশাপাশি ২টি কার্বনে হ্যালোজেন।</li>
          <li>ডাইহ্যালো অ্যালকেন থেকে দুই অণু $\\ce{HX}$ অপসারিত হয়।</li>
        </ul>
        <p style="margin-top: 0.6rem;"><strong>(ii) জেমিনাল ডাইহ্যালাইড হতে:</strong></p>
        <ul>
          <li>$\\text{Geminal} =$ একই কার্বনের ২টি হ্যালোজেন।</li>
          <li>ডাইহ্যালো অ্যালকেন থেকে দুই অণু $\\ce{HX}$ অপসারিত হয়।</li>
        </ul>
      </div>
    </details>

    <div class="caution-box">
      ❗ <strong>সতর্কতা!</strong> $\\ce{KOH(alc)}$ এর পরিবর্তে $\\ce{KOH(aq)}$ ব্যবহার করলে প্রতিস্থাপন বিক্রিয়া সংঘটিত হবে এবং অ্যালকোহল উৎপন্ন হবে।
    </div>

    <h2>অ্যাসিটিলিনের প্রস্তুতি</h2>
    <p><strong>ক্যালসিয়াম কার্বাইড থেকে:</strong></p>
    $$\\ce{CaCO3(s) ->[\\Delta][1000^\\circ\\text{C}] CaO(s) + CO2(g)}$$
    $$\\ce{CaO(s) + 3C(s) ->[2500^\\circ\\text{C}][\\text{বৈদ্যুতিক আর্ক চুল্লি}] CaC2(s) + CO(g)}$$
    $$\\ce{CaC2(s) + 2H2O(l) -> H-C#C-H(g) + Ca(OH)2(aq)}$$

    <details class="interactive-drop" open>
      <summary>Good to know: $\\ce{Mg2C3}$ এর আর্দ্র বিশ্লেষণ</summary>
      <div class="drop-content">
        <p>$\\ce{Mg2C3}$ এর আর্দ্র বিশ্লেষণ:</p>
        $$\\ce{Mg2C3 + H2O -> Mg(OH)2 + CH3-C#C-H}$$
      </div>
    </details>

    <h2>অ্যালকাইন-1 এর অম্লধর্মীতা ও প্রমাণ</h2>
    <p><strong>অ্যালকাইন-1 এর অম্লধর্মীতা:</strong> অ্যালকাইন-1, অ্যালকিন ও অ্যালকেন অপেক্ষা বেশি অম্লধর্মী।</p>
    <p><strong>অ্যালকাইন-1 এর অম্লধর্মীতার প্রমাণ:</strong></p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>শনাক্তকারী পরীক্ষা</th>
            <th>শনাক্তকরণে ব্যবহৃত বিকারক</th>
            <th>বিক্রিয়া</th>
            <th>পর্যবেক্ষণ/পরিবর্তন</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$\\ce{Na}$ এর সঙ্গে বিক্রিয়া</td>
            <td>$\\ce{Na}$</td>
            <td>
              $$\\ce{2R-\\overset{2}{C}#\\overset{1}{C}-H(g) + 2Na(s) ->[\\text{তরল } \\ce{NH3}] 2R-C#C.Na(s) + H2(g)}$$
              $$\\ce{H-C#C-H(g) + 2Na(s) ->[\\text{তরল } \\ce{NH3}] Na.C#C.Na(s) + H2(g)}$$
            </td>
            <td>$\\ce{H2}$ গ্যাস</td>
          </tr>
          <tr>
            <td>অ্যামোনিয়াযুক্ত সিলভার নাইট্রেট এর সঙ্গে বিক্রিয়া</td>
            <td>$\\ce{[\\overset{+}{Ag}(NH3)2]NO3-}$</td>
            <td>
              $$\\ce{R-C#C-H(g) + [\\overset{+}{Ag}(NH3)2]NO3-(aq) -> R-C#C.Ag v + NH4NO3 + NH3}$$
              <p style="margin: 0.35rem 0 0;">যেমন:</p>
              $$\\ce{CH#CH + 2[Ag(NH3)2]NO3 -> Ag.C#C.Ag v + 2NH4NO3 + 2NH3}$$
            </td>
            <td>সিলভার অ্যালকাইনাইডের সাদা অধঃক্ষেপ</td>
          </tr>
          <tr>
            <td>অ্যামোনিয়াযুক্ত কিউপ্রাস ক্লোরাইড এর সঙ্গে বিক্রিয়া</td>
            <td>$\\ce{[\\overset{+}{Cu}(NH3)2]Cl-}$</td>
            <td>
              $$\\ce{R-C#C-H(g) + [\\overset{+}{Cu}(NH3)2]Cl-(aq) -> R-C#C.Cu v + NH4Cl + NH3}$$
              <p style="margin: 0.35rem 0 0;">যেমন:</p>
              $$\\ce{CH#CH + 2[Cu(NH3)2]Cl -> Cu.C#C.Cu v + 2NH4Cl + 2NH3}$$
            </td>
            <td>কপার অ্যালকাইনাইডের লাল অধঃক্ষেপ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="margin-top: 0.75rem;">যেহেতু অ্যালকাইন-1 ছাড়া অ্যালকাইন-2 বা অন্যান্য অ্যালকাইন এবং কোনো অ্যালকিন ওপরের বিক্রিয়া দেয় না। তাই এ সব বিক্রিয়া দ্বারা অ্যালকাইন-1 কে অ্যালকাইন-2 থেকে এবং সকল অ্যালকিন থেকে পার্থক্য করা হয়।</p>

    <details class="interactive-drop" open>
      <summary>Good to know: অ্যালকিন ও অ্যালকাইনের সক্রিয়তার তুলনা ও পার্থক্যকরণ</summary>
      <div class="drop-content">
        <ul>
          <li>শনাক্তকরণের বিক্রিয়া দুটিতে অ্যালকাইন-1 বা ইথাইন অম্লধর্ম প্রদর্শন করলেও এরা $\\ce{NaOH}$ বা $\\ce{KOH}$ এর সাথে কোনো বিক্রিয়া করে না।</li>
          <li>অ্যালকাইনের অণুতে দুটি পাই বন্ধন থাকায় অ্যালকাইন সদস্য অসম্পৃক্ততা পরীক্ষা যেমন ব্রোমিন দ্রবণ পরীক্ষা ও বেয়ার পরীক্ষা দেয়। কিন্তু অ্যালকিন অপেক্ষাকৃত দ্রুত ব্রোমিন দ্রবণ পরীক্ষা ও বেয়ার পরীক্ষা দেয়। এভাবেও অ্যালকিন এবং অ্যালকাইনের মধ্যে পার্থক্য করা সম্ভব। এর দ্বারা প্রমাণিত হয় অ্যালকিনসমূহ অ্যালকাইন অপেক্ষা অধিক সক্রিয়।</li>
        </ul>
      </div>
    </details>
  </section>`
  },
  {
    id: 'topic-alkyne-addition-hydration-ozonolysis',
    title: '১০. অ্যালকাইনের সংযোজন, হাইড্রেশন ও ওজোনীকরণ বিক্রিয়া',
    isMainTopic: true,
    batch: 'batch-4',
    html: `  <!-- SECTION D2: ALKYNE ADDITION, KUCHEROV HYDRATION, VINYLATION & OZONOLYSIS (From Alkyne Page 2 Bottom & Page 3) -->
  <section class="topic-section" id="topic-alkyne-addition-hydration-ozonolysis">
    <h2>অ্যালকাইনের সংযোজন বিক্রিয়া</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>বিক্রিয়ার নাম</th>
            <th>শর্ত ও প্রভাবক</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">$\\ce{H2}$ সংযোজন</td>
            <td>$\\ce{Ni}, 150^\\circ - 200^\\circ\\text{C}$</td>
            <td>
              $$\\ce{R-C#CH + 2H2 ->[\\ce{Ni}][150^\\circ-200^\\circ\\text{C}] R-CH2-CH3}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{Pd, BaSO4}$</td>
            <td>
              $$\\ce{R-C#CH + H2 ->[\\ce{Pd, BaSO4}] R-CH=CH2}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{X2}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\ce{R-C#CH + 2X2 -> R-CX2-CHX2}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{HX}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\ce{R-C#CH + 2HX -> R-CHX2-CH3}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{HOX}$ সংযোজন</td>
            <td>-</td>
            <td>
              $$\\ce{R-C#CH + 2HOX -> R-CH(OH)2-CHX2 -> R-\\overset{\\overset{\\ce{O}}{||}}{C}-CHX2 + H2O}$$
              $$\\underset{\\text{প্রোপাইন}}{\\ce{CH3-C#CH}} + \\ce{2HOCl} \\longrightarrow \\ce{CH3-\\overset{\\overset{\\ce{OH}}{|}}{\\underset{\\underset{\\ce{OH}}{|}}{C}}-\\overset{\\overset{\\ce{Cl}}{|}}{\\underset{\\underset{\\ce{Cl}}{|}}{C}}H} \\longrightarrow \\underset{\\text{1, 1- ডাইক্লোরোইথান্যাল}}{\\ce{CH3-\\overset{\\overset{\\ce{O}}{||}}{C}-CHCl2}} + \\ce{H2O}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>$\\ce{HOX}$ সংযোজন বিক্রিয়ার গুরুত্বপূর্ণ তথ্য (Important Notes)</summary>
      <div class="drop-content">
        <ul>
          <li>হাইপোহ্যালাস এসিড অ্যালকাইনের সাথে বিক্রিয়ায় কার্বনিল যৌগ উৎপন্ন করে।</li>
          <li>মার্কনিকভের নিয়ম এক্ষেত্রে অনুসৃত হয়; তবে $\\ce{OH-}$ মূলক ঋণাত্মক ও হ্যালোজেন পরমাণু ধনাত্মক ($\\ce{X+}$) রূপে ক্রিয়া করে।</li>
        </ul>
      </div>
    </details>

    <h2>অ্যালকাইনে পানি ($\\ce{H2O}$) সংযোজন/Hydration: [Kucherov's reaction]</h2>

    <!-- Custom Adaptive SVG for Kucherov's Hydration & Keto-Enol Tautomerism (3 Reactions) -->
    <div class="svg-diagram">
      <svg viewBox="0 0 860 425" width="100%" height="425" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- ================= REACTION 1: Alkyne-1 -> Ketone ================= -->
        <text x="15" y="60" fill="currentColor" stroke="none" font-size="15">যেমন, R – C ≡ CH  +</text>
        <text x="68" y="78" fill="currentColor" stroke="none" font-size="13">অ্যালকাইন–1</text>

        <text x="165" y="42" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ+</text>
        <text x="165" y="60" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="174" y1="55" x2="188" y2="55" />
        <text x="204" y="42" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ−</text>
        <text x="204" y="60" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">OH</text>

        <!-- Arrow 1 -->
        <text x="275" y="44" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">2%Hg<tspan dy="-5" font-size="10">2+</tspan><tspan dy="5">, 60°C</tspan></text>
        <line x1="226" y1="54" x2="324" y2="54" />
        <polygon points="327,54 319,50 319,58" fill="currentColor" stroke="none" />
        <text x="275" y="73" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">20%H<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">SO</tspan><tspan dy="3" font-size="10">4</tspan></text>

        <!-- Bracketed Enol 1: [ R - C(O-H) = CH2 ] -->
        <path d="M 350 18 L 342 18 L 342 102 L 350 102" />
        <path d="M 454 18 L 462 18 L 462 102 L 454 102" />
        <text x="356" y="52" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="364" y1="47" x2="375" y2="47" />
        <text x="384" y="52" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="393" y1="45" x2="409" y2="45" />
        <line x1="393" y1="49" x2="409" y2="49" />
        <text x="413" y="52" fill="currentColor" stroke="none" font-size="15" text-anchor="start">CH<tspan dy="3" font-size="11">2</tspan></text>

        <!-- Vertical bond directly under C (x=384) to O (x=384) - H (x=414) -->
        <line x1="384" y1="56" x2="384" y2="72" />
        <text x="384" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <line x1="392" y1="83" x2="405" y2="83" />
        <text x="414" y="88" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <ellipse cx="399" cy="83" rx="23" ry="12" stroke="#f59e0b" stroke-dasharray="3 3" />
        <!-- Curved tautomerism arrows -->
        <path d="M 422 81 Q 446 73 431 56" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="430,54 436,59 430,62" fill="#38bdf8" stroke="none" />
        <path d="M 408 40 Q 398 28 388 40" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="387,42 390,35 394,39" fill="#38bdf8" stroke="none" />
        <text x="402" y="118" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">প্রতিস্থাপন ভিনাইল</text>
        <text x="402" y="134" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">অ্যালকোহল</text>

        <!-- Rearrangement Arrow 1 -->
        <text x="498" y="46" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">পুনঃ</text>
        <line x1="474" y1="54" x2="524" y2="54" />
        <polygon points="527,54 519,50 519,58" fill="currentColor" stroke="none" />
        <text x="498" y="71" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বিন্যাস</text>

        <!-- Product 1: R - C(=O) - CH3 -->
        <text x="546" y="58" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="554" y1="53" x2="568" y2="53" />
        <text x="577" y="58" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="586" y1="53" x2="600" y2="53" />
        <text x="604" y="58" fill="currentColor" stroke="none" font-size="15" text-anchor="start">CH<tspan dy="3" font-size="11">3</tspan></text>
        <line x1="575" y1="63" x2="575" y2="78" />
        <line x1="579" y1="63" x2="579" y2="78" />
        <text x="577" y="93" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <text x="577" y="110" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">কিটোন</text>

        <!-- ================= REACTION 2: Acetylene -> Ethanal ================= -->
        <text x="30" y="196" fill="currentColor" stroke="none" font-size="15">H – C ≡ C – H  +</text>
        <text x="72" y="214" fill="currentColor" stroke="none" font-size="13">অ্যাসিটিলিন</text>

        <text x="165" y="178" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ+</text>
        <text x="165" y="196" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="174" y1="191" x2="188" y2="191" />
        <text x="204" y="178" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ−</text>
        <text x="204" y="196" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">OH</text>

        <!-- Arrow 2 -->
        <text x="275" y="180" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">2%Hg<tspan dy="-5" font-size="10">2+</tspan><tspan dy="5">, 60°C</tspan></text>
        <line x1="226" y1="190" x2="324" y2="190" />
        <polygon points="327,190 319,186 319,194" fill="currentColor" stroke="none" />
        <text x="275" y="209" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">20%H<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">SO</tspan><tspan dy="3" font-size="10">4</tspan></text>

        <!-- Bracketed Enol 2: [ H - C(H) = C(O-H) - H ] -->
        <path d="M 350 148 L 342 148 L 342 238 L 350 238" />
        <path d="M 454 148 L 462 148 L 462 238 L 454 238" />
        <text x="356" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="364" y1="189" x2="375" y2="189" />
        <!-- Left C at x=384 with vertical bond up to H -->
        <text x="384" y="164" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">H</text>
        <line x1="384" y1="168" x2="384" y2="180" />
        <text x="384" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <!-- Double bond = between left C (384) and right C (416) -->
        <line x1="393" y1="187" x2="407" y2="187" />
        <line x1="393" y1="191" x2="407" y2="191" />
        <!-- Right C at x=416 with vertical bond down to O (416) - H (386) -->
        <text x="416" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="425" y1="189" x2="436" y2="189" />
        <text x="444" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

        <line x1="416" y1="199" x2="416" y2="213" />
        <text x="386" y="229" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="394" y1="224" x2="407" y2="224" />
        <text x="416" y="229" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <ellipse cx="401" cy="224" rx="23" ry="12" stroke="#f59e0b" stroke-dasharray="3 3" />
        <path d="M 378 221 Q 362 212 378 198" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="380,197 372,198 376,203" fill="#38bdf8" stroke="none" />
        <path d="M 393 181 Q 401 169 411 181" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="412,183 406,179 410,175" fill="#38bdf8" stroke="none" />
        <text x="402" y="255" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">ভিনাইল অ্যালকোহল</text>

        <!-- Rearrangement Arrow 2 -->
        <text x="498" y="182" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">পুনঃ</text>
        <line x1="474" y1="190" x2="524" y2="190" />
        <polygon points="527,190 519,186 519,194" fill="currentColor" stroke="none" />
        <text x="498" y="207" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বিন্যাস</text>

        <!-- Product 2: CH3 - C(=O) - H -->
        <text x="556" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan></text>
        <line x1="560" y1="189" x2="574" y2="189" />
        <text x="583" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="592" y1="189" x2="606" y2="189" />
        <text x="615" y="194" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="581" y1="199" x2="581" y2="214" />
        <line x1="585" y1="199" x2="585" y2="214" />
        <text x="583" y="229" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <text x="583" y="246" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">অ্যাসিট্যালডিহাইড</text>
        <text x="583" y="262" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বা ইথান্যাল</text>

        <!-- ================= REACTION 3: Propyne -> Propanone ================= -->
        <text x="18" y="336" fill="currentColor" stroke="none" font-size="15">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3"> – C ≡ CH  +</tspan></text>
        <text x="55" y="354" fill="currentColor" stroke="none" font-size="13">প্রোপাইন</text>

        <text x="165" y="318" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ+</text>
        <text x="165" y="336" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="174" y1="331" x2="188" y2="331" />
        <text x="204" y="318" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">δ−</text>
        <text x="204" y="336" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">OH</text>

        <!-- Arrow 3 -->
        <text x="275" y="320" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">2%Hg<tspan dy="-5" font-size="10">2+</tspan><tspan dy="5">, 60°C</tspan></text>
        <line x1="226" y1="330" x2="324" y2="330" />
        <polygon points="327,330 319,326 319,334" fill="currentColor" stroke="none" />
        <text x="275" y="349" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">20%H<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">SO</tspan><tspan dy="3" font-size="10">4</tspan></text>

        <!-- Bracketed Enol 3: [ CH3 - C(O-H) = C(H) - H ] -->
        <path d="M 346 288 L 338 288 L 338 378 L 346 378" />
        <path d="M 458 288 L 466 288 L 466 378 L 458 378" />
        <text x="369" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan></text>
        <line x1="372" y1="329" x2="381" y2="329" />
        <!-- Left C at x=389 with vertical bond down to O (389) - H (419) -->
        <text x="389" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="398" y1="327" x2="412" y2="327" />
        <line x1="398" y1="331" x2="412" y2="331" />
        <!-- Right C at x=421 with vertical bond up to H (421) -->
        <text x="421" y="304" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">H</text>
        <line x1="421" y1="308" x2="421" y2="320" />
        <text x="421" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="430" y1="329" x2="440" y2="329" />
        <text x="448" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

        <line x1="389" y1="339" x2="389" y2="353" />
        <text x="389" y="369" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <line x1="397" y1="364" x2="410" y2="364" />
        <text x="419" y="369" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <ellipse cx="404" cy="364" rx="23" ry="12" stroke="#f59e0b" stroke-dasharray="3 3" />
        <path d="M 427 362 Q 446 352 427 338" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="425,337 433,338 429,343" fill="#38bdf8" stroke="none" />
        <path d="M 412 321 Q 404 309 394 321" stroke="#38bdf8" stroke-width="1.6" fill="none" />
        <polygon points="393,323 396,316 400,320" fill="#38bdf8" stroke="none" />
        <text x="402" y="394" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">মিথাইল ভিনাইল</text>
        <text x="402" y="410" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">অ্যালকোহল</text>

        <!-- Rearrangement Arrow 3 -->
        <text x="498" y="322" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">পুনঃ</text>
        <line x1="474" y1="330" x2="524" y2="330" />
        <polygon points="527,330 519,326 519,334" fill="currentColor" stroke="none" />
        <text x="498" y="347" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বিন্যাস</text>

        <!-- Product 3: CH3 - C(=O) - CH3 -->
        <text x="556" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="end">CH<tspan dy="3" font-size="11">3</tspan></text>
        <line x1="560" y1="329" x2="574" y2="329" />
        <text x="583" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="592" y1="329" x2="606" y2="329" />
        <text x="610" y="334" fill="currentColor" stroke="none" font-size="15" text-anchor="start">CH<tspan dy="3" font-size="11">3</tspan></text>
        <line x1="581" y1="339" x2="581" y2="354" />
        <line x1="585" y1="339" x2="585" y2="354" />
        <text x="583" y="369" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">O</text>
        <text x="583" y="388" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">প্রোপানোন</text>
      </svg>
    </div>

    <div class="caution-box">
      ❗ <strong>সতর্কতা!</strong> হাইড্রেশন বিক্রিয়ার মাধ্যমে শুধু ইথাইন থেকেই অ্যালডিহাইড (ইথানল) প্রস্তুত করা সম্ভব। অন্য যেকোনো অ্যালকাইন থেকে কিটোন উৎপন্ন হয়।
    </div>

    <details class="interactive-drop" open>
      <summary>Good to know: অ্যালকাইনে অ্যালকোহল ও কার্বক্সিলিক এসিড সংযোজন (ভিনাইলেশন / Vinylation)</summary>
      <div class="drop-content">
        <p style="margin-top: 0.4rem;"><strong>অ্যালকাইনে অ্যালকোহল ও কার্বক্সিলিক এসিড সংযোজন:</strong></p>
        $$\\underset{\\text{অ্যাসিটিলিন}}{\\ce{H-C#C-H}} + \\underset{\\text{অ্যালকোহল}}{\\ce{\\overset{\\delta+}{H}-\\overset{\\delta-}{O}-R}} \\xrightarrow[180^\\circ\\text{C}]{\\ce{KOH}} \\underset{\\text{অ্যালকাইল ভিনাইল ইথার}}{\\ce{CH2=CH-O-R}}$$
        $$\\underset{\\text{অ্যাসিটিলিন}}{\\ce{H-C#C-H}} + \\ce{H-O-\\overset{\\overset{\\ce{O}}{||}}{C}-CH3} \\xrightarrow[80^\\circ\\text{C}]{\\ce{Hg^{2+}}} \\underset{\\text{ভিনাইল অ্যাসিটেট}}{\\ce{CH2=CH-\\overset{\\overset{\\ce{O}}{||}}{C}-O-CH3}}$$
        <p style="margin-top: 0.65rem;">ভিনাইল অ্যাসিটেট থেকে পলিভিনাইল অ্যাসিটেট বা পলিএস্টার সংশ্লেষিত হয়। সক্রিয় হাইড্রোজেন বিশিষ্ট যেমন, অ্যালকোহল, কার্বক্সিলিক এসিড ইত্যাদি বিকারকের সঙ্গে অ্যাসিটিলিনের যুত-বিক্রিয়ায় ভিনাইল যৌগ গঠন করার প্রক্রিয়াকে <strong>ভিনাইলেশন (vinylation)</strong> বলে।</p>
      </div>
    </details>

    <h2>অ্যালকাইনের ওজোন সংশ্লেষণ বিক্রিয়া</h2>
    <p>ওজোনাইডকে আর্দ্রবিশ্লেষণ করলে ডাই কার্বনিল যৌগ তৈরি হয়।</p>

    <!-- Custom Adaptive SVG for Alkyne Ozonolysis (Bottom of Page 3) -->
    <div class="svg-diagram">
      <svg viewBox="0 0 880 285" width="100%" height="285" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- ================= REACTION 1: R - C ≡ CH + O3 ================= -->
        <text x="18" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="26" y1="77" x2="38" y2="77" />
        <text x="46" y="63" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">2</text>
        <text x="46" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="54" y1="73" x2="70" y2="73" />
        <line x1="54" y1="77" x2="70" y2="77" />
        <line x1="54" y1="81" x2="70" y2="81" />
        <text x="79" y="63" fill="currentColor" stroke="none" font-size="11" text-anchor="middle">1</text>
        <text x="84" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">CH</text>
        <text x="118" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">+ O<tspan dy="3" font-size="11">3</tspan></text>

        <text x="164" y="70" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">CCl<tspan dy="3" font-size="9">4</tspan></text>
        <line x1="142" y1="77" x2="186" y2="77" />
        <polygon points="189,77 181,73 181,81" fill="currentColor" stroke="none" />

        <!-- Alkyne Ozonide 1: R(202) - C(230) — C(268) - H(296) with top O(230)—O(268) and bottom O(249) -->
        <text x="202" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="210" y1="77" x2="221" y2="77" />
        <text x="230" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="239" y1="77" x2="259" y2="77" />
        <text x="268" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="277" y1="77" x2="288" y2="77" />
        <text x="296" y="82" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

        <text x="230" y="48" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>
        <line x1="239" y1="43" x2="259" y2="43" />
        <text x="268" y="48" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>
        <line x1="230" y1="52" x2="230" y2="66" />
        <line x1="268" y1="52" x2="268" y2="66" />

        <line x1="232" y1="86" x2="245" y2="101" />
        <line x1="266" y1="86" x2="253" y2="101" />
        <text x="249" y="115" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>

        <!-- Branched Arrows 1 -->
        <line x1="312" y1="77" x2="338" y2="77" />
        <line x1="338" y1="45" x2="338" y2="108" />

        <!-- Top Branch 1 (Zn / H2O) -->
        <line x1="338" y1="45" x2="395" y2="45" />
        <polygon points="398,45 390,41 390,49" fill="currentColor" stroke="none" />
        <text x="365" y="38" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">Zn</text>
        <text x="365" y="59" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O</tspan></text>

        <!-- Product Top 1: R(412) - C(440)(=O) - C(472)(=O) - H(500) + ZnO -->
        <text x="412" y="49" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="420" y1="44" x2="431" y2="44" />
        <text x="440" y="21" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="438.5" y1="24" x2="438.5" y2="34" />
        <line x1="441.5" y1="24" x2="441.5" y2="34" />
        <text x="440" y="49" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="449" y1="44" x2="463" y2="44" />
        <text x="472" y="21" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="470.5" y1="24" x2="470.5" y2="34" />
        <line x1="473.5" y1="24" x2="473.5" y2="34" />
        <text x="472" y="49" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="481" y1="44" x2="492" y2="44" />
        <text x="496" y="49" fill="currentColor" stroke="none" font-size="15" text-anchor="start">H + ZnO</text>

        <!-- Bottom Branch 1 (H2O / তাপ) -->
        <line x1="338" y1="108" x2="395" y2="108" />
        <polygon points="398,108 390,104 390,112" fill="currentColor" stroke="none" />
        <text x="365" y="100" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O</tspan></text>
        <text x="365" y="122" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">তাপ</text>

        <!-- Product Bottom 1a: R(412) - C(440)(=O) - C(472)(=O) - H + H2O2 -->
        <text x="412" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="420" y1="107" x2="431" y2="107" />
        <text x="440" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="438.5" y1="87" x2="438.5" y2="97" />
        <line x1="441.5" y1="87" x2="441.5" y2="97" />
        <text x="440" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="449" y1="107" x2="463" y2="107" />
        <text x="472" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="470.5" y1="87" x2="470.5" y2="97" />
        <line x1="473.5" y1="87" x2="473.5" y2="97" />
        <text x="472" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="481" y1="107" x2="492" y2="107" />
        <text x="496" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="start">H + H<tspan dy="3" font-size="11">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="11">2</tspan></text>

        <text x="588" y="98" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">Δ</text>
        <line x1="572" y1="106" x2="606" y2="106" />
        <polygon points="609,106 601,102 601,110" fill="currentColor" stroke="none" />

        <!-- Product Bottom 1b: R(622) - C(650)(=O) - OH + H(724) - C(752)(=O) - OH -->
        <text x="622" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">R</text>
        <line x1="630" y1="107" x2="641" y2="107" />
        <text x="650" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="648.5" y1="87" x2="648.5" y2="97" />
        <line x1="651.5" y1="87" x2="651.5" y2="97" />
        <text x="650" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="659" y1="107" x2="670" y2="107" />
        <text x="684" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">OH</text>
        <text x="706" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">+</text>
        <text x="724" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="732" y1="107" x2="743" y2="107" />
        <text x="752" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="750.5" y1="87" x2="750.5" y2="97" />
        <line x1="753.5" y1="87" x2="753.5" y2="97" />
        <text x="752" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="761" y1="107" x2="772" y2="107" />
        <text x="776" y="112" fill="currentColor" stroke="none" font-size="15" text-anchor="start">OH</text>

        <!-- ================= REACTION 2: H - C ≡ C - H + O3 ================= -->
        <text x="15" y="218" fill="currentColor" stroke="none" font-size="15">H – C ≡ C – H + O<tspan dy="3" font-size="11">3</tspan></text>

        <line x1="145" y1="213" x2="186" y2="213" />
        <polygon points="189,213 181,209 181,217" fill="currentColor" stroke="none" />

        <!-- Alkyne Ozonide 2: H(202) - C(230) — C(268) - H(296) with top O(230)—O(268) and bottom O(249) -->
        <text x="202" y="218" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="210" y1="213" x2="221" y2="213" />
        <text x="230" y="218" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="239" y1="213" x2="259" y2="213" />
        <text x="268" y="218" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="277" y1="213" x2="288" y2="213" />
        <text x="296" y="218" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>

        <text x="230" y="184" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>
        <line x1="239" y1="179" x2="259" y2="179" />
        <text x="268" y="184" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>
        <line x1="230" y1="188" x2="230" y2="202" />
        <line x1="268" y1="188" x2="268" y2="202" />

        <line x1="232" y1="222" x2="245" y2="237" />
        <line x1="266" y1="222" x2="253" y2="237" />
        <text x="249" y="251" fill="currentColor" stroke="none" font-size="14" text-anchor="middle">O</text>

        <!-- Branched Arrows 2 -->
        <line x1="312" y1="213" x2="338" y2="213" />
        <line x1="338" y1="180" x2="338" y2="244" />

        <!-- Top Branch 2 (Zn / H2O) -->
        <line x1="338" y1="180" x2="395" y2="180" />
        <polygon points="398,180 390,176 390,184" fill="currentColor" stroke="none" />
        <text x="365" y="173" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">Zn</text>
        <text x="365" y="194" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O</tspan></text>

        <!-- Product Top 2: H(412) - C(440)(=O) - C(472)(=O) - H + ZnO -->
        <text x="412" y="184" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="420" y1="179" x2="431" y2="179" />
        <text x="440" y="156" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="438.5" y1="159" x2="438.5" y2="169" />
        <line x1="441.5" y1="159" x2="441.5" y2="169" />
        <text x="440" y="184" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="449" y1="179" x2="463" y2="179" />
        <text x="472" y="156" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="470.5" y1="159" x2="470.5" y2="169" />
        <line x1="473.5" y1="159" x2="473.5" y2="169" />
        <text x="472" y="184" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="481" y1="179" x2="492" y2="179" />
        <text x="496" y="184" fill="currentColor" stroke="none" font-size="15" text-anchor="start">H + ZnO</text>

        <!-- Bottom Branch 2 (H2O / তাপ) -->
        <line x1="338" y1="244" x2="395" y2="244" />
        <polygon points="398,244 390,240 390,248" fill="currentColor" stroke="none" />
        <text x="365" y="236" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">H<tspan dy="3" font-size="9">2</tspan><tspan dy="-3">O</tspan></text>
        <text x="365" y="258" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">তাপ</text>

        <!-- Product Bottom 2a: H(412) - C(440)(=O) - C(472)(=O) - H + H2O2 -->
        <text x="412" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">H</text>
        <line x1="420" y1="243" x2="431" y2="243" />
        <text x="440" y="220" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="438.5" y1="223" x2="438.5" y2="233" />
        <line x1="441.5" y1="223" x2="441.5" y2="233" />
        <text x="440" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="449" y1="243" x2="463" y2="243" />
        <text x="472" y="220" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="470.5" y1="223" x2="470.5" y2="233" />
        <line x1="473.5" y1="223" x2="473.5" y2="233" />
        <text x="472" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="481" y1="243" x2="492" y2="243" />
        <text x="496" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="start">H + H<tspan dy="3" font-size="11">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="11">2</tspan></text>

        <text x="588" y="234" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">Δ</text>
        <line x1="572" y1="242" x2="606" y2="242" />
        <polygon points="609,242 601,238 601,246" fill="currentColor" stroke="none" />

        <!-- Product Bottom 2b: 2H(626) - C(660)(=O) - OH -->
        <text x="634" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="end">2H</text>
        <line x1="638" y1="243" x2="651" y2="243" />
        <text x="660" y="220" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">O</text>
        <line x1="658.5" y1="223" x2="658.5" y2="233" />
        <line x1="661.5" y1="223" x2="661.5" y2="233" />
        <text x="660" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">C</text>
        <line x1="669" y1="243" x2="680" y2="243" />
        <text x="684" y="248" fill="currentColor" stroke="none" font-size="15" text-anchor="start">OH</text>
      </svg>
    </div>
  </section>`
  }
];

/**
 * Batch 5 (Alkyne Oxidation & Polymerization + Hydrocarbon Comparison & Distinguishing Reactions):
 * - Section E1 (id="topic-alkyne-oxidation-polymerization"): অ্যালকাইনের জারণ ও পলিমারকরণ বিক্রিয়া
 * - Section E2 (id="topic-hydrocarbon-comparison-tests"): অ্যালকেন, অ্যালকিন, অ্যালকাইনের পার্থক্য, পারস্পরিক রূপান্তর ও শনাক্তকারী পরীক্ষা
 */
export const BATCH_5_SECTIONS: TopicItem[] = [
  {
    id: 'topic-alkyne-oxidation-polymerization',
    title: '১১. অ্যালকাইনের জারণ ও পলিমারকরণ বিক্রিয়া',
    isMainTopic: true,
    batch: 'batch-5',
    html: `  <!-- SECTION E1: ALKYNE OXIDATION, OXY-ACETYLENE FLAME & AROMATIC POLYMERIZATION -->
  <section class="topic-section" id="topic-alkyne-oxidation-polymerization">
    <h2>অ্যালকাইনের জারণ ও পলিমারকরণ</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>জারণ</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ক্ষারীয় $\\ce{KMnO4}$ দ্বারা জারণ<br>(অ্যালকাইনের শনাক্তকরণ বেয়ার পরীক্ষা)</td>
            <td>
              <ul>
                <li>কার্বন শিকলের প্রান্তে ত্রিবন্ধন থাকলে জারণের ফলে কার্বক্সিলিক এসিড ও $\\ce{CO2}$ উৎপন্ন হয়।
                  $$\\ce{CH3-C#C-H + [O] ->[\\ce{KOH}][\\ce{KMnO4}] CH3-COOH + CO2 ^ + H2O}$$
                </li>
                <li>শিকলের মাঝে ত্রিবন্ধন থাকলে এবং দুইপাশে কার্বন সংখ্যার অসমতা থাকলে ভিন্ন ভিন্ন গঠনের কার্বক্সিলিক এসিড উৎপন্ন হয়।
                  $$\\ce{CH3-CH2-C#C-CH3 + [O] ->[\\ce{KOH}][\\ce{KMnO4}] CH3CH2-COOH + CH3-COOH}$$
                </li>
                <li>ত্রিবন্ধনের দুইপাশে কার্বন সংখ্যা সমান হলে একই কার্বক্সিলিক এসিডের ২ অণু উৎপন্ন হবে।
                  $$\\ce{CH3-C#C-CH3 + [O] ->[\\ce{KOH}][\\ce{KMnO4}] 2CH3-COOH}$$
                </li>
                <li>ইথাইন জারিত হয়ে অক্সালিক এসিড উৎপন্ন হয়।
                  $$\\ce{HC#CH + 4[O] -> HOOC-COOH}$$
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>অম্লীয় $\\ce{K2Cr2O7}$ দ্বারা জারণ</td>
            <td>
              <ul>
                <li>সমস্ত কার্বন মিলে একটি মাত্র কার্বক্সিলিক এসিড উৎপন্ন হয়।
                  $$\\ce{K2Cr2O7 + H2SO4 -> K2SO4 + Cr2(SO4)3 + H2O + [O]}$$
                  $$\\ce{HC#CH + [O] + H2O -> CH3-COOH}$$
                  $$\\ce{CH3-C#CH + [O] + H2O -> CH3CH2-COOH}$$
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <details class="interactive-drop" open>
      <summary>Good to know: অক্সি-অ্যাসিটিলিন শিখা ($3500^\\circ\\text{C}$)</summary>
      <div class="drop-content">
        <p><strong>অক্সি-অ্যাসিটিলিন শিখা:</strong> ধাতব নলের সরু মুখে অ্যাসিটিলিন গ্যাসকে প্রচুর বায়ু বা অক্সিজেনে প্রজ্বলিত করলে অ্যাসিটিলিনের পূর্ণ দহনের ফলে নীলাভ শিখাসহ জ্বলে ওঠে। তখন প্রায় $3500^\\circ\\text{C}$ তাপমাত্রা উৎপন্ন হয়। এ শিখাকে অক্সি-অ্যাসিটিলিন শিখা বলে।</p>
        $$\\ce{2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(g) + \\text{তাপ}}$$
      </div>
    </details>

    <h2>অ্যারোমেটিক পলিমার গঠন</h2>
    <p>$\\ce{CH#CH}$ ও $\\ce{CH3-C#CH}$ কে উত্তপ্ত লৌহ নলের ভিতর দিয়ে চালনা করলে পলিমারকরণ বিক্রিয়ায় যথাক্রমে বেনজিন ও মেসিটিইলিন তৈরি হয়। অর্থাৎ,</p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>যৌগ</th>
            <th>প্রভাবক</th>
            <th>উৎপাদ</th>
            <th>বিক্রিয়া</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$\\ce{CH#CH}$</td>
            <td>$\\ce{Fe}, 450^\\circ\\text{C}$</td>
            <td>বেনজিন ($\\ce{C6H6}$)</td>
            <td>
              $$\\underset{\\text{ইথাইন}}{\\ce{3HC#CH}} \\xrightarrow[450^\\circ\\text{C}]{\\ce{Fe}} \\underset{\\text{বেনজিন}}{\\ce{C6H6}}$$
            </td>
          </tr>
          <tr>
            <td>$\\ce{CH3-C#CH}$</td>
            <td>(উত্তপ্ত লৌহ নল)</td>
            <td>মেসিটিইলিন ($1,3,5$-ট্রাইমিথাইল বেনজিন)</td>
            <td>
              $$\\underset{\\text{প্রোপাইন}}{\\ce{3H3C-C#C-H}} \\xrightarrow[600^\\circ\\text{C}]{\\ce{Fe}} \\underset{\\text{মেসিটিইলিন}}{\\ce{C6H3(CH3)3}}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Custom Adaptive SVG for Cyclic Trimerization of Ethyne to Benzene & Propyne to Mesitylene -->
    <div class="svg-diagram">
      <svg viewBox="0 0 820 270" width="100%" height="270" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- ================= ROW 1: 3 HC≡CH -> Benzene ================= -->
        <!-- Top-right HC≡CH -->
        <text x="155" y="28" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">HC</text>
        <line x1="168" y1="24" x2="192" y2="38" />
        <line x1="166" y1="28" x2="190" y2="42" />
        <line x1="164" y1="32" x2="188" y2="46" />
        <text x="206" y="46" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">CH</text>

        <!-- Left vertical HC≡CH -->
        <text x="115" y="48" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">HC</text>
        <line x1="111" y1="54" x2="111" y2="82" />
        <line x1="115" y1="54" x2="115" y2="82" />
        <line x1="119" y1="54" x2="119" y2="82" />
        <text x="115" y="96" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">HC</text>

        <!-- Bottom-right HC≡CH -->
        <text x="206" y="94" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">HC</text>
        <line x1="192" y1="96" x2="168" y2="110" />
        <line x1="190" y1="92" x2="166" y2="106" />
        <line x1="188" y1="88" x2="164" y2="102" />
        <text x="155" y="114" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">HC</text>

        <!-- Curved electron-pushing arrows for cyclic trimerization -->
        <path d="M 124 42 Q 134 26 144 30" stroke="#38bdf8" stroke-width="1.5" fill="none" />
        <polygon points="146,31 139,27 141,34" fill="#38bdf8" stroke="none" />
        <path d="M 204 54 Q 214 68 204 82" stroke="#38bdf8" stroke-width="1.5" fill="none" />
        <polygon points="203,84 209,79 203,77" fill="#38bdf8" stroke="none" />
        <path d="M 144 106 Q 130 108 124 98" stroke="#38bdf8" stroke-width="1.5" fill="none" />
        <polygon points="123,96 125,103 130,99" fill="#38bdf8" stroke="none" />
        <text x="160" y="132" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">ইথাইন</text>

        <!-- Arrow to Benzene -->
        <text x="275" y="58" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">Fe</text>
        <line x1="242" y1="66" x2="308" y2="66" />
        <polygon points="311,66 303,62 303,70" fill="currentColor" stroke="none" />
        <text x="275" y="84" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">450°C</text>

        <!-- Benzene Ring -->
        <polygon points="365,32 394,49 394,83 365,100 336,83 336,49" />
        <circle cx="365" cy="66" r="16" />
        <text x="365" y="122" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">বেনজিন</text>

        <!-- ================= ROW 2: 3 H3C–C≡C–H -> Mesitylene ================= -->
        <text x="155" y="205" fill="currentColor" stroke="none" font-size="15" text-anchor="middle">3H<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">C – C ≡ C – H</tspan></text>
        <text x="155" y="228" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">প্রোপাইন</text>

        <text x="275" y="192" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">Fe</text>
        <line x1="242" y1="200" x2="308" y2="200" />
        <polygon points="311,200 303,196 303,204" fill="currentColor" stroke="none" />
        <text x="275" y="218" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">600°C</text>

        <!-- Mesitylene Ring (1,3,5-trimethylbenzene) -->
        <polygon points="365,168 394,185 394,219 365,236 336,219 336,185" />
        <circle cx="365" cy="202" r="16" />
        <!-- Top CH3 (position 1) -->
        <line x1="365" y1="168" x2="365" y2="152" />
        <text x="365" y="147" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">CH<tspan dy="3" font-size="10">3</tspan></text>
        <!-- Bottom-left CH3 (position 5) -->
        <line x1="336" y1="219" x2="322" y2="228" />
        <text x="316" y="236" fill="currentColor" stroke="none" font-size="13" text-anchor="end">CH<tspan dy="3" font-size="10">3</tspan></text>
        <!-- Bottom-right CH3 (position 3) -->
        <line x1="394" y1="219" x2="408" y2="228" />
        <text x="412" y="236" fill="currentColor" stroke="none" font-size="13" text-anchor="start">CH<tspan dy="3" font-size="10">3</tspan></text>
        <text x="365" y="258" fill="currentColor" stroke="none" font-size="13" text-anchor="middle">মেসিটিইলিন</text>
      </svg>
    </div>
  </section>`
  },
  {
    id: 'topic-hydrocarbon-comparison-tests',
    title: '১২. অ্যালকেন, অ্যালকিন ও অ্যালকাইনের পার্থক্য, রূপান্তর ও শনাক্তকরণ',
    isMainTopic: true,
    batch: 'batch-5',
    html: `  <!-- SECTION E2: COMPARISON OF ALKANE, ALKENE & ALKYNE, INTERCONVERSION & DISTINGUISHING TESTS -->
  <section class="topic-section" id="topic-hydrocarbon-comparison-tests">
    <h2>অ্যালকেন, অ্যালকিন, অ্যালকাইনের পার্থক্য এবং পারস্পরিক রূপান্তর</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ক্র.নং</th>
            <th>বৈশিষ্ট্য</th>
            <th>অ্যালকেন</th>
            <th>অ্যালকিন</th>
            <th>অ্যালকাইন</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(i)</td>
            <td>সাধারণ সংকেত ও উদাহরণ:</td>
            <td>
              $\\ce{C_nH_{2n+2}}$<br>
              উদাহরণ: $\\ce{CH3-CH3}$
            </td>
            <td>
              $\\ce{C_nH_{2n}}$<br>
              উদাহরণ: $\\ce{H2C=CH2}$
            </td>
            <td>
              $\\ce{C_nH_{2n-2}}$<br>
              উদাহরণ: $\\ce{HC#CH}$
            </td>
          </tr>
          <tr>
            <td>(ii)</td>
            <td>কার্বন শিকলে বন্ধন ও কার্যকরী মূলক</td>
            <td>
              কার্বন-কার্বন একক বন্ধন থাকে<br>
              $&gt;\\ce{C}\\!\\overset{\\sigma}{-}\\!\\ce{C}&lt;$<br>
              প্রকৃতপক্ষে অ্যালকেনের পৃথক কার্যকরীমূলক নেই।
            </td>
            <td>
              কার্বন-কার্বন দ্বি-বন্ধন, যেমন-<br>
              $&gt;\\ce{C}\\!\\xlongequal[\\sigma]{\\pi}\\!\\ce{C}&lt;$<br>
              ($1$টি $\\sigma$ $1$টি $\\pi$ বন্ধন)
            </td>
            <td>
              কার্বন-কার্বন ত্রিবন্ধন, যেমন-<br>
              $-\\ce{C}\\!\\overset{\\pi}{\\underset{\\pi}{\\equiv}}\\!\\ce{C}-$<br>
              ($1$টি $\\sigma$ $2$টি $\\pi$ বন্ধন)
            </td>
          </tr>
          <tr>
            <td>(iii)</td>
            <td>কার্বনের সংকরায়ন:</td>
            <td>$sp^3$</td>
            <td>$sp^2$</td>
            <td>$sp$</td>
          </tr>
          <tr>
            <td>(iv)</td>
            <td>অণুর আকৃতি:</td>
            <td>চতুস্তলকীয়</td>
            <td>ত্রিকোণীয় সমতলীয়</td>
            <td>সরলরৈখিক সমতলীয়</td>
          </tr>
          <tr>
            <td>(v)</td>
            <td>বন্ধন কোণ:</td>
            <td>$109.5^\\circ$</td>
            <td>$120^\\circ$</td>
            <td>$180^\\circ$</td>
          </tr>
          <tr>
            <td>(vi)</td>
            <td>কার্বন-কার্বন বন্ধন দূরত্ব</td>
            <td>$0.154\\text{ nm}$</td>
            <td>$0.134\\text{ nm}$</td>
            <td>$0.120\\text{ nm}$</td>
          </tr>
          <tr>
            <td>(vii)</td>
            <td>পারস্পরিক রূপান্তর</td>
            <td colspan="3">
              <!-- Custom Adaptive SVG for (vii) Interconversion Triangle -->
              <div class="svg-diagram" style="margin: 0.25rem 0;">
                <svg viewBox="0 0 540 165" width="100%" height="165" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <text x="270" y="26" fill="currentColor" stroke="none" font-size="16" font-weight="bold" text-anchor="middle">অ্যালকাইন</text>
                  <text x="125" y="142" fill="currentColor" stroke="none" font-size="16" font-weight="bold" text-anchor="middle">অ্যালকিন</text>
                  <text x="415" y="142" fill="currentColor" stroke="none" font-size="16" font-weight="bold" text-anchor="middle">অ্যালকেন</text>

                  <!-- Left diagonal arrow: Alkyne -> Alkene -->
                  <line x1="235" y1="36" x2="155" y2="115" />
                  <polygon points="152,118 156,109 162,115" fill="currentColor" stroke="none" />
                  <text x="178" y="68" fill="currentColor" stroke="none" font-size="12" text-anchor="end">Pd + BaSO<tspan dy="3" font-size="9">4</tspan></text>
                  <text x="206" y="88" fill="currentColor" stroke="none" font-size="12" text-anchor="start">+H<tspan dy="3" font-size="9">2</tspan></text>

                  <!-- Right diagonal arrow: Alkyne -> Alkane -->
                  <line x1="305" y1="36" x2="385" y2="115" />
                  <polygon points="388,118 378,115 384,109" fill="currentColor" stroke="none" />
                  <text x="358" y="68" fill="currentColor" stroke="none" font-size="12" text-anchor="start">+2H<tspan dy="3" font-size="9">2</tspan></text>
                  <text x="342" y="92" fill="currentColor" stroke="none" font-size="12" text-anchor="end">Ni, 180°C</text>

                  <!-- Bottom horizontal arrow: Alkene -> Alkane -->
                  <line x1="175" y1="136" x2="355" y2="136" />
                  <polygon points="358,136 350,132 350,140" fill="currentColor" stroke="none" />
                  <text x="265" y="126" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">+H<tspan dy="3" font-size="9">2</tspan></text>
                  <text x="265" y="154" fill="currentColor" stroke="none" font-size="12" text-anchor="middle">Ni, 180°C</text>
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>অ্যালকিন-1, অ্যালকাইন-1 এর পার্থক্যকারী বিক্রিয়া</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ক্র.নং</th>
            <th>বিকারকসমূহ</th>
            <th>অ্যালকিন-1<br>$\\ce{RCH=CH2, CH2=CH2}$</th>
            <th>অ্যালকাইন-1<br>$\\ce{R-C#C-H, H-C#C-H}$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>(i)</td>
            <td>ব্রোমিন দ্রবণ পরীক্ষা</td>
            <td>
              ব্রোমিনের লাল দ্রবণ বর্ণহীন হয়।
              $$\\ce{CH2=CH2 + Br2 -> BrCH2-CH2Br}$$
            </td>
            <td>
              ব্রোমিনের লাল দ্রবণ বর্ণহীন হয়।
              $$\\ce{H-C#C-H + 2Br2 -> H-\\overset{\\overset{\\ce{Br}}{|}}{\\underset{\\underset{\\ce{Br}}{|}}{C}}-\\overset{\\overset{\\ce{Br}}{|}}{\\underset{\\underset{\\ce{Br}}{|}}{C}}-H}$$
            </td>
          </tr>
          <tr>
            <td>(ii)</td>
            <td>বেয়ারের $\\ce{KMnO4}$ দ্রবণ পরীক্ষা</td>
            <td>
              $\\ce{KMnO4}$ দ্রবণের গোলাপী বর্ণ দূর হয়।
              $$\\ce{CH2=CH2 + [O] + H2O -> \\underset{\\underset{\\ce{OH}}{|}}{C}H2-\\underset{\\underset{\\ce{OH}}{|}}{C}H2}$$
            </td>
            <td>
              $\\ce{KMnO4}$ দ্রবণের গোলাপী বর্ণ দূরীভূত হয়।
              $$\\ce{RC#CH + 4[O] -> RCOOH + CO2}$$
            </td>
          </tr>
          <tr>
            <td>(iii)</td>
            <td>অ্যামোনিয়া মিশ্রিত $\\ce{AgNO3}$ দ্রবণসহ পরীক্ষা</td>
            <td>এ বিকারকসহ কোন বিক্রিয়া ঘটে না।</td>
            <td>
              সিলভার অ্যালকাইনাইড (বা অ্যাসিটিলাইড) এর সাদা অধঃক্ষেপ পড়ে।
              $$\\ce{RC#CH + [Ag(NH3)2]NO3 -> \\underset{\\text{সাদা অধঃক্ষেপ}}{R-C#C.Ag} + NH4NO3 + NH3}$$
            </td>
          </tr>
          <tr>
            <td>(iv)</td>
            <td>অ্যামোনিয়া মিশ্রিত কিউপ্রাস ক্লোরাইড দ্রবণসহ পরীক্ষা</td>
            <td>এ বিকারকসহ কোন বিক্রিয়া ঘটে না।</td>
            <td>
              কপার অ্যালকাইনাইড বা অ্যাসিটিলাইড এর লাল অধঃক্ষেপ পড়ে।
              $$\\ce{HC#CH + 2[Cu(NH3)2]Cl -> \\underset{\\text{লাল অধঃক্ষেপ}}{Cu.C#C.Cu} + 2NH4Cl + 2NH3}$$
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`
  }
];

export const ALL_SECTIONS: TopicItem[] = [
  ...BATCH_1_SECTIONS,
  ...BATCH_2_SECTIONS,
  ...BATCH_3_SECTIONS,
  ...BATCH_4_SECTIONS,
  ...BATCH_5_SECTIONS
];

export const MAIN_NAVIGATION_TOPICS: TopicItem[] = ALL_SECTIONS.filter(
  (s) => s.isMainTopic !== false
);

export function getRawBatch3SectionsHtml(): string {
  return BATCH_3_SECTIONS.map((s) => s.html).join('\n\n');
}

export function getBatch3NavigationLinksHtml(): string {
  return BATCH_3_SECTIONS.map(
    (s) =>
      `  <a class="topic-link" href="#${s.id}" onclick="togglePanel('topic-panel')">${s.title}</a>`
  ).join('\n');
}

export function getRawBatch4SectionsHtml(): string {
  return BATCH_4_SECTIONS.map((s) => s.html).join('\n\n');
}

export function getBatch4NavigationLinksHtml(): string {
  return BATCH_4_SECTIONS.map(
    (s) =>
      `  <a class="topic-link" href="#${s.id}" onclick="togglePanel('topic-panel')">${s.title}</a>`
  ).join('\n');
}

export function getRawBatch5SectionsHtml(): string {
  return BATCH_5_SECTIONS.map((s) => s.html).join('\n\n');
}

export function getBatch5NavigationLinksHtml(): string {
  return BATCH_5_SECTIONS.map(
    (s) =>
      `  <a class="topic-link" href="#${s.id}" onclick="togglePanel('topic-panel')">${s.title}</a>`
  ).join('\n');
}

export function getAllSectionsHtml(): string {
  return ALL_SECTIONS.map((s) => s.html).join('\n\n');
}


