import React, { useState } from 'react';
import { PlusCircle, BarChart3, ClipboardList, Check, X, ShieldCheck, DollarSign, Percent } from 'lucide-react';

export default function HostDashboard({ listings, onAddListing, onDeleteListing }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Cabin');
  const [price, setPrice] = useState(250);
  const [description, setDescription] = useState('');
  const [amenitiesText, setAmenitiesText] = useState('WiFi, Hot Tub, Fireplace, Espresso Maker');
  const [maxGuests, setMaxGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [selectedImg, setSelectedImg] = useState('/images/cabin.png'); // Default preset

  const [toast, setToast] = useState('');

  const [hostBookings, setHostBookings] = useState([
    { id: "hb_1", guestName: "Michael Chang", listingTitle: "The Obsidian A-Frame Cabin", checkIn: "2026-06-10", checkOut: "2026-06-15", amount: 1400, status: "pending" },
    { id: "hb_2", guestName: "Sarah Jenkins", listingTitle: "Ubud Bamboo Forest Dome", checkIn: "2026-07-02", checkOut: "2026-07-05", amount: 660, status: "approved" }
  ]);

  const handleBookingAction = (id, action) => {
    setHostBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: action === 'approve' ? 'approved' : 'declined' } : b)
    );
    setToast(`Booking ${action === 'approve' ? 'Approved' : 'Declined'} successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !price || !description) {
      setToast('Please fill out all required fields');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    const newListing = {
      id: `lst_user_${Date.now()}`,
      title,
      location,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 0,
      category,
      images: [
        selectedImg,
        "/images/cabin/cabin_1.jpg"
      ],
      description,
      amenities: amenitiesText.split(',').map(s => s.trim()).filter(Boolean),
      maxGuests: Number(maxGuests),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      host: {
        name: "You (Host)",
        avatar: "ME",
        role: "Boutique Owner",
        joined: "Joined Today",
        badge: "Superhost",
        responseRate: "100% Response Rate"
      },
      reviews: []
    };

    onAddListing(newListing);
    setToast('Listing published successfully!');
    setTimeout(() => setToast(''), 3000);
    setTitle('');
    setLocation('');
    setDescription('');
    setAmenitiesText('WiFi, Hot Tub, Fireplace, Espresso Maker');
    setPrice(250);
    setActiveSubTab('overview');
  };

  return (
    <div className="anim-slide-up container" style={{
      paddingTop: '2.5rem',
      paddingBottom: '5rem'
    }}>
      {toast && (
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
          {toast}
        </div>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>Host Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage listings, track reservation requests, and monitor your boutique portfolio earnings.
          </p>
        </div>
        <button
          id="host-tab-create-btn"
          onClick={() => setActiveSubTab('create')}
          className="btn btn-primary"
          style={{ borderRadius: '12px' }}
        >
          <PlusCircle size={16} />
          Create New Listing
        </button>
      </div>
      <div className="glass-panel" style={{
        display: 'flex',
        borderRadius: '12px',
        padding: '0.4rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem',
        maxWidth: '500px'
      }}>
        <button
          id="host-tab-overview"
          onClick={() => setActiveSubTab('overview')}
          className="btn"
          style={{
            flex: 1,
            borderRadius: '8px',
            background: activeSubTab === 'overview' ? 'var(--bg-tertiary)' : 'none',
            color: activeSubTab === 'overview' ? 'var(--text-primary)' : 'var(--text-secondary)',
            padding: '0.5rem 1rem',
            fontSize: '0.88rem'
          }}
        >
          <BarChart3 size={15} />
          Portfolio
        </button>

        <button
          id="host-tab-bookings"
          onClick={() => setActiveSubTab('bookings')}
          className="btn"
          style={{
            flex: 1,
            borderRadius: '8px',
            background: activeSubTab === 'bookings' ? 'var(--bg-tertiary)' : 'none',
            color: activeSubTab === 'bookings' ? 'var(--text-primary)' : 'var(--text-secondary)',
            padding: '0.5rem 1rem',
            fontSize: '0.88rem'
          }}
        >
          <ClipboardList size={15} />
          Bookings ({hostBookings.filter(b => b.status === 'pending').length})
        </button>

        <button
          id="host-tab-create"
          onClick={() => setActiveSubTab('create')}
          className="btn"
          style={{
            flex: 1,
            borderRadius: '8px',
            background: activeSubTab === 'create' ? 'var(--bg-tertiary)' : 'none',
            color: activeSubTab === 'create' ? 'var(--text-primary)' : 'var(--text-secondary)',
            padding: '0.5rem 1rem',
            fontSize: '0.88rem'
          }}
        >
          <PlusCircle size={15} />
          Publish Stay
        </button>
      </div>
      {activeSubTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Stats Cards Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Total Earnings</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0.3rem 0', display: 'flex', alignItems: 'center' }}>
                <DollarSign size={20} style={{ color: 'var(--accent)' }} />
                <span>4,820</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>+12% from last month</span>
            </div>

            <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Average Occupancy</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0.3rem 0', display: 'flex', alignItems: 'center' }}>
                <span>84.2</span>
                <Percent size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Top 5% in your area</span>
            </div>

            <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Active Listings</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0.3rem 0' }}>
                {listings.filter(l => l.host.name.includes('You')).length + 2}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>1 draft pending approval</span>
            </div>
          </div>

          {/* Active Owned Listings Table */}
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Your Managed Listings
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {listings.filter(l => l.host.name.includes('You')).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  background: 'var(--bg-secondary)',
                  border: '1px dashed var(--border-hover)',
                  borderRadius: '16px',
                  color: 'var(--text-secondary)'
                }}>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                    You haven't self-published any listings yet. Tap the button above to publish your first rental!
                  </p>
                  <button onClick={() => setActiveSubTab('create')} className="btn btn-secondary" style={{ borderRadius: '8px' }}>
                    Create First Listing
                  </button>
                </div>
              ) : (
                listings.filter(l => l.host.name.includes('You')).map((lst) => (
                  <div
                    key={lst.id}
                    className="glass-panel"
                    style={{
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '60px', height: '45px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={lst.images[0]} alt={lst.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: 600 }}>{lst.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lst.location} • ${lst.price}/night</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="accent-badge" style={{ fontSize: '0.72rem' }}>{lst.category}</span>
                      <button
                        onClick={() => onDeleteListing(lst.id)}
                        className="btn"
                        style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          color: '#ef4444',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.78rem'
                        }}
                      >
                        Remove Listing
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ACTIVE BOOKINGS CONTROL */}
      {activeSubTab === 'bookings' && (
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
            Reservation Requests
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {hostBookings.map((b) => (
              <div
                key={b.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '1.05rem' }}>{b.guestName}</strong>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '100px',
                      fontWeight: 600,
                      background: b.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : b.status === 'declined' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: b.status === 'approved' ? '#10b981' : b.status === 'declined' ? '#ef4444' : '#f59e0b'
                    }}>
                      {b.status.toUpperCase()}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Requesting: <strong>{b.listingTitle}</strong>
                  </span>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>
                    Stay Dates: {b.checkIn} to {b.checkOut} • Estimated payout: <strong>${b.amount}</strong>
                  </div>
                </div>

                {b.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleBookingAction(b.id, 'approve')}
                      className="btn btn-primary"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '8px'
                      }}
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleBookingAction(b.id, 'decline')}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '8px'
                      }}
                    >
                      <X size={14} />
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CREATE LISTING FORM */}
      {activeSubTab === 'create' && (
        <form onSubmit={handleAddSubmit} className="glass-panel" style={{
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            Publish a New Stay
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1.25rem'
          }} className="form-grid-columns">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Listing Title *</label>
              <input
                id="host-input-title"
                type="text"
                placeholder="e.g. Modern Glass Dome with Aurora Views"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category *</label>
              <select
                id="host-input-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="Cabin">Cabin</option>
                <option value="Villa">Villa</option>
                <option value="Loft">Loft</option>
                <option value="Dome">Dome</option>
                <option value="Heritage">Heritage</option>
              </select>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem'
          }} className="form-grid-columns">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Location *</label>
              <input
                id="host-input-location"
                type="text"
                placeholder="e.g. Tromso, Norway"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Price per Night ($) *</label>
              <input
                id="host-input-price"
                type="number"
                value={price}
                min={1}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Preset Image Selector (So they can pick high-quality images) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Select Cover Architecture Style
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { name: 'A-Frame Cabin', url: '/images/cabin.png' },
                { name: 'Infinity Villa', url: '/images/villa.png' },
                { name: 'Industrial Loft', url: '/images/loft.png' },
                { name: 'Bamboo Dome', url: '/images/dome.png' }
              ].map((preset) => (
                <div
                  key={preset.url}
                  onClick={() => setSelectedImg(preset.url)}
                  style={{
                    border: selectedImg === preset.url ? '2px solid var(--accent)' : '2px solid transparent',
                    borderRadius: '12px',
                    padding: '0.25rem',
                    cursor: 'pointer',
                    opacity: selectedImg === preset.url ? 1 : 0.6,
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    background: 'var(--bg-tertiary)'
                  }}
                >
                  <img src={preset.url} alt={preset.name} style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ fontSize: '0.65rem', marginTop: '0.2rem', fontWeight: 500 }}>{preset.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description *</label>
            <textarea
              id="host-input-description"
              placeholder="Provide a detailed, compelling description of your architecturally unique stays..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              style={{ minHeight: '100px', resize: 'vertical' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Amenities (comma separated)</label>
            <input
              id="host-input-amenities"
              type="text"
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem'
          }} className="form-grid-columns">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Max Guests</label>
              <input
                id="host-input-guests"
                type="number"
                value={maxGuests}
                min={1}
                onChange={(e) => setMaxGuests(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bedrooms</label>
              <input
                id="host-input-bedrooms"
                type="number"
                value={bedrooms}
                min={1}
                onChange={(e) => setBedrooms(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Bathrooms</label>
              <input
                id="host-input-bathrooms"
                type="number"
                value={bathrooms}
                min={1}
                onChange={(e) => setBathrooms(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <button
            id="host-submit-listing-btn"
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, marginTop: '1rem' }}
          >
            Publish Live Listing
          </button>
        </form>
      )}

      {/* Responsive adjustments */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 600px) {
          .form-grid-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
