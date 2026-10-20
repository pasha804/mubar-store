import { FOUNDER_CONTACT } from '../data/products';

export const getWhatsAppNumber = () => {
  return localStorage.getItem('mubar_founder_phone') || FOUNDER_CONTACT.whatsapp || '923084453846';
};

/**
 * Generate a pre-filled WhatsApp click-to-chat URL for a specific watch
 */
export const getWatchWhatsAppUrl = (product, selectedVariant = null) => {
  if (!product) return `https://wa.me/${getWhatsAppNumber()}`;

  const phone = getWhatsAppNumber();
  const variantText = selectedVariant || product.preselectedVariant || product.variants?.[0] || 'Standard Edition';
  const priceFormatted = product.salePrice ? product.salePrice.toLocaleString() : '';

  const message = `Assalam-o-Alaikum Muhammad Mubashar bhai! 🌟\n` +
    `Main MUBAR store se yeh watch order / inquire karna chahta hoon:\n\n` +
    `⌚ *Watch:* ${product.title}\n` +
    `🎨 *Edition/Color:* ${variantText}\n` +
    `💰 *Offer Price:* Rs. ${priceFormatted} (Free Delivery)\n` +
    `📦 *Guarantee:* 100% Open Parcel Check Allowed (Pehle Parcel Kholein, Check Karein, Phir Pay Karein)\n\n` +
    `Kindly iski real video / availability confirm kar dein taake main apna delivery address share kar sakoon. Shukriya!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate WhatsApp URL for entire Cart / Multiple items
 */
export const getCartWhatsAppUrl = (cartItems, subtotal) => {
  const phone = getWhatsAppNumber();
  if (!cartItems || cartItems.length === 0) {
    return `https://wa.me/${phone}`;
  }

  const itemsList = cartItems.map((item, idx) => {
    const variant = item.selectedVariant ? ` (${item.selectedVariant})` : '';
    return `${idx + 1}. *${item.title}*${variant} x ${item.qty} = Rs. ${(item.salePrice * item.qty).toLocaleString()}`;
  }).join('\n');

  const message = `Assalam-o-Alaikum Muhammad Mubashar bhai! 🌟\n` +
    `Main MUBAR store se yeh watches order karna chahta hoon:\n\n` +
    `${itemsList}\n\n` +
    `💵 *Total Bill:* Rs. ${subtotal.toLocaleString()} (Free Delivery)\n` +
    `📦 *Condition:* 100% Open Parcel Doorstep Check\n\n` +
    `Kindly inki availability confirm karein taake main apna delivery address send kar sakoon. Shukriya!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
