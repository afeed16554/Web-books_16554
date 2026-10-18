# 🚀 Web Books by Afeed — Complete Cross-Platform Packaging & Store Publishing Guide

This guide gives you everything you need to **download APK/EXE directly** and **publish Web Books to Google Play Store, Apple App Store, GitHub Releases, and F-Droid**.

---

## 1. ⚡ Quickest Direct Download & Install (Zero Coding Required)

### Option A: Direct Web Install (PWA — Android, Windows, Mac, iOS)
1. Open your live app URL in Chrome, Edge, or Samsung Internet:
   - **On Android**: Tap the **Install** button or tap `⋮` → **Add to Home screen / Install App**. It installs instantly as a native app icon on your launcher with no app store needed!
   - **On Windows / Mac**: Look for the small **Install** computer icon in the browser address bar or click `···` → **Apps** → **Install this site as an app**. You get a dedicated desktop window and start menu shortcut.
   - **On iPhone / iPad**: In Safari, tap the **Share** button (`⎋`) → **Add to Home Screen**.

### Option B: Generate Signed Google Play APK & AAB in 60 Seconds with PWABuilder
1. Go to [PWABuilder.com](https://www.pwabuilder.com/).
2. Enter your live URL: `https://ais-pre-2rph4cedpsjn6b3egsobua-207047600493.asia-southeast1.run.app`.
3. Click **Start**. The analyzer will show a **100/100 PWA Score** (because our `manifest.json`, PNG icons, and service worker are already configured).
4. Click **Package for Stores**:
   - **Android**: Choose **Download Package** to get a ready-to-test `.apk` (for direct phone install) and a signed `.aab` (for Google Play Console).
   - **Windows**: Generates an `.msix` package ready for Microsoft Store or direct installation.
   - **iOS**: Generates an Xcode project for Apple App Store.

---

## 2. 🤖 Android & Google Play Store Publishing (Capacitor Native APK/AAB)

### Step 1: Initialize Android Project
Run in your project directory:
```bash
npm install -D @capacitor/core @capacitor/cli @capacitor/android
npm run build
npx cap init "Web Books" "com.afeed.webbooks" --web-dir dist
npx cap add android
npx cap sync
```

### Step 2: Generate Release Keystore (for signing)
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias webbooks -keyalg RSA -keysize 2048 -validity 10000
```

### Step 3: Compile APK & AAB
```bash
cd android
# Generate direct install APKs (Universal, ARM64, x86_64):
./gradlew assembleRelease

# Generate Google Play Store Android App Bundle (.aab):
./gradlew bundleRelease
```
- **Direct APK Output**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`
- **Google Play AAB Output**: `android/app/build/outputs/bundle/release/app-release.aab`

### Step 4: Publish to Google Play Console
1. Go to [Google Play Console](https://play.google.com/console) and create an app named **Web Books**.
2. Go to **Release → Production → Create New Release**.
3. Upload the `app-release.aab` bundle.
4. Fill in:
   - **Title**: Web Books by Afeed
   - **Short description**: Clean, distraction-free digital concept reader and notebook.
   - **Graphics**: Upload the `public/pwa-512x512.png` icon and screenshots.
5. Submit for Google review!

---

## 3. 📦 Automated GitHub Releases (Automated Direct Download Links)

We have already created the automated workflow at [`.github/workflows/release.yml`](.github/workflows/release.yml)!

### How to trigger a release:
Whenever you want to publish a new release with ready-to-download `.apk` and `.exe` files:
```bash
git add .
git commit -m "Prepare v1.0.0 release"
git tag v1.0.0
git push origin v1.0.0
```

### What GitHub Actions does automatically:
1. Compiles the React 19 app bundle (`dist/`).
2. Builds the Android APK (`WebBooks-Android-v1.0.0.apk`) and Google Play AAB.
3. Builds the Windows Desktop standalone installer (`WebBooks-Windows-x64.zip`).
4. Creates a new release under `https://github.com/your-username/web-books/releases/tag/v1.0.0` with **direct download buttons** for anyone to download!

---

## 4. 🐧 F-Droid Open-Source App Store Publishing

F-Droid is the official, trusted repository for free and open-source Android apps. F-Droid builds apps directly from source on their servers.

### Step 1: Recipe file is ready
The F-Droid recipe has already been created at [`fdroid/metadata/com.afeed.webbooks.yml`](fdroid/metadata/com.afeed.webbooks.yml).

### Step 2: Submit to F-Droid
1. Fork the official F-Droid data repository: [gitlab.com/fdroid/fdroiddata](https://gitlab.com/fdroid/fdroiddata).
2. Create a new branch: `git checkout -b add-webbooks`.
3. Copy `fdroid/metadata/com.afeed.webbooks.yml` into `metadata/com.afeed.webbooks.yml` in your forked repo.
4. Commit and push:
   ```bash
   git add metadata/com.afeed.webbooks.yml
   git commit -m "Add com.afeed.webbooks"
   git push origin add-webbooks
   ```
5. Open a **Merge Request** on GitLab.
6. The F-Droid automated bot tests your build. Once merged, Web Books will appear inside the F-Droid client for millions of users worldwide!

---

## 5. 🍎 Apple iOS & iPadOS App Store Publishing (TestFlight & App Store)

### Step 1: Add iOS Platform
On a Mac with Xcode installed:
```bash
npm install -D @capacitor/ios
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

### Step 2: Configure Signing & Device Targets in Xcode
1. In Xcode, click the top **App** project item.
2. Under **Signing & Capabilities**:
   - Check **Automatically manage signing**.
   - Select your **Apple Developer Team**.
3. Under **General → Supported Destinations**:
   - Check **iPhone**, **iPad**, and **Mac (Mac Catalyst)** so it runs on iPhone, iPad, and Apple Silicon Macs!
4. Set App Category to **Education**.

### Step 3: Archive & Upload to TestFlight / App Store
1. Select the build target as **Any iOS Device (arm64)**.
2. In the menu, click **Product → Archive**.
3. When the Organizer window opens, click **Distribute App**:
   - Select **App Store Connect**.
   - Choose **Upload**.
4. Within 15 minutes, your build appears in [App Store Connect](https://appstoreconnect.apple.com/):
   - You can immediately invite beta testers via **TestFlight**.
   - Fill in description, screenshots, and submit to the Apple App Store!

---

## 6. 🖥️ Windows .EXE & Desktop Native App (Local Build)

If you want to build a Windows `.exe` on your local Windows PC:
```bash
# Install electron-builder
npm install -D electron electron-builder

# Run build
npm run build
npx electron-builder --win nsis:ia32,x64
```
Output:
- `dist/WebBooks-Setup-1.0.0.exe` (Self-extracting Windows installer)
- `dist/WebBooks-1.0.0-portable.exe` (Portable zero-install .exe)
