import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div 
      role="region" 
      aria-label="Announcement"
      style={{
        backgroundColor: '#111923',
        borderBottom: '1px solid rgba(182, 154, 99, 0.25)',
        padding: '8px 16px',
        fontSize: 'clamp(0.72rem, 2vw, 0.78rem)',
        color: '#F7F5F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px 24px',
        position: 'relative',
        zIndex: 100,
        textAlign: 'center',
        letterSpacing: '0.4px'
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Truck size={13} color="#B69A63" />
        <span style={{ fontWeight: 600 }}>
          FREE EXPRESS DELIVERY ACROSS PAKISTAN
        </span>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D4D9DF' }}>
        <ShieldCheck size={14} color="#2ECC71" />
        <span>100% Open Parcel Inspection Before Payment</span>
      </div>
    </div>
  );
}
