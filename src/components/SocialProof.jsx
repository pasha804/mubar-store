import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { REVIEWS } from '../data/products';

const FAQS = [
  {
    q: "When will my watch arrive?",
    a: "Orders are dispatched within 24 hours from our Lahore fulfillment studio. Delivery to Lahore takes 24–48 hours; Karachi, Islamabad, Rawalpindi, and Faisalabad take 2–3 business days; and other cities take 3–4 business days via express courier."
  },
  {
    q: "Can I inspect the parcel before paying?",
    a: "Yes, 100%! All MUBAR shipments include doorstep Open Parcel Inspection authorization. When the rider arrives at your doorstep, you may open the outer flyer, inspect the watch, and only pay once you are completely satisfied."
  },
  {
    q: "What does the warranty cover?",
    a: "Every timepiece includes an official 1-Year Movement Warranty Card inside the presentation box. It covers internal quartz movement irregularities and manufacturing defects occurring under normal use for 12 months."
  },
  {
    q: "What should I do if my parcel arrives damaged?",
    a: "If there is any visible transit defect, you can either hand the parcel back to the courier without making any payment, or contact our WhatsApp Concierge (+92 308 4453846) for an immediate 7-day doorstep replacement."
  },
  {
    q: "Which payment methods are available?",
    a: "Cash on Delivery (COD) is available nationwide. For customers who prefer cashless digital transfers, we accept verified direct payments via JazzCash, SadaPay, NayaPay, and Raast."
  }
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default
  const totalReviews = REVIEWS.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalReviews]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const getVisibleReviews = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(REVIEWS[(currentIndex + i) % totalReviews]);
    }
    return items;
  };

  return (
    <section 
      id="faq" 
      style={{
        padding: 'clamp(40px, 6vw, 72px) clamp(16px, 3.5vw, 32px)',
        backgroundColor: 'var(--bg-primary, #F7F5F0)',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ==============================================================================
            DELIVERY & WARRANTY FAQ SECTION (Section 21: "A Little Peace of Mind.")
            ============================================================================== */}
        <div style={{ maxWidth: '820px', margin: '0 auto 60px auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: 'var(--accent-gold, #B69A63)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              DELIVERY & WARRANTY
            </div>

            <h2 
              className="font-playfair"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: 'var(--brand-navy, #172A3A)',
                margin: '0 0 8px 0',
                fontWeight: 700
              }}
            >
              A Little Peace of Mind.
            </h2>

            <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.92rem', margin: 0 }}>
              Straightforward answers regarding shipping, doorstep open parcel verification, and our 1-year warranty.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-card, #E6E2DA)',
                    borderRadius: 'var(--radius-card, 12px)',
                    overflow: 'hidden',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--text-primary, #252A30)',
                      fontSize: '0.92rem',
                      fontWeight: 600
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--accent-gold, #B69A63)" /> : <ChevronDown size={18} color="var(--text-secondary, #737B84)" />}
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 20px 18px 20px',
                      color: 'var(--text-secondary, #737B84)',
                      fontSize: '0.86rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-warm, #E6E2DA)',
                      paddingTop: '12px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* ==============================================================================
            CUSTOMER REVIEWS & SOCIAL PROOF
            ============================================================================== */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ position: 'relative' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 
              className="font-playfair"
              style={{
                fontSize: '1.4rem',
                color: 'var(--brand-navy, #172A3A)',
                margin: '0 0 6px 0',
                fontWeight: 700
              }}
            >
              Verified Buyer Feedback
            </h3>
            <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.86rem', margin: 0 }}>
              Recent unboxing impressions from verified customers across Pakistan.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px'
          }}>
            {getVisibleReviews().map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-card, #E6E2DA)',
                  borderRadius: 'var(--radius-card, 12px)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-card)',
                  minHeight: '200px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="#B69A63" color="#B69A63" />
                      ))}
                    </div>

                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '0.7rem', 
                      color: 'var(--indicator-green, #237653)', 
                      fontWeight: 700,
                      backgroundColor: 'var(--indicator-green-bg, #E8F5EE)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      <CheckCircle size={10} /> Verified
                    </span>
                  </div>

                  <p style={{
                    color: 'var(--text-primary, #252A30)',
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    margin: '0 0 14px 0'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-warm, #E6E2DA)', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: 'var(--brand-navy, #172A3A)', fontSize: '0.84rem' }}>
                      {rev.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>
                      {rev.city}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-card, #E6E2DA)',
                color: 'var(--text-primary, #252A30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-card, #E6E2DA)',
                color: 'var(--text-primary, #252A30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
