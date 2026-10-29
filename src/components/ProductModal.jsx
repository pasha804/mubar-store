import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Award, Star, CheckCircle, Zap, ShoppingBag, MessageCircle, Package } from 'lucide-react';
import { getWatchWhatsAppUrl } from '../services/whatsappService';

export default function ProductModal({ product, onClose, onQuickBuy, onAddToCart }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');

  if (!product) return null;

  const handleSelectVariant = (v) => {
    setSelectedVariant(v);
    const vImg = product?.variantImages?.[v];
    if (vImg) {
      const idx = product.images.indexOf(vImg);
      if (idx !== -1) {
        setSelectedImg(idx);
      }
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Muhammad Mubashar bhai! I want to order "${product.title}" (${selectedVariant || product.subtitle}) for Rs. ${product.salePrice.toLocaleString()} with 100% Free Nationwide Delivery.`
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0c0c11',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 30px 70px rgba(0,0,0,0.9), 0 0 35px rgba(212, 175, 55, 0.15)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Image Gallery */}
          <div>
            <div style={{
              borderRadius: '14px',
              overflow: 'hidden',
              height: 'clamp(250px, 42vw, 420px)',
              background: '#070709',
              marginBottom: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative'
            }}>
              <img 
                src={product.images[selectedImg]} 
                alt={product.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                background: 'rgba(0,0,0,0.7)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                color: '#aaa',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                Angle {selectedImg + 1} of {product.images.length}
              </div>
            </div>

            {/* 4 Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {product.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt="Thumbnail"
                  onClick={() => setSelectedImg(idx)}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: selectedImg === idx ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                    opacity: selectedImg === idx ? 1 : 0.65,
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {/* Packaging Guarantee Box */}
            <div style={{ marginTop: '18px', padding: '12px 14px', background: 'rgba(212, 175, 55, 0.06)', borderRadius: '10px', border: '1px solid rgba(212, 175, 55, 0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Package size={22} color="#D4AF37" />
              </div>
              <div style={{ fontSize: '0.78rem', color: '#F3E5AB', lineHeight: 1.45 }}>
                <strong style={{ color: '#D4AF37' }}>📦 Packaging Notice (Watch Only Edition):</strong>
                <div style={{ color: '#ccc', marginTop: '2px' }}>
                  Direct factory wholesale rate par <strong>siraf watch</strong> safe shock-proof simple protective packing mein aayegi (Presentation box shamil nahi hai).
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Purchasing */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div>
              {/* Category & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  {product.category}
                </span>
                <span style={{ color: '#555' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F3E5AB', fontSize: '0.82rem' }}>
                  <Star size={14} fill="#D4AF37" color="#D4AF37" />
                  <span>{product.rating} ({product.reviewCount} Verified Reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-cinzel" style={{ fontSize: '1.9rem', color: '#fff', marginBottom: '4px', lineHeight: 1.2 }}>
                {product.title}
              </h2>
              <div style={{ color: '#F3E5AB', fontSize: '0.92rem', marginBottom: '16px', fontWeight: 500 }}>
                {product.subtitle}
              </div>

              {/* Price Banner */}
              <div style={{
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '10px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <span className="font-cinzel" style={{ fontSize: '2.1rem', fontWeight: 800, color: '#F3E5AB' }}>
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.1rem', color: '#8E8E93', textDecoration: 'line-through' }}>
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
                <span style={{ background: '#C0392B', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                  SAVE {discountPercent}%
                </span>
              </div>

              <p style={{ color: '#B0B0B8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {product.description}
              </p>

              {/* Available Color Editions Selector */}
              {product.variants && product.variants.length > 0 && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F3E5AB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Available Color / Edition ({product.variants.length})
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#2ECC71', fontWeight: 600 }}>Click to switch photo</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '8px'
                  }}>
                    {product.variants.map((v, i) => {
                      const vImg = product.variantImages?.[v] || product.images?.[i] || product.images?.[0];
                      const isSelected = selectedVariant === v;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                            background: isSelected ? 'rgba(212, 175, 55, 0.18)' : 'rgba(255,255,255,0.02)',
                            color: isSelected ? '#F3E5AB' : '#bbb',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.18s ease',
                            boxShadow: isSelected ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none'
                          }}
                        >
                          <img 
                            src={vImg} 
                            alt={v}
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '4px',
                              objectFit: 'cover',
                              border: isSelected ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                              flexShrink: 0
                            }}
                          />
                          <div style={{
                            fontSize: '0.72rem',
                            fontWeight: isSelected ? 700 : 500,
                            lineHeight: 1.25,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {v}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '16px',
                marginBottom: '22px'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F3E5AB', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  Horological Specifications
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Movement:</span>
                    <strong style={{ color: '#ddd' }}>{product.specs.movement}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Dimensions:</span>
                    <strong style={{ color: '#ddd' }}>{product.specs.caseDiameter} (Thickness: {product.specs.caseThickness})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Glass:</span>
                    <strong style={{ color: '#ddd' }}>{product.specs.glass}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Water Resistance:</span>
                    <strong style={{ color: '#2ECC71' }}>{product.specs.waterResistance}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Strap / Bracelet:</span>
                    <strong style={{ color: '#ddd' }}>{product.specs.band}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#888' }}>Packaging & Delivery:</span>
                    <strong style={{ color: '#F3E5AB' }}>Safe Simple Protective Pack (Watch Only - Box Not Included)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs & Trust */}
            <div>
              {/* High-Converting Direct WhatsApp Order Button */}
              <a 
                href={getWatchWhatsAppUrl(product, selectedVariant)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  marginBottom: '12px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
                }}
              >
                <MessageCircle size={20} />
                <span>Order This Watch on WhatsApp (Instant Reply)</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <button 
                  className="btn-gold" 
                  onClick={() => {
                    onClose();
                    onQuickBuy({ ...product, preselectedVariant: selectedVariant });
                  }}
                  style={{ padding: '14px 20px', fontSize: '0.88rem' }}
                >
                  <Zap size={16} />
                  <span>Quick Order (Online Payment)</span>
                </button>

                <button 
                  className="btn-outline-gold"
                  onClick={() => {
                    onAddToCart({
                      ...product,
                      selectedVariant: selectedVariant,
                      selectedVariantImage: product.variantImages?.[selectedVariant] || product.images[0]
                    });
                    onClose();
                  }}
                  style={{ padding: '14px 20px', fontSize: '0.88rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#999', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#2ECC71" /> 100% Open Parcel Allowed
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} color="#D4AF37" /> Free Express Shipping
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} color="#E5C378" /> 1-Year Movement Warranty
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
