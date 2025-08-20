import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '../index'
import type { Column } from '../index'

interface TestData {
  id: number
  name: string
  age: number
  email: string
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
]

const testColumns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
]

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<DataTable data={testData} columns={testColumns} />)
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />)
    
    expect(screen.getByText('No data found')).toBeInTheDocument()
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('handles row selection', () => {
    const handleRowSelect = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    )
    
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // Click first data row checkbox
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]])
  })

  it('handles select all', () => {
    const handleRowSelect = vi.fn()
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    )
    
    const selectAllCheckbox = screen.getByLabelText('Select all rows')
    fireEvent.click(selectAllCheckbox)
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData)
  })

  it('handles sorting', () => {
    render(<DataTable data={testData} columns={testColumns} />)
    
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    
    // After sorting, Bob should come first alphabetically
    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Bob Johnson')
  })

  it('shows custom empty text', () => {
    render(
      <DataTable 
        data={[]} 
        columns={testColumns} 
        emptyText="Custom empty message"
      />
    )
    
    expect(screen.getByText('Custom empty message')).toBeInTheDocument()
  })
})
