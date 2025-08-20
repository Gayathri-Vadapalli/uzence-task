# Uzence Component Library ✨

A modern, beautiful, and accessible React component library built with TypeScript and TailwindCSS. Features enhanced UI/UX design with smooth animations, interactive feedback, and professional styling.

## 🌟 Enhanced Features

### Modern Design System
- **Enhanced Visual Design**: Updated with smooth gradients, enhanced shadows, and refined color palettes
- **Improved Animations**: 300ms duration transitions, scale effects, and smooth hover states
- **Better Focus States**: Enhanced ring effects with backdrop blur and improved accessibility
- **Custom CSS Utilities**: Gradient borders, text gradients, and specialized animation classes

### Core Components
- **InputField**: Flexible input component with enhanced visual feedback
- **DataTable**: Feature-rich table with improved styling and interactions

### Technical Excellence
- **TypeScript**: Full type safety with strict configuration
- **TailwindCSS**: Custom theme with enhanced design tokens
- **Accessibility**: WCAG compliant with proper ARIA support
- **Testing**: Comprehensive test suite with Vitest
- **Documentation**: Interactive Storybook with enhanced examples

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test
```

### Development URLs
- **Development Server**: http://localhost:5174
- **Storybook Documentation**: http://localhost:6006

## 📦 Enhanced Components

### InputField

A versatile input component with multiple variants, sizes, and enhanced visual feedback.

**Enhanced Features:**
- **Improved Transitions**: Smooth 300ms animations on all state changes
- **Better Border Styling**: Enhanced border-2 with rounded-xl corners
- **Enhanced Shadows**: Professional shadow effects with hover states
- **Focus Enhancement**: Ring effects with scaling and backdrop blur
- **Icon Interactions**: Smooth hover states with transform effects

**Props:**
```typescript
interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'text' | 'email' | 'password' | 'number'
  showClearButton?: boolean
  showPasswordToggle?: boolean
  className?: string
}
```

**Usage:**
```tsx
import { InputField } from './components/InputField'

<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  showClearButton
/>
```

### DataTable

A powerful data table component with sorting, selection, and custom rendering capabilities.

**Enhanced Features:**
- **Gradient Backgrounds**: Beautiful gradient headers and loading states
- **Improved Loading States**: Enhanced spinner and loading animations
- **Better Empty States**: Professional empty state design with icons
- **Enhanced Row Interactions**: Smooth hover effects with subtle transforms
- **Modern Styling**: Updated with contemporary design patterns

**Props:**
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  className?: string
  emptyText?: string
  rowKey?: keyof T | ((record: T) => string | number)
  size?: 'sm' | 'md' | 'lg'
  striped?: boolean
  hoverable?: boolean
}
```

**Usage:**
```tsx
import { DataTable } from './components/DataTable'

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true
  }
]

<DataTable
  data={users}
  columns={columns}
  selectable
  hoverable
  striped
/>
```

## 🎨 Enhanced Design Features

### Custom CSS Classes

The library now includes enhanced CSS utilities:

```css
/* Modern Button Styles */
.btn-primary /* Gradient primary button with scale effects */
.btn-secondary /* Enhanced secondary button with improved styling */

/* Card Components */
.card /* Modern card with hover effects and smooth scaling */
.glass /* Glassmorphism effect with backdrop blur */

/* Animation Utilities */
.animate-fadeIn /* Smooth fade-in with slide effect */
.animate-slideIn /* Slide-in from left animation */
.animate-scaleIn /* Scale-in animation for modals */
.animate-bounce-subtle /* Subtle bouncing animation */

/* Special Effects */
.gradient-border /* Gradient border effect */
.text-gradient /* Gradient text styling */
```

### Color Enhancements

Enhanced color system with better contrast and accessibility:

- **Primary Colors**: Refined blue palette (primary-50 to primary-900)
- **Gray Scale**: Improved neutral colors for better readability
- **Dark Mode**: Enhanced dark theme with better contrast ratios

### Improved Animations

All components now feature enhanced animations:

- **Duration**: Consistent 300ms timing for smooth interactions
- **Easing**: Carefully selected easing functions for natural movement
- **Transform Effects**: Scale and translate effects for interactive feedback
- **Focus States**: Enhanced ring effects with backdrop blur

## 📁 Project Structure

```
uzence/
├── src/
│   ├── components/
│   │   ├── InputField/
│   │   │   ├── index.tsx           # Enhanced InputField component
│   │   │   ├── InputField.test.tsx # Comprehensive tests
│   │   │   └── InputField.stories.tsx # Storybook documentation
│   │   ├── DataTable/
│   │   │   ├── index.tsx           # Enhanced DataTable component
│   │   │   ├── DataTable.test.tsx  # Comprehensive tests
│   │   │   └── DataTable.stories.tsx # Storybook documentation
│   │   └── demo/
│   │       └── Playground.tsx      # Enhanced interactive demo
│   ├── index.css                   # Enhanced global styles with animations
│   ├── main.tsx                    # Application entry point
│   └── App.tsx                     # Main application component
├── docs/                           # Enhanced documentation
├── .storybook/                     # Storybook configuration
├── tailwind.config.js             # Enhanced Tailwind configuration
├── vite.config.ts                 # Vite configuration
├── vitest.config.ts               # Test configuration
└── package.json                   # Dependencies and scripts
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📖 Documentation

The component library includes comprehensive documentation:

- **Storybook**: Interactive component documentation with live examples
- **TypeScript**: Full type definitions and IntelliSense support
- **README**: Detailed usage instructions and API documentation

## 🎯 Browser Support

- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React 18 and TypeScript
- Styled with TailwindCSS
- Icons by Lucide React
- Documentation with Storybook
- Testing with Vitest

---

**Uzence Component Library** - Building beautiful and accessible user interfaces with enhanced design and smooth interactions. ✨
