// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListingCard from './components/ListingCard';
import ListingDetail from './components/ListingDetail';
import BookingSuccessModal from './components/BookingSuccessModal';
import UserProfile from './components/UserProfile';
import HostDashboard from './components/HostDashboard';
import LocalConcierge from './components/LocalConcierge';
import { listingsData } from './data/listings';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vela-theme') || 'dark';
  });

  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState('explore');
  const [activeSubTab, setActiveSubTab] = useState('bookings');

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Core Data States (Listings, Saves, Reservations)
  const [listings, setListings] = useState(() => {
    const cached = localStorage.getItem('vela-listings');
    return cached ? JSON.parse(cached) : listingsData;
  });

  const [savedIds, setSavedIds] = useState(() => {
    const cached = localStorage.getItem('vela-saved-ids');
    return cached ? JSON.parse(cached) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const cached = localStorage.getItem('vela-reservations');
    return cached ? JSON.parse(cached) : [];
  });

  // User details
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('vela-user');
    return cached ? JSON.parse(cached) : { name: 'Alex Mercer', email: 'alex.mercer@velastays.com' };
  });

  // Active sheets / modals
  const [activeListing, setActiveListing] = useState(null);
  const [activeReservation, setActiveReservation] = useState(null);

  // Sync theme changes with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vela-theme', theme);
  }, [theme]);

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('vela-listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('vela-saved-ids', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('vela-reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('vela-user', JSON.stringify(user));
  }, [user]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleSave = (id) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  };

  // Add listing from Host panel
  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  // Delete listing from Host panel
  const handleDeleteListing = (id) => {
    setListings(prev => prev.filter(l => l.id !== id));
    // Clear details if deleted
    if (activeListing && activeListing.id === id) {
      setActiveListing(null);
    }
  };

  // Book listing process
  const handleReserve = (bookingSummary) => {
    const newReservation = {
      id: `res_${Date.now()}`,
      listing: activeListing,
      ...bookingSummary
    };
    
    // Add reservation
    setReservations(prev => [newReservation, ...prev]);
    // Save to show confirmation receipt modal
    setActiveReservation(newReservation);
    // Close detailed listing panel
    setActiveListing(null);
  };

  // Cancel reservation
  const handleCancelReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  // User Profile updater
  const handleUpdateUser = (updatedInfo) => {
    setUser(updatedInfo);
  };

  // Computed: filter listings for grid
  const filteredListings = listings.filter(l => {
    // Category match
    const matchesCategory = activeCategory === 'All' || l.category === activeCategory;
    
    // Search match
    const lowerSearch = searchQuery.toLowerCase().trim();
    const matchesSearch = !lowerSearch || 
      l.location.toLowerCase().includes(lowerSearch) || 
      l.title.toLowerCase().includes(lowerSearch);

    return matchesCategory && matchesSearch;
  });

  // Computed: saved stays listings
  const savedStays = listings.filter(l => savedIds.includes(l.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Dynamic Navigation Header */}
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedCount={savedIds.length}
        onOpenProfile={() => { setActiveTab('profile'); setActiveSubTab('bookings'); }}
      />

      {/* Main Page Panel Coordinator */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'explore' && (
          <div className="anim-fade">
            {/* Jumbotron and Category Selector */}
            <Hero activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            
            {/* Grid display of available stays */}
            <div className="container" style={{ paddingBottom: '5rem' }}>
              {filteredListings.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  marginTop: '1rem',
                  color: 'var(--text-secondary)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    No Architectural Stays Found
                  </h3>
                  <p style={{ fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto' }}>
                    We couldn't find any stays matching your query "{searchQuery}". Try selecting another category or check your spelling!
                  </p>
                </div>
              ) : (
                <div className="listings-grid">
                  {filteredListings.map(listing => (
                    <ListingCard 
                      key={listing.id}
                      listing={listing}
                      isSaved={savedIds.includes(listing.id)}
                      onToggleSave={handleToggleSave}
                      onClick={() => setActiveListing(listing)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div className="container anim-fade" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Saved Stays</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Your collection of architectural masterpieces, scenic forest cabins, and beach escapes.
            </p>
            
            {savedStays.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                color: 'var(--text-secondary)'
              }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  No Saved Stays Yet
                </h3>
                <p style={{ fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto' }}>
                  Tap the heart icons on stays as you browse the explore panel to build your dream bucket list here.
                </p>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="btn btn-primary"
                  style={{ marginTop: '1.5rem', borderRadius: '10px' }}
                >
                  Explore Stays
                </button>
              </div>
            ) : (
              <div className="listings-grid">
                {savedStays.map(listing => (
                  <ListingCard 
                    key={listing.id}
                    listing={listing}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                    onClick={() => setActiveListing(listing)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Host Mode */}
        {activeTab === 'host' && (
          <HostDashboard 
            listings={listings}
            onAddListing={handleAddListing}
            onDeleteListing={handleDeleteListing}
          />
        )}

        {/* User Profile / Dashboard */}
        {activeTab === 'profile' && (
          <UserProfile 
            user={user}
            updateUser={handleUpdateUser}
            reservations={reservations}
            cancelReservation={handleCancelReservation}
            savedStays={savedStays}
            onViewListing={(lst) => setActiveListing(lst)}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem 0',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-tertiary)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <strong>VelaStays</strong> • Boutique Luxury Homestays & Architectural Escapes.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Host Guarantee</span>
          </div>
        </div>
      </footer>

      {/* Full Sheet Detail Viewer */}
      {activeListing && (
        <ListingDetail 
          listing={activeListing}
          isSaved={savedIds.includes(activeListing.id)}
          onToggleSave={handleToggleSave}
          onClose={() => setActiveListing(null)}
          onReserve={handleReserve}
        />
      )}

      {/* Booking Receipt Success Modal */}
      {activeReservation && (
        <BookingSuccessModal 
          reservation={activeReservation}
          listing={activeReservation.listing}
          onClose={() => {
            setActiveReservation(null);
            // Switch tabs to profile so they see active ticket bookings
            setActiveTab('profile');
            setActiveSubTab('bookings');
          }}
        />
      )}

      {/* Floating AI Concierge Agent */}
      <LocalConcierge />
    </div>
  );
}
