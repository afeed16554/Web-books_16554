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
 * Official Web Books Icon:
 * Distinctive digital notebook with vibrant sky-blue header, clean note lines,
 * and illuminated Web Globe emblem.
 */
export const WEB_BOOKS_GLOBE_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="wbBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="wbAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#wbBg)"/>
  <rect x="86" y="76" width="340" height="360" rx="44" fill="#121218" stroke="#27272f" stroke-width="8"/>
  <path d="M86 120 C86 95.699 105.699 76 130 76 H382 C406.301 76 426 95.699 426 120 V158 H86 V120 Z" fill="url(#wbAccent)"/>
  <circle cx="146" cy="117" r="12" fill="#020617"/>
  <rect x="176" y="109" width="130" height="16" rx="8" fill="#020617"/>
  <rect x="128" y="206" width="210" height="20" rx="10" fill="#f8fafc"/>
  <rect x="128" y="246" width="256" height="14" rx="7" fill="#94a3b8"/>
  <rect x="128" y="278" width="230" height="14" rx="7" fill="#94a3b8"/>
  <circle cx="256" cy="360" r="42" fill="none" stroke="#38bdf8" stroke-width="9"/>
  <ellipse cx="256" cy="360" rx="20" ry="42" fill="none" stroke="#38bdf8" stroke-width="7"/>
  <line x1="214" y1="360" x2="298" y2="360" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
  <path d="M222 338 Q256 348 290 338" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
  <path d="M222 382 Q256 372 290 382" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
</svg>`;

/**
 * Transparent Brand Mark (for inline headers, sidebars, and homepage viewing area)
 */
export const WEB_BOOKS_MARK_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="wbMarkAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect x="86" y="76" width="340" height="360" rx="44" fill="#121218" stroke="#27272f" stroke-width="8"/>
  <path d="M86 120 C86 95.699 105.699 76 130 76 H382 C406.301 76 426 95.699 426 120 V158 H86 V120 Z" fill="url(#wbMarkAccent)"/>
  <circle cx="146" cy="117" r="12" fill="#020617"/>
  <rect x="176" y="109" width="130" height="16" rx="8" fill="#020617"/>
  <rect x="128" y="206" width="210" height="20" rx="10" fill="#f8fafc"/>
  <rect x="128" y="246" width="256" height="14" rx="7" fill="#94a3b8"/>
  <rect x="128" y="278" width="230" height="14" rx="7" fill="#94a3b8"/>
  <circle cx="256" cy="360" r="42" fill="none" stroke="#38bdf8" stroke-width="9"/>
  <ellipse cx="256" cy="360" rx="20" ry="42" fill="none" stroke="#38bdf8" stroke-width="7"/>
  <line x1="214" y1="360" x2="298" y2="360" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
  <path d="M222 338 Q256 348 290 338" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
  <path d="M222 382 Q256 372 290 382" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
</svg>`;

export function getWebBooksGlobeDataUri(): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(WEB_BOOKS_GLOBE_SVG_RAW)}`;
}

export function getWebBooksMarkDataUri(): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(WEB_BOOKS_MARK_SVG_RAW)}`;
}
