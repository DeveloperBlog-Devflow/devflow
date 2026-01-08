'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

type Props = {
  id: string;
  label: string;
  error?: string;
  showError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const base =
  'border-border placeholder:text-muted hover:border-border-hover focus:border-border-focus focus:ring-border-focus h-10 w-full rounded-md border px-3 text-sm transition-colors focus:ring-1 focus:outline-none';
const errCls = 'border-red-500 focus:ring-red-500';

const FormField = forwardRef<HTMLInputElement, Props>(
  ({ id, label, error, showError, className, ...rest }, ref) => {
    const msg = showError ? error : '';
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="pl-1 text-sm font-medium">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`${base} ${msg ? errCls : ''} ${className ?? ''}`}
          aria-invalid={!!msg}
          aria-describedby={msg ? `${id}-error` : undefined}
          {...rest}
        />
        {msg && (
          <p id={`${id}-error`} className="pl-1 text-xs text-red-500">
            {msg}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
