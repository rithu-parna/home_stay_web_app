// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate network authentication call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        const userData = {
          name: isSignUp ? name : (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
          email: email
        };
        onLoginSuccess(userData);
        setSuccess(false);
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
      }, 1000);
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10, 10, 15, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1200,
      padding: '1rem'
    }} className="anim-fade auth-modal-overlay">
      
      {/* Modal Card */}
      <div className="glass-panel auth-modal-card" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '560px'
      }}>
        
        {/* Left Side: Rich Image Banner */}
        <div className="auth-img-side" style={{
          flex: '1',
          position: 'relative',
          background: `url('/images/cabin/cabin_1.jpg') center center / cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2.5rem 2rem',
          color: '#fff',
          overflow: 'hidden'
        }}>
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(10, 10, 15, 0.9) 0%, rgba(10, 10, 15, 0.2) 60%, rgba(10, 10, 15, 0.4) 100%)',
            zIndex: 1
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span className="accent-badge" style={{ background: 'var(--accent-gradient)', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '0.6rem', display: 'inline-block' }}>
              Bespoke Spaces
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-serif)', margin: '0 0 0.5rem 0', lineHeight: 1.2 }}>
              VelaStays Escapes
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.4 }}>
              Register or Log In to discover design-forward stays, coordinate bespoke itineraries, and book retreats around the globe.
            </p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="auth-form-side" style={{
          flex: '1',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'auto',
          background: 'var(--bg-primary)'
        }}>
          
          {/* Animated Background Gradients */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,122,95,0.1) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          {/* Header */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <span className="accent-badge mobile-badge" style={{ fontSize: '0.68rem', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'none' }}>
                Welcome to VelaStays
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.2rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="btn-icon" 
              style={{ position: 'absolute', top: 0, right: 0, width: '32px', height: '32px' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            display: 'flex', 
            background: 'var(--bg-secondary)', 
            padding: '0.25rem', 
            borderRadius: '12px', 
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: 'none',
                borderRadius: '9px',
                background: !isSignUp ? 'var(--bg-primary)' : 'transparent',
                color: !isSignUp ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Log In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); }}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: 'none',
                borderRadius: '9px',
                background: isSignUp ? 'var(--bg-primary)' : 'transparent',
                color: isSignUp ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Success View */}
          {success ? (
            <div style={{ 
              position: 'relative', 
              zIndex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: 'auto 0',
              padding: '2rem 0',
              textAlign: 'center' 
            }} className="anim-scale-in">
              <CheckCircle2 size={56} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Successfully Verified</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Preparing your bespoke travel experience...
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="auth-form" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, justifyContent: 'center' }}>
              {error && (
                <div style={{
                  background: 'rgba(var(--accent-rgb), 0.1)',
                  border: '1px solid rgba(var(--accent-rgb), 0.3)',
                  color: 'var(--accent)',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem'
                }}>
                  {error}
                </div>
              )}

              {isSignUp && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem', height: '40px', borderRadius: '12px' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem', height: '40px', borderRadius: '12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem', height: '40px', borderRadius: '12px' }}
                  />
                </div>
              </div>

              {/* Activities callout for premium signup */}
              {isSignUp && (
                <div style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-color)', 
                  padding: '0.6rem 0.8rem', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  marginTop: '0.2rem'
                }}>
                  <Sparkles size={15} style={{ color: 'var(--accent)', marginTop: '0.1rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    <strong>Premium:</strong> Save list, host mode, write reviews, and request Concierge services.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '42px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  marginTop: '0.4rem',
                  justifyContent: 'center'
                }}
              >
                {loading ? (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  isSignUp ? 'Sign Up' : 'Log In'
                )}
              </button>
            </form>
          )}

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 650px) {
          .auth-modal-overlay {
            padding: 1rem !important;
          }
          .auth-img-side {
            display: none !important;
          }
          .auth-modal-card {
            max-width: 450px !important;
            width: 100% !important;
            height: 80vh !important;
            max-height: 100vh !important;
            border-radius: 24px !important;
            flex-direction: column !important;
          }
          .auth-form-side {
            padding: 2.5rem 1.5rem !important;
            width: 100% !important;
            height: auto !important;
            flex: 1 !important;
          }
          .mobile-badge {
            display: inline-block !important;
          }
          .auth-form {
            flex-grow: 0 !important;
            justify-content: flex-start !important;
            margin-top: 2rem !important;
          }
        }
      `}} />
    </div>
  );
}
