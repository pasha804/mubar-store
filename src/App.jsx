import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBenefits from './components/TrustBenefits';
import UnboxingFeature from './components/UnboxingFeature';
import ProductCatalog from './components/ProductCatalog';
import ProductPage from './components/ProductPage';
import QuickCODModal from './components/QuickCODModal';
import CartDrawer from './components/CartDrawer';
import SocialProof from './components/SocialProof';
import AdminBridge from './components/AdminBridge';
import AdminLogin from './components/AdminLogin';
import PolicyModal from './components/PolicyModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { recordVisitorHit } from './services/storeSync';
import { trackPageView, trackViewContent, trackAddToCart, trackInitiateCheckout } from './services/pixelService';

// Route Parser: detects store, dedicated product page, or founder admin portal
const parseCurrentRoute = () => {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');

  // 1. Founder Admin Portal
  if (
    path === '/pass' ||
    path.startsWith('/pass/') ||
    hash === '#/pass' ||
    hash === '#pass' ||
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#/admin' ||
    hash === '#admin'
  ) {
    return { name: 'admin', productId: null };
  }

  // 2. Query param based product route: ?product=apex-wheel-rim-chain
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const queryProduct = urlParams.get('product') || urlParams.get('watch') || urlParams.get('p');
    if (queryProduct) {
      return { name: 'product', productId: queryProduct };
    }
  } catch (e) {}

  // 3. Clean path based product route: /product/:id or /watch/:id
  const pathMatch = path.match(/^\/(product|watch|p)\/([^\/]+)/i);
  if (pathMatch && pathMatch[2]) {
    return { name: 'product', productId: pathMatch[2] };
  }

  // 4. Hash based product route fallback: #/product/:id or #product/:id
  const hashMatch = hash.match(/^#\/?(product|watch|p)\/([^\/]+)/i);
  if (hashMatch && hashMatch[2]) {
    return { name: 'product', productId: hashMatch[2] };
  }

  // Default: Storefront Homepage
  return { name: 'store', productId: null };
};

export default function App() {
  const [routeState, setRouteState] = useState(parseCurrentRoute);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('mubar_admin_auth') === 'authenticated';
  });

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickBuyProduct, setQuickBuyProduct] = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Handle browser back / forward navigation and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentRoute();
      if (route.name === 'admin' && window.location.pathname.toLowerCase().startsWith('/admin')) {
        window.history.replaceState({}, '', '/pass');
      }
      setRouteState(route);
    };

    if (parseCurrentRoute().name === 'admin' && window.location.pathname.toLowerCase().startsWith('/admin')) {
      window.history.replaceState({}, '', '/pass');
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track authentic visitor hits in Firestore & local cache per page visit + Meta Pixel
  useEffect(() => {
    trackPageView();
    if (routeState.name === 'store') {
      document.title = 'Mubar Store | Buy Luxury Watches Online in Pakistan - Cash on Delivery & Open Parcel';
      recordVisitorHit('/');
    } else if (routeState.name === 'product' && routeState.productId) {
      const prod = PRODUCTS.find(p => p.id === routeState.productId);
      if (prod) {
        document.title = `${prod.title} (Rs. ${prod.salePrice}) | Mubar Store Pakistan`;
        recordVisitorHit(`/product/${prod.id}`);
        trackViewContent(prod);
      } else {
        recordVisitorHit(`/product/${routeState.productId}`);
      }
    }
  }, [routeState]);

  const [selectedProductVariant, setSelectedProductVariant] = useState(null);

  // Navigate to Dedicated Product Page
  const navigateToProduct = (prodOrId, initialVariant = null) => {
    const id = typeof prodOrId === 'string' ? prodOrId : prodOrId?.id;
    if (!id) return;
    setSelectedProductVariant(initialVariant || null);
    window.history.pushState({}, '', `/product/${id}`);
    setRouteState({ name: 'product', productId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Storefront (or specific section)
  const navigateToStore = (sectionId = null) => {
    window.history.pushState({}, '', '/');
    setRouteState({ name: 'store', productId: null });
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigate to Admin Portal
  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/pass');
    setRouteState({ name: 'admin', productId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleQuickBuy = (product) => {
    setQuickBuyProduct(product);
    if (product) {
      trackInitiateCheckout(product);
    }
  };

  const handleAddToCart = (product) => {
    trackAddToCart(product);
    setCartItems(prev => {
      const matchKey = product.selectedVariant 
        ? `${product.id}__${product.selectedVariant}`
        : product.id;

      const existing = prev.find(item => {
        const itemKey = item.selectedVariant ? `${item.id}__${item.selectedVariant}` : item.id;
        return itemKey === matchKey;
      });

      if (existing) {
        return prev.map(item => {
          const itemKey = item.selectedVariant ? `${item.id}__${item.selectedVariant}` : item.id;
          return itemKey === matchKey ? { ...item, qty: item.qty + 1 } : item;
        });
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
    if (routeState.name !== 'store') {
      navigateToStore(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // 1. Founder Admin Portal
  if (routeState.name === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToStore={() => navigateToStore()}
        />
      );
    }

    return (
      <AdminBridge 
        onBackToStore={() => navigateToStore()}
        onLogout={() => {
          localStorage.removeItem('mubar_admin_auth');
          setIsAdminAuthenticated(false);
        }}
      />
    );
  }

  // 2. Dedicated Product Details Page
  if (routeState.name === 'product' && routeState.productId) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary, #F7F5F0)', color: 'var(--text-primary, #252A30)', position: 'relative' }}>
        
        {/* Toast Notification */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '90px',
            zIndex: 2000,
            backgroundColor: 'var(--brand-navy, #172A3A)',
            border: '1px solid var(--accent-gold, #B69A63)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm, 8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            fontSize: '0.86rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Main Brand Navbar */}
        <Navbar 
          cartCount={cartTotalQty}
          onOpenCart={() => setIsCartOpen(true)}
          onScrollTo={(secId) => navigateToStore(secId)}
          onLogoClick={() => navigateToStore()}
        />

        {/* Dedicated Product Page for this specific watch */}
        <ProductPage 
          productId={routeState.productId}
          initialVariant={selectedProductVariant}
          onBackToStore={(secId) => navigateToStore(secId)}
          onNavigateToProduct={(id, v) => navigateToProduct(id, v)}
          onQuickBuy={(p) => handleQuickBuy(p)}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Verified Pakistani Social Proof Carousel */}
        <SocialProof />

        {/* Footer with Policy Links */}
        <Footer 
          onScrollTo={(secId) => navigateToStore(secId)}
          onOpenPolicy={(key) => setActivePolicy(key)}
        />

        {/* Floating WhatsApp Concierge Widget */}
        <WhatsAppWidget />

        {/* Fast Cash on Delivery Checkout Modal */}
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
              handleQuickBuy(cartItems[0]);
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

  // 3. Client Storefront Home
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary, #F7F5F0)', color: 'var(--text-primary, #252A30)', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '90px',
          zIndex: 2000,
          backgroundColor: 'var(--brand-navy, #172A3A)',
          border: '1px solid var(--accent-gold, #B69A63)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-sm, 8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          fontSize: '0.86rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Brand Navbar */}
      <Navbar 
        cartCount={cartTotalQty}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={handleScrollTo}
        onLogoClick={() => navigateToStore()}
      />

      {/* Compact Editorial Promotional Banner (Section 8) */}
      <Hero 
        onExploreClick={() => handleScrollTo('catalog')}
        onSelectFlagship={() => navigateToProduct(PRODUCTS[0].id)}
      />

      {/* Trust-Benefit Row (Desktop Only to keep Mobile direct to watches) */}
      <div className="desktop-only">
        <TrustBenefits />
      </div>

      {/* Product Catalog with Category Filters & Strict 2-Column Mobile Grid (Section 9 & 10) */}
      <ProductCatalog 
        products={PRODUCTS}
        onSelectProduct={(p, v) => navigateToProduct(p, v)}
        onQuickBuy={(p) => handleQuickBuy(p)}
      />

      {/* Verified Pakistani Social Proof & FAQ Accordion */}
      <SocialProof />

      {/* Footer with Policy Links & Official Payment Methods */}
      <Footer 
        onScrollTo={handleScrollTo}
        onOpenPolicy={(key) => setActivePolicy(key)}
      />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppWidget />

      {/* Fast Cash on Delivery Checkout Modal */}
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
            handleQuickBuy(cartItems[0]);
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
