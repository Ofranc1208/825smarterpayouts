# 🔍 Offer Capture Debugging Guide

## Issue: Offer captures not appearing in Firebase

### Step 1: Check Server/Terminal Logs

**CRITICAL:** All API logs appear in your **terminal** where Next.js is running (not browser console).

When you submit an offer capture, look for these logs in your terminal:

**✅ Success logs (what you should see):**
```
📥 [Offer Capture API] Request received
🔍 [Offer Capture API] Checking Firebase Admin...
✅ [Offer Capture API] Firebase Admin DB is initialized
📝 [Offer Capture API] Request body: {...}
💾 [Offer Capture API] Attempting to save to Firebase...
✅ [Offer Capture API] Successfully saved to Firebase!
✅ [Offer Capture API] Collection: offer-captures
```

**❌ Error logs (what might be happening):**
```
❌ [Offer Capture API] adminDb is null/undefined
❌ [Offer Capture API] Firebase save error: ...
```

---

### Step 2: Check Browser Console

Open browser DevTools (F12) → **Network** tab:

1. Filter by: `offer-captures`
2. Find the POST request to `/api/offer-captures`
3. Click on it → Check:
   - **Status Code:** Should be `200` (green)
   - **Response:** Should show `{"success": true, ...}`
   - If status is `500` or `400`, check the error message

**Also check Console tab for:**
```
📤 [useOfferCapture] Sending request to /api/offer-captures
📥 [useOfferCapture] Response status: 200
✅ [useOfferCapture] Successfully saved offer capture!
```

---

### Step 3: Verify Firebase Console Location

**Where to look in Firebase:**

1. Go to: https://console.firebase.google.com
2. Select project: **smarterwebsite-3d25d**
3. Click: **Firestore Database** (left sidebar)
4. Look for collection: **`offer-captures`** (with hyphen)
   - **NOT:** `offerCaptures` (no hyphen)
   - **NOT:** `offers`
   - **NOT:** `specialists`

**If collection doesn't exist:**
- Collections are **auto-created** when first document is written
- If collection is missing = API write failed
- Check terminal logs for errors

---

### Step 4: Common Issues & Fixes

#### Issue 1: Firebase Admin Not Initialized

**Symptom:** Terminal shows `adminDb is null/undefined`

**Fix:** Verify `serviceAccountKey.json` exists in project root
```bash
ls serviceAccountKey.json
```

#### Issue 2: Permission Denied

**Symptom:** Terminal shows `PERMISSION_DENIED` error

**Fix:** 
1. Check `firestore.rules` - should allow writes:
   ```javascript
   match /{document=**} {
     allow read, write: if true; // For development
   }
   ```
2. Deploy rules: `firebase deploy --only firestore:rules`

#### Issue 3: API Not Being Called

**Symptom:** No logs in terminal at all

**Fix:**
1. Check browser Network tab - is request sent?
2. Check browser Console for JavaScript errors
3. Verify overlay component is calling the hook correctly

#### Issue 4: Email Not Sending

**Symptom:** Data saved but no email received

**Fix:**
1. Check `lib/email-service.ts` - requires:
   - `GMAIL_USER` environment variable
   - `GMAIL_APP_PASSWORD` environment variable  
   - `NOTIFICATION_EMAIL` environment variable
2. Check terminal for: `⚠️ Email notification failed`

---

### Step 5: Manual Test

Test the API directly using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/offer-captures \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "deliveryMethod": "email",
    "offerCode": "123456",
    "calculatorType": "lcp",
    "minOffer": 100000,
    "maxOffer": 120000
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Offer capture submitted successfully",
  "captureId": "offer-...",
  "offerCode": "123456",
  "emailSent": true
}
```

---

### Step 6: Check Email Service Configuration

Email notifications require these environment variables (in `.env.local`):

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
NOTIFICATION_EMAIL=recipient@email.com
```

**To get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password for "Mail"
4. Copy the 16-character password

---

## Quick Checklist

- [ ] Terminal shows API request received
- [ ] Terminal shows Firebase save success
- [ ] Browser Network tab shows 200 status
- [ ] Firebase Console → `offer-captures` collection exists
- [ ] Document appears in Firebase with your email
- [ ] Email notification received (if configured)

---

## Next Steps

1. **Submit another offer capture**
2. **Watch your terminal** (where Next.js is running)
3. **Copy/paste the logs** you see
4. **Share them** so we can identify the exact issue

The logs will tell us exactly what's happening! 🔍

