import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Users, Maximize2, Star, Phone, Mail, Play, ChevronLeft, CheckCircle2, Train, UtensilsCrossed, Dumbbell, ParkingCircle, Heart, Share2 } from 'lucide-react';
import { properties } from '../data/properties';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  transit: <Train size={14} />,
  food: <UtensilsCrossed size={14} />,
  gym: <Dumbbell size={14} />,
  parking: <ParkingCircle size={14} />,
};

function formatPrice(price: number, unit: string) {
  if (unit === 'total') return `₪${price.toLocaleString()}`;
  if (unit === 'month') return `₪${price.toLocaleString()}/mo`;
  return `₪${price}/m²`;
}

const sectionStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  padding: '1.75rem',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.6rem',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'var(--gold)',
  marginBottom: '1.2rem',
  display: 'block',
};

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!property) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'var(--text-muted)' }}>◯</div>
        <div className="display-md">Property Not Found</div>
        <Link to="/listings" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to Listings</Link>
      </div>
    );
  }

  const totalCost = property.costs.reduce((s, c) => s + c.amount, 0);
  const similar = properties.filter(p => p.id !== property.id && p.city === property.city).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>Home</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to="/listings" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>Listings</Link>
          <span>/</span>
          <span style={{ color: 'var(--warm-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{property.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>

            {/* Header */}
            <div style={{ ...sectionStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>
                    {property.type === 'rent' ? 'For Rent' : property.type === 'sale' ? 'For Sale' : property.type}
                  </span>
                  {property.hasVirtualTour && (
                    <span className="badge badge-dark" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Play size={8} /> 3D Tour
                    </span>
                  )}
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--warm-white)', lineHeight: 1.1, marginBottom: '0.6rem' }}>
                  {property.title}
                </h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <MapPin size={12} style={{ color: 'var(--gold)' }} />
                  {property.address}, {property.city}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => setSaved(!saved)}
                  style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: saved ? 'rgba(212,85,60,0.15)' : 'var(--bg-surface)', border: `1px solid ${saved ? 'rgba(212,85,60,0.4)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.2s', color: saved ? '#D4553C' : 'var(--text-muted)' }}>
                  <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
                </button>
                <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {/* Gallery */}
            <div style={{ ...sectionStyle, padding: 0 }}>
              {showTour ? (
                <div style={{ height: 420, background: 'var(--bg-mid)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--gold)', marginBottom: '1rem' }}>◎</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--warm-white)' }}>Virtual 3D Tour</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Interactive tour player would load here</p>
                  <button onClick={() => setShowTour(false)} className="btn-outline-gold" style={{ marginTop: '1.5rem', fontSize: '0.65rem' }}>Exit Tour</button>
                </div>
              ) : (
                <>
                  <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
                    <img src={property.images[activeImage] ?? property.image} alt={property.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(8,12,20,0.6) 100%)' }} />
                    {property.hasVirtualTour && (
                      <button onClick={() => setShowTour(true)} className="btn-gold"
                        style={{ position: 'absolute', bottom: 16, left: 16, fontSize: '0.65rem', gap: '0.4rem' }}>
                        <Play size={12} /> Launch 3D Tour
                      </button>
                    )}
                    <div className="corner-deco tl" />
                    <div className="corner-deco br" />
                  </div>
                  {property.images.length > 1 && (
                    <div style={{ display: 'flex', gap: 1, background: 'var(--border)', padding: 1 }}>
                      {property.images.map((img, i) => (
                        <button key={i} onClick={() => setActiveImage(i)}
                          style={{ flex: 1, height: 68, overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', opacity: activeImage === i ? 1 : 0.45, transition: 'opacity 0.2s', outline: activeImage === i ? `1px solid var(--gold)` : 'none' }}>
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Key stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
              {[
                { icon: <Maximize2 size={14} style={{ color: 'var(--gold)' }} />, label: 'Area', value: `${property.area} m²` },
                { icon: <Users size={14} style={{ color: 'var(--gold)' }} />, label: 'Capacity', value: `${property.capacity} people` },
                { icon: <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>⬡</span>, label: 'Floor', value: `${property.floor} / ${property.totalFloors}` },
                { icon: <Star size={14} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />, label: 'Rating', value: `${property.rating} (${property.reviews})` },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--bg-surface)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {s.icon}
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--warm-white)' }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={sectionStyle}>
              <span style={labelStyle}>About this property</span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.25rem' }}>{property.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {property.features.map(f => (
                  <span key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-body)', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.35rem 0.75rem' }}>
                    <CheckCircle2 size={11} style={{ color: 'var(--gold)' }} /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Cost breakdown */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Full Cost Estimate</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {property.costs.map((c, i) => (
                  <div key={c.label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.9rem 0', borderBottom: i < property.costs.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-body)' }}>{c.label}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, color: 'var(--warm-white)' }}>₪{c.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-white)' }}>Total Monthly</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, color: 'var(--gold)' }}>₪{totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Amenities / Map */}
            <div style={sectionStyle}>
              <span style={labelStyle}>Location & Nearby</span>
              <div style={{ background: 'var(--bg-mid)', border: '1px solid var(--border)', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative' }}>
                <div className="corner-deco tl" /><div className="corner-deco br" />
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={28} style={{ color: 'var(--gold)', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-body)' }}>{property.address}, {property.city}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{property.lat.toFixed(4)}, {property.lng.toFixed(4)}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {property.nearbyAmenities.map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                      {AMENITY_ICONS[a.type]}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--warm-white)' }}>{a.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{a.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', position: 'sticky', top: 80 }}>
            {/* Price & actions */}
            <div style={{ ...sectionStyle, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1 }}>
                  {formatPrice(property.price, property.priceUnit)}
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                  {property.priceUnit === 'month' ? 'per month + expenses' : property.priceUnit === 'total' ? 'purchase price' : 'per square meter'}
                </div>
              </div>

              <div className="gold-divider" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <Phone size={13} /> Call Agent
                </button>
                <button className="btn-outline-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <Mail size={13} /> Send Message
                </button>
                {property.hasVirtualTour && (
                  <button onClick={() => setShowTour(true)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      background: 'rgba(196,164,74,0.06)', border: '1px solid var(--gold-border)',
                      color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                      fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-dim)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(196,164,74,0.06)')}>
                    <Play size={12} /> 3D Virtual Tour
                  </button>
                )}
              </div>

              <div className="gold-divider" />

              {/* Agent */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: 40, height: 40, background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)', flexShrink: 0 }}>
                  DA
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--warm-white)' }}>David Azulai</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Licensed Commercial Agent</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Star size={10} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--warm-white)' }}>4.9</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>· 87 deals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div style={sectionStyle}>
                <span style={labelStyle}>Similar in {property.city}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {similar.map(p => (
                    <Link key={p.id} to={`/property/${p.id}`}
                      style={{ display: 'flex', gap: '0.75rem', textDecoration: 'none', padding: '0.6rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-border)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      <img src={p.image} alt={p.title} style={{ width: 60, height: 50, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-display)', color: 'var(--warm-white)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{p.area} m² · {p.capacity} ppl</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--gold)', marginTop: '0.2rem' }}>
                          ₪{p.price.toLocaleString()}{p.priceUnit === 'month' ? '/mo' : ''}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '2rem' }}>
          <Link to="/listings" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
