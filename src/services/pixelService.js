/**
 * Meta (Facebook) Pixel Event Tracking Service
 * Pixel ID: 1638013851386202
 * Handles standard eCommerce conversion events for Facebook Ads optimization
 */

export const fbTrack = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, params);
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking event "${eventName}":`, err);
    }
  }
};

export const fbTrackCustom = (customEventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('trackCustom', customEventName, params);
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking custom event "${customEventName}":`, err);
    }
  }
};

/**
 * Standard eCommerce Events
 */

// 1. PageView
export const trackPageView = () => {
  fbTrack('PageView');
};

// 2. ViewContent - When a user visits a product details page
export const trackViewContent = (product) => {
  if (!product) return;
  fbTrack('ViewContent', {
    content_name: product.title,
    content_category: product.category || 'Watches',
    content_ids: [product.id],
    content_type: 'product',
    value: product.salePrice,
    currency: 'PKR'
  });
};

// 3. AddToCart - When user adds product to shopping bag
export const trackAddToCart = (product, quantity = 1) => {
  if (!product) return;
  fbTrack('AddToCart', {
    content_name: product.title,
    content_ids: [product.id],
    content_type: 'product',
    value: (product.salePrice || 0) * (quantity || 1),
    currency: 'PKR'
  });
};

// 4. InitiateCheckout - When user opens checkout modal / begins purchase flow
export const trackInitiateCheckout = (product, totalAmount = null) => {
  if (!product) return;
  fbTrack('InitiateCheckout', {
    content_name: product.title,
    content_ids: [product.id],
    content_type: 'product',
    value: totalAmount || product.salePrice,
    currency: 'PKR',
    num_items: 1
  });
};

// 5. Purchase - When user successfully confirms Cash on Delivery or Online order
export const trackPurchase = (order) => {
  if (!order) return;
  fbTrack('Purchase', {
    content_name: order.productTitle,
    content_ids: [order.productId],
    content_type: 'product',
    value: order.totalAmount,
    currency: 'PKR',
    num_items: order.quantity || 1,
    order_id: order.id
  });
};

// 6. Contact via WhatsApp - High intent conversion signal
export const trackWhatsAppContact = (productTitle, value = null) => {
  fbTrackCustom('WhatsAppLead', {
    product_name: productTitle || 'Store Inquiry',
    value: value || 0,
    currency: 'PKR'
  });
};
