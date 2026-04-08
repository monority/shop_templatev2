# 📝 Useful Commands

## Development

```bash
# Start development server
npm run dev

# Start with specific port
npm run dev -- --port 3000

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Package Management

```bash
# Install dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## Git Commands

```bash
# Initialize git
git init

# Add all changes
git add .

# Commit changes
git commit -m "feat: Add new feature"

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature

# View commit history
git log --oneline

# View changes
git diff

# Stash changes
git stash

# Apply stashed changes
git stash pop
```

## Docker Commands

```bash
# Build Docker image
docker build -t my-app .

# Run Docker container
docker run -p 3000:3000 my-app

# Run with environment variables
docker run -p 3000:3000 -e VITE_API_URL=http://api.example.com my-app

# Docker compose up
docker-compose up

# Docker compose down
docker-compose down

# View running containers
docker ps

# View all containers
docker ps -a

# Stop container
docker stop container-id

# Remove container
docker rm container-id

# View logs
docker logs container-id
```

## Deployment Commands

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel list

# Rollback deployment
vercel rollback
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod

# View deployments
netlify sites

# Open site
netlify open
```

### AWS S3

```bash
# Configure AWS CLI
aws configure

# Upload to S3
aws s3 sync dist/ s3://bucket-name --delete

# List S3 buckets
aws s3 ls

# Create S3 bucket
aws s3 mb s3://bucket-name

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

## Database Commands

```bash
# Firebase Emulator
firebase emulators:start

# Deploy to Firebase
firebase deploy

# View Firebase logs
firebase functions:log

# Initialize Firebase
firebase init
```

## Testing Commands

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.jsx

# Update snapshots
npm test -- -u
```

## Code Quality

```bash
# Format code with Prettier
npx prettier --write .

# Check code formatting
npx prettier --check .

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix

# Type check (if using TypeScript)
npx tsc --noEmit
```

## Performance Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Check Lighthouse
npx lighthouse https://yoursite.com

# Profile React components
# Use React DevTools browser extension

# Check Core Web Vitals
# Use PageSpeed Insights: https://pagespeed.web.dev
```

## Useful npm Scripts to Add

Add these to `package.json`:

```json
{
  "scripts": {
    "dev": "vite --port 5175",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "analyze": "vite build --analyze"
  }
}
```

## Environment Variables

```bash
# Copy environment template
cp .env.example .env.local

# View environment variables
cat .env.local

# Edit environment variables
# Use your editor to open .env.local
```

## Debugging

```bash
# Debug with Node
node --inspect-brk ./node_modules/vite/bin/vite.js

# Debug in Chrome
# Visit chrome://inspect

# React DevTools
# Install browser extension

# Redux DevTools
# Install browser extension

# Console logging
console.log('Debug:', variable);
console.table(array);
console.time('label');
console.timeEnd('label');
```

## System Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check git version
git --version

# List global npm packages
npm list -g --depth=0

# Clear npm cache
npm cache clean --force

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Useful Aliases

Add to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
# Development
alias dev="npm run dev"
alias build="npm run build"
alias lint="npm run lint"
alias test="npm test"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline"

# Docker
alias dc="docker-compose"
alias dcup="docker-compose up"
alias dcdown="docker-compose down"

# Utilities
alias ll="ls -la"
alias cd..="cd .."
alias clear="clear && echo 'Welcome back!'"
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |
| `npm run preview` | Preview production build |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to remote |
| `docker build -t app .` | Build Docker image |
| `docker run -p 3000:3000 app` | Run Docker container |
| `vercel --prod` | Deploy to Vercel |
| `netlify deploy --prod` | Deploy to Netlify |

## Troubleshooting Commands

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json && npm install

# Kill process on port
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Check disk space
df -h

# Check memory usage
free -h

# View system info
uname -a
```

## Performance Monitoring

```bash
# Monitor CPU and memory
top

# Monitor network
netstat -an

# Check file size
du -sh .

# Find large files
find . -type f -size +100M

# Count lines of code
find src -name "*.jsx" -o -name "*.js" | xargs wc -l
```

---

**Tip:** Create shell aliases for frequently used commands to speed up your workflow!
