import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'github';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'h-12 w-full cursor-pointer rounded-lg text-base font-medium transition-all duration-150 active:scale-[0.98]',

        variant === 'primary' &&
          'bg-primary hover:bg-primary-hover active:bg-primary-active text-white',

        variant === 'github' &&
          'flex items-center justify-center gap-3 bg-black text-white hover:bg-neutral-900 active:bg-neutral-800',

        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
