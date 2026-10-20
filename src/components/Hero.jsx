import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, Sparkles, Zap, Flame, Eye, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';
import { PRODUCTS } from '../data/products';

export default function Hero({ onExploreClick, onUnboxingClick, onQuickBuyFlagship, onSelectFlagship }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  const flagshipImages = [
    "/images/products/mubar-apex-wheel-rim/angle-01.jpeg",
    "/images/products/mubar-apex-wheel-rim/angle-02.jpeg",
    "/images/products/mubar-apex-wheel-rim/angle-03.jpeg",
    "/images/products/mubar-apex-wheel-rim/angle-04.jpeg"
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: 'clamp(32px, 5vw, 65px) clamp(14px, 3vw, 24px) clamp(45px, 6vw, 75px)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 15%, rgba(212, 175, 55, 0.12) 0%, rgba(7, 7, 9, 1) 75%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="hero-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Left Column: High-Converting Pakistani Value Proposition */}
        <div>
          {/* Top Urgency Pill */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 14px', 
            borderRadius: '30px', 
            background: 'rgba(231, 76, 60, 0.12)', 
            border: '1px solid rgba(231, 76, 60, 0.35)', 
            marginBottom: '18px',
            maxWidth: '100%'
          }}>
            <Flame size={15} color="#E74C3C" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(0.72rem, 2.2vw, 0.8rem)', color: '#FFA07A', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              PAKISTAN'S #1 VIRAL TIMEPIECES • UNDER RS. 2,500
            </span>
          </div>

          <h1 className="font-cinzel" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '18px', color: '#FFFFFF' }}>
            LOOK MILLION-DOLLAR. <br />
            <span className="gold-text">PAY ZERO REPUTATION TAX.</span>
          </h1>

          <p style={{ fontSize: 'clamp(0.92rem, 2vw, 1.02rem)', color: '#A0A0A8', lineHeight: 1.7, marginBottom: '24px', maxWidth: '580px' }}>
            Heavy stainless steel presence, scratch-resistant hardlex crystal, and authentic kinetic motion. Backed by our signature <strong style={{ color: '#F3E5AB' }}>100% Open Parcel Doorstep Check</strong> — rider ke samne parcel khol kar ghari check karein, tassali honay par cash dein!
          </p>

          {/* Pricing Highlight Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '12px',
            padding: '10px 16px',
            marginBottom: '28px',
            maxWidth: '100%'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase' }}>Starting From</span>
              <div className="font-cinzel" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F3E5AB', lineHeight: 1.1 }}>
                Rs. 1,999 <span style={{ fontSize: '0.82rem', color: '#888', textDecoration: 'line-through' }}>Rs. 3,499</span>
              </div>
            </div>
            <div style={{ height: '32px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ECC71', fontSize: '0.82rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} /> Free Nationwide Delivery (COD & Online)
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a 
              href={getWatchWhatsAppUrl(PRODUCTS[0])}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                textDecoration: 'none',
                padding: '13px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(37, 211, 102, 0.4)',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={18} />
              <span>Order on WhatsApp</span>
            </a>

            <button 
              className="btn-gold" 
              onClick={onExploreClick}
              style={{ padding: '13px 22px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Explore Collection</span>
              <ArrowRight size={17} />
            </button>

            <button 
              className="btn-outline-gold" 
              onClick={onUnboxingClick}
              style={{ padding: '13px 18px', fontSize: '0.86rem' }}
            >
              <span>Open Parcel Guarantee</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="hero-trust-grid" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
                <ShieldCheck size={20} color="#D4AF37" />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Open Parcel</div>
                <div style={{ fontSize: '0.72rem', color: '#8E8E93' }}>Check before pay</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
                <Truck size={20} color="#2ECC71" />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Free COD</div>
                <div style={{ fontSize: '0.72rem', color: '#8E8E93' }}>2–3 Day Express</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(243, 229, 171, 0.1)', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
                <Award size={20} color="#E5C378" />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>7-Day Exchange</div>
                <div style={{ fontSize: '0.72rem', color: '#8E8E93' }}>100% Replacement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Flagship Showcase Card */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(45px)',
            zIndex: 0
          }} />

          {/* Watch Card with 3D Tilt */}
          <div 
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '470px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1.5px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.15)',
              transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            {/* Main Interactive Watch Image */}
            <div 
              style={{ position: 'relative', cursor: onSelectFlagship ? 'pointer' : 'default' }}
              onClick={onSelectFlagship}
              title="Click to view full dedicated watch details"
            >
              <img 
                src={flagshipImages[activeAngleIndex]} 
                alt="MEIBO 3D Wheel Rim Kinetic Watch" 
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'opacity 0.2s'
                }}
              />
              
              {/* Floating Flagship Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(7, 7, 9, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F3E5AB', letterSpacing: '1px' }}>
                  🔥 TIKTOK VIRAL #1
                </span>
              </div>

              {/* Price Tag Pill */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(7, 7, 9, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                padding: '8px 14px',
                borderRadius: '10px',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#8E8E93', textDecoration: 'line-through' }}>
                  Rs. 3,499
                </div>
                <div className="font-cinzel" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F3E5AB' }}>
                  Rs. 2,499
                </div>
              </div>

              {/* Interactive Angle Switcher Thumbnails on Image */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                display: 'flex',
                gap: '6px',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(6px)',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {flagshipImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveAngleIndex(idx)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: activeAngleIndex === idx ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.2)',
                      padding: 0,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#000',
                      opacity: activeAngleIndex === idx ? 1 : 0.6
                    }}
                  >
                    <img src={img} alt="Angle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom mini bar with instant buy CTA */}
            <div style={{ 
              padding: '14px 18px', 
              background: 'rgba(0,0,0,0.7)', 
              borderTop: '1px solid rgba(255,255,255,0.06)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div 
                onClick={onSelectFlagship}
                style={{ cursor: onSelectFlagship ? 'pointer' : 'default' }}
                title="Click to view full dedicated watch details"
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  MEIBO 3D Wheel Rim Kinetic Watch
                </div>
                <div style={{ fontSize: '0.74rem', color: '#D4AF37' }}>
                  Spinning Rotor • Brembo Caliper • PVD Steel
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a
                  href={getWatchWhatsAppUrl(PRODUCTS[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={onQuickBuyFlagship}
                  className="btn-gold"
                  style={{ padding: '8px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                >
                  Instant COD
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
