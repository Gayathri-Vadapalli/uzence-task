import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './index'
import type { Column } from './index'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-12' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Editor', status: 'active', lastLogin: '2024-01-13' },
]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
]

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, selection, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    onRowSelect: () => {},
    data: sampleData,
    columns: columns as Column<Record<string, any>>[],
  },
} satisfies Meta<typeof DataTable<User>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns as Column<Record<string, any>>[],
  },
}

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns as Column<Record<string, any>>[],
    selectable: true,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns: columns as Column<Record<string, any>>[],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: columns as Column<Record<string, any>>[],
  },
}

export const CustomEmpty: Story = {
  args: {
    data: [],
    columns: columns as Column<Record<string, any>>[],
    emptyText: 'No users found. Try adjusting your search criteria.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={columns as Column<Record<string, any>>[]} size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={columns as Column<Record<string, any>>[]} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={columns as Column<Record<string, any>>[]} size="lg" />
      </div>
    </div>
  ),
}

export const WithCustomRendering: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { 
        key: 'status', 
        title: 'Status', 
        dataIndex: 'status', 
        sortable: true,
        render: (value: string) => (
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              value === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="capitalize">{value}</span>
          </div>
        )
      },
      { 
        key: 'actions', 
        title: 'Actions', 
        dataIndex: 'id',
        render: () => (
          <div className="space-x-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>
        )
      },
    ],
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    data: sampleData,
    columns: columns as Column<Record<string, any>>[],
    selectable: true,
  },
}
