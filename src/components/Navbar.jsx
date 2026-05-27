// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Sun, Moon, Search, Heart, Compass, LayoutDashboard, User, Menu, X } from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  savedCount,
  onOpenProfile
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <stop stopColor="hsl(14, 75%, 62%)" />
                <stop offset="1" stopColor="hsl(32, 85%, 62%)" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{
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
          <div style={{
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
              className="input-field"
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
          gap: '1.25rem'
        }} className="desktop-only">
          <button 
            id="nav-tab-explore"
            onClick={() => setActiveTab('explore')}
            className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem', borderRadius: '20px' }}
          >
            <Compass size={16} />
            Explore
          </button>
          
          <button 
            id="nav-tab-saved"
            onClick={() => setActiveTab('saved')}
            className={`btn ${activeTab === 'saved' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '0.55rem 1.2rem', 
              fontSize: '0.88rem', 
              borderRadius: '20px',
              position: 'relative'
            }}
          >
            <Heart size={16} fill={activeTab === 'saved' ? '#fff' : 'none'} />
            Saved Stays
            {savedCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {savedCount}
              </span>
            )}
          </button>

          <button 
            id="nav-tab-host"
            onClick={() => setActiveTab('host')}
            className={`btn ${activeTab === 'host' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem', borderRadius: '20px' }}
          >
            <LayoutDashboard size={16} />
            Host Mode
          </button>

          <div style={{
            width: '1px',
            height: '24px',
            background: 'var(--border-color)'
          }} />

          {/* Theme Toggle */}
          <button 
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="btn-icon"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile Button */}
          <button 
            id="user-profile-btn"
            onClick={onOpenProfile}
            className="btn-icon"
            style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none' }}
          >
            <User size={18} />
          </button>
        </div>

        {/* Mobile Actions (Menu Toggle) */}
        <div style={{ display: 'none', gap: '0.8rem' }} className="mobile-only-flex">
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel anim-slide-down" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
        }}>
          <button 
            id="mobile-nav-explore"
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <Compass size={18} />
            Explore Destinations
          </button>

          <button 
            id="mobile-nav-saved"
            onClick={() => { setActiveTab('saved'); setMobileMenuOpen(false); }}
            className={`btn ${activeTab === 'saved' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', position: 'relative' }}
          >
            <Heart size={18} fill={activeTab === 'saved' ? '#fff' : 'none'} />
            Saved Stays
            {savedCount > 0 && (
              <span style={{
                marginLeft: 'auto',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '100px',
                padding: '0.1rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {savedCount}
              </span>
            )}
          </button>

          <button 
            id="mobile-nav-host"
            onClick={() => { setActiveTab('host'); setMobileMenuOpen(false); }}
            className={`btn ${activeTab === 'host' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <LayoutDashboard size={18} />
            Host Dashboard
          </button>

          <button 
            id="mobile-nav-profile"
            onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <User size={18} />
            My Profile
          </button>
        </div>
      )}

      {/* Injecting CSS Media Queries for Responsive Nav directly */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
          .mobile-only-flex { display: flex !important; }
        }
      `}} />
    </nav>
  );
}
