
import React from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isRead?: boolean;
  isSent?: boolean;
  isUser?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, className }) => {
  const isUser = message.isUser;

  return (
    <div
      className={cn(
        'flex flex-col mb-2 max-w-[85%]',
        isUser ? 'ml-auto items-end' : 'mr-auto items-start',
        className
      )}
    >
      <div
        className={cn(
          'px-3 py-2 rounded-md text-sm',
          isUser ? 'bg-retro-blue text-white' : 'bg-white border border-retro-darkgray'
        )}
      >
        {message.text}
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-500 space-x-1">
        <span>{message.timestamp}</span>
        {isUser && message.isSent && (
          <span className="text-[10px]">
            {message.isRead ? '✓✓' : '✓'}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
