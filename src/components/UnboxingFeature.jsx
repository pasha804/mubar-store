import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Clock, Sparkles, CheckCircle2, ArrowRight, 
  Package, AlertCircle, Eye, RefreshCw, Award 
} from 'lucide-react';

export default function UnboxingFeature({ onOrderAnyClick }) {
  const [activeTab, setActiveTab] = useState('process'); // 'process' | 'comparison' | 'box'

  return (
    <section 
      id="trust-standard" 
      style={{
        padding: 'clamp(40px, 6vw, 76px) clamp(16px, 3.5vw, 32px)',
        backgroundColor: 'var(--bg-subtle, #F0EEE8)',
        borderTop: '1px solid var(--border-warm, #E6E2DA)',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '5px 14px', 
            borderRadius: '20px', 
            backgroundColor: 'var(--indicator-green-bg, #E8F5EE)', 
            border: '1px solid rgba(35, 118, 83, 0.25)', 
            marginBottom: '12px' 
          }}>
            <ShieldCheck size={14} color="var(--indicator-green, #237653)" />
            <span style={{ fontSize: '0.74rem', color: 'var(--indicator-green, #237653)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              TRANSPARENT SHOPPING STANDARD IN PAKISTAN
            </span>
          </div>

          <h2 
            className="font-playfair"
            style={{ 
              fontSize: 'clamp(1.85rem, 3.6vw, 2.75rem)', 
              color: 'var(--brand-navy, #172A3A)', 
              marginBottom: '10px',
              fontWeight: 700,
              letterSpacing: '-0.3px'
            }}
          >
            Why Pakistani Watch Enthusiasts Trust MUBAR
          </h2>

          <p style={{ 
            color: 'var(--text-secondary, #737B84)', 
            maxWidth: '640px', 
            margin: '0 auto', 
            fontSize: '0.94rem', 
            lineHeight: 1.6 
          }}>
            Online watch shopping often comes with the fear of receiving damaged or incorrect items. We eliminate this uncertainty with verified doorstep inspection before payment.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('process')}
            style={{
              padding: '9px 20px',
              borderRadius: '30px',
              border: activeTab === 'process' ? '1px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
              backgroundColor: activeTab === 'process' ? 'var(--brand-navy, #172A3A)' : 'var(--bg-card, #FFFFFF)',
              color: activeTab === 'process' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.18s ease'
            }}
          >
            <Eye size={15} />
            <span>Open Parcel 3-Step Process</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '9px 20px',
              borderRadius: '30px',
              border: activeTab === 'comparison' ? '1px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
              backgroundColor: activeTab === 'comparison' ? 'var(--brand-navy, #172A3A)' : 'var(--bg-card, #FFFFFF)',
              color: activeTab === 'comparison' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.18s ease'
            }}
          >
            <RefreshCw size={15} />
            <span>MUBAR vs Unknown Sellers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('box')}
            style={{
              padding: '9px 20px',
              borderRadius: '30px',
              border: activeTab === 'box' ? '1px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
              backgroundColor: activeTab === 'box' ? 'var(--brand-navy, #172A3A)' : 'var(--bg-card, #FFFFFF)',
              color: activeTab === 'box' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.18s ease'
            }}
          >
            <Package size={15} />
            <span>Watch Packaging (Watch Only)</span>
          </button>
        </div>

        {/* TAB 1: 3-Step Doorstep Process */}
        {activeTab === 'process' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {/* Step 1 */}
            <div style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '24px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                color: 'var(--brand-navy, #172A3A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}>
                1
              </div>
              <div style={{
                backgroundColor: 'var(--indicator-green-bg, #E8F5EE)',
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Truck size={22} color="var(--indicator-green, #237653)" />
              </div>
              <h4 style={{ color: 'var(--text-primary, #252A30)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                Express Courier Arrival
              </h4>
              <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                Rider arrives at your home or office within 2–3 business days. Delivery across Pakistan is 100% Free with zero hidden charges.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '24px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                color: 'var(--brand-navy, #172A3A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}>
                2
              </div>
              <div style={{
                backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Eye size={22} color="var(--accent-gold, #B69A63)" />
              </div>
              <h4 style={{ color: 'var(--text-primary, #252A30)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                Open Parcel Before Payment
              </h4>
              <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                Unbox the watch right in front of the courier rider. Inspect dial, steel bracelet, weight, and movement before handing over any cash.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '24px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                color: 'var(--brand-navy, #172A3A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.82rem'
              }}>
                3
              </div>
              <div style={{
                backgroundColor: 'rgba(23, 42, 58, 0.08)',
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={22} color="var(--brand-navy, #172A3A)" />
              </div>
              <h4 style={{ color: 'var(--text-primary, #252A30)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                Pay Only When 100% Satisfied
              </h4>
              <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                Hand over the cash only when you are completely satisfied with the watch. If there is any issue, return it immediately on the spot.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Comparison Table */}
        {activeTab === 'comparison' && (
          <div style={{
            backgroundColor: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-card, #E6E2DA)',
            borderRadius: 'var(--radius-card, 12px)',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '480px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--brand-navy, #172A3A)', color: '#FFFFFF', fontSize: '0.82rem' }}>
                    <th style={{ padding: '14px 18px', fontWeight: 600 }}>Shopping Factor</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--accent-gold, #B69A63)' }}>MUBAR Store</th>
                    <th style={{ padding: '14px 18px', fontWeight: 500, opacity: 0.75 }}>Other Online Sellers</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.84rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-warm, #E6E2DA)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>Parcel Inspection</td>
                    <td style={{ padding: '14px 18px', color: 'var(--indicator-green, #237653)', fontWeight: 700 }}>
                      ✓ 100% Doorstep Inspection Allowed
                    </td>
                    <td style={{ padding: '14px 18px', color: '#9E3438' }}>✕ Sealed box only, no opening allowed</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-warm, #E6E2DA)', backgroundColor: 'var(--bg-subtle, #F0EEE8)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>Delivery Charges</td>
                    <td style={{ padding: '14px 18px', color: 'var(--indicator-green, #237653)', fontWeight: 700 }}>
                      ✓ FREE across all of Pakistan
                    </td>
                    <td style={{ padding: '14px 18px', color: '#9E3438' }}>✕ Rs. 250 - 400 extra delivery fee</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-warm, #E6E2DA)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>Customer WhatsApp Support</td>
                    <td style={{ padding: '14px 18px', color: 'var(--indicator-green, #237653)', fontWeight: 700 }}>
                      ✓ Direct contact with founder Mubashar
                    </td>
                    <td style={{ padding: '14px 18px', color: '#9E3438' }}>✕ Automated bots or delayed replies</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>Exchange Policy</td>
                    <td style={{ padding: '14px 18px', color: 'var(--indicator-green, #237653)', fontWeight: 700 }}>
                      ✓ 7-Day Hassle-free Replacement
                    </td>
                    <td style={{ padding: '14px 18px', color: '#9E3438' }}>✕ "No return, no exchange" policies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Packaging & Safe Delivery */}
        {activeTab === 'box' && (
          <div style={{
            backgroundColor: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-card, #E6E2DA)',
            borderRadius: 'var(--radius-card, 12px)',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-card)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#B45309',
                marginBottom: '10px'
              }}>
                <Package size={14} color="#D97706" />
                <span>Watch Only • Simple Secure Packaging</span>
              </div>
              <h4 style={{ color: 'var(--text-primary, #252A30)', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 10px 0' }}>
                Safe Simple Protective Packaging (Box Not Included)
              </h4>
              <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Direct wholesale launch rates (flat 40% off) deliver karne ke liye, har parcel mein <strong>siraf authentic watch</strong> multi-layer shock-proof bubble wrap aur protective dial seal ke sath dispatch ki jaati hai. <strong>Luxury presentation box shamil nahi hai</strong> taake parcel compact rahay aur aapko Pakistan ki sabse kam wholesale price mil sake.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-primary, #252A30)' }}>
                  <CheckCircle2 size={16} color="var(--indicator-green, #237653)" />
                  <span>100% Original Watch with protective scratch-film on crystal</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-primary, #252A30)' }}>
                  <CheckCircle2 size={16} color="var(--indicator-green, #237653)" />
                  <span>Multi-layer shock-proof bubble transit pouch (Zero damage)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--indicator-green, #237653)' }}>
                  <CheckCircle2 size={16} color="var(--indicator-green, #237653)" />
                  <span>Pre-fitted fresh battery & calibrated quartz movement</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#B45309', fontWeight: 600 }}>
                  <AlertCircle size={16} color="#D97706" />
                  <span>Note: Luxury Gift Box is NOT included (Siraf Watch deliver hogi)</span>
                </div>
              </div>
            </div>

            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              height: '220px',
              backgroundColor: '#0C131C'
            }}>
              <img 
                src="/images/all-watches/watch 5/03_duo_unboxing_studio.jpg" 
                alt="Watch Unboxing"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={onOrderAnyClick}
            className="btn-primary"
            style={{
              padding: '12px 28px',
              fontSize: '0.88rem'
            }}
          >
            <span>Explore The Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
