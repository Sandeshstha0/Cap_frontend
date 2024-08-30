import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const baseStyles = 'font-semibold rounded focus:outline-none focus:ring';
  const variantStyles = {
    primary: 'bg-secondary  text-black  px-8 rounded-full',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-300',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
};

export default Button;
