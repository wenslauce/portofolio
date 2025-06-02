# 🔒 Security Setup Guide

## ⚠️ CRITICAL: Environment Variables Security

### **What Happened**
Your `.env` file was previously committed to git history, which exposes sensitive information like API keys and passwords.

### **Immediate Actions Taken**
✅ Updated `.gitignore` with comprehensive exclusions  
✅ Removed current `.env` file from tracking  
✅ Added cache-busting to images to fix deployment issues  
✅ Pushed security fixes to repository  

### **URGENT: Additional Security Steps Required**

#### **1. Rotate ALL Exposed Credentials**
Since your `.env` was in git history, you MUST change:
- **Supabase keys** (generate new project keys)
- **SMTP passwords** (change email app passwords)
- **Any other API keys** that were in the file

#### **2. Clean Git History (Advanced)**
To completely remove `.env` from git history:
```bash
# Option A: Use BFG Repo-Cleaner (recommended)
java -jar bfg.jar --delete-files .env .
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force

# Option B: Manual filter-branch (alternative)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all
git push --force
```

#### **3. Set Up Environment Variables Correctly**

Create a new `.env` file in your project root:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# SMTP Configuration
SMTP_HOST=your_smtp_host_here
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=your_email_password_here
```

#### **4. Verify Deployment Environment**
Ensure your hosting platform (Vercel/Netlify) has environment variables set:
- Go to project settings
- Add environment variables
- Redeploy the application

### **Prevention Checklist**
- [ ] ✅ Never commit `.env` files
- [ ] ✅ Always use `.env.example` for templates
- [ ] ✅ Rotate credentials if accidentally exposed
- [ ] ✅ Use different keys for development/production
- [ ] ✅ Regular security audits of git history

### **Current .gitignore Protection**
Your updated `.gitignore` now protects:
- All `.env*` variants
- Build outputs (`dist/`, `build/`)
- Dependencies (`node_modules/`)
- Cache files
- Editor configurations
- OS-specific files
- Deployment artifacts

### **Deployment Considerations**
- Environment variables must be set in your hosting platform
- Never hardcode secrets in source code
- Use different API keys for staging vs production
- Monitor for any accidental commits of sensitive data

---

**🔴 REMEMBER: Change all exposed credentials immediately!** 