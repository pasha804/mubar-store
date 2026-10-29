import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { LIVE_SALES_NOTIFICATIONS } from '../data/products';

export default function LiveSalesToaster() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If mobile, never trigger or show toaster
    if (isMobile) {
      setVisible(false);
      return;
    }

    // Show first after 4 seconds on Desktop
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % LIVE_SALES_NOTIFICATIONS.length);
        setVisible(true);
      }, 1000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isMobile]);

  // NEVER render on mobile screens
  if (!visible || isMobile) return null;

  const item = LIVE_SALES_NOTIFICATIONS[currentIdx];

  return (
    <div 
      className="live-sales-toaster"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 900,
      background: 'rgba(12, 12, 18, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 175, 55, 0.35)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.15)',
      borderRadius: '12px',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '360px',
      animation: 'slideUp 0.4s ease-out'
    }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'rgba(212, 175, 55, 0.15)',
        border: '1px solid #D4AF37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <ShoppingBag size={18} color="#F3E5AB" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#2ECC71', fontWeight: 600 }}>
          <CheckCircle2 size={12} />
          <span>Verified Online Order (WhatsApp Confirmed)</span>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '1px' }}>
          {item.name} <span style={{ color: '#888', fontWeight: 400 }}>({item.city})</span>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#F3E5AB' }}>
          Purchased {item.item}
        </div>
        <div style={{ fontSize: '0.68rem', color: '#666', marginTop: '2px' }}>
          {item.time}
        </div>
      </div>
    </div>
  );
}
