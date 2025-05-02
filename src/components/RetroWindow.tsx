
import React from 'react';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  className,
  contentClassName,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div className={cn('window-98 flex flex-col dialog-98', className)}>
      <div className="window-title-98">
        <div className="text-sm truncate font-vt323 tracking-wide">{title}</div>
        <div className="flex space-x-1">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="h-[14px] w-[14px] bg-retro-button flex items-center justify-center border border-gray-500"
            >
              <Minus size={10} />
            </button>
          )}
          {onMaximize && (
            <button
              onClick={onMaximize}
              className="h-[14px] w-[14px] bg-retro-button flex items-center justify-center border border-gray-500"
            >
              <Square size={10} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="h-[14px] w-[14px] bg-retro-button flex items-center justify-center border border-gray-500"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </div>
      <div className={cn('p-2 flex-1 dial-up-noise', contentClassName)}>{children}</div>
    </div>
  );
};

export default RetroWindow;
