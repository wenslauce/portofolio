# 🔧 Resend Domain Configuration Guide

## 🚨 Current Issue
Your emails are being sent from `onboarding@resend.dev` instead of `hello@wenslauce.com` because your domain isn't verified with Resend.

## ✅ Solution Options

### Option 1: Verify Your Domain (Recommended)
This allows you to send emails from `hello@wenslauce.com`.

### Option 2: Use Resend Subdomain (Quick Setup)
This uses `portfolio@updates.wenslauce.com` or similar.

---

## 🎯 Option 1: Domain Verification (Professional Setup)

### Step 1: Add Domain to Resend
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `wenslauce.com`
4. Click **"Add Domain"**

### Step 2: Add DNS Records
Resend will provide DNS records to add to your domain registrar:

```dns
Type: TXT
Name: @
Value: resend-verification=your_verification_token

Type: MX
Name: @
Value: 10 mx1.resend.com
Value: 20 mx2.resend.com

Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"

Type: CNAME
Name: rs1._domainkey
Value: rs1.wenslauce.com._domainkey.resend.com

Type: CNAME
Name: rs2._domainkey
Value: rs2.wenslauce.com._domainkey.resend.com
```

### Step 3: Wait for Verification
- DNS propagation: 24-48 hours
- Resend verification: Usually within 1 hour after DNS propagation
- Check status in Resend dashboard

### Step 4: Update Function Configuration
Once verified, update the function:

```typescript
const FROM_EMAIL = "hello@wenslauce.com"; // Update this line
```

---

## ⚡ Option 2: Use Resend Subdomain (Quick Setup)

### Step 1: Create Subdomain
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter a subdomain: `mail.wenslauce.com` or `updates.wenslauce.com`

### Step 2: Add DNS Record
Only one DNS record needed:

```dns
Type: CNAME
Name: mail (or updates)
Value: resend.com
```

### Step 3: Update Function
```typescript
const FROM_EMAIL = "hello@mail.wenslauce.com"; // Use subdomain
```

---

## 🔧 Current Function Configuration

The function is now configured to:

### ✅ **Immediate Fix Applied:**
- Uses `onboarding@resend.dev` (works immediately)
- Sets proper reply-to headers
- Uses your name as sender name
- Replies go to your actual email

### 📧 **Email Headers:**
```
From: Wenslauce Chengo <onboarding@resend.dev>
Reply-To: hello@wenslauce.com
To: client@email.com
```

This means:
- ✅ Emails send immediately
- ✅ Clients see your name as sender
- ✅ When clients reply, it goes to hello@wenslauce.com
- ✅ Professional appearance maintained

---

## 🚀 Deployment Steps

### 1. Deploy Updated Function
```bash
# Deploy the updated function
supabase functions deploy sendEmail
```

### 2. Test Current Setup
- Submit your contact form
- Check that emails are sent successfully
- Verify reply-to functionality works

### 3. Set Up Domain (Optional)
- Choose Option 1 or 2 above
- Update `FROM_EMAIL` in function after verification
- Redeploy function

---

## 📊 Email Configuration Details

### Current Setup (Works Immediately):
```typescript
FROM_EMAIL = "onboarding@resend.dev"
FROM_NAME = "Wenslauce Chengo"
REPLY_TO_EMAIL = "hello@wenslauce.com"
```

### After Domain Verification:
```typescript
FROM_EMAIL = "hello@wenslauce.com"
FROM_NAME = "Wenslauce Chengo"
REPLY_TO_EMAIL = "hello@wenslauce.com"
```

---

## 🛠️ Troubleshooting

### If Emails Still Don't Send:
1. Check Resend API key is correct
2. Verify function deployment succeeded
3. Check Supabase function logs
4. Test with a simple email first

### If Domain Verification Fails:
1. Double-check DNS records
2. Wait 48 hours for propagation
3. Use DNS checker tools
4. Contact your domain registrar

### If Emails Go to Spam:
1. Domain verification helps significantly
2. Set up DKIM records (provided by Resend)
3. Ask clients to check spam folders initially
4. Use consistent sender information

---

## 🎯 Recommended Action

### Immediate (5 minutes):
1. Deploy the updated function
2. Test that emails work with `onboarding@resend.dev`
3. Verify reply functionality

### Later (when convenient):
1. Set up domain verification in Resend
2. Add DNS records to your registrar
3. Wait for verification
4. Update function with your domain
5. Redeploy function

---

**✅ Your email system now works immediately with proper reply-to headers, and you can upgrade to your own domain when ready!** 