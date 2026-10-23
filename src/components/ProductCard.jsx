import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Star, Eye } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';

export default function ProductCard({ product, onSelectProduct, onQuickBuy }) {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');

  // Compute primary image based on selected variant or first image
  const primaryImage = (product?.variantImages && product.variantImages[selectedVariant]) 
    || product?.images?.[0] 
    || '';

  // Find a valid alternate image for the hover swap
  const alternateImage = product?.images?.find(img => img !== primaryImage) || product?.images?.[1] || null;
  const hasSecondary = Boolean(alternateImage && alternateImage !== primaryImage);

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const handleVariantClick = (v, e) => {
    e.stopPropagation();
    setSelectedVariant(v);
  };

  return (
    <div 
      className={`product-card ${hasSecondary ? 'has-secondary' : ''}`}
      style={{
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-card, #E6E2DA)',
        borderRadius: 'var(--radius-card, 12px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      {/* Boutique Hanging Sale Tag with Pendulum Swing Animation */}
      {discountPercent > 0 && (
        <div className="hanging-sale-tag" title={`${discountPercent}% Discount`}>
          <span>{discountPercent}%</span>
          <span style={{ fontSize: '0.52rem', opacity: 0.9 }}>OFF</span>
        </div>
      )}

      {/* Top Right Mini Open Parcel Badge */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        zIndex: 5,
        pointerEvents: 'none'
      }}>
        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          color: 'var(--indicator-green, #237653)',
          fontSize: '0.62rem',
          fontWeight: 700,
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(35, 118, 83, 0.22)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          <ShieldCheck size={10} /> Open Parcel
        </span>
      </div>

      {/* Interactive Image Container with Hover Crossfade */}
      <div 
        className="product-card__image-container"
        onClick={() => onSelectProduct(product)}
        title={`View ${product.title}`}
      >
        <img 
          src={primaryImage} 
          alt={product.title} 
          className="product-card__image-primary"
          loading="lazy"
        />

        {hasSecondary && (
          <img 
            src={alternateImage} 
            alt={`${product.title} - Alternate View`} 
            className="product-card__image-secondary"
            loading="lazy"
          />
        )}

        {/* Hover Quick View Button */}
        <div 
          className="product-card__quick-action"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            zIndex: 4
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            style={{
              width: '100%',
              backgroundColor: 'rgba(23, 42, 58, 0.92)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-sm, 8px)',
              padding: '8px 12px',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <Eye size={13} />
            <span>View Watch</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
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
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            style={{
              fontSize: 'clamp(0.86rem, 1.4vw, 0.96rem)',
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

          {/* Color Edition Swatches */}
          {product.variants && product.variants.length > 0 && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '10px',
                overflowX: 'auto',
                paddingBottom: '2px'
              }} 
              className="hide-scrollbar"
            >
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

        {/* Pricing & Direct Shopping Actions */}
        <div style={{ marginTop: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-card, #E6E2DA)' }}>
          
          {/* Price Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
            marginBottom: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: 'clamp(0.96rem, 1.5vw, 1.15rem)',
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

          {/* Action Row: Order COD + WhatsApp */}
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
