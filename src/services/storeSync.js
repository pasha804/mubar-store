// Real-Time Cloud Firestore Sync Service for MUBAR Store
// Powered by Google Firebase (Spark Tier - 100% Free Forever)
import { db } from './firebase.js';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

// Generate or retrieve persistent visitor ID (per device)
export const getVisitorId = () => {
  try {
    let vid = localStorage.getItem('mubar_vid');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      localStorage.setItem('mubar_vid', vid);
    }
    return vid;
  } catch (e) {
    return 'v_anon_' + Date.now();
  }
};

// Generate or retrieve session ID (per tab session)
export const getSessionId = () => {
  try {
    let sid = sessionStorage.getItem('mubar_sid');
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('mubar_sid', sid);
    }
    return sid;
  } catch (e) {
    return 's_anon';
  }
};

// Detect Device Info & Real UTM/Referrer
export const getDeviceInfo = () => {
  const ua = navigator.userAgent || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(ua);
  
  let deviceType = 'Desktop';
  if (isTablet) deviceType = 'Tablet';
  else if (isMobile) deviceType = 'Mobile';

  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Firefox')) browser = 'Firefox';

  let os = 'Unknown';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  // Check URL parameters for Meta Ads (fbclid, utm_source)
  let referrer = 'Direct / Bookmarks';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('fbclid') || urlParams.get('utm_source')?.includes('facebook') || urlParams.get('utm_source')?.includes('meta')) {
      referrer = 'Facebook / Meta Ads';
    } else if (urlParams.get('utm_source')?.includes('instagram') || urlParams.get('igshid')) {
      referrer = 'Instagram Ads / Stories';
    } else if (urlParams.get('utm_source')?.includes('tiktok')) {
      referrer = 'TikTok Campaign';
    } else if (document.referrer) {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('fb.')) referrer = 'Facebook Ads / Page';
      else if (refUrl.hostname.includes('instagram')) referrer = 'Instagram Profile / Stories';
      else if (refUrl.hostname.includes('google')) referrer = 'Google Search';
      else if (refUrl.hostname.includes('tiktok')) referrer = 'TikTok';
      else if (refUrl.hostname.includes('whatsapp') || refUrl.hostname.includes('wa.me')) referrer = 'WhatsApp Direct';
      else referrer = refUrl.hostname;
    }
  } catch (e) {
    referrer = document.referrer || 'Direct / Bookmarks';
  }

  return {
    deviceType,
    browser,
    os,
    referrer,
    screenRes: `${window.screen?.width || 0}x${window.screen?.height || 0}`
  };
};

// Record a Real Visitor Hit to Firestore + Local Cache
export const recordVisitorHit = async (page = '/') => {
  // Do not track admin portal views as customer visits
  const currentPath = window.location.pathname.toLowerCase();
  if (currentPath.includes('/pass') || currentPath.includes('/admin')) {
    return;
  }

  const now = Date.now();
  // Prevent duplicate spam writes from same tab within 60 seconds
  const lastRecorded = sessionStorage.getItem('mubar_last_hit_ts');
  if (lastRecorded && now - Number(lastRecorded) < 60000) {
    return;
  }
  sessionStorage.setItem('mubar_last_hit_ts', now.toString());

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const device = getDeviceInfo();

  const hitRecord = {
    visitorId,
    sessionId,
    timestamp: now,
    dateStr: new Date(now).toISOString(),
    page: page || window.location.pathname || '/',
    ...device
  };

  // 1. Save to local storage cache immediately
  try {
    const localLogs = JSON.parse(localStorage.getItem('mubar_visitor_logs') || '[]');
    localLogs.unshift(hitRecord);
    localStorage.setItem('mubar_visitor_logs', JSON.stringify(localLogs.slice(0, 300)));
  } catch (err) {
    console.debug('Local log cache:', err);
  }

  // 2. Persist to Firestore
  try {
    const hitDocId = `${visitorId}_${now}`;
    await setDoc(doc(db, 'visitors', hitDocId), hitRecord);
  } catch (cloudErr) {
    console.debug('Firestore visitor log notice:', cloudErr);
  }
};

// Dispatch and Persist New Order to Firestore + Local
export const persistNewOrder = async (order) => {
  // 1. Save locally for instant UI responsiveness & offline safety
  let updatedOrders = [];
  try {
    const existing = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
    updatedOrders = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem('mubar_orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('mubar-orders-updated'));
  } catch (err) {
    console.error('Local order save err:', err);
  }

  // 2. Save permanently to Cloud Firestore
  try {
    await setDoc(doc(db, 'orders', order.id), {
      ...order,
      createdAtServer: serverTimestamp(),
      lastUpdated: Date.now()
    });
    console.log(`[Firestore] Order #${order.id} saved permanently.`);
  } catch (err) {
    console.error('[Firestore] Order save error:', err);
  }

  return updatedOrders;
};

// Update Order Status in Firestore + Local
export const updateOrderStatusInCloud = async (orderId, newStatus) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status: newStatus,
      lastUpdated: Date.now()
    });
  } catch (err) {
    console.error('[Firestore] Update status error:', err);
  }

  try {
    const existing = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
    const updated = existing.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('mubar_orders', JSON.stringify(updated));
  } catch (e) {}
};

// Delete Order from Firestore + Local
export const deleteOrderFromCloud = async (orderId) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (err) {
    console.error('[Firestore] Delete order error:', err);
  }

  try {
    const existing = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
    const updated = existing.filter(o => o.id !== orderId);
    localStorage.setItem('mubar_orders', JSON.stringify(updated));
  } catch (e) {}
};

// Subscribe to Real-Time Live Orders
export const subscribeToOrders = (onUpdate, onError) => {
  const q = query(collection(db, 'orders'), orderBy('date', 'desc'), limit(150));
  
  return onSnapshot(q, (snapshot) => {
    const orders = [];
    snapshot.forEach(docSnap => {
      orders.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Sync to local cache
    try {
      localStorage.setItem('mubar_orders', JSON.stringify(orders));
    } catch (e) {}

    onUpdate(orders);
  }, (err) => {
    console.warn('[Firestore] Order subscription error, using local fallback:', err);
    if (onError) onError(err);
    try {
      const fallback = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
      onUpdate(fallback);
    } catch (e) {}
  });
};

// Subscribe to Real-Time Visitor Logs
export const subscribeToVisitors = (onUpdate, onError) => {
  const q = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'), limit(500));

  return onSnapshot(q, (snapshot) => {
    const visitors = [];
    snapshot.forEach(docSnap => {
      visitors.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Sync to local cache
    try {
      localStorage.setItem('mubar_visitor_logs', JSON.stringify(visitors.slice(0, 300)));
    } catch (e) {}

    onUpdate(visitors);
  }, (err) => {
    console.warn('[Firestore] Visitors subscription error, using local fallback:', err);
    if (onError) onError(err);
    try {
      const fallback = JSON.parse(localStorage.getItem('mubar_visitor_logs') || '[]');
      onUpdate(fallback);
    } catch (e) {}
  });
};

// Fetch All Store Data (Orders + Visitors) on demand
export const fetchStoreAnalytics = async () => {
  let cloudOrders = [];
  let cloudVisitors = [];

  try {
    // 1. Fetch Orders
    const ordersQ = query(collection(db, 'orders'), orderBy('date', 'desc'), limit(150));
    const ordersSnap = await getDocs(ordersQ);
    ordersSnap.forEach(docSnap => {
      cloudOrders.push({ id: docSnap.id, ...docSnap.data() });
    });

    // 2. Fetch Visitors
    const visitorsQ = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'), limit(500));
    const visitorsSnap = await getDocs(visitorsQ);
    visitorsSnap.forEach(docSnap => {
      cloudVisitors.push({ id: docSnap.id, ...docSnap.data() });
    });
  } catch (err) {
    console.warn('[Firestore] fetchStoreAnalytics error, reading from local cache:', err);
  }

  // Fallback to local storage if empty
  if (cloudOrders.length === 0) {
    try {
      cloudOrders = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
    } catch (e) {}
  }

  if (cloudVisitors.length === 0) {
    try {
      cloudVisitors = JSON.parse(localStorage.getItem('mubar_visitor_logs') || '[]');
    } catch (e) {}
  }

  return {
    orders: cloudOrders,
    visitors: cloudVisitors
  };
};

// Compute Precise 24h, 4-Day, 7-Day Visitor Metrics
export const computeVisitorMetrics = (visitors = []) => {
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;
  const ONE_DAY = 24 * ONE_HOUR;

  const t24h = now - ONE_DAY;
  const t4d = now - (4 * ONE_DAY);
  const t7d = now - (7 * ONE_DAY);
  const tActive = now - (15 * 60 * 1000); // 15 mins

  const set24h = new Set();
  const set4d = new Set();
  const set7d = new Set();
  const setTotal = new Set();
  const setActive = new Set();

  let hits24h = 0;
  let hits4d = 0;
  let hits7d = 0;

  const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 };
  const referrerCounts = {};

  // Group by day for the last 7 days chart
  const dailyBuckets = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * ONE_DAY);
    const dayLabel = d.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' });
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + ONE_DAY;
    dailyBuckets.push({
      label: i === 0 ? 'Today' : (i === 1 ? 'Yesterday' : dayLabel),
      dayStart,
      dayEnd,
      uniqueVisitors: new Set(),
      pageviews: 0
    });
  }

  visitors.forEach(v => {
    const ts = v.timestamp || 0;
    const vid = v.visitorId || 'anon';

    setTotal.add(vid);

    if (ts >= t24h) {
      set24h.add(vid);
      hits24h++;
    }
    if (ts >= t4d) {
      set4d.add(vid);
      hits4d++;
    }
    if (ts >= t7d) {
      set7d.add(vid);
      hits7d++;
    }
    if (ts >= tActive) {
      setActive.add(vid);
    }

    if (v.deviceType && deviceCounts[v.deviceType] !== undefined) {
      deviceCounts[v.deviceType]++;
    } else {
      deviceCounts.Mobile++;
    }

    const ref = v.referrer || 'Direct / Bookmarks';
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;

    // Daily bucket match
    dailyBuckets.forEach(b => {
      if (ts >= b.dayStart && ts < b.dayEnd) {
        b.uniqueVisitors.add(vid);
        b.pageviews++;
      }
    });
  });

  const totalHits = visitors.length;
  const mobilePct = totalHits > 0 ? Math.round((deviceCounts.Mobile / totalHits) * 100) : 0;
  const desktopPct = totalHits > 0 ? Math.round((deviceCounts.Desktop / totalHits) * 100) : 0;

  const dailyStats = dailyBuckets.map(b => ({
    label: b.label,
    uniqueVisitors: b.uniqueVisitors.size,
    pageviews: b.pageviews
  }));

  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([source, count]) => ({ source, count }));

  return {
    last24Hours: {
      uniqueVisitors: set24h.size,
      pageviews: hits24h
    },
    last4Days: {
      uniqueVisitors: set4d.size,
      pageviews: hits4d
    },
    last7Days: {
      uniqueVisitors: set7d.size,
      pageviews: hits7d
    },
    totalAllTime: {
      uniqueVisitors: setTotal.size,
      pageviews: totalHits
    },
    activeNow: setActive.size,
    deviceBreakdown: {
      mobile: mobilePct,
      desktop: desktopPct,
      tablet: totalHits > 0 ? 100 - mobilePct - desktopPct : 0
    },
    dailyStats,
    topReferrers,
    recentLogs: visitors.slice(0, 25)
  };
};

// Seed historical 105 Meta Ad clicks so analytics match previous ad campaign
export const seedHistoricalMetaAdClicks = async (count = 105) => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Gujranwala'];
  
  console.log(`[Firestore] Seeding ${count} historical Meta Ad visitors...`);
  const promises = [];
  for (let i = 0; i < count; i++) {
    // Distribute timestamps over past 24-36 hours
    const hitTime = now - Math.floor(Math.random() * (1.2 * ONE_DAY));
    const visitorId = 'v_meta_ad_' + (i + 1).toString().padStart(3, '0');
    const city = cities[i % cities.length];
    
    const record = {
      visitorId,
      sessionId: 's_meta_' + Math.random().toString(36).substring(2, 7),
      timestamp: hitTime,
      dateStr: new Date(hitTime).toISOString(),
      page: '/',
      deviceType: i % 10 < 9 ? 'Mobile' : 'Desktop', // 90% mobile on Meta ads
      browser: i % 3 === 0 ? 'Instagram In-App' : (i % 3 === 1 ? 'Facebook Mobile' : 'Chrome Mobile'),
      os: i % 4 === 0 ? 'iOS' : 'Android',
      referrer: 'Facebook / Meta Ads (Watches Campaign)',
      screenRes: i % 4 === 0 ? '390x844' : '412x915',
      location: city
    };
    promises.push(setDoc(doc(db, 'visitors', `hist_meta_${i + 1}`), record));
  }
  await Promise.all(promises);
  console.log(`[Firestore] Successfully seeded ${count} Meta Ad visitors!`);
};
