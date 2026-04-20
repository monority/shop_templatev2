# ⌚ HORLOGÉ - Luxury Watch E-Commerce

A premium watch e-commerce website featuring curated luxury timepieces with smooth animations and a refined user experience.

## ✨ Features

- 🎬 Smooth scroll animations with Framer Motion
- 🔍 Advanced product search with filters
- 🛒 Shopping cart functionality
- ❤️ Favorites/wishlist
- 📱 Fully responsive design
- ♿ Accessible (ARIA, keyboard navigation)
- 🌙 Dark mode support

## 🛠️ Tech Stack

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router 7** - Routing
- **Zustand** - State management
- **Lenis** - Smooth scroll
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Unit tests
npm test

# Unit tests with UI
npm run test:ui

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Lint
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   └── layout/          # Layout components
│       ├── Layout.tsx
│       ├── Nav.tsx
│       └── Footer.tsx
├── pages/               # Route pages
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── Product.tsx
│   ├── Cart.tsx
│   └── ...
├── hooks/               # Custom hooks
│   ├── useProducts.ts
│   ├── useCategories.ts
│   └── ...
├── services/            # API services
├── store/               # Zustand store
├── utils/               # Utilities
└── types/               # TypeScript types
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint code |
| `npm run type-check` | Type check |

## 📜 License

MIT

---

© 2026 monority. All rights reserved.