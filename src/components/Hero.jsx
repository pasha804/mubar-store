import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section 
      style={{
        backgroundColor: 'transparent',
        padding: 'clamp(12px, 2.5vw, 24px) clamp(12px, 3vw, 24px)',
        position: 'relative'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: 'var(--radius-card, 12px)',
          overflow: 'hidden',
          border: '1px solid var(--border-warm, #E6E2DA)',
          boxShadow: '0 4px 20px rgba(23, 42, 58, 0.08)',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer'
        }}
        onClick={onExploreClick}
        title="View MUBAR Special Offers"
      >
        {/* The Master Promotional Offer Banner Image */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img 
            src="/images/branding/mubar_promo_banner.jpg" 
            alt="MUBAR Watches Pakistan - Special Collection Offer - Up to 40% Off" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '440px',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Quick Floating Action Bar on Mobile / Desktop */}
          <div 
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onExploreClick) onExploreClick();
              }}
              className="btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                minHeight: '38px',
                backgroundColor: 'rgba(23, 42, 58, 0.95)'
              }}
            >
              <span>EXPLORE WATCHES</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
