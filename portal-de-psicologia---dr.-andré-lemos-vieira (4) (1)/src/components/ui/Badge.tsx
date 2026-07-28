import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'sky' | 'amber' | 'slate' | 'rose' | 'teal';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const variantStyles = {
    emerald: 'bg-blue-100/90 text-blue-950 border border-blue-300/80',
    sky: 'bg-sky-100/90 text-sky-950 border border-sky-300/80',
    amber: 'bg-amber-100/90 text-amber-950 border border-amber-300/80',
    slate: 'bg-slate-100 text-slate-800 border border-slate-300/80',
    rose: 'bg-rose-100/90 text-rose-950 border border-rose-300/80',
    teal: 'bg-indigo-100/90 text-indigo-950 border border-indigo-300/80',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full tracking-wide whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
