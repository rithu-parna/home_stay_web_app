// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Sun, Moon, Search, Heart, Compass, LayoutDashboard, User, Menu, X, Layers, ChevronDown } from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  savedCount,
  onOpenProfile,
  isLoggedIn,
  user,
  accentTheme = 'rose',
  setAccentTheme
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const palettes = [
    { id: 'orange', color: '#e07a5f', name: 'Classic Orange' },
    { id: 'rose', color: '#f43f5e', name: 'Rose Orchid' },
    { id: 'sunset', color: '#f59e0b', name: 'Sunset Amber' },
    { id: 'emerald', color: '#10b981', name: 'Emerald Gold' },
    { id: 'ocean', color: '#06b6d4', name: 'Ocean Breeze' }
  ];
  const activePal = palettes.find(p => p.id === accentTheme) || palettes[0];

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0',
      transition: 'background var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 14H6V28H13V20H19V28H26V14H30L16 2Z" fill="url(#logoGrad)" />
            <path d="M16 6L24 13V26H21V18H11V26H8V13L16 6Z" fill="#fff" fillOpacity="0.2" />
            <defs>
              <linearGradient id="logoGrad" x1="2" y1="15" x2="30" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--logo-color-1)" />
                <stop offset="1" stopColor="var(--logo-color-2)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text" style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: 'var(--font-sans)',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>VelaStays</span>
        </div>

        {/* Global Search Bar (Only shown on Explore tab) */}
        {activeTab === 'explore' && (
          <div className="navbar-search-container" style={{
            position: 'relative',
            flex: '0 1 400px',
            display: 'block'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
              pointerEvents: 'none'
            }} />
            <input 
              id="global-search-input"
              type="text" 
              placeholder="Search by destination (e.g. Bali, France...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field navbar-search-input"
              style={{
                paddingLeft: '2.8rem',
                borderRadius: '50px',
                height: '42px',
                fontSize: '0.88rem'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexShrink: 0,
          whiteSpace: 'nowrap'
        }} className="desktop-only">
          {/* Advanced Pill Segmented Navigation Dock */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(var(--accent-rgb), 0.04)',
            border: '1px solid var(--border-color)',
            padding: '4px',
            borderRadius: '24px',
            gap: '2px',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}>
            <button 
              id="nav-tab-explore"
              onClick={() => setActiveTab('explore')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                borderRadius: '20px',
                border: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'explore' ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === 'explore' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'explore' ? '0 2px 8px rgba(var(--accent-rgb), 0.3)' : 'none'
              }}
            >
              <Compass size={15} />
              <span className="nav-item-text">Explore</span>
            </button>

            <button 
              id="nav-tab-collections"
              onClick={() => setActiveTab('collections')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                borderRadius: '20px',
                border: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'collections' ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === 'collections' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'collections' ? '0 2px 8px rgba(var(--accent-rgb), 0.3)' : 'none'
              }}
            >
              <Layers size={15} />
              <span className="nav-item-text">Collections</span>
            </button>

            <button 
              id="nav-tab-saved"
              onClick={() => setActiveTab('saved')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                borderRadius: '20px',
                border: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saved' ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === 'saved' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'saved' ? '0 2px 8px rgba(var(--accent-rgb), 0.3)' : 'none'
              }}
            >
              <Heart size={15} fill={activeTab === 'saved' ? '#fff' : 'none'} />
              <span className="nav-item-text">Saved</span>
              {savedCount > 0 && (
                <span style={{
                  background: activeTab === 'saved' ? '#fff' : 'var(--accent)',
                  color: activeTab === 'saved' ? 'var(--accent)' : '#fff',
                  borderRadius: '50%',
                  minWidth: '18px',
                  height: '18px',
                  fontSize: '0.72rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  marginLeft: '2px'
                }}>
                  {savedCount}
                </span>
              )}
            </button>

            <button 
              id="nav-tab-host"
              onClick={() => setActiveTab('host')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                borderRadius: '20px',
                border: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'host' ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === 'host' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'host' ? '0 2px 8px rgba(var(--accent-rgb), 0.3)' : 'none'
              }}
            >
              <LayoutDashboard size={15} />
              <span className="nav-item-text">Host Mode</span>
            </button>
          </div>

          <div style={{
            width: '1px',
            height: '24px',
            background: 'var(--border-color)'
          }} />

          {/* Accent Palette Dropdown Customizer */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                borderColor: 'var(--border-color)',
                background: 'var(--bg-glass)',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activePal.color }} />
              <span>{activePal.name}</span>
              <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {dropdownOpen && (
              <>
                {/* Click outside overlay */}
                <div 
                  onClick={() => setDropdownOpen(false)} 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 98,
                    background: 'transparent'
                  }}
                />
                
                {/* Dropdown Container */}
                <div 
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    minWidth: '180px',
                    padding: '0.4rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    zIndex: 99,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {palettes.map(pal => (
                    <button
                      key={pal.id}
                      onClick={() => {
                        setAccentTheme(pal.id);
                        setDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.5rem 0.6rem',
                        borderRadius: '8px',
                        background: accentTheme === pal.id ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent',
                        border: 'none',
                        color: accentTheme === pal.id ? 'var(--accent)' : 'var(--text-main)',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'all 0.2s'
                      }}
                      className="theme-option-btn"
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: pal.color }} />
                      <span style={{ fontWeight: accentTheme === pal.id ? '600' : '400', flexGrow: 1 }}>{pal.name}</span>
                      {accentTheme === pal.id && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--accent)'
                        }} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="btn-icon"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
         

           {/* Profile Button / Log In */}
          {isLoggedIn ? (
            <button 
              id="user-profile-btn"
              onClick={onOpenProfile}
              className="btn-icon"
              style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}
              title={`${user?.name}'s Profile`}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : <User size={18} />}
            </button>
          ) : (
            <button 
              id="user-login-btn"
              onClick={onOpenProfile}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', borderRadius: '20px' }}
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Actions (Menu Toggle) */}
        <div style={{ display: 'none', gap: '0.8rem', alignItems: 'center' }} className="mobile-only-flex">
          <button onClick={toggleTheme} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu — only theme & profile (nav is in bottom bar) */}
      {mobileMenuOpen && (
        <div className="glass-panel anim-slide-down" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1.2rem 1.5rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
          zIndex: 99
        }}>

          {/* Profile / Auth row */}
          <button 
            id="mobile-nav-profile"
            onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              background: 'rgba(var(--accent-rgb), 0.05)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              flexShrink: 0
            }}>
              {isLoggedIn && user?.name ? user.name.slice(0, 2).toUpperCase() : <User size={16} />}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {isLoggedIn ? (user?.name || 'My Profile') : 'Log In / Sign Up'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                {isLoggedIn ? (user?.email || 'Manage your account') : 'Access exclusive features'}
              </div>
            </div>
          </button>

          {/* Theme Customizer */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}>
            <span style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              paddingLeft: '0.2rem'
            }}>
              Accent Theme
            </span>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {palettes.map(pal => (
                <button
                  key={pal.id}
                  onClick={() => setAccentTheme(pal.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '20px',
                    border: '1.5px solid',
                    borderColor: accentTheme === pal.id ? pal.color : 'var(--border-color)',
                    background: accentTheme === pal.id ? `${pal.color}18` : 'transparent',
                    color: accentTheme === pal.id ? pal.color : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: accentTheme === pal.id ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: pal.color,
                    boxShadow: accentTheme === pal.id ? `0 0 6px ${pal.color}` : 'none'
                  }} />
                  {pal.name.split(' ').pop()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Injecting CSS Media Queries for Responsive Nav directly */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-item-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .theme-option-btn:hover {
          background: rgba(var(--accent-rgb), 0.08) !important;
        }
        @media (max-width: 1250px) and (min-width: 1051px) {
          .nav-item-text {
            display: none !important;
          }
          .logo-text {
            display: none !important;
          }
          .navbar-search-container {
            flex: 0 1 250px !important;
          }
        }
        @media (max-width: 1050px) {
          .desktop-only { display: none !important; }
          .mobile-only-flex { display: flex !important; }
        }
        @media (max-width: 650px) {
          .logo-text {
            display: none !important;
          }
          .navbar-search-container {
            flex: 1 !important;
            max-width: 250px !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-search-input::placeholder {
            color: transparent !important;
          }
          .navbar-search-container {
            max-width: 160px !important;
          }
        }
        @media (max-width: 360px) {
          .navbar-search-container {
            display: none !important;
          }
        }
      `}} />
    </nav>
  );
}
