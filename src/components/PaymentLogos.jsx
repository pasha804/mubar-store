import React from 'react';

/**
 * MUBAR Timepieces Pakistan - Official Payment Channel Badges
 * Designed for 100% visibility, crisp contrast, and authentic brand identity
 * Supports both light (default, on white cards) and dark backgrounds.
 */

// 1. Cash on Delivery (COD) Badge with 100% Open Parcel Inspection Trust Cue
export function CashOnDeliveryBadge({ size = 22, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';
  
  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="Cash on Delivery (COD) - 100% Open Parcel Check Before Payment"
    >
      {/* COD Emblem */}
      <div 
        style={{ 
          height: `${size + 4}px`, 
          padding: '0 6px',
          backgroundColor: '#E8F5E9', 
          border: '1.5px solid #16A34A', 
          borderRadius: '5px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#15803D',
          fontWeight: 900,
          fontSize: '0.72rem',
          letterSpacing: '0.5px',
          boxShadow: '0 1px 3px rgba(22, 163, 74, 0.2)'
        }}
      >
        COD
      </div>
      
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: isLight ? '#0F172A' : '#FFFFFF', 
            fontWeight: 800, 
            fontSize: '0.82rem', 
            letterSpacing: '-0.2px' 
          }}>
            Cash on Delivery
          </span>
          <span style={{ 
            color: '#16A34A', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.3px',
            textTransform: 'uppercase'
          }}>
            100% Open Parcel
          </span>
        </div>
      )}
    </div>
  );
}

// 2. Official JazzCash Brand Logo & Typography
export function JazzCashLogo({ size = 24, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="Official Verified JazzCash Account"
    >
      <img 
        src="/images/payments/jazzcash.png" 
        alt="JazzCash Official" 
        style={{ 
          height: `${size}px`, 
          width: `${size}px`, 
          flexShrink: 0,
          borderRadius: '4px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: isLight ? '#0F172A' : '#FFFFFF', 
            fontWeight: 900, 
            fontSize: '0.84rem', 
            letterSpacing: '-0.3px' 
          }}>
            <span style={{ color: '#D91C24' }}>Jazz</span>Cash
          </span>
          <span style={{ 
            color: '#DC2626', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.2px' 
          }}>
            Mobile Wallet
          </span>
        </div>
      )}
    </div>
  );
}

// 3. Official EasyPaisa Brand Logo & Typography
export function EasyPaisaLogo({ size = 24, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="Official EasyPaisa Transfer Channel"
    >
      {/* Official EasyPaisa Monogram */}
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: 'block', borderRadius: '5px' }}>
        <rect width="32" height="32" rx="6" fill="#00A859" />
        <path d="M16 7C11.58 7 8 10.58 8 15c0 4.42 3.58 8 8 8 3.54 0 6.55-2.3 7.6-5.5h-3.32c-.85 1.5-2.42 2.5-4.28 2.5-2.76 0-5-2.24-5-5h13c.06-.5.1-1 .1-1.5 0-4.69-3.71-8.5-8.1-8.5zm-5 6.5c.5-2.3 2.5-4 5-4s4.5 1.7 5 4h-10z" fill="#FFFFFF" />
      </svg>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: '#00A859', 
            fontWeight: 900, 
            fontSize: '0.84rem', 
            letterSpacing: '-0.3px' 
          }}>
            easypaisa
          </span>
          <span style={{ 
            color: isLight ? '#059669' : '#34D399', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.2px' 
          }}>
            Instant Transfer
          </span>
        </div>
      )}
    </div>
  );
}

// 4. Official SadaPay Brand Logo
export function SadaPayLogo({ size = 22, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} 
      className={className}
      title="Official SadaPay Business & IBAN"
    >
      <img 
        src="/images/payments/sadapay.png" 
        alt="SadaPay Official" 
        style={{ 
          height: `${size}px`, 
          width: 'auto', 
          maxWidth: '78px',
          flexShrink: 0,
          maxHeight: '26px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      {showText && (
        <span style={{ 
          color: '#FF6B81', 
          fontWeight: 800, 
          fontSize: '0.62rem', 
          backgroundColor: 'rgba(255, 107, 129, 0.14)', 
          padding: '2px 5px', 
          borderRadius: '4px',
          letterSpacing: '0.3px',
          flexShrink: 0
        }}>
          ZERO FEE
        </span>
      )}
    </div>
  );
}

// 5. Official NayaPay Brand Logo (Official Green Origami Emblem + Wordmark)
export function NayaPayLogo({ size = 24, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="Official NayaPay ID & IBAN"
    >
      {/* Official Origami N Emblem */}
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          backgroundColor: '#00D084', 
          borderRadius: '5px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0, 208, 132, 0.35)',
          flexShrink: 0
        }}
      >
        <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="none">
          <path d="M4 19V5L14 15V5H19V19L9 9V19H4Z" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: isLight ? '#0F172A' : '#FFFFFF', 
            fontWeight: 900, 
            fontSize: '0.86rem', 
            letterSpacing: '-0.3px' 
          }}>
            naya<span style={{ color: '#00D084' }}>pay</span>
          </span>
          <span style={{ 
            color: '#059669', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.2px' 
          }}>
            Digital Wallet
          </span>
        </div>
      )}
    </div>
  );
}

// 6. Official Raast Instant Payment Logo (Official State Bank of Pakistan Asset)
export function RaastLogo({ size = 24, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="Raast SBP Instant P2P Payment"
    >
      <img 
        src="/images/payments/raast.svg" 
        alt="Raast Instant Payment SBP" 
        style={{ 
          height: `${size}px`, 
          width: `${size}px`, 
          flexShrink: 0,
          maxHeight: '28px',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: isLight ? '#0F172A' : '#FFFFFF', 
            fontWeight: 900, 
            fontSize: '0.84rem', 
            letterSpacing: '-0.2px' 
          }}>
            Raast <span style={{ color: '#047857' }}>Instant</span>
          </span>
          <span style={{ 
            color: '#D97706', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.2px' 
          }}>
            State Bank SBP
          </span>
        </div>
      )}
    </div>
  );
}

// 7. Bank Transfer / 1-Link IBAN Badge
export function BankTransferBadge({ size = 22, showText = true, theme = 'light', className = "" }) {
  const isLight = theme === 'light';

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} 
      className={className}
      title="All Pakistani Banks Direct IBAN Transfer"
    >
      <div 
        style={{ 
          width: `${size + 2}px`, 
          height: `${size + 2}px`, 
          backgroundColor: '#F1F5F9', 
          border: '1.5px solid #64748B', 
          borderRadius: '5px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#334155',
          flexShrink: 0
        }}
      >
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="9" y1="10" x2="9" y2="21" />
          <line x1="15" y1="10" x2="15" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            color: isLight ? '#0F172A' : '#FFFFFF', 
            fontWeight: 800, 
            fontSize: '0.82rem', 
            letterSpacing: '-0.2px' 
          }}>
            Bank Transfer
          </span>
          <span style={{ 
            color: '#64748B', 
            fontWeight: 700, 
            fontSize: '0.62rem', 
            letterSpacing: '0.2px' 
          }}>
            All Pakistan Banks
          </span>
        </div>
      )}
    </div>
  );
}
