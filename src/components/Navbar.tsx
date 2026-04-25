import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'For Rent', type: 'rent' },
  { label: 'For Sale', type: 'sale' },
  { label: 'Coworking', type: 'coworking' },
  { label: 'Buildings', type: 'building' },
  { label: 'New Projects', type: 'new' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav style={{
      background: isHome ? 'linear-gradient(180deg, rgba(8,12,20,0.95) 0%, transparent 100%)' : 'rgba(8,12,20,0.97)',
      borderBottom: isHome ? 'none' : '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      position: isHome ? 'absolute' : 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Brand */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--warm-white)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Commercial
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Hub
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.1rem' }}>
            {NAV_LINKS.map(l => (
              <button
                key={l.type}
                onClick={() => navigate(`/listings?type=${l.type}`)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--text-body)', fontSize: '0.78rem', fontWeight: 500,
                  letterSpacing: '0.05em', padding: '0.4rem 0.85rem',
                  cursor: 'pointer', transition: 'color 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-body)')}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1.2rem' }}>
            <a href="tel:03-3095560"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Phone size={12} /> 03-3095560
            </a>
            <button className="btn-gold" style={{ padding: '0.55rem 1.3rem', fontSize: '0.65rem' }}>
              List Property
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'var(--warm-white)', cursor: 'pointer' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '1rem 2rem 1.5rem' }}>
          {NAV_LINKS.map(l => (
            <button key={l.type}
              onClick={() => { navigate(`/listings?type=${l.type}`); setOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-body)', fontSize: '0.88rem', padding: '0.75rem 0', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {l.label}
            </button>
          ))}
          <button className="btn-gold" style={{ marginTop: '1.2rem', width: '100%', justifyContent: 'center' }}>
            List Property
          </button>
        </div>
      )}
    </nav>
  );
}
