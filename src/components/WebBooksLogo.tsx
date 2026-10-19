import React, { useEffect } from 'react';
import {
  getWebBooksGlobeDataUri,
  getWebBooksMarkDataUri,
  WEB_BOOKS_GLOBE_SVG_RAW,
  WEB_BOOKS_MARK_SVG_RAW,
} from '../utils/brandAssets';

export {
  getWebBooksGlobeDataUri,
  getWebBooksMarkDataUri,
  WEB_BOOKS_GLOBE_SVG_RAW,
  WEB_BOOKS_MARK_SVG_RAW,
};

/**
 * Ensures browser favicon and mobile touch links dynamically use the Web Books Globe logo.
 */
export function useSyncWebBooksFavicon() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const svgDataUri = getWebBooksGlobeDataUri();
    const iconLinks = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"]'
    );
    if (iconLinks.length > 0) {
      iconLinks.forEach((link) => {
        link.type = 'image/svg+xml';
        link.href = svgDataUri;
      });
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = svgDataUri;
      document.head.appendChild(link);
    }
  }, []);
}

export interface WebBooksLogoProps {
  className?: string;
  variant?: 'framed' | 'mark';
  animated?: boolean;
  dataTestId?: string;
}

export function WebBooksLogo({
  className = 'w-8 h-8',
  variant = 'framed',
  animated = false,
  dataTestId = 'web-books-globe-logo',
}: WebBooksLogoProps) {
  const isFramed = variant === 'framed';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      data-testid={dataTestId}
      aria-label="Web Books Logo"
      role="img"
      className={`${className} select-none shrink-0 ${
        animated ? 'transition-transform duration-300 hover:scale-105' : ''
      }`}
    >
      <defs>
        <linearGradient id={`wbBg_${dataTestId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id={`wbAccent_${dataTestId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Squircle container when framed (default for app icons & favicon) */}
      {isFramed && (
        <rect width="512" height="512" rx="116" fill={`url(#wbBg_${dataTestId})`} />
      )}

      {/* Notebook Body */}
      <rect
        x="86"
        y="76"
        width="340"
        height="360"
        rx="44"
        fill="#121218"
        stroke="#27272f"
        strokeWidth="8"
      />
      <path
        d="M86 120 C86 95.699 105.699 76 130 76 H382 C406.301 76 426 95.699 426 120 V158 H86 V120 Z"
        fill={`url(#wbAccent_${dataTestId})`}
      />
      <circle cx="146" cy="117" r="12" fill="#020617" />
      <rect x="176" y="109" width="130" height="16" rx="8" fill="#020617" />
      <rect x="128" y="206" width="210" height="20" rx="10" fill="#f8fafc" />
      <rect x="128" y="246" width="256" height="14" rx="7" fill="#94a3b8" />
      <rect x="128" y="278" width="230" height="14" rx="7" fill="#94a3b8" />

      {/* Web Globe Icon (replaces the benzene hexagon) */}
      <g className={animated ? 'transition-transform duration-500 origin-[256px_360px]' : ''}>
        <circle
          cx="256"
          cy="360"
          r="42"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="9"
        />
        <ellipse
          cx="256"
          cy="360"
          rx="20"
          ry="42"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="7"
        />
        <line
          x1="214"
          y1="360"
          x2="298"
          y2="360"
          stroke="#38bdf8"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M222 338 Q256 348 290 338"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M222 382 Q256 372 290 382"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
