# Cross-Platform Native App Build Plan (Android, iOS, Windows, macOS, Linux — ARM64 & x86_64)

This guide explains how to package **Web Books by Afeed** (`dist/` build output) into native installers and store-ready binaries across **all 5 operating systems** and **both CPU architectures (`ARM64` / `aarch64` and `x86_64` / `x64`)**.

---

## Architecture Overview

Because **Web Books** is built with **React 19 + TypeScript + Vite**, a single `npm run build` produces a static, self-contained `dist/` bundle that can be wrapped into:

1. **Instant Progressive Web App (PWA)** — Works immediately on Android (Chrome / Samsung Internet), iOS/iPadOS (Safari), Samsung DeX, Windows, macOS, and Linux without app store fees.
2. **Android & iOS Native Apps (Capacitor v6)** — Produces native `.apk` / `.aab` (Google Play) and `.ipa` (Apple App Store) packages supporting `arm64-v8a`, `armeabi-v7a`, and `x86_64` (Chromebooks / Android Desktop / Emulators).
3. **Desktop Native Apps for Windows, macOS & Linux (Tauri v2)** — Uses each OS's native webview (WebView2 on Windows, WebKit on macOS, WebKitGTK on Linux) + a lightweight Rust binary (~4–8 MB installer instead of 150 MB Electron) compiled for both **ARM64** and **x86_64**.

---

## Part 1: Android & iOS Native App (Capacitor)

### 1. Install Capacitor CLI & Platforms
Run in your project root:
```bash
npm install @capacitor/core
npm install -D @capacitor/cli
npx cap init "Web Books" "com.afeed.webbooks" --web-dir dist
npm install @capacitor/android @capacitor/ios
```

### 2. Build & Sync Web Assets
```bash
npm run build
npx cap add android
npx cap add ios
npx cap sync
```

### 3. Android Multi-Architecture Build (`ARM64`, `ARMv7`, `x86_64`)
To generate separate small APKs for **ARM64 phones/tablets/foldables** (`arm64-v8a`), **older 32-bit ARM devices** (`armeabi-v7a`), and **x86_64 Chromebooks / Android Desktop / PC emulators** (`x86_64`), add this inside `android/app/build.gradle`:

```groovy
android {
    splits {
        abi {
            enable true
            reset()
            include "arm64-v8a", "armeabi-v7a", "x86_64"
            universalApk true // Also generates one universal APK that runs on both ARM and x86
        }
    }
}
```
Also enable **Samsung DeX, Foldable Continuity & Multi-Window** in `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:resizeableActivity="true"
    android:supportsRtl="true">
    <meta-data android:name="com.samsung.android.keepalive.density" android:value="true"/>
    <meta-data android:name="android.allow_multiple_resumed_activities" android:value="true" />
</application>
```
Then build from terminal or Android Studio:
```bash
cd android
./gradlew assembleRelease   # Outputs arm64-v8a, armeabi-v7a, x86_64, and universal APKs
./gradlew bundleRelease     # Outputs .aab for Google Play Store
```

### 4. iOS & iPadOS (`ARM64` + Apple Silicon Mac)
Requires macOS with Xcode installed:
```bash
npx cap open ios
```
- In Xcode, select your Team under **Signing & Capabilities**.
- Check **iPhone**, **iPad**, and **Mac (Designed for iPad / Mac Catalyst)** so it runs natively on iOS (`arm64`) and Apple Silicon Macs.
- Choose **Product → Archive** to export `.ipa` or upload to TestFlight / App Store.

---

## Part 2: Windows, macOS & Linux Native Desktop Apps (Tauri v2 — ARM64 & x86_64)

### 1. Prerequisites
- Install **Rust** (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`).
- Install Tauri CLI:
```bash
npm install -D @tauri-apps/cli@latest
npx tauri init
```
When prompted:
- **App name**: `Web Books`
- **Window title**: `Web Books by Afeed`
- **Web assets path**: `../dist`
- **Dev server URL**: `http://localhost:3000`
- **Frontend dev command**: `npm run dev`
- **Frontend build command**: `npm run build`

### 2. Build for Windows (`x86_64` & `ARM64` Snapdragon)
On Windows (with Visual Studio C++ Build Tools installed):
```bash
# Add Rust targets for Intel/AMD 64-bit and Windows on ARM64
rustup target add x86_64-pc-windows-msvc aarch64-pc-windows-msvc

# Build x86_64 (.exe NSIS & .msi installer)
npx tauri build --target x86_64-pc-windows-msvc

# Build ARM64 (Surface Pro / Snapdragon X Elite)
npx tauri build --target aarch64-pc-windows-msvc
```

### 3. Build for macOS (`ARM64` Apple Silicon M1–M4 + `x86_64` Intel Universal `.dmg`)
On macOS:
```bash
rustup target add aarch64-apple-darwin x86_64-apple-darwin

# Build Universal macOS binary (runs natively on BOTH Apple Silicon ARM64 & Intel x86_64!)
npx tauri build --target universal-apple-darwin
```

### 4. Build for Linux (`x86_64` & `ARM64 / aarch64` — `.deb`, `.rpm`, `.AppImage`)
On Ubuntu/Debian Linux:
```bash
sudo apt update && sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev

# Build for x86_64 PC
npx tauri build --target x86_64-unknown-linux-gnu

# Build for Linux ARM64 (Raspberry Pi 5, ARM laptops/tablets, Asahi Linux)
rustup target add aarch64-unknown-linux-gnu
npx tauri build --target aarch64-unknown-linux-gnu
```

---

## Part 3: Automated GitHub Actions Matrix (Builds All OS + ARM64/x86 Automatically)

You can add `.github/workflows/release-native.yml` to your GitHub repo so GitHub's cloud servers compile **Windows (x64 + ARM64)**, **macOS (Universal ARM64 + Intel)**, **Linux (x64 + ARM64)**, and **Android (Universal + Split ABI APK)** automatically on every release tag (`v1.0.0`) without needing to own a Mac or Linux machine locally.
