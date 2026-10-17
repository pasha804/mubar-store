// Cloud & Local Sync Service for Real Store Visitor Analytics & Orders
// Global Persistent Endpoint: superjsonblob.com

const CLOUD_BLOB_URL = 'https://superjsonblob.com/api/jsonBlob/52609650-bdf6-4233-8ff3-ba693a3d1fb0';

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

// Detect Device Info
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

  let referrer = 'Direct / Bookmarks';
  if (document.referrer) {
    try {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname.includes('google')) referrer = 'Google Search';
      else if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('fb.')) referrer = 'Facebook Ads / Page';
      else if (refUrl.hostname.includes('instagram')) referrer = 'Instagram Profile / Stories';
      else if (refUrl.hostname.includes('tiktok')) referrer = 'TikTok Campaign';
      else if (refUrl.hostname.includes('whatsapp') || refUrl.hostname.includes('wa.me')) referrer = 'WhatsApp Direct';
      else referrer = refUrl.hostname;
    } catch (e) {
      referrer = document.referrer;
    }
  }

  return {
    deviceType,
    browser,
    os,
    referrer,
    screenRes: `${window.screen?.width || 0}x${window.screen?.height || 0}`
  };
};

// Record a Real Visitor Hit (Client Storefront)
export const recordVisitorHit = async (page = '/') => {
  // Do not track admin portal views as customer visits
  if (window.location.pathname.toLowerCase().includes('/pass') || 
      window.location.pathname.toLowerCase().includes('/admin')) {
    return;
  }

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const now = Date.now();
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
    // Keep last 300 logs locally
    localLogs.unshift(hitRecord);
    localStorage.setItem('mubar_visitor_logs', JSON.stringify(localLogs.slice(0, 300)));
  } catch (err) {
    console.error('Local log error:', err);
  }

  // 2. Sync to cloud store asynchronously
  try {
    const res = await fetch(CLOUD_BLOB_URL);
    if (res.ok) {
      const cloudData = await res.json();
      const visitors = Array.isArray(cloudData.visitors) ? cloudData.visitors : [];
      
      // Avoid spamming if same visitor refreshed in under 30 seconds
      const recentSame = visitors.find(v => v.visitorId === visitorId && (now - v.timestamp) < 30000);
      if (!recentSame) {
        visitors.unshift(hitRecord);
        // Retain last 800 real hits for rolling analysis
        const trimmedVisitors = visitors.slice(0, 800);
        
        await fetch(CLOUD_BLOB_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...cloudData,
            visitors: trimmedVisitors,
            lastUpdated: now
          })
        });
      }
    }
  } catch (cloudErr) {
    // Cloud sync fails gracefully (offline or blocked) without affecting user experience
    console.debug('Cloud visitor sync notice:', cloudErr);
  }
};

// Fetch All Store Data (Orders + Real Visitor Logs)
export const fetchStoreAnalytics = async () => {
  let cloudVisitors = [];
  let cloudOrders = [];

  try {
    const res = await fetch(CLOUD_BLOB_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.visitors)) cloudVisitors = data.visitors;
      if (Array.isArray(data.orders)) cloudOrders = data.orders;
    }
  } catch (e) {
    console.warn('Could not fetch cloud analytics, relying on local storage:', e);
  }

  // Merge with local storage
  let localVisitors = [];
  let localOrders = [];
  try {
    localVisitors = JSON.parse(localStorage.getItem('mubar_visitor_logs') || '[]');
    localOrders = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
  } catch (e) {}

  // Deduplicate visitors by visitorId + timestamp (within 1 second window)
  const combinedVisitorsMap = new Map();
  [...cloudVisitors, ...localVisitors].forEach(v => {
    const key = `${v.visitorId}_${Math.floor((v.timestamp || 0) / 1000)}`;
    if (!combinedVisitorsMap.has(key)) {
      combinedVisitorsMap.set(key, v);
    }
  });
  const allVisitors = Array.from(combinedVisitorsMap.values())
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  // Deduplicate orders by id
  const combinedOrdersMap = new Map();
  [...cloudOrders, ...localOrders].forEach(o => {
    if (o && o.id && !combinedOrdersMap.has(o.id)) {
      combinedOrdersMap.set(o.id, o);
    }
  });
  const allOrders = Array.from(combinedOrdersMap.values())
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // Keep local storage up to date with cloud state
  try {
    localStorage.setItem('mubar_orders', JSON.stringify(allOrders));
    localStorage.setItem('mubar_visitor_logs', JSON.stringify(allVisitors.slice(0, 300)));
  } catch (e) {}

  return {
    visitors: allVisitors,
    orders: allOrders
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

// Dispatch and Persist New Order to Local + Cloud
export const persistNewOrder = async (order) => {
  // 1. Save locally
  let updatedOrders = [];
  try {
    const existing = JSON.parse(localStorage.getItem('mubar_orders') || '[]');
    updatedOrders = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem('mubar_orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('mubar-orders-updated'));
  } catch (err) {
    console.error('Local order save err:', err);
  }

  // 2. Save to cloud
  try {
    const res = await fetch(CLOUD_BLOB_URL);
    if (res.ok) {
      const data = await res.json();
      const orders = Array.isArray(data.orders) ? data.orders : [];
      const cloudUpdated = [order, ...orders.filter(o => o.id !== order.id)].slice(0, 200);
      
      await fetch(CLOUD_BLOB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          orders: cloudUpdated,
          lastUpdated: Date.now()
        })
      });
    }
  } catch (err) {
    console.debug('Cloud order save error:', err);
  }

  return updatedOrders;
};
