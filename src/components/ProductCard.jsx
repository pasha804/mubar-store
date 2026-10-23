import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Star, ArrowUpRight } from 'lucide-react';
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
    <div 
      className="product-card"
      style={{
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-card, #E6E2DA)',
        borderRadius: 'var(--radius-card, 12px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
      }}
    >
      {/* Top Floating Badges */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        {discountPercent > 0 ? (
          <span className="badge-sale">
            SAVE {discountPercent}%
          </span>
        ) : <div />}

        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          color: 'var(--indicator-green, #237653)',
          fontSize: '0.64rem',
          fontWeight: 700,
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(35, 118, 83, 0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px'
        }}>
          <ShieldCheck size={11} /> Open Parcel
        </span>
      </div>

      {/* Product Image Area */}
      <div 
        onClick={() => onSelectProduct(product)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#F5F4F0',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={`View details for ${product.title}`}
      >
        <img 
          src={product.images[activeImgIndex] || product.images[0]} 
          alt={product.title} 
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Card Body */}
      <div style={{
        padding: 'clamp(10px, 2vw, 16px)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        
        <div>
          {/* Category & Star Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px'
          }}>
            <span style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--text-secondary, #737B84)'
            }}>
              {product.category}
            </span>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              fontSize: '0.72rem',
              color: 'var(--text-secondary, #737B84)',
              fontWeight: 600
            }}>
              <Star size={11} fill="#B69A63" color="#B69A63" />
              <span>{product.rating}</span>
              <span style={{ opacity: 0.7 }}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            style={{
              fontSize: 'clamp(0.86rem, 1.4vw, 0.98rem)',
              fontWeight: 700,
              color: 'var(--text-primary, #252A30)',
              lineHeight: 1.35,
              margin: '0 0 6px 0',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em'
            }}
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Variant Swatches (if available) */}
          {product.variants && product.variants.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '10px',
              overflowX: 'auto',
              paddingBottom: '2px'
            }} className="hide-scrollbar">
              {product.variants.slice(0, 4).map((v, idx) => {
                const isSelected = selectedVariant === v;
                const vThumb = product.variantImages?.[v] || product.images[idx] || product.images[0];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleVariantClick(v, e)}
                    title={v}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      padding: 0,
                      border: isSelected ? '2px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-warm, #E6E2DA)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: isSelected ? '0 0 0 1px #B69A63' : 'none'
                    }}
                  >
                    <img src={vThumb} alt={v} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                );
              })}
              {product.variants.length > 4 && (
                <span style={{ fontSize: '0.64rem', color: 'var(--text-secondary, #737B84)' }}>
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & CTA Controls */}
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-card, #E6E2DA)' }}>
          
          {/* Price Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
            marginBottom: '10px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: 'clamp(0.98rem, 1.6vw, 1.18rem)',
              fontWeight: 800,
              color: 'var(--text-primary, #252A30)'
            }}>
              Rs. {product.salePrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '0.78rem',
                color: 'var(--text-secondary, #737B84)',
                textDecoration: 'line-through'
              }}>
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Card Actions: Primary COD + WhatsApp */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px' }}>
            <button
              onClick={() => onQuickBuy({ ...product, selectedVariant })}
              className="btn-primary"
              style={{
                padding: '8px 10px',
                fontSize: '0.78rem',
                fontWeight: 700,
                minHeight: '36px',
                width: '100%'
              }}
            >
              <span>Order COD</span>
            </button>

            <a
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm, 8px)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Inquire on WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
