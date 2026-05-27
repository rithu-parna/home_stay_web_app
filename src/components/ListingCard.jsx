// src/components/ListingCard.jsx
import React from 'react';
import { Star, Heart } from 'lucide-react';

export default function ListingCard({ listing, isSaved, onToggleSave, onClick }) {
  const { id, title, location, price, rating, reviewsCount, category, images, bedrooms, bathrooms } = listing;

  const handleSaveClick = (e) => {
    e.stopPropagation(); // Avoid opening the detail view when clicking the save button
    onToggleSave(id);
  };

  return (
    <div 
      id={`listing-card-${id}`}
      onClick={onClick}
      className="glass-card anim-scale-in"
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Listing Image Cover */}
      <div className="card-img-wrapper">
        <img 
          src={images[0]} 
          alt={title} 
          className="card-img" 
          loading="lazy"
        />
        
        {/* Rating overlay badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(19, 19, 26, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          padding: '0.35rem 0.65rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          color: '#fff',
          fontSize: '0.78rem',
          fontWeight: 600
        }}>
          <Star size={12} fill="#ffb020" color="#ffb020" />
          <span>{rating.toFixed(2)}</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>({reviewsCount})</span>
        </div>

        {/* Save Toggle Overlay */}
        <button
          id={`save-btn-${id}`}
          onClick={handleSaveClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isSaved ? 'var(--accent)' : 'rgba(19, 19, 26, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}
          title={isSaved ? "Remove from Saved" : "Save Stay"}
        >
          <Heart 
            size={16} 
            fill={isSaved ? "#fff" : "none"} 
            stroke={isSaved ? "none" : "#fff"} 
            style={{ transition: 'transform 0.2s ease' }}
          />
        </button>

        {/* Category tag */}
        <span style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'var(--accent-gradient)',
          color: '#fff',
          borderRadius: '6px',
          padding: '0.2rem 0.5rem',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}>
          {category}
        </span>
      </div>

      {/* Listing Content Details */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        flexGrow: 1
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1.15rem',
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flexGrow: 1
          }} title={title}>
            {title}
          </h3>
        </div>

        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          {location}
        </p>

        {/* Bed/Bath stats */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.8rem',
          marginBottom: '0.2rem'
        }}>
          <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-tertiary)' }} />
          <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
        </div>

        {/* Price Row */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}>${price}</span>
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginLeft: '0.2rem'
            }}>/ night</span>
          </div>
          
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
