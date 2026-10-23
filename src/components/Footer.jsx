import React from 'react';
import { ShieldCheck, Truck, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';
import { JazzCashLogo, SadaPayLogo, NayaPayLogo, CashOnDeliveryBadge, RaastLogo } from './PaymentLogos';

export default function Footer({ onScrollTo, onOpenPolicy }) {
  return (
    <footer 
      id="footer" 
      style={{
        backgroundColor: 'var(--brand-navy, #172A3A)',
        borderTop: '1px solid var(--border-warm, #E6E2DA)',
        padding: 'clamp(36px, 5vw, 64px) clamp(16px, 3.5vw, 32px) 28px',
        color: 'var(--hero-text-secondary, #D4D9DF)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top 4 Trust Pillars */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '32px',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(182, 154, 99, 0.15)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
              <ShieldCheck size={24} color="var(--accent-gold, #B69A63)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0' }}>Open Parcel Check</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--hero-text-secondary, #D4D9DF)', margin: 0 }}>Inspect watch before paying rider</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(35, 118, 83, 0.2)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
              <Truck size={24} color="var(--indicator-green, #237653)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0' }}>Free Express Delivery</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--hero-text-secondary, #D4D9DF)', margin: 0 }}>2–3 Day Delivery via Trax/Leopards</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(182, 154, 99, 0.15)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
              <Award size={24} color="var(--accent-gold, #B69A63)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0' }}>1-Year Movement Warranty</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--hero-text-secondary, #D4D9DF)', margin: 0 }}>Warranty card with every presentation box</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
              <Clock size={24} color="#FFFFFF" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0' }}>7-Day Easy Exchange</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--hero-text-secondary, #D4D9DF)', margin: 0 }}>100% Doorstep replacement</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            marginBottom: '36px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img 
                src="/images/branding/mubar_logo.jpg" 
                alt="MUBAR" 
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--accent-gold, #B69A63)' }}
              />
              <span 
                className="font-playfair" 
                style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '3px' }}
              >
                MUBAR
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--hero-text-secondary, #D4D9DF)', margin: '0 0 14px 0' }}>
              Premium watch store serving customers across Pakistan. Dedicated to verified wrist presence, unboxing excellence, and 100% open parcel shopping confidence.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold, #B69A63)', fontWeight: 600 }}>
              Fulfillment: Gulberg III, Lahore, Pakistan
            </div>
          </div>

          {/* Actual Catalog Collections */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              COLLECTIONS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  MEIBO 3D Supercar Rim Watch
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  Yacht-Master Oysterflex Edition
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  YOLAKO Luxury Diving Submariner
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  GENEVA Executive Chronograph
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  GENEVA Motorsport Racing Edition
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo && onScrollTo('catalog')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem' }}>
                  YOLAKO Octa Geometric Tachymeter
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              STORE POLICIES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li>
                <button onClick={() => onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem', textAlign: 'left' }}>
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem', textAlign: 'left' }}>
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem', textAlign: 'left' }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem', textAlign: 'left' }}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('contact')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', padding: 0, fontSize: '0.84rem', textAlign: 'left' }}>
                  Contact Information
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Assistance */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              DIRECT CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--accent-gold, #B69A63)" />
                <span>WhatsApp: +92 308 4453846</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--accent-gold, #B69A63)" />
                <span>support@mubar.pk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--accent-gold, #B69A63)" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accepted Payment Methods Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '18px',
          paddingBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hero-text-secondary, #D4D9DF)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
              OFFICIAL PAYMENT METHODS (PAKISTAN)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                <CashOnDeliveryBadge size={20} />
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                <JazzCashLogo size={20} />
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                <SadaPayLogo size={20} />
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                <NayaPayLogo size={20} />
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                <RaastLogo size={20} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--hero-text-secondary, #D4D9DF)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
              DOORSTEP INSPECTION GUARANTEE
            </div>
            <div style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 600 }}>
              🚚 100% Free Nationwide Delivery • 2–3 Days Express Delivery
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.76rem',
          color: 'var(--hero-text-secondary, #D4D9DF)'
        }}>
          <div>
            © 2026 MUBAR. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <button onClick={() => onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', fontSize: '0.76rem' }}>Privacy</button>
            <button onClick={() => onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', fontSize: '0.76rem' }}>Terms</button>
            <button onClick={() => onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', fontSize: '0.76rem' }}>Shipping</button>
            <button onClick={() => onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: 'var(--hero-text-secondary, #D4D9DF)', cursor: 'pointer', fontSize: '0.76rem' }}>Returns</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
