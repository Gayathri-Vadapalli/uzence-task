import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '../index'

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField 
        label="Test Label" 
        placeholder="Test placeholder" 
      />
    )
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(
      <InputField 
        value=""
        onChange={handleChange}
        label="Test Input"
      />
    )
    
    const input = screen.getByLabelText('Test Input')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('shows error message when invalid', () => {
    render(
      <InputField 
        label="Test Input"
        invalid
        errorMessage="This field is required"
      />
    )
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(
      <InputField 
        label="Test Input"
        helperText="This is helpful information"
      />
    )
    
    expect(screen.getByText('This is helpful information')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(
      <InputField 
        label="Test Input"
        disabled
      />
    )
    
    const input = screen.getByLabelText('Test Input')
    expect(input).toBeDisabled()
  })

  it('renders different variants', () => {
    const { rerender } = render(
      <InputField 
        label="Test Input"
        variant="outlined"
        data-testid="input-field"
      />
    )
    
    let container = screen.getByTestId('input-field')
    expect(container).toHaveClass('border')
    
    rerender(
      <InputField 
        label="Test Input"
        variant="filled"
        data-testid="input-field"
      />
    )
    
    container = screen.getByTestId('input-field')
    expect(container).toHaveClass('bg-gray-100')
  })

  it('shows password toggle for password type', () => {
    render(
      <InputField 
        label="Password"
        type="password"
        showPasswordToggle
      />
    )
    
    expect(screen.getByLabelText('Show password')).toBeInTheDocument()
  })
})
