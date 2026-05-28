// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { User, Mail, Calendar, Compass, ShieldAlert, Award, Trash2 } from 'lucide-react';

export default function UserProfile({ 
  user, 
  updateUser, 
  reservations, 
  cancelReservation, 
  savedStays, 
  onViewListing, 
  activeSubTab = 'bookings', 
  setActiveSubTab,
  onLogout
}) {
  const [name, setName] = useState(user.name || 'Alex Mercer');
  const [email, setEmail] = useState(user.email || 'alex.mercer@velastays.com');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    setIsEditing(false);
    setToastMsg('Profile updated successfully!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="anim-slide-up container" style={{
      paddingTop: '2.5rem',
      paddingBottom: '5rem',
      maxWidth: '1000px'
    }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          padding: '0.8rem 1.5rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 300,
          fontWeight: 500,
          fontSize: '0.9rem'
        }}>
          {toastMsg}
        </div>
      )}

      {/* Profile Overview Header Card */}
      <div className="glass-panel" style={{
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        marginBottom: '2.5rem'
      }}>
        {/* Avatar */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'var(--accent-gradient)',
          color: '#fff',
          fontSize: '2.2rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(224, 122, 95, 0.25)'
        }}>
          {name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Info */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {name}
            </h2>
            <span className="accent-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Award size={12} />
              Vela VIP Member
            </span>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', margin: '0.4rem 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.92rem' }}>
            <Mail size={14} />
            {email}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            fontSize: '0.82rem',
            color: 'var(--text-tertiary)'
          }}>
            <span>Total Bookings: <strong>{reservations.length}</strong></span>
            <span>Saved Stays: <strong>{savedStays.length}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', minWidth: '150px' }}>
          <button 
            id="edit-profile-btn"
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
            style={{ borderRadius: '12px', fontSize: '0.88rem', width: '100%' }}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button 
            id="logout-btn"
            onClick={onLogout}
            className="btn btn-secondary"
            style={{ 
              borderRadius: '12px', 
              fontSize: '0.88rem', 
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.05)',
              width: '100%'
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Edit Form Drawer */}
      {isEditing && (
        <form onSubmit={handleSave} className="glass-panel anim-slide-down" style={{
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Update Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }} className="mobile-only-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                id="profile-name-input"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="input-field"
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
              <input 
                id="profile-email-input"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="input-field"
                required
              />
            </div>
          </div>
          <button 
            id="save-profile-btn"
            type="submit" 
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', borderRadius: '10px', fontSize: '0.88rem', padding: '0.6rem 1.5rem' }}
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Bookings vs Saved Stays Sub Navigation Tabs */}
      <div className="profile-sub-tabs" style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        gap: '2rem'
      }}>
        <button
          id="profile-tab-bookings"
          onClick={() => setActiveSubTab('bookings')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'bookings' ? '3px solid var(--accent)' : '3px solid transparent',
            color: activeSubTab === 'bookings' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '0.5rem 0.2rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-serif)',
            transition: 'all 0.2s ease'
          }}
        >
          My Reservations ({reservations.length})
        </button>

        <button
          id="profile-tab-saved"
          onClick={() => setActiveSubTab('saved')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'saved' ? '3px solid var(--accent)' : '3px solid transparent',
            color: activeSubTab === 'saved' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '0.5rem 0.2rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-serif)',
            transition: 'all 0.2s ease'
          }}
        >
          Saved Listings ({savedStays.length})
        </button>
      </div>

      {/* Bookings List Panel */}
      {activeSubTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {reservations.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              color: 'var(--text-secondary)'
            }}>
              <Calendar size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Active Bookings</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                You haven't reserved any architectural stays yet. Head over to our explore panel to book your first escape!
              </p>
            </div>
          ) : (
            reservations.map((res) => (
              <div 
                key={res.id} 
                className="glass-panel"
                style={{
                  borderRadius: '20px',
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}
              >
                {/* Stay Summary */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}>
                  <div style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'var(--bg-tertiary)',
                    flexShrink: 0
                  }}>
                    <img 
                      src={res.listing.images[0]} 
                      alt={res.listing.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      {res.listing.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.15rem 0' }}>
                      {res.listing.location}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                      {res.checkIn} to {res.checkOut} ({res.nights} Nights) • {res.guests} Guests
                    </div>
                  </div>
                </div>

                {/* Pricing / Cancellation */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginLeft: 'auto'
                }} className="booking-action-row">
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Total Paid</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      ${res.finalTotal}
                    </div>
                  </div>

                  <button 
                    onClick={() => cancelReservation(res.id)}
                    className="btn-icon"
                    style={{
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.05)'
                    }}
                    title="Cancel Booking"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Listings Panel */}
      {activeSubTab === 'saved' && (
        <div>
          {savedStays.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              color: 'var(--text-secondary)'
            }}>
              <Compass size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Saved Stays</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                You haven't liked or bookmarked any stays yet. Tap the heart icons on listings to save them here!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {savedStays.map((lst) => (
                <div 
                  key={lst.id}
                  className="glass-panel"
                  onClick={() => onViewListing(lst)}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={lst.images[0]} alt={lst.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>{lst.category}</span>
                    <h4 style={{ fontSize: '1rem', margin: '0.15rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lst.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{lst.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>${lst.price} <span style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/ night</span></span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>View Stay →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Embed responsive css */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .mobile-only-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .booking-action-row {
            width: 100% !important;
            justify-content: space-between !important;
            margin-top: 0.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
