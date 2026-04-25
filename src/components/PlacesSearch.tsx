import { useState, useRef, useEffect } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';
import { usePlacesSearch, type PlaceSuggestion } from '../hooks/usePlacesSearch';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSelect?: (place: PlaceSuggestion) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export default function PlacesSearch({ value, onChange, onSelect, placeholder = 'City, neighborhood, or address…', style, inputStyle }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, loading } = usePlacesSearch(value);

  const hasDropdown = open && (suggestions.length > 0 || loading);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleSelect(s: PlaceSuggestion) {
    onChange(s.displayName);
    onSelect?.(s);
    setOpen(false);
    setActiveIdx(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!hasDropdown) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); handleSelect(suggestions[activeIdx]); }
    if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1); }
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', flex: 1, ...style }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        padding: '0 1rem',
        transition: 'border-color 0.2s',
        ...(open ? { borderColor: 'var(--gold-border)' } : {}),
      }}>
        {loading
          ? <Loader2 size={14} style={{ color: 'var(--gold)', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          : <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        }
        <input
          ref={inputRef}
          value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); setActiveIdx(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: 'var(--warm-white)', fontSize: '0.85rem',
            fontFamily: 'var(--font-body)', padding: '0.85rem 0',
            ...inputStyle,
          }}
        />
        {value && (
          <button onClick={() => { onChange(''); setOpen(false); inputRef.current?.focus(); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {hasDropdown && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: 'var(--bg-surface)', border: '1px solid var(--gold-border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          maxHeight: 320, overflowY: 'auto',
        }}>
          {loading && suggestions.length === 0 && (
            <div style={{ padding: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> Searching…
            </div>
          )}
          {suggestions.map((s, i) => (
            <button
              key={s.displayName + i}
              onMouseDown={() => handleSelect(s)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                width: '100%', background: i === activeIdx ? 'var(--gold-dim)' : 'var(--bg-surface)',
                border: 'none', borderBottom: '1px solid var(--border)',
                padding: '0.75rem 1rem', cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = i === activeIdx ? 'var(--gold-dim)' : 'var(--bg-surface)')}
            >
              <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--warm-white)', fontWeight: 500, lineHeight: 1.3 }}>
                  {s.name || s.city}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {s.displayName}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
