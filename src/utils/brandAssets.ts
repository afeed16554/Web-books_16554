/**
 * Web Books Brand Assets & MIT License Metadata
 * Official Web Books Notebook & Globe Logo (replaces benzene hexagon with web globe)
 */

export const OFFICIAL_MIT_LICENSE_TEXT = `MIT License

Copyright (c) 2026 Afeed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

/**
 * Official Web Books Icon (Framed Squircle):
 * Translucent frosted glass squircle with fine noisy grain texture, warm espresso bookshelf base,
 * three frosted glass books (coral-orange, tall espresso-charcoal, and tilted golden-amber)
 * with raised inner glass spine capsules, and three concentric frosted signal waves radiating top-right.
 */
export const WEB_BOOKS_GLOBE_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="wbOuterBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF3E8"/>
      <stop offset="55%" stop-color="#F0E4D4"/>
      <stop offset="100%" stop-color="#DECAB4"/>
    </linearGradient>
    <linearGradient id="wbInnerPlate" x1="8%" y1="6%" x2="92%" y2="94%">
      <stop offset="0%" stop-color="#FCF8F2" stop-opacity="0.96"/>
      <stop offset="50%" stop-color="#F2E8DC" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#DFCBB8" stop-opacity="0.92"/>
    </linearGradient>
    <linearGradient id="wbPlateRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#FFFDF9" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#C5AE96" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="wbBookOrangeOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#FA9B60" stop-opacity="0.94"/>
      <stop offset="45%" stop-color="#F25E22" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#E63312" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="wbBookOrangeInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF965B" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#F34F29" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#DC2B0C" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="wbBookDarkOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#786459" stop-opacity="0.95"/>
      <stop offset="48%" stop-color="#483B35" stop-opacity="0.94"/>
      <stop offset="100%" stop-color="#261C18" stop-opacity="0.97"/>
    </linearGradient>
    <linearGradient id="wbBookDarkInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#8E7C70" stop-opacity="0.94"/>
      <stop offset="48%" stop-color="#403531" stop-opacity="0.93"/>
      <stop offset="100%" stop-color="#221814" stop-opacity="0.97"/>
    </linearGradient>
    <linearGradient id="wbBookGoldOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#F3D492" stop-opacity="0.92"/>
      <stop offset="50%" stop-color="#DF9D3E" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#CE7922" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="wbBookGoldInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#F8E0AA" stop-opacity="0.94"/>
      <stop offset="52%" stop-color="#D68A2C" stop-opacity="0.91"/>
      <stop offset="100%" stop-color="#B96717" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="wbShelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#917B6E" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#58453B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#362822" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="wbWaveGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8E6B5" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#E8B856" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#D9982F" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="wbWaveCoral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7B799" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#F07B4E" stop-opacity="0.91"/>
      <stop offset="100%" stop-color="#E45328" stop-opacity="0.94"/>
    </linearGradient>
    <filter id="wbShadowSoft" x="-18%" y="-18%" width="140%" height="140%">
      <feDropShadow dx="6" dy="10" stdDeviation="8" flood-color="#5A3E28" flood-opacity="0.28"/>
    </filter>
    <filter id="wbGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise"/>
      <feComponentTransfer in="monoNoise" result="alphaNoise">
        <feFuncA type="linear" slope="0.13"/>
      </feComponentTransfer>
      <feBlend mode="overlay" in="alphaNoise" in2="SourceGraphic"/>
    </filter>
  </defs>

  <g filter="url(#wbGrain)">
    <!-- Outer Squircle Base -->
    <rect width="512" height="512" rx="116" fill="url(#wbOuterBg)"/>

    <!-- Inner Frosted Glass Squircle Plate -->
    <rect x="36" y="36" width="440" height="440" rx="96" fill="url(#wbInnerPlate)" stroke="url(#wbPlateRim)" stroke-width="4.5" filter="url(#wbShadowSoft)"/>

    <!-- Three Concentric Frosted Glass Signal Waves (Top-Right) -->
    <g filter="url(#wbShadowSoft)" stroke-linecap="round" fill="none">
      <!-- Inner Wave (Gold) -->
      <path d="M 328 142 A 42 42 0 0 1 370 184" stroke="#FFF9EB" stroke-opacity="0.75" stroke-width="25"/>
      <path d="M 328 142 A 42 42 0 0 1 370 184" stroke="url(#wbWaveGold)" stroke-width="21"/>
      <!-- Middle Wave (Coral-Orange) -->
      <path d="M 328 104 A 80 80 0 0 1 408 184" stroke="#FFF4EC" stroke-opacity="0.72" stroke-width="25"/>
      <path d="M 328 104 A 80 80 0 0 1 408 184" stroke="url(#wbWaveCoral)" stroke-width="21"/>
      <!-- Outer Wave (Warm Gold) -->
      <path d="M 328 66 A 118 118 0 0 1 446 184" stroke="#FFFBEF" stroke-opacity="0.78" stroke-width="25"/>
      <path d="M 328 66 A 118 118 0 0 1 446 184" stroke="url(#wbWaveGold)" stroke-width="21"/>
    </g>

    <!-- Left Book: Coral-Orange Frosted Glass -->
    <g filter="url(#wbShadowSoft)">
      <rect x="133" y="172" width="68" height="218" rx="16" fill="url(#wbBookOrangeOuter)" stroke="#FFD8BE" stroke-opacity="0.62" stroke-width="2"/>
      <rect x="145" y="188" width="44" height="186" rx="11" fill="url(#wbBookOrangeInner)" stroke="#FFE6D4" stroke-opacity="0.75" stroke-width="2.2"/>
    </g>

    <!-- Middle Book: Tall Espresso-Charcoal Frosted Glass -->
    <g filter="url(#wbShadowSoft)">
      <rect x="212" y="138" width="68" height="252" rx="16" fill="url(#wbBookDarkOuter)" stroke="#C6B6AC" stroke-opacity="0.45" stroke-width="2"/>
      <rect x="224" y="154" width="44" height="220" rx="11" fill="url(#wbBookDarkInner)" stroke="#E2D5CC" stroke-opacity="0.58" stroke-width="2.2"/>
    </g>

    <!-- Right Book: Tilted Golden-Amber Frosted Glass -->
    <g transform="rotate(-18.5 338 282)" filter="url(#wbShadowSoft)">
      <rect x="304" y="176" width="68" height="212" rx="16" fill="url(#wbBookGoldOuter)" stroke="#FFF2CE" stroke-opacity="0.68" stroke-width="2"/>
      <rect x="316" y="192" width="44" height="180" rx="11" fill="url(#wbBookGoldInner)" stroke="#FFF8E2" stroke-opacity="0.8" stroke-width="2.2"/>
    </g>

    <!-- Bottom Bookshelf Base Bar -->
    <g filter="url(#wbShadowSoft)">
      <rect x="102" y="398" width="308" height="26" rx="13" fill="url(#wbShelfGrad)" stroke="#BCA99C" stroke-opacity="0.48" stroke-width="1.8"/>
      <rect x="114" y="401" width="284" height="4" rx="2" fill="#FFF8F0" fill-opacity="0.22"/>
    </g>
  </g>
</svg>`;

/**
 * Transparent Brand Mark (for inline headers, sidebars, and homepage viewing area):
 * Same translucent frosted glass 3-books + shelf + 3-waves with noisy grain texture, without outer squircle plate.
 */
export const WEB_BOOKS_MARK_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="wbMarkBookOrangeOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#FA9B60" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#F25E22" stop-opacity="0.93"/>
      <stop offset="100%" stop-color="#E63312" stop-opacity="0.97"/>
    </linearGradient>
    <linearGradient id="wbMarkBookOrangeInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF965B" stop-opacity="0.96"/>
      <stop offset="50%" stop-color="#F34F29" stop-opacity="0.93"/>
      <stop offset="100%" stop-color="#DC2B0C" stop-opacity="0.97"/>
    </linearGradient>
    <linearGradient id="wbMarkBookDarkOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#786459" stop-opacity="0.96"/>
      <stop offset="48%" stop-color="#483B35" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#261C18" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="wbMarkBookDarkInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#8E7C70" stop-opacity="0.95"/>
      <stop offset="48%" stop-color="#403531" stop-opacity="0.94"/>
      <stop offset="100%" stop-color="#221814" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="wbMarkBookGoldOuter" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#F3D492" stop-opacity="0.94"/>
      <stop offset="50%" stop-color="#DF9D3E" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#CE7922" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="wbMarkBookGoldInner" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#F8E0AA" stop-opacity="0.95"/>
      <stop offset="52%" stop-color="#D68A2C" stop-opacity="0.93"/>
      <stop offset="100%" stop-color="#B96717" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="wbMarkShelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#917B6E" stop-opacity="0.96"/>
      <stop offset="45%" stop-color="#58453B" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="#362822" stop-opacity="0.99"/>
    </linearGradient>
    <linearGradient id="wbMarkWaveGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8E6B5" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#E8B856" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#D9982F" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="wbMarkWaveCoral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7B799" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#F07B4E" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#E45328" stop-opacity="0.96"/>
    </linearGradient>
    <filter id="wbMarkShadow" x="-18%" y="-18%" width="140%" height="140%">
      <feDropShadow dx="5" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.28"/>
    </filter>
    <filter id="wbMarkGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise"/>
      <feComponentTransfer in="monoNoise" result="alphaNoise">
        <feFuncA type="linear" slope="0.13"/>
      </feComponentTransfer>
      <feBlend mode="overlay" in="alphaNoise" in2="SourceGraphic"/>
    </filter>
  </defs>

  <g filter="url(#wbMarkGrain)">
    <g filter="url(#wbMarkShadow)" stroke-linecap="round" fill="none">
      <path d="M 328 142 A 42 42 0 0 1 370 184" stroke="#FFF9EB" stroke-opacity="0.78" stroke-width="25"/>
      <path d="M 328 142 A 42 42 0 0 1 370 184" stroke="url(#wbMarkWaveGold)" stroke-width="21"/>
      <path d="M 328 104 A 80 80 0 0 1 408 184" stroke="#FFF4EC" stroke-opacity="0.75" stroke-width="25"/>
      <path d="M 328 104 A 80 80 0 0 1 408 184" stroke="url(#wbMarkWaveCoral)" stroke-width="21"/>
      <path d="M 328 66 A 118 118 0 0 1 446 184" stroke="#FFFBEF" stroke-opacity="0.80" stroke-width="25"/>
      <path d="M 328 66 A 118 118 0 0 1 446 184" stroke="url(#wbMarkWaveGold)" stroke-width="21"/>
    </g>
    <g filter="url(#wbMarkShadow)">
      <rect x="133" y="172" width="68" height="218" rx="16" fill="url(#wbMarkBookOrangeOuter)" stroke="#FFD8BE" stroke-opacity="0.65" stroke-width="2"/>
      <rect x="145" y="188" width="44" height="186" rx="11" fill="url(#wbMarkBookOrangeInner)" stroke="#FFE6D4" stroke-opacity="0.78" stroke-width="2.2"/>
    </g>
    <g filter="url(#wbMarkShadow)">
      <rect x="212" y="138" width="68" height="252" rx="16" fill="url(#wbMarkBookDarkOuter)" stroke="#C6B6AC" stroke-opacity="0.50" stroke-width="2"/>
      <rect x="224" y="154" width="44" height="220" rx="11" fill="url(#wbMarkBookDarkInner)" stroke="#E2D5CC" stroke-opacity="0.62" stroke-width="2.2"/>
    </g>
    <g transform="rotate(-18.5 338 282)" filter="url(#wbMarkShadow)">
      <rect x="304" y="176" width="68" height="212" rx="16" fill="url(#wbMarkBookGoldOuter)" stroke="#FFF2CE" stroke-opacity="0.72" stroke-width="2"/>
      <rect x="316" y="192" width="44" height="180" rx="11" fill="url(#wbMarkBookGoldInner)" stroke="#FFF8E2" stroke-opacity="0.82" stroke-width="2.2"/>
    </g>
    <g filter="url(#wbMarkShadow)">
      <rect x="102" y="398" width="308" height="26" rx="13" fill="url(#wbMarkShelfGrad)" stroke="#BCA99C" stroke-opacity="0.52" stroke-width="1.8"/>
      <rect x="114" y="401" width="284" height="4" rx="2" fill="#FFF8F0" fill-opacity="0.25"/>
    </g>
  </g>
</svg>`;

export function getWebBooksGlobeDataUri(): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(WEB_BOOKS_GLOBE_SVG_RAW)}`;
}

export function getWebBooksMarkDataUri(): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(WEB_BOOKS_MARK_SVG_RAW)}`;
}

