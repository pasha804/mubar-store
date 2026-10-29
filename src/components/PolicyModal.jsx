import React from 'react';
import { X, ShieldCheck, FileText, Truck, RotateCcw, Phone, Scale } from 'lucide-react';

export const POLICY_DATA = {
  refund: {
    title: "Return and Exchange Policy",
    icon: RotateCcw,
    content: `
### 100% "Open Parcel" Inspection Guarantee (At Your Doorstep)
All orders dispatched through our official courier partners (Trax Logistics and Leopards Courier) include explicit "Open Parcel Inspection" authorization. When the delivery rider arrives at your doorstep, you have the right to open the flyer and inspect the watch condition BEFORE handing over cash payment. If the timepiece is visibly damaged in transit or incorrect, you may hand the parcel back to the rider without making any payment.

### 7-Day Hassle-Free Exchange & Replacement Window
If you have received and accepted your watch and notice any manufacturing defect or movement irregularity, you are entitled to a free replacement or exchange within 7 days of delivery.
To be eligible:
- The timepiece must be in its original condition with protective plastic seals intact.
- The watch must be in its original protective packaging with warranty documentation.
- Proof of purchase (Order Reference ID or registered WhatsApp number) must be provided.

### The 1-Year Movement Warranty Card
Every MUBAR watch includes a 1-Year Movement Warranty Card accompanied with the parcel.
- What is covered: Internal quartz movement timekeeping irregularities and manufacturer defects occurring under normal use for 12 months.
- What is not covered: Normal wear and tear, accidental drops, cracked crystal glass due to impact, or water immersion beyond the specified ATM rating.
- To claim warranty, message our WhatsApp Concierge at +92 308 4453846.

### Refunds & Reversals
If an eligible replacement unit is out of stock, a full refund of the product purchase price will be issued directly via JazzCash, SadaPay, or Bank Account within 48 to 72 business hours.
    `
  },
  privacy: {
    title: "Privacy Policy",
    icon: ShieldCheck,
    content: `
### Information We Collect
When you interact with our website or place an order, we collect:
- Contact & Delivery Information: Your full name, mobile / WhatsApp phone number, city, shipping address, and delivery instructions.
- Order History: Details of timepieces purchased, order reference numbers, and exchange records.
- Technical Data: Device and IP information to optimize website checkout speed and prevent fraudulent orders.
Note: All transactions are processed through verified direct online transfers (JazzCash, SadaPay, NayaPay, EasyPaisa, Raast). We do not collect or store debit/credit card numbers or sensitive banking PINs on our servers.

### How We Use Your Information
We use your information exclusively to:
- Fulfill and deliver orders via our courier partners (Trax, Leopards).
- Verify delivery details via telephone or WhatsApp prior to dispatch to prevent delivery failure.
- Track customer warranty claims under your 1-Year Movement Warranty Card.
- Display relevant timepiece promotions through Meta Ads (Facebook/Instagram).

### Sharing Your Information
We never sell, rent, or trade your personal data. We share shipping details strictly with our verified courier delivery partners solely for transit and delivery fulfillment.
    `
  },
  terms: {
    title: "Terms of Service",
    icon: FileText,
    content: `
### 1. General Conditions
This store is operated by MUBAR, founded by Muhammad Mubashar, headquartered in Lahore, Pakistan. By placing an order, you confirm that you are at least 18 years of age or possess legal parental/guardian consent. We reserve the right to refuse service or cancel orders in cases of suspected fraudulent or fake bookings.

### 2. Timepiece Descriptions & Accuracy
We display the colors, textures, finishes, and dimensions of our watches as accurately as possible through high-definition studio photography. All technical specifications (e.g., stainless steel, Japanese Quartz, ATM water resistance ratings) are verified through importer and manufacturing testing.

### 3. Pricing & Currency
All prices on the store are stated in Pakistani Rupees (PKR). The total price indicated at checkout is the complete final price with zero hidden packaging or shipping charges.

### 4. Governing Law & Jurisdiction
These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any legal dispute shall be subject to the jurisdiction of the civil courts of Lahore, Punjab, Pakistan.
    `
  },
  shipping: {
    title: "Shipping & Delivery Policy",
    icon: Truck,
    content: `
### 1. Shipping Rates & 100% Free Nationwide Delivery
- Nationwide Express Delivery: 100% FREE across all cities, towns, and districts in Pakistan.
- Shipping Fee: Rs. 0 (FREE).

### 2. Accepted Online Payment Methods
- **JazzCash:** Direct mobile transfer to 03084453846 (Title: Muhammad Mubashir).
- **SadaPay:** Transfer to 03084453846 or IBAN PK43SADA0000003084453846 (Title: Muhammad Mubashar).
- **NayaPay:** Transfer to NayaPay ID pashaxora@nayapay, 03084453846, or IBAN PK79NAYA1234503084453846 (Title: Muhammad Mubashar).
- **EasyPaisa:** Direct mobile transfer to 03084453846 (Title: Muhammad Mubashar).
- Instant verification and priority dispatch available via WhatsApp (+92 308 4453846).

### 3. Delivery Timelines
Orders are processed and dispatched within 24 hours from our central fulfillment hub in Lahore:
- Lahore (Local Express): 24 to 48 Hours
- Karachi, Islamabad, Rawalpindi, Faisalabad: 2 to 3 Business Days
- Multan, Sialkot, Gujranwala, Peshawar, Quetta: 3 to 4 Business Days
- Rest of Punjab, Sindh, KPK, Balochistan & AJK: 3 to 5 Business Days

### 4. Order Verification & Dispatch
Every order is verified via WhatsApp with payment transfer confirmation prior to courier hand-off to ensure 100% accurate address and priority dispatch.

### 5. Shipment Tracking
As soon as your parcel is scanned by the courier, you will receive an automated tracking link and tracking code via SMS and WhatsApp.
    `
  },
  contact: {
    title: "Contact Information",
    icon: Phone,
    content: `
**Brand Name:** MUBAR  
**Founder:** Muhammad Mubashar  
**Location:** Lahore, Punjab, Pakistan  

### Customer Support Channels:
- **WhatsApp Concierge (Fastest Response):** +92 308 4453846
- **Customer Support Telephone:** +92 308 4453846
- **General Inquiries:** support@mubar.pk

### Operating Hours:
Monday to Saturday: 10:00 AM – 9:00 PM PKT  
Online Orders: Open 24/7 across Pakistan
    `
  }
};

export default function PolicyModal({ policyKey, onClose }) {
  if (!policyKey || !POLICY_DATA[policyKey]) return null;

  const policy = POLICY_DATA[policyKey];
  const IconComponent = policy.icon;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        backgroundColor: 'rgba(17, 25, 35, 0.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-card, #E6E2DA)',
          borderRadius: 'var(--radius-lg, 16px)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 32px)',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'var(--bg-subtle, #F0EEE8)',
            border: 'none',
            color: 'var(--text-primary, #252A30)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', borderBottom: '1px solid var(--border-warm, #E6E2DA)', paddingBottom: '14px' }}>
          <div style={{ backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)', padding: '10px', borderRadius: '8px' }}>
            <IconComponent size={22} color="var(--brand-navy, #172A3A)" />
          </div>
          <div>
            <h2 className="font-playfair" style={{ fontSize: '1.4rem', color: 'var(--brand-navy, #172A3A)', margin: 0, fontWeight: 700 }}>
              {policy.title}
            </h2>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #737B84)' }}>
              Official Policy • MUBAR Pakistan
            </div>
          </div>
        </div>

        <div style={{ color: 'var(--text-primary, #252A30)', fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {policy.content.trim()}
        </div>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-warm, #E6E2DA)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #737B84)' }}>
            MUBAR Concierge • Lahore, Pakistan
          </span>
          <button 
            className="btn-primary" 
            onClick={onClose}
            style={{ padding: '8px 20px', fontSize: '0.82rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
