import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { properties, type PropertyType } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const TYPE_LABELS: Record<string, string> = {
  rent: 'For Rent', sale: 'For Sale', coworking: 'Coworking',
  building: 'Buildings', new: 'New Projects',
};
const CITIES = ['All Cities', 'Tel Aviv', 'Jerusalem', 'Haifa', 'Ramat Gan', "Be'er Sheva", 'Herzliya'];
const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'];

export default function Listings() {
  const [params] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(params.get('q') || '');
  const [selectedType, setSelectedType] = useState(params.get('type') || '');
  const [selectedCity, setSelectedCity] = useState(params.get('city') || 'All Cities');
  const [minArea, setMinArea] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');
  const [virtualTourOnly, setVirtualTourOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (selectedType) list = list.filter(p => p.type === selectedType as PropertyType);
    if (selectedCity && selectedCity !== 'All Cities') list = list.filter(p => p.city === selectedCity);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
    }
    if (minArea) list = list.filter(p => p.area >= Number(minArea));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (virtualTourOnly) list = list.filter(p => p.hasVirtualTour);
    if (sortBy === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedType, selectedCity, search, minArea, maxPrice, virtualTourOnly, sortBy]);

  const hasFilters = selectedType || (selectedCity !== 'All Cities') || search || minArea || maxPrice || virtualTourOnly;

  function clearFilters() {
    setSelectedType(''); setSelectedCity('All Cities');
    setSearch(''); setMinArea(''); setMaxPrice('');
    setVirtualTourOnly(false);
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-surface)', border: '1px solid var(--border)',
    color: 'var(--warm-white)', fontFamily: 'var(--font-body)',
    fontSize: '0.8rem', padding: '0.6rem 0.85rem', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 60 }}>
            {/* Search */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--bg-mid)', border: '1px solid var(--border)', padding: '0 1rem' }}>
              <Search size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by city, address, or keyword..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--warm-white)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', padding: '0.65rem 0' }}
              />
              {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}><X size={14} /></button>}
            </div>

            {/* Filter toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: showFilters ? 'var(--gold-dim)' : 'none',
                border: `1px solid ${showFilters ? 'var(--gold-border)' : 'var(--border)'}`,
                color: showFilters ? 'var(--gold)' : 'var(--text-body)',
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '0 1rem', height: 36, cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <SlidersHorizontal size={13} /> Filters
              {hasFilters && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />}
            </button>

            {/* Sort */}
            <div style={{ position: 'relative', display: 'none' }} className="sm:block">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ ...inputStyle, paddingRight: '2rem', cursor: 'pointer', appearance: 'none' }}>
                {SORT_OPTIONS.map(o => <option key={o} style={{ background: 'var(--bg-surface)' }}>{o}</option>)}
              </select>
              <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-mid)', padding: '1rem 2rem' }}>
            <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div className="label-xs" style={{ fontSize: '0.55rem' }}>Type</div>
                <div style={{ position: 'relative' }}>
                  <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }}>
                    <option value="" style={{ background: 'var(--bg-surface)' }}>All Types</option>
                    {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v} style={{ background: 'var(--bg-surface)' }}>{l}</option>)}
                  </select>
                  <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div className="label-xs" style={{ fontSize: '0.55rem' }}>City</div>
                <div style={{ position: 'relative' }}>
                  <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }}>
                    {CITIES.map(c => <option key={c} style={{ background: 'var(--bg-surface)' }}>{c}</option>)}
                  </select>
                  <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div className="label-xs" style={{ fontSize: '0.55rem' }}>Min Area (m²)</div>
                <input type="number" value={minArea} onChange={e => setMinArea(e.target.value)} placeholder="e.g. 100" style={{ ...inputStyle, width: 110 }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div className="label-xs" style={{ fontSize: '0.55rem' }}>Max Price (₪)</div>
                <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 20000" style={{ ...inputStyle, width: 130 }} />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-body)' }}>
                <input type="checkbox" checked={virtualTourOnly} onChange={e => setVirtualTourOnly(e.target.checked)}
                  style={{ accentColor: 'var(--gold)', width: 14, height: 14 }} />
                3D Tour Only
              </label>

              {hasFilters && (
                <button onClick={clearFilters}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', color: 'var(--amber)', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
                  <X size={12} /> Clear All
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem 5rem' }}>
        {/* Type pills */}
        <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', padding: '1.5rem 0 1rem', scrollbarWidth: 'none' }}>
          {[{ label: 'All', value: '' }, ...Object.entries(TYPE_LABELS).map(([v, l]) => ({ label: l, value: v }))].map(t => (
            <button key={t.value} onClick={() => setSelectedType(t.value)}
              style={{
                flexShrink: 0,
                background: selectedType === t.value ? 'var(--gold)' : 'var(--bg-surface)',
                color: selectedType === t.value ? '#080C14' : 'var(--text-body)',
                border: `1px solid ${selectedType === t.value ? 'var(--gold)' : 'var(--border)'}`,
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '0.45rem 1rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--warm-white)', marginRight: '0.4rem' }}>{filtered.length}</span>
            properties found
            {selectedCity !== 'All Cities' && <span style={{ color: 'var(--gold)' }}> in {selectedCity}</span>}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '8rem 0', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>◯</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--warm-white)', marginBottom: '0.5rem' }}>No Properties Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Try adjusting your filters or search term</p>
            <button onClick={clearFilters} className="btn-gold">Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
