# Tailwind CSS Quick Reference Guide
## Common Classes Used in This Project

This guide explains the Tailwind classes used throughout the ServiceFlow project.

---

## Layout & Spacing

### Container & Centering
```jsx
className="container mx-auto px-4"
```
- `container` - Max-width container that centers content
- `mx-auto` - Horizontal margin auto (centers horizontally)
- `px-4` - Horizontal padding (1rem = 16px)

### Flexbox
```jsx
className="flex items-center justify-between gap-4"
```
- `flex` - Display flex
- `flex-col` - Flex direction column (stack vertically)
- `flex-row` - Flex direction row (default)
- `items-center` - Align items center (vertical alignment)
- `items-start` - Align items to start
- `items-end` - Align items to end
- `justify-between` - Space between items (horizontal)
- `justify-center` - Center items (horizontal)
- `justify-start` - Align to start (horizontal)
- `gap-4` - Gap between flex items (1rem)

### Grid
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```
- `grid` - Display grid
- `grid-cols-1` - 1 column
- `md:grid-cols-2` - 2 columns on medium screens (768px+)
- `lg:grid-cols-3` - 3 columns on large screens (1024px+)
- `gap-6` - Gap between grid items (1.5rem)

### Spacing
- `p-4` - Padding all sides (1rem)
- `px-4` - Horizontal padding (left/right)
- `py-4` - Vertical padding (top/bottom)
- `pt-4` - Padding top
- `pb-4` - Padding bottom
- `m-4` - Margin all sides
- `mx-auto` - Horizontal margin auto
- `gap-4` - Gap (flex/grid)

---

## Typography

### Text Size
- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px) - default
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)

### Font Weight
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

### Text Color
- `text-white` - White
- `text-slate-900` - Dark gray (almost black)
- `text-slate-600` - Medium gray
- `text-slate-500` - Lighter gray
- `text-slate-400` - Light gray
- `text-brand-500` - Custom brand color
- `text-rose-500` - Red/pink

### Text Alignment
- `text-center` - Center text
- `text-left` - Left align
- `text-right` - Right align

### Other Typography
- `uppercase` - Uppercase text
- `lowercase` - Lowercase text
- `tracking-widest` - Letter spacing (wide)
- `leading-tight` - Line height tight
- `leading-normal` - Normal line height

---

## Colors & Backgrounds

### Background Colors
- `bg-white` - White background
- `bg-slate-50` - Very light gray
- `bg-slate-100` - Light gray
- `bg-slate-900` - Dark gray
- `bg-slate-950` - Very dark gray (almost black)
- `bg-brand-500` - Custom brand color
- `bg-transparent` - Transparent background

### Background Gradients
```jsx
className="bg-gradient-to-br from-white to-slate-50"
```
- `bg-gradient-to-br` - Gradient to bottom-right
- `bg-gradient-to-r` - Gradient to right
- `from-white` - Start color
- `to-slate-50` - End color

### Border Colors
- `border` - 1px border (default color)
- `border-slate-100` - Light gray border
- `border-slate-200` - Medium light gray
- `border-slate-800` - Dark border
- `border-brand-500` - Brand color border

---

## Borders & Rounded Corners

### Border Radius
- `rounded` - 0.25rem (4px)
- `rounded-lg` - 0.5rem (8px)
- `rounded-xl` - 0.75rem (12px)
- `rounded-2xl` - 1rem (16px)
- `rounded-3xl` - 1.5rem (24px)
- `rounded-full` - Fully rounded (pill/circle)
- `rounded-[28px]` - Custom value (28px)

### Border Width
- `border` - 1px border
- `border-2` - 2px border
- `border-4` - 4px border

---

## Shadows

- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-soft` - Custom soft shadow (defined in tailwind.config.js)

---

## Positioning

### Position Types
- `relative` - Position relative
- `absolute` - Position absolute
- `fixed` - Position fixed
- `sticky` - Position sticky

### Position Values
- `top-0` - Top 0
- `right-0` - Right 0
- `bottom-0` - Bottom 0
- `left-0` - Left 0
- `inset-0` - All sides 0 (top, right, bottom, left)
- `top-4` - Top 1rem
- `right-4` - Right 1rem

### Z-Index
- `z-10` - Z-index 10
- `z-20` - Z-index 20
- `z-30` - Z-index 30
- `z-40` - Z-index 40
- `z-50` - Z-index 50

---

## Sizing

### Width
- `w-full` - Width 100%
- `w-1/2` - Width 50%
- `w-1/3` - Width 33.33%
- `w-9` - Width 2.25rem (36px)
- `w-10` - Width 2.5rem (40px)
- `w-16` - Width 4rem (64px)

### Height
- `h-full` - Height 100%
- `h-9` - Height 2.25rem (36px)
- `h-10` - Height 2.5rem (40px)
- `h-16` - Height 4rem (64px)
- `h-48` - Height 12rem (192px)
- `min-h-screen` - Minimum height 100vh

### Flex Sizing
- `flex-1` - Flex grow (takes available space)
- `flex-auto` - Flex auto
- `flex-none` - No flex

---

## Display & Visibility

- `block` - Display block
- `inline` - Display inline
- `inline-block` - Display inline-block
- `flex` - Display flex
- `grid` - Display grid
- `hidden` - Display none
- `md:flex` - Display flex on medium screens+
- `md:hidden` - Hide on medium screens+

---

## Dark Mode

### Pattern
All dark mode classes use the `dark:` prefix.

```jsx
className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
```

### Common Dark Mode Classes
- `dark:bg-slate-900` - Dark background
- `dark:bg-slate-950` - Very dark background
- `dark:text-white` - White text
- `dark:text-slate-300` - Light gray text
- `dark:border-slate-800` - Dark border

### How It Works
- When `<html>` element has `class="dark"`, dark mode classes activate
- Controlled by theme toggle in Navbar
- Stored in localStorage for persistence

---

## Responsive Design

### Breakpoints
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Examples
```jsx
// Mobile-first: base styles for mobile, then override for larger screens
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// 1 column on mobile, 2 on tablet, 3 on desktop

className="hidden md:flex"
// Hidden on mobile, flex on tablet+

className="text-2xl md:text-3xl lg:text-4xl"
// Responsive text sizes
```

---

## States (Hover, Focus, Disabled)

### Hover
- `hover:bg-slate-200` - Background on hover
- `hover:text-slate-900` - Text color on hover
- `hover:scale-105` - Scale up 5% on hover
- `hover:-translate-y-1` - Move up on hover
- `hover:shadow-lg` - Larger shadow on hover

### Focus
- `focus:outline-none` - Remove default outline
- `focus:ring-2` - Add ring on focus
- `focus:ring-brand-500` - Brand color ring
- `focus:ring-offset-2` - Ring offset

### Disabled
- `disabled:opacity-50` - Reduce opacity when disabled
- `disabled:cursor-not-allowed` - Not-allowed cursor

### Active
- `active:scale-95` - Scale down when clicked

---

## Transitions & Animations

- `transition` - Basic transition
- `transition-all` - Transition all properties
- `transition-colors` - Transition colors only
- `duration-200` - Transition duration 200ms
- `ease-in-out` - Easing function

---

## Common Patterns in This Project

### Card Pattern
```jsx
<div className="rounded-[28px] border border-slate-100 bg-white shadow-soft 
                dark:border-slate-800 dark:bg-slate-900">
```

### Button Pattern
```jsx
<button className="rounded-full bg-brand-500 px-4 py-2 text-white 
                   hover:bg-brand-600 transition">
```

### Input Pattern
```jsx
<input className="w-full rounded-2xl border bg-white px-3 py-2 
                  focus:ring-2 focus:ring-brand-500 outline-none" />
```

### Container Pattern
```jsx
<div className="container mx-auto px-4 py-10">
```

### Sticky Header Pattern
```jsx
<header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
```

### Overlay Pattern
```jsx
<div className="absolute inset-0 bg-gradient-to-t from-slate-900/70">
```

### Statistics Row Pattern
```jsx
<div className="flex flex-wrap items-center gap-6 rounded-2xl border bg-white px-6 py-4 shadow-soft dark:bg-slate-900">
  <div className="flex flex-col">
    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
      Label
    </span>
    <span className="mt-1 text-2xl font-bold text-brand-600">
      Value
    </span>
  </div>
  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
  {/* More statistics... */}
</div>
```

---

## Special Values

### Opacity
- `bg-white/80` - 80% opacity white
- `bg-slate-900/70` - 70% opacity dark gray

### Custom Values
- `rounded-[28px]` - Custom border radius
- `w-[200px]` - Custom width
- `h-[300px]` - Custom height

---

## Backdrop Effects

- `backdrop-blur` - Blur effect behind element
- `backdrop-blur-sm` - Small blur
- `backdrop-blur-md` - Medium blur

---

## Object Fit (Images)

- `object-cover` - Cover container, may crop
- `object-contain` - Fit inside container
- `object-fill` - Fill container, may stretch

---

## Overflow

- `overflow-hidden` - Hide overflow
- `overflow-auto` - Show scrollbar if needed
- `overflow-scroll` - Always show scrollbar

---

## Tips for Teaching

1. **Mobile-First Approach**: Base classes apply to mobile, then override with breakpoints
2. **Utility-First**: Each class does one thing (composition over configuration)
3. **Dark Mode**: Always consider both light and dark variants
4. **Responsive**: Test on different screen sizes
5. **Readability**: Group related classes together (layout, spacing, colors, etc.)

---

## Quick Reference Cheat Sheet

```
Layout:     flex, grid, container, mx-auto
Spacing:    p-4, px-4, py-4, m-4, gap-4
Typography: text-lg, font-semibold, text-slate-900
Colors:     bg-white, text-slate-600, border-slate-200
Borders:    border, rounded-lg, rounded-full
Shadows:    shadow-soft, shadow-lg
Position:   relative, absolute, sticky, top-0, z-30
Sizing:     w-full, h-full, flex-1
Display:    hidden, md:flex, block
States:     hover:, focus:, disabled:
Dark Mode:  dark:bg-slate-900, dark:text-white
Responsive: md:, lg:, xl:
```

---

**End of Tailwind Quick Reference**
