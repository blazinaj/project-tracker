import React from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  // Variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-2 py-1 rounded',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-md',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={isLoading ? 'invisible' : 'flex items-center'}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;