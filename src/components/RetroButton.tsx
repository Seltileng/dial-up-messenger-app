
import React from 'react';
import { cn } from '@/lib/utils';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant = 'default', size = 'md', active = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'button-98 relative select-none transition-transform active:translate-y-[1px] hover:brightness-95',
          {
            'bg-retro-button text-black': variant === 'default' && !active,
            'bg-retro-blue text-white font-bold': variant === 'primary' || active,
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-4 py-1': size === 'md',
            'px-6 py-2': size === 'lg',
            'shadow-win98-inset': active,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RetroButton.displayName = 'RetroButton';

export default RetroButton;
