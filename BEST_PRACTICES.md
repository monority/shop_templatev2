# 🏆 Best Practices

## Code Organization

### Component Structure
```jsx
// 1. Imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { useMyHook } from '@/hooks';

// 2. Component definition
export const MyComponent = ({ prop1, prop2 }) => {
  // 3. State
  const [state, setState] = useState(null);

  // 4. Hooks
  const data = useMyHook();

  // 5. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 6. Handlers
  const handleClick = () => {
    setState(true);
  };

  // 7. Render
  return (
    <Card>
      <h2>{prop1}</h2>
      <button onClick={handleClick}>Click</button>
    </Card>
  );
};

export default MyComponent;
```

## Performance Best Practices

### 1. Memoization
```jsx
// ✅ Memoize expensive components
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// ✅ Memoize callbacks
const handleClick = useCallback(() => {
  // ...
}, [dependency]);

// ✅ Memoize computed values
const computedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

### 2. Code Splitting
```jsx
// ✅ Lazy load routes
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
  </Routes>
</Suspense>
```

### 3. Image Optimization
```jsx
// ✅ Use WebP with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>

// ✅ Lazy load images
<img loading="lazy" src="image.jpg" alt="Description" />
```

## State Management

### 1. Local State
```jsx
// ✅ Use local state for component-specific data
const [isOpen, setIsOpen] = useState(false);
```

### 2. Global State
```jsx
// ✅ Use Zustand for global state
import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 3. Persistent State
```jsx
// ✅ Use localStorage for persistence
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## Error Handling

### 1. Error Boundary
```jsx
// ✅ Wrap components with error boundary
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 2. Try-Catch
```jsx
// ✅ Handle errors in async functions
try {
  const data = await fetchData();
} catch (error) {
  console.error('Error:', error);
  showToast('Error loading data', 'error');
}
```

### 3. Validation
```jsx
// ✅ Validate input before processing
if (!email || !isValidEmail(email)) {
  showToast('Invalid email', 'error');
  return;
}
```

## Accessibility

### 1. Semantic HTML
```jsx
// ✅ Use semantic HTML
<button onClick={handleClick}>Click me</button>
<nav>Navigation</nav>
<main>Main content</main>
<footer>Footer</footer>

// ❌ Avoid non-semantic HTML
<div onClick={handleClick}>Click me</div>
```

### 2. ARIA Labels
```jsx
// ✅ Add ARIA labels
<button aria-label="Close modal" onClick={onClose}>✕</button>
<div role="alert" aria-live="polite">Error message</div>

// ❌ Missing ARIA labels
<button onClick={onClose}>✕</button>
```

### 3. Keyboard Navigation
```jsx
// ✅ Support keyboard navigation
<button onClick={handleClick} onKeyDown={handleKeyDown}>
  Click me
</button>

// ✅ Use proper focus management
<input autoFocus ref={inputRef} />
```

## Security

### 1. Environment Variables
```jsx
// ✅ Use environment variables for secrets
const apiKey = import.meta.env.VITE_API_KEY;

// ❌ Never hardcode secrets
const apiKey = 'sk_live_123456789';
```

### 2. Input Validation
```jsx
// ✅ Validate and sanitize input
const sanitizedInput = DOMPurify.sanitize(userInput);

// ✅ Validate email format
if (!emailRegex.test(email)) {
  throw new Error('Invalid email');
}
```

### 3. XSS Protection
```jsx
// ✅ React escapes by default
<div>{userInput}</div>

// ❌ Avoid dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

## Testing

### 1. Unit Tests
```jsx
// ✅ Test component rendering
test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

// ✅ Test user interactions
test('calls onClick handler', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### 2. Integration Tests
```jsx
// ✅ Test component interactions
test('form submission', async () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => {
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
```

## Documentation

### 1. JSDoc Comments
```jsx
/**
 * Button component with multiple variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {boolean} props.disabled - Disable button
 * @returns {React.ReactElement} Button component
 */
export const Button = ({ children, variant, disabled }) => {
  // ...
};
```

### 2. README Files
```markdown
# Component Name

## Description
Brief description of the component.

## Usage
```jsx
import { Component } from '@/components';

<Component prop1="value" />
```

## Props
- `prop1` (string) - Description
- `prop2` (boolean) - Description

## Examples
Show common use cases.
```

## Git Practices

### 1. Commit Messages
```bash
# ✅ Good commit messages
git commit -m "feat: Add dark mode support"
git commit -m "fix: Resolve modal animation issue"
git commit -m "docs: Update component documentation"

# ❌ Bad commit messages
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### 2. Branch Naming
```bash
# ✅ Good branch names
git checkout -b feature/dark-mode
git checkout -b fix/modal-animation
git checkout -b docs/update-readme

# ❌ Bad branch names
git checkout -b feature1
git checkout -b fix
git checkout -b update
```

## Performance Monitoring

### 1. Lighthouse
```bash
# Run Lighthouse audit
npx lighthouse https://yoursite.com
```

### 2. Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze
```

### 3. Performance Metrics
```jsx
// ✅ Monitor performance
if (window.performance) {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time:', pageLoadTime);
}
```

## Code Quality

### 1. Linting
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### 2. Formatting
```bash
# Format code with Prettier
npx prettier --write .
```

### 3. Type Checking
```bash
# Check types (if using TypeScript)
npx tsc --noEmit
```

## Deployment Checklist

- [ ] Code reviewed
- [ ] Tests passing
- [ ] Linting passed
- [ ] No console.log in production
- [ ] Environment variables set
- [ ] Security headers configured
- [ ] Performance optimized
- [ ] Accessibility tested
- [ ] SEO optimized
- [ ] Backup created

## Common Mistakes to Avoid

### 1. Missing Dependencies
```jsx
// ❌ Missing dependency in useEffect
useEffect(() => {
  setData(props.data);
}, []); // Should include props.data

// ✅ Include all dependencies
useEffect(() => {
  setData(props.data);
}, [props.data]);
```

### 2. Inline Functions
```jsx
// ❌ Inline function causes re-renders
<button onClick={() => handleClick()}>Click</button>

// ✅ Use useCallback
const handleClick = useCallback(() => {
  // ...
}, []);
<button onClick={handleClick}>Click</button>
```

### 3. Missing Keys
```jsx
// ❌ Missing keys in lists
{items.map(item => <div>{item.name}</div>)}

// ✅ Use unique keys
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### 4. Hardcoded Values
```jsx
// ❌ Hardcoded values
const maxItems = 10;

// ✅ Use constants
import { ITEMS_PER_PAGE } from '@/config';
const maxItems = ITEMS_PER_PAGE;
```

## Performance Optimization Tips

1. **Lazy load routes** - Split code by route
2. **Optimize images** - Use WebP, AVIF formats
3. **Minify code** - Enable minification in build
4. **Enable gzip** - Compress assets
5. **Cache assets** - Set proper cache headers
6. **Use CDN** - Serve assets from CDN
7. **Monitor performance** - Use Lighthouse, WebPageTest
8. **Profile components** - Use React DevTools

## Security Best Practices

1. **Use HTTPS** - Always use HTTPS in production
2. **Validate input** - Validate all user input
3. **Sanitize output** - Escape HTML output
4. **Use environment variables** - Store secrets in env vars
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use security headers** - Configure CSP, HSTS, etc.
7. **Implement rate limiting** - Prevent brute force attacks
8. **Use CSRF tokens** - Protect against CSRF attacks

## Accessibility Best Practices

1. **Use semantic HTML** - Use proper HTML elements
2. **Add ARIA labels** - Label interactive elements
3. **Support keyboard navigation** - Make everything keyboard accessible
4. **Test with screen readers** - Test with NVDA, JAWS
5. **Ensure color contrast** - Maintain 4.5:1 contrast ratio
6. **Provide alt text** - Add alt text to images
7. **Use focus indicators** - Make focus visible
8. **Test with real users** - Get feedback from users with disabilities

---

**Remember:** Good code is not just about functionality, it's about maintainability, performance, security, and accessibility!
