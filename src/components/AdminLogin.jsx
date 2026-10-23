import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToStore }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Required credentials:
    // Username: admin (or mubashar)
    // Password: pasha804
    const validUsernames = ['admin', 'mubashar', 'pasha804'];
    const validPassword = 'pasha804';

    setIsLoading(true);

    setTimeout(() => {
      if (validUsernames.includes(trimmedUser) && trimmedPass === validPassword) {
        localStorage.setItem('mubar_admin_auth', 'authenticated');
        onLoginSuccess();
      } else {
        setError('Invalid username or password. Access denied.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#07070a',
      backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.08) 0%, rgba(7, 7, 10, 0.98) 75%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      position: 'relative'
    }}>
      {/* Background Decorative Rings */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '560px',
        height: '560px',
        borderRadius: '50%',
        border: '1px solid rgba(212, 175, 55, 0.05)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '740px',
        height: '740px',
        borderRadius: '50%',
        border: '1px solid rgba(212, 175, 55, 0.03)',
        pointerEvents: 'none'
      }} />

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '430px',
        backgroundColor: 'rgba(16, 16, 22, 0.92)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '18px',
        padding: '36px 30px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.12)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Top Header & Brand Crest */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
            <img 
              src="/images/branding/mubar_logo.png" 
              alt="MUBAR" 
              style={{
                width: '74px',
                height: '74px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.45))'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              background: '#D4AF37',
              color: '#07070a',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
            }}>
              <ShieldCheck size={14} strokeWidth={2.5} />
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            color: '#F5F5F7',
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '2.5px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase'
          }}>
            MUBAR
          </h1>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '20px',
            padding: '3px 12px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#F3E5AB',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            <KeyRound size={12} color="#D4AF37" />
            <span>Founder Portal Access</span>
          </div>
          <p style={{
            color: '#8E8E93',
            fontSize: '0.82rem',
            margin: '10px 0 0 0',
            lineHeight: 1.4
          }}>
            Private Management Portal for Store Owner
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '10px',
            padding: '11px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#FCA5A5',
            fontSize: '0.83rem',
            fontWeight: 500
          }}>
            <AlertCircle size={17} style={{ flexShrink: 0, color: '#EF4444' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Username Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.76rem',
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '7px'
            }}>
              Username
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                color: '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. admin"
                autoFocus
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1.2px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#D4AF37';
                  e.target.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.76rem',
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '7px'
            }}>
              Password
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                color: '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter founder password"
                required
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1.2px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#D4AF37';
                  e.target.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#8E8E93',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '8px',
              padding: '13px 20px',
              background: 'linear-gradient(135deg, #E5C378 0%, #D4AF37 50%, #B8860B 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#07070a',
              fontSize: '0.92rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.75 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.45)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.35)';
            }}
          >
            <ShieldCheck size={18} />
            <span>{isLoading ? 'Verifying Credentials...' : 'Unlock Admin Console'}</span>
          </button>
        </form>

        {/* Back to Client Storefront Link */}
        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <button
            onClick={onBackToStore}
            style={{
              background: 'none',
              border: 'none',
              color: '#8E8E93',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F3E5AB'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8E8E93'}
          >
            <ArrowLeft size={15} />
            <span>Return to Public Storefront</span>
          </button>
        </div>

        {/* Subtle security notice */}
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.25)',
          letterSpacing: '0.3px'
        }}>
          🔒 Secure 256-Bit Authenticated Console • MUBAR Pakistan
        </div>

      </div>
    </div>
  );
}
