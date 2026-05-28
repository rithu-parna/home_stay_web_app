// src/components/Hero.jsx
import React from 'react';
import { Compass, Tent, Trees, Layers, Landmark, Sunset } from 'lucide-react';

const categories = [
  { id: 'All', label: 'All Stays', icon: Compass },
  { id: 'Cabin', label: 'Cabins', icon: Tent, image: '/images/cabin/cabin_1.jpg' },
  { id: 'Villa', label: 'Villas', icon: Sunset, image: '/images/villa/villa_1.jpg' },
  { id: 'Loft', label: 'Lofts', icon: Layers, image: '/images/loft/loft_1.jpg' },
  { id: 'Dome', label: 'Domes', icon: Trees, image: '/images/dome/dome_1.jpg' },
  { id: 'Heritage', label: 'Heritage', icon: Landmark, image: '/images/heritage/heritage_1.jpg' }
];

const uniqueVideos = [
  { id: 'house_tour', url: '/videos/glide-over-coastal-beach.mp4' },
  { id: 'livingspace', url: '/videos/livingspace.mp4' },
  { id: 'bathroom', url: '/videos/bathroom.mp4' },
  { id: 'kitchen', url: '/videos/kitchen.mp4' },
  { id: 'coastal', url: '/videos/glide-over-coastal-beach.mp4' }
];

const categoryToVideoId = {
  All: 'house_tour',
  Cabin: 'livingspace',
  Villa: 'coastal',
  Loft: 'kitchen',
  Dome: 'bathroom',
  Heritage: 'house_tour'
};

export default function Hero({ activeCategories = [], setActiveCategories }) {
  // If activeCategories is empty, use 'All' video. Otherwise, map the last selected category to its video.
  const activeVideoId = activeCategories.length === 0
    ? 'house_tour'
    : (categoryToVideoId[activeCategories[activeCategories.length - 1]] || 'house_tour');

  return (
    <div style={{
      position: 'relative',
      padding: '5rem 0 3rem 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
      minHeight: '420px',
      justifyContent: 'center'
    }}>
      {/* Background Videos (Pre-loaded with smooth cross-fade) */}
      {uniqueVideos.map((video) => {
        const isActive = activeVideoId === video.id;
        return (
          <video
            key={video.id}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: isActive ? 'var(--hero-video-opacity, 0.3)' : 0,
              filter: 'var(--hero-video-filter, brightness(0.9) contrast(1.05) saturate(1.15))',
              pointerEvents: 'none',
              transition: 'opacity 1.2s ease-in-out'
            }}
          >
            <source
              src={video.url}
              type="video/mp4"
            />
          </video>
        );
      })}

      {/* Hero Video Translucent Color Overlay to keep text readable while keeping video fully visible */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--hero-overlay-bg, rgba(0, 0, 0, 0.4))',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Hero Content Wrapper */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        maxWidth: '850px',
        width: '100%',
        padding: '0 1rem'
      }}>
        {/* Intro Badging */}
        <span className="accent-badge hero-badge-entrance" style={{
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          backdropFilter: 'blur(4px)',
          background: 'rgba(224, 122, 95, 0.12)'
        }}>
          Introducing VelaStays
        </span>

        {/* Main Premium Heading */}
        <h1 className="hero-title-entrance" style={{
          fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
          fontWeight: '700',
          lineHeight: 1.1,
          margin: 0
        }}>
          Book Architecturally <br className="desktop-only" />
          <span className="text-gradient">Stunning Escapes</span>
        </h1>

        {/* Supporting Text */}
        <p className="hero-subtitle-entrance" style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0.5rem auto 0 auto',
          lineHeight: 1.6
        }}>
          A curated collection of design-forward, boutique homestays, deep forest cabins, cliffside infinity villas, and converted industrial lofts.
        </p>
      </div>

      {/* Categories Scroller */}
      <div className="container" style={{ width: '100%', marginTop: '2.5rem', position: 'relative', zIndex: 2 }}>
        <div className="category-bar custom-scrollbar" style={{
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.2rem'
        }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = cat.id === 'All'
              ? activeCategories.length === 0
              : activeCategories.includes(cat.id);
            return (
              <div
                key={cat.id}
                id={`category-tab-${cat.id.toLowerCase()}`}
                onClick={() => {
                  if (cat.id === 'All') {
                    setActiveCategories([]);
                  } else {
                    // Single-select: toggle off if already active, otherwise select only this one
                    setActiveCategories(prev =>
                      prev.length === 1 && prev[0] === cat.id ? [] : [cat.id]
                    );
                  }
                }}
                className={`category-tab ${isActive ? 'active' : ''}`}
                style={{
                  minWidth: '90px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem'
                }}
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.label}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      transition: 'all var(--transition-fast)',
                      filter: isActive ? 'none' : 'grayscale(25%) brightness(0.95)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'rgba(224, 122, 95, 0.15)' : 'var(--bg-tertiary)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <Icon size={14} style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    }} />
                  </div>
                )}
                <span>{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
