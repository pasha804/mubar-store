import React, { useState } from 'react';
import { ShoppingBag, Search, Database, Shield, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, onScrollTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      backgroundColor: 'rgba(7, 7, 9, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <img 
            src="/images/branding/mubar_logo.jpg" 
            alt="MUBAR Crest" 
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1.5px solid #D4AF37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div className="font-cinzel gold-text" style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '4px', lineHeight: 1.1 }}>
              MUBAR
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '2px', color: '#8E8E93', textTransform: 'uppercase' }}>
              Geneve • Haute Horlogerie
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <button 
            onClick={() => onScrollTo('catalog')}
            style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.5px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#ccc'}
          >
            Timepieces
          </button>
          
          <button 
            onClick={() => onScrollTo('trust-standard')}
            style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.5px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#ccc'}
          >
            Buyer Confidence
          </button>

          <button 
            onClick={() => onScrollTo('reviews')}
            style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.5px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#ccc'}
          >
            Customer Reviews
          </button>

          <button 
            onClick={() => onScrollTo('founders')}
            style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.5px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#ccc'}
          >
            About Founders
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Currency Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: '#F3E5AB',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span>🇵🇰 PKR (Rs.)</span>
          </div>

          {/* Shopping Bag Button */}
          <button 
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #1c1c24 0%, #0d0d12 100%)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#fff',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'}
          >
            <ShoppingBag size={18} color="#F3E5AB" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#E74C3C',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '12px'
        }}>
          <button onClick={() => { onScrollTo('catalog'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#ddd', textAlign: 'left', fontSize: '1rem', padding: '8px 0' }}>Timepieces</button>
          <button onClick={() => { onScrollTo('trust-standard'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#ddd', textAlign: 'left', fontSize: '1rem', padding: '8px 0' }}>Buyer Confidence</button>
          <button onClick={() => { onScrollTo('reviews'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#ddd', textAlign: 'left', fontSize: '1rem', padding: '8px 0' }}>Customer Reviews</button>
          <button onClick={() => { onScrollTo('founders'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#ddd', textAlign: 'left', fontSize: '1rem', padding: '8px 0' }}>About Founders</button>
        </div>
      )}
    </nav>
  );
}
