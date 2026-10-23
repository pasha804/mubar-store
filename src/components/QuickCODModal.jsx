import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, Truck, Package, MessageCircle, 
  Plus, Minus, Copy, Check, Clock, Smartphone, CreditCard, 
  Sparkles, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PAYMENT_ACCOUNTS, FOUNDER_CONTACT } from '../data/products';
import { persistNewOrder } from '../services/storeSync';
import { getWatchWhatsAppUrl } from '../services/whatsappService';
import { trackPurchase, trackInitiateCheckout } from '../services/pixelService';
import { JazzCashLogo, SadaPayLogo, NayaPayLogo } from './PaymentLogos';

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

  const [paymentType, setPaymentType] = useState('cod'); // 'cod' | 'online'
  const [selectedAccountKey, setSelectedAccountKey] = useState('jazzcash'); // 'jazzcash' | 'sadapay' | 'nayapay'
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
  const [copied, setCopied] = useState(false);

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

    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey];
    const finalPaymentMethod = paymentType === 'online' 
      ? `Online Transfer (${activeAccount.name})` 
      : 'Cash on Delivery (COD)';

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
      paymentType: paymentType,
      onlineAccount: paymentType === 'online' ? activeAccount.name : null,
      accountTitle: paymentType === 'online' ? activeAccount.accountTitle : null,
      accountNumber: paymentType === 'online' ? activeAccount.accountNumber : null,
      transactionRef: paymentType === 'online' ? transactionRef.trim() : null,
      notes: formData.notes.trim(),
      status: paymentType === 'online' ? 'Online Paid (Awaiting Verification)' : 'Pending Verification',
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
    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey];

    if (paymentType === 'online') {
      return encodeURIComponent(
`👑 *MUBAR TIMEPIECES - PAYMENT VERIFICATION*
━━━━━━━━━━━━━━━━━━━━━━
🏷️ *Order ID:* #${orderId}
👤 *Customer:* ${formData.name}
📞 *Phone:* ${formData.phone}
⌚ *Timepiece:* ${product.title}
🎨 *Variant:* ${selectedVariant}
🔢 *Quantity:* ${quantity}
💰 *Total Amount:* Rs. ${totalAmount.toLocaleString()}
🏦 *Payment Method:* ${activeAccount.name}
👤 *Account Title:* ${activeAccount.accountTitle}
📱 *Account Number:* ${activeAccount.accountNumber}
${activeAccount.iban ? `🏛️ *IBAN:* ${activeAccount.iban}\n` : ''}${transactionRef.trim() ? `🔖 *TID / Sender:* ${transactionRef.trim()}\n` : ''}📍 *Delivery Address:* ${formData.address}, ${formData.city}, ${formData.province}
🚚 *Delivery:* FREE Express Courier (2–3 Days)
━━━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum Muhammad Mubashar bhai! Maine ${activeAccount.name} par Rs. ${totalAmount.toLocaleString()} transfer kar diye hain. Please payment verify karke parcel dispatch kar dein.`
      );
    }

    return encodeURIComponent(
`👑 *MUBAR TIMEPIECES - ORDER CONFIRMATION*
━━━━━━━━━━━━━━━━━━━━━━
🏷️ *Order ID:* #${orderId}
👤 *Customer:* ${formData.name}
📞 *Phone:* ${formData.phone}
⌚ *Timepiece:* ${product.title}
🎨 *Variant:* ${selectedVariant}
🔢 *Quantity:* ${quantity}
💰 *Total Amount:* Rs. ${totalAmount.toLocaleString()} (Cash on Delivery)
📍 *Delivery Address:* ${formData.address}, ${formData.city}, ${formData.province}
🚚 *Delivery:* FREE Express Courier (2–3 Days)
━━━━━━━━━━━━━━━━━━━━━━
📦 *Open Parcel Check:* 100% Allowed (Rider ke samne check karke pay karein)
Assalam-o-Alaikum Muhammad Mubashar bhai! Please verify and dispatch my order.`
    );
  };

  const currentOnlineAccount = PAYMENT_ACCOUNTS[selectedAccountKey];

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
                  Direct Checkout • Free Delivery
                </span>
              </div>

              <h3 
                className="font-playfair"
                style={{ fontSize: '1.45rem', color: 'var(--brand-navy, #172A3A)', margin: 0, fontWeight: 700 }}
              >
                Complete Your Order
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #737B84)', margin: '4px 0 0 0' }}>
                Cash on Delivery or Instant Online Payment via JazzCash, SadaPay & NayaPay.
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
                  Rs. {totalAmount.toLocaleString()}
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

            {/* Payment Method Switcher */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary, #252A30)', display: 'block', marginBottom: '8px' }}>
                Select Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentType('cod')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    border: paymentType === 'cod' ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                    backgroundColor: paymentType === 'cod' ? 'var(--brand-navy, #172A3A)' : '#FFFFFF',
                    color: paymentType === 'cod' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Truck size={15} />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('online')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    border: paymentType === 'online' ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                    backgroundColor: paymentType === 'online' ? 'var(--brand-navy, #172A3A)' : '#FFFFFF',
                    color: paymentType === 'online' ? '#FFFFFF' : 'var(--text-primary, #252A30)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <CreditCard size={15} />
                  <span>Online Transfer</span>
                </button>
              </div>

              {/* Online Transfer Accounts */}
              {paymentType === 'online' && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: 'var(--bg-subtle, #F0EEE8)',
                  borderRadius: 'var(--radius-sm, 8px)',
                  border: '1px solid var(--border-card, #E6E2DA)'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    {Object.keys(PAYMENT_ACCOUNTS).map(key => {
                      const acc = PAYMENT_ACCOUNTS[key];
                      const isAccSelected = selectedAccountKey === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedAccountKey(key)}
                          style={{
                            flex: 1,
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: isAccSelected ? '1.5px solid var(--brand-navy, #172A3A)' : '1px solid var(--border-card, #E6E2DA)',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          {key === 'jazzcash' && <JazzCashLogo size={14} />}
                          {key === 'sadapay' && <SadaPayLogo size={14} />}
                          {key === 'nayapay' && <NayaPayLogo size={14} />}
                          <span style={{ fontSize: '0.74rem', fontWeight: isAccSelected ? 700 : 500 }}>{acc.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Account Info */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-primary, #252A30)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary, #737B84)' }}>Account Title:</span>
                      <strong>{currentOnlineAccount.accountTitle}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary, #737B84)' }}>Account Number:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '0.85rem' }}>{currentOnlineAccount.accountNumber}</strong>
                        <button
                          type="button"
                          onClick={() => handleCopy(currentOnlineAccount.accountNumber, 'acc')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-gold, #B69A63)', padding: 0 }}
                        >
                          {copiedField === 'acc' ? <Check size={13} color="green" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                <span>Confirm Order — Rs. {totalAmount.toLocaleString()} (Free Delivery)</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--indicator-green, #237653)', fontWeight: 600 }}>
                ✓ 100% Doorstep Open Parcel Inspection Allowed
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
              Your order ID is <strong style={{ color: 'var(--brand-navy, #172A3A)' }}>#{orderId}</strong>. Our team will dispatch your watch within 24 hours.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-subtle, #F0EEE8)',
              border: '1px solid var(--border-card, #E6E2DA)',
              borderRadius: 'var(--radius-card, 12px)',
              padding: '16px',
              textAlign: 'left',
              fontSize: '0.82rem',
              marginBottom: '20px'
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
                <strong style={{ color: 'var(--indicator-green, #237653)' }}>FREE (2–3 Days)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary, #737B84)' }}>Address:</span>
                <span>{formData.address}, {formData.city}</span>
              </div>
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
                <span>Confirm on WhatsApp for Priority Dispatch</span>
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
