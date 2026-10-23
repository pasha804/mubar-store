import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Hero({ onExploreClick, onSelectFlagship }) {
  // Use Yacht-Master Oysterflex or MEIBO flagship watch as the clean hero photograph
  const featuredProduct = PRODUCTS.find(p => p.id === 'mubar-yachtmaster-oysterflex') || PRODUCTS[0];

  return (
    <section 
      style={{
        backgroundColor: '#F1EFE9', // Light Warm Ivory / Subtle Section Background
        borderBottom: '1px solid var(--border-warm, #E6E2DA)',
        padding: 'clamp(28px, 4.5vw, 48px) clamp(16px, 3.5vw, 32px)',
        position: 'relative'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          alignItems: 'center',
          gap: 'clamp(24px, 4vw, 48px)'
        }}
      >
        {/* Left Column: Restrained Editorial Campaign Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Campaign Eyebrow Label */}
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: 'var(--accent-gold, #B69A63)',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            THE EVERYDAY COLLECTION
          </div>

          {/* Restrained Editorial Headline */}
          <h1 
            className="font-playfair"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--text-primary, #252A30)',
              margin: '0 0 12px 0',
              letterSpacing: '-0.3px'
            }}
          >
            Find Your Everyday Statement.
          </h1>

          {/* Supporting Copy */}
          <p style={{
            fontSize: 'clamp(0.92rem, 1.8vw, 1.02rem)',
            lineHeight: 1.6,
            color: 'var(--text-secondary, #737B84)',
            margin: '0 0 20px 0',
            maxWidth: '480px'
          }}>
            Distinctive styles. Thoughtful details. Watches engineered for every occasion with 100% doorstep open parcel inspection.
          </p>

          {/* CTA & Delivery Trust Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onExploreClick}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight size={15} />
            </button>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #737B84)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck size={14} color="var(--indicator-green, #237653)" />
              <span>Free Delivery across Pakistan</span>
            </span>
          </div>

        </div>

        {/* Right Column: Clean Watch Photograph */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div 
            onClick={() => onSelectFlagship ? onSelectFlagship() : onExploreClick()}
            style={{
              cursor: 'pointer',
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '4 / 3',
              borderRadius: 'var(--radius-card, 12px)',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-card, #E6E2DA)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            title={`View ${featuredProduct.title}`}
          >
            <img 
              src={featuredProduct.images[0]} 
              alt={featuredProduct.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '16px'
              }}
            />

            {/* Subtle Pill Tag */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              border: '1px solid var(--border-card, #E6E2DA)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.74rem',
              color: 'var(--text-primary, #252A30)',
              fontWeight: 600
            }}>
              {featuredProduct.title} · Rs. {featuredProduct.salePrice.toLocaleString()}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
