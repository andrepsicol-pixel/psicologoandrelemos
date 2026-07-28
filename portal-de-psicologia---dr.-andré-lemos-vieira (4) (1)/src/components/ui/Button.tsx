import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variantStyles = {
    primary: 'bg-blue-900 hover:bg-blue-950 text-white shadow-sm hover:shadow-md active:scale-[0.99] rounded-full',
    secondary: 'bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200/80 rounded-full',
    outline: 'bg-white/80 hover:bg-white text-slate-800 border border-slate-300/80 shadow-2xs hover:border-blue-600 hover:text-blue-950 rounded-full',
    ghost: 'bg-transparent hover:bg-blue-50/80 text-blue-950 rounded-2xl',
    cta: 'bg-blue-700 hover:bg-blue-600 text-white shadow-lg shadow-blue-950/20 active:scale-[0.98] rounded-full',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs rounded-full',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-xs md:text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5 min-h-[50px]',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
