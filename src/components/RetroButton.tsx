
import React from 'react';
import { cn } from '@/lib/utils';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'button-98 relative select-none',
          {
            'bg-retro-button text-black': variant === 'default',
            'bg-retro-blue text-white': variant === 'primary',
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-4 py-1': size === 'md',
            'px-6 py-2': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

RetroButton.displayName = 'RetroButton';

export default RetroButton;
