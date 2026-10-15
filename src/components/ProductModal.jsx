import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Award, Star, CheckCircle, Zap, ShoppingBag, MessageCircle } from 'lucide-react';

export default function ProductModal({ product, onClose, onQuickBuy, onAddToCart }) {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Muhammad Mubashar bhai! I want to order "${product.title}" (${product.subtitle}) for Rs. ${product.salePrice.toLocaleString()} with 100% Free Nationwide Delivery.`
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
            <div style={{ marginTop: '18px', padding: '14px', background: 'rgba(212, 175, 55, 0.06)', borderRadius: '10px', border: '1px solid rgba(212, 175, 55, 0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/images/branding/watch_box_unboxing.jpg" alt="Box" style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ fontSize: '0.8rem', color: '#F3E5AB' }}>
                <strong>Complimentary Luxury Box Set:</strong> Protective hard presentation box, plush velvet cushion, and 100% safe transit packing included free!
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
                    <span style={{ color: '#888' }}>Unboxing Packaging:</span>
                    <strong style={{ color: '#F3E5AB' }}>{product.specs.packaging}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs & Trust */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <button 
                  className="btn-gold" 
                  onClick={() => {
                    onClose();
                    onQuickBuy(product);
                  }}
                  style={{ padding: '14px 20px', fontSize: '0.88rem' }}
                >
                  <Zap size={16} />
                  <span>Quick Order (COD / Online)</span>
                </button>

                <button 
                  className="btn-outline-gold"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  style={{ padding: '14px 16px', fontSize: '0.85rem' }}
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
