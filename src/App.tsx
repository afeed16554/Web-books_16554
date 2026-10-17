import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MAIN_NAVIGATION_TOPICS,
  getAllSectionsHtml
} from './utils/chemistrySections';

declare global {
  interface Window {
    renderMathInElement?: (
      element: HTMLElement,
      options?: {
        delimiters?: Array<{ left: string; right: string; display: boolean }>;
        throwOnError?: boolean;
      }
    ) => void;
    togglePanel?: (panelId: string) => void;
  }
}

type ThemeMode = 'oled' | 'reading' | 'light';
type ActivePanel = 'topic-panel' | 'display-panel' | null;

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('oled');
  const [warmth, setWarmth] = useState<number>(0);
  const [fontScale, setFontScale] = useState<number>(1.05);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const readerRef = useRef<HTMLElement | null>(null);

  const combinedHtml = useMemo(() => getAllSectionsHtml(), []);
  const readerInnerHtml = useMemo(() => ({ __html: combinedHtml }), [combinedHtml]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--warmth-opacity', String(warmth));
  }, [warmth]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontScale}rem`);
  }, [fontScale]);

  useEffect(() => {
    window.togglePanel = (panelId: string) => {
      if (panelId === 'topic-panel' || panelId === 'display-panel') {
        setActivePanel((prev) => (prev === panelId ? null : panelId));
      } else {
        setActivePanel(null);
      }
    };
    return () => {
      delete window.togglePanel;
    };
  }, []);

  useEffect(() => {
    const renderMath = () => {
      if (readerRef.current && typeof window.renderMathInElement === 'function') {
        window.renderMathInElement(readerRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
        return true;
      }
      return false;
    };

    if (!renderMath()) {
      const interval = window.setInterval(() => {
        if (renderMath()) {
          window.clearInterval(interval);
        }
      }, 150);
      return () => window.clearInterval(interval);
    }
  }, [combinedHtml]);

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const handleTopicNavigate = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActivePanel(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <>
      <div id="warmth-overlay" aria-hidden="true" />

      <main
        ref={readerRef}
        className="reader-container"
        dangerouslySetInnerHTML={readerInnerHtml}
      />

      {/* ON-DEMAND FLOATING CONTROLS (Only Topic Index & Display Settings as in Master Shell) */}
      <div className="fab-dock" role="toolbar" aria-label="পাঠক নিয়ন্ত্রণ ডক">
        <button
          type="button"
          className="fab-btn"
          onClick={() => togglePanel('topic-panel')}
          aria-expanded={activePanel === 'topic-panel'}
        >
          ≡ টপিক সূচি
        </button>
        <button
          type="button"
          className="fab-btn"
          onClick={() => togglePanel('display-panel')}
          aria-expanded={activePanel === 'display-panel'}
        >
          ⚙ ডিসপ্লে ও রিডিং
        </button>
      </div>

      {/* Topic Switcher Panel (Main Topics Only for Clean Navigation) */}
      {activePanel === 'topic-panel' && (
        <nav id="topic-panel" className="floating-panel" aria-label="দ্রুত টপিক পরিবর্তন">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <strong>দ্রুত টপিক পরিবর্তন</strong>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              aria-label="টপিক সূচি বন্ধ করুন"
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ×
            </button>
          </div>

          <div>
            {MAIN_NAVIGATION_TOPICS.map((topic) => (
              <a
                key={topic.id}
                className="topic-link"
                href={`#${topic.id}`}
                onClick={(e) => handleTopicNavigate(e, topic.id)}
              >
                {topic.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Display & Warmth Settings Panel */}
      {activePanel === 'display-panel' && (
        <div id="display-panel" className="floating-panel" role="dialog" aria-label="ডিসপ্লে ও রিডিং সেটিংস">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <strong>ডিসপ্লে ও রিডিং সেটিংস</strong>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              aria-label="ডিসপ্লে প্যানেল বন্ধ করুন"
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ×
            </button>
          </div>

          <div className="panel-row">
            <label>কালার মোড (Environment)</label>
            <div className="theme-grid">
              <button
                type="button"
                className={`theme-btn ${theme === 'light' ? 'active-theme' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={`theme-btn ${theme === 'reading' ? 'active-theme' : ''}`}
                onClick={() => setTheme('reading')}
              >
                Reading
              </button>
              <button
                type="button"
                className={`theme-btn ${theme === 'oled' ? 'active-theme' : ''}`}
                onClick={() => setTheme('oled')}
              >
                OLED Black
              </button>
            </div>
          </div>

          <div className="panel-row">
            <label htmlFor="warmth-slider">
              হলুদ/ওয়ার্ম টোন (Yellow Tone: {Math.round(warmth * 100)}%)
            </label>
            <input
              id="warmth-slider"
              type="range"
              min="0"
              max="0.45"
              step="0.02"
              value={warmth}
              style={{ width: '100%' }}
              onChange={(e) => setWarmth(parseFloat(e.target.value))}
            />
          </div>

          <div className="panel-row" style={{ marginBottom: 0 }}>
            <label htmlFor="font-slider">
              ফন্ট সাইজ (Text Size: {fontScale.toFixed(2)}rem)
            </label>
            <input
              id="font-slider"
              type="range"
              min="0.9"
              max="1.35"
              step="0.05"
              value={fontScale}
              style={{ width: '100%' }}
              onChange={(e) => setFontScale(parseFloat(e.target.value))}
            />
          </div>
        </div>
      )}
    </>
  );
}
