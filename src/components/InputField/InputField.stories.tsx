import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from './index'

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states and various styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
  },
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Outlined (Default)"
        placeholder="Outlined variant"
        variant="outlined"
      />
      <InputField
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
      />
      <InputField
        label="Ghost"
        placeholder="Ghost variant"
        variant="ghost"
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Small"
        placeholder="Small size"
        size="sm"
      />
      <InputField
        label="Medium (Default)"
        placeholder="Medium size"
        size="md"
      />
      <InputField
        label="Large"
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Normal"
        placeholder="Normal state"
      />
      <InputField
        label="Disabled"
        placeholder="Disabled state"
        disabled
      />
      <InputField
        label="Invalid"
        placeholder="Invalid state"
        invalid
        errorMessage="This field has an error"
      />
      <InputField
        label="Loading"
        placeholder="Loading state"
        loading
      />
    </div>
  ),
}

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    invalid: true,
    errorMessage: 'This field is required and cannot be empty.',
    value: '',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
  },
}

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    showClearButton: true,
    value: 'Some text to clear',
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
    label: 'Dark Mode Input',
    placeholder: 'This input works in dark mode',
    helperText: 'Helper text in dark mode',
  },
}
