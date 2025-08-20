# Uzence Component Library

A modern React component library built with TypeScript and TailwindCSS.

## Features

- **InputField**: Flexible input component with multiple variants and sizes
- **DataTable**: Feature-rich table with sorting and selection
- **TypeScript**: Full type safety
- **TailwindCSS**: Custom styling
- **Testing**: Comprehensive test suite with Vitest
- **Storybook**: Interactive documentation

## Quick Start

```bash
npm install
npm run dev
npm run storybook
npm test
```

## Components

### InputField
```typescript
interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  // ... more props
}
```

```tsx
import { InputField } from './components/InputField'

<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
/>
```

### DataTable
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  // ... more props
}
```

```tsx
import { DataTable } from './components/DataTable'

<DataTable
  data={users}
  columns={columns}
  selectable
/>
```

## Development

```bash
npm test          # Run tests
npm run build     # Build for production
npm run storybook # View component docs
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
