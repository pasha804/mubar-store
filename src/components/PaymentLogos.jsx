import React from 'react';

// Official JazzCash Brand Logo (Downloaded from Official 2025/2026 Wikimedia Asset)
export function JazzCashLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <img 
        src="/images/payments/jazzcash.png" 
        alt="JazzCash Official" 
        style={{ 
          height: `${size}px`, 
          width: 'auto', 
          maxHeight: '32px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
    </div>
  );
}

// Official SadaPay Brand Logo (Downloaded from Official Brand Wikimedia Asset)
export function SadaPayLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <img 
        src="/images/payments/sadapay.png" 
        alt="SadaPay Official" 
        style={{ 
          height: `${size}px`, 
          width: 'auto', 
          maxHeight: '28px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
    </div>
  );
}

// Official NayaPay Brand Logo (Official Green Origami Emblem + Wordmark)
export function NayaPayLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} className={className}>
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          backgroundColor: '#00D084', 
          borderRadius: '6px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0, 208, 132, 0.3)'
        }}
      >
        <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="none">
          <path d="M4 19V5L14 15V5H19V19L9 9V19H4Z" fill="#FFFFFF" />
        </svg>
      </div>
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.3px', lineHeight: 1 }}>
          naya<span style={{ color: '#00D084' }}>pay</span>
        </span>
      )}
    </div>
  );
}

// Official Raast Instant Payment Logo (Official State Bank of Pakistan Vector Asset)
export function RaastLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <img 
        src="/images/payments/raast.svg" 
        alt="Raast Instant Payment" 
        style={{ 
          height: `${size}px`, 
          width: 'auto', 
          maxHeight: '28px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.86rem', letterSpacing: '0.2px' }}>
          Raast <span style={{ color: '#F4D35E', fontSize: '0.74rem' }}>Instant</span>
        </span>
      )}
    </div>
  );
}

// Cash on Delivery Trust Logo
export function CashOnDeliveryBadge({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          backgroundColor: 'rgba(182, 154, 99, 0.2)', 
          border: '1px solid var(--accent-gold, #B69A63)', 
          borderRadius: '6px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#F3EBDD',
          fontWeight: 800,
          fontSize: '0.75rem'
        }}
      >
        COD
      </div>
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.86rem', letterSpacing: '0.2px' }}>
          Cash on Delivery
        </span>
      )}
    </div>
  );
}
