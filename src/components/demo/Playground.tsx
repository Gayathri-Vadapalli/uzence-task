import { useState } from 'react';
import { InputField } from '../InputField';
import { DataTable, Column } from '../DataTable';
import { User, Mail, Calendar } from 'lucide-react';

interface DemoUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
}

const sampleData: DemoUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-03-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-05-12'
  }
];

const columns: Column<DemoUser>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
    render: (value: any, row: DemoUser) => (
      <div className="flex items-center space-x-3">
        {row.avatar ? (
          <img 
            src={row.avatar} 
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow-sm"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
            {row.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Admin' 
          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          : value === 'Moderator'
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value: string) => (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          value === 'active' ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span className={`text-sm font-medium ${
          value === 'active' 
            ? 'text-green-700 dark:text-green-400' 
            : 'text-red-700 dark:text-red-400'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      </div>
    )
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
    render: (value: string) => (
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
        <Calendar className="w-4 h-4" />
        <span>{new Date(value).toLocaleDateString()}</span>
      </div>
    )
  }
];

export function Playground() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    search: ''
  });
  const [selectedUsers, setSelectedUsers] = useState<DemoUser[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gradient">
            Uzence Component Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beautiful, accessible, and modern React components built with TypeScript and TailwindCSS.
            Experience the power of our enhanced UI components with improved animations and interactions.
          </p>
        </div>

        {/* Input Fields Section */}
        <section className="card p-8 space-y-8 animate-slideIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ✨ Enhanced Input Fields
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Experience our improved input components with better animations, focus states, and visual feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Basic Inputs */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <User className="w-5 h-5 text-primary-600" />
                <span>User Information</span>
              </h3>
              
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
                showClearButton
                variant="outlined"
                size="md"
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                showClearButton
                variant="outlined"
                size="md"
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                showPasswordToggle
                variant="outlined"
                size="md"
              />
            </div>

            {/* Variant Showcase */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Component Variants & Sizes
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Small Filled Variant
                  </label>
                  <InputField
                    placeholder="Small filled input"
                    variant="filled"
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Medium Ghost Variant
                  </label>
                  <InputField
                    placeholder="Medium ghost input"
                    variant="ghost"
                    size="md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Large Outlined with Search
                  </label>
                  <InputField
                    placeholder="Search users..."
                    value={formData.search}
                    onChange={handleInputChange('search')}
                    variant="outlined"
                    size="lg"
                    showClearButton
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="btn-primary">
              Save Information
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setFormData({ name: '', email: '', password: '', search: '' })}
            >
              Reset Form
            </button>
          </div>
        </section>

        {/* Data Table Section */}
        <section className="card p-8 space-y-8 animate-scaleIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🚀 Enhanced Data Table
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced table with sorting, selection, custom rendering, and improved visual design
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedUsers.length} of {sampleData.length} selected
                </span>
                {selectedUsers.length > 0 && (
                  <button 
                    onClick={() => setSelectedUsers([])}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {sampleData.length} users
                </span>
              </div>
            </div>

            <DataTable
              data={sampleData}
              columns={columns}
              selectable
              onRowSelect={setSelectedUsers}
              className="shadow-lg"
              hoverable
              striped
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          <div className="card p-6 text-center space-y-4 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sampleData.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
          </div>

          <div className="card p-6 text-center space-y-4 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sampleData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
            </div>
          </div>

          <div className="card p-6 text-center space-y-4 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedUsers.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Selected</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 dark:text-gray-400 animate-fadeIn">
          <p>
            Built with ❤️ using React, TypeScript, and TailwindCSS
          </p>
        </footer>
      </div>
    </div>
  );
}
