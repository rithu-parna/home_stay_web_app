// src/components/BookingPanel.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Info, AlertTriangle } from 'lucide-react';

export default function BookingPanel({ listing, onReserve }) {
  const { price, maxGuests } = listing;

  // Default dates: Today and 3 days from now
  const getTodayString = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTodayString(1));
  const [checkOut, setCheckOut] = useState(getTodayString(4));
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);
  const [error, setError] = useState('');

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        setError('Check-out date must be after check-in date');
        setNights(0);
      } else {
        setError('');
        setNights(diffDays);
      }
    }
  }, [checkIn, checkOut]);

  // Fees calculations
  const baseTotal = price * nights;
  const cleaningFee = 85;
  const serviceFee = Math.round(baseTotal * 0.12);
  const occupancyTax = Math.round(baseTotal * 0.08);
  const finalTotal = baseTotal + cleaningFee + serviceFee + occupancyTax;

  const handleGuestsChange = (val) => {
    const num = parseInt(val, 10);
    if (num > maxGuests) {
      setError(`This stay allows a maximum of ${maxGuests} guests`);
    } else if (num < 1) {
      setError('Minimum 1 guest required');
    } else {
      setError('');
      setGuests(num);
    }
  };

  const handleBook = () => {
    if (nights <= 0) {
      setError('Please select valid check-in and check-out dates.');
      return;
    }
    if (guests > maxGuests) {
      setError(`Max guests limit is ${maxGuests}.`);
      return;
    }
    
    // Fire the reservation trigger back to Parent
    onReserve({
      checkIn,
      checkOut,
      guests,
      nights,
      baseTotal,
      cleaningFee,
      serviceFee,
      occupancyTax,
      finalTotal
    });
  };

  return (
    <div className="glass-panel booking-panel-card" style={{
      borderRadius: '24px',
      padding: '2rem',
      position: 'sticky',
      top: '90px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--glass-shadow)',
      background: 'var(--bg-secondary)'
    }}>
      {/* Header Price Info */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>${price}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}> / night</span>
        </div>
        <span style={{
          fontSize: '0.85rem',
          color: 'var(--accent)',
          fontWeight: 600
        }}>
          Best Price Guaranteed
        </span>
      </div>

      {/* Date Selectors */}
      <div className="booking-dates-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Check In
          </label>
          <div style={{ position: 'relative' }}>
            <Calendar size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              id="booking-checkin-input"
              type="date" 
              value={checkIn}
              min={getTodayString()}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Check Out
          </label>
          <div style={{ position: 'relative' }}>
            <Calendar size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              id="booking-checkout-input"
              type="date" 
              value={checkOut}
              min={checkIn || getTodayString(1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Guests Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          Guests (Max {maxGuests})
        </label>
        <div style={{ position: 'relative' }}>
          <Users size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input 
            id="booking-guests-input"
            type="number" 
            value={guests}
            min={1}
            max={maxGuests}
            onChange={(e) => handleGuestsChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Validation Errors */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          color: '#ef4444',
          fontSize: '0.85rem'
        }}>
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Price Calculations Breakdown */}
      {nights > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          fontSize: '0.9rem',
          padding: '0.5rem 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>${price} x {nights} nights</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>${baseTotal}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Cleaning fee <Info size={12} title="One-time fee charged by host" style={{ cursor: 'help' }} />
            </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>${cleaningFee}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Service fee (12%)</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>${serviceFee}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Occupancy tax & tourism levy</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>${occupancyTax}</span>
          </div>

          <div style={{
            height: '1px',
            background: 'var(--border-color)',
            margin: '0.5rem 0'
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.15rem',
            fontWeight: 700
          }}>
            <span>Total before taxes</span>
            <span className="text-gradient">${finalTotal}</span>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button 
        id="book-listing-btn"
        onClick={handleBook}
        disabled={nights <= 0 || !!error}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '12px',
          opacity: (nights <= 0 || !!error) ? 0.5 : 1,
          cursor: (nights <= 0 || !!error) ? 'not-allowed' : 'pointer'
        }}
      >
        Reserve Stay
      </button>

      <span style={{
        fontSize: '0.75rem',
        color: 'var(--text-tertiary)',
        textAlign: 'center'
      }}>
        You won't be charged yet. Dates are guaranteed for 15 minutes.
      </span>
    </div>
  );
}
