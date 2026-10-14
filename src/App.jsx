import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UnboxingFeature from './components/UnboxingFeature';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import QuickCODModal from './components/QuickCODModal';
import CartDrawer from './components/CartDrawer';
import SocialProof from './components/SocialProof';
import AdminBridge from './components/AdminBridge';
import PolicyModal from './components/PolicyModal';
import LiveSalesToaster from './components/LiveSalesToaster';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (path === '/admin' || hash === '#/admin' || path.startsWith('/admin')) ? 'admin' : 'store';
  });

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Handle browser back/forward and URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#/admin' || path.startsWith('/admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('store');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (newRoute) => {
    if (newRoute === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentRoute('admin');
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('store');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Added ${product.title} to your bag!`);
  };

  const handleUpdateQty = (id, newQty) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // If user navigates to /admin, render dedicated full-page Founder Dashboard
  if (currentRoute === 'admin') {
    return (
      <AdminBridge onBackToStore={() => navigateTo('store')} />
    );
  }

  // Client Storefront
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070709', color: '#F5F5F7', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '90px',
          zIndex: 2000,
          background: 'rgba(7, 7, 9, 0.95)',
          border: '1.5px solid #D4AF37',
          color: '#F3E5AB',
          padding: '12px 22px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.3)',
          fontSize: '0.88rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar with Live Timer */}
      <AnnouncementBar />

      {/* Main Brand Navbar (No admin console button visible to buyers) */}
      <Navbar 
        cartCount={cartTotalQty}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* High-Impact Hero Section */}
      <Hero 
        onExploreClick={() => handleScrollTo('catalog')}
        onUnboxingClick={() => handleScrollTo('trust-standard')}
        onQuickBuyFlagship={() => setQuickBuyProduct(PRODUCTS[0])}
      />

      {/* Interactive Section 2: Buyer Confidence & Open Parcel Standard */}
      <UnboxingFeature 
        onOrderAnyClick={() => handleScrollTo('catalog')}
      />

      {/* Product Catalog with Budget Filters & 4-Angle Selectors */}
      <ProductCatalog 
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickBuy={(p) => setQuickBuyProduct(p)}
      />

      {/* Verified Pakistani Social Proof with 2-Second Auto-Rotating Roman Urdu Carousel */}
      <SocialProof />

      {/* Luxury Footer with Policy Links */}
      <Footer 
        onScrollTo={handleScrollTo}
        onOpenPolicy={(key) => setActivePolicy(key)}
      />

      {/* Live Sales Notification Toaster */}
      <LiveSalesToaster />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppWidget />

      {/* Full Watch Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onQuickBuy={(p) => setQuickBuyProduct(p)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 1-Click Fast Cash on Delivery Checkout Modal */}
      {quickBuyProduct && (
        <QuickCODModal 
          product={quickBuyProduct}
          onClose={() => setQuickBuyProduct(null)}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          if (cartItems.length > 0) {
            setQuickBuyProduct(cartItems[0]);
          }
        }}
      />

      {/* Policy Modal */}
      {activePolicy && (
        <PolicyModal 
          policyKey={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

    </div>
  );
}
