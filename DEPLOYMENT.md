# 🚀 Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] All tests passing
- [ ] No console.log in production code
- [ ] No hardcoded secrets
- [ ] No TODO comments left

### Performance
- [ ] Bundle size < 200KB (gzipped)
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals all green
- [ ] Images optimized (WebP/AVIF)
- [ ] Code splitting implemented
- [ ] Lazy loading for routes

### Security
- [ ] Environment variables in .env.local
- [ ] No sensitive data in code
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] No known vulnerabilities

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast > 4.5:1
- [ ] Focus indicators visible

### SEO
- [ ] Meta tags configured
- [ ] Sitemap.xml created
- [ ] robots.txt configured
- [ ] Open Graph tags added
- [ ] Structured data (JSON-LD)

## Environment Setup

### Production Environment Variables

```bash
# .env.local
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Your App Name
```

## Build

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Check bundle size
npm run build -- --analyze
```

## Deployment Platforms

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**vercel.json configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_FIREBASE_API_KEY": "@firebase_api_key",
    "VITE_API_URL": "@api_url"
  }
}
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**netlify.toml configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_FIREBASE_API_KEY = "your_key"
  VITE_API_URL = "https://api.yourdomain.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
      - VITE_API_URL=${VITE_API_URL}
```

## Post-Deployment

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure alerts

### Testing

- [ ] Test all pages load correctly
- [ ] Test forms work
- [ ] Test authentication flow
- [ ] Test on mobile devices
- [ ] Test in different browsers
- [ ] Test with slow network

### Verification

- [ ] Check SSL certificate
- [ ] Verify environment variables
- [ ] Check database connections
- [ ] Verify API endpoints
- [ ] Test payment processing (if applicable)

## Continuous Deployment

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Plan

### If Deployment Fails

1. Check error logs
2. Verify environment variables
3. Check database connections
4. Rollback to previous version
5. Investigate root cause
6. Fix and redeploy

### Rollback Commands

```bash
# Vercel
vercel rollback

# Netlify
netlify deploy --prod --dir=dist

# AWS
aws s3 sync s3://backup-bucket/dist s3://your-bucket-name --delete
```

## Performance Optimization

### Caching Strategy

```
- HTML: no-cache
- CSS/JS: cache 1 year (with hash)
- Images: cache 1 month
- API: no-cache
```

### CDN Configuration

- [ ] Enable gzip compression
- [ ] Enable Brotli compression
- [ ] Set cache headers
- [ ] Enable HTTP/2
- [ ] Enable HTTP/3 (QUIC)

## Security Hardening

### Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

### HTTPS

- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] HSTS enabled
- [ ] Certificate auto-renewal configured

## Monitoring & Maintenance

### Daily Checks

- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check performance metrics
- [ ] Review user feedback

### Weekly Checks

- [ ] Review analytics
- [ ] Check security alerts
- [ ] Update dependencies
- [ ] Backup database

### Monthly Checks

- [ ] Security audit
- [ ] Performance review
- [ ] User feedback analysis
- [ ] Plan improvements

## Disaster Recovery

### Backup Strategy

- [ ] Daily database backups
- [ ] Weekly code backups
- [ ] Monthly full backups
- [ ] Test restore procedures

### Recovery Time Objectives (RTO)

- Critical: < 1 hour
- High: < 4 hours
- Medium: < 24 hours
- Low: < 1 week

## Documentation

- [ ] Deployment guide created
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Database schema documented
- [ ] Runbook created for common issues

## Sign-Off

- [ ] Code review completed
- [ ] QA testing passed
- [ ] Security review passed
- [ ] Performance review passed
- [ ] Product owner approval

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Version:** _______________
**Notes:** _______________
