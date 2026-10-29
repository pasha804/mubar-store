import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShieldCheck, Truck, ArrowRight, Sparkles, Package, AlertCircle } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  // Countdown Timer State (persisted 6-day rolling flash sale cycle)
  const calculateRemaining = () => {
    try {
      if (localStorage.getItem('mubar_flash_sale_end')) {
        localStorage.removeItem('mubar_flash_sale_end');
      }
    } catch (e) {}

    const savedEndTime = localStorage.getItem('mubar_flash_sale_end_6d');
    const now = Date.now();
    let end = Number(savedEndTime);

    // If not set or expired, initialize a fresh 6-day countdown (6 days + 14 hours + 35 mins)
    if (!savedEndTime || isNaN(end) || end <= now) {
      end = now + (6 * 24 * 3600 + 14 * 3600 + 35 * 60) * 1000;
      try {
        localStorage.setItem('mubar_flash_sale_end_6d', end.toString());
      } catch (e) {}
    }

    const diff = Math.max(0, Math.floor((end - now) / 1000));
    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <section 
      className="mubar-hero-section"
      style={{
        backgroundColor: 'transparent',
        position: 'relative'
      }}
    >
      {/* Primary Semantic H1 for Google Crawlers & Search Engine Indexing */}
      <h1 className="sr-only">
        MUBAR Store Pakistan — Watch Store in Pakistan | Quality Luxury Men's Watches at Low Price &amp; Free Nationwide Delivery
      </h1>

      {/* ========================================================
          1. PURE LUXURY WATCH SALE BANNER
          ======================================================== */}
      <div 
        className="mubar-hero-banner-wrap"
        onClick={onExploreClick}
        title="MUBAR Watches - Click to Shop All Watches (Up to 40% Off)"
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <img 
          src="/images/branding/Mubar Store Luxury Watch Sale Banner.png" 
          alt="MUBAR Store Luxury Watch Sale - Premium Watches, Unbeatable Prices - Save Up to 40% Off" 
          className="mubar-hero-banner-img"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Interactive Hotspot for Baked 'SHOP NOW ->' Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onExploreClick) onExploreClick();
          }}
          aria-label="Shop All Watches Now"
          className="banner-shop-now-hotspot"
          style={{
            position: 'absolute',
            left: '4.8%',
            top: '61.5%',
            width: '13.5%',
            height: '11%',
            minWidth: '95px',
            minHeight: '34px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10
          }}
        />
      </div>

      {/* ========================================================
          2. LUXURY FLASH SALE COUNTDOWN TIMER (LEVEL WALA TIMER)
          ======================================================== */}
      <div 
        className="mubar-timer-bar-wrap"
        style={{
          maxWidth: '1280px',
          margin: '12px auto 0 auto',
          background: 'linear-gradient(135deg, #0D1824 0%, #060B10 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(182, 154, 99, 0.4)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.22)',
          padding: 'clamp(10px, 1.8vw, 16px) clamp(12px, 2.5vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        {/* Left: Urgent Title & Digital Flip-Clock Boxes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 18px)', flexWrap: 'wrap' }}>
          
          {/* Flame Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: 'rgba(231, 76, 60, 0.18)',
              border: '1px solid rgba(231, 76, 60, 0.45)',
              padding: '6px 8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={18} color="#FF4757" className="animate-pulse" />
            </div>
            <div>
              <div style={{
                fontSize: '0.68rem',
                color: '#D4AF37',
                fontWeight: 800,
                letterSpacing: '1.2px',
                textTransform: 'uppercase'
              }}>
                LIMITED 40% OFF SALE
              </div>
              <div style={{
                fontSize: '0.92rem',
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '-0.2px'
              }}>
                Offer Ends In:
              </div>
            </div>
          </div>

          {/* Digital Timer Unit Blocks (6 Days Flash Sale) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            
            {/* Days Block */}
            <div style={{
              backgroundColor: '#162330',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '8px',
              padding: '4px 8px',
              textAlign: 'center',
              minWidth: '44px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                fontWeight: 900,
                color: '#D4AF37',
                lineHeight: 1.1
              }}>
                {formatNum(timeLeft.days)}
              </div>
              <div style={{ fontSize: '0.52rem', color: '#D4AF37', fontWeight: 800, letterSpacing: '0.5px' }}>
                DAYS
              </div>
            </div>

            <span style={{ color: '#D4AF37', fontWeight: 900, fontSize: '1.1rem' }}>:</span>

            {/* Hours Block */}
            <div style={{
              backgroundColor: '#162330',
              border: '1px solid rgba(182, 154, 99, 0.35)',
              borderRadius: '8px',
              padding: '4px 8px',
              textAlign: 'center',
              minWidth: '44px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.1
              }}>
                {formatNum(timeLeft.hours)}
              </div>
              <div style={{ fontSize: '0.52rem', color: '#B69A63', fontWeight: 700, letterSpacing: '0.5px' }}>
                HRS
              </div>
            </div>

            <span style={{ color: '#D4AF37', fontWeight: 900, fontSize: '1.1rem' }}>:</span>

            {/* Minutes Block */}
            <div style={{
              backgroundColor: '#162330',
              border: '1px solid rgba(182, 154, 99, 0.35)',
              borderRadius: '8px',
              padding: '4px 8px',
              textAlign: 'center',
              minWidth: '44px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.1
              }}>
                {formatNum(timeLeft.minutes)}
              </div>
              <div style={{ fontSize: '0.52rem', color: '#B69A63', fontWeight: 700, letterSpacing: '0.5px' }}>
                MIN
              </div>
            </div>

            <span style={{ color: '#D4AF37', fontWeight: 900, fontSize: '1.1rem' }}>:</span>

            {/* Seconds Block */}
            <div style={{
              backgroundColor: '#162330',
              border: '1px solid rgba(182, 154, 99, 0.35)',
              borderRadius: '8px',
              padding: '4px 8px',
              textAlign: 'center',
              minWidth: '44px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                fontWeight: 900,
                color: '#FF6B81',
                lineHeight: 1.1
              }}>
                {formatNum(timeLeft.seconds)}
              </div>
              <div style={{ fontSize: '0.52rem', color: '#B69A63', fontWeight: 700, letterSpacing: '0.5px' }}>
                SEC
              </div>
            </div>

          </div>
        </div>

        {/* Center / Right: Stock Meter & Open Parcel Check Guarantee */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Stock Meter */}
          <div className="desktop-only" style={{ minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px' }}>
              <span style={{ color: '#E0E6ED', fontWeight: 600 }}>Claimed: 89%</span>
              <span style={{ color: '#FF6B81', fontWeight: 700 }}>11 Left</span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '89%',
                height: '100%',
                background: 'linear-gradient(90deg, #D4AF37 0%, #FF4757 100%)',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          {/* Open Parcel Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(46, 213, 115, 0.12)',
            border: '1px solid rgba(46, 213, 115, 0.35)',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#2ED573'
          }}>
            <ShieldCheck size={14} color="#2ED573" />
            <span>Open Parcel Check</span>
          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            onClick={onExploreClick}
            style={{
              backgroundColor: '#B69A63',
              background: 'linear-gradient(135deg, #C5A86F 0%, #A8894E 100%)',
              color: '#0A121A',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.5px',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              boxShadow: '0 2px 8px rgba(182, 154, 99, 0.35)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>SHOP WATCHES</span>
            <ArrowRight size={13} />
          </button>

        </div>

      </div>

      {/* ========================================================
          3. PACKAGING TRANSPARENCY NOTICE (WATCH ONLY, NO BOX)
          ======================================================== */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '10px auto 0 auto',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: '10px',
          padding: '9px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={17} color="#D97706" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.82rem', color: '#92400E', lineHeight: 1.45 }}>
            <strong>📦 Wholesale Packaging Notice:</strong> Direct factory wholesale rates par parcel mein <strong>siraf original watch</strong> safe shock-proof simple protective packing / bubble wrap mein aayegi (Luxury presentation box shamil nahi hai).
          </span>
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#FEF3C7',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 700,
          fontSize: '0.74rem',
          color: '#B45309',
          border: '1px solid #FCD34D',
          whiteSpace: 'nowrap'
        }}>
          <span>Watch Only • Secure Transit Pack</span>
        </div>
      </div>

    </section>
  );
}
