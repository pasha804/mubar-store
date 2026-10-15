import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalReviews = REVIEWS.length;

  // Auto-rotate strictly every 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, totalReviews]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  // Calculate items to display: on desktop show 3 items starting from currentIndex
  const getVisibleReviews = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(REVIEWS[(currentIndex + i) % totalReviews]);
    }
    return items;
  };

  return (
    <section id="reviews" style={{
      padding: 'clamp(40px, 6vw, 75px) clamp(14px, 3vw, 24px)',
      background: 'radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.06) 0%, rgba(7, 7, 9, 1) 80%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '5px 14px', 
            borderRadius: '20px', 
            background: 'rgba(212, 175, 55, 0.1)', 
            border: '1px solid rgba(212, 175, 55, 0.3)', 
            marginBottom: '14px',
            maxWidth: '100%'
          }}>
            <Star size={14} fill="#D4AF37" color="#D4AF37" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: '#F3E5AB', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              REAL PAKISTANI BUYER FEEDBACK (ROMAN URDU)
            </span>
          </div>

          <h2 className="font-cinzel" style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '10px' }}>
            WHAT OUR <span className="gold-text">CUSTOMERS SAY</span>
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', maxWidth: '640px', margin: '0 auto' }}>
            Rated 4.9/5 by 1,400+ satisfied customers across Lahore, Karachi, Islamabad, Rawalpindi, and all over Pakistan.
          </p>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginTop: '12px',
            background: 'rgba(46, 204, 113, 0.1)',
            border: '1px solid rgba(46, 204, 113, 0.3)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.76rem',
            color: '#2ECC71',
            fontWeight: 600
          }}>
            <span className="pulse-dot" /> Auto-Rotating Every 2 Seconds • Hover to Pause
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ position: 'relative', padding: '10px 0 20px' }}
        >
          {/* Review Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            transition: 'all 0.4s ease'
          }}>
            {getVisibleReviews().map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  position: 'relative',
                  minHeight: '230px',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                <div>
                  {/* Top Bar: Stars & Verified Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
                      ))}
                    </div>

                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '0.74rem', 
                      color: '#2ECC71', 
                      fontWeight: 700,
                      background: 'rgba(46, 204, 113, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      <CheckCircle size={12} color="#2ECC71" /> Verified Buyer
                    </span>
                  </div>

                  {/* Roman Urdu Comment */}
                  <p style={{
                    color: '#E0E0E8',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                    fontStyle: 'normal'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                {/* Bottom Details */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                      {rev.name}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#888' }}>
                      {rev.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#D4AF37', fontWeight: 500 }}>
                      📍 {rev.city}
                    </span>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: '#aaa',
                      maxWidth: '180px',
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
            marginTop: '28px'
          }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot Indicators */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {REVIEWS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  style={{
                    width: currentIndex === dotIdx ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: currentIndex === dotIdx ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
