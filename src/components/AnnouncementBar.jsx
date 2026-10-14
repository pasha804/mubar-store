import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Clock } from 'lucide-react';

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => String(n).padStart(2, '0');

  return (
    <div style={{
      background: 'linear-gradient(90deg, #120e06 0%, #2a1f09 50%, #120e06 100%)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
      padding: '8px 16px',
      fontSize: '0.8rem',
      color: '#F5E8BA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      zIndex: 100,
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span className="shimmer-badge" style={{ padding: '2px 6px', borderRadius: '3px', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
          FLASH SALE
        </span>
        <span style={{ fontWeight: 600 }}>FLAT 40% OFF STOREWIDE + FREE NATIONWIDE COD</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <Clock size={13} color="#D4AF37" />
        <span style={{ fontSize: '0.75rem', color: '#bbb' }}>Ends in:</span>
        <strong style={{ fontFamily: 'monospace', color: '#F3E5AB', letterSpacing: '1px' }}>
          {format(timeLeft.hours)}h : {format(timeLeft.minutes)}m : {format(timeLeft.seconds)}s
        </strong>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ECC71', fontSize: '0.75rem', fontWeight: 600 }}>
        <ShieldCheck size={14} />
        <span>100% Open Parcel Allowed Before Payment</span>
      </div>
    </div>
  );
}
