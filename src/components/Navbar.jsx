import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, ShieldCheck, Phone, ChevronRight } from 'lucide-react';
import { PRODUCTS, FOUNDER_CONTACT } from '../data/products';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onScrollTo, 
  onLogoClick,
  onSelectCategory,
  onOpenPolicy,
  onNavigateToProduct
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when drawer or search is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, searchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavCategory = (categoryName) => {
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    if (onScrollTo) {
      onScrollTo('catalog');
    }
  };

  const handleSearchResultClick = (product) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (onNavigateToProduct) {
      onNavigateToProduct(product.id);
    } else if (onScrollTo) {
      onScrollTo('catalog');
    }
  };

  return (
    <>
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: '#FFFFFF', // Clean White per Section 7
          borderBottom: '1px solid var(--border-warm, #E6E2DA)',
          boxShadow: '0 1px 4px rgba(23, 42, 58, 0.04)'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Mobile Left: Hamburger Button */}
          <div className="mobile-only" style={{ display: 'none' }}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary, #252A30)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px'
              }}
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Brand Logo (Left on Desktop, Center on Mobile) */}
          <div 
            onClick={onLogoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title="MUBAR Home"
          >
            <img 
              src="/images/branding/mubar_logo.jpg" 
              alt="MUBAR" 
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid var(--accent-gold, #B69A63)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
              }}
            />
            <span 
              className="font-playfair"
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '2px',
                color: 'var(--brand-navy, #172A3A)',
                lineHeight: 1
              }}
            >
              MUBAR
            </span>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="desktop-only" aria-label="Main Navigation" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <button
              type="button"
              onClick={() => onScrollTo && onScrollTo('catalog')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary, #252A30)',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-gold, #B69A63)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-primary, #252A30)'}
            >
              Shop All Watches
            </button>

            <button
              type="button"
              onClick={() => onScrollTo && onScrollTo('catalog')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary, #252A30)',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-gold, #B69A63)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-primary, #252A30)'}
            >
              Collections
            </button>

            <button
              type="button"
              onClick={() => onScrollTo && onScrollTo('trust-benefits')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary, #252A30)',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-gold, #B69A63)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-primary, #252A30)'}
            >
              Delivery & Warranty
            </button>
          </nav>

          {/* Right Action Controls: Search & Bag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search watches"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary, #252A30)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle, #F0EEE8)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Search size={18} />
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm, 8px)',
                backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                color: 'var(--brand-navy, #172A3A)',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-gold-subtle, #F3EBDD)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle, #F0EEE8)'}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBag size={18} color="var(--brand-navy, #172A3A)" />
                {cartCount > 0 && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      right: '-8px',
                      backgroundColor: 'var(--brand-navy, #172A3A)',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="desktop-only" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ==============================================================================
          RESPONSIVE SLIDE-IN NAVIGATION DRAWER (Mobile)
          ============================================================================== */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(17, 25, 35, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              width: 'min(320px, 85vw)',
              height: '100%',
              backgroundColor: '#FFFFFF',
              boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-warm, #E6E2DA)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/images/branding/mubar_logo.jpg" alt="MUBAR" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                <span className="font-playfair" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)' }}>
                  MUBAR
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{ background: 'none', border: 'none', color: 'var(--text-primary, #252A30)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onScrollTo && onScrollTo('catalog'); }}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary, #252A30)', cursor: 'pointer', padding: '6px 0' }}
              >
                Shop All Watches
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Supercar Rim')}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.88rem', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px 0' }}
              >
                Supercar Rim Collection
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Luxury Prestige')}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.88rem', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px 0' }}
              >
                Luxury Prestige Edition
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Divers')}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.88rem', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px 0' }}
              >
                Maritime Diver Watches
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Chronographs')}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.88rem', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px 0' }}
              >
                Executive Chronographs
              </button>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onScrollTo && onScrollTo('trust-benefits'); }}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary, #252A30)', cursor: 'pointer', padding: '6px 0', marginTop: '10px' }}
              >
                Delivery & Warranty Policies
              </button>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onScrollTo && onScrollTo('faq'); }}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary, #252A30)', cursor: 'pointer', padding: '6px 0' }}
              >
                FAQs
              </button>
            </div>

            {/* Drawer Bottom Contact */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-warm, #E6E2DA)', fontSize: '0.82rem', color: 'var(--text-secondary, #737B84)' }}>
              <div style={{ fontWeight: 700, color: 'var(--brand-navy, #172A3A)', marginBottom: '4px' }}>WhatsApp Concierge</div>
              <div>+92 308 4453846</div>
              <div style={{ marginTop: '4px', color: 'var(--indicator-green, #237653)', fontWeight: 600 }}>
                100% Open Parcel Doorstep Check
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==============================================================================
          LIVE SEARCH MODAL (Desktop & Mobile)
          ============================================================================== */}
      {searchOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            backgroundColor: 'rgba(17, 25, 35, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: ' clamp(16px, 5vw, 60px) 16px'
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-card, 12px)',
              border: '1px solid var(--border-card, #E6E2DA)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-warm, #E6E2DA)', gap: '10px' }}>
              <Search size={18} color="var(--text-secondary, #737B84)" />
              <input
                type="text"
                autoFocus
                placeholder="Search watch name, dial, or style..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.94rem',
                  color: 'var(--text-primary, #252A30)',
                  backgroundColor: 'transparent'
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Suggestions & Results */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px' }}>
              {searchQuery.trim() === '' ? (
                <div style={{ padding: '16px', color: 'var(--text-secondary, #737B84)', fontSize: '0.84rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--brand-navy, #172A3A)', marginBottom: '8px' }}>Popular Searches:</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['MEIBO Wheel Rim', 'Yacht-Master', 'Diving Submariner', 'Executive Chrono'].map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSearchQuery(item)}
                        style={{
                          backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                          border: '1px solid var(--border-card, #E6E2DA)',
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '0.78rem',
                          color: 'var(--text-primary, #252A30)',
                          cursor: 'pointer'
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary, #737B84)', fontSize: '0.88rem' }}>
                  No timepieces found matching "{searchQuery}".
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSearchResultClick(prod)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle, #F0EEE8)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img src={prod.images[0]} alt={prod.title} style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prod.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--accent-gold, #B69A63)' }}>
                          {prod.category} · Rs. {prod.salePrice.toLocaleString()}
                        </div>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary, #737B84)" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Responsive Header Helper Styles */}
      <style>{`
        @media (max-width: 820px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </>
  );
}
