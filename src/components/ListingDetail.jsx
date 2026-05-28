// src/components/ListingDetail.jsx
import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, MapPin, CheckCircle, ShieldCheck, MessageSquare } from 'lucide-react';
import BookingPanel from './BookingPanel';

export default function ListingDetail({ listing, isSaved, onToggleSave, onClose, onReserve }) {
  const { 
    id, title, location, price, rating, reviewsCount, category, 
    images, description, amenities, maxGuests, bedrooms, bathrooms, 
    host, reviews, lat, lng 
  } = listing;

  const [activeImage, setActiveImage] = useState(images && images.length > 0 ? images[0] : '/images/placeholder.png');
  const [mediaMode, setMediaMode] = useState('photos');

  return (
    <div className="anim-fade" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 150,
      overflowY: 'auto',
      paddingBottom: '4rem'
    }}>
      {/* Header Actions */}
      <div className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '1rem 0',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button 
            id="close-detail-btn"
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', borderRadius: '12px' }}
          >
            <ArrowLeft size={16} />
            <span className="btn-text">Back to Explore</span>
          </button>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => onToggleSave(id)}
              className="btn btn-secondary"
              style={{
                borderRadius: '12px',
                padding: '0.5rem 1rem',
                color: isSaved ? 'var(--accent)' : 'inherit',
                borderColor: isSaved ? 'var(--accent)' : 'var(--border-color)'
              }}
            >
              <Heart size={16} fill={isSaved ? "var(--accent)" : "none"} />
              <span className="btn-text">{isSaved ? 'Saved' : 'Save Stay'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Title and Ratings Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="accent-badge" style={{ marginBottom: '0.5rem' }}>{category}</span>
          <h2 className="detail-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={16} fill="#ffb020" color="#ffb020" />
              <strong style={{ color: 'var(--text-primary)' }}>{rating.toFixed(2)}</strong>
              <span>({reviewsCount} Reviews)</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={16} style={{ color: 'var(--accent)' }} />
              <span>{location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981', fontWeight: 500 }}>VelaVerified Stay</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '7fr 4fr',
          gap: '2.5rem'
        }} className="detail-layout-grid">
          
          {/* LEFT COLUMN: Gallery & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            
            {/* Gallery Section */}
            <div>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                height: '450px',
                marginBottom: '1rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
                position: 'relative'
              }} className="detail-main-img-box">
                {/* Media Toggle overlay */}
                {listing.video && (
                  <div className="media-toggle-overlay" style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 20,
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '30px',
                    padding: '4px',
                    display: 'flex',
                    gap: '4px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}>
                    <button
                      onClick={() => setMediaMode('photos')}
                      style={{
                        background: mediaMode === 'photos' ? 'var(--accent)' : 'transparent',
                        border: 'none',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Photos
                    </button>
                    <button
                      onClick={() => setMediaMode('video')}
                      style={{
                        background: mediaMode === 'video' ? 'var(--accent)' : 'transparent',
                        border: 'none',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Video Tour
                    </button>
                  </div>
                )}

                {mediaMode === 'video' && listing.video ? (
                  <video
                    src={listing.video}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img 
                    src={activeImage} 
                    alt={title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                )}
              </div>

              {/* Thumbnails Row */}
              <div style={{
                display: 'flex',
                gap: '0.8rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
              }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '90px',
                      height: '65px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid var(--accent)' : '2px solid transparent',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeImage === img ? 1 : 0.6,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Specs & Description */}
            <div style={{
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '1.5rem'
              }}>
                <span>Up to {maxGuests} Guests</span>
                <span style={{ color: 'var(--border-hover)' }}>|</span>
                <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                <span style={{ color: 'var(--border-hover)' }}>|</span>
                <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this Escape</h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '0.98rem'
              }}>{description}</p>
            </div>

            {/* Amenities Section */}
            <div style={{
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>What this Place Offers</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem'
              }}>
                {amenities.map((amenity, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }} className="host-card-wrapper">
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                color: '#fff',
                fontSize: '1.4rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {host.avatar}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    Hosted by {host.name}
                  </h4>
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '100px',
                    fontWeight: 600
                  }}>{host.badge}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>{host.role}</p>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{host.joined} • {host.responseRate}</span>
              </div>
            </div>

            {/* Mock Vector Street Map */}
            <div style={{
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Location Map</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                Exact location details provided upon booking. Located in a safe, scenic environment.
              </p>
              
              {/* SVG Map Graphic */}
              <div style={{
                width: '100%',
                height: '250px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--bg-tertiary)'
              }}>
                <svg width="100%" height="100%" style={{ background: 'var(--bg-tertiary)' }}>
                  {/* Grid Lines */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-color)" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Scenic Water Body */}
                  <path d="M 0,220 C 150,180 250,240 400,190 C 550,140 700,200 800,160 L 800,250 L 0,250 Z" 
                        fill="rgba(14, 165, 233, 0.15)" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" />
                  
                  {/* Park Areas */}
                  <circle cx="120" cy="80" r="50" fill="rgba(16, 185, 129, 0.08)" />
                  <circle cx="680" cy="110" r="60" fill="rgba(16, 185, 129, 0.08)" />

                  {/* Street Roads */}
                  <line x1="0" y1="120" x2="800" y2="120" stroke="var(--border-hover)" strokeWidth="16" />
                  <line x1="320" y1="0" x2="320" y2="250" stroke="var(--border-hover)" strokeWidth="12" />
                  <line x1="560" y1="0" x2="560" y2="250" stroke="var(--border-hover)" strokeWidth="12" />
                  
                  {/* Outer Pulsing Indicator */}
                  <circle cx="320" cy="120" r="16" fill="var(--accent)" opacity="0.25">
                    <animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Pin Circle */}
                  <circle cx="320" cy="120" r="6" fill="var(--accent)" />
                </svg>

                {/* Floating Map Tag */}
                <div style={{
                  position: 'absolute',
                  top: '100px',
                  left: '340px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--glass-shadow)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <MapPin size={10} style={{ color: 'var(--accent)' }} />
                  <span>VelaStay Location</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
                Guest Reviews
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                {reviews.map((rev) => (
                  <div 
                    key={rev.id}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{rev.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginLeft: '0.6rem' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < Math.floor(rev.rating) ? "#ffb020" : "none"} 
                            color={i < Math.floor(rev.rating) ? "#ffb020" : "var(--text-tertiary)"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Panel */}
          <div>
            <BookingPanel listing={listing} onReserve={onReserve} />
          </div>

        </div>
      </div>

      {/* Embedded CSS for detail layout grid */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .detail-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .detail-main-img-box {
            height: 300px !important;
          }
        }
        @media (max-width: 600px) {
          .detail-title {
            font-size: 1.8rem !important;
          }
          .detail-main-img-box {
            height: 230px !important;
          }
        }
        @media (max-width: 480px) {
          .btn-text {
            display: none !important;
          }
          .media-toggle-overlay {
            top: 8px !important;
            right: 8px !important;
            transform: scale(0.85);
            transform-origin: top right;
          }
        }
      `}} />
    </div>
  );
}
