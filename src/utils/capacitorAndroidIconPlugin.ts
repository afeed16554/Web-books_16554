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

export const ANDROID_MAIN_ACTIVITY_JAVA = `package com.getcapacitor.myapp;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.view.Gravity;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {
    private Dialog activeAuthDialog = null;
    private WebView activePopupWebView = null;

    private static final String INTERCEPT_CALLBACK_HTML =
        "<!DOCTYPE html><html><head><meta charset=\\"utf-8\\">" +
        "<meta name=\\"viewport\\" content=\\"width=device-width,initial-scale=1\\"></head>" +
        "<body style=\\"background:#080d1a;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;\\">" +
        "<div style=\\"text-align:center;padding:24px;\\">" +
        "<div style=\\"font-size:16px;font-weight:700;color:#38bdf8;margin-bottom:8px;\\">Signing in to Web Books...</div>" +
        "<div style=\\"font-size:12px;color:#94a3b8;\\">Completing secure Google authentication</div>" +
        "</div>" +
        "<script>" +
        "(function(){" +
        "var fullUrl=window.location.href||'';" +
        "if(window.WebBooksAndroidAuth&&window.WebBooksAndroidAuth.onAuthCallback){" +
        "window.WebBooksAndroidAuth.onAuthCallback(fullUrl);" +
        "}" +
        "if(window.opener){" +
        "try{window.opener.postMessage({type:'WEBBOOKS_GOOGLE_AUTH_CALLBACK',url:fullUrl},'*');}catch(e){}" +
        "}" +
        "try{window.close();}catch(e){}" +
        "})();" +
        "</script></body></html>";

    public class WebBooksJsBridge {
        @JavascriptInterface
        public void openGoogleLogin(final String oauthUrl) {
            runOnUiThread(() -> showGoogleAuthDialog(oauthUrl, null));
        }

        @JavascriptInterface
        public void onAuthCallback(final String callbackUrl) {
            runOnUiThread(() -> deliverAuthResultToMainWebView(callbackUrl));
        }

        @JavascriptInterface
        public void closeAuthDialog() {
            runOnUiThread(() -> dismissActiveAuthDialog());
        }
    }

    private void dismissActiveAuthDialog() {
        if (activePopupWebView != null) {
            try {
                activePopupWebView.destroy();
            } catch (Exception ignored) {}
            activePopupWebView = null;
        }
        if (activeAuthDialog != null) {
            try {
                if (activeAuthDialog.isShowing()) {
                    activeAuthDialog.dismiss();
                }
            } catch (Exception ignored) {}
            activeAuthDialog = null;
        }
    }

    private void deliverAuthResultToMainWebView(String callbackUrl) {
        if (callbackUrl == null || callbackUrl.isEmpty()) {
            return;
        }
        dismissActiveAuthDialog();
        if (this.bridge != null && this.bridge.getWebView() != null) {
            final String jsCall =
                "window.__handleWebBooksGoogleAuthCallback && window.__handleWebBooksGoogleAuthCallback(" +
                JSONObject.quote(callbackUrl) +
                ");";
            this.bridge.getWebView().evaluateJavascript(jsCall, null);
        }
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    private void showGoogleAuthDialog(String initialUrl, Message resultMsg) {
        dismissActiveAuthDialog();
        if (this.bridge == null || this.bridge.getWebView() == null) {
            return;
        }

        final Dialog authDialog = new Dialog(MainActivity.this, android.R.style.Theme_DeviceDefault_NoActionBar);
        activeAuthDialog = authDialog;

        LinearLayout rootLayout = new LinearLayout(MainActivity.this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.parseColor("#080D1A"));

        LinearLayout headerBar = new LinearLayout(MainActivity.this);
        headerBar.setOrientation(LinearLayout.HORIZONTAL);
        headerBar.setGravity(Gravity.CENTER_VERTICAL);
        headerBar.setBackgroundColor(Color.parseColor("#111827"));
        float density = getResources().getDisplayMetrics().density;
        int padH = (int) (16 * density);
        int padV = (int) (12 * density);
        headerBar.setPadding(padH, padV, padH, padV);

        TextView titleView = new TextView(MainActivity.this);
        titleView.setText("Google Sign-In · Web Books");
        titleView.setTextColor(Color.parseColor("#F8FAFC"));
        titleView.setTextSize(15f);
        headerBar.addView(
            titleView,
            new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
        );

        final WebView popupWebView = new WebView(MainActivity.this);
        activePopupWebView = popupWebView;

        TextView closeBtn = new TextView(MainActivity.this);
        closeBtn.setText("✕ Close");
        closeBtn.setTextColor(Color.parseColor("#38BDF8"));
        closeBtn.setTextSize(14f);
        closeBtn.setPadding(padH / 2, padV / 2, padH / 2, padV / 2);
        closeBtn.setOnClickListener(v -> dismissActiveAuthDialog());
        headerBar.addView(closeBtn);

        rootLayout.addView(
            headerBar,
            new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        );

        WebSettings mainSettings = this.bridge.getWebView().getSettings();
        String mainUa = mainSettings.getUserAgentString();
        String cleanUa = mainUa != null
            ? mainUa.replace("; wv", "").replace("Version/4.0 ", "")
            : "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

        WebSettings popupSettings = popupWebView.getSettings();
        popupSettings.setJavaScriptEnabled(true);
        popupSettings.setDomStorageEnabled(true);
        popupSettings.setDatabaseEnabled(true);
        popupSettings.setSupportMultipleWindows(true);
        popupSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        popupSettings.setUserAgentString(cleanUa);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(popupWebView, true);

        popupWebView.addJavascriptInterface(new WebBooksJsBridge(), "WebBooksAndroidAuth");

        popupWebView.setWebViewClient(new WebViewClient() {
            private boolean isOAuthReturnCallback(String url) {
                if (url == null) return false;
                if (!url.contains("/__/auth/handler")) return false;
                return url.contains("#access_token=") ||
                       url.contains("&access_token=") ||
                       url.contains("#id_token=") ||
                       url.contains("&id_token=") ||
                       url.contains("error=");
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                if (u != null && u.getPath() != null && u.getPath().contains("/__/auth/handler")) {
                    String query = u.getQuery();
                    // If Google is redirecting back to /__/auth/handler (no apiKey query param),
                    // serve our instant callback HTML so Firebase's handler.js never runs or fails on sessionStorage
                    if (query == null || !query.contains("apiKey=")) {
                        return new WebResourceResponse(
                            "text/html",
                            "UTF-8",
                            new ByteArrayInputStream(INTERCEPT_CALLBACK_HTML.getBytes(StandardCharsets.UTF_8))
                        );
                    }
                }
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (isOAuthReturnCallback(url)) {
                    deliverAuthResultToMainWebView(url);
                    return;
                }
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                String urlStr = u != null ? u.toString() : "";
                if (isOAuthReturnCallback(urlStr)) {
                    deliverAuthResultToMainWebView(urlStr);
                    return true;
                }
                String scheme = u != null && u.getScheme() != null ? u.getScheme().toLowerCase() : "";
                if ("http".equals(scheme) || "https".equals(scheme)) {
                    return false; // Keep all Google & Firebase OAuth redirects inside popupWebView
                }
                return true;
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (isOAuthReturnCallback(url)) {
                    deliverAuthResultToMainWebView(url);
                    return true;
                }
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    return false;
                }
                return true;
            }
        });

        popupWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onCloseWindow(WebView window) {
                dismissActiveAuthDialog();
            }
        });

        rootLayout.addView(
            popupWebView,
            new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                0,
                1f
            )
        );

        authDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        authDialog.setContentView(
            rootLayout,
            new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        );
        authDialog.setOnDismissListener(d -> {
            if (activePopupWebView != null) {
                try {
                    activePopupWebView.destroy();
                } catch (Exception ignored) {}
                activePopupWebView = null;
            }
            activeAuthDialog = null;
        });
        authDialog.show();

        if (resultMsg != null && resultMsg.obj instanceof WebView.WebViewTransport) {
            WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
            transport.setWebView(popupWebView);
            resultMsg.sendToTarget();
        } else if (initialUrl != null && !initialUrl.isEmpty()) {
            popupWebView.loadUrl(initialUrl);
        }
    }

    @Override
    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (this.bridge == null || this.bridge.getWebView() == null) {
            return;
        }
        final WebView mainWebView = this.bridge.getWebView();
        WebSettings settings = mainWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);

        String ua = settings.getUserAgentString();
        String cleanUa = ua != null
            ? ua.replace("; wv", "").replace("Version/4.0 ", "")
            : "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
        settings.setUserAgentString(cleanUa);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(mainWebView, true);

        mainWebView.addJavascriptInterface(new WebBooksJsBridge(), "WebBooksAndroidAuth");

        mainWebView.setWebChromeClient(new BridgeWebChromeClient(this.bridge) {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                showGoogleAuthDialog(null, resultMsg);
                return true;
            }
        });
    }
}
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

    // 2. Patch @capacitor/android Bridge.java so OAuth URLs never launch an external browser Intent
    const capBridgeJavaPath = path.join(
      rootDir,
      'node_modules',
      '@capacitor',
      'android',
      'capacitor',
      'src',
      'main',
      'java',
      'com',
      'getcapacitor',
      'Bridge.java'
    );
    if (fs.existsSync(capBridgeJavaPath)) {
      let bridgeJava = fs.readFileSync(capBridgeJavaPath, 'utf8');
      if (!bridgeJava.includes('firebaseapp.com')) {
        const target = `if (url.getScheme().equals("data") || url.getScheme().equals("blob")) {`;
        const replacement = `if (url.getHost() != null && (url.getHost().endsWith("firebaseapp.com") || url.getHost().endsWith("web.app") || url.getHost().endsWith("google.com") || url.getHost().endsWith("googleapis.com") || url.getHost().endsWith("gstatic.com"))) {\n            return false;\n        }\n        if (url.getScheme().equals("data") || url.getScheme().equals("blob")) {`;
        if (bridgeJava.includes(target)) {
          fs.writeFileSync(capBridgeJavaPath, bridgeJava.replace(target, replacement), 'utf8');
        }
      }
    }

    // 3. If ./android already exists, apply Web Books launcher icons and MainActivity directly
    const existingAndroidRes = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
    if (fs.existsSync(existingAndroidRes)) {
      writeWebBooksAndroidResources(existingAndroidRes, iconPngBuffer);
    }
    const existingMainActivity = path.join(
      rootDir,
      'android',
      'app',
      'src',
      'main',
      'java',
      'com',
      'afeed',
      'webbooks',
      'MainActivity.java'
    );
    if (fs.existsSync(existingMainActivity)) {
      fs.writeFileSync(
        existingMainActivity,
        ANDROID_MAIN_ACTIVITY_JAVA.replace('package com.getcapacitor.myapp;', 'package com.afeed.webbooks;'),
        'utf8'
      );
    }

    // 4. Patch @capacitor/cli so `npx cap add android` (run in CI after `npm run build`)
    // automatically installs the Web Books launcher icons, versionName/versionCode, and MainActivity OAuth handler
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
const MAIN_ACTIVITY_JAVA = ${JSON.stringify(ANDROID_MAIN_ACTIVITY_JAVA)};
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

    // Write enhanced MainActivity.java into template path before Capacitor moves it to com/afeed/webbooks/MainActivity.java
    const templateActivityPath = path.join(
      platformDirAbs,
      "app",
      "src",
      "main",
      "java",
      "com",
      "getcapacitor",
      "myapp",
      "MainActivity.java"
    );
    if (fs.existsSync(path.dirname(templateActivityPath))) {
      fs.writeFileSync(templateActivityPath, MAIN_ACTIVITY_JAVA, "utf8");
    }

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

    const pkgJsonPath = path.join(projectRoot, "package.json");
    const buildGradlePath = path.join(platformDirAbs, "app", "build.gradle");
    if (fs.existsSync(pkgJsonPath) && fs.existsSync(buildGradlePath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
      const rawVersion = String(pkg.version || "1.0.2").replace(/^v/i, "");
      const nums = rawVersion.split("-")[0].split(".").map((n) => parseInt(n, 10) || 0);
      const versionCode = Math.max(1, (nums[0] || 1) * 10000 + (nums[1] || 0) * 100 + (nums[2] || 0));
      let gradleText = fs.readFileSync(buildGradlePath, "utf8");
      gradleText = gradleText
        .replace(/versionCode\\s+\\d+/, "versionCode " + versionCode)
        .replace(/versionName\\s+"[^"]*"/, 'versionName "' + rawVersion + '"');
      fs.writeFileSync(buildGradlePath, gradleText, "utf8");
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
