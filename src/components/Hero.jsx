// src/components/Hero.jsx
import React from 'react';
import { Compass, Tent, Trees, Layers, Landmark, Sunset } from 'lucide-react';

const categories = [
  { id: 'All', label: 'All Stays', icon: Compass },
  { id: 'Cabin', label: 'Cabins', icon: Tent },
  { id: 'Villa', label: 'Villas', icon: Sunset },
  { id: 'Loft', label: 'Lofts', icon: Layers },
  { id: 'Dome', label: 'Domes', icon: Trees },
  { id: 'Heritage', label: 'Heritage', icon: Landmark }
];

export default function Hero({ activeCategory, setActiveCategory }) {
  return (
    <div style={{
      position: 'relative',
      padding: '4rem 0 2rem 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      background: 'radial-gradient(circle at top, rgba(224, 122, 95, 0.08) 0%, transparent 60%)'
    }}>
      {/* Intro Badging */}
      <span className="accent-badge anim-fade" style={{
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '0.75rem'
      }}>
        Introducing VelaStays
      </span>

      {/* Main Premium Heading */}
      <h1 className="anim-slide-up" style={{
        fontSize: 'clamp(2.2rem, 5vw, 4rem)',
        maxWidth: '850px',
        margin: '0 auto',
        fontWeight: '700',
        lineHeight: 1.15
      }}>
        Book Architecturally <br className="desktop-only" />
        <span className="text-gradient">Stunning Escapes</span>
      </h1>

      {/* Supporting Text */}
      <p className="anim-slide-up" style={{
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.6,
        animationDelay: '0.1s'
      }}>
        A curated collection of design-forward, boutique homestays, deep forest cabins, cliffside infinity villas, and converted industrial lofts.
      </p>

      {/* Categories Scroller */}
      <div className="container" style={{ width: '100%', marginTop: '2rem' }}>
        <div className="category-bar custom-scrollbar" style={{
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.2rem'
        }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                id={`category-tab-${cat.id.toLowerCase()}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab ${isActive ? 'active' : ''}`}
                style={{
                  minWidth: '90px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem'
                }}
              >
                <Icon size={20} style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                  transition: 'color var(--transition-fast)'
                }} />
                <span>{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
