import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { REVIEWS } from '../data/products';

const FAQS = [
  {
    q: "Can I open and inspect the watch before giving cash to the rider?",
    a: "Yes, 100%! All MUBAR orders come with an explicit Open Parcel Doorstep Check arrangement. The courier rider will allow you to open the box, inspect the timepiece, check the dial, weight, and movement, and verify everything before handing over the cash."
  },
  {
    q: "How long does delivery take and what are the delivery charges?",
    a: "Delivery is completely FREE across all cities and towns of Pakistan. Delivery to major cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad) takes 2 to 3 business days via express courier."
  },
  {
    q: "What if there is any defect or I want to exchange the watch?",
    a: "We provide an unconditional 7-Day Hassle-Free Replacement Policy. If there is any manufacturing defect, physical damage in transit, or functional fault, contact our WhatsApp support team and we will exchange it immediately."
  },
  {
    q: "What payment methods are supported?",
    a: "We support Cash on Delivery (COD) as our primary payment method nationwide. For customers who prefer cashless digital payments, we accept verified direct transfers via JazzCash, SadaPay, NayaPay, and Raast."
  }
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const totalReviews = REVIEWS.length;

  // Gentle auto-rotation every 6 seconds (not frantic 2 seconds)
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

  // Get 3 reviews starting from currentIndex
  const getVisibleReviews = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(REVIEWS[(currentIndex + i) % totalReviews]);
    }
    return items;
  };

  return (
    <section 
      id="reviews" 
      style={{
        padding: 'clamp(40px, 6vw, 76px) clamp(16px, 3.5vw, 32px)',
        backgroundColor: 'var(--bg-primary, #F7F5F0)',
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
            padding: '4px 14px', 
            borderRadius: '20px', 
            backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)', 
            border: '1px solid rgba(182, 154, 99, 0.3)', 
            marginBottom: '12px'
          }}>
            <Star size={13} fill="#B69A63" color="#B69A63" />
            <span style={{ fontSize: '0.74rem', color: 'var(--brand-navy, #172A3A)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              VERIFIED CUSTOMER REVIEWS
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
            What Pakistani Watch Buyers Say
          </h2>

          <p style={{ 
            color: 'var(--text-secondary, #737B84)', 
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)', 
            maxWidth: '620px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Real doorstep unboxing feedback from customers across Lahore, Karachi, Islamabad, and nationwide.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ position: 'relative', marginBottom: '56px' }}
        >
          {/* Review Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {getVisibleReviews().map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                style={{
                  backgroundColor: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-card, #E6E2DA)',
                  borderRadius: 'var(--radius-card, 12px)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-card)',
                  minHeight: '220px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  {/* Top Bar: Stars & Verified Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#B69A63" color="#B69A63" />
                      ))}
                    </div>

                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '0.72rem', 
                      color: 'var(--indicator-green, #237653)', 
                      fontWeight: 700,
                      backgroundColor: 'var(--indicator-green-bg, #E8F5EE)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>
                      <CheckCircle size={11} /> Verified Buyer
                    </span>
                  </div>

                  {/* Comment */}
                  <p style={{
                    color: 'var(--text-primary, #252A30)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                    fontStyle: 'normal'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                {/* Bottom Details */}
                <div style={{ borderTop: '1px solid var(--border-warm, #E6E2DA)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: 'var(--brand-navy, #172A3A)', fontSize: '0.88rem' }}>
                      {rev.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>
                      {rev.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                    <span style={{ fontSize: '0.76rem', color: 'var(--accent-gold, #B69A63)', fontWeight: 600 }}>
                      📍 {rev.city}
                    </span>
                    <span style={{ 
                      fontSize: '0.74rem', 
                      color: 'var(--text-secondary, #737B84)',
                      maxWidth: '160px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {rev.watchBought}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '24px'
          }}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-card, #E6E2DA)',
                color: 'var(--text-primary, #252A30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <ChevronLeft size={17} />
            </button>

            {/* Pagination Indicators */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {REVIEWS.slice(0, 6).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to review ${dotIdx + 1}`}
                  style={{
                    width: currentIndex % 6 === dotIdx ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: currentIndex % 6 === dotIdx ? 'var(--brand-navy, #172A3A)' : 'var(--border-warm, #E6E2DA)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-card, #E6E2DA)',
                color: 'var(--text-primary, #252A30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <ChevronRight size={17} />
            </button>
          </div>

        </div>

        {/* ==============================================================================
            FAQ ACCORDION SECTION (Desktops & Mobile)
            ============================================================================== */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          paddingTop: '20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 
              className="font-playfair"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                color: 'var(--brand-navy, #172A3A)',
                margin: '0 0 8px 0',
                fontWeight: 700
              }}
            >
              Frequently Asked Questions
            </h3>
            <p style={{ color: 'var(--text-secondary, #737B84)', fontSize: '0.9rem', margin: 0 }}>
              Honest answers about ordering, doorstep open parcel verification, and delivery.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-card, #FFFFFF)',
                    border: '1px solid var(--border-card, #E6E2DA)',
                    borderRadius: 'var(--radius-card, 12px)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease'
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
                      lineHeight: 1.6,
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

      </div>
    </section>
  );
}
