# 🎨 Style Guide

## Code Style

### Naming Conventions

```jsx
// Components - PascalCase
export const MyComponent = () => {};

// Hooks - camelCase with 'use' prefix
export const useMyHook = () => {};

// Constants - UPPER_SNAKE_CASE
export const MAX_ITEMS = 10;

// Variables - camelCase
const myVariable = 'value';

// Private functions - camelCase with underscore prefix
const _privateFunction = () => {};
```

### Component Structure

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { useMyHook } from '@/hooks';
import { fadeInUp } from '@/utils/animations';

export const MyComponent = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState(null);

  // Hooks
  const data = useMyHook();

  // Handlers
  const handleClick = () => {
    setState(true);
  };

  // Render
  return (
    <motion.div {...fadeInUp}>
      <Card>
        <h2>{prop1}</h2>
        <p>{prop2}</p>
        <button onClick={handleClick}>Click</button>
      </Card>
    </motion.div>
  );
};

export default MyComponent;
```

### Import Organization

```jsx
// 1. React & external libraries
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Internal components
import { Card, Button } from '@/components/ui';
import Layout from '@/components/layout/Layout';

// 3. Hooks
import { useTheme, useForm } from '@/hooks';

// 4. Utils & config
import { fadeInUp } from '@/utils/animations';
import { ROUTES } from '@/config';

// 5. Styles
import './MyComponent.css';
```

## CSS/Tailwind Guidelines

### Class Organization

```jsx
// 1. Layout (display, position, sizing)
// 2. Spacing (margin, padding)
// 3. Colors (background, text, border)
// 4. Typography (font-size, font-weight)
// 5. Effects (shadow, opacity, transform)
// 6. Interactions (hover, focus, active)

<div className="flex items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  Content
</div>
```

### Dark Mode

Always include dark mode variants:

```jsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Content
</div>
```

### Responsive Design

Use Tailwind breakpoints:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
</div>
```

## Component Guidelines

### Props

```jsx
// ✅ Good - Destructured, documented
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) => {
  // ...
};

// ❌ Bad - Not destructured
export const Button = (props) => {
  // ...
};
```

### Accessibility

```jsx
// ✅ Good - Accessible
<button
  onClick={handleClick}
  aria-label="Close modal"
  aria-expanded={isOpen}
  role="button"
>
  ✕
</button>

// ❌ Bad - Not accessible
<div onClick={handleClick}>✕</div>
```

### Error Handling

```jsx
// ✅ Good - Error boundary
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// ✅ Good - Try-catch
try {
  const data = await fetchData();
} catch (error) {
  console.error('Error:', error);
  showToast('Error loading data', 'error');
}
```

## Performance Guidelines

### Memoization

```jsx
// ✅ Use memo for expensive components
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// ✅ Use useCallback for handlers
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

### Lazy Loading

```jsx
// ✅ Lazy load pages
const Home = lazy(() => import('./pages/Home'));

// ✅ Lazy load images
<img loading="lazy" src="image.jpg" alt="Description" />
```

## Testing Guidelines

### Unit Tests

```jsx
// ✅ Good test structure
describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Documentation Guidelines

### JSDoc Comments

```jsx
/**
 * Button component with multiple variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.disabled - Disable button
 * @returns {React.ReactElement} Button component
 */
export const Button = ({ children, variant, size, disabled }) => {
  // ...
};
```

### README Files

Each feature should have a README:

```markdown
# Feature Name

## Description
Brief description of the feature.

## Usage
```jsx
import { Feature } from '@/components/Feature';

<Feature prop1="value" />
```

## Props
- `prop1` (string) - Description
- `prop2` (boolean) - Description

## Examples
Show common use cases.
```

## Git Commit Messages

```
feat: Add dark mode support
fix: Resolve modal animation issue
docs: Update component documentation
style: Format code with prettier
refactor: Simplify form validation logic
test: Add unit tests for Button component
chore: Update dependencies
```

## File Organization

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── README.md
│   └── layout/
├── hooks/
│   ├── useTheme.js
│   └── useTheme.test.js
├── utils/
│   ├── animations.js
│   └── animations.test.js
└── pages/
    ├── Home.jsx
    └── Home.test.jsx
```

## Performance Checklist

- [ ] No console.log in production
- [ ] Images optimized (WebP, AVIF)
- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Memoization for expensive components
- [ ] No unnecessary re-renders
- [ ] Bundle size < 200KB (gzipped)
- [ ] Lighthouse score > 90

## Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on buttons and icons
- [ ] Color contrast ratio > 4.5:1
- [ ] Focus indicators visible
- [ ] Semantic HTML used
- [ ] Alt text on images
- [ ] Form labels associated with inputs
- [ ] Error messages clear and helpful

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation on forms
- [ ] XSS protection
- [ ] CSRF tokens for mutations
- [ ] Secure headers configured
- [ ] Dependencies up to date
- [ ] No eval() or innerHTML
- [ ] Environment variables in .env.local
