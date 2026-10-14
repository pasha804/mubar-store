import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappNumber = localStorage.getItem('mubar_founder_phone') || "923084453846";
  const defaultText = encodeURIComponent("Assalam-o-Alaikum Muhammad Mubashar bhai! I want to inquire about ordering a MUBAR timepiece (Cash on Delivery or Online Payment).");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultText}`;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 950,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {/* Tooltip */}
      {showTooltip && (
        <div style={{
          background: 'rgba(12, 12, 18, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(46, 204, 113, 0.4)',
          borderRadius: '8px',
          padding: '8px 14px',
          color: '#fff',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
        }}>
          <span className="pulse-dot" />
          <span>Chat with Founder on WhatsApp</span>
          <button 
            onClick={() => setShowTooltip(false)}
            style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer', padding: 0 }}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.65)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.45)';
        }}
        title="Order via WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
