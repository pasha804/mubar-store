import React, { useState } from 'react';
import { ShoppingBag, Search, Database, Shield, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, onScrollTo, onLogoClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      backgroundColor: 'rgba(7, 7, 9, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '10px 16px'
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
          onClick={() => {
            if (onLogoClick) onLogoClick();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img 
            src="/images/branding/mubar_logo.jpg" 
            alt="MUBAR Crest" 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1.5px solid #D4AF37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <div>
            <div className="font-cinzel gold-text" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.65rem)', fontWeight: 800, letterSpacing: '3px', lineHeight: 1.1 }}>
              MUBAR
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '1.5px', color: '#8E8E93', textTransform: 'uppercase' }}>
              Haute Horlogerie • Lahore
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ alignItems: 'center', gap: '28px' }} className="desktop-nav">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Currency Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '5px 8px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            color: '#F3E5AB',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>🇵🇰 PKR</span>
          </div>

          {/* Shopping Bag Button */}
          <button 
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #1c1c24 0%, #0d0d12 100%)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#fff',
              width: '40px',
              height: '40px',
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

          {/* Mobile hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="mobile-menu-btn"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              color: '#F3E5AB', 
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          padding: '16px 8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          marginTop: '10px',
          animation: 'slideDown 0.25s ease-out'
        }}>
          <button 
            onClick={() => { onScrollTo('catalog'); setMobileMenuOpen(false); }} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.06)', 
              color: '#F5E8BA', 
              textAlign: 'left', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              padding: '12px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ⌚ Explore 5 Timepieces (In Stock)
          </button>
          
          <button 
            onClick={() => { onScrollTo('trust-standard'); setMobileMenuOpen(false); }} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.06)', 
              color: '#2ECC71', 
              textAlign: 'left', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              padding: '12px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🛡️ 100% Open Parcel Policy (Darwaza Pe Check)
          </button>
          
          <button 
            onClick={() => { onScrollTo('reviews'); setMobileMenuOpen(false); }} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.06)', 
              color: '#ddd', 
              textAlign: 'left', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              padding: '12px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ⭐ Customer Reviews (Lahore, Karachi, Isb)
          </button>
          
          <button 
            onClick={() => { onScrollTo('founders'); setMobileMenuOpen(false); }} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.06)', 
              color: '#aaa', 
              textAlign: 'left', 
              fontSize: '0.95rem', 
              padding: '12px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🏛️ About Founder Muhammad Mubashar
          </button>
        </div>
      )}
    </nav>
  );
}
