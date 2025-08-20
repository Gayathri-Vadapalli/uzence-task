import { useState } from 'react'
import { InputField } from '../components/InputField'
import { DataTable } from '../components/DataTable'
import type { Column } from '../components/DataTable'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'available' | 'low-stock' | 'out-of-stock'
  lastUpdated: string
}

const sampleProducts: Product[] = [
  { id: 1, name: 'MacBook Pro', category: 'Electronics', price: 1999, stock: 15, status: 'available', lastUpdated: '2024-01-15' },
  { id: 2, name: 'Office Chair', category: 'Furniture', price: 299, stock: 3, status: 'low-stock', lastUpdated: '2024-01-14' },
  { id: 3, name: 'Coffee Mug', category: 'Kitchen', price: 12, stock: 0, status: 'out-of-stock', lastUpdated: '2024-01-13' },
  { id: 4, name: 'Notebook', category: 'Stationery', price: 8, stock: 50, status: 'available', lastUpdated: '2024-01-12' },
  { id: 5, name: 'Desk Lamp', category: 'Furniture', price: 79, stock: 8, status: 'available', lastUpdated: '2024-01-11' },
]

const productColumns: Column<Product>[] = [
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { 
    key: 'price', 
    title: 'Price', 
    dataIndex: 'price', 
    sortable: true,
    align: 'right',
    render: (price: number) => `$${price.toFixed(2)}`
  },
  { 
    key: 'stock', 
    title: 'Stock', 
    dataIndex: 'stock', 
    sortable: true,
    align: 'center',
    render: (stock: number) => (
      <span className={`font-semibold ${
        stock === 0 ? 'text-red-600' : stock < 5 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        {stock}
      </span>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (status: string) => {
      const statusConfig = {
        'available': { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-800 dark:text-green-400' },
        'low-stock': { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-800 dark:text-yellow-400' },
        'out-of-stock': { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-800 dark:text-red-400' },
      }
      const config = statusConfig[status as keyof typeof statusConfig]
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          {status.replace('-', ' ')}
        </span>
      )
    }
  },
  { key: 'lastUpdated', title: 'Last Updated', dataIndex: 'lastUpdated', sortable: true },
]

export function ComponentPlayground() {
  // Form state
  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // Validation state
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  
  // Table state
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  
  // Filter products based on search term
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Validation functions
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      setEmailError('Email is required')
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required')
    } else if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters')
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
    } else {
      setPasswordError('')
    }
  }

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Please confirm your password')
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
    if (confirmPassword) validateConfirmPassword(confirmPassword)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    validateConfirmPassword(value)
  }

  const toggleTableLoading = () => {
    setTableLoading(!tableLoading)
    setTimeout(() => setTableLoading(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Component Playground
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interactive examples of InputField and DataTable components
        </p>
      </div>

      {/* Form Examples Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          InputField Examples
        </h2>
        
        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Registration Form with Validation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              invalid={!!emailError}
              errorMessage={emailError}
              variant="outlined"
              size="md"
            />
            
            <InputField
              label="Search Products"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              showClearButton
              variant="filled"
              size="md"
              helperText="This will filter the product table below"
            />
            
            <InputField
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={handlePasswordChange}
              invalid={!!passwordError}
              errorMessage={passwordError}
              showPasswordToggle
              variant="outlined"
              size="md"
            />
            
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              invalid={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
              showPasswordToggle
              variant="outlined"
              size="md"
            />
          </div>
        </div>

        {/* Input Variants Showcase */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Input Variants & States
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Sizes</h4>
              <InputField label="Small" placeholder="Small input" size="sm" />
              <InputField label="Medium" placeholder="Medium input" size="md" />
              <InputField label="Large" placeholder="Large input" size="lg" />
            </div>
            
            {/* Variants */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Variants</h4>
              <InputField label="Outlined" placeholder="Outlined variant" variant="outlined" />
              <InputField label="Filled" placeholder="Filled variant" variant="filled" />
              <InputField label="Ghost" placeholder="Ghost variant" variant="ghost" />
            </div>
            
            {/* States */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">States</h4>
              <InputField label="Normal" placeholder="Normal state" />
              <InputField label="Disabled" placeholder="Disabled state" disabled />
              <InputField 
                label="Error" 
                placeholder="Error state" 
                invalid 
                errorMessage="This field has an error" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* DataTable Examples Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            DataTable Examples
          </h2>
          <button
            onClick={toggleTableLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Toggle Loading
          </button>
        </div>

        {/* Product Inventory Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Product Inventory Management
          </h3>
          
          {searchTerm && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300">
                Showing {filteredProducts.length} of {sampleProducts.length} products 
                matching "{searchTerm}"
              </p>
            </div>
          )}
          
          {selectedProducts.length > 0 && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-300">
                Selected {selectedProducts.length} product(s): {selectedProducts.map(p => p.name).join(', ')}
              </p>
            </div>
          )}
          
          <DataTable
            data={filteredProducts}
            columns={productColumns}
            loading={tableLoading}
            selectable
            onRowSelect={setSelectedProducts}
            emptyText={searchTerm ? "No products match your search criteria" : "No products available"}
            size="md"
            striped
            hoverable
          />
        </div>

        {/* Table Size Variations */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Compact Table (Small Size)
            </h3>
            <DataTable
              data={sampleProducts.slice(0, 3)}
              columns={productColumns.slice(0, 4)}
              size="sm"
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Spacious Table (Large Size)
            </h3>
            <DataTable
              data={sampleProducts.slice(0, 3)}
              columns={productColumns.slice(0, 4)}
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Integration Example */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Real-world Integration
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            💡 Usage Tips
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">variant="outlined"</code> for forms and primary inputs</li>
            <li>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">variant="filled"</code> for search and filter inputs</li>
            <li>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">variant="ghost"</code> for minimal, inline editing</li>
            <li>• Always provide meaningful labels and helper text for accessibility</li>
            <li>• Use DataTable's custom render functions for rich content like status badges and action buttons</li>
            <li>• Enable sorting on columns that users would want to organize</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
