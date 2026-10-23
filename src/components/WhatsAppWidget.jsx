import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppNumber } from '../services/whatsappService';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappNumber = getWhatsAppNumber();
  const defaultText = encodeURIComponent("Assalam-o-Alaikum! Main MUBAR store se watches check kar raha tha. Kindly mujhse connect karein aur real unboxing videos share karein. Shukriya!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultText}`;

  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(16px, 3vw, 24px)',
      right: 'clamp(14px, 3vw, 24px)',
      zIndex: 950,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="whatsapp-tooltip"
          style={{
            backgroundColor: 'var(--brand-navy, #172A3A)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-sm, 8px)',
            padding: '7px 12px',
            color: '#FFFFFF',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}
        >
          <span>Chat with MUBAR on WhatsApp</span>
          <button 
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss tooltip"
            style={{ background: 'none', border: 'none', color: '#D4D9DF', cursor: 'pointer', padding: 0, display: 'flex' }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.06)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
        }}
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
