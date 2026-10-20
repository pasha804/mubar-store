import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, Truck, Award, Star, CheckCircle2, 
  Zap, ShoppingBag, MessageCircle, Share2, Copy, Check, 
  Clock, Flame, Eye, ChevronRight, Package, Sparkles, 
  RefreshCw, CheckCircle, Smartphone, ExternalLink
} from 'lucide-react';
import { PRODUCTS, FOUNDER_CONTACT, REVIEWS } from '../data/products';
import { getWatchWhatsAppUrl } from '../services/whatsappService';

export default function ProductPage({
  productId,
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
  const [viewerCount, setViewerCount] = useState(14);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'unboxing'

  // Sync state when productId or product changes
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveImgIndex(0);
      setSelectedVariant(product.variants?.[0] || '');
      // Random realistic live viewers count (11 to 23)
      setViewerCount(Math.floor(Math.random() * 12) + 11);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.1)',
          border: '1.5px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <Eye size={30} color="#D4AF37" />
        </div>
        <h2 className="font-cinzel" style={{ fontSize: '2rem', color: '#fff', marginBottom: '10px' }}>
          Timepiece Not Found
        </h2>
        <p style={{ color: '#8E8E93', maxWidth: '460px', marginBottom: '26px' }}>
          The requested luxury timepiece could not be located in our active vault. Browse our complete curated collection below.
        </p>
        <button 
          className="btn-gold"
          onClick={() => onBackToStore('catalog')}
          style={{ padding: '12px 28px' }}
        >
          <ArrowLeft size={16} />
          <span>Browse All Masterpieces</span>
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
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(16px, 3vw, 30px) clamp(12px, 3vw, 24px) 100px' }}>
      
      {/* Top Navigation Bar: Breadcrumb + Back + Share */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
      }}>
        
        {/* Back Button & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onBackToStore('catalog')}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#F3E5AB',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
              e.currentTarget.style.borderColor = '#D4AF37';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            }}
          >
            <ArrowLeft size={15} />
            <span>All Watches</span>
          </button>

          {/* Breadcrumb Path */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#888' }}>
            <span 
              onClick={() => onBackToStore()} 
              style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >
              Home
            </span>
            <ChevronRight size={13} color="#555" />
            <span 
              onClick={() => onBackToStore('catalog')} 
              style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >
              {product.category}
            </span>
            <ChevronRight size={13} color="#555" />
            <span style={{ color: '#F3E5AB', fontWeight: 600, maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.title}
            </span>
          </div>
        </div>

        {/* Live Viewers & Share Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(231, 76, 60, 0.12)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            color: '#FF7675',
            padding: '5px 11px',
            borderRadius: '20px',
            fontSize: '0.74rem',
            fontWeight: 700
          }}>
            <span className="pulse-dot" style={{ background: '#E74C3C', boxShadow: '0 0 8px #E74C3C' }} />
            <span>🔥 {viewerCount} buyers viewing now</span>
          </div>

          <button
            onClick={handleCopyLink}
            title="Share this timepiece page"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: copiedLink ? '#2ECC71' : '#ccc',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Watch'}</span>
          </button>
        </div>

      </div>

      {/* Main Two-Column Showcase Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'start',
        marginBottom: '60px'
      }}>
        
        {/* Left Column: Multi-Angle Interactive Gallery & Packaging Preview */}
        <div>
          {/* Main Showcase Image Frame */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#09090d',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.12)',
            height: 'clamp(320px, 50vw, 520px)',
            marginBottom: '16px'
          }}>
            <img 
              src={product.images[activeImgIndex]} 
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.25s ease'
              }}
            />

            {/* Overlaid Badges */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 3
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #E74C3C 0%, #C0392B 100%)',
                color: '#fff',
                fontSize: '0.76rem',
                fontWeight: 800,
                padding: '5px 12px',
                borderRadius: '6px',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.45)'
              }}>
                SAVE {discountPercent}% (Rs. {savingsAmount.toLocaleString()} OFF)
              </span>

              {product.badge && (
                <span style={{
                  background: 'rgba(7, 7, 9, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#F3E5AB',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Active Angle Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(6px)',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '0.74rem',
              color: '#F3E5AB',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
              Angle {activeImgIndex + 1} of {product.images.length}
            </div>
          </div>

          {/* Interactive Angle Thumbnails Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${product.images.length}, 1fr)`,
            gap: '10px',
            marginBottom: '20px'
          }}>
            {product.images.map((img, idx) => {
              const isActive = activeImgIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  style={{
                    position: 'relative',
                    height: 'clamp(64px, 9vw, 90px)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.12)',
                    boxShadow: isActive ? '0 0 12px rgba(212, 175, 55, 0.4)' : 'none',
                    opacity: isActive ? 1 : 0.65,
                    transition: 'all 0.2s ease',
                    background: '#0a0a0e'
                  }}
                >
                  <img 
                    src={img} 
                    alt={`View Angle ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Complimentary Presentation Box Card */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <img 
              src="/images/branding/watch_box_unboxing.jpg" 
              alt="Luxury Presentation Box"
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                flexShrink: 0
              }}
            />
            <div style={{ fontSize: '0.82rem', color: '#F3E5AB', lineHeight: 1.45 }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '3px', fontSize: '0.86rem' }}>
                🎁 Complimentary Luxury Presentation Box Set Included:
              </strong>
              Every order arrives in a protective hard-shell watch presentation case with plush velvet pillow & bubble wrap transit protection — 100% Free!
            </div>
          </div>
        </div>

        {/* Right Column: Specifications, Price, Variants & Instant Purchase */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Category, Rating & Authenticity */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{
              fontSize: '0.76rem',
              color: '#D4AF37',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700
            }}>
              {product.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F3E5AB', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', color: '#D4AF37' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              <strong style={{ color: '#fff' }}>{product.rating}</strong>
              <span style={{ color: '#777' }}>({product.reviewCount} Verified Pakistani Buyers)</span>
            </div>
          </div>

          {/* Watch Title & Subtitle */}
          <h1 className="font-cinzel" style={{
            fontSize: 'clamp(1.65rem, 3.2vw, 2.4rem)',
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '6px',
            fontWeight: 800
          }}>
            {product.title}
          </h1>

          <p style={{
            fontSize: '0.94rem',
            color: '#D4AF37',
            marginBottom: '18px',
            fontWeight: 600
          }}>
            {product.subtitle}
          </p>

          {/* Flash Sale Claim Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '6px', color: '#bbb' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Flame size={14} color="#E74C3C" />
                <strong>Flash Sale Demand:</strong>
              </span>
              <strong style={{ color: '#FF7675' }}>
                {product.soldPercent}% Claimed • Only {product.stockCount} Pieces In Stock
              </strong>
            </div>
            <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${product.soldPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #E74C3C 0%, #D4AF37 100%)',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          {/* Pricing Highlight Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(15, 15, 20, 0.95) 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            padding: '18px 22px',
            marginBottom: '22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="font-cinzel" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, color: '#F3E5AB' }}>
                Rs. {product.salePrice.toLocaleString()}
              </span>
              <span style={{ fontSize: '1.2rem', color: '#888', textDecoration: 'line-through' }}>
                Rs. {product.originalPrice.toLocaleString()}
              </span>
              <span style={{
                background: '#C0392B',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}>
                SAVE {discountPercent}%
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#2ECC71', flexWrap: 'wrap', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={15} /> Free Express Delivery (Rs. 0)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={15} /> 100% Cash on Delivery
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            color: '#B8B8C2',
            fontSize: '0.94rem',
            lineHeight: 1.65,
            marginBottom: '22px'
          }}>
            {product.description}
          </p>

          {/* Color / Variant Swatch Selector */}
          {product.variants && product.variants.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F3E5AB', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Select Color / Edition ({product.variants.length} Available)
                </span>
                <span style={{ fontSize: '0.74rem', color: '#2ECC71', fontWeight: 600 }}>
                  Selected: {selectedVariant}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '10px'
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
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSelected ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                        color: isSelected ? '#F3E5AB' : '#bbb',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s ease',
                        boxShadow: isSelected ? '0 0 12px rgba(212, 175, 55, 0.35)' : 'none'
                      }}
                    >
                      <img 
                        src={vImg} 
                        alt={v}
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '5px',
                          objectFit: 'cover',
                          border: isSelected ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
                          flexShrink: 0
                        }}
                      />
                      <div style={{
                        fontSize: '0.74rem',
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

          {/* High-Converting Immediate Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            
            {/* Primary Action 1: Cash On Delivery Fast Checkout */}
            <button
              className="btn-gold"
              onClick={() => onQuickBuy({ ...product, preselectedVariant: selectedVariant })}
              style={{
                padding: '16px 24px',
                fontSize: '1rem',
                fontWeight: 800,
                letterSpacing: '1px',
                boxShadow: '0 8px 30px rgba(212, 175, 55, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Zap size={20} />
              <span>ORDER NOW — CASH ON DELIVERY (COD)</span>
            </button>

            {/* Primary Action 2: WhatsApp Direct Order */}
            <a
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.94rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
              <span>Order on WhatsApp (Instant Reply & Confirmation)</span>
            </a>

            {/* Secondary Action: Add to Bag */}
            <button
              className="btn-outline-gold"
              onClick={() => {
                onAddToCart({
                  ...product,
                  selectedVariant: selectedVariant,
                  selectedVariantImage: product.variantImages?.[selectedVariant] || product.images[0]
                });
                onOpenCart();
              }}
              style={{
                padding: '13px 20px',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShoppingBag size={17} />
              <span>Add to Shopping Bag</span>
            </button>

          </div>

          {/* 4 Guarantees Pillars Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ background: 'rgba(46, 204, 113, 0.12)', padding: '8px', borderRadius: '8px', color: '#2ECC71' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>Open Parcel Guaranteed</strong>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>Pehle parcel khol ke check karein, tasalli ke baad payment dein</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.12)', padding: '8px', borderRadius: '8px', color: '#D4AF37' }}>
                <Truck size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>Free Express Shipping</strong>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2–3 Business Days delivery across all Pakistan via TCS/Trax</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ background: 'rgba(243, 229, 171, 0.12)', padding: '8px', borderRadius: '8px', color: '#F3E5AB' }}>
                <Award size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>1-Year Movement Warranty</strong>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>Full coverage on internal Japanese quartz machine & accuracy</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ background: 'rgba(0, 210, 211, 0.12)', padding: '8px', borderRadius: '8px', color: '#00D2D3' }}>
                <RefreshCw size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>7-Day Easy Exchange</strong>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>Instant doorstep replacement if you want another color or model</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Navigation: Specs, Open Parcel Guide & Buyer Reviews */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: 'clamp(20px, 4vw, 36px)',
        marginBottom: '60px'
      }}>
        
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
          marginBottom: '26px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              background: activeTab === 'specs' ? 'rgba(212, 175, 55, 0.15)' : 'none',
              border: activeTab === 'specs' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === 'specs' ? '#F3E5AB' : '#888',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            Technical Horological Specs
          </button>

          <button
            onClick={() => setActiveTab('unboxing')}
            style={{
              background: activeTab === 'unboxing' ? 'rgba(212, 175, 55, 0.15)' : 'none',
              border: activeTab === 'unboxing' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === 'unboxing' ? '#F3E5AB' : '#888',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            Doorstep Open Parcel Policy
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              background: activeTab === 'reviews' ? 'rgba(212, 175, 55, 0.15)' : 'none',
              border: activeTab === 'reviews' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === 'reviews' ? '#F3E5AB' : '#888',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            Verified Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div>
            <h3 className="font-cinzel" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Master Craftsmanship & Build Specifications
            </h3>
            <p style={{ color: '#888', fontSize: '0.86rem', marginBottom: '24px' }}>
              Every component is hand-inspected in Lahore before sealing into the transit parcel.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '14px'
            }}>
              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Internal Movement</span>
                <div style={{ fontSize: '0.92rem', color: '#eee', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.movement}
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Case Profile & Diameter</span>
                <div style={{ fontSize: '0.92rem', color: '#eee', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.caseDiameter} (Thickness: {product.specs.caseThickness})
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Crystal / Glass</span>
                <div style={{ fontSize: '0.92rem', color: '#eee', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.glass}
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Water Resistance</span>
                <div style={{ fontSize: '0.92rem', color: '#2ECC71', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.waterResistance}
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Strap & Clasp</span>
                <div style={{ fontSize: '0.92rem', color: '#eee', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.band}
                </div>
              </div>

              <div style={{ padding: '14px 18px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>Key Horological Features</span>
                <div style={{ fontSize: '0.92rem', color: '#F3E5AB', fontWeight: 600, marginTop: '4px' }}>
                  {product.specs.features}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Open Parcel Guide */}
        {activeTab === 'unboxing' && (
          <div>
            <h3 className="font-cinzel" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              How MUBAR Open Parcel Delivery Works
            </h3>
            <p style={{ color: '#888', fontSize: '0.86rem', marginBottom: '24px' }}>
              Say goodbye to online shopping anxiety. You never pay before seeing what you ordered.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.2)', color: '#F3E5AB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '12px' }}>
                  1
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.96rem', marginBottom: '6px' }}>Courier Arrival</h4>
                <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Trax / Leopards / TCS rider arrives at your doorstep in 2–3 business days with your sealed package.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.2)', color: '#F3E5AB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '12px' }}>
                  2
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.96rem', marginBottom: '6px' }}>Rider Opens Parcel</h4>
                <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Under our official Open Parcel contract, the rider will open the outer packaging right in front of you.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.2)', color: '#F3E5AB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '12px' }}>
                  3
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.96rem', marginBottom: '6px' }}>Inspect Your Watch</h4>
                <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Examine the luxury hard box, dial, bracelet finish, and exact color edition to your complete satisfaction.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.2)', color: '#2ECC71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '12px' }}>
                  4
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.96rem', marginBottom: '6px' }}>Pay Cash Hand-to-Hand</h4>
                <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Only pay the exact cash amount (Rs. 0 delivery fees). If you are not satisfied, return it right there with zero penalty!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 className="font-cinzel" style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>
                  Real Buyer Experiences Across Pakistan
                </h3>
                <p style={{ color: '#888', fontSize: '0.84rem', margin: '4px 0 0 0' }}>
                  100% verified customer reviews from Lahore, Karachi, Islamabad & beyond.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', color: '#D4AF37' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <span style={{ fontSize: '0.92rem', color: '#F3E5AB', fontWeight: 700 }}>
                  {product.rating} / 5.0
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {relatedReviews.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', color: '#D4AF37' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#777' }}>{rev.date}</span>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: '#ccc', lineHeight: 1.5, marginBottom: '14px', fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block' }}>{rev.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#888' }}>{rev.city}</span>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#2ECC71', fontWeight: 600 }}>
                      <CheckCircle2 size={12} /> Verified Buyer
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Explore Other Masterpieces Section */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '10px' }}>
            <Sparkles size={13} color="#D4AF37" />
            <span style={{ fontSize: '0.72rem', color: '#F3E5AB', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              COMPLEMENTARY HOROLOGY
            </span>
          </div>
          <h2 className="font-cinzel" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '6px' }}>
            EXPLORE MORE <span className="gold-text">TIMEPIECES</span>
          </h2>
          <p style={{ color: '#888', fontSize: '0.86rem' }}>
            Every timepiece backed by our nationwide Open Parcel doorstep inspection standard.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '22px'
        }}>
          {relatedProducts.map(rel => {
            const relDiscount = Math.round(((rel.originalPrice - rel.salePrice) / rel.originalPrice) * 100);
            return (
              <div
                key={rel.id}
                onClick={() => onNavigateToProduct(rel.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <div style={{ height: '220px', background: '#09090d', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={rel.images[0]} 
                    alt={rel.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#C0392B',
                    color: '#fff',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    SAVE {relDiscount}%
                  </span>
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    {rel.category}
                  </div>
                  <h4 className="font-cinzel" style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '6px', lineHeight: 1.3 }}>
                    {rel.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span className="font-cinzel" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F3E5AB' }}>
                      Rs. {rel.salePrice.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#777', textDecoration: 'line-through' }}>
                      Rs. {rel.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#F3E5AB',
                    textAlign: 'center',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    View Dedicated Watch Page →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Mobile Conversion Bar (Visible only on mobile devices) */}
      <div 
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(7, 7, 9, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1.5px solid rgba(212, 175, 55, 0.4)',
          padding: '10px 14px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.85)'
        }}
      >
        <div style={{
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          {/* Price & Title mini preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
            <img 
              src={product.images[activeImgIndex]} 
              alt={product.title} 
              style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #D4AF37', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <div className="font-cinzel" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F3E5AB', lineHeight: 1 }}>
                Rs. {product.salePrice.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#2ECC71', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Open Parcel • Free Delivery
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <a
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#fff',
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
              title="Order on WhatsApp"
            >
              <MessageCircle size={20} />
            </a>

            <button
              onClick={() => onQuickBuy({ ...product, preselectedVariant: selectedVariant })}
              className="btn-gold"
              style={{
                padding: '10px 16px',
                fontSize: '0.8rem',
                fontWeight: 800,
                whiteSpace: 'nowrap'
              }}
            >
              <Zap size={14} />
              <span>ORDER COD</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
