# Component Examples and Usage

## InputField Examples

### Basic Usage
```tsx
import { InputField } from './components/InputField'

// Simple text input
<InputField
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

### Advanced Usage
```tsx
// Email input with validation
<InputField
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={handleEmailChange}
  invalid={!isValidEmail(email)}
  errorMessage={emailError}
  helperText="We'll never share your email"
  variant="outlined"
  size="md"
/>

// Password input with toggle
<InputField
  label="Password"
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showPasswordToggle
  variant="filled"
  size="lg"
/>
```

## DataTable Examples

### Basic Usage
```tsx
import { DataTable } from './components/DataTable'
import type { Column } from './components/DataTable'

interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: false },
]

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
]

<DataTable data={users} columns={columns} />
```

### Advanced Usage with Custom Rendering
```tsx
const advancedColumns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    )
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id',
    render: (id: number) => (
      <div className="space-x-2">
        <button 
          onClick={() => editUser(id)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button 
          onClick={() => deleteUser(id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    )
  }
]

<DataTable
  data={users}
  columns={advancedColumns}
  selectable
  onRowSelect={(selectedRows) => {
    console.log('Selected users:', selectedRows)
  }}
  loading={isLoading}
  emptyText="No users found"
/>
```

## Theming and Customization

### Dark Mode
```tsx
// Wrap your app with dark class
<div className="dark">
  <InputField label="Dark mode input" />
  <DataTable data={data} columns={columns} />
</div>
```

### Custom Styling
```tsx
// Custom CSS classes can be added
<InputField 
  className="my-custom-input" 
  label="Custom styled input"
/>

<DataTable 
  className="my-custom-table"
  data={data} 
  columns={columns} 
/>
```

## Form Integration

### With React Hook Form
```tsx
import { useForm } from 'react-hook-form'

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        invalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      
      <InputField
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' }
        })}
        invalid={!!errors.password}
        errorMessage={errors.password?.message}
        showPasswordToggle
      />
      
      <button type="submit">Submit</button>
    </form>
  )
}
```
