import React from 'react';
import { Truck, ShieldCheck, Award } from 'lucide-react';

export default function TrustBenefits() {
  const benefits = [
    {
      icon: Truck,
      title: "100% Free Nationwide Delivery",
      description: "Express 2–3 day delivery across Pakistan with zero shipping charges."
    },
    {
      icon: ShieldCheck,
      title: "Verified Online Payment",
      description: "Easy direct transfer via JazzCash, SadaPay, NayaPay & EasyPaisa with instant WhatsApp verification."
    },
    {
      icon: Award,
      title: "1-Year Warranty Included",
      description: "Official movement warranty card included in secure protective packaging."
    }
  ];

  return (
    <section 
      id="trust-benefits"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)',
        padding: '24px 20px'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px 36px'
        }}
      >
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <div 
                style={{
                  backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                  padding: '9px',
                  borderRadius: 'var(--radius-sm, 8px)',
                  color: 'var(--accent-gold, #B69A63)',
                  flexShrink: 0
                }}
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h4 
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--text-primary, #252A30)',
                    margin: '0 0 3px 0'
                  }}
                >
                  {b.title}
                </h4>
                <p 
                  style={{
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                    color: 'var(--text-secondary, #737B84)',
                    margin: 0
                  }}
                >
                  {b.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
