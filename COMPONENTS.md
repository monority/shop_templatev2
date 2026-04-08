# 🎨 Premium UI Components

## Installation

```bash
npm install
```

## Components

### Core UI

#### Button
```jsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">Click me</Button>
```

#### Card
```jsx
import { Card } from '@/components/ui';

<Card hover animated>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Badge
```jsx
import { Badge } from '@/components/ui';

<Badge variant="success">Active</Badge>
```

### Forms

#### Input
```jsx
import { Input } from '@/components/ui';
import { useForm } from '@/hooks';

const { register, formState: { errors } } = useForm();

<Input
  {...register('email', validationRules.email)}
  label="Email"
  error={errors.email?.message}
  placeholder="your@email.com"
/>
```

#### Textarea
```jsx
import { Textarea } from '@/components/ui';

<Textarea
  label="Message"
  placeholder="Your message..."
  rows={5}
/>
```

### Modals & Overlays

#### Modal
```jsx
import { Modal } from '@/components/ui';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  Are you sure?
</Modal>
```

#### Dropdown
```jsx
import { Dropdown } from '@/components/ui';

<Dropdown
  trigger={<span>Menu</span>}
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>
```

#### Tooltip
```jsx
import { Tooltip } from '@/components/ui';

<Tooltip content="Help text" position="top">
  <button>Hover me</button>
</Tooltip>
```

### Data Display

#### Tabs
```jsx
import { Tabs } from '@/components/ui';

<Tabs
  tabs={[
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>
```

#### Pagination
```jsx
import { Pagination } from '@/components/ui';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>
```

### Feedback

#### Alert
```jsx
import { Alert } from '@/components/ui';

<Alert variant="success" title="Success!">
  Operation completed successfully
</Alert>
```

#### Loading
```jsx
import { Loading } from '@/components/ui';

<Loading size="md" />
<Loading fullScreen />
```

## Hooks

### useTheme
```jsx
import { useTheme } from '@/hooks';

const { theme, toggleTheme } = useTheme();
```

### useForm
```jsx
import { useForm } from '@/hooks';

const { register, handleSubmit, formState: { errors } } = useForm();
```

### useScrollAnimation
```jsx
import { useScrollAnimation } from '@/hooks';

const { ref, isVisible } = useScrollAnimation();

<div ref={ref}>
  {isVisible && <animated-content />}
</div>
```

### useMediaQuery
```jsx
import { useMediaQuery } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
```

### useLocalStorage
```jsx
import { useLocalStorage } from '@/hooks';

const [value, setValue] = useLocalStorage('key', 'default');
```

## Animations

Pre-built animation variants:

```jsx
import { fadeInUp, slideInLeft, scaleIn } from '@/utils/animations';
import { motion } from 'framer-motion';

<motion.div {...fadeInUp}>
  Animated content
</motion.div>
```

## Validation

Pre-built validation rules:

```jsx
import { validationRules } from '@/utils/validation';

<Input {...register('email', validationRules.email)} />
```

## Dark Mode

Dark mode is automatically enabled based on system preference or user selection.

```jsx
import { useThemeContext } from '@/cfg/theme/ThemeProvider';

const { theme, toggleTheme } = useThemeContext();
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Semantic HTML

## Performance

- Code splitting with lazy loading
- Optimized animations with Framer Motion
- Efficient re-renders with React 19
- Tree-shaking support
