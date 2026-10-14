import React, { useState, useEffect } from 'react';
import { 
  Database, Calculator, MapPin, CheckCircle, ExternalLink, 
  Package, ShoppingBag, Phone, RefreshCw, Download, Trash2, 
  PlusCircle, Filter, Search, Settings, DollarSign, MessageCircle, ArrowLeft, Shield 
} from 'lucide-react';
import { PRODUCTS, PAYMENT_ACCOUNTS, FOUNDER_CONTACT } from '../data/products';

export default function AdminBridge({ onBackToStore }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'simulator' | 'sourcing' | 'settings'
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersPerDay, setOrdersPerDay] = useState(7);
  const [founderPhone, setFounderPhone] = useState(
    localStorage.getItem('mubar_founder_phone') || '923084453846'
  );
  const [phoneSaved, setPhoneSaved] = useState(false);

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
      setOrders(stored);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Listen for order updates in the window
  useEffect(() => {
    const handleOrderPlaced = () => {
      loadOrders();
    };
    window.addEventListener('mubar-orders-updated', handleOrderPlaced);
    return () => window.removeEventListener('mubar-orders-updated', handleOrderPlaced);
  }, []);

  // Status changer
  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map(ord => 
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updated);
    localStorage.setItem('mubar_orders', JSON.stringify(updated));
  };

  // Delete individual order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Delete order #${orderId}?`)) {
      const updated = orders.filter(ord => ord.id !== orderId);
      setOrders(updated);
      localStorage.setItem('mubar_orders', JSON.stringify(updated));
    }
  };

  // Clear all orders
  const handleClearAllOrders = () => {
    if (window.confirm('Are you sure you want to delete ALL orders? This cannot be undone.')) {
      setOrders([]);
      localStorage.removeItem('mubar_orders');
    }
  };

  // Add demo order for testing
  const handleAddDemoOrder = () => {
    const demoId = 'MB-' + Math.floor(100000 + Math.random() * 900000);
    const demoWatch = PRODUCTS[0];
    const demoOrder = {
      id: demoId,
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName: 'Hamza Tariq',
      phone: '0321 8472910',
      city: 'Lahore',
      province: 'Punjab',
      address: 'House 28-A, Street 4, Sector Y, DHA Phase 3',
      productTitle: demoWatch.title,
      productId: demoWatch.id,
      productImage: demoWatch.images[0],
      variant: demoWatch.variants?.[0] || 'Standard Edition',
      quantity: 1,
      unitPrice: demoWatch.salePrice,
      totalAmount: demoWatch.salePrice,
      paymentMethod: 'Cash on Delivery (COD)',
      notes: 'Call before delivery. Rider must allow open parcel check.',
      status: 'Pending Verification'
    };
    const updated = [demoOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('mubar_orders', JSON.stringify(updated));
  };

  // Export orders to CSV (Courier format)
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export!');
      return;
    }
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Province', 'City', 'Delivery Address', 'Product', 'Variant', 'Qty', 'Total Amount', 'Payment', 'Status'];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${o.displayDate || o.date}"`,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.province || 'Punjab'}"`,
      `"${o.city}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${o.productTitle}"`,
      `"${o.variant || '-'}"`,
      o.quantity || 1,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      `"${o.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MUBAR_Orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save phone
  const handleSavePhone = (e) => {
    e.preventDefault();
    localStorage.setItem('mubar_founder_phone', founderPhone.trim());
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2500);
  };

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesFilter = filterStatus === 'all' || o.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (o.customerName || '').toLowerCase().includes(q) ||
      (o.phone || '').toLowerCase().includes(q) ||
      (o.id || '').toLowerCase().includes(q) ||
      (o.city || '').toLowerCase().includes(q) ||
      (o.productTitle || '').toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'Pending Verification').length;
  const confirmedCount = orders.filter(o => o.status === 'Confirmed' || o.status === 'Dispatched').length;

  // Simulator Economics (based on new competitive prices)
  const avgSellingPrice = 2250;
  const avgWholesaleCost = 880;
  const avgCourierCost = 280;
  const avgPackagingCost = 130;
  const avgAdCAC = 450;
  const totalUnitCost = avgWholesaleCost + avgCourierCost + avgPackagingCost + avgAdCAC;
  const netProfitPerUnit = avgSellingPrice - totalUnitCost;

  const monthlyOrders = ordersPerDay * 30;
  const monthlyRevenue = monthlyOrders * avgSellingPrice;
  const monthlyProfit = monthlyOrders * netProfitPerUnit;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#07070a',
      color: '#F5F5F7',
      padding: '30px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Navigation & Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src="/images/branding/mubar_logo.jpg" 
              alt="MUBAR Crest" 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1.5px solid #D4AF37',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
                objectFit: 'cover'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-cinzel gold-text" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px' }}>
                  MUBAR
                </span>
                <span style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#F3E5AB',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px'
                }}>
                  /ADMIN PORTAL
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#888' }}>
                Founder & Store Owner: <strong>Muhammad Mubashar</strong> • Private Console
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                if (onBackToStore) {
                  onBackToStore();
                } else {
                  window.location.href = '/';
                }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
            >
              <ArrowLeft size={16} />
              <span>View Client Storefront</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === 'orders' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'orders' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'orders' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={17} color={activeTab === 'orders' ? '#D4AF37' : '#aaa'} />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === 'simulator' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'simulator' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'simulator' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Calculator size={17} color={activeTab === 'simulator' ? '#D4AF37' : '#aaa'} />
            <span>Profit Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('sourcing')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === 'sourcing' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'sourcing' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'sourcing' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <MapPin size={17} color={activeTab === 'sourcing' ? '#D4AF37' : '#aaa'} />
            <span>Shah Alam Sourcing</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === 'settings' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'settings' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'settings' ? '#F3E5AB' : '#aaa',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Settings size={17} color={activeTab === 'settings' ? '#D4AF37' : '#aaa'} />
            <span>Founder Settings</span>
          </button>
        </div>

        {/* TAB 1: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {/* Metric KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Total Orders</div>
                <div className="font-cinzel" style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800, marginTop: '4px' }}>
                  {orders.length}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Gross Revenue</div>
                <div className="font-cinzel" style={{ fontSize: '1.6rem', color: '#F3E5AB', fontWeight: 800, marginTop: '4px' }}>
                  Rs. {totalRevenue.toLocaleString()}
                </div>
              </div>

              <div style={{ background: 'rgba(243, 156, 18, 0.08)', border: '1px solid rgba(243, 156, 18, 0.25)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#F39C12', textTransform: 'uppercase', fontWeight: 700 }}>Pending Verification</div>
                <div className="font-cinzel" style={{ fontSize: '1.6rem', color: '#F39C12', fontWeight: 800, marginTop: '4px' }}>
                  {pendingCount}
                </div>
              </div>

              <div style={{ background: 'rgba(46, 204, 113, 0.08)', border: '1px solid rgba(46, 204, 113, 0.25)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#2ECC71', textTransform: 'uppercase', fontWeight: 700 }}>Confirmed / Active</div>
                <div className="font-cinzel" style={{ fontSize: '1.6rem', color: '#2ECC71', fontWeight: 800, marginTop: '4px' }}>
                  {confirmedCount}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, minWidth: '280px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={15} color="#888" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="text"
                    placeholder="Search customer name, phone, order #, city..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#121218',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#F3E5AB',
                    fontSize: '0.84rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleExportCSV}
                  title="Export orders for Trax / Leopards / PostEx"
                  style={{
                    padding: '9px 14px',
                    borderRadius: '8px',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    color: '#F3E5AB',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} /> Export CSV
                </button>

                <button
                  onClick={handleAddDemoOrder}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ccc',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <PlusCircle size={14} /> Demo Order
                </button>

                {orders.length > 0 && (
                  <button
                    onClick={handleClearAllOrders}
                    title="Clear all orders"
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      background: 'rgba(231, 76, 60, 0.1)',
                      border: '1px solid rgba(231, 76, 60, 0.3)',
                      color: '#E74C3C',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'rgba(255,255,255,0.015)',
                borderRadius: '12px',
                border: '1px dashed rgba(255,255,255,0.1)'
              }}>
                <ShoppingBag size={46} color="#555" style={{ margin: '0 auto 14px' }} />
                <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '6px' }}>No Orders in Record</h4>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '18px' }}>
                  Orders placed by customers on your store will automatically show here in real time.
                </p>
                <button
                  onClick={handleAddDemoOrder}
                  className="btn-gold"
                  style={{ padding: '9px 20px', fontSize: '0.85rem' }}
                >
                  Create Sample Order
                </button>
              </div>
            ) : (
              <div style={{
                overflowX: 'auto',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                background: '#0d0d12'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#8E8E93' }}>
                      <th style={{ padding: '14px 16px' }}>Order & Date</th>
                      <th style={{ padding: '14px 16px' }}>Customer & Contact</th>
                      <th style={{ padding: '14px 16px' }}>Destination</th>
                      <th style={{ padding: '14px 16px' }}>Timepiece & Variant</th>
                      <th style={{ padding: '14px 16px' }}>Amount</th>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 16px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => {
                      const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                      const pkPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;
                      
                      const isOnlineOrder = order.paymentType === 'online' || (order.paymentMethod && !order.paymentMethod.includes('COD'));
                      const whatsappText = isOnlineOrder
                        ? `Assalam-o-Alaikum ${order.customerName}! This is Muhammad Mubashar from MUBAR. Your online payment of Rs. ${order.totalAmount?.toLocaleString()} for order #${order.id} (${order.productTitle}) has been received and verified! Your order is scheduled for priority express dispatch with 100% Free Shipping. Expected delivery: 2–3 business days.`
                        : `Assalam-o-Alaikum ${order.customerName}! This is Muhammad Mubashar from MUBAR regarding your order #${order.id} for the ${order.productTitle}. Are you ready for express dispatch? Open parcel check is 100% allowed before payment!`;

                      const customerWhatsAppUrl = `https://api.whatsapp.com/send?phone=${pkPhone}&text=${encodeURIComponent(whatsappText)}`;

                      return (
                        <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 700, color: '#F3E5AB' }}>#{order.id}</div>
                            <div style={{ fontSize: '0.72rem', color: '#777' }}>{order.displayDate || 'Recent'}</div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 600, color: '#fff' }}>{order.customerName}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                              <span style={{ fontSize: '0.78rem', color: '#aaa' }}>{order.phone}</span>
                              <a
                                href={customerWhatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat with customer on WhatsApp"
                                style={{
                                  background: 'rgba(37, 211, 102, 0.15)',
                                  border: '1px solid rgba(37, 211, 102, 0.3)',
                                  color: '#2ECC71',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <MessageCircle size={11} /> WhatsApp
                              </a>
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px', maxWidth: '200px' }}>
                            <div style={{ color: '#ddd', fontWeight: 600 }}>{order.city}, {order.province || 'PK'}</div>
                            <div style={{ fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {order.address}
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ color: '#fff', fontWeight: 600 }}>{order.productTitle}</div>
                            <div style={{ fontSize: '0.74rem', color: '#D4AF37' }}>{order.variant || 'Standard'} (Qty: {order.quantity || 1})</div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 800, color: '#F3E5AB', fontSize: '0.92rem' }}>Rs. {order.totalAmount?.toLocaleString()}</div>
                            <div style={{ fontSize: '0.72rem', color: isOnlineOrder ? '#2ED573' : '#F3E5AB', fontWeight: 600, marginTop: '2px' }}>
                              {order.paymentMethod || 'Cash on Delivery'}
                            </div>
                            {order.transactionRef && (
                              <div style={{ fontSize: '0.68rem', color: '#888', fontFamily: 'monospace', marginTop: '2px' }}>
                                Ref: {order.transactionRef}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: '1px solid rgba(255,255,255,0.1)',
                                outline: 'none',
                                cursor: 'pointer',
                                background: order.status === 'Pending Verification' ? '#3B2904' :
                                            order.status === 'Confirmed' ? '#0F2C59' :
                                            order.status === 'Dispatched' ? '#27104D' :
                                            order.status === 'Delivered' ? '#0E3B21' : '#3D1414',
                                color: order.status === 'Pending Verification' ? '#F39C12' :
                                       order.status === 'Confirmed' ? '#3498DB' :
                                       order.status === 'Dispatched' ? '#9B59B6' :
                                       order.status === 'Delivered' ? '#2ECC71' : '#E74C3C'
                              }}
                            >
                              <option value="Pending Verification">Pending Verification</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#666',
                                cursor: 'pointer',
                                padding: '6px'
                              }}
                              title="Delete Order"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WHOLESALE PROFIT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '26px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <Calculator size={19} color="#D4AF37" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600 }}>Solo Founder Daily Sales Simulator</h3>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#aaa' }}>Daily Orders Target:</span>
                  <strong style={{ color: '#F3E5AB', fontSize: '1.15rem' }}>{ordersPerDay} Watches / Day</strong>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="50"
                  value={ordersPerDay}
                  onChange={e => setOrdersPerDay(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#D4AF37', cursor: 'pointer' }}
                />
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Monthly Revenue</div>
                  <div className="font-cinzel" style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800, marginTop: '4px' }}>
                    Rs. {monthlyRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#aaa', marginTop: '2px' }}>({monthlyOrders} units sold)</div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Net Margin / Unit</div>
                  <div className="font-cinzel" style={{ fontSize: '1.5rem', color: '#2ECC71', fontWeight: 800, marginTop: '4px' }}>
                    Rs. {netProfitPerUnit.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#aaa', marginTop: '2px' }}>Pure profit per watch</div>
                </div>

                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.35)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#F3E5AB', textTransform: 'uppercase', fontWeight: 700 }}>Clean Monthly Profit</div>
                  <div className="font-cinzel" style={{ fontSize: '1.65rem', color: '#F3E5AB', fontWeight: 900, marginTop: '4px' }}>
                    Rs. {monthlyProfit.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#2ECC71', marginTop: '2px' }}>In your bank account</div>
                </div>
              </div>

              {/* Exact Per-Unit Cost Breakdown */}
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#F3E5AB', marginBottom: '12px' }}>
                  Real Sourcing & Operational Unit Economics (Average Per Watch):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#888' }}>Wholesale Watch:</span>
                    <strong style={{ display: 'block', color: '#fff', marginTop: '2px' }}>Rs. {avgWholesaleCost}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#888' }}>Courier (Trax/Leopards):</span>
                    <strong style={{ display: 'block', color: '#fff', marginTop: '2px' }}>Rs. {avgCourierCost}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#888' }}>Box & Flyer:</span>
                    <strong style={{ display: 'block', color: '#fff', marginTop: '2px' }}>Rs. {avgPackagingCost}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#888' }}>TikTok Ad CAC:</span>
                    <strong style={{ display: 'block', color: '#fff', marginTop: '2px' }}>Rs. {avgAdCAC}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#2ECC71' }}>Net Profit Left:</span>
                    <strong style={{ display: 'block', color: '#2ECC71', fontSize: '0.95rem', marginTop: '2px' }}>Rs. {netProfitPerUnit}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHAH ALAM SOURCING */}
        {activeTab === 'sourcing' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontWeight: 700, marginBottom: '12px' }}>
                  <MapPin size={18} />
                  <span>Shah Alam Market, Lahore Coordinates</span>
                </div>
                <ul style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
                  <li><strong>Madina Watch Market:</strong> Located inside Rang Mahal, Shah Alam Market. Top wholesale center for quartz & kinetic wheel watches.</li>
                  <li><strong>Ganpat Road:</strong> Parallel lane specializing in fashion chronographs, diver homages, and wholesale importer godowns.</li>
                  <li><strong>Sarafa Bazaar Box Makers:</strong> HJB and local craftsmen manufacture velvet cushions & luxury rigid slide boxes starting at Rs. 100–130.</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2ECC71', fontWeight: 700, marginBottom: '12px' }}>
                  <CheckCircle size={18} />
                  <span>Wholesale Negotiation Strategy</span>
                </div>
                <ul style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
                  <li><strong>Check Live Benchmark:</strong> Check <code>tjwholesale.pk</code> or Markaz App wholesale prices before walking into the physical market.</li>
                  <li><strong>Batch Sizing:</strong> Start with 3–5 pieces per design (Total 15–20 watches ~ Rs. 14,000–16,000 capital).</li>
                  <li><strong>Battery Stopper Pin:</strong> Insist that wholesalers keep the plastic crown stopper on so batteries remain 100% fresh for your buyers.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FOUNDER SETTINGS */}
        {activeTab === 'settings' && (
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '26px',
              maxWidth: '620px'
            }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>
                Founder WhatsApp Number Configuration
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '20px' }}>
                When customers place an order and click <strong>"Verify Through WhatsApp Now"</strong>, their pre-filled verification message will be sent directly to this WhatsApp number.
              </p>

              <form onSubmit={handleSavePhone} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Muhammad Mubashar's WhatsApp (International Format without +)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 923084453846"
                    value={founderPhone}
                    onChange={e => setFounderPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#F3E5AB',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{ fontSize: '0.74rem', color: '#888', marginTop: '4px' }}>
                    Format: <code>923084453846</code> (Start with 92, don't include + or dashes)
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ padding: '11px 24px', fontSize: '0.88rem' }}
                  >
                    Save WhatsApp Number
                  </button>
                  {phoneSaved && (
                    <span style={{ color: '#2ECC71', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={15} /> Saved successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Configured Payment Accounts Overview */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '26px',
              maxWidth: '620px',
              marginTop: '20px'
            }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>
                Configured Online Payment Accounts
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '16px' }}>
                These are the accounts presented to customers during online payment checkout with 1-click copy buttons and WhatsApp payment verification:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.values(PAYMENT_ACCOUNTS).map(acc => (
                  <div key={acc.id} style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: `1px solid ${acc.borderColor}`,
                    borderRadius: '10px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, color: acc.color, fontSize: '0.92rem' }}>
                        {acc.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#fff', marginTop: '2px' }}>
                        Title: <strong>{acc.accountTitle}</strong> • Number: <span style={{ fontFamily: 'monospace', color: '#F3E5AB' }}>{acc.accountNumber}</span>
                      </div>
                      {acc.iban && (
                        <div style={{ fontSize: '0.72rem', color: '#aaa', fontFamily: 'monospace', marginTop: '2px' }}>
                          IBAN: {acc.iban}
                        </div>
                      )}
                      {acc.nayapayId && (
                        <div style={{ fontSize: '0.72rem', color: '#2ED573', fontFamily: 'monospace', marginTop: '2px' }}>
                          NayaPay ID: {acc.nayapayId}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', background: acc.bgColor, color: acc.color, border: `1px solid ${acc.borderColor}`, padding: '4px 10px', borderRadius: '4px', fontWeight: 700 }}>
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
