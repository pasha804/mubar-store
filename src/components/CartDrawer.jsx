import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus, MessageCircle } from 'lucide-react';
import { getCartWhatsAppUrl } from '../services/whatsappService';
import { trackWhatsAppContact, trackInitiateCheckout } from '../services/pixelService';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.salePrice * item.qty, 0);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(17, 25, 35, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: 'min(440px, 100vw)',
          maxWidth: '100vw',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid var(--border-warm, #E6E2DA)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.15)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-warm, #E6E2DA)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--brand-navy, #172A3A)',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--accent-gold, #B69A63)" />
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0, fontWeight: 700 }}>
              Shopping Bag
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--hero-text-secondary, #D4D9DF)' }}>
              ({cartItems.reduce((a, c) => a + c.qty, 0)})
            </span>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close cart"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#FFFFFF', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Trust Banner */}
        <div style={{
          backgroundColor: 'var(--indicator-green-bg, #E8F5EE)',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(35, 118, 83, 0.2)',
          fontSize: '0.78rem',
          color: 'var(--indicator-green, #237653)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600
        }}>
          <ShieldCheck size={16} />
          <span>Free Express Shipping Across Pakistan • Verified Online Payment</span>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 20px', color: 'var(--text-secondary, #737B84)' }}>
              <ShoppingBag size={48} color="var(--border-warm, #E6E2DA)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary, #252A30)', marginBottom: '4px' }}>
                Your shopping bag is empty.
              </p>
              <p style={{ fontSize: '0.84rem', margin: '0 0 16px 0' }}>
                Discover our curated luxury timepieces with free nationwide express delivery.
              </p>
              <button 
                className="btn-primary"
                onClick={onClose}
                style={{ fontSize: '0.82rem', padding: '10px 20px' }}
              >
                Browse Timepieces
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                  border: '1px solid var(--border-card, #E6E2DA)',
                  borderRadius: 'var(--radius-card, 12px)'
                }}
              >
                <img 
                  src={item.selectedVariantImage || item.productImage || item.images[0]} 
                  alt={item.title} 
                  style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-card, #E6E2DA)' }}
                />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.88rem', color: 'var(--text-primary, #252A30)', fontWeight: 700, margin: '0 0 2px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold, #B69A63)', fontWeight: 600 }}>
                      {item.selectedVariant ? `Edition: ${item.selectedVariant}` : item.subtitle}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-card, #E6E2DA)', borderRadius: '4px', padding: '2px 6px' }}>
                      <button 
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                        aria-label="Decrease quantity"
                        style={{ background: 'none', border: 'none', color: 'var(--text-primary, #252A30)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', minWidth: '16px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                        style={{ background: 'none', border: 'none', color: 'var(--text-primary, #252A30)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)' }}>
                      Rs. {(item.salePrice * item.qty).toLocaleString()}
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #737B84)', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px',
            borderTop: '1px solid var(--border-warm, #E6E2DA)',
            backgroundColor: 'var(--bg-primary, #F7F5F0)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem', color: 'var(--text-secondary, #737B84)' }}>
              <span>Subtotal:</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)' }}>
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.78rem', color: 'var(--indicator-green, #237653)', fontWeight: 600 }}>
              <span>Nationwide Express Delivery:</span>
              <span>FREE</span>
            </div>

            {/* Instant Web Order Checkout Form Button */}
            <button 
              className="btn-primary" 
              onClick={() => {
                if (cartItems.length > 0) {
                  trackInitiateCheckout(cartItems[0], subtotal);
                }
                onCheckout();
              }}
              style={{ width: '100%', padding: '13px', fontSize: '0.9rem', marginBottom: '10px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* WhatsApp Order Button */}
            <a 
              href={getCartWhatsAppUrl(cartItems, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppContact('Cart Bag Order', subtotal)}
              className="btn-whatsapp"
              style={{ width: '100%', padding: '12px', fontSize: '0.88rem' }}
            >
              <MessageCircle size={17} />
              <span>Order via WhatsApp (Instant Reply)</span>
            </a>

          </div>
        )}

      </div>
    </div>
  );
}
