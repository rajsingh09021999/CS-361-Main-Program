import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon
}) => {
  // If a custom className is provided with bg-transparent, don't apply the default background colors
  const hasCustomBg = className.includes('bg-');
  
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Default variant styles that will be used if no custom background is provided
  const variantClasses = {
    primary: hasCustomBg ? '' : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
    secondary: hasCustomBg ? '' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm',
    danger: hasCustomBg ? '' : 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button 
      type={type} 
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;