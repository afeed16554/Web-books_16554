# <a href="https://afeed16554.github.io/Web-books_16554/">Web Books by Afeed</a>

> **Clean, Distraction-Free Multi-Platform Digital Concept Reader & Open-Source Chemistry Notebook**  
> *Engineered for students, educators, and lifelong learners — featuring OLED Pitch-Black mode, KaTeX `mhchem` mathematical chemistry rendering, adaptive 2D molecular SVGs, and zero data loss textbook transcription.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-mhchem-05b584.svg)](https://katex.org/)
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

## 📱💻 Multi-OS Native App Plan (Android, iOS, Windows, macOS & Linux — ARM64 & x86_64)

Because **Web Books by Afeed** compiles to a self-contained static bundle (`dist/`), you can ship native apps across all 5 operating systems and both CPU architectures (`ARM64` & `x86_64`) from this single codebase:

### 1. Adaptive Form-Factor Matrix
| Form Factor | Viewport Range | Adaptive Grid & Layout Behavior |
| :--- | :--- | :--- |
| **Phones** | `< 640px` | 1-column focus blocks, slide-over drawer, thumb-reachable Collapsible Viewing Area |
| **Passport / Square Foldables** | `600px–940px` (`0.78–1.38` ratio) | Compact Viewing Area + balanced 2-column focus card grid |
| **Book Foldables & Tablets** | `640px–1179px` | 2-to-3 column focus grid + persistent or toggleable navigation sidebar |
| **DeX / Android Desktop & PC** | `>= 1180px` | 4-to-5 column focus grid + full keyboard/mouse ergonomics + header form-factor indicator |

### 2. Android (`.apk` / `.aab`) & iOS (`.ipa`) — Capacitor 6
1. Install Capacitor in the project root:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
   npx cap init "Web Books" com.afeed.webbooks --web-dir=dist
   npm run build
   npx cap add android
   npx cap add ios
   npx cap sync
   ```
2. **Android (`ARM64` + `x86_64`)**:
   - In `android/app/build.gradle`, enable multi-ABI support for phones/foldables (`arm64-v8a`) and Chromebooks / Android Desktop / Emulators (`x86_64`):
     ```groovy
     defaultConfig {
         ndk {
             abiFilters "arm64-v8a", "armeabi-v7a", "x86_64"
         }
     }
     ```
   - In `AndroidManifest.xml`, keep `android:resizeableActivity="true"` so DeX and foldable multi-window transitions work seamlessly.
   - Build signed APK/AAB via `cd android && ./gradlew assembleRelease bundleRelease`.
3. **iOS / iPadOS (`ARM64`)**:
   - Run `npx cap open ios` on macOS with Xcode and archive for iPhone & iPad (`arm64`).

### 3. Windows, macOS & Linux Desktop (`ARM64` + `x86_64`) — Tauri v2 (Rust)
Tauri v2 uses the operating system's native webview (WebView2 on Windows, WebKit on macOS/Linux) to produce ~6 MB native installers instead of 150 MB Electron bundles:
```bash
npm install -D @tauri-apps/cli@latest
npx tauri init

# Windows x86_64 & Windows on ARM64 (.msi / .exe NSIS):
npx tauri build --target x86_64-pc-windows-msvc
npx tauri build --target aarch64-pc-windows-msvc

# macOS Universal Binary (Apple Silicon ARM64 + Intel x86_64 .dmg / .app):
rustup target add aarch64-apple-darwin x86_64-apple-darwin
npx tauri build --target universal-apple-darwin

# Linux x86_64 & ARM64 (.deb / .AppImage / .rpm):
npx tauri build --target x86_64-unknown-linux-gnu
npx tauri build --target aarch64-unknown-linux-gnu
```

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
