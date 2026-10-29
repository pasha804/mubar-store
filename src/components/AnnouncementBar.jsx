import React from 'react';
import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div 
      role="region" 
      aria-label="Announcement"
      style={{
        backgroundColor: '#F1EFE9',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)',
        padding: '6px 16px',
        fontSize: 'clamp(0.72rem, 1.8vw, 0.76rem)',
        color: '#252A30',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px 16px',
        position: 'relative',
        zIndex: 100,
        textAlign: 'center',
        letterSpacing: '0.3px',
        fontWeight: 600
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Truck size={13} color="var(--brand-navy, #172A3A)" />
        <span>100% Free Express Delivery Across Pakistan</span>
      </div>
      <span style={{ color: 'var(--border-warm, #C8C3BA)' }}>·</span>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={13} color="var(--indicator-green, #237653)" />
        <span>Verified Online Payment · WhatsApp Order Confirmation</span>
      </div>
    </div>
  );
}
