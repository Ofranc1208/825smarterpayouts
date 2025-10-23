# 📅 Appointment System Setup Guide

## ✅ What's Already Done

- ✅ Frontend appointment form (clean & professional)
- ✅ API route `/api/appointments` 
- ✅ Firebase Admin SDK configured
- ✅ Email notification system created
- ✅ Nodemailer installed

---

## 🔧 Setup Steps

### **Step 1: Download Firebase Service Account Key**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **smarterwebsite-3d25d**
3. Click ⚙️ → **Project Settings** → **Service Accounts** tab
4. Click **"Generate New Private Key"**
5. Save the downloaded JSON file as `serviceAccountKey.json` in your project root:
   ```
   C:\Users\ofran\Desktop\smarterpayouts4\serviceAccountKey.json
   ```

⚠️ **IMPORTANT:** Add this to `.gitignore` (already done) - never commit this file!

---

### **Step 2: Set Up Gmail for Email Notifications**

#### **Option A: Use Gmail (Recommended - Simplest)**

1. **Enable 2-Factor Authentication on your Gmail account:**
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Create an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → Enter "SmarterPayouts"
   - Click "Generate"
   - Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

3. **Add to your `.env.local` file:**
   ```env
   # Email Notifications
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

---

### **Step 3: Verify Setup**

1. **Check Firebase Connection:**
   - Make sure `serviceAccountKey.json` exists in project root
   - The file should contain your Firebase credentials

2. **Check Environment Variables:**
   - Open `.env.local`
   - Verify all Firebase variables are set (NEXT_PUBLIC_FIREBASE_*)
   - Add the Gmail variables from Step 2

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

---

## 🧪 Test the System

1. Go to your website
2. Click "Connect with Specialist" → "Book an Appointment"
3. Fill out the form:
   - First Name: Test
   - Date & Time: Tomorrow at 2 PM
   - Phone: (555) 123-4567
   - What do you need help with?: Get a Quote
   - Message: This is a test
4. Click "Book Appointment"

### **What Should Happen:**

✅ Success message appears  
✅ Appointment saved to Firebase Firestore  
✅ Email sent to your inbox with appointment details  
✅ You can view the appointment in [Firebase Console](https://console.firebase.google.com/project/smarterwebsite-3d25d/firestore/data/appointments)

---

## 📧 Email Notification Features

When someone books an appointment, you'll receive an email with:

- 👤 Customer's name
- 📞 Phone number
- 📅 Preferred date
- ⏰ Preferred time
- 💬 Consultation type
- 📝 Optional message
- 🔗 Appointment ID
- ⚡ Urgent reminder to contact within 24 hours

The email is beautifully formatted with HTML and includes a link to view all appointments in Firebase Console.

---

## 🔍 Troubleshooting

### **"Email not configured" message**
- Check that `GMAIL_APP_PASSWORD` is set in `.env.local`
- Make sure you're using an App Password, not your regular Gmail password
- Restart the development server after adding environment variables

### **"Firebase Admin initialization warning"**
- Make sure `serviceAccountKey.json` is in the project root
- Check that the file is valid JSON
- Verify the file permissions

### **Appointments not saving**
- Check Firebase Console for errors
- Make sure your Firebase project has Firestore enabled
- Verify the service account has proper permissions

---

## 📊 View Appointments

### **Firebase Console:**
https://console.firebase.google.com/project/smarterwebsite-3d25d/firestore/data/appointments

### **Appointment Data Structure:**
```json
{
  "id": "apt-1234567890-email-com",
  "name": "John",
  "phone": "(555) 123-4567",
  "preferredDate": "2025-01-24",
  "preferredTime": "14:00",
  "consultationType": "Get a Quote",
  "message": "I have questions about my settlement",
  "email": "pending@smarterpayouts.com",
  "submittedAt": "2025-01-23T10:30:00.000Z",
  "status": "pending",
  "source": "website",
  "priority": "medium"
}
```

---

## 🚀 Production Deployment

Before deploying to production:

1. **Add environment variables to Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Include `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFICATION_EMAIL`

2. **Upload Service Account Key:**
   - Option A: Add as environment variable (convert to base64)
   - Option B: Use Vercel Secrets
   - Option C: Use Firebase Admin with Application Default Credentials

3. **Test in production:**
   - Submit a test appointment
   - Verify email is received
   - Check Firebase Console

---

## 💡 Tips

- **Check spam folder** if you don't receive emails
- **Gmail has sending limits:** 500 emails/day for free accounts
- **Monitor Firebase Console** to see all appointments even if email fails
- **Set up Firebase Functions** (optional) for more advanced email handling
- **Use SendGrid or AWS SES** for production-grade email delivery

---

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify all environment variables are set correctly
4. Make sure `serviceAccountKey.json` exists and is valid

---

**Created:** January 2025  
**Last Updated:** January 2025  
**Version:** 1.0.0

