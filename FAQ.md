# ❓ Frequently Asked Questions

## Installation & Setup

### Q: How do I install the template?
A: 
```bash
npm install
cp .env.example .env.local
npm run dev
```

### Q: What Node version do I need?
A: Node 18+ is recommended. Check with `node --version`.

### Q: How do I set up Firebase?
A: 
1. Create a Firebase project at https://console.firebase.google.com
2. Copy your credentials to `.env.local`
3. The app will automatically initialize Firebase

### Q: Can I use this without Firebase?
A: Yes! Remove Firebase imports and replace with your own auth/database solution.

## Development

### Q: How do I add a new page?
A:
1. Create a new file in `src/pages/`
2. Add the route in `src/Root.jsx`
3. Add the route definition in `src/config/routes.js`

### Q: How do I create a new component?
A:
1. Create a new file in `src/components/ui/`
2. Export the component
3. Add it to `src/components/ui/index.js`

### Q: How do I use dark mode?
A:
```jsx
import { useThemeContext } from '@/cfg/theme/ThemeProvider';

const { theme, toggleTheme } = useThemeContext();
```

### Q: How do I add form validation?
A:
```jsx
import { useForm } from '@/hooks';
import { validationRules } from '@/utils/validation';

const { register, handleSubmit, formState: { errors } } = useForm();

<Input {...register('email', validationRules.email)} error={errors.email?.message} />
```

### Q: How do I add animations?
A:
```jsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

<motion.div {...fadeInUp}>Content</motion.div>
```

### Q: How do I make something responsive?
A: Use Tailwind breakpoints:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
</div>
```

## Styling

### Q: How do I customize colors?
A: Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      brand: '#your-color',
    }
  }
}
```

### Q: How do I add custom fonts?
A: Edit `src/index.css`:
```css
--font-sans: 'Your Font', system-ui;
```

### Q: How do I use CSS modules?
A: Create a `.module.css` file and import it:
```jsx
import styles from './Component.module.css';

<div className={styles.container}>Content</div>
```

### Q: Can I use SCSS?
A: Yes! The template includes Sass. Create `.scss` files and import them.

## Components

### Q: How do I use the Modal component?
A:
```jsx
import { Modal } from '@/components/ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Title">
  Content
</Modal>
```

### Q: How do I use the Dropdown component?
A:
```jsx
import { Dropdown } from '@/components/ui';

<Dropdown
  trigger={<span>Menu</span>}
  items={[
    { label: 'Option 1', onClick: () => {} },
    { label: 'Option 2', onClick: () => {} },
  ]}
/>
```

### Q: How do I show a toast notification?
A:
```jsx
import { useAppStore } from '@/store';

const { addToast } = useAppStore();

addToast('Success!', 'success');
addToast('Error!', 'error');
```

### Q: How do I create a loading state?
A:
```jsx
import { Loading } from '@/components/ui';

<Loading size="md" />
<Loading fullScreen />
```

## Performance

### Q: How do I optimize images?
A: Use WebP format and lazy loading:
```jsx
<img loading="lazy" src="image.webp" alt="Description" />
```

### Q: How do I reduce bundle size?
A:
1. Use code splitting with lazy loading
2. Remove unused dependencies
3. Optimize images
4. Enable gzip compression

### Q: How do I check bundle size?
A: `npm run build -- --analyze`

### Q: Why is my app slow?
A:
1. Check Lighthouse score
2. Profile with React DevTools
3. Check network tab in DevTools
4. Optimize images and API calls

## Deployment

### Q: How do I deploy to Vercel?
A:
```bash
npm install -g vercel
vercel --prod
```

### Q: How do I deploy to Netlify?
A:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Q: How do I set environment variables?
A: Add them to your deployment platform's environment settings.

### Q: How do I enable HTTPS?
A: Most platforms (Vercel, Netlify) enable HTTPS automatically.

### Q: How do I set up a custom domain?
A: Follow your deployment platform's documentation.

## Troubleshooting

### Q: Dark mode isn't working
A:
1. Clear localStorage: `localStorage.clear()`
2. Check if ThemeProvider wraps your app
3. Check browser console for errors

### Q: Animations aren't smooth
A:
1. Check if Framer Motion is installed
2. Disable animations in `prefers-reduced-motion`
3. Check browser performance

### Q: Forms aren't validating
A:
1. Check if React Hook Form is installed
2. Verify validation rules
3. Check browser console for errors

### Q: Components aren't showing
A:
1. Check if component is imported
2. Check if component is exported
3. Check browser console for errors

### Q: Styles aren't applying
A:
1. Check if Tailwind CSS is configured
2. Check class names are correct
3. Check if dark mode is interfering

### Q: API calls aren't working
A:
1. Check environment variables
2. Check API endpoint URL
3. Check CORS settings
4. Check browser console for errors

## Security

### Q: How do I protect sensitive data?
A:
1. Use environment variables for secrets
2. Never commit `.env.local`
3. Use HTTPS in production
4. Validate input on forms

### Q: How do I prevent XSS attacks?
A:
1. Use React's built-in XSS protection
2. Avoid using `dangerouslySetInnerHTML`
3. Sanitize user input
4. Use Content Security Policy headers

### Q: How do I protect against CSRF?
A:
1. Use CSRF tokens for mutations
2. Use SameSite cookies
3. Validate request origins

## Accessibility

### Q: How do I make my app accessible?
A:
1. Use semantic HTML
2. Add ARIA labels
3. Ensure keyboard navigation
4. Test with screen readers

### Q: How do I test accessibility?
A:
1. Use Lighthouse
2. Use axe DevTools
3. Test with keyboard only
4. Test with screen reader

## Performance Optimization

### Q: How do I optimize React rendering?
A:
1. Use `memo` for expensive components
2. Use `useCallback` for handlers
3. Use `useMemo` for expensive calculations
4. Avoid inline functions

### Q: How do I lazy load routes?
A:
```jsx
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
```

### Q: How do I prefetch data?
A:
```jsx
useEffect(() => {
  // Prefetch data on component mount
  fetchData();
}, []);
```

## State Management

### Q: How do I use Zustand?
A:
```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
```

### Q: How do I persist state?
A:
```jsx
import { useLocalStorage } from '@/hooks';

const [value, setValue] = useLocalStorage('key', 'default');
```

### Q: How do I share state between components?
A: Use Zustand or Context API.

## Testing

### Q: How do I write tests?
A: Use Vitest and React Testing Library (add them to package.json).

### Q: How do I test components?
A:
```jsx
import { render, screen } from '@testing-library/react';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## Customization

### Q: How do I change the app name?
A: Edit `src/config/constants.js` and `package.json`.

### Q: How do I add a new route?
A:
1. Create a new page in `src/pages/`
2. Add route in `src/Root.jsx`
3. Add route definition in `src/config/routes.js`

### Q: How do I customize the header?
A: Edit `src/components/layout/Nav.jsx`.

### Q: How do I customize the footer?
A: Edit `src/components/layout/Footer.jsx`.

## Support

### Q: Where can I get help?
A:
1. Check the documentation files
2. Review component examples
3. Check browser console for errors
4. Review the patterns in PATTERNS.md

### Q: How do I report a bug?
A: Create an issue on GitHub with:
1. Description of the bug
2. Steps to reproduce
3. Expected vs actual behavior
4. Browser and OS info

### Q: How do I request a feature?
A: Create an issue on GitHub with:
1. Feature description
2. Use case
3. Proposed implementation (optional)

---

**Can't find your answer?** Check the documentation files or create an issue!
