import React, { useState } from 'react';
import { Eye, Zap, Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';

export default function ProductCard({ product, onSelectProduct, onQuickBuy }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');

  const handleVariantClick = (v, e) => {
    e.stopPropagation();
    setSelectedVariant(v);
    const vImg = product?.variantImages?.[v];
    if (vImg) {
      const idx = product.images.indexOf(vImg);
      if (idx !== -1) {
        setActiveImgIndex(idx);
      }
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.025)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}
    className="product-hover-card"
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
      e.currentTarget.style.boxShadow = '0 16px 35px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.15)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      
      {/* Top Badges */}
      <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', zIndex: 5, pointerEvents: 'none' }}>
        <span style={{
          background: 'linear-gradient(90deg, #E74C3C 0%, #C0392B 100%)',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: '4px',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(231, 76, 60, 0.4)'
        }}>
          SAVE {discountPercent}%
        </span>

        {product.badge && (
          <span style={{
            background: 'rgba(7, 7, 9, 0.88)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#F3E5AB',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '12px'
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Main Image View */}
      <div 
        onClick={() => onSelectProduct(product)}
        style={{ position: 'relative', height: 'clamp(260px, 45vw, 330px)', cursor: 'pointer', overflow: 'hidden', background: '#0a0a0d' }}
      >
        <img 
          src={product.images[activeImgIndex]} 
          alt={product.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.25s ease'
          }}
        />

        {/* View Details Overlay on Hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s ease'
        }}
        className="card-overlay"
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
        >
          <div style={{ background: 'rgba(7, 7, 9, 0.9)', border: '1px solid #D4AF37', color: '#F3E5AB', padding: '9px 18px', borderRadius: '25px', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
            <Eye size={15} />
            <span>View 4 Angles & Specs</span>
          </div>
        </div>
      </div>

      {/* 4-Shot Thumbnail Selector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.35)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        {product.images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Angle ${idx+1}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgIndex(idx);
            }}
            style={{
              width: '100%',
              height: '48px',
              objectFit: 'cover',
              borderRadius: '4px',
              cursor: 'pointer',
              border: activeImgIndex === idx ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
              opacity: activeImgIndex === idx ? 1 : 0.65,
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>

      {/* Product Details */}
      <div style={{ padding: 'clamp(16px, 3.5vw, 22px)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        
        <div>
          {/* Category & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              {product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F3E5AB', fontSize: '0.78rem' }}>
              <Star size={13} fill="#D4AF37" color="#D4AF37" />
              <span>{product.rating}</span>
              <span style={{ color: '#666' }}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-cinzel" 
            style={{ fontSize: '1.22rem', color: '#fff', cursor: 'pointer', lineHeight: 1.3, marginBottom: '4px' }}
          >
            {product.title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#D4AF37', marginBottom: '10px', fontWeight: 500 }}>
            {product.subtitle}
          </p>

          {/* Color Edition Swatches */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.68rem', color: '#888' }}>Colors:</span>
              {product.variants.slice(0, 4).map((v, i) => {
                const isSelected = selectedVariant === v;
                const vImg = product.variantImages?.[v] || product.images?.[i] || product.images?.[0];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => handleVariantClick(v, e)}
                    title={v}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '2px',
                      borderRadius: '5px',
                      border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.12)',
                      background: isSelected ? 'rgba(212, 175, 55, 0.25)' : 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img 
                      src={vImg} 
                      alt={v} 
                      style={{ width: '22px', height: '22px', borderRadius: '3px', objectFit: 'cover' }} 
                    />
                  </button>
                );
              })}
              {product.variants.length > 4 && (
                <span style={{ fontSize: '0.68rem', color: '#D4AF37' }}>+{product.variants.length - 4}</span>
              )}
            </div>
          )}

          {/* Flash Sale Stock Claim Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', color: '#aaa' }}>
              <span>Flash Sale Claimed:</span>
              <strong style={{ color: '#FF7675' }}>{product.soldPercent}% Sold</strong>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${product.soldPercent}%`, height: '100%', background: 'linear-gradient(90deg, #E74C3C 0%, #D4AF37 100%)', borderRadius: '3px' }} />
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
            <span className="font-cinzel" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F3E5AB' }}>
              Rs. {product.salePrice.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.92rem', color: '#8E8E93', textDecoration: 'line-through' }}>
              Rs. {product.originalPrice.toLocaleString()}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#2ECC71', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={12} /> Open Parcel
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                textDecoration: 'none',
                padding: '11px 14px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.35)';
              }}
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '8px' }}>
              <button 
                className="btn-gold" 
                onClick={() => onQuickBuy({ ...product, preselectedVariant: selectedVariant })}
                style={{ padding: '9px 12px', fontSize: '0.78rem', width: '100%' }}
              >
                <Zap size={13} />
                <span>Quick COD</span>
              </button>

              <button 
                className="btn-outline-gold"
                onClick={() => onSelectProduct(product)}
                style={{ padding: '9px 10px', fontSize: '0.78rem', width: '100%' }}
              >
                Details
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
