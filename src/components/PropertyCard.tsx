import { Link } from 'react-router-dom';
import { MapPin, Users, Maximize2, Star, Play } from 'lucide-react';
import type { Property } from '../data/properties';

function formatPrice(p: Property) {
  if (p.priceUnit === 'total') return `₪${(p.price / 1_000_000).toFixed(1)}M`;
  if (p.priceUnit === 'month') return `₪${p.price.toLocaleString()}`;
  return `₪${p.price}/m²`;
}

function typeBadge(type: Property['type']) {
  const map: Record<string, string> = {
    rent: 'For Rent', sale: 'For Sale', coworking: 'Coworking',
    building: 'Building', new: 'New Project',
  };
  return map[type] ?? type;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link to={`/property/${property.id}`} className="prop-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 210, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={property.image}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)', display: 'block' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(8,12,20,0.88) 100%)' }} />

        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: '0.4rem', zIndex: 2 }}>
          <span className="badge badge-gold">{typeBadge(property.type)}</span>
          {property.hasVirtualTour && (
            <span className="badge badge-dark" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Play size={8} /> 3D
            </span>
          )}
        </div>

        <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 2, textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1 }}>
            {formatPrice(property)}
          </div>
          {property.priceUnit === 'month' && (
            <div style={{ fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>/month</div>
          )}
        </div>

        <div className="corner-deco tl" />
        <div className="corner-deco br" />
      </div>

      {/* Body */}
      <div style={{ padding: '1rem 1.1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem', fontWeight: 500, color: 'var(--warm-white)', lineHeight: 1.2, marginBottom: '0.3rem' }}>
            {property.title}
          </h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            <MapPin size={10} /> {property.address}, {property.city}
          </p>
        </div>

        <div className="gold-divider" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.7rem', color: 'var(--text-body)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Maximize2 size={10} style={{ color: 'var(--gold)' }} /> {property.area} m²
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={10} style={{ color: 'var(--gold)' }} /> {property.capacity}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>Fl. {property.floor}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={11} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--warm-white)' }}>{property.rating}</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>({property.reviews})</span>
          </div>
          <span style={{ fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
