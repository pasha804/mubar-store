import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, Truck, Package, MessageCircle, 
  Send, Plus, Minus, Copy, Check, Clock, Smartphone, CreditCard, 
  Sparkles, ArrowRight, AlertCircle, Info 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PAYMENT_ACCOUNTS, FOUNDER_CONTACT } from '../data/products';
import { persistNewOrder } from '../services/storeSync';
import { getWatchWhatsAppUrl } from '../services/whatsappService';
import { trackPurchase, trackInitiateCheckout, trackWhatsAppContact } from '../services/pixelService';

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
    initialVariant || product?.preselectedVariant || product?.variants?.[0] || 'Standard Edition'
  );

  // Derive exact image corresponding to selected variant
  const currentVariantImage = (product?.variantImages && product.variantImages[selectedVariant])
    || product?.images?.[0]
    || '';

  // Payment method selection
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

  // Meta Pixel: Track InitiateCheckout when modal opens
  useEffect(() => {
    if (product) {
      trackInitiateCheckout(product, totalAmount);
    }
  }, []);

  // Retrieve founder phone or use default
  const founderPhone = localStorage.getItem('mubar_founder_phone') || FOUNDER_CONTACT.whatsapp;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert("Please fill in your name, mobile number, and complete delivery address.");
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
      status: paymentType === 'online' ? 'Online Paid (Awaiting WhatsApp Verification)' : 'Pending Verification',
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback
    }
  };

  const generateWhatsAppMessage = () => {
    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey];

    if (paymentType === 'online') {
      return encodeURIComponent(
`👑 *MUBAR TIMEPIECES - ONLINE PAYMENT VERIFICATION*
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
${activeAccount.iban ? `🏛️ *IBAN:* ${activeAccount.iban}\n` : ''}${activeAccount.nayapayId ? `🆔 *NayaPay ID:* ${activeAccount.nayapayId}\n` : ''}${transactionRef.trim() ? `🔖 *TID / Sender:* ${transactionRef.trim()}\n` : ''}📍 *Delivery Address:* ${formData.address}, ${formData.city}, ${formData.province}
🚚 *Delivery:* FREE Express Courier (2–3 Days)
━━━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum Muhammad Mubashar bhai! Maine ${activeAccount.name} par Rs. ${totalAmount.toLocaleString()} transfer kar diye hain. Please meri payment verify karein aur mera parcel express dispatch kar dein. (Screenshot attached)`
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
Assalam-o-Alaikum Muhammad Mubashar bhai! Please verify and confirm my order for express dispatch.`
    );
  };

  const copyOrderDetails = () => {
    const activeAccount = PAYMENT_ACCOUNTS[selectedAccountKey];
    const paymentLine = paymentType === 'online'
      ? `Payment: Online Transfer via ${activeAccount.name} (${activeAccount.accountTitle} - ${activeAccount.accountNumber})`
      : `Payment: Cash on Delivery (COD)`;

    const text = `MUBAR Luxury Order #${orderId}
Customer: ${formData.name}
Phone: ${formData.phone}
Item: ${product.title} (${selectedVariant}) x ${quantity}
Total Amount: Rs. ${totalAmount.toLocaleString()}
${paymentLine}
${transactionRef ? `Transaction Ref: ${transactionRef}\n` : ''}Delivery Address: ${formData.address}, ${formData.city}, ${formData.province}
Delivery: 100% FREE Express Nationwide (2-3 Business Days)
Founder Verification WhatsApp: +92 308 4453846`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentOnlineAccount = PAYMENT_ACCOUNTS[selectedAccountKey];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2.5vw, 16px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0c0c11',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: '0 30px 70px rgba(0,0,0,0.95), 0 0 35px rgba(212, 175, 55, 0.2)',
          position: 'relative',
          padding: 'clamp(18px, 4vw, 24px) clamp(12px, 3.5vw, 20px)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(231,76,60,0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 12px', borderRadius: '20px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '6px' }}>
                <Sparkles size={13} color="#D4AF37" />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F3E5AB', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Express Direct Checkout • Free Delivery
                </span>
              </div>
              <h3 className="font-cinzel" style={{ fontSize: '1.45rem', color: '#fff', marginTop: '2px', letterSpacing: '0.5px' }}>
                COMPLETE YOUR ORDER
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#8E8E93', marginTop: '2px' }}>
                Cash on Delivery or Instant Online Payment via JazzCash, SadaPay & NayaPay.
              </p>
            </div>

            {/* Product Summary Box with Live Dynamic Image */}
            <div style={{
              background: 'rgba(0,0,0,0.55)',
              border: '1.5px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                position: 'relative',
                width: '74px',
                height: '74px',
                flexShrink: 0,
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1.5px solid #D4AF37',
                background: '#070709'
              }}>
                <img 
                  key={currentVariantImage}
                  src={currentVariantImage} 
                  alt={selectedVariant} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    animation: 'fadeIn 0.25s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(7, 7, 9, 0.85)',
                  fontSize: '0.62rem',
                  color: '#2ECC71',
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '1px 0'
                }}>
                  Selected Color
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.title}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: '#F3E5AB',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '2px'
                }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC71' }} />
                  <span>{selectedVariant}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#2ECC71', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={12} /> 100% Free Nationwide Delivery (Rs. 0)
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="font-cinzel" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F3E5AB' }}>
                  Rs. {totalAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#888' }}>
                  {quantity > 1 ? `Rs. ${unitPrice.toLocaleString()} x ${quantity}` : 'Free Courier Shipping'}
                </div>
              </div>
            </div>

            {/* 1-Tap WhatsApp Alternative Shortcut */}
            <a 
              href={getWatchWhatsAppUrl(product, selectedVariant)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppContact(product?.title, totalAmount)}
              style={{
                background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(18, 140, 126, 0.25) 100%)',
                border: '1px solid rgba(37, 211, 102, 0.5)',
                borderRadius: '10px',
                padding: '9px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                textDecoration: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={17} color="#25D366" />
                <span style={{ fontSize: '0.78rem', color: '#E0E0E0' }}>Form nahi bharna chahte? <strong>Direct WhatsApp par order dein</strong></span>
              </div>
              <span style={{ background: '#25D366', color: '#000', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '5px' }}>
                WhatsApp →
              </span>
            </a>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Interactive Visual Variant Selection */}
              {product.variants && product.variants.length > 0 && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '12px',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.78rem', color: '#F3E5AB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={13} color="#D4AF37" />
                      <span>Select Watch Color / Edition:</span>
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#888' }}>Click to view photo</span>
                  </div>

                  {/* Grid of clickable color options with actual watch pictures */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: product.variants.length <= 2 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(135px, 1fr))',
                    gap: '8px'
                  }}>
                    {product.variants.map((v, i) => {
                      const vImg = product.variantImages?.[v] || product.images?.[i] || product.images?.[0];
                      const isSelected = selectedVariant === v;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                            background: isSelected ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255,255,255,0.03)',
                            color: isSelected ? '#F3E5AB' : '#bbb',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.18s ease',
                            boxShadow: isSelected ? '0 0 12px rgba(212, 175, 55, 0.3)' : 'none'
                          }}
                        >
                          <img 
                            src={vImg} 
                            alt={v}
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                              border: isSelected ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '0.72rem',
                              lineHeight: 1.25,
                              fontWeight: isSelected ? 700 : 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}>
                              {v}
                            </div>
                          </div>
                          {isSelected && (
                            <span style={{ color: '#2ECC71', fontSize: '0.75rem', fontWeight: 800 }}>✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 600 }}>Order Quantity:</span>
                  <div style={{ fontSize: '0.7rem', color: '#888' }}>Select how many watches you want</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  padding: '2px 4px',
                  height: '38px'
                }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'none', border: 'none', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={13} />
                  </button>
                  <span style={{ fontWeight: 800, color: '#F3E5AB', fontSize: '0.95rem', minWidth: '28px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    style={{ background: 'none', border: 'none', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>



              {/* Customer Name & Phone */}
              <div className="quick-cod-row">
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
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
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
                    WhatsApp / Mobile Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. 0308 4453846"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Province & City */}
              <div className="quick-cod-row">
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
                    Province *
                  </label>
                  <select
                    value={formData.province}
                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#121218',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F3E5AB',
                      fontSize: '0.82rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {PROVINCES.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#121218',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F3E5AB',
                      fontSize: '0.82rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {CITIES.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label style={{ fontSize: '0.76rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
                  Delivery Address (House #, Street #, Sector / Area, Landmark) *
                </label>
                <textarea 
                  required
                  rows="2"
                  placeholder="e.g. House 14, Street 3, Block C, Gulberg III / Near Main Market"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.84rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              {/* LEVEL-UP PAYMENT METHOD SELECTION */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#F3E5AB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="#D4AF37" />
                    <span>Select Payment Method *</span>
                  </label>
                  <span style={{ fontSize: '0.7rem', color: '#2ECC71', fontWeight: 600 }}>
                    Free Nationwide Delivery (Rs. 0)
                  </span>
                </div>

                {/* Primary Payment Type Tabs (COD vs Online) */}
                <div className="quick-cod-row" style={{ marginBottom: '12px' }}>
                  {/* Option 1: Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentType('cod')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: paymentType === 'cod' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: paymentType === 'cod' ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                      color: paymentType === 'cod' ? '#F3E5AB' : '#888',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem' }}>
                      <span>💵</span>
                      <span>Cash on Delivery</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: paymentType === 'cod' ? '#ddd' : '#666', marginTop: '3px' }}>
                      Pay cash to rider after open parcel check
                    </div>
                  </button>

                  {/* Option 2: Online Advance Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentType('online')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: paymentType === 'online' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: paymentType === 'online' ? '2px solid #2ECC71' : '1px solid rgba(255,255,255,0.08)',
                      color: paymentType === 'online' ? '#A3E4D7' : '#888',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem', color: paymentType === 'online' ? '#2ECC71' : '#aaa' }}>
                      <span>⚡</span>
                      <span>Online Payment</span>
                      <span style={{ fontSize: '0.62rem', background: '#2ECC71', color: '#000', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                        FAST DISPATCH
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: paymentType === 'online' ? '#ddd' : '#666', marginTop: '3px' }}>
                      JazzCash • SadaPay • NayaPay
                    </div>
                  </button>
                </div>

                {/* ONLINE PAYMENT DETAILS BOX (WHEN ONLINE IS SELECTED) */}
                {paymentType === 'online' && (
                  <div style={{
                    background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.95) 0%, rgba(12, 12, 18, 0.98) 100%)',
                    border: '1.5px solid rgba(46, 204, 113, 0.4)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '10px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
                  }}>
                    {/* Header instruction */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Choose Account for Transfer:</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#2ECC71', fontWeight: 600 }}>
                        Total: <strong>Rs. {totalAmount.toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Account Selector Tabs (JazzCash, SadaPay, NayaPay) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                      {Object.keys(PAYMENT_ACCOUNTS).map(key => {
                        const acc = PAYMENT_ACCOUNTS[key];
                        const isSelected = selectedAccountKey === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedAccountKey(key)}
                            style={{
                              padding: '10px 8px',
                              borderRadius: '8px',
                              background: isSelected ? acc.bgColor : 'rgba(255,255,255,0.03)',
                              border: isSelected ? `2px solid ${acc.color}` : '1px solid rgba(255,255,255,0.1)',
                              color: isSelected ? '#fff' : '#888',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? acc.color : '#bbb' }}>
                              {acc.name}
                            </span>
                            <span style={{ fontSize: '0.62rem', color: isSelected ? '#ddd' : '#666', textAlign: 'center' }}>
                              {acc.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Account Details Card */}
                    <div style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: `1px solid ${currentOnlineAccount.borderColor}`,
                      borderRadius: '10px',
                      padding: '14px',
                      marginBottom: '12px'
                    }}>
                      {/* Amount to send */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <span style={{ fontSize: '0.78rem', color: '#aaa' }}>Amount to Transfer:</span>
                        <span className="font-cinzel" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F3E5AB' }}>
                          Rs. {totalAmount.toLocaleString()}
                        </span>
                      </div>

                      {/* Account Title */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.82rem' }}>
                        <span style={{ color: '#888' }}>Account Title / Name:</span>
                        <strong style={{ color: '#fff', fontSize: '0.88rem', letterSpacing: '0.5px' }}>
                          {currentOnlineAccount.accountTitle}
                        </strong>
                      </div>

                      {/* Account Number with Copy */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.82rem' }}>
                        <span style={{ color: '#888' }}>Account Number:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: '#F3E5AB', fontSize: '0.92rem', fontFamily: 'monospace', letterSpacing: '1px' }}>
                            {currentOnlineAccount.accountNumber}
                          </strong>
                          <button
                            type="button"
                            onClick={() => handleCopy(currentOnlineAccount.accountNumber, 'accNumber')}
                            style={{
                              background: copiedField === 'accNumber' ? '#2ECC71' : 'rgba(212, 175, 55, 0.2)',
                              border: '1px solid rgba(212, 175, 55, 0.4)',
                              color: copiedField === 'accNumber' ? '#000' : '#F3E5AB',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            {copiedField === 'accNumber' ? <Check size={11} /> : <Copy size={11} />}
                            <span>{copiedField === 'accNumber' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* IBAN (for SadaPay and NayaPay) */}
                      {currentOnlineAccount.iban && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.82rem', flexWrap: 'wrap', gap: '6px' }}>
                          <span style={{ color: '#888' }}>IBAN (Bank Transfer):</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#ddd', fontSize: '0.76rem', fontFamily: 'monospace' }}>
                              {currentOnlineAccount.iban}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(currentOnlineAccount.iban, 'iban')}
                              style={{
                                background: copiedField === 'iban' ? '#2ECC71' : 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: copiedField === 'iban' ? '#000' : '#ccc',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              {copiedField === 'iban' ? <Check size={10} /> : <Copy size={10} />}
                              <span>{copiedField === 'iban' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* NayaPay ID */}
                      {currentOnlineAccount.nayapayId && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.82rem' }}>
                          <span style={{ color: '#888' }}>NayaPay ID:</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#2ED573', fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 700 }}>
                              {currentOnlineAccount.nayapayId}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(currentOnlineAccount.nayapayId, 'nayapayId')}
                              style={{
                                background: copiedField === 'nayapayId' ? '#2ECC71' : 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: copiedField === 'nayapayId' ? '#000' : '#ccc',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              {copiedField === 'nayapayId' ? <Check size={10} /> : <Copy size={10} />}
                              <span>{copiedField === 'nayapayId' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Instructions */}
                      <div style={{ fontSize: '0.72rem', color: '#999', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', lineHeight: 1.4 }}>
                        ℹ️ {currentOnlineAccount.instructions}
                      </div>
                    </div>

                    {/* Transaction Reference / Sender Name Input (Optional) */}
                    <div>
                      <label style={{ fontSize: '0.74rem', color: '#bbb', fontWeight: 600, display: 'block', marginBottom: '5px' }}>
                        Transaction ID (TID) / Sender Name (Optional)
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. TID 123456789 or Transferred from Ali Raza"
                        value={transactionRef}
                        onChange={e => setTransactionRef(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                      <div style={{ fontSize: '0.68rem', color: '#2ECC71', marginTop: '4px' }}>
                        ✅ Payment transfer ke baad next screen par WhatsApp verify button dabayein taake foran parcel dispatch ho!
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Open Parcel Guarantee Banner */}
              <div style={{
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '8px',
                padding: '9px 12px',
                fontSize: '0.74rem',
                color: '#F3E5AB',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={18} color="#D4AF37" flexShrink={0} />
                <span>
                  <strong>100% Open Parcel Guarantee & Free Shipping:</strong> Parcel rider ke samne khol kar check karein. Nationwide Free Courier Delivery included.
                </span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="btn-gold"
                style={{ 
                  padding: '14px', 
                  fontSize: '0.92rem', 
                  marginTop: '2px', 
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>
                  {paymentType === 'online' 
                    ? `Confirm & Verify Payment via WhatsApp • Rs. ${totalAmount.toLocaleString()}`
                    : `Confirm Cash on Delivery Order • Rs. ${totalAmount.toLocaleString()}`
                  }
                </span>
                <ArrowRight size={16} />
              </button>

            </form>
          </div>
        ) : (
          /* Order Confirmation Screen */
          <div style={{ textAlign: 'center', padding: '10px 4px' }}>
            <div style={{ 
              width: '68px', 
              height: '68px', 
              borderRadius: '50%', 
              background: 'rgba(46, 204, 113, 0.15)', 
              border: '2px solid #2ECC71', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 14px' 
            }}>
              <CheckCircle2 size={38} color="#2ECC71" />
            </div>

            <span style={{ fontSize: '0.76rem', color: '#D4AF37', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Order Placed Successfully!
            </span>
            <h3 className="font-cinzel" style={{ fontSize: '1.65rem', color: '#fff', marginTop: '4px', marginBottom: '4px' }}>
              THANK YOU, {formData.name.toUpperCase()}!
            </h3>
            
            <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '16px' }}>
              Order Reference ID: <strong style={{ color: '#F3E5AB', letterSpacing: '1px' }}>#{orderId}</strong>
            </p>

            {/* HIGH-IMPACT WHATSAPP PAYMENT VERIFICATION CARD */}
            <div style={{
              background: paymentType === 'online'
                ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
              border: paymentType === 'online' ? '2px solid #25D366' : '1.5px solid rgba(37, 211, 102, 0.45)',
              borderRadius: '14px',
              padding: '20px 16px',
              marginBottom: '18px',
              textAlign: 'center',
              boxShadow: paymentType === 'online' ? '0 8px 30px rgba(37, 211, 102, 0.3)' : 'none'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                color: paymentType === 'online' ? '#2ECC71' : '#F3E5AB', 
                fontWeight: 800, 
                fontSize: '0.98rem', 
                marginBottom: '6px' 
              }}>
                <MessageCircle size={20} color="#25D366" />
                <span>
                  {paymentType === 'online'
                    ? 'Verify Payment on WhatsApp (ایک کلک سے تصدیق)'
                    : 'Confirm Order Through WhatsApp'
                  }
                </span>
              </div>
              
              <p style={{ fontSize: '0.8rem', color: '#ddd', marginBottom: '14px', lineHeight: 1.5 }}>
                {paymentType === 'online'
                  ? 'Muhammad Mubashar bhai ko WhatsApp par screenshot / TID send karein. Payment verify hote hi aapka parcel priority express dispatch ho jayega aur 2–3 din mein deliver hoga!'
                  : 'Rider dispatch se pehle ek click se WhatsApp par confirm karein taake aapka order priority queue mein dispatch ho! (Free Delivery • 2–3 Days)'
                }
              </p>

              <a 
                href={`https://api.whatsapp.com/send?phone=${founderPhone}&text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppContact(product?.title, totalAmount)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  padding: '13px 24px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
                  transition: 'all 0.2s',
                  width: '100%'
                }}
              >
                <Send size={18} />
                <span>
                  {paymentType === 'online'
                    ? 'Verify Payment on WhatsApp (رسید بھیجیں)'
                    : 'Confirm on WhatsApp Now (تصدیق کریں)'
                  }
                </span>
              </a>
            </div>

            {/* Receipt Summary Box */}
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '0.8rem',
              color: '#ddd',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <img 
                  src={currentVariantImage} 
                  alt={selectedVariant} 
                  style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #D4AF37', flexShrink: 0 }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{product.title}</div>
                  <div style={{ color: '#F3E5AB', fontSize: '0.78rem', fontWeight: 600, marginTop: '2px' }}>
                    Edition: {selectedVariant}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Variant / Edition:</span>
                <span style={{ color: '#F3E5AB', fontWeight: 600 }}>{selectedVariant}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Quantity:</span>
                <strong>{quantity} unit(s)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Payment Method:</span>
                <span style={{ color: paymentType === 'online' ? '#2ECC71' : '#F3E5AB', fontWeight: 700 }}>
                  {paymentType === 'online' ? `Online (${currentOnlineAccount.name})` : 'Cash on Delivery (COD)'}
                </span>
              </div>
              {paymentType === 'online' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#888' }}>Paid To:</span>
                  <span style={{ color: '#ddd' }}>{currentOnlineAccount.accountTitle} ({currentOnlineAccount.accountNumber})</span>
                </div>
              )}
              {paymentType === 'online' && transactionRef && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#888' }}>Transaction Ref:</span>
                  <span style={{ color: '#F3E5AB', fontFamily: 'monospace' }}>{transactionRef}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Total Amount:</span>
                <strong style={{ color: '#F3E5AB', fontSize: '0.95rem' }}>Rs. {totalAmount.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Delivery Charge:</span>
                <span style={{ color: '#2ECC71', fontWeight: 700 }}>100% FREE (Rs. 0)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>Destination:</span>
                <span>{formData.address}, {formData.city}, {formData.province}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Estimated Delivery:</span>
                <span style={{ color: '#2ECC71' }}>2–3 Business Days (Express Courier)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                type="button"
                onClick={copyOrderDetails}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  padding: '11px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={14} color="#2ECC71" /> : <Copy size={14} />}
                <span>{copied ? 'Receipt Copied!' : 'Copy Receipt'}</span>
              </button>

              <button 
                className="btn-gold" 
                onClick={onClose}
                style={{ padding: '11px', fontSize: '0.82rem' }}
              >
                Continue Browsing
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
