import { useState, forwardRef } from 'react'
import { Eye, EyeOff, X, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

export interface InputFieldProps {
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
  id?: string
  name?: string
  autoComplete?: string
  'aria-describedby'?: string
}

const sizeClasses = {
  sm: 'h-8 text-sm px-3',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

const labelSizeClasses = {
  sm: 'text-sm mb-1',
  md: 'text-sm mb-1.5',
  lg: 'text-base mb-2',
}

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      showClearButton = false,
      showPasswordToggle = type === 'password',
      className,
      id,
      name,
      autoComplete,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const hasError = invalid || !!errorMessage
    const inputType = type === 'password' && showPassword ? 'text' : type

    const baseClasses = clsx(
      'w-full font-medium transition-all duration-300 focus:outline-none focus:ring-2',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'backdrop-blur-sm',
      sizeClasses[size],
      {
        'opacity-50 cursor-not-allowed': disabled,
        'pr-10': showClearButton || showPasswordToggle || loading,
        'pr-16': (showClearButton && showPasswordToggle) || (loading && (showClearButton || showPasswordToggle)),
      }
    )

    const variantClasses = {
      outlined: clsx(
        'border-2 rounded-xl bg-white dark:bg-gray-800',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        {
          'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20 hover:border-gray-400 dark:hover:border-gray-500': !hasError && !disabled,
          'border-red-500 dark:border-red-400 focus:border-red-600 focus:ring-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100': hasError,
          'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800': disabled,
          'ring-4 ring-primary-500/10': isFocused && !hasError,
          'ring-4 ring-red-500/20': isFocused && hasError,
        }
      ),
      filled: clsx(
        'border-2 border-transparent rounded-xl bg-gray-100 dark:bg-gray-700',
        'shadow-inner hover:shadow-md transition-all duration-300',
        {
          'hover:bg-gray-50 dark:hover:bg-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 focus:ring-primary-500/20': !hasError && !disabled,
          'bg-red-100 dark:bg-red-900/30 focus:bg-red-50 dark:focus:bg-red-900/20 focus:border-red-500 focus:ring-red-500/30 border-red-300 dark:border-red-600 text-red-900 dark:text-red-100': hasError,
          'bg-gray-50 dark:bg-gray-800': disabled,
          'transform scale-[1.01]': isFocused,
        }
      ),
      ghost: clsx(
        'border-2 border-transparent rounded-xl bg-transparent',
        'hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300',
        {
          'focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 focus:ring-primary-500/20 focus:shadow-lg': !hasError && !disabled,
          'focus:bg-red-50 dark:focus:bg-red-900/20 focus:border-red-500 focus:ring-red-500/30 border-red-300 dark:border-red-600 bg-red-50/30 dark:bg-red-900/10 text-red-900 dark:text-red-100': hasError,
          'backdrop-blur-sm': isFocused,
        }
      ),
    }

    const inputClasses = clsx(baseClasses, variantClasses[variant], className)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const clearValue = () => {
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    const describedBy = clsx(
      ariaDescribedBy,
      helperText && `${id}-helper`,
      errorMessage && `${id}-error`
    ).trim() || undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'block font-medium text-gray-700 dark:text-gray-300',
              labelSizeClasses[size],
              {
                'text-red-600 dark:text-red-400': hasError,
                'opacity-50': disabled,
              }
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={inputClasses}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Loading, Clear, and Password Toggle Icons */}
          {(loading || showClearButton || showPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
              {loading && (
                <div className="flex items-center justify-center">
                  <Loader2 className={clsx('animate-spin text-primary-500', iconSizeClasses[size])} />
                </div>
              )}
              
              {showClearButton && value && !disabled && !loading && (
                <button
                  type="button"
                  onClick={clearValue}
                  className="group flex items-center justify-center p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  aria-label="Clear input"
                >
                  <X className={clsx('group-hover:scale-110 transition-transform', iconSizeClasses[size])} />
                </button>
              )}

              {showPasswordToggle && !loading && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="group flex items-center justify-center p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className={clsx('group-hover:scale-110 transition-transform', iconSizeClasses[size])} />
                  ) : (
                    <Eye className={clsx('group-hover:scale-110 transition-transform', iconSizeClasses[size])} />
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Helper Text and Error Message */}
        {(helperText || errorMessage) && (
          <div className="mt-2 space-y-1">
            {errorMessage ? (
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p
                  id={`${id}-error`}
                  className="text-sm font-medium text-red-600 dark:text-red-400 leading-relaxed animate-fadeIn"
                  role="alert"
                >
                  {errorMessage}
                </p>
              </div>
            ) : (
              helperText && (
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p
                    id={`${id}-helper`}
                    className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                  >
                    {helperText}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
