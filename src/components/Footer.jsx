import React from 'react';
import { ShieldCheck, Truck, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';
import { JazzCashLogo, SadaPayLogo, NayaPayLogo, CashOnDeliveryBadge, RaastLogo } from './PaymentLogos';

export default function Footer({ onScrollTo, onOpenAdmin, onOpenPolicy }) {
  return (
    <footer id="founders" style={{
      backgroundColor: '#050507',
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      padding: 'clamp(40px, 6vw, 70px) clamp(14px, 3vw, 24px) 30px',
      color: '#A0A0A8'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Pillars */}
        <div 
          className="footer-pillars-grid"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '36px',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
              <ShieldCheck size={26} color="#D4AF37" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Open Parcel Policy</h4>
              <p style={{ fontSize: '0.78rem', color: '#888' }}>Check timepiece before paying rider</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
              <Truck size={26} color="#2ECC71" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Free Nationwide COD</h4>
              <p style={{ fontSize: '0.78rem', color: '#888' }}>2–3 Day Express Delivery via Trax</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
              <Award size={26} color="#D4AF37" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>1-Year Warranty Card</h4>
              <p style={{ fontSize: '0.78rem', color: '#888' }}>Included inside every presentation box</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(243, 229, 171, 0.1)', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
              <Clock size={26} color="#F3E5AB" />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>7-Day Easy Exchange</h4>
              <p style={{ fontSize: '0.78rem', color: '#888' }}>100% replacement guarantee</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div 
          className="footer-main-grid"
          style={{ marginBottom: '40px' }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/images/branding/mubar_logo.jpg" 
                alt="MUBAR" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #D4AF37' }}
              />
              <span className="font-cinzel gold-text" style={{ fontSize: '1.55rem', fontWeight: 800, letterSpacing: '4px' }}>
                MUBAR
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#8E8E93', marginBottom: '18px' }}>
              An independent luxury horology house founded by <strong>Muhammad Mubashar</strong>. Dedicated to offering precision timepieces paired with bespoke presentation unboxing and 100% open parcel confidence across Pakistan.
            </p>
            <div style={{ fontSize: '0.8rem', color: '#F3E5AB' }}>
              Fulfillment Studio: Gulberg III, Lahore, Pakistan
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel" style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '1px' }}>
              COLLECTIONS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Presidential Datejust</a></li>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Chronographs & Aviators</a></li>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Mechanical Skeletons</a></li>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Geometric Sports (Tiffany)</a></li>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Ceramic Divers (5 ATM)</a></li>
              <li><a href="#catalog" style={{ color: '#888', textDecoration: 'none' }}>Under Rs. 3,999 Deals</a></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-cinzel" style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '1px' }}>
              STORE POLICIES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li>
                <button onClick={() => onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('contact')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Contact Information
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('legal')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Legal Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Assistance */}
          <div>
            <h4 className="font-cinzel" style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '16px', letterSpacing: '1px' }}>
              ASSISTANCE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color="#D4AF37" />
                <span>WhatsApp: +92 308 4453846</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} color="#D4AF37" />
                <span>concierge@mubar.pk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={15} color="#D4AF37" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accepted Payment Methods & Delivery Banner */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '20px',
          paddingBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              ACCEPTED PAYMENT METHODS (NATIONWIDE PAKISTAN)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '5px 12px', borderRadius: '8px' }}>
                <CashOnDeliveryBadge size={22} />
              </div>
              <div style={{ background: 'rgba(227, 6, 19, 0.1)', border: '1px solid rgba(227, 6, 19, 0.35)', padding: '5px 12px', borderRadius: '8px' }}>
                <JazzCashLogo size={22} />
              </div>
              <div style={{ background: 'rgba(255, 101, 132, 0.1)', border: '1px solid rgba(255, 101, 132, 0.35)', padding: '5px 12px', borderRadius: '8px' }}>
                <SadaPayLogo size={22} />
              </div>
              <div style={{ background: 'rgba(0, 208, 132, 0.1)', border: '1px solid rgba(0, 208, 132, 0.35)', padding: '5px 12px', borderRadius: '8px' }}>
                <NayaPayLogo size={22} />
              </div>
              <div style={{ background: 'rgba(13, 59, 102, 0.25)', border: '1px solid rgba(244, 211, 94, 0.35)', padding: '5px 12px', borderRadius: '8px' }}>
                <RaastLogo size={22} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              EXPRESS DISPATCH & GUARANTEE
            </div>
            <div style={{ fontSize: '0.8rem', color: '#2ECC71', fontWeight: 700 }}>
              🚚 100% Free Nationwide Delivery • 2–3 Days Express Delivery
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Footer Links */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem',
          color: '#666'
        }}>
          <div>
            © 2026 MUBAR. All Rights Reserved. Engineered by Muhammad Mubashar.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => onOpenPolicy('privacy')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>Privacy Policy</button>
            <button onClick={() => onOpenPolicy('terms')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>Terms of Service</button>
            <button onClick={() => onOpenPolicy('shipping')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>Shipping Policy</button>
            <button onClick={() => onOpenPolicy('refund')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>Return Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
