export interface TopicItem {
  id: string;
  title: string;
  category: 'batch-1-alkane' | 'batch-2-alkene';
  pageSource: string;
  html: string;
}

/**
 * Batch 1 (Pages 1-4 from first upload): Aliphatic Hydrocarbons & Alkanes
 */
export const BATCH_1_ALKANE_SECTIONS: TopicItem[] = [
  {
    id: 'topic-aliphatic-sources',
    title: '১. অ্যালিফেটিক হাইড্রোকার্বনের উৎস ও নকিং (Knocking)',
    category: 'batch-1-alkane',
    pageSource: 'পর্ব ১: পৃষ্ঠা ১ ও ২',
    html: `  <!-- SECTION A1: ALIPHATIC HYDROCARBON SOURCES & KNOCKING -->
  <section id="topic-aliphatic-sources" class="topic-section">
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
    title: '২. অ্যালকেনের সাধারণ প্রস্তুত প্রণালী ও শনাক্তকরণ',
    category: 'batch-1-alkane',
    pageSource: 'পর্ব ১: পৃষ্ঠা ২ ও ৩',
    html: `  <!-- SECTION A2: ALKANE PREPARATION, WURTZ & SCHIEVER'S TEST -->
  <section id="topic-alkane-prep" class="topic-section">
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
    category: 'batch-1-alkane',
    pageSource: 'পর্ব ১: পৃষ্ঠা ৩ ও ৪',
    html: `  <!-- SECTION A3: PHYSICAL PROPERTIES & HALOGENATION OF ALKANES -->
  <section id="topic-alkane-halogenation" class="topic-section">
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
    category: 'batch-1-alkane',
    pageSource: 'পর্ব ১: পৃষ্ঠা ৪',
    html: `  <!-- SECTION A4: FURTHER ALKANE REACTIONS & REFORMING / AROMATIZATION -->
  <section id="topic-alkane-reforming" class="topic-section">
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

        <!-- Custom Adaptive SVG for Reforming / Aromatization Reactions (n-Hexane, n-Heptane, n-Octane) -->
        <div class="svg-diagram">
          <svg viewBox="0 0 860 390" width="100%" height="390" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- ================= ROW 1: n-Hexane to Benzene ================= -->
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

            <!-- ================= ROW 2: n-Heptane to Toluene ================= -->
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

            <!-- ================= ROW 3: n-Octane to o-Xylene & p-Xylene ================= -->
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
 * Batch 2 (Pages 1-3 from current upload):
 * - Page 1: Reforming / Aromatization Summary Table (n-Hexane, n-Heptane, n-Octane)
 * - Page 2 & Page 3 (top): Alkene Intro & General Preparation Methods (i)-(v) + Caution + Zaitsev/Saytzeff & Lindlar notes
 * - Page 3 (bottom): Electrophilic Addition of Alkene (General Mechanism + Ethene + HCl), Markovnikov's Rule (90%/10% diagram), Anti-Markovnikov / Kharasch Peroxide Effect (99.1%/0.9% cyclic radical diagram), and HBr Caution.
 */
export const BATCH_2_ALKENE_SECTIONS: TopicItem[] = [
  {
    id: 'topic-reforming-table',
    title: '৫. রিফরমিং (অ্যারোমেটিকরণ) বিক্রিয়ার সারণি',
    category: 'batch-2-alkene',
    pageSource: 'পর্ব ২: পৃষ্ঠা ১ (Page 1)',
    html: `  <!-- SECTION B1: REFORMING / AROMATIZATION SUMMARY TABLE (From Page 1) -->
  <section id="topic-reforming-table" class="topic-section">
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
    title: '৬. অ্যালকিন ও অ্যালকিনের সাধারণ প্রস্তুত প্রণালী',
    category: 'batch-2-alkene',
    pageSource: 'পর্ব ২: পৃষ্ঠা ২ ও ৩ (Page 2 & 3)',
    html: `  <!-- SECTION B2: ALKENE INTRO & PREPARATION (From Page 2 & 3) -->
  <section id="topic-alkene-prep" class="topic-section">
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
    title: '৭. অ্যালকিনের ইলেকট্রোফিলিক সংযোজন, মার্কনিকভ ও এন্টিমার্কনিকভ নীতি',
    category: 'batch-2-alkene',
    pageSource: 'পর্ব ২: পৃষ্ঠা ৩ (Page 3)',
    html: `  <!-- SECTION B3: ELECTROPHILIC ADDITION, MARKOVNIKOV & ANTI-MARKOVNIKOV (From Page 3) -->
  <section id="topic-markovnikov" class="topic-section">
    <h2>অ্যালকিনের ইলেকট্রোফিলিক সংযোজন বিক্রিয়া (সাধারণ কৌশল)</h2>

    <!-- Custom Adaptive SVG for General Mechanism & Ethene + HCl Curved Arrows -->
    <div class="svg-diagram">
      <svg viewBox="0 0 760 220" width="100%" height="220" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- ================= LINE 1: General Alkene + A+ -> Carbonium Ion -> Adduct ================= -->
        <!-- >C = C< -->
        <line x1="35" y1="44" x2="50" y2="54" />
        <line x1="35" y1="64" x2="50" y2="54" />
        <text x="53" y="60" fill="currentColor" stroke="none" font-size="18">C = C</text>
        <line x1="115" y1="44" x2="102" y2="54" />
        <line x1="115" y1="64" x2="102" y2="54" />
        <text x="45" y="88" fill="currentColor" stroke="none" font-size="14">(অ্যালকিন)</text>

        <!-- Curved arrow on C=C bond -->
        <path d="M 78 44 Q 88 30 98 42" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="99,44 93,39 98,36" fill="#38bdf8" stroke="none" />

        <text x="128" y="60" fill="currentColor" stroke="none" font-size="18">+</text>
        <text x="155" y="60" fill="currentColor" stroke="none" font-size="18" font-weight="bold">A<tspan dy="-6" font-size="13">+</tspan></text>

        <!-- Curved arrow from C to A+ -->
        <path d="M 105 42 Q 135 20 160 40" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="162,42 154,39 158,34" fill="#38bdf8" stroke="none" />

        <!-- Reaction Arrow 1 -->
        <line x1="190" y1="54" x2="245" y2="54" />
        <polygon points="248,54 240,50 240,58" fill="currentColor" stroke="none" />

        <!-- >C+ - C - A (Temporary Carbonium Ion) -->
        <line x1="265" y1="44" x2="280" y2="54" />
        <line x1="265" y1="64" x2="280" y2="54" />
        <text x="292" y="42" fill="currentColor" stroke="none" font-size="14" font-weight="bold">+</text>
        <text x="284" y="60" fill="currentColor" stroke="none" font-size="18">C – C – A</text>
        <!-- Vertical bonds on the second C -->
        <line x1="326" y1="32" x2="326" y2="44" />
        <line x1="326" y1="64" x2="326" y2="76" />
        <text x="255" y="96" fill="currentColor" stroke="none" font-size="14">(অস্থায়ী কার্বোনিয়াম আয়ন)</text>

        <!-- Reaction Arrow 2 (Fast step with B-) -->
        <text x="415" y="42" fill="currentColor" stroke="none" font-size="15">B<tspan dy="-5" font-size="12">−</tspan></text>
        <line x1="390" y1="54" x2="465" y2="54" />
        <polygon points="468,54 460,50 460,58" fill="currentColor" stroke="none" />
        <text x="405" y="73" fill="currentColor" stroke="none" font-size="13">খুব দ্রুত</text>

        <!-- Final Adduct: B - C - C - A -->
        <text x="485" y="60" fill="currentColor" stroke="none" font-size="18">B – C – C – A</text>
        <!-- Vertical bonds on both C atoms -->
        <line x1="524" y1="32" x2="524" y2="44" />
        <line x1="524" y1="64" x2="524" y2="76" />
        <line x1="561" y1="32" x2="561" y2="44" />
        <line x1="561" y1="64" x2="561" y2="76" />
        <text x="520" y="96" fill="currentColor" stroke="none" font-size="14">(যুত যৌগ)</text>

        <!-- ================= LINE 2: CH2=CH2 + HCl -> CH2+-CH3 + Cl- -> ClCH2-CH3 ================= -->
        <text x="115" y="168" fill="currentColor" stroke="none" font-size="17">CH<tspan dy="3" font-size="12">2</tspan><tspan dy="-3"> = CH</tspan><tspan dy="3" font-size="12">2</tspan><tspan dy="-3"> + HCl</tspan><tspan dy="-6" font-size="12">−</tspan></text>
        <text x="128" y="148" fill="currentColor" stroke="none" font-size="13">+</text>
        <!-- Curved arrow on CH2=CH2 -->
        <path d="M 156 152 Q 168 136 180 150" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="181,152 175,147 180,144" fill="#38bdf8" stroke="none" />

        <!-- Arrow 1 -->
        <line x1="275" y1="163" x2="328" y2="163" />
        <polygon points="331,163 323,159 323,167" fill="currentColor" stroke="none" />

        <!-- Intermediate: +CH2 - CH3 + Cl- -->
        <text x="348" y="148" fill="currentColor" stroke="none" font-size="13">+</text>
        <text x="342" y="168" fill="currentColor" stroke="none" font-size="17">CH<tspan dy="3" font-size="12">2</tspan><tspan dy="-3"> – CH</tspan><tspan dy="3" font-size="12">3</tspan><tspan dy="-3"> + Cl</tspan><tspan dy="-6" font-size="12">−</tspan></text>
        <!-- Curved arrow on intermediate -->
        <path d="M 355 150 Q 375 135 395 150" stroke="#38bdf8" stroke-width="1.8" fill="none" />
        <polygon points="396,152 389,148 393,144" fill="#38bdf8" stroke="none" />
        <text x="325" y="196" fill="currentColor" stroke="none" font-size="14">(ইথাইল কার্বোনিয়াম আয়ন)</text>

        <!-- Arrow 2 -->
        <line x1="472" y1="163" x2="538" y2="163" />
        <polygon points="541,163 533,159 533,167" fill="currentColor" stroke="none" />
        <text x="485" y="153" fill="currentColor" stroke="none" font-size="13">খুব দ্রুত</text>

        <!-- Product: ClCH2 - CH3 -->
        <text x="552" y="168" fill="currentColor" stroke="none" font-size="17">ClCH<tspan dy="3" font-size="12">2</tspan><tspan dy="-3"> – CH</tspan><tspan dy="3" font-size="12">3</tspan></text>
      </svg>
    </div>

    <details class="interactive-drop" open>
      <summary>মার্কনিকভের নীতি ও এন্টিমার্কনিকভ নীতি / বিপরীত মার্কনিকভ নীতি (খারাস এর পার অক্সাইড ফলাফল)</summary>
      <div class="drop-content">
        <p style="margin-top:0.75rem"><strong>মার্কনিকভের নীতি:</strong> “অপ্রতিসম অ্যালকিন এবং অপ্রতিসম বিকারকের সংযোজন বিক্রিয়ার ক্ষেত্রে বিকারক অণুর $\\ce{H}$ বা আপেক্ষিক ধনাত্মক ($\\delta+$) অংশ সেই কার্বনের সাথে যুক্ত হবে যার সাথে আগের থেকে যুক্ত $\\ce{H}$ সংখ্যা বেশি।” সুতরাং, মার্কনিকভের নীতিকে নিচের প্রবাদ দ্বারা প্রকাশ করা যায়- <em>“তেলা মাথায় তেল দেওয়া”</em>। এর মূল কারণ $\\rightarrow 2^\\circ$ কার্বোক্যাটায়ন $> 1^\\circ$ কার্বোক্যাটায়ন (স্থিতিশীলতা)</p>

        <!-- Custom Adaptive SVG for Markovnikov Branched Diagram (90% / 10%) -->
        <div class="svg-diagram">
          <svg viewBox="0 0 780 155" width="100%" height="155" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <text x="20" y="88" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH=CH</tspan><tspan dy="3" font-size="11">2</tspan></text>

            <!-- Curved arrow from double bond to H+Br- -->
            <path d="M 105 68 Q 145 42 182 65" stroke="#38bdf8" stroke-width="1.8" fill="none" />
            <polygon points="184,67 176,65 180,60" fill="#38bdf8" stroke="none" />

            <text x="172" y="76" fill="currentColor" stroke="none" font-size="15">H<tspan dy="-5" font-size="11">+</tspan><tspan dy="5">Br</tspan><tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="150" y1="84" x2="235" y2="84" />

            <!-- Branched Box Bracket -->
            <line x1="235" y1="42" x2="235" y2="122" />
            <line x1="235" y1="42" x2="275" y2="42" />
            <polygon points="278,42 270,38 270,46" fill="currentColor" stroke="none" />
            <line x1="235" y1="122" x2="275" y2="122" />
            <polygon points="278,122 270,118 270,126" fill="currentColor" stroke="none" />

            <!-- Top Branch (2° Carbocation, 90%) -->
            <text x="323" y="29" fill="currentColor" stroke="none" font-size="13">+</text>
            <text x="288" y="46" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH–CH</tspan><tspan dy="3" font-size="11">3</tspan></text>
            <text x="280" y="68" fill="currentColor" stroke="none" font-size="14">2° কার্বোক্যাটায়ন (90%)</text>

            <text x="462" y="34" fill="currentColor" stroke="none" font-size="14">Br<tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="445" y1="42" x2="510" y2="42" />
            <polygon points="513,42 505,38 505,46" fill="currentColor" stroke="none" />

            <text x="525" y="46" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CHBr–CH</tspan><tspan dy="3" font-size="11">3</tspan></text>
            <text x="575" y="68" fill="currentColor" stroke="none" font-size="14">90%</text>

            <!-- Bottom Branch (1° Carbocation, 10%) -->
            <text x="358" y="109" fill="currentColor" stroke="none" font-size="13">+</text>
            <text x="288" y="126" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH–CH</tspan><tspan dy="3" font-size="11">2</tspan></text>
            <text x="280" y="146" fill="currentColor" stroke="none" font-size="14">1° কার্বোক্যাটায়ন (10%)</text>

            <text x="462" y="114" fill="currentColor" stroke="none" font-size="14">Br<tspan dy="-5" font-size="11">−</tspan></text>
            <line x1="445" y1="122" x2="510" y2="122" />
            <polygon points="513,122 505,118 505,126" fill="currentColor" stroke="none" />

            <text x="525" y="126" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="575" y="146" fill="currentColor" stroke="none" font-size="14">10%</text>
          </svg>
        </div>

        <p style="margin-top:1rem"><strong>এন্টিমার্কনিকভ নীতি/ বিপরীত মার্কনিকভ নীতি (খারাস এর পার অক্সাইড ফলাফল):</strong> $\\ce{R2O2}$ বা, $\\ce{H2O2}$ এর উপস্থিতিতে মার্কনিকভের নিয়মের ঠিক উল্টোটা ঘটে অর্থাৎ যে কার্বনে কম সংখ্যক $\\ce{H}$ যুক্ত আছে, বিকারকের $\\ce{H}$ সেই কার্বনে যুক্ত হয়। এর কারণ $2^\\circ \\text{ free radical} > 1^\\circ \\text{ free radical}$ (স্থিতিশীলতা)</p>

        <!-- Custom Adaptive SVG for Anti-Markovnikov Branched & Cyclic Radical Diagram (99.1% / 0.9%) -->
        <div class="svg-diagram">
          <svg viewBox="0 0 780 185" width="100%" height="185" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <text x="15" y="88" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH=CH</tspan><tspan dy="3" font-size="11">2</tspan></text>

            <!-- Reaction line with HBr / R2O2 -->
            <text x="165" y="76" fill="currentColor" stroke="none" font-size="15">HBr</text>
            <line x1="145" y1="84" x2="225" y2="84" />
            <text x="162" y="103" fill="currentColor" stroke="none" font-size="14">R<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">O</tspan><tspan dy="3" font-size="10">2</tspan></text>

            <!-- Downward arrow from R2O2 to Br• + ROH -->
            <line x1="180" y1="112" x2="180" y2="142" />
            <polygon points="180,145 176,137 184,137" fill="currentColor" stroke="none" />
            <text x="150" y="164" fill="currentColor" stroke="none" font-size="15">Br<tspan dy="-6" font-size="13">•</tspan><tspan dy="6">+ROH</tspan></text>

            <!-- Curved loop arrow from Br• back to CH3-CH=CH2 -->
            <path d="M 145 160 Q 95 160 95 100" stroke="#38bdf8" stroke-width="1.8" fill="none" />
            <polygon points="95,97 91,105 99,105" fill="#38bdf8" stroke="none" />

            <!-- Branched Box Bracket -->
            <line x1="225" y1="42" x2="225" y2="128" />
            <line x1="225" y1="42" x2="265" y2="42" />
            <polygon points="268,42 260,38 260,46" fill="currentColor" stroke="none" />
            <line x1="225" y1="128" x2="265" y2="128" />
            <polygon points="268,128 260,124 260,132" fill="currentColor" stroke="none" />

            <!-- Top Branch: 2° Free Radical (99.1%) -->
            <text x="315" y="29" fill="currentColor" stroke="none" font-size="15">•</text>
            <text x="278" y="46" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="305" y="66" fill="currentColor" stroke="none" font-size="13">2° মুক্ত মূলক</text>
            <text x="278" y="84" fill="currentColor" stroke="none" font-size="13">বেশি স্থিতিশীল (99.1%)</text>

            <text x="478" y="34" fill="currentColor" stroke="none" font-size="15">H<tspan dy="-6" font-size="13">•</tspan></text>
            <line x1="450" y1="42" x2="515" y2="42" />
            <polygon points="518,42 510,38 510,46" fill="currentColor" stroke="none" />

            <text x="530" y="46" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">–CH</tspan><tspan dy="3" font-size="11">2</tspan><tspan dy="-3">Br</tspan></text>
            <text x="572" y="68" fill="currentColor" stroke="none" font-size="14">99.1%</text>

            <!-- Bottom Branch: 1° Free Radical (0.9%) -->
            <text x="368" y="115" fill="currentColor" stroke="none" font-size="15">•</text>
            <text x="278" y="132" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CHBr–CH</tspan><tspan dy="3" font-size="11">2</tspan></text>
            <text x="285" y="152" fill="currentColor" stroke="none" font-size="14">1° মুক্তমূলক (0.9%)</text>

            <text x="478" y="120" fill="currentColor" stroke="none" font-size="15">H<tspan dy="-6" font-size="13">•</tspan></text>
            <line x1="450" y1="128" x2="515" y2="128" />
            <polygon points="518,128 510,124 510,132" fill="currentColor" stroke="none" />

            <text x="530" y="132" fill="currentColor" stroke="none" font-size="16">CH<tspan dy="3" font-size="11">3</tspan><tspan dy="-3">–CHBr–CH</tspan><tspan dy="3" font-size="11">3</tspan></text>
            <text x="580" y="152" fill="currentColor" stroke="none" font-size="14">0.9%</text>
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

export const ALL_SECTIONS: TopicItem[] = [
  ...BATCH_1_ALKANE_SECTIONS,
  ...BATCH_2_ALKENE_SECTIONS
];

export function getRawBatch2SectionsHtml(): string {
  return BATCH_2_ALKENE_SECTIONS.map((s) => s.html).join('\n\n');
}

export function getAllSectionsHtml(): string {
  return ALL_SECTIONS.map((s) => s.html).join('\n\n');
}

export function filterSectionsByCategory(
  category: 'all' | 'batch-1-alkane' | 'batch-2-alkene'
): TopicItem[] {
  if (category === 'all') return ALL_SECTIONS;
  return ALL_SECTIONS.filter((s) => s.category === category);
}
