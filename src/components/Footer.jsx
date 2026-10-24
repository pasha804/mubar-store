import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Clock, Award, Phone, Mail, MapPin, 
  Sparkles, CheckCircle2, ArrowRight, MessageCircle, Send, Heart 
} from 'lucide-react';
import { JazzCashLogo, SadaPayLogo, NayaPayLogo, CashOnDeliveryBadge, RaastLogo } from './PaymentLogos';

export default function Footer({ onScrollTo, onOpenPolicy }) {
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterPhone.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterPhone('');
      }, 3000);
    }
  };

  return (
    <footer 
      id="footer" 
      style={{
        backgroundColor: '#0A121A',
        borderTop: '1px solid rgba(182, 154, 99, 0.25)',
        padding: 'clamp(40px, 5vw, 70px) clamp(16px, 3.5vw, 32px) 28px',
        color: '#D4D9DF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Ambient Gold Glow at Footer Top */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'radial-gradient(ellipse at center, rgba(182, 154, 99, 0.8) 0%, rgba(182, 154, 99, 0) 75%)',
          boxShadow: '0 0 25px rgba(182, 154, 99, 0.4)'
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* ========================================================
            TOP 4 LEVEL KISM KE TRUST PILLARS
            ======================================================== */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Pillar 1: Open Parcel */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            transition: 'border-color 0.2s ease, transform 0.2s ease'
          }}>
            <div style={{
              backgroundColor: 'rgba(46, 213, 115, 0.15)',
              padding: '12px',
              borderRadius: '10px',
              flexShrink: 0,
              border: '1px solid rgba(46, 213, 115, 0.3)'
            }}>
              <ShieldCheck size={24} color="#2ED573" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 800, margin: '0 0 3px 0' }}>
                100% Open Parcel Check
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#A0AAB5', margin: 0, lineHeight: 1.4 }}>
                Rider ke samne box khol kar tasalli karein, phir cash dein.
              </p>
            </div>
          </div>

          {/* Pillar 2: Free Delivery */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(182, 154, 99, 0.15)',
              padding: '12px',
              borderRadius: '10px',
              flexShrink: 0,
              border: '1px solid rgba(182, 154, 99, 0.3)'
            }}>
              <Truck size={24} color="#D4AF37" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 800, margin: '0 0 3px 0' }}>
                100% Free Nationwide Delivery
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#A0AAB5', margin: 0, lineHeight: 1.4 }}>
                Zero shipping charges. 2–3 Days via Trax / Leopards / TCS.
              </p>
            </div>
          </div>

          {/* Pillar 3: 1-Year Warranty */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(182, 154, 99, 0.15)',
              padding: '12px',
              borderRadius: '10px',
              flexShrink: 0,
              border: '1px solid rgba(182, 154, 99, 0.3)'
            }}>
              <Award size={24} color="#D4AF37" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 800, margin: '0 0 3px 0' }}>
                1-Year Movement Warranty
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#A0AAB5', margin: 0, lineHeight: 1.4 }}>
                Physical warranty card with unique serial in every watch box.
              </p>
            </div>
          </div>

          {/* Pillar 4: 7-Day Exchange */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(116, 185, 255, 0.15)',
              padding: '12px',
              borderRadius: '10px',
              flexShrink: 0,
              border: '1px solid rgba(116, 185, 255, 0.3)'
            }}>
              <Clock size={24} color="#74B9FF" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 800, margin: '0 0 3px 0' }}>
                7-Day Doorstep Exchange
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#A0AAB5', margin: 0, lineHeight: 1.4 }}>
                Rider replaces at your doorstep if you want another design.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            VIP WHATSAPP & NEWSLETTER CLUB BANNER
            ======================================================== */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(23, 42, 58, 0.8) 0%, rgba(10, 18, 26, 0.95) 100%)',
          border: '1px solid rgba(182, 154, 99, 0.35)',
          borderRadius: '16px',
          padding: 'clamp(20px, 3.5vw, 32px)',
          marginBottom: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#D4AF37" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' }}>
                MUBAR VIP COLLECTORS CLUB
              </span>
            </div>
            <h3 className="font-playfair" style={{ color: '#FFFFFF', fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', margin: '0 0 6px 0', fontWeight: 700 }}>
              Get Exclusive WhatsApp Unboxing Drops & VIP Deals.
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#A0AAB5', margin: 0, lineHeight: 1.5 }}>
              Receive first access to newly imported 3D wheel rim designs, Swiss chronograph replicas, and private flash vouchers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '420px' }}>
            <input 
              type="text"
              placeholder="Enter WhatsApp / Mobile Number"
              value={newsletterPhone}
              onChange={(e) => setNewsletterPhone(e.target.value)}
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '0.86rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '12px 20px',
                fontSize: '0.84rem',
                fontWeight: 800,
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #B69A63 0%, #947941 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{subscribed ? 'JOINED!' : 'JOIN VIP CLUB'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* ========================================================
            MAIN 4-COLUMN FOOTER INFORMATION
            ======================================================== */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <img 
                src="/images/branding/mubar_logo.png" 
                alt="MUBAR" 
                style={{ 
                  height: '76px', 
                  width: 'auto', 
                  objectFit: 'contain', 
                  filter: 'drop-shadow(0 4px 10px rgba(182, 154, 99, 0.55))' 
                }}
                loading="lazy"
                decoding="async"
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span 
                  className="font-playfair" 
                  style={{ fontSize: '1.95rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '3px' }}
                >
                  MUBAR
                </span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '2.2px', color: '#D4AF37', fontWeight: 800, textTransform: 'uppercase', marginTop: '5px' }}>
                  Timepieces Pakistan
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: '#A0AAB5', margin: '0 0 16px 0' }}>
              Pakistan's trusted modern horology brand founded by Muhammad Mubashar in Lahore. Dedicated to authentic wrist presence, bespoke 1200 GSM presentation sets, and 100% open parcel confidence.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(46, 213, 115, 0.12)',
              border: '1px solid rgba(46, 213, 115, 0.3)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.72rem',
              color: '#2ED573',
              fontWeight: 700
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2ED573', display: 'inline-block' }} />
              <span>Fulfilled from Gulberg III, Lahore • Active</span>
            </div>
          </div>

          {/* Collections Column */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              POPULAR COLLECTIONS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  🔥 MEIBO 3D Wheel Rim (Solid Steel Chain)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  ⚡ MEIBO 3D Wheel Rim (Sport Strap)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  👑 Yacht-Master Oysterflex Luxury Edition
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  🌊 YOLAKO Luxury Diving Submariner (Hulk/Blue)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  💼 GENEVA Executive Multi-Dial Chronograph
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  🏎️ GENEVA Grand Prix Motorsport Racing
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#D4AF37'} onMouseLeave={e => e.target.style.color = '#A0AAB5'}>
                  💎 YOLAKO Octa Geometric Tachymeter (Royal Oak)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              CUSTOMER CARE & POLICIES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ Open Parcel Inspection Guide
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ 7-Day Doorstep Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ 1-Year Movement Warranty Claim
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ Nationwide Delivery Timelines
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ Privacy & Order Confidentiality
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy && onOpenPolicy('contact')} style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: 0, fontSize: '0.82rem', textAlign: 'left' }}>
                  ✓ Official Contact & Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Founder Assistance */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              DIRECT FOUNDER LINE
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
              <a 
                href="https://wa.me/923084453846?text=Assalam%20o%20Alaikum%20MUBAR%20Watches,%20I%20have%20an%20inquiry%20regarding%20an%20order." 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#25D366',
                  textDecoration: 'none',
                  fontWeight: 700
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp: +92 308 4453846</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0AAB5' }}>
                <Phone size={15} color="#D4AF37" />
                <span>Call Hotline: 0308-4453846</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0AAB5' }}>
                <Mail size={15} color="#D4AF37" />
                <span>Email: support@mubar.pk</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A0AAB5' }}>
                <MapPin size={15} color="#D4AF37" />
                <span>Fulfillment Hub: Gulberg III, Lahore</span>
              </div>

              <div style={{ fontSize: '0.74rem', color: '#8894A0', marginTop: '4px', lineHeight: 1.4 }}>
                ⏱️ Support Available: 9:00 AM – 11:30 PM (Daily)
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            COURIER PARTNERS & OFFICIAL PAYMENT CHANNELS
            ======================================================== */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px',
          paddingBottom: '20px',
          marginBottom: '22px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Payment Badges */}
          <div>
            <div style={{ fontSize: '0.7rem', color: '#8E99A5', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, marginBottom: '10px' }}>
              OFFICIAL VERIFIED PAYMENT METHODS (PAKISTAN)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                <CashOnDeliveryBadge size={20} />
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                <JazzCashLogo size={22} />
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                <SadaPayLogo size={20} />
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                <NayaPayLogo size={20} />
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                <RaastLogo size={20} />
              </div>
            </div>
          </div>

          {/* Courier Logistics */}
          <div>
            <div style={{ fontSize: '0.7rem', color: '#8E99A5', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, marginBottom: '10px' }}>
              NATIONWIDE EXPRESS COURIER PARTNERS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {['TRAX Logistics', 'TCS Express', 'Leopards Courier', 'PostEx COD'].map(courier => (
                <span 
                  key={courier}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}
                >
                  🚚 {courier}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            COPYRIGHT & SECURITY SEAL
            ======================================================== */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.76rem',
          color: '#8E99A5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>© 2026 MUBAR Timepieces Pakistan. All Rights Reserved.</span>
            <span>•</span>
            <span style={{ color: '#D4AF37' }}>Handcrafted with Pride in Lahore</span>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => onOpenPolicy && onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: '#8E99A5', cursor: 'pointer', fontSize: '0.76rem' }}>Privacy Policy</button>
            <button onClick={() => onOpenPolicy && onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: '#8E99A5', cursor: 'pointer', fontSize: '0.76rem' }}>Terms of Service</button>
            <button onClick={() => onOpenPolicy && onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#8E99A5', cursor: 'pointer', fontSize: '0.76rem' }}>Shipping Policy</button>
            <button onClick={() => onOpenPolicy && onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: '#8E99A5', cursor: 'pointer', fontSize: '0.76rem' }}>Refund & Exchange</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
