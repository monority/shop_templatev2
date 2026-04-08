# 🎯 Common Patterns

## Form Patterns

### Basic Form with Validation

```jsx
import { useForm } from '@/hooks';
import { Input, Button } from '@/components/ui';
import { validationRules } from '@/utils/validation';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      showToast('Login successful', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('email', validationRules.email)}
        label="Email"
        error={errors.email?.message}
      />
      <Input
        {...register('password', validationRules.password)}
        label="Password"
        type="password"
        error={errors.password?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
```

### Multi-Step Form

```jsx
import { useState } from 'react';
import { useForm } from '@/hooks';
import { Button } from '@/components/ui';

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitForm(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && <Step1 register={register} errors={errors} />}
      {step === 2 && <Step2 register={register} errors={errors} />}
      {step === 3 && <Step3 register={register} errors={errors} />}

      <div className="flex gap-4 mt-6">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button type="submit">
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </form>
  );
};
```

## Modal Patterns

### Confirmation Modal

```jsx
import { useState } from 'react';
import { Modal, Button } from '@/components/ui';

export const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <p className="mb-6">{message}</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
```

## Data Fetching Patterns

### With Loading State

```jsx
import { useState, useEffect } from 'react';
import { Loading, Alert } from '@/components/ui';

export const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading fullScreen />;
  if (error) return <Alert variant="error">{error}</Alert>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

### With Pagination

```jsx
import { useState, useEffect } from 'react';
import { Pagination } from '@/components/ui';
import { ITEMS_PER_PAGE } from '@/config';

export const PaginatedList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page) => {
    const response = await fetch(`/api/items?page=${page}&limit=${ITEMS_PER_PAGE}`);
    const { data, total } = await response.json();
    setItems(data);
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
  };

  return (
    <>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
```

## Animation Patterns

### Staggered List

```jsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/utils/animations';

export const StaggeredList = ({ items }) => {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {items.map(item => (
        <motion.div key={item.id} variants={staggerItem}>
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Scroll Animation

```jsx
import { useScrollAnimation } from '@/hooks';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

export const ScrollAnimatedSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      {...fadeInUp}
      animate={isVisible ? 'animate' : 'initial'}
    >
      Content that animates on scroll
    </motion.div>
  );
};
```

## Responsive Patterns

### Mobile-First Layout

```jsx
import { useMediaQuery } from '@/hooks';

export const ResponsiveLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Automatically responsive with Tailwind */}
    </div>
  );
};
```

### Conditional Rendering

```jsx
import { useMediaQuery } from '@/hooks';

export const AdaptiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <DesktopMenu />
      )}
    </>
  );
};
```

## State Management Patterns

### Local Storage Persistence

```jsx
import { useLocalStorage } from '@/hooks';

export const UserPreferences = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
```

### Global State with Zustand

```jsx
import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage
export const Profile = () => {
  const { user, logout } = useStore();

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Error Handling Patterns

### Error Boundary

```jsx
import { ErrorBoundary } from '@/components/ui';

export const App = () => {
  return (
    <ErrorBoundary>
      <MainContent />
    </ErrorBoundary>
  );
};
```

### Try-Catch with Toast

```jsx
import { useAppStore } from '@/store';

export const DataFetcher = () => {
  const { addToast } = useAppStore();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      addToast(error.message, 'error');
      throw error;
    }
  };

  return <button onClick={fetchData}>Fetch</button>;
};
```

## Theme Patterns

### Theme Toggle

```jsx
import { useThemeContext } from '@/cfg/theme/ThemeProvider';
import { Button } from '@/components/ui';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};
```

### Conditional Styling

```jsx
export const ThemedComponent = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      Content that adapts to theme
    </div>
  );
};
```

## Performance Patterns

### Memoized Component

```jsx
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
```

### Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react';
import { Loading } from '@/components/ui';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));

export const Routes = () => {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Router>
    </Suspense>
  );
};
```

## Testing Patterns

### Component Test

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Hook Test

```jsx
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks';

describe('useLocalStorage', () => {
  it('stores and retrieves value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
  });
});
```
