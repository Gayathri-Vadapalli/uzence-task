import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Loader2, Database } from 'lucide-react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
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

type SortOrder = 'asc' | 'desc' | null

interface SortConfig {
  key: string | null
  order: SortOrder
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const cellPaddingClasses = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyText = 'No data available',
  rowKey = 'id',
  size = 'md',
  striped = true,
  hoverable = true,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null })

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] ?? index
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.order) return data

    const column = columns.find(col => col.key === sortConfig.key)
    if (!column) return data

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex]
      const bValue = b[column.dataIndex]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.order === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }

      const aStr = String(aValue)
      const bStr = String(bValue)
      return sortConfig.order === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr)
    })
  }, [data, sortConfig, columns])

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey)
    if (!column?.sortable) return

    setSortConfig(prev => {
      if (prev.key === columnKey) {
        if (prev.order === 'asc') return { key: columnKey, order: 'desc' }
        if (prev.order === 'desc') return { key: null, order: null }
      }
      return { key: columnKey, order: 'asc' }
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(sortedData.map((record, index) => getRowKey(record, index)))
      setSelectedRows(allKeys)
      onRowSelect?.(sortedData)
    } else {
      setSelectedRows(new Set())
      onRowSelect?.([])
    }
  }

  const handleRowSelect = (record: T, index: number, checked: boolean) => {
    const key = getRowKey(record, index)
    const newSelectedRows = new Set(selectedRows)

    if (checked) {
      newSelectedRows.add(key)
    } else {
      newSelectedRows.delete(key)
    }

    setSelectedRows(newSelectedRows)
    
    const selectedData = sortedData.filter((record, index) => 
      newSelectedRows.has(getRowKey(record, index))
    )
    onRowSelect?.(selectedData)
  }

  const isAllSelected = selectedRows.size === sortedData.length && sortedData.length > 0
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <div className="w-4 h-4" />
    }
    
    if (sortConfig.order === 'asc') {
      return <ChevronUp className="w-4 h-4" />
    }
    
    if (sortConfig.order === 'desc') {
      return <ChevronDown className="w-4 h-4" />
    }
    
    return <div className="w-4 h-4" />
  }

  const renderCellContent = (column: Column<T>, record: T, index: number) => {
    const value = record[column.dataIndex]
    
    if (column.render) {
      return column.render(value, record, index)
    }
    
    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>
    }
    
    return String(value)
  }

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  if (loading) {
    return (
      <div className={clsx('border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg', className)}>
        <div className="flex items-center justify-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl">
          <div className="flex flex-col items-center space-y-4 text-gray-500 dark:text-gray-400">
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-primary-200 dark:border-primary-800 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-medium text-lg">Loading data...</p>
              <p className="text-sm opacity-75">Please wait while we fetch your information</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={clsx('border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg', className)}>
        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
          <div className="relative mb-6">
            <Database className="w-16 h-16 text-gray-300 dark:text-gray-600" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">!</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold">No data available</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md">{emptyText}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300', className)}>
      <div className="overflow-x-auto">
        <table className={clsx('w-full divide-y divide-gray-200 dark:divide-gray-700', sizeClasses[size])}>
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750">
            <tr>
              {selectable && (
                <th className={clsx('w-12 bg-gray-50 dark:bg-gray-800', cellPaddingClasses[size])}>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isIndeterminate
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                      aria-label="Select all rows"
                    />
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase text-xs',
                    cellPaddingClasses[size],
                    getAlignmentClass(column.align),
                    {
                      'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group': column.sortable,
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span className={column.sortable ? 'group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors' : ''}>
                      {column.title}
                    </span>
                    {column.sortable && (
                      <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                        {getSortIcon(column.key)}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((record, index) => {
              const key = getRowKey(record, index)
              const isSelected = selectedRows.has(key)
              
              return (
                <tr
                  key={key}
                  className={clsx(
                    'transition-all duration-200 group',
                    {
                      'bg-gray-50/50 dark:bg-gray-800/30': striped && index % 2 === 1,
                      'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md': hoverable,
                      'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-200 dark:ring-primary-800': isSelected,
                      'transform hover:scale-[1.01]': hoverable,
                    }
                  )}
                >
                  {selectable && (
                    <td className={clsx('bg-gray-50/50 dark:bg-gray-800/50', cellPaddingClasses[size])}>
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleRowSelect(record, index, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                          aria-label={`Select row ${index + 1}`}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                        cellPaddingClasses[size],
                        getAlignmentClass(column.align)
                      )}
                      style={{ width: column.width }}
                    >
                      {renderCellContent(column, record, index)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
