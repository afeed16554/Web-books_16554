# <a href="https://afeed16554.github.io/Web-books_16554/">Web Books by Afeed</a>

> **Clean, Distraction-Free Multi-Platform Digital Concept Reader & Open-Source Chemistry Notebook**  
> *Engineered for students, educators, and lifelong learners — featuring OLED Pitch-Black mode, KaTeX `mhchem` mathematical chemistry rendering, adaptive 2D molecular SVGs, and zero data loss textbook transcription.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Android APK](https://img.shields.io/badge/Download-Android%20APK-3DDC84.svg?logo=android&logoColor=white)](https://github.com/afeed16554/Web-books_16554/releases/latest)
[![Windows EXE](https://img.shields.io/badge/Download-Windows%20EXE-0078D6.svg?logo=windows&logoColor=white)](https://github.com/afeed16554/Web-books_16554/releases/latest)
[![Web Live](https://img.shields.io/badge/Web%20App-Live%20Demo-blueviolet.svg?logo=googlechrome&logoColor=white)](https://afeed16554.github.io/Web-books_16554/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-ffca28.svg?logo=firebase)](https://firebase.google.com/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Design Philosophy (Ergonomic Dual-Area Architecture)](#design-philosophy-ergonomic-dual-area-architecture)
- [Key Features](#key-features)
- [User Guide & Instructions Manual](#user-guide--instructions-manual)
  - [1. Browsing & Navigation](#1-browsing--navigation)
  - [2. Display Modes & Accessibility](#2-display-modes--accessibility)
  - [3. Quick Topics & In-Reader Search](#3-quick-topics--in-reader-search)
  - [4. Student Profiles & Class Customization](#4-student-profiles--class-customization)
  - [5. Reading Chemistry Equations & Mechanisms](#5-reading-chemistry-equations--mechanisms)
  - [6. Admin & Educator Panel](#6-admin--educator-panel)
- [Data Flow & Security Architecture](#data-flow--security-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started & Local Development](#getting-started--local-development)
- [Building & Deployment](#building--deployment)
- [Downloads & Native Apps (Android APK & Windows EXE)](#-downloads--native-apps-android-apk--windows-exe)
- [Contributing](#contributing)
- [License](#license)
- [Author & Acknowledgments](#author--acknowledgments)

---

## 🌟 Overview

**Web Books by Afeed** transforms dense, cluttered textbooks into a modern, serene digital reading experience engineered for phones, foldables, DeX, and desktop PCs. 

Traditional physical textbooks often cram complex multi-step chemical reactions, conditions, temperatures, catalysts, and yields into narrow, hard-to-read print columns. **Web Books** eliminates cognitive overload by reorganizing materials into structured, expandable topic blocks with:
- **Responsive chemical reaction tables** with KaTeX `mhchem` LaTeX rendering.
- **Interactive mechanism dropdowns** (`<details class="mechanism-dropdown">`) for deep-dive step-by-step reaction pathways.
- **High-contrast caution cards** (`<div class="caution-box">`) for critical safety guidelines, exceptions, and exam tips.
- **Adaptive 2D inline SVGs** that dynamically adapt across **Pitch-Black OLED (#000000)**, **Warm Yellow Reading**, and **Clean Light** color themes.

---

## 📐 Design Philosophy (Ergonomic Dual-Area Architecture)

Engineered with an ergonomic dual-area architecture for effortless one-handed mobile reach and multi-window DeX / desktop productivity:

1. **Collapsible Viewing Area vs. Interaction Area**:
   - The top portion of the screen is a clean, collapsible **Viewing Area** providing immediate context (App name, current subject, chapter, or active filters) that smoothly retracts into the sticky header bar as you scroll.
   - The lower portion is an ergonomic **Interaction Area** containing cards and controls positioned within natural reach zones for one-handed thumb interaction.
2. **Three-Tier Hierarchical Drill-Down**:
   - **Stage 1 (Subjects)**: Tap Subject & Paper cards (e.g., *Chemistry 2nd Paper*, *Higher Math 1st Paper*).
   - **Stage 2 (Chapters)**: Choose specific chapters (e.g., *Chapter 2: Organic Chemistry*).
   - **Stage 3 (Topics)**: Select topic modules (e.g., *Aliphatic Hydrocarbons: Alkanes & Alkenes*).
   - **Stage 4 (Reader)**: Continuous-scroll, zero-distraction reader with clean header (`Chapter : Topic`).
3. **Responsive Workspace Expansion**:
   - Toggling the navigation sidebar automatically expands the reading canvas to 100% of the viewport with smooth CSS transitions (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
4. **Zero-Pill Discipline & Anti-AI Slop**:
   - Strictly avoid cluttered decorative badges, fake AI assist widgets, or noisy overlays. Every UI element has a purpose.

---

## ⚡ Key Features

- **OLED Dark Mode**: True `#000000` pitch black background for optimal battery life on AMOLED screens and comfortable nighttime reading.
- **Warm Reading Mode**: Gentle warm sepia background with amber accents for eye-strain reduction during prolonged study sessions.
- **Dynamic Font Scaling**: Slider control from 14px to 26px font sizes with instant preview.
- **Class Filtering**: Quick filters covering Class 1–8, Class 9–10 (SSC), and Class 11–12 (HSC).
- **Offline-First Persistence**: Theme preferences, font sizes, class filters, and student profiles are saved in `localStorage` immediately, and seamlessly synced with Google Cloud Firestore upon Google Sign-In.
- **KaTeX Chemistry & Inline SVGs**: Full LaTeX chemical formulas (`\ce{...}`), temperature arrows (`\xrightarrow[\text{170^\circ C}]{\Delta}`), Bangla sub-labels (`\underset{\text{অ্যালকোহল}}{\ce{R-OH}}`), and curved electron-pushing arrow SVGs.
- **Admin Topic Publishing**: Authorized educator accounts can compose, preview, and publish new structured topic blocks directly from the browser.
- **Feedback Loop**: Integrated student feedback modal connected directly to Cloud Firestore.

---

## 📘 User Guide & Instructions Manual

### 1. Browsing & Navigation
* **Home Page**: Displays subjects and papers tailored to your class.
* **Selecting a Subject**: Tap on any subject card (e.g., *Chemistry 2nd Paper*).
* **Browsing Chapters**: View chapter titles with topic counts and read-time estimates. Tap any chapter to reveal its topic syllabus.
* **Reading a Topic**: Tap any topic card to enter the continuous-scroll reader.
* **Back Button**: Tap the back arrow (`←`) in the header to navigate up one level (Reader → Topics → Chapters → Subjects).

### 2. Display Modes & Accessibility
1. Tap the **Settings Gear (⚙️)** in the sidebar or menu.
2. Under the **Display Mode** tab, choose your preferred theme:
   - **OLED Dark**: Pure pitch-black background (`#000000`), emerald-cyan accents, minimal eye fatigue.
   - **Reading Sepia**: Warm parchment tone (`#fbf5e8`), amber accents, perfect for daylight.
   - **Light**: Crisp white paper style (`#f8fafc`), royal blue accents.
3. Adjust the **Font Size Slider** to customize typography from small (14px) to large (26px).
4. Settings are automatically remembered across browser tabs and device restarts.

### 3. Quick Topics & In-Reader Search
* **Quick Topics Menu**: When reading any topic, tap the list icon (`📑`) in the top-right corner of the header. A drawer will reveal all sections with one-tap jump links.
* **Search & Filter**: Tap the magnifying glass (`🔍`) in the header to search across all topics by title, chapter, subject, or keywords. You can also filter by Class, Subject, or Paper.

### 4. Student Profiles & Class Customization
1. Open **Settings → Account & Student Profile**.
2. Select your **Academic Class** (Class 1–8, Class 9–10 SSC, or Class 11–12 HSC).
3. Optionally enter your **School or College Name** and **Phone Number**.
4. Tap **Save Profile**. Your home screen will automatically personalize to show only your class's subjects. The sidebar remains accessible for browsing all other classes anytime.
5. Tap **Continue with Google** to sync your profile securely to the cloud.

### 5. Reading Chemistry Equations & Mechanisms
* **Standard Equations**: Rendered crisply with KaTeX and `mhchem`.
* **Important Notes & Mechanism**: Tap any dropdown labeled **"গুরুত্বপূর্ণ তথ্য ও কৌশল (Important Notes & Mechanism)"** to inspect step-by-step reaction pathways, Markovnikov / Anti-Markovnikov rules, and ozonolysis mechanisms.
* **Safety Warnings**: Highlighted in high-contrast caution boxes for precautions, temperatures, and explosive reaction boundaries.

### 6. Admin & Educator Panel
* **Authorized Sign-In**: Educators with verified admin emails (e.g., `fha16554@gmail.com`) automatically unlock the **Admin Panel** and **+ New Topic Page** buttons.
* **Creating Topics**: Use the built-in visual editor to enter Class, Subject, Chapter, Topic Title, and semantic HTML content.
* **Live KaTeX Preview**: Real-time rendering preview verifies all LaTeX equations and SVGs before publishing.
* **Exporting Code**: Tap the **HTML** button in the sidebar to export clean, modular HTML ready for archival or deployment.

---

## 🔒 Data Flow & Security Architecture

1. **Client-Side Storage (`localStorage`)**:
   - `web_books_theme`: Active color theme (`dark`, `yellow`, `light`).
   - `web_books_font_size`: Reader base font size in pixels.
   - `note_app_student_class`, `note_app_student_school`, `note_app_student_phone`: Offline student profile cache.
2. **Cloud Database (Firebase Firestore)**:
   - `/users/{userId}`: Stores authenticated user profile details.
     - Protected by `firestore.rules`: Users can only read and update their own document (`request.auth.uid == userId`).
   - `/feedbacks/{feedbackId}`: Stores user suggestions and issue reports.
     - Protected: Students can create feedback; only administrators can review feedback.
   - `/topicPages/{topicId}`: Published educational content.
     - Protected: Publicly readable by all students; strictly writable only by verified administrators.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Custom Properties |
| **Typography & Math** | [KaTeX 0.16.9](https://katex.org/) + `contrib/mhchem` |
| **Icons & Vectors** | Handcrafted SVG icons & 2D chemical reaction diagrams |
| **Cloud & Auth** | [Firebase 11](https://firebase.google.com/) (Authentication + Firestore) |
| **Testing** | Node.js Test Runner (`node:test`) |

---

## 🚀 Getting Started & Local Development

### Prerequisites
* [Node.js](https://nodejs.org/) v20 or higher
* `npm` or `bun`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/web-books.git
   cd web-books
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env.local` if custom Firebase credentials are required:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run automated unit tests**:
   ```bash
   npm test
   ```

---

## 📦 Building & Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```
This generates production-ready assets in the `dist/` directory.

### Preview Build Locally
```bash
npm run preview
```

---

## 📲 Downloads & Native Apps (Android APK & Windows EXE)

**Web Books by Afeed** provides verified, ready-to-use native packages for Android and Windows Desktop, built directly from this repository via automated GitHub Actions:

### 📥 Direct Downloads & Live Access

| Platform | Format | Status | Direct Download / Access Link |
| :--- | :--- | :--- | :--- |
| **Android Phone / Tablet / DeX** | `.apk` (Capacitor) | ✅ Ready | **[Download Latest Android APK](https://github.com/afeed16554/Web-books_16554/releases/latest)** |
| **Windows Desktop PC** | `.exe` (Electron Installer) | ✅ Ready | **[Download Latest Windows EXE](https://github.com/afeed16554/Web-books_16554/releases/latest)** |
| **Online Web App / PWA** | Web & Offline Service Worker | ✅ Live | **[Open Web Books Online](https://afeed16554.github.io/Web-books_16554/)** |
| **GitHub Releases Archive** | All Versions & Assets | ✅ Active | **[View All Releases & Downloads](https://github.com/afeed16554/Web-books_16554/releases)** |

---

### 📱 Installing on Android (.apk)

1. Open **[GitHub Releases Latest](https://github.com/afeed16554/Web-books_16554/releases/latest)** on your Android phone or tablet.
2. Scroll to the **Assets** section at the bottom of the release.
3. Download the `.apk` file (or `android-apk.zip`).
4. Tap the downloaded file to install:
   - If prompted by Android, toggle **"Allow from this source"** in your browser or file manager settings.
5. Tap **Open** and enjoy distraction-free reading!
6. **100% Offline Capability**: All subjects (Class 1 to 8, SSC, HSC), chemistry reaction notes, equations, formulas, and local student profiles work completely offline without needing mobile data or Google Sign-In.

---

### 💻 Installing on Windows (.exe)

1. Open **[GitHub Releases Latest](https://github.com/afeed16554/Web-books_16554/releases/latest)** on your Windows PC.
2. Under **Assets**, download `WebBooks-Setup.exe` (or `windows-exe.zip`).
3. Run the installer to install **Web Books** on your computer.
4. Launch the application from your Start Menu or Desktop shortcut.

---

### ⚙️ How the Automated Build Pipeline Works

This repository uses a fully automated continuous integration workflow defined in [`.github/workflows/release-binaries.yml`](.github/workflows/release-binaries.yml):

* **Android Native App**: Built with **Capacitor 6** (`capacitor.config.json`).
* **Windows Desktop App**: Packaged with **Electron 33** + **electron-builder** (`main.cjs` and `package.json`).
* **Automated Builds**: Whenever a new release tag starting with `v*` (e.g. `v1.0.1`, `v1.1.0`) is published on GitHub, GitHub Actions automatically compiles both the **Android APK** and **Windows EXE** and attaches them directly to the release page.
* **Manual Dispatch**: You can also trigger an immediate build from GitHub by going to **Actions** → **Build and Release Native Binaries** → **Run workflow**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## ✍️ Author & Acknowledgments

* **Creator**: **Afeed** (`fha16554@gmail.com`)
* **Project**: **Web Books**
* Engineered for multi-platform digital textbook reading across Phones, Foldables, DeX, and Desktop PCs.
