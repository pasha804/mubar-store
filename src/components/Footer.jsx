import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Clock, Award, Phone, Mail, MapPin, 
  Sparkles, CheckCircle2, ArrowRight, MessageCircle, Send, Heart,
  Copy, Check, X, Building2
} from 'lucide-react';
import { 
  JazzCashLogo, SadaPayLogo, NayaPayLogo, CashOnDeliveryBadge, 
  RaastLogo, EasyPaisaLogo, BankTransferBadge 
} from './PaymentLogos';
import { PAYMENT_ACCOUNTS } from '../data/products';

export default function Footer({ onScrollTo, onOpenPolicy }) {
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [ibanModalOpen, setIbanModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

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
              Receive first access to newly imported 3D wheel rim designs, Swiss-inspired chronographs, and private flash vouchers.
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
              Pakistan's trusted modern horology brand founded by Muhammad Mubashar in Lahore. Dedicated to authentic wrist presence, direct factory wholesale rates, secure protective packaging, and 100% open parcel confidence.
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
              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <CashOnDeliveryBadge size={22} theme="light" />
              </div>

              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => setIbanModalOpen(true)}
                title="Click to view verified JazzCash account details"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <JazzCashLogo size={22} theme="light" />
              </div>

              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => setIbanModalOpen(true)}
                title="Click to view verified EasyPaisa account details"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <EasyPaisaLogo size={22} theme="light" />
              </div>

              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => setIbanModalOpen(true)}
                title="Click to view verified SadaPay IBAN details"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <SadaPayLogo size={20} theme="light" />
              </div>

              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => setIbanModalOpen(true)}
                title="Click to view verified NayaPay ID & IBAN details"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <NayaPayLogo size={22} theme="light" />
              </div>

              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  padding: '6px 12px', 
                  borderRadius: '7px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => setIbanModalOpen(true)}
                title="Click to view verified Raast Instant Payment details"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.22)'; }}
              >
                <RaastLogo size={22} theme="light" />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setIbanModalOpen(true)}
                style={{
                  background: 'rgba(182, 154, 99, 0.12)',
                  border: '1px solid rgba(182, 154, 99, 0.4)',
                  borderRadius: '6px',
                  color: '#D4AF37',
                  padding: '6px 12px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(182, 154, 99, 0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(182, 154, 99, 0.12)'}
              >
                <span>🏛️ View SadaPay, NayaPay &amp; JazzCash IBAN Details</span>
                <ArrowRight size={13} />
              </button>
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

      {/* ========================================================
          OFFICIAL BANK ACCOUNTS & IBAN MODAL
          ======================================================== */}
      {ibanModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            backgroundColor: 'rgba(10, 18, 26, 0.82)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIbanModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#0F1A24',
              border: '1px solid rgba(182, 154, 99, 0.45)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 28px)',
              maxWidth: '540px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              color: '#FFFFFF',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ backgroundColor: 'rgba(182, 154, 99, 0.18)', padding: '8px', borderRadius: '8px' }}>
                  <Building2 size={20} color="#D4AF37" />
                </div>
                <div>
                  <h3 className="font-playfair" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                    Official Bank &amp; IBAN Accounts
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
                    MUBAR Store Verified Channels
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIbanModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#A0AAB5', cursor: 'pointer', padding: '4px' }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#A0AAB5', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              Agar aap order confirm karne se pehle direct online transfer ya Raast karna chahein, to darj zail verified accounts use kar sakte hain:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* SadaPay Card */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 107, 129, 0.3)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                      <SadaPayLogo size={16} showText={false} />
                    </div>
                    <strong style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>SadaPay</strong>
                  </div>
                  <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(255, 107, 129, 0.18)', color: '#FF6B81', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Zero Fee
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D4D9DF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Title: <strong>Muhammad Mubashar</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Account: <strong>03084453846</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy('03084453846', 'sada-num')}
                      style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'sada-num' ? <><Check size={12} color="#2ED573" /><span>Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                    </button>
                  </div>
                  <div style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px dashed rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#D4AF37', fontWeight: 800 }}>OFFICIAL IBAN:</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>PK43SADA0000003084453846</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('PK43SADA0000003084453846', 'sada-iban')}
                      style={{ background: 'rgba(182, 154, 99, 0.2)', border: '1px solid #D4AF37', color: '#D4AF37', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'sada-iban' ? <><Check size={12} color="#2ED573" /><span>Copied!</span></> : <><Copy size={12} /><span>Copy IBAN</span></>}
                    </button>
                  </div>
                </div>
              </div>

              {/* NayaPay Card */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(46, 213, 115, 0.3)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                      <NayaPayLogo size={16} showText={false} />
                    </div>
                    <strong style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>NayaPay</strong>
                  </div>
                  <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(46, 213, 115, 0.18)', color: '#2ED573', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Instant Transfer
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D4D9DF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Title: <strong>Muhammad Mubashar</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>NayaPay ID: <strong style={{ color: '#2ED573' }}>pashaxora@nayapay</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy('pashaxora@nayapay', 'naya-id')}
                      style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'naya-id' ? <><Check size={12} color="#2ED573" /><span>Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                    </button>
                  </div>
                  <div style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px dashed rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#D4AF37', fontWeight: 800 }}>OFFICIAL IBAN:</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>PK79NAYA1234503084453846</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('PK79NAYA1234503084453846', 'naya-iban')}
                      style={{ background: 'rgba(182, 154, 99, 0.2)', border: '1px solid #D4AF37', color: '#D4AF37', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'naya-iban' ? <><Check size={12} color="#2ED573" /><span>Copied!</span></> : <><Copy size={12} /><span>Copy IBAN</span></>}
                    </button>
                  </div>
                </div>
              </div>

              {/* JazzCash Card */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 71, 87, 0.3)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                      <JazzCashLogo size={18} showText={false} />
                    </div>
                    <strong style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>JazzCash</strong>
                  </div>
                  <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(255, 71, 87, 0.18)', color: '#FF4757', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Mobile Wallet
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D4D9DF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Title: <strong>Muhammad Mubashir</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Account: <strong>03084453846</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy('03084453846', 'jazz-num')}
                      style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'jazz-num' ? <><Check size={12} color="#2ED573" /><span>Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                    </button>
                  </div>
                </div>
              </div>

              {/* EasyPaisa Card */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 168, 89, 0.3)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                      <EasyPaisaLogo size={18} showText={false} />
                    </div>
                    <strong style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>EasyPaisa</strong>
                  </div>
                  <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(0, 168, 89, 0.18)', color: '#00A859', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Instant Transfer
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D4D9DF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Title: <strong>Muhammad Mubashar</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Account: <strong>03084453846</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy('03084453846', 'ep-num')}
                      style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedKey === 'ep-num' ? <><Check size={12} color="#2ED573" /><span>Copied</span></> : <><Copy size={12} /><span>Copy</span></>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setIbanModalOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, #B69A63 0%, #947941 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 24px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
