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
          backgroundColor: '#172A3A', // Official Midnight Navy
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 2px 10px rgba(17, 25, 35, 0.15)'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Left: Mobile Hamburger / Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="mobile-menu-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#F7F5F0',
                cursor: 'pointer',
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <button
                type="button"
                onClick={() => onScrollTo && onScrollTo('catalog')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F7F5F0',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#F7F5F0'}
              >
                Shop All Watches
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Supercar Rim')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#D4D9DF'}
              >
                Sports Watches
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Motorsport')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#D4D9DF'}
              >
                Racing Collection
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Chronographs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#D4D9DF'}
              >
                Classic Collection
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Luxury Prestige')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#D4D9DF'}
              >
                Premium Collection
              </button>

              <button
                type="button"
                onClick={() => onScrollTo && onScrollTo('trust-standard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#B69A63'}
                onMouseLeave={e => e.target.style.color = '#D4D9DF'}
              >
                Open Parcel Trust
              </button>
            </nav>
          </div>

          {/* Center: MUBAR Official Logo & Wordmark */}
          <div
            onClick={() => {
              if (onLogoClick) onLogoClick();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            role="button"
            tabIndex={0}
            aria-label="MUBAR Home"
          >
            <img 
              src="/images/branding/mubar_logo.jpg" 
              alt="MUBAR" 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #B69A63',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <span 
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 1.55rem)',
                  fontWeight: 800,
                  letterSpacing: '2.5px',
                  color: '#FFFFFF',
                  lineHeight: 1,
                  display: 'block'
                }}
              >
                MUBAR
              </span>
              <span 
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '1.5px',
                  color: '#B69A63',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'block',
                  marginTop: '1px'
                }}
              >
                TIMEPIECES
              </span>
            </div>
          </div>

          {/* Right: Search & Shopping Bag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search watches"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#F7F5F0',
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#B69A63'}
              onMouseLeave={e => e.currentTarget.style.color = '#F7F5F0'}
            >
              <Search size={20} />
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = '#B69A63';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ShoppingBag size={20} color="#F7F5F0" />
              {cartCount > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#9E3438', // Deep Burgundy Sale/Notification
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================
          MOBILE SLIDE-IN HAMBURGER DRAWER
          ======================================================================== */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            backgroundColor: 'rgba(17, 25, 35, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              width: 'min(340px, 86vw)',
              height: '100%',
              backgroundColor: '#172A3A',
              color: '#F7F5F0',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Drawer Header */}
            <div 
              style={{
                padding: '20px 18px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src="/images/branding/mubar_logo.jpg" 
                  alt="MUBAR" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #B69A63' }}
                />
                <div>
                  <div style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '1.15rem' }}>MUBAR</div>
                  <div style={{ fontSize: '0.62rem', color: '#B69A63', letterSpacing: '1px', textTransform: 'uppercase' }}>TIMEPIECES PAKISTAN</div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links (Strict Requirement List) */}
            <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: '#B69A63', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, padding: '8px 10px 4px' }}>
                Collections
              </div>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onLogoClick ? onLogoClick() : window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F7F5F0',
                  textAlign: 'left',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Home</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onScrollTo && onScrollTo('catalog'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F7F5F0',
                  textAlign: 'left',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Shop All Watches</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Supercar Rim')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Sports Watches (3D Wheel Rim)</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Motorsport')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Racing Collection</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Chronographs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Classic Collection</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <button
                type="button"
                onClick={() => handleNavCategory('Luxury Prestige')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D4D9DF',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  padding: '11px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Premium Collection (Yacht & Divers)</span>
                <ChevronRight size={16} color="#737B84" />
              </button>

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '12px 0' }} />

              <div style={{ fontSize: '0.68rem', color: '#B69A63', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, padding: '4px 10px' }}>
                Customer Care & Trust
              </div>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onScrollTo && onScrollTo('trust-standard'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2ECC71',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldCheck size={16} />
                <span>100% Open Parcel Guarantee</span>
              </button>

              <a
                href={`https://wa.me/${FOUNDER_CONTACT.whatsapp}?text=Assalam-o-Alaikum%2C%20mujhe%20apne%20order%20ka%20status%20track%20karna%20hai.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#D4D9DF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Track Order (WhatsApp Dispatch)</span>
                <ChevronRight size={16} color="#737B84" />
              </a>

              <a
                href={`https://wa.me/${FOUNDER_CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#D4D9DF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={15} color="#25D366" />
                <span>Contact Us (+92 308 4453846)</span>
              </a>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenPolicy && onOpenPolicy('shipping'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9AA0A6',
                  textAlign: 'left',
                  fontSize: '0.84rem',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Shipping Policy (Free Delivery)
              </button>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenPolicy && onOpenPolicy('refund'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9AA0A6',
                  textAlign: 'left',
                  fontSize: '0.84rem',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Returns & Exchange Policy
              </button>
            </div>

            {/* Bottom Contact Pill */}
            <div 
              style={{
                padding: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#737B84' }}>Headquarters</div>
              <div style={{ fontSize: '0.82rem', color: '#D4D9DF', fontWeight: 600 }}>MUBAR • Lahore, Pakistan</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          SEARCH OVERLAY MODAL
          ======================================================================== */}
      {searchOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1600,
            backgroundColor: 'rgba(17, 25, 35, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: ' clamp(16px, 5vw, 40px) 16px'
          }}
          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
        >
          <div 
            style={{
              width: 'min(600px, 100%)',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              border: '1px solid #E6E2DA'
            }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search watches"
          >
            {/* Search Input Box */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 18px',
                borderBottom: '1px solid #E6E2DA',
                gap: '12px'
              }}
            >
              <Search size={20} color="#737B84" />
              <input 
                type="text"
                autoFocus
                placeholder="Search watches (e.g. Wheel Rim, Submariner, Chrono)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  color: '#252A30'
                }}
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#737B84',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Area */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px' }}>
              {searchQuery.trim() === '' ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#737B84', fontSize: '0.88rem' }}>
                  Type a watch title or style to find matching models.
                </div>
              ) : searchResults.length === 0 ? (
                <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                  <p style={{ color: '#252A30', fontWeight: 600, marginBottom: '6px' }}>No matching timepieces found</p>
                  <p style={{ color: '#737B84', fontSize: '0.84rem' }}>Try searching for "Rim", "Diver", "Chrono", or "Yacht".</p>
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
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#F7F5F0';
                        e.currentTarget.style.borderColor = '#E6E2DA';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <img 
                        src={prod.images[0]} 
                        alt={prod.title} 
                        style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E6E2DA' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#252A30', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prod.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#737B84' }}>
                          {prod.category} • <strong style={{ color: '#172A3A' }}>Rs. {prod.salePrice.toLocaleString()}</strong>
                        </div>
                      </div>
                      <ArrowRight size={16} color="#B69A63" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
