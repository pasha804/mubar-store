# MUBAR Store — n8n Autonomous E-Commerce Blueprints

These production-ready automation workflows are designed based on `awesome-n8n-templates` architecture to run `mubarstore.com` operations automatically.

---

## 📦 Workflows Included

### 1. `n8n_order_confirmation_and_courier.json`
* **Trigger:** Webhook (`POST /webhook/mubar-new-order`)
* **Functions:**
  1. Normalizes Pakistani phone numbers (converts `0308...` to international `92308...`).
  2. Sends an instant Telegram or WhatsApp notification card directly to Founder **Muhammad Mubashar** with full order details, address, and COD collection amount.
  3. Prepares and submits the Trax / PostEx shipment payload with the mandatory instruction: `"OPEN PARCEL CHECK PERMITTED: Allow customer to open the outer box and inspect watch before taking payment."`
  4. Appends order record to Google Sheets for bookkeeping.

### 2. `n8n_abandoned_cart_recovery.json`
* **Trigger:** Webhook (`POST /webhook/mubar-cart-abandoned`)
* **Functions:**
  1. Triggers when a visitor inputs their name and phone number on the checkout modal but exits without submitting.
  2. Waits 15 minutes.
  3. Automatically sends a warm, persuasive Roman Urdu message via WhatsApp reminding them of the **100% Free Express Delivery**, **Cash on Delivery**, and **100% Open Parcel Guarantee**.
  4. Directly captures up to 25–35% of lost orders without manual calling.

### 3. `n8n_social_dm_auto_reply.json`
* **Trigger:** Instagram / TikTok / Facebook Messenger webhook.
* **Functions:**
  1. Automatically detects price queries, COD inquiries, or purchase requests.
  2. Replies in seconds with the verified wholesale price (Rs. 1,899 / Rs. 1,999 / Rs. 2,499), website checkout link, and Founder WhatsApp chat button.

---

## 🚀 How to Import into n8n

1. Open your n8n dashboard (Cloud or Self-Hosted Docker).
2. Click **Add Workflow** ➔ **Import from File**.
3. Select any of the `.json` files in this directory.
4. Set the following environment variables in your n8n instance:
   - `TELEGRAM_BOT_TOKEN` & `TELEGRAM_FOUNDER_CHAT_ID`
   - `TRAX_API_KEY` & `TRAX_PICKUP_ADDRESS_ID`
   - `WHATSAPP_CLOUD_API_TOKEN` & `WHATSAPP_PHONE_NUMBER_ID`
   - `META_PAGE_ACCESS_TOKEN`
5. Activate the workflow!

