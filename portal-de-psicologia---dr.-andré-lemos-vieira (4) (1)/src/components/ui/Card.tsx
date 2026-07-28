import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
  bordered?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  hoverable = false,
  glass = true,
  bordered = true,
  className = '',
  ...props
}, ref) => {
  const base = 'rounded-3xl p-6 transition-all duration-200';
  const glassStyle = glass ? 'bg-white/80 backdrop-blur-xl shadow-xs' : 'bg-white shadow-sm';
  const borderStyle = bordered ? 'border border-white/80' : '';
  const hoverStyle = hoverable ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-300/80 cursor-pointer' : '';

  return (
    <div
      ref={ref}
      className={`${base} ${glassStyle} ${borderStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
