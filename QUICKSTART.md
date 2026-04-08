# 🚀 Quick Start Guide

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your Firebase credentials in .env.local
```

## Development

```bash
# Start development server
npm run dev

# Open http://localhost:5175
```

## Building

```bash
# Build for production
npm build

# Preview production build
npm run preview
```

## Key Features

### 1. Dark Mode
```jsx
import { useThemeContext } from '@/cfg/theme/ThemeProvider';

const { theme, toggleTheme } = useThemeContext();
```

### 2. Forms with Validation
```jsx
import { useForm } from '@/hooks';
import { Input } from '@/components/ui';
import { validationRules } from '@/utils/validation';

const { register, handleSubmit, formState: { errors } } = useForm();

<Input
  {...register('email', validationRules.email)}
  error={errors.email?.message}
/>
```

### 3. Animations
```jsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

<motion.div {...fadeInUp}>
  Animated content
</motion.div>
```

### 4. Modals
```jsx
import { Modal } from '@/components/ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Modal content
</Modal>
```

### 5. Responsive Design
```jsx
import { useMediaQuery } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
```

## Component Showcase

Visit `/showcase` to see all components in action.

## Project Structure

```
src/
├── cfg/              # Configuration & providers
├── components/       # React components
├── hooks/           # Custom hooks
├── pages/           # Page components
├── services/        # API services
├── store/           # State management (Zustand)
├── utils/           # Utilities & helpers
└── config/          # App configuration
```

## Customization

### Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      brand: '#your-color',
    }
  }
}
```

### Fonts
Edit `src/index.css`:
```css
--font-sans: 'Your Font', system-ui;
```

### Animations
Edit `src/utils/animations.js` to add custom animations.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Dark mode not working
- Clear localStorage: `localStorage.clear()`
- Check if ThemeProvider is wrapping your app

### Animations not smooth
- Check if Framer Motion is installed: `npm list framer-motion`
- Disable animations in `prefers-reduced-motion`

### Form validation not working
- Ensure React Hook Form is installed
- Check validation rules in `src/utils/validation.js`

## Performance Tips

1. Use lazy loading for pages
2. Optimize images with WebP
3. Enable gzip compression
4. Use production builds
5. Monitor Core Web Vitals

## Next Steps

1. Customize branding
2. Add your pages
3. Integrate with backend API
4. Set up analytics
5. Deploy to production

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Hook Form](https://react-hook-form.com)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

For issues or questions:
1. Check the documentation
2. Review component examples
3. Check browser console for errors
4. Create an issue on GitHub
