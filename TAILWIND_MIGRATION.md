# Tailwind Migration Guide

## Conversion des classes custom vers Tailwind

### Buttons
- `.btn` → `inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap border-none cursor-pointer hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed`
- `.btn-primary` → `bg-brand text-white hover:bg-brand-dark hover:shadow-md`
- `.btn-secondary` → `bg-slate-100 text-dark hover:bg-slate-200`
- `.btn-outline` → `bg-transparent border border-slate-200 text-dark hover:border-brand hover:text-brand`
- `.btn-ghost` → `bg-transparent text-gray hover:bg-slate-100 hover:text-dark`
- `.btn-destructive` → `bg-error text-white hover:bg-red-600 hover:shadow-md`
- `.btn-sm` → `px-3.5 py-2 text-xs`
- `.btn-lg` → `px-6 py-3.5 text-base`
- `.btn-xl` → `px-8 py-4 text-lg`
- `.btn-icon` → `p-2 aspect-square`

### Cards
- `.card` → `bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300`
- `.card-body` → `p-5`

### Layout
- `.container` → `w-full max-w-5xl mx-auto px-4`
- `.section` → `py-12 md:py-16`
- `.section-header` → `flex items-center justify-between mb-8`
- `.section-title` → `text-2xl md:text-3xl font-bold`

### Grids
- `.products-grid` → `grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4`
- `.categories-grid` → `grid grid-cols-2 gap-4 md:grid-cols-4`

### Colors
- `bg-brand` → `bg-brand` (custom color configured in Tailwind)
- `text-brand` → `text-brand`
- `border-brand` → `border-brand`
- Same for: `brand-dark`, `brand-light`, `accent`, `dark`, `light`, `gray`, `success`, `error`, `warning`, `info`

### Input
- `.input` → `w-full px-4 py-3 text-base font-medium text-dark bg-slate-50 border-2 border-slate-200 rounded-2xl transition-all focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 placeholder:text-slate-400 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed`
