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
import AuthModal from './components/AuthModal';
import { listingsData } from './data/listings';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vela-theme') || 'dark';
  });

  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState('explore');
  const [activeSubTab, setActiveSubTab] = useState('bookings');

  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('vela-is-logged-in') === 'true';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectAction, setAuthRedirectAction] = useState(null); // 'profile', 'saved', 'book', 'host'
  const [pendingBooking, setPendingBooking] = useState(null);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState([]);
  const [visibleExploreLimit, setVisibleExploreLimit] = useState(10);
  const [collectionFilter, setCollectionFilter] = useState([]);
  const [visibleCollectionLimit, setVisibleCollectionLimit] = useState(10);

  // Core Data States (Listings, Saves, Reservations)
  const [listings, setListings] = useState(() => {
    const cached = localStorage.getItem('vela-listings');
    const parsed = cached ? JSON.parse(cached) : null;
    if (!parsed || parsed.length < listingsData.length) {
      return listingsData;
    }
    return parsed;
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

  // Computed: filter listings for grid
  const filteredListings = listings.filter(l => {
    // Category match: if activeCategories is empty, match everything
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(l.category);
    
    // Search match
    const lowerSearch = searchQuery.toLowerCase().trim();
    const matchesSearch = !lowerSearch || 
      l.location.toLowerCase().includes(lowerSearch) || 
      l.title.toLowerCase().includes(lowerSearch);

    return matchesCategory && matchesSearch;
  });

  // Computed: saved stays listings
  const savedStays = listings.filter(l => savedIds.includes(l.id));

  // Sync theme changes with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vela-theme', theme);
  }, [theme]);

  // Infinite scroll states
  const [isExploreLoadingMore, setIsExploreLoadingMore] = useState(false);
  const [isCollectionsLoadingMore, setIsCollectionsLoadingMore] = useState(false);

  // Reset pagination on Explore page filter changes
  useEffect(() => {
    setVisibleExploreLimit(10);
  }, [activeCategories, searchQuery]);

  // Reset pagination on Collections page filter changes
  useEffect(() => {
    setVisibleCollectionLimit(10);
  }, [collectionFilter]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      // Explore page infinite scroll
      if (activeTab === 'explore' && filteredListings.length > visibleExploreLimit && !isExploreLoadingMore) {
        const threshold = 150; // px from bottom
        const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
        if (isNearBottom) {
          setIsExploreLoadingMore(true);
          setTimeout(() => {
            setVisibleExploreLimit(prev => prev + 10);
            setIsExploreLoadingMore(false);
          }, 1000); // 1s simulated fetch
        }
      }

      // Collections page infinite scroll
      if (activeTab === 'collections' && !isCollectionsLoadingMore) {
        const categoriesToRender = ['Cabin', 'Villa', 'Loft', 'Dome', 'Heritage'].filter(cat => 
          collectionFilter.length === 0 || collectionFilter.includes(cat)
        );
        const totalMatchingStays = listings.filter(l => categoriesToRender.includes(l.category)).length;

        if (totalMatchingStays > visibleCollectionLimit) {
          const threshold = 150;
          const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
          if (isNearBottom) {
            setIsCollectionsLoadingMore(true);
            setTimeout(() => {
              setVisibleCollectionLimit(prev => prev + 10);
              setIsCollectionsLoadingMore(false);
            }, 1000); // 1s simulated fetch
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, filteredListings.length, visibleExploreLimit, isExploreLoadingMore, listings, visibleCollectionLimit, collectionFilter, isCollectionsLoadingMore]);

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
    if (!isLoggedIn) {
      setAuthRedirectAction('saved');
      setShowAuthModal(true);
      return;
    }
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

  // Guarded Tab Switcher
  const changeTab = (tab) => {
    if ((tab === 'saved' || tab === 'host' || tab === 'profile') && !isLoggedIn) {
      setAuthRedirectAction(tab);
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
  };

  // Login Success Callback
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('vela-is-logged-in', 'true');
    localStorage.setItem('vela-user', JSON.stringify(userData));
    setShowAuthModal(false);

    if (authRedirectAction === 'profile') {
      setActiveTab('profile');
      setActiveSubTab('bookings');
    } else if (authRedirectAction === 'saved') {
      setActiveTab('saved');
    } else if (authRedirectAction === 'host') {
      setActiveTab('host');
    } else if (authRedirectAction === 'book' && pendingBooking) {
      // Execute the pending reservation
      const newReservation = {
        id: `res_${Date.now()}`,
        listing: activeListing,
        ...pendingBooking
      };
      setReservations(prev => [newReservation, ...prev]);
      setActiveReservation(newReservation);
      setActiveListing(null);
      setPendingBooking(null);
    }
    setAuthRedirectAction(null);
  };

  // Logout Callback
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: 'Alex Mercer', email: 'alex.mercer@velastays.com' });
    localStorage.removeItem('vela-is-logged-in');
    localStorage.removeItem('vela-user');
    setActiveTab('explore'); // Reset to public explore page
  };

  // Book listing process (guarded by auth)
  const handleReserve = (bookingSummary) => {
    if (!isLoggedIn) {
      setPendingBooking(bookingSummary);
      setAuthRedirectAction('book');
      setShowAuthModal(true);
      return;
    }

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



  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Dynamic Navigation Header */}
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={changeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedCount={savedIds.length}
        onOpenProfile={() => { changeTab('profile'); setActiveSubTab('bookings'); }}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      {/* Main Page Panel Coordinator */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'explore' && (
          <div className="anim-fade">
            {/* Jumbotron and Category Selector */}
            <Hero activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
            
            {/* Trending Escapes Section */}
            <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    Trending Escapes
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>
                    Most popular design marvels highly rated by architectural explorers.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('collections')}
                  className="btn btn-secondary"
                  style={{
                    borderRadius: '12px',
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  View All Collections →
                </button>
              </div>

              {/* Horizontal Scroll Row for Trending Stays */}
              <div className="custom-scrollbar" style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                scrollSnapType: 'x mandatory'
              }}>
                {listings.filter(l => l.isTrending).map(listing => (
                  <div key={listing.id} style={{ minWidth: '310px', maxWidth: '310px', scrollSnapAlign: 'start' }}>
                    <ListingCard 
                      listing={listing}
                      isSaved={savedIds.includes(listing.id)}
                      onToggleSave={handleToggleSave}
                      onClick={() => setActiveListing(listing)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Grid display of available stays */}
            <div className="container" style={{ paddingBottom: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                {activeCategories.length === 0 
                  ? 'All Architectural Escapes' 
                  : `${activeCategories.join(' & ')} Collection`}
              </h2>

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
                <>
                  <div className="listings-grid">
                    {filteredListings.slice(0, visibleExploreLimit).map(listing => (
                      <ListingCard 
                        key={listing.id}
                        listing={listing}
                        isSaved={savedIds.includes(listing.id)}
                        onToggleSave={handleToggleSave}
                        onClick={() => setActiveListing(listing)}
                      />
                    ))}
                    {isExploreLoadingMore && (
                      <>
                        <div className="glass-panel" style={{ height: '360px', opacity: 0.5, borderRadius: '16px', overflow: 'hidden', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div style={{ height: '180px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ height: '16px', width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ height: '12px', width: '40%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                        </div>
                        <div className="glass-panel" style={{ height: '360px', opacity: 0.5, borderRadius: '16px', overflow: 'hidden', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div style={{ height: '180px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ height: '16px', width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ height: '12px', width: '40%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', animation: 'auth-pulse 1.5s infinite ease-in-out' }} />
                        </div>
                      </>
                    )}
                  </div>

                  {isExploreLoadingMore && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', marginTop: '2.5rem' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        animation: 'auth-pulse 1s infinite ease-in-out'
                      }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        Loading more bespoke architectural stays...
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Collections Tab Page */}
        {activeTab === 'collections' && (
          <div className="container anim-fade" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                Design Collections
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', marginBottom: '2rem' }}>
                Explore boutique stays curated by architectural typology. Choose a category collection to view details.
              </p>

              {/* Collections Category Filter Bar */}
              <div style={{ 
                display: 'flex', 
                gap: '0.8rem', 
                overflowX: 'auto', 
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-color)'
              }} className="custom-scrollbar">
                <button
                  onClick={() => setCollectionFilter([])}
                  className={`btn ${collectionFilter.length === 0 ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '20px', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                >
                  All Collections
                </button>
                {['Cabin', 'Villa', 'Loft', 'Dome', 'Heritage'].map(cat => {
                  const isActive = collectionFilter.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setCollectionFilter(prev => {
                          if (prev.includes(cat)) {
                            return prev.filter(c => c !== cat);
                          } else {
                            return [...prev, cat];
                          }
                        });
                      }}
                      className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ borderRadius: '20px', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                    >
                      {cat}s
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render each category as a dedicated horizontal collection */}
            {(() => {
              let renderedCount = 0;
              const categoriesToRender = ['Cabin', 'Villa', 'Loft', 'Dome', 'Heritage'].filter(cat => 
                collectionFilter.length === 0 || collectionFilter.includes(cat)
              );
              
              // Count total matching stays to see if we need a "Load More" button
              const totalMatchingStays = listings.filter(l => 
                categoriesToRender.includes(l.category)
              ).length;

              const elements = categoriesToRender.map(catName => {
                // If we have already reached the visible limit, skip rendering this collection group
                if (renderedCount >= visibleCollectionLimit) return null;

                const catStays = listings.filter(l => l.category === catName);
                if (catStays.length === 0) return null;

                // Slice stays for this category to not exceed the remaining visible limit
                const remainingLimit = visibleCollectionLimit - renderedCount;
                const displayedStays = catStays.slice(0, remainingLimit);
                renderedCount += displayedStays.length;

                return (
                  <div key={catName} style={{ marginBottom: '3.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '0.75rem',
                      marginBottom: '1.25rem'
                    }}>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: '600', margin: 0 }}>
                        {catName}s
                      </h3>
                      <span 
                        onClick={() => {
                          setActiveCategories([catName]);
                          setActiveTab('explore');
                        }}
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: 'var(--accent)',
                          cursor: 'pointer',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        Browse All {catName}s →
                      </span>
                    </div>

                    <div className="custom-scrollbar" style={{
                      display: 'flex',
                      gap: '1.5rem',
                      overflowX: 'auto',
                      paddingBottom: '1rem',
                      scrollSnapType: 'x mandatory'
                    }}>
                      {displayedStays.map(listing => (
                        <div key={listing.id} style={{ minWidth: '310px', maxWidth: '310px', scrollSnapAlign: 'start' }}>
                          <ListingCard 
                            listing={listing}
                            isSaved={savedIds.includes(listing.id)}
                            onToggleSave={handleToggleSave}
                            onClick={() => setActiveListing(listing)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });

              return (
                <>
                  {elements}
                  {isCollectionsLoadingMore && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', padding: '2rem 0' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        animation: 'auth-pulse 1s infinite ease-in-out'
                      }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        Loading more collections...
                      </span>
                    </div>
                  )}
                </>
              );
            })()}
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
            onLogout={handleLogout}
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

      {/* Advanced Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingBooking(null);
          setAuthRedirectAction(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes auth-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}} />
    </div>
  );
}
