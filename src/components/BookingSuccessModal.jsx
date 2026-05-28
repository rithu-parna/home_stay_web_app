// src/components/BookingSuccessModal.jsx
import React from 'react';
import { Calendar, Users, MapPin, DollarSign, Bookmark } from 'lucide-react';

export default function BookingSuccessModal({ reservation, listing, onClose }) {
  if (!reservation || !listing) return null;

  // Generate random confirmation code
  const confirmationCode = `VS-${Math.floor(100000 + Math.random() * 900000)}-${listing.category.substring(0, 2).toUpperCase()}`;

  return (
    <div className="anim-fade" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11, 11, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel anim-scale-in" style={{
        maxWidth: '540px',
        width: '100%',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        {/* Animated Checkmark SVG */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid rgba(16, 185, 129, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.5rem'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" style={{
              strokeDasharray: 50,
              strokeDashoffset: 50,
              animation: 'drawCheck 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards'
            }} />
          </svg>
        </div>

        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Your host has accepted your request. Have a wonderful stay!
          </p>
        </div>

        {/* Ticket receipt styled box */}
        <div style={{
          width: '100%',
          background: 'var(--bg-primary)',
          border: '1px dashed var(--border-hover)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative'
        }}>
          {/* Top Info */}
          <div>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>
              Accommodation
            </span>
            <h4 style={{ fontSize: '1.1rem', margin: '0.15rem 0', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {listing.title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <MapPin size={12} style={{ color: 'var(--accent)' }} />
              <span>{listing.location}</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)' }} />

          {/* Dates & Guests Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Dates</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', marginTop: '0.2rem', fontWeight: 500 }}>
                <Calendar size={13} style={{ color: 'var(--text-secondary)' }} />
                <span>{reservation.nights} nights total</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {reservation.checkIn} to {reservation.checkOut}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Guests</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', marginTop: '0.2rem', fontWeight: 500 }}>
                <Users size={13} style={{ color: 'var(--text-secondary)' }} />
                <span>{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)' }} />

          {/* Reference & Pricing */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Booking Reference</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                <Bookmark size={12} style={{ color: 'var(--accent)' }} />
                <span>{confirmationCode}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Total Paid</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>
                ${reservation.finalTotal}
              </div>
            </div>
          </div>
        </div>

        <button 
          id="close-success-btn"
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', fontWeight: 600 }}
        >
          View Bookings & Saved Stays
        </button>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          A booking receipt and itinerary details have been sent to your email.
        </span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}
