import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, Truck, Award, Star, CheckCircle2, 
  ShoppingBag, MessageCircle, Share2, Check, ChevronRight, 
  Package, RefreshCw, Eye, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { PRODUCTS, FOUNDER_CONTACT, REVIEWS } from '../data/products';
import { getWatchWhatsAppUrl } from '../services/whatsappService';
import { trackWhatsAppContact } from '../services/pixelService';
import ProductCard from './ProductCard';

export default function ProductPage({
  productId,
  initialVariant,
  onBackToStore,
  onNavigateToProduct,
  onQuickBuy,
  onAddToCart,
  onOpenCart
}) {
  const product = PRODUCTS.find(p => p.id === productId);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'
  
  // Wheel Rim Studio Filters
  const [rimFilter, setRimFilter] = useState('all');
  const [caliperFilter, setCaliperFilter] = useState('all');

  // Sync state when productId, product or initialVariant changes
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const targetVariant = initialVariant && product.variants?.includes(initialVariant)
        ? initialVariant
        : (product.variants?.[0] || '');
      
      setSelectedVariant(targetVariant);
      
      const vImg = product.variantImages?.[targetVariant];
      if (vImg) {
        const idx = product.images.indexOf(vImg);
        setActiveImgIndex(idx !== -1 ? idx : 0);
      } else {
        setActiveImgIndex(0);
      }
    }
  }, [productId, product?.id, initialVariant]);

  if (!product) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-primary, #F7F5F0)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
          border: '1px solid rgba(182, 154, 99, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <Eye size={28} color="var(--brand-navy, #172A3A)" />
        </div>
        <h2 className="font-playfair" style={{ fontSize: '1.8rem', color: 'var(--brand-navy, #172A3A)', marginBottom: '8px' }}>
          Timepiece Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary, #737B84)', maxWidth: '440px', marginBottom: '24px', fontSize: '0.92rem' }}>
          The requested timepiece could not be located in our active catalog. Explore our complete collection of verified watches.
        </p>
        <button 
          className="btn-primary"
          onClick={() => onBackToStore('catalog')}
          style={{ padding: '12px 26px' }}
        >
          <ArrowLeft size={16} />
          <span>Browse All Watches</span>
        </button>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );
  const savingsAmount = product.originalPrice - product.salePrice;

  const handleVariantSelect = (v) => {
    setSelectedVariant(v);
    const vImg = product.variantImages?.[v];
    if (vImg) {
      const idx = product.images.indexOf(vImg);
      if (idx !== -1) {
        setActiveImgIndex(idx);
      }
    }
  };

  const handleDesignItemClick = (design) => {
    setSelectedVariant(design.name);
    const idx = product.images.indexOf(design.image);
    if (idx !== -1) {
      setActiveImgIndex(idx);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2400);
      });
    }
  };

  // Filter reviews matching this watch or general positive reviews
  const relatedReviews = REVIEWS.filter(r => 
    r.watchBought.toLowerCase().includes(product.title.split(' ')[0].toLowerCase()) ||
    product.title.toLowerCase().includes(r.watchBought.split(' ')[0].toLowerCase())
  ).concat(REVIEWS).slice(0, 4);

  // Other watches from catalog
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // Is this a wheel rim watch?
  const isWheelRim = Boolean(product.designList && product.designList.length > 0);

  // Filter designs if on wheel rim product
  const filteredDesigns = isWheelRim
    ? product.designList.filter(d => {
        const matchesRim = rimFilter === 'all' || d.rim === rimFilter;
        const matchesCaliper = caliperFilter === 'all' || d.caliper === caliperFilter;
        return matchesRim && matchesCaliper;
      })
    : [];

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary, #F7F5F0)',
      color: 'var(--text-primary, #252A30)',
      minHeight: '100vh',
      padding: 'clamp(16px, 3vw, 32px) clamp(16px, 3.5vw, 32px) 80px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Navigation Bar: Breadcrumb + Back + Share */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-warm, #E6E2DA)'
        }}>
          
          {/* Back Button & Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onBackToStore('catalog')}
              style={{
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-card, #E6E2DA)',
                borderRadius: 'var(--radius-sm, 8px)',
                padding: '6px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-primary, #252A30)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Watches</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary, #737B84)' }}>
              <span>Store</span>
              <ChevronRight size={12} />
              <span>{product.category}</span>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--brand-navy, #172A3A)', fontWeight: 600, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.title}
              </span>
            </div>
          </div>

          {/* Share Link Button */}
          <button
            onClick={handleCopyLink}
            style={{
              backgroundColor: copiedLink ? 'rgba(35, 118, 83, 0.12)' : 'var(--bg-card, #FFFFFF)',
              border: copiedLink ? '1px solid var(--indicator-green, #237653)' : '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-sm, 8px)',
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: copiedLink ? 'var(--indicator-green, #237653)' : 'var(--text-secondary, #737B84)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Watch'}</span>
          </button>

        </div>

        {/* Main Two-Column Showcase Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
          marginBottom: '48px'
        }}>
          
          {/* ========================================================
              LEFT COLUMN: High-Resolution Gallery & Angle Selector
              ======================================================== */}
          <div>
            {/* Main Image Frame */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-card, 12px)',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-card, #E6E2DA)',
              boxShadow: 'var(--shadow-card)',
              aspectRatio: '1 / 1',
              width: '100%',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                key={product.images[activeImgIndex] || activeImgIndex}
                src={product.images[activeImgIndex] || product.images[0]} 
                alt={`${product.title} - ${selectedVariant || ''}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.25s ease'
                }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {/* Overlaid Badges */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                zIndex: 2
              }}>
                <span className="badge-sale">
                  SAVE {discountPercent}% (Rs. {savingsAmount.toLocaleString()} OFF)
                </span>

                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--indicator-green, #237653)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(35, 118, 83, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  <ShieldCheck size={13} /> Open Parcel Check
                </span>
              </div>

              {/* Active Angle Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(23, 42, 58, 0.88)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)'
              }}>
                Angle {activeImgIndex + 1} of {product.images.length}
              </div>
            </div>

            {/* Thumbnails Angle Strip with Fast Horizontal Scroll */}
            <div 
              className="hide-scrollbar"
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '6px',
                marginBottom: '18px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {product.images.map((img, idx) => {
                const isActive = activeImgIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    aria-label={`View photo angle ${idx + 1}`}
                    style={{
                      width: '64px',
                      height: '64px',
                      flexShrink: 0,
                      borderRadius: 'var(--radius-sm, 8px)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isActive ? '2px solid var(--accent-gold, #B69A63)' : '1px solid var(--border-card, #E6E2DA)',
                      padding: 0,
                      backgroundColor: '#FFFFFF',
                      opacity: isActive ? 1 : 0.7,
                      boxShadow: isActive ? '0 0 0 2px rgba(182, 154, 99, 0.35)' : 'none',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Angle ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>

            {/* Wholesale Simple Packaging Notice (Watch Only, Box Not Included) */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Package size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', color: '#92400E', lineHeight: 1.45 }}>
                <strong style={{ color: '#B45309' }}>📦 Packaging Notice (Watch Only Edition):</strong>
                <span style={{ display: 'block', marginTop: '3px', color: '#78350F' }}>
                  Direct wholesale discount par parcel mein <strong>siraf original watch</strong> safe shock-proof simple protective packing / bubble wrap mein deliver hogi (Luxury presentation box shamil nahi hai).
                </span>
                <span style={{ display: 'block', marginTop: '4px', fontSize: '0.78rem', color: '#92400E' }}>
                  ✓ 1-Year Movement Warranty Card included • ✓ 100% Open Parcel Doorstep Inspection
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Pricing, Design Picker, and Purchasing Actions
              ======================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Category & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.74rem',
                color: 'var(--text-secondary, #737B84)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 700
              }}>
                {product.category}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-primary, #252A30)', fontWeight: 600 }}>
                <Star size={13} fill="#B69A63" color="#B69A63" />
                <span>{product.rating}</span>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>({product.reviewCount} Verified Reviews)</span>
              </div>
            </div>

            {/* Watch Title */}
            <h1 
              className="font-playfair"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: 'var(--brand-navy, #172A3A)',
                lineHeight: 1.25,
                margin: '0 0 6px 0',
                fontWeight: 700
              }}
            >
              {product.title}
            </h1>

            <p style={{
              fontSize: '0.92rem',
              color: 'var(--accent-gold, #B69A63)',
              margin: '0 0 16px 0',
              fontWeight: 600
            }}>
              {product.subtitle}
            </p>

            {/* Pricing Box */}
            <div style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '16px 20px',
              marginBottom: '18px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 800, color: 'var(--brand-navy, #172A3A)' }}>
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.05rem', color: 'var(--text-secondary, #737B84)', textDecoration: 'line-through' }}>
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
                <span className="badge-sale">
                  SAVE {discountPercent}%
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: 'var(--indicator-green, #237653)', flexWrap: 'wrap', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} /> Free Express Delivery (Rs. 0)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> 100% Secure Online Payment (WhatsApp Verified)
                </span>
              </div>
            </div>

            {/* Strap / Chain Edition Quick Toggle if Wheel Rim Watch */}
            {isWheelRim && (
              <div style={{
                backgroundColor: 'rgba(23, 42, 58, 0.04)',
                border: '1px solid var(--border-warm, #E6E2DA)',
                borderRadius: 'var(--radius-card, 12px)',
                padding: '12px 16px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-navy, #172A3A)' }}>
                  Band Style:
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (product.id !== 'apex-wheel-rim-chain') {
                        onNavigateToProduct('apex-wheel-rim-chain');
                      }
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: product.id === 'apex-wheel-rim-chain' ? '2px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                      backgroundColor: product.id === 'apex-wheel-rim-chain' ? 'var(--brand-navy, #172A3A)' : '#FFFFFF',
                      color: product.id === 'apex-wheel-rim-chain' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Solid Steel Chain (Rs. 2,499)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (product.id !== 'apex-wheel-rim-strap') {
                        onNavigateToProduct('apex-wheel-rim-strap');
                      }
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: product.id === 'apex-wheel-rim-strap' ? '2px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                      backgroundColor: product.id === 'apex-wheel-rim-strap' ? 'var(--brand-navy, #172A3A)' : '#FFFFFF',
                      color: product.id === 'apex-wheel-rim-strap' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Silicone Sport Strap (Rs. 2,199)
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                WHEEL RIM SPECIAL: Interactive 12-Design Showcase Studio
                ======================================================== */}
            {isWheelRim ? (
              <div style={{
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '2px solid var(--accent-gold, #B69A63)',
                borderRadius: 'var(--radius-card, 12px)',
                padding: '16px',
                marginBottom: '20px',
                boxShadow: '0 4px 18px rgba(182, 154, 99, 0.12)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="var(--accent-gold, #B69A63)" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Choose From All 12 Wheel Designs
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                    color: 'var(--brand-navy, #172A3A)',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    {filteredDesigns.length} in stock
                  </span>
                </div>

                {/* Selected Design Callout */}
                <div style={{
                  backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                  borderRadius: 'var(--radius-sm, 8px)',
                  padding: '8px 12px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Check size={14} color="var(--indicator-green, #237653)" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #737B84)' }}>Active Selection:</span>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--brand-navy, #172A3A)' }}>
                    {selectedVariant}
                  </strong>
                </div>

                {/* Filter Row 1: Rim Architecture */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary, #737B84)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    1. Rim Spoke Architecture:
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { key: 'all', label: 'All Rims (12)' },
                      { key: 'Vortex Turbofan', label: '🌪️ Vortex Turbofan' },
                      { key: 'Twin-Fin Split', label: '⚡ Twin-Fin Split' },
                      { key: '5-Spoke Deep Dish GT', label: '🏎️ 5-Spoke Deep Dish' }
                    ].map(f => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setRimFilter(f.key)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: rimFilter === f.key ? 700 : 500,
                          cursor: 'pointer',
                          border: rimFilter === f.key ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                          backgroundColor: rimFilter === f.key ? 'var(--brand-navy, #172A3A)' : '#FFFFFF',
                          color: rimFilter === f.key ? '#FFFFFF' : 'var(--text-primary, #252A30)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Row 2: Caliper Color */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary, #737B84)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    2. Racing Caliper Color:
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                      { key: 'all', label: 'All Colors' },
                      { key: 'Sport Red', label: '🔴 Sport Red Brembo' },
                      { key: 'Nitro Blue', label: '🔵 Nitro Blue Brembo' },
                      { key: 'Lime Green', label: '🟢 Lime Green Turbo' },
                      { key: 'Speed Yellow', label: '🟡 Speed Yellow Brembo' }
                    ].map(f => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setCaliperFilter(f.key)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: caliperFilter === f.key ? 700 : 500,
                          cursor: 'pointer',
                          border: caliperFilter === f.key ? '1.5px solid var(--accent-gold, #B69A63)' : '1px solid var(--border-card, #E6E2DA)',
                          backgroundColor: caliperFilter === f.key ? 'var(--bg-gold-subtle, #F3EBDD)' : '#FFFFFF',
                          color: caliperFilter === f.key ? 'var(--brand-navy, #172A3A)' : 'var(--text-primary, #252A30)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Design Grid with 1-Click Select */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
                  gap: '8px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}>
                  {filteredDesigns.map((d) => {
                    const isSelected = selectedVariant === d.name;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleDesignItemClick(d)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '8px 6px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid var(--accent-gold, #B69A63)' : '1px solid var(--border-card, #E6E2DA)',
                          backgroundColor: isSelected ? 'rgba(182, 154, 99, 0.08)' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center',
                          position: 'relative',
                          boxShadow: isSelected ? '0 0 0 2px rgba(182, 154, 99, 0.35)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-gold, #B69A63)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}

                        <img 
                          src={d.image} 
                          alt={d.name}
                          style={{
                            width: '56px',
                            height: '56px',
                            objectFit: 'contain',
                            marginBottom: '6px'
                          }}
                          loading="lazy"
                          decoding="async"
                        />

                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-navy, #172A3A)', lineHeight: 1.25, marginBottom: '4px' }}>
                          {d.rim}
                        </div>

                        <span style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: `${d.color}20`,
                          color: d.color === '#F1C40F' ? '#B7950B' : d.color,
                          border: `1px solid ${d.color}40`
                        }}>
                          {d.caliper}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>
            ) : (
              /* Standard Product Color / Variant Swatch Selector */
              product.variants && product.variants.length > 0 && (
                <div style={{
                  backgroundColor: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-card, #E6E2DA)',
                  borderRadius: 'var(--radius-card, 12px)',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-navy, #172A3A)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      Select Edition / Color
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold, #B69A63)', fontWeight: 600 }}>
                      {selectedVariant}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '8px'
                  }}>
                    {product.variants.map((v, i) => {
                      const isSelected = selectedVariant === v;
                      const vImg = product.variantImages?.[v] || product.images?.[i] || product.images?.[0];
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleVariantSelect(v)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 8px',
                            borderRadius: 'var(--radius-sm, 8px)',
                            border: isSelected ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                            backgroundColor: isSelected ? 'var(--bg-subtle, #F0EEE8)' : '#FFFFFF',
                            color: 'var(--text-primary, #252A30)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <img 
                            src={vImg} 
                            alt={v}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '4px',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                            loading="lazy"
                            decoding="async"
                          />
                          <span style={{
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
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            )}

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              
              {/* Button 1: Immediate Online Checkout */}
              <button
                className="btn-primary"
                onClick={() => onQuickBuy({ ...product, selectedVariant })}
                style={{
                  padding: '14px 20px',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  width: '100%',
                  minHeight: '48px',
                  boxShadow: '0 4px 16px rgba(23, 42, 58, 0.25)'
                }}
              >
                <span>ORDER NOW — FREE EXPRESS SHIPPING</span>
              </button>

              {/* Button 2: WhatsApp Direct Order */}
              <a
                href={getWatchWhatsAppUrl(product, selectedVariant)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppContact(product?.title, product?.salePrice)}
                className="btn-whatsapp"
                style={{
                  width: '100%',
                  minHeight: '46px',
                  fontSize: '0.9rem'
                }}
              >
                <MessageCircle size={18} />
                <span>Order on WhatsApp (Instant Confirmation)</span>
              </a>

              {/* Button 3: Add to Bag */}
              <button
                className="btn-outline"
                onClick={() => {
                  onAddToCart({
                    ...product,
                    selectedVariant: selectedVariant,
                    selectedVariantImage: product.variantImages?.[selectedVariant] || product.images[0]
                  });
                  onOpenCart();
                }}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  fontSize: '0.86rem'
                }}
              >
                <ShoppingBag size={16} />
                <span>Add to Shopping Bag</span>
              </button>

            </div>

            {/* 4 Trust Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              borderTop: '1px solid var(--border-warm, #E6E2DA)',
              paddingTop: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--indicator-green, #237653)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--brand-navy, #172A3A)', display: 'block' }}>Open Parcel Guarantee</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>Rider ke samne check karein, tasalli ke baad cash dein</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Truck size={18} color="var(--brand-navy, #172A3A)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--brand-navy, #172A3A)', display: 'block' }}>Free Express Delivery</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>2–3 Business Days across Pakistan via Trax/Leopards</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Award size={18} color="var(--accent-gold, #B69A63)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--brand-navy, #172A3A)', display: 'block' }}>1-Year Movement Warranty</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>Internal quartz machine & timekeeping accuracy</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <RefreshCw size={18} color="var(--brand-navy, #172A3A)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--brand-navy, #172A3A)', display: 'block' }}>7-Day Easy Exchange</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)' }}>Hassle-free replacement if you want another color or model</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specifications & Customer Reviews */}
        <div style={{
          backgroundColor: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-card, #E6E2DA)',
          borderRadius: 'var(--radius-card, 12px)',
          padding: 'clamp(18px, 3.5vw, 32px)',
          marginBottom: '56px',
          boxShadow: 'var(--shadow-card)'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid var(--border-warm, #E6E2DA)',
            paddingBottom: '14px',
            marginBottom: '22px'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              style={{
                backgroundColor: activeTab === 'specs' ? 'var(--brand-navy, #172A3A)' : 'transparent',
                color: activeTab === 'specs' ? '#FFFFFF' : 'var(--text-secondary, #737B84)',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Watch Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              style={{
                backgroundColor: activeTab === 'reviews' ? 'var(--brand-navy, #172A3A)' : 'transparent',
                color: activeTab === 'reviews' ? '#FFFFFF' : 'var(--text-secondary, #737B84)',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* TAB 1: Specs */}
          {activeTab === 'specs' && product.specs && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              {Object.entries(product.specs).map(([key, value]) => {
                const labelMap = {
                  movement: 'Movement',
                  caseDiameter: 'Case Diameter',
                  caseThickness: 'Case Thickness',
                  band: 'Band / Strap',
                  glass: 'Glass Crystal',
                  waterResistance: 'Water Resistance',
                  features: 'Special Features'
                };
                return (
                  <div 
                    key={key}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                      borderRadius: 'var(--radius-sm, 8px)'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-secondary, #737B84)', fontWeight: 700, marginBottom: '2px' }}>
                      {labelMap[key] || key}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-primary, #252A30)', fontWeight: 600 }}>
                      {value}
                    </div>
                  </div>
                );
              })}
              {/* Packaging Specification Card */}
              <div 
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: 'var(--radius-sm, 8px)'
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#B45309', fontWeight: 700, marginBottom: '2px' }}>
                  Packaging & Delivery
                </div>
                <div style={{ fontSize: '0.84rem', color: '#92400E', fontWeight: 600 }}>
                  Safe Simple Protective Packaging (Watch Only — Presentation Box Not Included)
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Reviews */}
          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {relatedReviews.map((rev, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                    borderRadius: 'var(--radius-sm, 8px)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--brand-navy, #172A3A)' }}>{rev.name}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #737B84)' }}>({rev.city})</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#B69A63" color="#B69A63" />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-primary, #252A30)', margin: 0, lineHeight: 1.5 }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* You May Also Like / Related Watches */}
        <div>
          <h3 
            className="font-playfair"
            style={{
              fontSize: '1.4rem',
              color: 'var(--brand-navy, #172A3A)',
              marginBottom: '16px',
              fontWeight: 700
            }}
          >
            More From The MUBAR Collection
          </h3>

          <div className="catalog-product-grid">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id}
                product={p}
                onSelectProduct={(item, variant) => onNavigateToProduct(item.id, variant)}
                onQuickBuy={onQuickBuy}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
