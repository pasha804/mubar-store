import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageCircle, Star, Eye } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';

export default function ProductCard({ product, onSelectProduct, onQuickBuy }) {
  const initialVariant = product?.variants?.[0] || '';
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [activeImage, setActiveImage] = useState(() => {
    return (product?.variantImages && product.variantImages[initialVariant]) 
      || product?.images?.[0] 
      || '';
  });

  // Keep state in sync if product prop changes
  useEffect(() => {
    if (product) {
      const firstVar = product.variants?.[0] || '';
      setSelectedVariant(firstVar);
      const img = (product.variantImages && product.variantImages[firstVar]) || product.images?.[0] || '';
      setActiveImage(img);
    }
  }, [product?.id]);

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const handleVariantClick = (v, e) => {
    e.stopPropagation();
    setSelectedVariant(v);
    const targetImg = product.variantImages?.[v];
    if (targetImg) {
      setActiveImage(targetImg);
    }
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product, selectedVariant);
    }
  };

  return (
    <div 
      className="product-card"
      onClick={handleCardClick}
      style={{
        backgroundColor: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-card, #E6E2DA)',
        borderRadius: 'var(--radius-card, 12px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
      }}
    >
      {/* Boutique Hanging Sale Tag */}
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
          padding: '2px 7px',
          borderRadius: '4px',
          border: '1px solid rgba(35, 118, 83, 0.22)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
        }}>
          <ShieldCheck size={11} /> Open Parcel Check
        </span>
      </div>

      {/* Interactive Image Container with Fast Response */}
      <div 
        className="product-card__image-container"
        title={`View ${product.title} - ${selectedVariant || ''}`}
      >
        <img 
          src={activeImage || product?.images?.[0]} 
          alt={`${product.title} - ${selectedVariant || ''}`} 
          className="product-card__image-primary"
          loading="lazy"
          decoding="async"
        />

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
              handleCardClick();
            }}
            style={{
              width: '100%',
              backgroundColor: 'rgba(23, 42, 58, 0.94)',
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <Eye size={13} />
            <span>View Watch Details</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div style={{
        padding: 'clamp(12px, 2vw, 16px)',
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
              gap: '3px',
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
            style={{
              fontSize: 'clamp(0.88rem, 1.4vw, 0.98rem)',
              fontWeight: 700,
              color: 'var(--text-primary, #252A30)',
              lineHeight: 1.35,
              margin: '0 0 6px 0',
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

          {/* Active Variant Label */}
          {selectedVariant && (
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--accent-gold, #B69A63)',
              fontWeight: 600,
              marginBottom: '6px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {selectedVariant.replace(/\([^)]*\)/g, '').trim()}
            </div>
          )}

          {/* Color Edition Swatches with Instant Switching */}
          {product.variants && product.variants.length > 0 && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
                overflowX: 'auto',
                paddingBottom: '2px'
              }} 
              className="hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.slice(0, 5).map((v, idx) => {
                const isSelected = selectedVariant === v;
                const vThumb = product.variantImages?.[v] || product.images?.[idx] || product.images?.[0];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleVariantClick(v, e)}
                    onMouseEnter={() => {
                      const img = product.variantImages?.[v];
                      if (img) setActiveImage(img);
                    }}
                    title={`Select ${v}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      padding: 0,
                      border: isSelected ? '2px solid var(--accent-gold, #B69A63)' : '1px solid var(--border-warm, #E6E2DA)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: isSelected ? '0 0 0 2px rgba(182, 154, 99, 0.4), 0 2px 6px rgba(0,0,0,0.15)' : 'none',
                      transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img 
                      src={vThumb} 
                      alt={v} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
              {product.variants.length > 5 && (
                <button
                  type="button"
                  onClick={handleCardClick}
                  style={{
                    background: 'var(--bg-gold-subtle, #F3EBDD)',
                    border: '1px solid rgba(182, 154, 99, 0.4)',
                    color: 'var(--brand-navy, #172A3A)',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                  title="View all designs"
                >
                  +{product.variants.length - 5} designs
                </button>
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
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: 800,
              color: 'var(--brand-navy, #172A3A)'
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
            <span style={{
              fontSize: '0.64rem',
              color: 'var(--indicator-green, #237653)',
              fontWeight: 700,
              marginLeft: 'auto'
            }}>
              Free Shipping
            </span>
          </div>

          {/* Action Row: Order Online + WhatsApp */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickBuy({ ...product, selectedVariant });
              }}
              className="btn-primary"
              style={{
                padding: '8px 10px',
                fontSize: '0.78rem',
                fontWeight: 700,
                minHeight: '36px',
                width: '100%'
              }}
            >
              <span>Order Now</span>
            </button>

            <a
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
                flexShrink: 0,
                transition: 'transform 0.15s ease'
              }}
              title="Order / Inquire on WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
