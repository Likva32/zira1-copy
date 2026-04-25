import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Play } from 'lucide-react';
import { cities, properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const STATS = [
  { value: '1,330', label: 'Offices for Rent' },
  { value: '93',    label: 'For Sale' },
  { value: '1,532', label: 'Buildings' },
  { value: '135',   label: 'Coworking Spaces' },
];

const FEATURES = [
  { icon: '⬡', title: '3D Virtual Tours', desc: 'Explore any property immersively from your desk. Save time, shortlist faster.' },
  { icon: '◈', title: 'Full Cost Clarity', desc: 'Rent, arnona, management fees, cleaning — all transparent before you commit.' },
  { icon: '◎', title: 'Smart Location Maps', desc: 'Walk times to transit, restaurants, gyms, and parking for every listing.' },
];

const TYPE_TILES = [
  { label: 'Rent', sub: '1,330 listings', type: 'rent', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { label: 'Sale', sub: '93 listings', type: 'sale', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { label: 'Coworking', sub: '135 spaces', type: 'coworking', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80' },
  { label: 'New Projects', sub: '36 projects', type: 'new', img: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=80' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'rent' | 'sale' | 'coworking'>('rent');
  const navigate = useNavigate();

  const featured = properties.filter(p => p.hasVirtualTour).slice(0, 3);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/listings?type=${tab}&q=${encodeURIComponent(query)}`);
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ══ HERO ══ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=70")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12,
        }} />
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--bg-deep) 0%, rgba(8,12,20,0.5) 60%, rgba(12,20,35,0.9) 100%)' }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Gold accent bar top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.6 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '10rem 2rem 6rem', width: '100%' }}>
          <div style={{ maxWidth: 780 }}>
            {/* Eyebrow */}
            <div className="label-xs afu" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
              Israel's Commercial Real Estate Market
            </div>

            {/* Headline */}
            <h1 className="display-xl afu-2" style={{ marginBottom: '1.5rem' }}>
              Find Your
              <br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Perfect</em>
              <br />
              Workspace
            </h1>

            <p className="afu-3" style={{ fontSize: '1rem', color: 'var(--text-body)', maxWidth: 480, lineHeight: 1.75, marginBottom: '2.5rem' }}>
              3D virtual tours · transparent pricing · interactive maps.
              Over 3,000 commercial spaces across Israel — explore without leaving your chair.
            </p>

            {/* Search box */}
            <div className="afu-4" style={{
              background: 'rgba(20,27,40,0.9)',
              border: '1px solid var(--gold-border)',
              backdropFilter: 'blur(16px)',
              padding: '1.5rem',
              maxWidth: 580,
            }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                {(['rent','sale','coworking'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
                      color: tab === t ? 'var(--warm-white)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '0.5rem 1.2rem', cursor: 'pointer', transition: 'all 0.2s',
                      marginBottom: -1,
                    }}>
                    {t === 'rent' ? 'For Rent' : t === 'sale' ? 'For Sale' : 'Coworking'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0 1rem' }}>
                  <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="City, neighborhood, address..."
                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--warm-white)', fontSize: '0.85rem', fontFamily: 'var(--font-body)', padding: '0.8rem 0' }}
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ gap: '0.4rem', flexShrink: 0 }}>
                  <Search size={14} /> Search
                </button>
              </form>
            </div>

            {/* Stats row */}
            <div className="afu-5" style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating accent image */}
          <div style={{
            position: 'absolute', right: '2rem', bottom: '4rem',
            width: 340, height: 240,
            border: '1px solid var(--gold-border)',
            overflow: 'hidden',
            display: 'none',
          }} className="xl:block">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80"
              alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div className="corner-deco tl" />
            <div className="corner-deco tr" />
            <div className="corner-deco bl" />
            <div className="corner-deco br" />
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="gold-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* ══ CATEGORY TILES ══ */}
      <section style={{ background: 'var(--bg-mid)', padding: '6rem 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="gold-rule" style={{ marginBottom: '1.5rem' }}>Browse by type</div>
            <h2 className="display-lg" style={{ maxWidth: 520 }}>Every Kind of Commercial Space</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {TYPE_TILES.map((t, i) => (
              <button key={t.type} onClick={() => navigate(`/listings?type=${t.type}`)}
                style={{
                  position: 'relative', height: 280, overflow: 'hidden',
                  cursor: 'pointer', border: 'none', padding: 0,
                  animationDelay: `${i * 0.08}s`,
                }}>
                <img src={t.img} alt={t.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)', filter: 'brightness(0.45)' }}
                  onMouseEnter={e => { (e.currentTarget.style.transform = 'scale(1.08)'); (e.currentTarget.style.filter = 'brightness(0.6)'); }}
                  onMouseLeave={e => { (e.currentTarget.style.transform = 'scale(1)'); (e.currentTarget.style.filter = 'brightness(0.45)'); }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1.1 }}>{t.label}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.35rem' }}>{t.sub}</div>
                </div>
                <div className="corner-deco br" style={{ opacity: 0.3 }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED ══ */}
      <section style={{ background: 'var(--bg-deep)', padding: '6rem 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="gold-rule" style={{ marginBottom: '1.5rem', maxWidth: 300 }}>Featured listings</div>
              <h2 className="display-lg">With 3D Virtual Tours</h2>
              <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Explore spaces immersively before visiting in person</p>
            </div>
            <button onClick={() => navigate('/listings')} className="btn-outline-gold">
              All Listings <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ══ CITIES ══ */}
      <section style={{ background: 'var(--bg-surface)', padding: '6rem 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div className="gold-rule" style={{ marginBottom: '1.5rem' }}>Search by city</div>
          <h2 className="display-lg" style={{ marginBottom: '3rem' }}>Across All of Israel</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {cities.map(city => (
              <button key={city.name}
                onClick={() => navigate(`/listings?city=${encodeURIComponent(city.name)}`)}
                style={{ position: 'relative', height: 160, overflow: 'hidden', cursor: 'pointer', border: 'none', padding: 0 }}>
                <img src={city.image} alt={city.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', transition: 'all 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget.style.transform = 'scale(1.1)'); (e.currentTarget.style.filter = 'brightness(0.55)'); }}
                  onMouseLeave={e => { (e.currentTarget.style.transform = 'scale(1)'); (e.currentTarget.style.filter = 'brightness(0.4)'); }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem', textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1 }}>{city.name}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{city.count} listings</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ background: 'var(--bg-mid)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,164,74,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div className="gold-rule" style={{ marginBottom: '1.5rem' }}>Why CommercialHub</div>
          <h2 className="display-lg" style={{ marginBottom: '4rem', maxWidth: 480 }}>Built for Modern Real Estate</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} style={{ background: 'var(--bg-surface)', padding: '2.5rem', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1.2rem', lineHeight: 1 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--warm-white)', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.75 }}>{f.desc}</p>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: i === 0 ? 'var(--gold)' : 'transparent', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: 'var(--bg-deep)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=60")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08,
        }} />
        <div className="gold-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div className="label-xs" style={{ marginBottom: '1.5rem' }}>Ready to find your space?</div>
          <h2 className="display-lg" style={{ marginBottom: '1.5rem' }}>
            Over 3,000 Properties<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Waiting for You</em>
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: 1.75 }}>
            Start exploring commercial spaces across Israel with our immersive 3D tours and full cost transparency.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/listings')} className="btn-gold">
              Browse All Listings <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate('/listings?tour=1')} className="btn-outline-gold">
              <Play size={13} /> 3D Tours Only
            </button>
          </div>
        </div>
        <div className="gold-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--warm-white)', marginBottom: '0.75rem' }}>
                Commercial<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Hub</em>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Israel's leading commercial real estate marketplace. Find the perfect space for your business.
              </p>
            </div>
            {[
              { title: 'Property Types', links: ['For Rent', 'For Sale', 'Coworking', 'Buildings', 'New Projects'] },
              { title: 'Top Cities', links: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Ramat Gan', "Be'er Sheva"] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact', 'Privacy'] },
            ].map(col => (
              <div key={col.title}>
                <div className="label-xs" style={{ marginBottom: '1.2rem' }}>{col.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="gold-divider" style={{ marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>© 2024 CommercialHub. All rights reserved.</span>
            <span>03-3095560</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
