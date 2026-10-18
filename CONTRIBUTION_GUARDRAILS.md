# 🛡️ AI Studio Guardrails & Build Rules for Web Books

This file defines the strict rules that any AI assistant or developer working on **Web Books** must follow to ensure cross-platform native builds (**Android APK** and **Windows EXE**) never break.

---

## 🚫 PROTECTED FILES: DO NOT MODIFY, OVERWRITE, OR DELETE

The following files are configured for native packaging and automated CI/CD. **Never touch, alter, or remove them:**

1. **`main.cjs`** — Electron desktop entry point that loads `dist/index.html`.
2. **`capacitor.config.json`** — Capacitor Android packaging configuration.
3. **`.github/workflows/release-binaries.yml`** — GitHub Actions automated build pipeline for Windows `.exe` and Android `.apk`.
4. **`fdroid/metadata/com.afeed.webbooks.yml`** — F-Droid app store recipe.

---

## 🔒 PACKAGE.JSON INVARIANTS: NEVER REMOVE THESE SETTINGS

When updating `package.json`:
- **`"build": "vite build --base=./"`** — **CRITICAL**: The `--base=./` flag is strictly required so CSS, JS, and font assets use relative paths (`./assets/...`) and resolve correctly inside Android WebView (`capacitor://`) and Electron (`file://`).
- **`"main": "main.cjs"`** — Required by Electron to boot the desktop runner.
- **`"type": "module"`** — Required for Vite ES module syntax.
- **`"electron:dist"`** — Required script for packaging the Windows NSIS installer.
- **`"build"` configuration block** — Contains `appId`, `productName`, and NSIS build directory targets.
- **`electron` & `electron-builder`** — Must remain in `devDependencies`.
- **`@capacitor/android`, `@capacitor/cli`, `@capacitor/core`** — Must remain in `dependencies`.

---

## 📂 SAFE ZONE: WHERE CHANGES MUST OCCUR

All application changes, new features, new textbook chapters, and UI adjustments **must strictly remain within the `src/` directory**:

- **`src/utils/nctbCurriculumData.ts`** — Add or edit NCTB curriculum subjects, chapters, and Bangla/English semi-chapters.
- **`src/utils/chemistrySections.ts`** — Add or edit chemistry reactions, LaTeX mhchem equations, and inline SVG mechanisms.
- **`src/utils/libraryCatalog.ts`** — Folder hierarchy, navigation categories, and topic indexing logic.
- **`src/App.tsx`** — Application layout, reader UI, settings modals, and navigation stages.
- **`src/index.css`** — Tailwind CSS custom tokens and One UI styling.

---

## 📋 COPY-PASTE PROMPT TEMPLATE FOR AI STUDIO

Whenever asking AI Studio to add a new chapter, subject, or feature, prepend this block to your request:

```text
[WEB BOOKS BUILD GUARDRAIL]
I am developing Web Books, a React + TypeScript + Vite digital reader styled with Tailwind CSS (Samsung One UI aesthetic). This app compiles into a Web PWA, a native Android APK (via Capacitor), and a Windows EXE (via Electron).

Strict Rules for Your Code Output:
1. ONLY modify files inside the src/ directory (components, data files, hooks, styles).
2. NEVER modify, delete, or overwrite: main.cjs, capacitor.config.json, or .github/workflows/release-binaries.yml.
3. In package.json, ALWAYS preserve "build": "vite build --base=./", "main": "main.cjs", "type": "module", and the electron / capacitor dependencies.
4. Ensure all local asset loading, routing, and paths remain relative (./) so they work in both browser and native webview environments.
5. Do NOT introduce Node-only desktop APIs (fs, child_process) directly inside frontend React code.

Now, here is the feature / chapter / update I want to add:
[YOUR REQUEST HERE]
```
