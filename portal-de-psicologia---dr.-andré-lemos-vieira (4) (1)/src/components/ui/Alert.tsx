import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger' | 'clinical';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const styles = {
    info: {
      bg: 'bg-sky-50/90 border-sky-200 text-sky-950',
      icon: <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50/90 border-emerald-200 text-emerald-950',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50/90 border-amber-200 text-amber-950',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-rose-50/90 border-rose-200 text-rose-950',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    },
    clinical: {
      bg: 'bg-emerald-950/95 border-emerald-700 text-emerald-100 shadow-md',
      icon: <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type];

  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3 relative ${current.bg} ${className}`}>
      {current.icon}
      <div className="flex-1 text-xs md:text-sm leading-relaxed">
        {title && <h4 className="font-bold mb-1 tracking-tight">{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Fechar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
