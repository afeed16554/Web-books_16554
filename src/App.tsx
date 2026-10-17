import React, { useEffect, useRef, useState } from 'react';
import {
  ALL_SECTIONS,
  getRawBatch2SectionsHtml,
  getAllSectionsHtml,
  filterSectionsByCategory
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
  }
}

type ThemeMode = 'oled' | 'reading' | 'light';
type ActivePanel = 'topic' | 'display' | 'html' | null;
type SectionFilter = 'all' | 'batch-1-alkane' | 'batch-2-alkene';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('oled');
  const [warmth, setWarmth] = useState<number>(0);
  const [fontScale, setFontScale] = useState<number>(1.05);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');
  const [copyMode, setCopyMode] = useState<'batch2' | 'all'>('batch2');
  const [copied, setCopied] = useState<boolean>(false);

  const readerRef = useRef<HTMLElement | null>(null);

  const visibleSections = filterSectionsByCategory(sectionFilter);
  const combinedHtml = visibleSections.map((s) => s.html).join('\n\n');

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

  const scrollToTopic = (id: string) => {
    setActivePanel(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyHtml = async () => {
    const rawToCopy = copyMode === 'batch2' ? getRawBatch2SectionsHtml() : getAllSectionsHtml();
    try {
      await navigator.clipboard.writeText(rawToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div id="warmth-overlay" aria-hidden="true" />

      <main
        ref={readerRef}
        className="reader-container"
        dangerouslySetInnerHTML={{ __html: combinedHtml }}
      />

      {/* ON-DEMAND FLOATING PANELS */}
      <div className="fab-dock" role="toolbar" aria-label="পাঠক নিয়ন্ত্রণ ডক">
        <button
          type="button"
          className="fab-btn"
          onClick={() => togglePanel('html')}
          aria-expanded={activePanel === 'html'}
        >
          📋 HTML কোড
        </button>
        <button
          type="button"
          className="fab-btn"
          onClick={() => togglePanel('topic')}
          aria-expanded={activePanel === 'topic'}
        >
          ≡ টপিক সূচি
        </button>
        <button
          type="button"
          className="fab-btn"
          onClick={() => togglePanel('display')}
          aria-expanded={activePanel === 'display'}
        >
          ⚙ ডিসপ্লে ও রিডিং
        </button>
      </div>

      {/* Topic Switcher Panel */}
      {activePanel === 'topic' && (
        <div id="topic-panel" className="floating-panel" role="dialog" aria-label="দ্রুত টপিক পরিবর্তন">
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

          <div className="theme-grid" style={{ marginBottom: '0.75rem' }}>
            <button
              type="button"
              className={`theme-btn ${sectionFilter === 'all' ? 'active-theme' : ''}`}
              onClick={() => setSectionFilter('all')}
            >
              সব টপিক (৭)
            </button>
            <button
              type="button"
              className={`theme-btn ${sectionFilter === 'batch-1-alkane' ? 'active-theme' : ''}`}
              onClick={() => setSectionFilter('batch-1-alkane')}
            >
              অ্যালকেন (৪)
            </button>
            <button
              type="button"
              className={`theme-btn ${sectionFilter === 'batch-2-alkene' ? 'active-theme' : ''}`}
              onClick={() => setSectionFilter('batch-2-alkene')}
            >
              নতুন পৃষ্ঠা (৩)
            </button>
          </div>

          <div>
            {ALL_SECTIONS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className="topic-link"
                onClick={() => {
                  if (sectionFilter !== 'all' && topic.category !== sectionFilter) {
                    setSectionFilter('all');
                    window.setTimeout(() => scrollToTopic(topic.id), 80);
                  } else {
                    scrollToTopic(topic.id);
                  }
                }}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display & Warmth Settings Panel */}
      {activePanel === 'display' && (
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

      {/* Raw HTML Export Panel */}
      {activePanel === 'html' && (
        <div
          id="html-panel"
          className="floating-panel"
          role="dialog"
          aria-label="Raw Section HTML কোড"
          style={{ width: 'min(560px, 94vw)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <strong>Raw &lt;section class="topic-section"&gt; HTML</strong>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              aria-label="HTML প্যানেল বন্ধ করুন"
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ×
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <button
              type="button"
              className={`theme-btn ${copyMode === 'batch2' ? 'active-theme' : ''}`}
              style={{ flex: 1 }}
              onClick={() => setCopyMode('batch2')}
            >
              নতুন ৩টি Section (বর্তমান পৃষ্ঠা ১–৩)
            </button>
            <button
              type="button"
              className={`theme-btn ${copyMode === 'all' ? 'active-theme' : ''}`}
              style={{ flex: 1 }}
              onClick={() => setCopyMode('all')}
            >
              সম্পূর্ণ ৭টি Section (পর্ব ১ + ২)
            </button>
          </div>

          <textarea
            readOnly
            aria-label="Raw HTML Code"
            value={copyMode === 'batch2' ? getRawBatch2SectionsHtml() : getAllSectionsHtml()}
            style={{
              width: '100%',
              height: '210px',
              background: 'rgba(0,0,0,0.45)',
              color: 'var(--text-main)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.65rem',
              fontFamily: "ui-monospace, monospace, 'Hind Siliguri', sans-serif",
              fontSize: '0.78rem',
              resize: 'vertical',
              marginBottom: '0.75rem'
            }}
          />

          <button
            type="button"
            onClick={handleCopyHtml}
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent)',
              color: theme === 'oled' ? '#020617' : '#ffffff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copied ? '✓ কপি সম্পন্ন হয়েছে (Copied!)' : 'ক্লিপবোর্ডে কপি করুন (Copy Raw <section> Blocks)'}
          </button>
        </div>
      )}
    </>
  );
}
