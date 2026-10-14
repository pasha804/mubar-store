import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.salePrice * item.qty, 0);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}
    onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#0c0c11',
          borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-15px 0 40px rgba(0,0,0,0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#D4AF37" />
            <h3 className="font-cinzel" style={{ fontSize: '1.25rem', color: '#fff' }}>Your Shopping Bag</h3>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.08)',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          fontSize: '0.78rem',
          color: '#F3E5AB',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={16} color="#2ECC71" />
          <span><strong>100% Free Express Shipping Unlocked!</strong> (COD & Online Transfer)</span>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', color: '#888' }}>
              <ShoppingBag size={48} color="#333" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '1rem', color: '#aaa', marginBottom: '8px' }}>Your bag is currently empty.</p>
              <button 
                className="btn-outline-gold"
                onClick={onClose}
                style={{ fontSize: '0.8rem', padding: '8px 16px', marginTop: '10px' }}
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
                  gap: '14px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px'
                }}
              >
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{item.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#D4AF37' }}>{item.subtitle}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', padding: '2px 6px' }}>
                      <button 
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                        style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{item.qty}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="font-cinzel" style={{ fontSize: '1rem', fontWeight: 700, color: '#F3E5AB' }}>
                      Rs. {(item.salePrice * item.qty).toLocaleString()}
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer' }}
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>
              <span>Subtotal:</span>
              <span className="font-cinzel" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F3E5AB' }}>
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.78rem', color: '#2ECC71' }}>
              <span>Nationwide Shipping:</span>
              <span>FREE</span>
            </div>

            <button 
              className="btn-gold" 
              onClick={onCheckout}
              style={{ width: '100%', padding: '14px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Proceed to Checkout (COD / Online)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
