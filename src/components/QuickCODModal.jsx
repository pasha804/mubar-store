import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, Truck, Package, MessageCircle, 
  Plus, Minus, Copy, Check, Clock, Smartphone, CreditCard, 
  Sparkles, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PAYMENT_ACCOUNTS, FOUNDER_CONTACT } from '../data/products';
import { persistNewOrder } from '../services/storeSync';
import { trackPurchase, trackInitiateCheckout } from '../services/pixelService';
import { JazzCashLogo, SadaPayLogo, NayaPayLogo, EasyPaisaLogo } from './PaymentLogos';

const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa (KPK)',
  'Islamabad Capital Territory',
  'Balochistan',
  'Azad Kashmir / Gilgit'
];

const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Quetta',
  'Abbottabad',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Other City'
];

export default function QuickCODModal({ product, initialVariant, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    initialVariant || product?.preselectedVariant || product?.selectedVariant || product?.variants?.[0] || 'Standard Edition'
  );

  const currentVariantImage = (product?.variantImages && product.variantImages[selectedVariant])
    || product?.images?.[0]
    || '';

  // 100% Online Payment Mode (COD Disabled as per store policy)
  const [selectedAccountKey, setSelectedAccountKey] = useState('jazzcash'); // 'jazzcash' | 'sadapay' | 'nayapay' | 'easypaisa'
  const [transactionRef, setTransactionRef] = useState('');
  const [copiedField, setCopiedField] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Lahore',
    province: 'Punjab',
    address: '',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!product) return null;

  const unitPrice = product.salePrice;
  const totalAmount = unitPrice * quantity;

  // Track InitiateCheckout when modal opens
  useEffect(() => {
    if (product) {
      trackInitiateCheckout(product, totalAmount);
    }
  }, []);

  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert("Please fill in your full name, mobile number, and complete delivery address.");
      return;
    }

    const randomId = 'MB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey] || PAYMENT_ACCOUNTS.jazzcash;
    const finalPaymentMethod = `Online Transfer (${activeAccount.name})`;

    const newOrder = {
      id: randomId,
      date: now.toISOString(),
      displayDate: formattedDate,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      province: formData.province,
      address: formData.address.trim(),
      productTitle: product.title,
      productId: product.id,
      productImage: currentVariantImage,
      variant: selectedVariant,
      quantity: quantity,
      unitPrice: unitPrice,
      totalAmount: totalAmount,
      paymentMethod: finalPaymentMethod,
      paymentType: 'online',
      onlineAccount: activeAccount.name,
      accountTitle: activeAccount.accountTitle,
      accountNumber: activeAccount.accountNumber,
      transactionRef: transactionRef.trim() || null,
      notes: formData.notes.trim(),
      status: 'Online Paid (Awaiting WhatsApp Verification)',
      deliveryFee: 0,
      estimatedDelivery: '2–3 Business Days'
    };

    // Save order locally and sync to cloud store
    persistNewOrder(newOrder);

    // Meta Pixel Conversion Event: Purchase
    trackPurchase(newOrder);

    setIsSuccess(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const generateWhatsAppMessage = () => {
    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey] || PAYMENT_ACCOUNTS.jazzcash;

    return encodeURIComponent(
`👑 *MUBAR TIMEPIECES - PAYMENT VERIFICATION*
━━━━━━━━━━━━━━━━━━━━━━
🏷️ *Order ID:* #${orderId}
👤 *Customer:* ${formData.name}
📞 *Phone:* ${formData.phone}
⌚ *Timepiece:* ${product.title}
🎨 *Variant:* ${selectedVariant}
🔢 *Quantity:* ${quantity}
💰 *Total Amount:* Rs. ${totalAmount.toLocaleString()} (Free Delivery)
🏦 *Payment Method:* ${activeAccount.name}
👤 *Account Title:* ${activeAccount.accountTitle}
📱 *Account Number:* ${activeAccount.accountNumber}
${activeAccount.iban ? `🏛️ *IBAN:* ${activeAccount.iban}\n` : ''}${transactionRef.trim() ? `🔖 *TID / Sender:* ${transactionRef.trim()}\n` : ''}📍 *Delivery Address:* ${formData.address}, ${formData.city}, ${formData.province}
🚚 *Delivery:* FREE Express Courier Nationwide (2–3 Days)
━━━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum Muhammad Mubashar bhai! Maine ${activeAccount.name} par Rs. ${totalAmount.toLocaleString()} transfer kar diye hain. Payment transfer ka screenshot attach kar raha hoon. Kindly mera order verify karke priority dispatch kar dein. Shukriya!`
    );
  };

  const currentOnlineAccount = PAYMENT_ACCOUNTS[selectedAccountKey] || PAYMENT_ACCOUNTS.jazzcash;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
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
          maxWidth: '580px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          position: 'relative',
          padding: 'clamp(20px, 4vw, 28px)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
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
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={16} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
                border: '1px solid rgba(182, 154, 99, 0.3)',
                marginBottom: '8px'
              }}>
                <Sparkles size={12} color="var(--brand-navy, #172A3A)" />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-navy, #172A3A)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Online Order • 100% Free Nationwide Delivery
                </span>
              </div>

              <h3 
                className="font-playfair"
                style={{ fontSize: '1.45rem', color: 'var(--brand-navy, #172A3A)', margin: 0, fontWeight: 700 }}
              >
                Complete Your Order
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #737B84)', margin: '4px 0 0 0' }}>
                Secure Online Payment via JazzCash, SadaPay, NayaPay & EasyPaisa.
              </p>
            </div>

            {/* Product Summary Box */}
            <div style={{
              backgroundColor: 'var(--bg-subtle, #F0EEE8)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px'
            }}>
              <img 
                src={currentVariantImage} 
                alt={product.title}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-card, #E6E2DA)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.86rem', color: 'var(--text-primary, #252A30)', fontWeight: 700, margin: '0 0 2px 0', lineHeight: 1.3 }}>
                  {product.title}
                </h4>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold, #B69A63)', fontWeight: 600 }}>
                  {selectedVariant}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)', marginTop: '4px' }}>
                  Rs. {totalAmount.toLocaleString()} <span style={{ fontSize: '0.74rem', color: 'var(--indicator-green, #237653)', fontWeight: 600 }}>(Free Express Delivery)</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-card, #E6E2DA)',
                borderRadius: '6px',
                padding: '2px 6px'
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-primary, #252A30)' }}
                >
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-primary, #252A30)' }}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Packaging Transparency Note */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.78rem',
              color: '#92400E',
              lineHeight: 1.45
            }}>
              <Package size={17} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>📦 Packaging &amp; Delivery Note:</strong>
                <div>
                  Parcel mein <strong>siraf watch</strong> multi-layer safe shock-proof protective bubble packaging mein deliver hoti hai (Presentation box shamil nahi hai). 100% Free Nationwide Express Delivery (2–3 Days).
                </div>
              </div>
            </div>

            {/* Online Payment Method Account Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '8px' }}>
                Select Online Payment Channel
              </label>

              {/* Account Selection Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
                {Object.keys(PAYMENT_ACCOUNTS).map(key => {
                  const acc = PAYMENT_ACCOUNTS[key];
                  const isAccSelected = selectedAccountKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedAccountKey(key)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '6px',
                        border: isAccSelected ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                        backgroundColor: isAccSelected ? 'var(--bg-gold-subtle, #F3EBDD)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {key === 'jazzcash' && <JazzCashLogo size={14} showText={false} />}
                      {key === 'sadapay' && <SadaPayLogo size={14} showText={false} />}
                      {key === 'nayapay' && <NayaPayLogo size={14} showText={false} />}
                      {key === 'easypaisa' && <EasyPaisaLogo size={14} showText={false} />}
                      <span style={{ fontSize: '0.72rem', fontWeight: isAccSelected ? 800 : 600, color: 'var(--text-primary, #252A30)' }}>
                        {acc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Account Info Details Card */}
              <div style={{
                padding: '12px 14px',
                backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                borderRadius: 'var(--radius-sm, 8px)',
                border: '1px solid var(--border-card, #E6E2DA)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary, #737B84)' }}>Account Title:</span>
                  <strong style={{ fontSize: '0.84rem', color: 'var(--brand-navy, #172A3A)' }}>{currentOnlineAccount.accountTitle}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary, #737B84)' }}>Mobile / Account:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.88rem', letterSpacing: '0.5px', color: 'var(--brand-navy, #172A3A)' }}>
                      {currentOnlineAccount.accountNumber}
                    </strong>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentOnlineAccount.accountNumber, 'acc')}
                      style={{
                        background: copiedField === 'acc' ? '#E8F5EE' : '#FFFFFF',
                        border: '1px solid var(--border-card, #E6E2DA)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: copiedField === 'acc' ? '#237653' : 'var(--text-primary, #252A30)',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedField === 'acc' ? <><Check size={12} color="#237653" /><span>Copied!</span></> : <><Copy size={12} /><span>Copy</span></>}
                    </button>
                  </div>
                </div>

                {/* NayaPay ID (if available) */}
                {currentOnlineAccount.nayapayId && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary, #737B84)' }}>NayaPay ID:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.82rem', color: '#00D084' }}>{currentOnlineAccount.nayapayId}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(currentOnlineAccount.nayapayId, 'npid')}
                        style={{
                          background: copiedField === 'npid' ? '#E8F5EE' : '#FFFFFF',
                          border: '1px solid var(--border-card, #E6E2DA)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: copiedField === 'npid' ? '#237653' : 'var(--text-primary, #252A30)',
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {copiedField === 'npid' ? <><Check size={12} color="#237653" /><span>Copied!</span></> : <><Copy size={12} /><span>Copy</span></>}
                      </button>
                    </div>
                  </div>
                )}

                {/* Official IBAN (For SadaPay & NayaPay & All 1-Link Banks) */}
                {currentOnlineAccount.iban && (
                  <div style={{
                    marginTop: '4px',
                    padding: '8px 10px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1.5px dashed var(--accent-gold, #B69A63)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold, #B69A63)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        🏛️ Official IBAN (Bank / Raast):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(currentOnlineAccount.iban, 'iban')}
                        style={{
                          background: copiedField === 'iban' ? '#E8F5EE' : 'var(--bg-gold-subtle, #F3EBDD)',
                          border: '1px solid var(--accent-gold, #B69A63)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: copiedField === 'iban' ? '#237653' : 'var(--brand-navy, #172A3A)',
                          padding: '2px 8px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {copiedField === 'iban' ? <><Check size={11} color="#237653" /><span>Copied</span></> : <><Copy size={11} /><span>Copy IBAN</span></>}
                      </button>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)', letterSpacing: '0.5px', wordBreak: 'break-all' }}>
                      {currentOnlineAccount.iban}
                    </div>
                  </div>
                )}

                {/* Transfer Guidance */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)', lineHeight: 1.4 }}>
                  💡 {currentOnlineAccount.instructions}
                </div>

                {/* Optional TID / Sender Name */}
                <div style={{ marginTop: '2px' }}>
                  <label style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '3px' }}>
                    Transaction ID (TID) / Sender Name (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. TID 123456789 or sender account title"
                    value={transactionRef}
                    onChange={e => setTransactionRef(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-card, #E6E2DA)',
                      fontSize: '0.78rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Delivery Details Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Muhammad Mubashar"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    border: '1px solid var(--border-card, #E6E2DA)',
                    fontSize: '0.84rem',
                    color: 'var(--text-primary, #252A30)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '4px' }}>
                  Mobile Number (WhatsApp) *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="0308 4453846"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    border: '1px solid var(--border-card, #E6E2DA)',
                    fontSize: '0.84rem',
                    color: 'var(--text-primary, #252A30)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '4px' }}>
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm, 8px)',
                      border: '1px solid var(--border-card, #E6E2DA)',
                      fontSize: '0.84rem',
                      color: 'var(--text-primary, #252A30)',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '4px' }}>
                    Province
                  </label>
                  <select
                    value={formData.province}
                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm, 8px)',
                      border: '1px solid var(--border-card, #E6E2DA)',
                      fontSize: '0.84rem',
                      color: 'var(--text-primary, #252A30)',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '4px' }}>
                  Complete Street Address *
                </label>
                <textarea 
                  required
                  rows="2"
                  placeholder="House number, Street, Sector / Area / Colony, Landmark"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    border: '1px solid var(--border-card, #E6E2DA)',
                    fontSize: '0.84rem',
                    color: 'var(--text-primary, #252A30)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Order Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  marginTop: '6px'
                }}
              >
                <span>Confirm Online Order — Rs. {totalAmount.toLocaleString()} (Free Delivery)</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--indicator-green, #237653)', fontWeight: 600 }}>
                ✓ 100% Free Nationwide Express Delivery • Fast WhatsApp Verification
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--indicator-green-bg, #E8F5EE)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: 'var(--indicator-green, #237653)'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className="font-playfair" style={{ fontSize: '1.6rem', color: 'var(--brand-navy, #172A3A)', margin: '0 0 6px 0' }}>
              Order Placed Successfully!
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary, #737B84)', margin: '0 0 16px 0' }}>
              Your order ID is <strong style={{ color: 'var(--brand-navy, #172A3A)' }}>#{orderId}</strong>. Send transfer proof on WhatsApp for priority dispatch within 24 hours.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-subtle, #F0EEE8)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '16px',
              textAlign: 'left',
              fontSize: '0.82rem',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Item:</span>
                <strong>{product.title} ({selectedVariant}) x {quantity}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Total Amount:</span>
                <strong style={{ color: 'var(--brand-navy, #172A3A)', fontSize: '0.92rem' }}>Rs. {totalAmount.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Delivery:</span>
                <strong style={{ color: 'var(--indicator-green, #237653)' }}>FREE Nationwide (2–3 Days)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Delivery To:</span>
                <span>{formData.address}, {formData.city}</span>
              </div>
            </div>

            {/* Online Payment Summary on Success */}
            <div style={{
              backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
              border: '1.5px solid var(--accent-gold, #B69A63)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '14px',
              textAlign: 'left',
              fontSize: '0.8rem',
              marginBottom: '16px'
            }}>
              <div style={{ fontWeight: 800, color: 'var(--brand-navy, #172A3A)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>💳 Transfer To: {currentOnlineAccount.name}</span>
                <span style={{ fontSize: '0.72rem', color: '#237653', backgroundColor: '#E8F5EE', padding: '2px 6px', borderRadius: '4px' }}>Awaiting Verification</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Title:</span>
                <strong>{currentOnlineAccount.accountTitle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Account Number:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <strong>{currentOnlineAccount.accountNumber}</strong>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentOnlineAccount.accountNumber, 'success-acc')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-gold, #B69A63)', padding: 0 }}
                  >
                    {copiedField === 'success-acc' ? <Check size={12} color="#237653" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              {currentOnlineAccount.iban && (
                <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed rgba(182, 154, 99, 0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold, #B69A63)' }}>OFFICIAL IBAN:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentOnlineAccount.iban, 'success-iban')}
                      style={{
                        background: copiedField === 'success-iban' ? '#E8F5EE' : '#FFFFFF',
                        border: '1px solid var(--accent-gold, #B69A63)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: copiedField === 'success-iban' ? '#237653' : 'var(--brand-navy, #172A3A)',
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedField === 'success-iban' ? <><Check size={10} color="#237653" /><span>Copied</span></> : <><Copy size={10} /><span>Copy IBAN</span></>}
                    </button>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 800, color: 'var(--brand-navy, #172A3A)', wordBreak: 'break-all' }}>
                    {currentOnlineAccount.iban}
                  </div>
                </div>
              )}
              <p style={{ margin: '8px 0 0 0', fontSize: '0.72rem', color: 'var(--text-secondary, #737B84)', lineHeight: 1.4 }}>
                Neeche diye gaye green WhatsApp button par click karein aur payment receipt ka screenshot bhej kar apna order foran verify karwayein.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/${FOUNDER_CONTACT.whatsapp}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', padding: '13px', fontSize: '0.9rem' }}
              >
                <MessageCircle size={18} />
                <span>Verify on WhatsApp for Instant Dispatch</span>
              </a>

              <button
                type="button"
                className="btn-outline"
                onClick={onClose}
                style={{ width: '100%', padding: '12px', fontSize: '0.86rem' }}
              >
                Back to Store
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
