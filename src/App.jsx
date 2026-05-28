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
    
    const needsReset = !parsed || parsed.length < listingsData.length || 
      parsed.some((lst, idx) => {
        const fresh = listingsData[idx];
        return !fresh || JSON.stringify(lst.images) !== JSON.stringify(fresh.images) || lst.video !== fresh.video;
      });

    if (needsReset) {
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
                  style={{ 
                    borderRadius: '20px', 
                    padding: '0.4rem 1.2rem', 
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '36px'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: collectionFilter.length === 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                  </div>
                  <span>All Collections</span>
                </button>
                {['Cabin', 'Villa', 'Loft', 'Dome', 'Heritage'].map(cat => {
                  const isActive = collectionFilter.includes(cat);
                  const imageMap = {
                    Cabin: '/images/cabin/cabin_1.jpg',
                    Villa: '/images/villa/villa_1.jpg',
                    Loft: '/images/loft/loft_1.jpg',
                    Dome: '/images/dome/dome_1.jpg',
                    Heritage: '/images/heritage/heritage_1.jpg'
                  };
                  const labelMap = {
                    Cabin: 'Cabins',
                    Villa: 'Villas',
                    Loft: 'Lofts',
                    Dome: 'Domes',
                    Heritage: 'Heritages'
                  };
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
                      style={{ 
                        borderRadius: '20px', 
                        padding: '0.4rem 1.2rem', 
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        height: '36px'
                      }}
                    >
                      <img 
                        src={imageMap[cat]} 
                        alt={cat}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          objectFit: 'cover',
                          border: isActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid var(--border-color)'
                        }}
                      />
                      <span>{labelMap[cat]}</span>
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
        marginTop: 'auto'
      }}>
        {/* Main footer grid */}
        <div className="container" style={{ padding: '3.5rem 2rem 2.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}>
            {/* Brand Column */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🏠</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  VelaStays
                </span>
              </div>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '240px', margin: '0 0 1.25rem' }}>
                Boutique luxury homestays curated by architectural typology — from geodesic domes to Tuscan heritage estates.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[
                  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { label: 'Pinterest', path: 'M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' }
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} title={s.label} style={{
                    width: '34px', height: '34px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '1.1rem' }}>
                Explore
              </h4>
              {[['All Stays', 'explore'], ['Cabins', 'explore'], ['Villas', 'explore'], ['Lofts', 'explore'], ['Domes', 'explore'], ['Heritage', 'explore']].map(([label]) => (
                <div key={label} style={{ marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.18s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{label}</span>
                </div>
              ))}
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '1.1rem' }}>
                Company
              </h4>
              {['About Us', 'Careers', 'Press', 'Blog', 'Host Guarantee', 'Sustainability'].map(label => (
                <div key={label} style={{ marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.18s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{label}</span>
                </div>
              ))}
            </div>

            {/* Support Column */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '1.1rem' }}>
                Support
              </h4>
              {['Help Center', 'Cancellation Policy', 'Trust & Safety', 'Accessibility', 'Contact Us'].map(label => (
                <div key={label} style={{ marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.18s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{label}</span>
                </div>
              ))}
            </div>

            {/* Newsletter Column */}
            <div style={{ gridColumn: 'span 1' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '1.1rem' }}>
                Stay Inspired
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Get curated stays and travel inspiration delivered weekly.
              </p>
              <div style={{ display: 'flex', gap: '0', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1, padding: '0.6rem 0.9rem',
                    background: 'var(--bg-primary)',
                    border: 'none', outline: 'none',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    minWidth: 0
                  }}
                />
                <button style={{
                  padding: '0.6rem 1rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.18s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-tertiary)'
          }}>
            <span>© {new Date().getFullYear()} VelaStays, Inc. · All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(label => (
                <span key={label} style={{ cursor: 'pointer', transition: 'color 0.18s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                >{label}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── MOBILE BOTTOM NAV BAR (visible only on small screens) ─── */}
      <nav className="mobile-bottom-nav">
        {[
          { id: 'explore',     label: 'Explore',     icon: (active) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
              <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          )},
          { id: 'collections', label: 'Collections',  icon: (active) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          )},
          { id: 'saved',       label: 'Saved',        icon: (active) => (
            <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )},
          { id: 'host',        label: 'Host',          icon: (active) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          )},
          { id: 'profile',     label: 'Profile',       icon: (active) => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          )}
        ].map(({ id, label, icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => changeTab(id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="mobile-nav-icon">{icon(isActive)}</span>
              <span className="mobile-nav-label">{label}</span>
            </button>
          );
        })}
      </nav>

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
