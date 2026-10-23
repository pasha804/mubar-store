import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, MessageCircle, Sparkles } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';
import { PRODUCTS } from '../data/products';

export default function Hero({ onExploreClick, onUnboxingClick, onQuickBuyFlagship, onSelectFlagship }) {
  // Flagship featured watch is Yacht-Master or MEIBO
  const featuredProduct = PRODUCTS.find(p => p.id === 'mubar-yachtmaster-oysterflex') || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(featuredProduct.images[0]);

  const heroShowcaseImages = [
    {
      url: featuredProduct.images[0],
      title: "18K Rose Gold Edition",
      subtitle: "Matte Ceramic Bezel & High-Density Elastomer Strap"
    },
    {
      url: featuredProduct.images[1] || featuredProduct.images[0],
      title: "Platinum Steel Edition",
      subtitle: "Sunburst Rhodium Dial & Sapphire Crystal"
    },
    {
      url: "/images/products/mubar-apex-wheel-rim/angle-02.jpeg",
      title: "MEIBO 3D Wheel Rim",
      subtitle: "Kinetic Spinning Rotor & Brembo Racing Caliper"
    }
  ];

  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: 'var(--hero-bg, #111923)',
        color: 'var(--hero-text-primary, #FFFFFF)',
        borderBottom: '1px solid rgba(230, 226, 218, 0.12)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle radial studio illumination behind hero */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(182, 154, 99, 0.12) 0%, rgba(17, 25, 35, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(28px, 5vw, 60px) clamp(16px, 3.5vw, 32px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div className="hero-two-column">
          
          {/* ========================================================
              LEFT COLUMN: Editorial Brand Narrative & Purchasing Confidence
              ======================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--accent-gold, #B69A63)'
              }} />
              <span style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '2.5px',
                color: 'var(--accent-gold, #B69A63)',
                textTransform: 'uppercase'
              }}>
                MUBAR WATCH COLLECTION
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 
              className="font-playfair"
              style={{
                fontSize: 'clamp(2.1rem, 4.8vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
                letterSpacing: '-0.5px'
              }}
            >
              Time. Style. <br />
              <span style={{ 
                fontStyle: 'italic', 
                fontWeight: 400,
                color: 'var(--accent-gold, #B69A63)' 
              }}>
                Your Statement.
              </span>
            </h1>

            {/* Short Supporting Description */}
            <p style={{
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              lineHeight: 1.65,
              color: 'var(--hero-text-secondary, #D4D9DF)',
              margin: '0 0 24px 0',
              maxWidth: '520px'
            }}>
              Affordable-premium timepieces engineered for the modern Pakistani gentleman. Genuine stainless steel presence, scratch-resistant crystals, and honest direct-to-consumer pricing.
            </p>

            {/* Delivery & Open Parcel Trust Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(230, 226, 218, 0.15)',
              marginBottom: '28px',
              width: 'fit-content',
              maxWidth: '100%',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="var(--indicator-green, #237653)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Free Nationwide Delivery
                </span>
              </div>
              <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="var(--accent-gold, #B69A63)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF' }}>
                  100% Open Parcel Doorstep Check
                </span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '32px'
            }}>
              <button 
                onClick={onExploreClick}
                className="btn-gold"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.92rem',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 16px rgba(182, 154, 99, 0.35)'
                }}
              >
                <span>SHOP WATCHES</span>
                <ArrowRight size={17} />
              </button>

              <button 
                onClick={onUnboxingClick}
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-sm, 8px)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold, #B69A63)';
                  e.currentTarget.style.color = 'var(--accent-gold, #B69A63)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span>EXPLORE COLLECTION</span>
              </button>

              <a 
                href={getWatchWhatsAppUrl(featuredProduct)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-sm, 8px)',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#20BA5C'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25D366'}
                title="Chat with MUBAR WhatsApp concierge"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Bottom 3 Micro-Trust Points */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>Cash on Delivery</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--hero-text-secondary, #D4D9DF)' }}>Pay at Doorstep</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>Open Parcel</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--hero-text-secondary, #D4D9DF)' }}>Inspect Rider Front</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>7-Day Exchange</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--hero-text-secondary, #D4D9DF)' }}>100% Replacement</div>
              </div>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: Real Studio Product Photography Centerpiece
              ======================================================== */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Visual Watch Stage Container */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                borderRadius: 'var(--radius-lg, 16px)',
                overflow: 'hidden',
                backgroundColor: '#0C131C',
                border: '1px solid rgba(182, 154, 99, 0.3)',
                boxShadow: '0 24px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(182, 154, 99, 0.12)'
              }}
            >
              {/* Top Editorial Ribbon */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                zIndex: 4,
                backgroundColor: 'rgba(17, 25, 35, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(182, 154, 99, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={13} color="var(--accent-gold, #B69A63)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                  FEATURED HOROLOGY
                </span>
              </div>

              {/* Price Tag Pill */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 4,
                backgroundColor: 'rgba(17, 25, 35, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.68rem', color: '#9E3438', textDecoration: 'line-through' }}>
                  Rs. {featuredProduct.originalPrice.toLocaleString()}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold, #B69A63)' }}>
                  Rs. {featuredProduct.salePrice.toLocaleString()}
                </div>
              </div>

              {/* Main Watch Photo */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(280px, 42vw, 420px)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#090E15'
                }}
                onClick={() => onSelectFlagship ? onSelectFlagship() : onExploreClick()}
                title="Click to view full watch details"
              >
                <img 
                  src={activeImage} 
                  alt={featuredProduct.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease, opacity 0.25s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Watch Details Footer Card with Switcher */}
              <div style={{
                padding: '14px 18px',
                backgroundColor: '#111923',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.3
                  }}>
                    {featuredProduct.title}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    color: 'var(--accent-gold, #B69A63)',
                    marginTop: '2px'
                  }}>
                    Ceramic Bezel • Oysterflex Strap • Sapphire Glass
                  </div>
                </div>

                {/* Thumbnails Angle Selector */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {heroShowcaseImages.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(item.url)}
                      title={item.title}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '4px',
                        border: activeImage === item.url ? '1.5px solid var(--accent-gold, #B69A63)' : '1px solid rgba(255, 255, 255, 0.2)',
                        padding: 0,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        backgroundColor: '#000',
                        opacity: activeImage === item.url ? 1 : 0.65,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
