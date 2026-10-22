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
  const uid = dataTestId.replace(/[^a-zA-Z0-9_-]/g, '_');

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
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout paint',
      }}
    >
      <defs>
        <linearGradient id={`wbOuterBg_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF3E8" />
          <stop offset="55%" stopColor="#F0E4D4" />
          <stop offset="100%" stopColor="#DECAB4" />
        </linearGradient>
        <linearGradient id={`wbInnerPlate_${uid}`} x1="8%" y1="6%" x2="92%" y2="94%">
          <stop offset="0%" stopColor="#FCF8F2" stopOpacity="0.96" />
          <stop offset="50%" stopColor="#F2E8DC" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#DFCBB8" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={`wbPlateRim_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#FFFDF9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C5AE96" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`wbBookOrangeOuter_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FA9B60" stopOpacity="0.94" />
          <stop offset="45%" stopColor="#F25E22" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#E63312" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={`wbBookOrangeInner_${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FF965B" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#F34F29" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#DC2B0C" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={`wbBookDarkOuter_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#786459" stopOpacity="0.95" />
          <stop offset="48%" stopColor="#483B35" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#261C18" stopOpacity="0.97" />
        </linearGradient>
        <linearGradient id={`wbBookDarkInner_${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#8E7C70" stopOpacity="0.94" />
          <stop offset="48%" stopColor="#403531" stopOpacity="0.93" />
          <stop offset="100%" stopColor="#221814" stopOpacity="0.97" />
        </linearGradient>
        <linearGradient id={`wbBookGoldOuter_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#F3D492" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#DF9D3E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CE7922" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`wbBookGoldInner_${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#F8E0AA" stopOpacity="0.94" />
          <stop offset="52%" stopColor="#D68A2C" stopOpacity="0.91" />
          <stop offset="100%" stopColor="#B96717" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`wbShelfGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#917B6E" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#58453B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#362822" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id={`wbWaveGold_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8E6B5" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#E8B856" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D9982F" stopOpacity="0.94" />
        </linearGradient>
        <linearGradient id={`wbWaveCoral_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7B799" stopOpacity="0.92" />
          <stop offset="55%" stopColor="#F07B4E" stopOpacity="0.91" />
          <stop offset="100%" stopColor="#E45328" stopOpacity="0.94" />
        </linearGradient>
        <filter id={`wbShadowSoft_${uid}`} x="-12%" y="-12%" width="128%" height="128%">
          <feDropShadow dx="5" dy="8" stdDeviation="6" floodColor="#5A3E28" floodOpacity="0.26" />
        </filter>
        <filter id={`wbGrain_${uid}`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={2}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise" />
          <feComponentTransfer in="monoNoise" result="alphaNoise">
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feBlend mode="overlay" in="alphaNoise" in2="SourceGraphic" />
        </filter>
      </defs>

      <g filter={`url(#wbGrain_${uid})`}>
        {/* Outer & Inner Frosted Glass Squircle Plate when framed */}
        {isFramed && (
          <>
            <rect width="512" height="512" rx="116" fill={`url(#wbOuterBg_${uid})`} />
            <rect
              x="36"
              y="36"
              width="440"
              height="440"
              rx="96"
              fill={`url(#wbInnerPlate_${uid})`}
              stroke={`url(#wbPlateRim_${uid})`}
              strokeWidth="4.5"
            />
          </>
        )}

        {/* Single unified shadow pass for all foreground frosted glass elements */}
        <g filter={`url(#wbShadowSoft_${uid})`}>
          {/* Three Concentric Frosted Glass Signal Waves (Top-Right) */}
          <g
            strokeLinecap="round"
            fill="none"
            className={animated ? 'transition-transform duration-500 origin-[328px_184px]' : ''}
          >
            {/* Inner Wave (Gold) */}
            <path
              d="M 328 142 A 42 42 0 0 1 370 184"
              stroke="#FFF9EB"
              strokeOpacity="0.75"
              strokeWidth="25"
            />
            <path
              d="M 328 142 A 42 42 0 0 1 370 184"
              stroke={`url(#wbWaveGold_${uid})`}
              strokeWidth="21"
            />
            {/* Middle Wave (Coral-Orange) */}
            <path
              d="M 328 104 A 80 80 0 0 1 408 184"
              stroke="#FFF4EC"
              strokeOpacity="0.72"
              strokeWidth="25"
            />
            <path
              d="M 328 104 A 80 80 0 0 1 408 184"
              stroke={`url(#wbWaveCoral_${uid})`}
              strokeWidth="21"
            />
            {/* Outer Wave (Warm Gold) */}
            <path
              d="M 328 66 A 118 118 0 0 1 446 184"
              stroke="#FFFBEF"
              strokeOpacity="0.78"
              strokeWidth="25"
            />
            <path
              d="M 328 66 A 118 118 0 0 1 446 184"
              stroke={`url(#wbWaveGold_${uid})`}
              strokeWidth="21"
            />
          </g>

          {/* Left Book: Coral-Orange Frosted Glass */}
          <g>
            <rect
              x="133"
              y="172"
              width="68"
              height="218"
              rx="16"
              fill={`url(#wbBookOrangeOuter_${uid})`}
              stroke="#FFD8BE"
              strokeOpacity="0.62"
              strokeWidth="2"
            />
            <rect
              x="145"
              y="188"
              width="44"
              height="186"
              rx="11"
              fill={`url(#wbBookOrangeInner_${uid})`}
              stroke="#FFE6D4"
              strokeOpacity="0.75"
              strokeWidth="2.2"
            />
          </g>

          {/* Middle Book: Tall Espresso-Charcoal Frosted Glass */}
          <g>
            <rect
              x="212"
              y="138"
              width="68"
              height="252"
              rx="16"
              fill={`url(#wbBookDarkOuter_${uid})`}
              stroke="#C6B6AC"
              strokeOpacity="0.45"
              strokeWidth="2"
            />
            <rect
              x="224"
              y="154"
              width="44"
              height="220"
              rx="11"
              fill={`url(#wbBookDarkInner_${uid})`}
              stroke="#E2D5CC"
              strokeOpacity="0.58"
              strokeWidth="2.2"
            />
          </g>

          {/* Right Book: Tilted Golden-Amber Frosted Glass */}
          <g transform="rotate(-18.5 338 282)">
            <rect
              x="304"
              y="176"
              width="68"
              height="212"
              rx="16"
              fill={`url(#wbBookGoldOuter_${uid})`}
              stroke="#FFF2CE"
              strokeOpacity="0.68"
              strokeWidth="2"
            />
            <rect
              x="316"
              y="192"
              width="44"
              height="180"
              rx="11"
              fill={`url(#wbBookGoldInner_${uid})`}
              stroke="#FFF8E2"
              strokeOpacity="0.8"
              strokeWidth="2.2"
            />
          </g>

          {/* Bottom Bookshelf Base Bar */}
          <g>
            <rect
              x="102"
              y="398"
              width="308"
              height="26"
              rx="13"
              fill={`url(#wbShelfGrad_${uid})`}
              stroke="#BCA99C"
              strokeOpacity="0.48"
              strokeWidth="1.8"
            />
            <rect
              x="114"
              y="401"
              width="284"
              height="4"
              rx="2"
              fill="#FFF8F0"
              fillOpacity="0.22"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

