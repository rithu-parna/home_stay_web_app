// src/components/RecentStaysModal.jsx
import React from 'react';
import { X, Trash2, Clock, Star, Compass } from 'lucide-react';

export default function RecentStaysModal({ 
  isOpen, 
  onClose, 
  recentStays, 
  onSelectStay, 
  onRemoveStay, 
  onClearAll 
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10, 10, 15, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '1rem',
      animation: 'recent-fade-in 0.25s ease-out'
    }} onClick={onClose}>
      <div 
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          position: 'relative',
          gap: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} style={{ color: 'var(--accent)' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              margin: 0,
              color: 'var(--text-main)'
            }}>
              Recently Viewed
            </h3>
            <span style={{
              background: 'rgba(var(--accent-rgb), 0.1)',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '20px'
            }}>
              {recentStays.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '0.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Listings Section */}
        <div style={{
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          paddingRight: '4px'
        }} className="custom-scrollbar">
          {recentStays.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 1rem',
              textAlign: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-tertiary)'
              }}>
                <Compass size={24} />
              </div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Your history is clear
              </p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                Stays you view on the home page will be saved here for quick access.
              </p>
            </div>
          ) : (
            recentStays.map(listing => (
              <div 
                key={listing.id}
                onClick={() => onSelectStay(listing)}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.6rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-glass)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.2s, border-color 0.2s, background-color 0.2s',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
                className="recent-card-item"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb), 0.3)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
                }}
              >
                {/* Thumbnail Image */}
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={listing.image || '/images/cabin/cabin_1.jpg'} 
                    alt={listing.title} 
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                </div>

                {/* Listing Details */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                  minWidth: 0,
                  paddingRight: '1.5rem'
                }}>
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}>
                      {listing.category} • {listing.location.split(',')[0]}
                    </span>
                    <h4 style={{
                      margin: '2px 0 0 0',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {listing.title}
                    </h4>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px'
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-main)'
                    }}>
                      {listing.price}
                      <span style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        /night
                      </span>
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                      <Star size={12} fill="#eab308" stroke="#eab308" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {listing.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove item button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveStay(listing.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-tertiary)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-tertiary)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Actions */}
        {recentStays.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '0.75rem',
            gap: '1rem'
          }}>
            <button 
              onClick={onClearAll}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Trash2 size={14} />
              Clear History
            </button>
            
            <button 
              onClick={onClose}
              className="btn btn-secondary"
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                borderRadius: '8px'
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes recent-fade-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
