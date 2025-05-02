
import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onClose?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  className,
  contentClassName,
  onClose,
}) => {
  return (
    <div className={cn('window-98 flex flex-col', className)}>
      <div className="window-title-98">
        <div className="text-sm truncate">{title}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="h-[14px] w-[14px] bg-retro-button flex items-center justify-center border border-gray-500"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <div className={cn('p-2 flex-1', contentClassName)}>{children}</div>
    </div>
  );
};

export default RetroWindow;
