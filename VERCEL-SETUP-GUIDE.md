# Vercel Deployment Setup Guide

## 🚀 Current Status
Your portfolio is deployed to Vercel, but we need to configure domain redirects properly to fix the Google Search Console indexing issues.

## 🔧 Vercel Configuration Steps

### 1. Domain Configuration in Vercel Dashboard

#### Primary Domain Setup:
1. Go to your Vercel dashboard
2. Select your project
3. Navigate to **Settings** → **Domains**
4. Add both domains:
   - `wenslauce.com` (primary)
   - `www.wenslauce.com` (redirect to primary)

#### Set Primary Domain:
- Set `wenslauce.com` as your **primary domain**
- Vercel will automatically redirect `www.wenslauce.com` → `wenslauce.com`

### 2. DNS Configuration

#### For your domain registrar:
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate
- Vercel automatically provisions SSL certificates
- HTTP → HTTPS redirects are handled automatically
- No additional configuration needed

## ✅ What's Already Configured

### vercel.json Features:
- **SPA Routing**: All routes serve your React app
- **Trailing Slash Removal**: Clean URLs
- **Security Headers**: XSS protection, frame options, etc.
- **Performance**: Asset caching, compression
- **SEO Files**: Proper headers for sitemap.xml and robots.txt

## 🔍 Testing Your Setup

### Manual Testing:
1. **Test main routes**:
   ```
   https://wenslauce.com
   https://wenslauce.com/about
   https://wenslauce.com/projects
   https://wenslauce.com/certificates
   ```

2. **Test project routes** (the ones that were failing):
   ```
   https://wenslauce.com/project/monarch-private-charters
   https://wenslauce.com/project/mukono-energies
   https://wenslauce.com/project/w-giertsen-energy-solutions
   ```

3. **Test certificate routes**:
   ```
   https://wenslauce.com/certificate/cert-afp-2024
   https://wenslauce.com/certificate/cert-media-ethics-2024
   ```

4. **Test redirects**:
   ```
   https://www.wenslauce.com → should redirect to https://wenslauce.com
   https://wenslauce.com/project/test/ → should redirect to https://wenslauce.com/project/test
   ```

## 🛠️ Common Issues & Solutions

### Issue: "www" not redirecting
**Solution**: In Vercel Dashboard → Settings → Domains, ensure `wenslauce.com` is set as the primary domain.

### Issue: Routes still returning 404
**Solution**: 
1. Check that `vercel.json` is in your project root
2. Ensure build completed successfully
3. Force redeploy in Vercel dashboard

### Issue: SSL certificate problems
**Solution**: 
1. Wait 24-48 hours for DNS propagation
2. Check domain configuration in Vercel
3. Verify DNS records with your registrar

## 📊 Google Search Console Fix

### After Domain Setup:
1. **Add both domains** to Google Search Console:
   - `wenslauce.com` (primary)
   - `www.wenslauce.com` (will show redirects)

2. **Set preferred domain**: Use `wenslauce.com` as canonical

3. **Request re-indexing** for failed URLs:
   ```
   https://wenslauce.com/project/monarch-private-charters
   https://wenslauce.com/project/mukono-energies
   https://wenslauce.com/project/w-giertsen-energy-solutions
   https://wenslauce.com/project/x-stream-entertainment
   https://wenslauce.com/project/ronami-international
   https://wenslauce.com/project/kenya-law-ai
   https://wenslauce.com/project/identity-radio
   https://wenslauce.com/project/hon-peter-wandera-foundation
   https://wenslauce.com/project/afri-rise-equity
   https://wenslauce.com/certificate/cert-afp-2024
   https://wenslauce.com/certificate/cert-media-ethics-2024
   https://wenslauce.com/certificate/cert-journalism-2023
   ```

## 🎯 Expected Results

### Immediate (after domain setup):
- ✅ All routes accessible without 404
- ✅ www → non-www redirects working
- ✅ Clean URLs (no trailing slashes)
- ✅ HTTPS enforced automatically

### Within 1-3 days:
- ✅ Google re-crawls fixed URLs
- ✅ Search Console shows successful indexing
- ✅ 404 errors disappear from coverage report

### Within 1-2 weeks:
- ✅ Full recovery of search rankings
- ✅ All pages properly indexed
- ✅ Clean coverage report in Search Console

## 🔗 Quick Actions

### 1. Check Current Status:
```bash
# Run this to test your deployment
node vercel-deploy-check.cjs
```

### 2. Force Redeploy:
- Go to Vercel Dashboard → Deployments
- Click "Redeploy" on latest deployment
- Or push any small change to trigger redeploy

### 3. Monitor Progress:
- Check Vercel deployment logs
- Monitor Google Search Console coverage
- Test URLs manually in incognito mode

---

**🎯 Next Step**: Configure your domains in the Vercel dashboard as described above, then test the routes! 