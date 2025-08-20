import { useState } from 'react'
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'
import type { Column } from './components/DataTable'
import { ComponentPlayground } from './demo/ComponentPlayground'
import { Sun, Moon, Play, Sparkles, Layers, Zap, Github, ExternalLink } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2024-01-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinDate: '2024-01-25' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Editor', status: 'active', joinDate: '2024-01-30' },
]

const columns: Column<User>[] = [
  { 
    key: 'name', 
    title: 'Name', 
    dataIndex: 'name', 
    sortable: true,
    render: (name: string) => (
      <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
    )
  },
  { 
    key: 'email', 
    title: 'Email', 
    dataIndex: 'email', 
    sortable: true,
    render: (email: string) => (
      <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{email}</div>
    )
  },
  { 
    key: 'role', 
    title: 'Role', 
    dataIndex: 'role', 
    sortable: true,
    render: (role: string) => {
      const roleColors = {
        'Admin': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        'User': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        'Editor': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role as keyof typeof roleColors]}`}>
          {role}
        </span>
      )
    }
  },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (status: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'active' ? 'bg-green-400' : 'bg-red-400'
        }`}></span>
        {status}
      </span>
    )
  },
  { 
    key: 'joinDate', 
    title: 'Join Date', 
    dataIndex: 'joinDate', 
    sortable: true,
    render: (date: string) => (
      <div className="text-gray-600 dark:text-gray-400">
        {new Date(date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </div>
    )
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [tableLoading, setTableLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState<User[]>([])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Simple validation example
    if (value.length > 0 && value.length < 3) {
      setInputError('Must be at least 3 characters')
    } else {
      setInputError('')
    }
  }

  const handleRowSelect = (selectedData: User[]) => {
    setSelectedRows(selectedData)
  }

  const toggleTableLoading = () => {
    setTableLoading(!tableLoading)
    setTimeout(() => setTableLoading(false), 2000)
  }

  if (showPlayground) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-700 ${darkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setShowPlayground(false)}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>← Back to Main Demo</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
          <ComponentPlayground />
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-700 ${darkMode ? 'dark' : ''}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 space-y-8 lg:space-y-0">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl animate-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-400 bg-clip-text text-transparent">
                  Uzence
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">v2.0.0</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl font-medium">
                Beautiful React Component Library
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
                Professional, accessible, and modern components with smooth animations, enhanced interactions, and elegant design. Built with TypeScript, TailwindCSS, and modern React patterns.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>TypeScript Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Fully Accessible</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Dark Mode</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowPlayground(true)}
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-semibold">Interactive Playground</span>
            </button>
            
            <a
              href="https://github.com/your-username/uzence"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <button
              onClick={toggleDarkMode}
              className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Enhanced InputField Demo */}
        <section className="mb-20 animate-fadeIn">
          <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                    InputField Component
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Professional form inputs with beautiful animations and enhanced states
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                  3 Variants
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                  3 Sizes
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              {/* Basic Variants */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Variants</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 space-y-5">
                  <InputField
                    label="Outlined (default)"
                    placeholder="Enter your name..."
                    value={inputValue}
                    onChange={handleInputChange}
                    errorMessage={inputError}
                  />
                  <InputField
                    label="Filled variant"
                    placeholder="Search something..."
                    variant="filled"
                  />
                  <InputField
                    label="Ghost variant"
                    placeholder="Inline editing..."
                    variant="ghost"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sizes</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 space-y-5">
                  <InputField
                    label="Small size"
                    placeholder="Compact form..."
                    size="sm"
                  />
                  <InputField
                    label="Medium size (default)"
                    placeholder="Standard form..."
                    size="md"
                  />
                  <InputField
                    label="Large size"
                    placeholder="Prominent form..."
                    size="lg"
                  />
                </div>
              </div>

              {/* States */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">States & Features</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 space-y-5">
                  <InputField
                    label="Password input"
                    type="password"
                    placeholder="Your password..."
                    showPasswordToggle
                  />
                  <InputField
                    label="With clear button"
                    placeholder="Clear me..."
                    showClearButton
                    helperText="Click the X to clear"
                  />
                  <InputField
                    label="Error state"
                    placeholder="Invalid input..."
                    invalid
                    errorMessage="This field has an error"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced DataTable Demo */}
        <section className="mb-20 animate-slideUp">
          <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent">
                    DataTable Component
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    Advanced data visualization with sorting, selection, and loading states
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm">
                    Sortable
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    Selectable
                  </span>
                </div>
                <button
                  onClick={toggleTableLoading}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {tableLoading ? 'Loading...' : 'Demo Loading'}
                </button>
              </div>
            </div>

            {selectedRows.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl animate-scaleIn">
                <div className="flex items-center justify-between">
                  <p className="text-blue-700 dark:text-blue-300 font-medium">
                    Selected {selectedRows.length} user(s): {selectedRows.map(r => r.name).join(', ')}
                  </p>
                  <button 
                    onClick={() => setSelectedRows([])}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white/50 dark:bg-gray-900/50 rounded-2xl p-1 backdrop-blur-sm shadow-inner">
              <DataTable
                data={sampleData}
                columns={columns}
                loading={tableLoading}
                selectable
                onRowSelect={handleRowSelect}
                hoverable
                striped
              />
            </div>
            
            {/* Feature Highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Cell Rendering</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800/50 dark:to-purple-900/20 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Multi-column Sorting</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-800/50 dark:to-emerald-900/20 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Row Selection</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="mt-20 pt-12 border-t border-white/20 dark:border-gray-700/50 animate-fadeIn">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-lg font-medium bg-gradient-to-r from-gray-700 to-blue-600 dark:from-gray-300 dark:to-blue-400 bg-clip-text text-transparent">
                Built with React, TypeScript, and TailwindCSS
              </p>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              A modern component library designed for developers who care about beautiful, accessible, and performant user interfaces. 
              Open source and ready for production.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
