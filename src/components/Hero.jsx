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

const uniqueVideos = [
  { id: 'house_tour', url: 'https://res.cloudinary.com/demo/video/upload/house_tour.mp4' },
  { id: 'livingspace', url: 'https://res.cloudinary.com/demo/video/upload/docs/livingspace.mp4' },
  { id: 'bathroom', url: 'https://res.cloudinary.com/demo/video/upload/docs/bathroom.mp4' },
  { id: 'kitchen', url: 'https://res.cloudinary.com/demo/video/upload/docs/kitchen.mp4' }
];

const categoryToVideoId = {
  All: 'house_tour',
  Cabin: 'livingspace',
  Villa: 'bathroom',
  Loft: 'kitchen',
  Dome: 'livingspace',
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
              opacity: isActive ? 0.3 : 0,
              filter: 'brightness(0.9) contrast(1.05) saturate(1.15)',
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

      {/* Top and Bottom Gradient Overlays to blend vertically while keeping left & right sides crisp and full-width */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 80%, var(--bg-primary) 100%)',
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
        <span className="accent-badge anim-fade" style={{
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          backdropFilter: 'blur(4px)',
          background: 'rgba(224, 122, 95, 0.12)'
        }}>
          Introducing VelaStays
        </span>

        {/* Main Premium Heading */}
        <h1 className="anim-slide-up" style={{
          fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
          fontWeight: '700',
          lineHeight: 1.1,
          margin: 0
        }}>
          Book Architecturally <br className="desktop-only" />
          <span className="text-gradient">Stunning Escapes</span>
        </h1>

        {/* Supporting Text */}
        <p className="anim-slide-up" style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0.5rem auto 0 auto',
          lineHeight: 1.6,
          animationDelay: '0.1s'
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
                    setActiveCategories(prev => {
                      if (prev.includes(cat.id)) {
                        return prev.filter(c => c !== cat.id);
                      } else {
                        return [...prev, cat.id];
                      }
                    });
                  }
                }}
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
