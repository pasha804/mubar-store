import React from 'react';

// Official JazzCash Logo (Red & Yellow JazzCash Brand Asset)
export function JazzCashLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="100" height="100" rx="22" fill="#E30613" />
        {/* Jazz red badge with yellow flame / spark */}
        <circle cx="50" cy="50" r="38" fill="#B3000B" />
        <path d="M48 22L32 52H48L42 78L68 44H52L58 22H48Z" fill="#FFC20E" />
      </svg>
      {showText && (
        <span style={{ display: 'flex', alignItems: 'baseline', fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1 }}>
          <span style={{ color: '#FFFFFF', fontSize: '0.92rem' }}>Jazz</span>
          <span style={{ color: '#FFC20E', fontSize: '0.92rem', fontStyle: 'italic', fontWeight: 900 }}>cash</span>
        </span>
      )}
    </div>
  );
}

// Official SadaPay Logo (Coral & Turquoise Intersecting Circles Brand Glyph)
export function SadaPayLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="100" height="100" rx="22" fill="#1C1A27" />
        <circle cx="42" cy="50" r="24" fill="#FF6584" />
        <circle cx="58" cy="50" r="24" fill="#1DE9B6" fillOpacity="0.85" />
        <path d="M50 34.2C54.8 38.3 58 43.8 58 50C58 56.2 54.8 61.7 50 65.8C45.2 61.7 42 56.2 42 50C42 43.8 45.2 38.3 50 34.2Z" fill="#FFAAA6" />
      </svg>
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.3px' }}>
          sada<span style={{ color: '#FF6584' }}>pay</span>
        </span>
      )}
    </div>
  );
}

// Official NayaPay Logo (Green Arc / Stylized Folding "N" Brand Glyph)
export function NayaPayLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="100" height="100" rx="22" fill="#00D084" />
        {/* NayaPay white origami stylized N */}
        <path d="M30 70V30L52 54V30H68V70L46 46V70H30Z" fill="#FFFFFF" />
      </svg>
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.3px' }}>
          naya<span style={{ color: '#00D084' }}>pay</span>
        </span>
      )}
    </div>
  );
}

// Cash on Delivery Trust Logo
export function CashOnDeliveryBadge({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="100" height="100" rx="22" fill="#D4AF37" fillOpacity="0.18" stroke="#D4AF37" strokeWidth="4" />
        <path d="M26 38L50 24L74 38V64L50 78L26 64V38Z" stroke="#F3E5AB" strokeWidth="5" strokeLinejoin="round" fill="none" />
        <path d="M50 24V78" stroke="#F3E5AB" strokeWidth="4" />
        <path d="M26 38L74 64" stroke="#F3E5AB" strokeWidth="3" opacity="0.4" />
        <path d="M74 38L26 64" stroke="#F3E5AB" strokeWidth="3" opacity="0.4" />
        <circle cx="50" cy="50" r="14" fill="#D4AF37" />
        <text x="50" y="55" textAnchor="middle" fill="#070709" fontSize="15" fontWeight="900" fontFamily="sans-serif">Rs</text>
      </svg>
      {showText && (
        <span style={{ color: '#F3E5AB', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.2px' }}>
          Cash on Delivery (COD)
        </span>
      )}
    </div>
  );
}

// Raast / SBP Instant Payment Logo
export function RaastLogo({ size = 26, showText = true, className = "" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="100" height="100" rx="22" fill="#0D3B66" />
        <path d="M24 50C24 35.6 35.6 24 50 24C64.4 24 76 35.6 76 50C76 64.4 64.4 76 50 76" stroke="#F4D35E" strokeWidth="7" strokeLinecap="round" />
        <path d="M50 36C42.3 36 36 42.3 36 50C36 57.7 42.3 64 50 64C57.7 64 64 57.7 64 50" stroke="#EE964B" strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="50" r="6" fill="#F95738" />
      </svg>
      {showText && (
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.2px' }}>
          Raast <span style={{ color: '#F4D35E', fontSize: '0.75rem' }}>Instant</span>
        </span>
      )}
    </div>
  );
}
