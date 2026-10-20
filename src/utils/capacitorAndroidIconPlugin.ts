import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

export const ANDROID_IC_LAUNCHER_VALUES_BG_XML = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#080D1A</color>
</resources>
`;

export const ANDROID_IC_LAUNCHER_DRAWABLE_BG_XML = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aapt="http://schemas.android.com/aapt"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path android:pathData="M0,0h108v108h-108z">
        <aapt:attr name="android:fillColor">
            <gradient
                android:startX="0"
                android:startY="0"
                android:endX="108"
                android:endY="108"
                android:type="linear">
                <item android:color="#FF0F172A" android:offset="0.0" />
                <item android:color="#FF020617" android:offset="1.0" />
            </gradient>
        </aapt:attr>
    </path>
</vector>
`;

export const ANDROID_IC_LAUNCHER_DRAWABLE_FG_XML = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aapt="http://schemas.android.com/aapt"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="768"
    android:viewportHeight="768">
    <!-- Notebook Card Body -->
    <path
        android:fillColor="#FF121218"
        android:strokeColor="#FF27272F"
        android:strokeWidth="8"
        android:pathData="M258,204 H510 A44,44 0 0 1 554,248 V520 A44,44 0 0 1 510,564 H258 A44,44 0 0 1 214,520 V248 A44,44 0 0 1 258,204 Z" />
    <!-- Sky-Blue Top Header -->
    <path
        android:pathData="M214,248 C214,223.699 233.699,204 258,204 H510 C534.301,204 554,223.699 554,248 V286 H214 V248 Z">
        <aapt:attr name="android:fillColor">
            <gradient
                android:startX="214"
                android:startY="204"
                android:endX="554"
                android:endY="286"
                android:type="linear">
                <item android:color="#FF38BDF8" android:offset="0.0" />
                <item android:color="#FF0284C7" android:offset="1.0" />
            </gradient>
        </aapt:attr>
    </path>
    <!-- Header Camera/Status Dot & Bar -->
    <path
        android:fillColor="#FF020617"
        android:pathData="M262,245 A12,12 0 1 0 286,245 A12,12 0 1 0 262,245 Z" />
    <path
        android:fillColor="#FF020617"
        android:pathData="M312,237 H426 A8,8 0 0 1 434,245 A8,8 0 0 1 426,253 H312 A8,8 0 0 1 304,245 A8,8 0 0 1 312,237 Z" />
    <!-- Reading Text Lines -->
    <path
        android:fillColor="#FFF8FAFC"
        android:pathData="M266,334 H456 A10,10 0 0 1 466,344 A10,10 0 0 1 456,354 H266 A10,10 0 0 1 256,344 A10,10 0 0 1 266,334 Z" />
    <path
        android:fillColor="#FF94A3B8"
        android:pathData="M263,374 H505 A7,7 0 0 1 512,381 A7,7 0 0 1 505,388 H263 A7,7 0 0 1 256,381 A7,7 0 0 1 263,374 Z" />
    <path
        android:fillColor="#FF94A3B8"
        android:pathData="M263,406 H479 A7,7 0 0 1 486,413 A7,7 0 0 1 479,420 H263 A7,7 0 0 1 256,413 A7,7 0 0 1 263,406 Z" />
    <!-- Web Globe Emblem -->
    <path
        android:fillColor="#00000000"
        android:strokeColor="#FF38BDF8"
        android:strokeWidth="9"
        android:pathData="M342,488 A42,42 0 1 0 426,488 A42,42 0 1 0 342,488 Z" />
    <path
        android:fillColor="#00000000"
        android:strokeColor="#FF38BDF8"
        android:strokeWidth="7"
        android:pathData="M364,488 A20,42 0 1 0 404,488 A20,42 0 1 0 364,488 Z" />
    <path
        android:fillColor="#00000000"
        android:strokeColor="#FF38BDF8"
        android:strokeWidth="7"
        android:strokeLineCap="round"
        android:pathData="M342,488 L426,488" />
    <path
        android:fillColor="#00000000"
        android:strokeColor="#FF38BDF8"
        android:strokeWidth="6"
        android:strokeLineCap="round"
        android:pathData="M350,466 Q384,476 418,466" />
    <path
        android:fillColor="#00000000"
        android:strokeColor="#FF38BDF8"
        android:strokeWidth="6"
        android:strokeLineCap="round"
        android:pathData="M350,510 Q384,500 418,510" />
</vector>
`;

export const ANDROID_ADAPTIVE_ICON_XML = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`;

const MIPMAP_DENSITIES = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi',
];

export function writeWebBooksAndroidResources(resDir: string, iconPngBuffer?: Buffer): void {
  const valuesDir = path.join(resDir, 'values');
  const drawableDir = path.join(resDir, 'drawable');
  const drawableV24Dir = path.join(resDir, 'drawable-v24');
  const mipmapAnyDpiDir = path.join(resDir, 'mipmap-anydpi-v26');

  fs.mkdirSync(valuesDir, { recursive: true });
  fs.mkdirSync(drawableDir, { recursive: true });
  fs.mkdirSync(drawableV24Dir, { recursive: true });
  fs.mkdirSync(mipmapAnyDpiDir, { recursive: true });

  fs.writeFileSync(path.join(valuesDir, 'ic_launcher_background.xml'), ANDROID_IC_LAUNCHER_VALUES_BG_XML, 'utf8');
  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_background.xml'), ANDROID_IC_LAUNCHER_DRAWABLE_BG_XML, 'utf8');
  fs.writeFileSync(path.join(drawableV24Dir, 'ic_launcher_foreground.xml'), ANDROID_IC_LAUNCHER_DRAWABLE_FG_XML, 'utf8');
  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_foreground.xml'), ANDROID_IC_LAUNCHER_DRAWABLE_FG_XML, 'utf8');
  fs.writeFileSync(path.join(mipmapAnyDpiDir, 'ic_launcher.xml'), ANDROID_ADAPTIVE_ICON_XML, 'utf8');
  fs.writeFileSync(path.join(mipmapAnyDpiDir, 'ic_launcher_round.xml'), ANDROID_ADAPTIVE_ICON_XML, 'utf8');

  if (iconPngBuffer) {
    for (const density of MIPMAP_DENSITIES) {
      const densityDir = path.join(resDir, density);
      fs.mkdirSync(densityDir, { recursive: true });
      fs.writeFileSync(path.join(densityDir, 'ic_launcher.png'), iconPngBuffer);
      fs.writeFileSync(path.join(densityDir, 'ic_launcher_round.png'), iconPngBuffer);
      fs.writeFileSync(path.join(densityDir, 'ic_launcher_foreground.png'), iconPngBuffer);
    }
  }
}

export function syncNativeAppIcons(rootDir: string): void {
  try {
    const publicIconPngPath = path.join(rootDir, 'public', 'pwa-512x512.png');
    const iconPngBuffer = fs.existsSync(publicIconPngPath)
      ? fs.readFileSync(publicIconPngPath)
      : undefined;

    // 1. Ensure Electron Builder (build/icon.png) uses the Web Books icon
    if (iconPngBuffer) {
      const electronBuildDir = path.join(rootDir, 'build');
      fs.mkdirSync(electronBuildDir, { recursive: true });
      fs.writeFileSync(path.join(electronBuildDir, 'icon.png'), iconPngBuffer);
    }

    // 2. If ./android already exists, apply Web Books launcher icons directly
    const existingAndroidRes = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
    if (fs.existsSync(existingAndroidRes)) {
      writeWebBooksAndroidResources(existingAndroidRes, iconPngBuffer);
    }

    // 3. Patch @capacitor/cli so `npx cap add android` (run in CI after `npm run build`)
    // automatically installs the Web Books launcher icons instead of Capacitor's default X icon
    const capAndroidDir = path.join(rootDir, 'node_modules', '@capacitor', 'cli', 'dist', 'android');
    const capAddJsPath = path.join(capAndroidDir, 'add.js');
    if (fs.existsSync(capAddJsPath)) {
      const helperScriptPath = path.join(capAndroidDir, 'webbooks-icon-sync.js');
      const helperScriptContent = `"use strict";
const fs = require("fs");
const path = require("path");

const VALUES_BG_XML = ${JSON.stringify(ANDROID_IC_LAUNCHER_VALUES_BG_XML)};
const DRAWABLE_BG_XML = ${JSON.stringify(ANDROID_IC_LAUNCHER_DRAWABLE_BG_XML)};
const DRAWABLE_FG_XML = ${JSON.stringify(ANDROID_IC_LAUNCHER_DRAWABLE_FG_XML)};
const ADAPTIVE_ICON_XML = ${JSON.stringify(ANDROID_ADAPTIVE_ICON_XML)};
const DENSITIES = ${JSON.stringify(MIPMAP_DENSITIES)};

function applyWebBooksAndroidIcons(platformDirAbs) {
  try {
    const resDir = path.join(platformDirAbs, "app", "src", "main", "res");
    const valuesDir = path.join(resDir, "values");
    const drawableDir = path.join(resDir, "drawable");
    const drawableV24Dir = path.join(resDir, "drawable-v24");
    const mipmapAnyDpiDir = path.join(resDir, "mipmap-anydpi-v26");

    fs.mkdirSync(valuesDir, { recursive: true });
    fs.mkdirSync(drawableDir, { recursive: true });
    fs.mkdirSync(drawableV24Dir, { recursive: true });
    fs.mkdirSync(mipmapAnyDpiDir, { recursive: true });

    fs.writeFileSync(path.join(valuesDir, "ic_launcher_background.xml"), VALUES_BG_XML, "utf8");
    fs.writeFileSync(path.join(drawableDir, "ic_launcher_background.xml"), DRAWABLE_BG_XML, "utf8");
    fs.writeFileSync(path.join(drawableV24Dir, "ic_launcher_foreground.xml"), DRAWABLE_FG_XML, "utf8");
    fs.writeFileSync(path.join(drawableDir, "ic_launcher_foreground.xml"), DRAWABLE_FG_XML, "utf8");
    fs.writeFileSync(path.join(mipmapAnyDpiDir, "ic_launcher.xml"), ADAPTIVE_ICON_XML, "utf8");
    fs.writeFileSync(path.join(mipmapAnyDpiDir, "ic_launcher_round.xml"), ADAPTIVE_ICON_XML, "utf8");

    const projectRoot = path.resolve(platformDirAbs, "..");
    const pngCandidates = [
      path.join(projectRoot, "public", "pwa-512x512.png"),
      path.join(projectRoot, "dist", "pwa-512x512.png"),
    ];
    const pngSource = pngCandidates.find((candidate) => fs.existsSync(candidate));
    if (pngSource) {
      const buf = fs.readFileSync(pngSource);
      for (const density of DENSITIES) {
        const densityDir = path.join(resDir, density);
        fs.mkdirSync(densityDir, { recursive: true });
        fs.writeFileSync(path.join(densityDir, "ic_launcher.png"), buf);
        fs.writeFileSync(path.join(densityDir, "ic_launcher_round.png"), buf);
        fs.writeFileSync(path.join(densityDir, "ic_launcher_foreground.png"), buf);
      }
    }
  } catch (err) {
    console.warn("Warning: Failed to sync Web Books Android launcher icons:", err);
  }
}

module.exports = { applyWebBooksAndroidIcons };
`;
      fs.writeFileSync(helperScriptPath, helperScriptContent, 'utf8');

      const currentAddJs = fs.readFileSync(capAddJsPath, 'utf8');
      if (!currentAddJs.includes('webbooks-icon-sync')) {
        const targetSnippet = `return (0, template_1.extractTemplate)(config.cli.assets.android.platformTemplateArchiveAbs, config.android.platformDirAbs);`;
        const replacementSnippet = `await (0, template_1.extractTemplate)(config.cli.assets.android.platformTemplateArchiveAbs, config.android.platformDirAbs); require("./webbooks-icon-sync").applyWebBooksAndroidIcons(config.android.platformDirAbs);`;
        if (currentAddJs.includes(targetSnippet)) {
          fs.writeFileSync(
            capAddJsPath,
            currentAddJs.replace(targetSnippet, replacementSnippet),
            'utf8'
          );
        }
      }
    }
  } catch (err) {
    console.warn('Warning: Native icon sync encountered a non-fatal error:', err);
  }
}

export function webBooksNativeIconsPlugin(): Plugin {
  return {
    name: 'web-books-native-icons',
    buildStart() {
      syncNativeAppIcons(process.cwd());
    },
    closeBundle() {
      syncNativeAppIcons(process.cwd());
    },
  };
}
