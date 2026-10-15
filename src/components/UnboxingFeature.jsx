import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Clock, Sparkles, CheckCircle2, ArrowRight, 
  Package, AlertTriangle, Eye, ThumbsUp, RefreshCw, Star 
} from 'lucide-react';

export default function UnboxingFeature({ onOrderAnyClick }) {
  const [activeTab, setActiveTab] = useState('process'); // 'process' | 'comparison' | 'box'

  return (
    <section id="trust-standard" style={{
      padding: 'clamp(40px, 6vw, 75px) clamp(14px, 3vw, 24px)',
      background: 'linear-gradient(180deg, #070709 0%, #0c0c11 50%, #070709 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '5px 14px', 
            borderRadius: '20px', 
            background: 'rgba(46, 204, 113, 0.1)', 
            border: '1px solid rgba(46, 204, 113, 0.3)', 
            marginBottom: '14px' 
          }}>
            <ShieldCheck size={14} color="#2ECC71" />
            <span style={{ fontSize: '0.78rem', color: '#2ECC71', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              ZERO ONLINE SHOPPING RISK IN PAKISTAN
            </span>
          </div>
          <h2 className="font-cinzel" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
            WHY PAKISTANI BUYERS <span className="gold-text">TRUST MUBAR</span>
          </h2>
          <p style={{ color: '#8E8E93', maxWidth: '680px', margin: '0 auto', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Online shopping me sab se bara dar hota hai: "Pata nahi parcel me kya niklay ga." <br />
            Humne ye dar 100% khatam kar diya hai.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('process')}
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: activeTab === 'process' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'process' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'process' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Eye size={16} color={activeTab === 'process' ? '#D4AF37' : '#aaa'} />
            <span>Doorstep Open Parcel Process (3 Steps)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: activeTab === 'comparison' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'comparison' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'comparison' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <RefreshCw size={16} color={activeTab === 'comparison' ? '#D4AF37' : '#aaa'} />
            <span>MUBAR vs Other Online Sellers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('box')}
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: activeTab === 'box' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'box' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'box' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Package size={16} color={activeTab === 'box' ? '#D4AF37' : '#aaa'} />
            <span>Free Packaging & Safe Delivery</span>
          </button>
        </div>

        {/* TAB 1: 3-STEP DOORSTEP PROCESS */}
        {activeTab === 'process' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '36px'
          }}>
            {/* Step 1 */}
            <div style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#F3E5AB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                1
              </div>
              <div style={{ background: 'rgba(46, 204, 113, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Truck size={24} color="#2ECC71" />
              </div>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                Rider Apke Darwaze Par Aata Hai
              </h4>
              <p style={{ color: '#999', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Trax / Leopards courier rider parcel lekar aapke diye huway address par deliver karta hai. Koi hidden ya extra delivery charges nahi.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#D4AF37',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.9rem'
              }}>
                2
              </div>
              <div style={{ background: 'rgba(212, 175, 55, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Eye size={24} color="#D4AF37" />
              </div>
              <h4 style={{ color: '#F3E5AB', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                Pehle Parcel Kholo & Check Karo
              </h4>
              <p style={{ color: '#ccc', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Aap rider ke samne flyer open karke ghari ka dial, weight, glass aur finishing tasalli se check karte hain. 100% Open Parcel allowed!
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#F3E5AB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                3
              </div>
              <div style={{ background: 'rgba(46, 204, 113, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ThumbsUp size={24} color="#2ECC71" />
              </div>
              <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                Tassali Hone Par Cash Do!
              </h4>
              <p style={{ color: '#999', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Jab aap 100% mutma'in ho jayein, tab rider ko cash payment dein. Agar cheez pasand na aaye to baghair kisi payment ke rider ko parcel wapas kardein!
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: MUBAR VS OTHER SELLERS */}
        {activeTab === 'comparison' && (
          <div className="unboxing-comparison-grid">
            {/* Other Sellers */}
            <div style={{
              background: 'rgba(231, 76, 60, 0.05)',
              border: '1px solid rgba(231, 76, 60, 0.25)',
              borderRadius: '16px',
              padding: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E74C3C', fontWeight: 700, fontSize: '1.1rem', marginBottom: '18px' }}>
                <AlertTriangle size={20} />
                <span>Ordinary Social Media Sellers</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, fontSize: '0.88rem', color: '#bbb' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#E74C3C', fontWeight: 700 }}>✕</span>
                  <span><strong>Band Parcel Policy:</strong> Rider bolta hai 'pehle paise do, parcel baad me kholna'.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#E74C3C', fontWeight: 700 }}>✕</span>
                  <span><strong>Plastic & Cheap Build:</strong> Pictures me original aur deliver hotay waqt halki plastic ki ghari.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#E74C3C', fontWeight: 700 }}>✕</span>
                  <span><strong>No WhatsApp Reply:</strong> Kharabi nikalne par WhatsApp par block ya ghost kar detay hain.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#E74C3C', fontWeight: 700 }}>✕</span>
                  <span><strong>Extra Charges:</strong> Checkout ke baad Rs. 300–400 courier charges alag se mangtay hain.</span>
                </li>
              </ul>
            </div>

            {/* MUBAR Standard */}
            <div style={{
              background: 'rgba(46, 204, 113, 0.05)',
              border: '1.5px solid rgba(46, 204, 113, 0.35)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2ECC71', fontWeight: 700, fontSize: '1.1rem', marginBottom: '18px' }}>
                <CheckCircle2 size={20} />
                <span>MUBAR Guarantee Standard</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, fontSize: '0.88rem', color: '#ddd' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#2ECC71', fontWeight: 700 }}>✓</span>
                  <span><strong>100% Open Parcel:</strong> Rider ke samne check karein, tassali honay par payment dein.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#2ECC71', fontWeight: 700 }}>✓</span>
                  <span><strong>Solid Steel & Real Pictures:</strong> Heavy steel wrist weight aur exact real pictures wali cheez.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#2ECC71', fontWeight: 700 }}>✓</span>
                  <span><strong>7-Day Easy Exchange:</strong> Koi bhi masla aye to Muhammad Mubashar direct replace karega.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#2ECC71', fontWeight: 700 }}>✓</span>
                  <span><strong>100% Free Nationwide Delivery:</strong> Jo price screen par hai, wohi final amount rider ko deni hai.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGING & SAFETY */}
        {activeTab === 'box' && (
          <div 
            className="unboxing-box-grid"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '16px',
              padding: 'clamp(18px, 4vw, 32px)',
              marginBottom: '36px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.78rem', color: '#D4AF37', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Complimentary Presentation Set
              </span>
              <h3 className="font-cinzel" style={{ fontSize: '1.6rem', color: '#fff', marginTop: '6px', marginBottom: '14px' }}>
                Free Luxury Packaging Included With Every Order
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
                Har ghari ke sath protective hard watch box aur plush velvet cushion bilkul free diya jata hai. Parcel double-layered bubble wrap me pack hota hai taake transit ke dauran glass par koi scratch na aye.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', color: '#F3E5AB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#2ECC71" /> Hard Luxury Watch Box
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#2ECC71" /> Plush Velvet Cushion
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#2ECC71" /> Sealed Bubble Wrap Protection
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#2ECC71" /> Ready for Gifting
                </div>
              </div>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <img 
                src="/images/branding/watch_box_unboxing.jpg" 
                alt="Luxury Watch Box Packaging" 
                style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div style={{ textAlign: 'center' }}>
          <button 
            className="btn-gold" 
            onClick={onOrderAnyClick}
            style={{ padding: '14px 34px', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Order With Open Parcel Inspection (Rs. 1,999+)</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
