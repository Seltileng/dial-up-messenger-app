
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
        'flex flex-col mb-2 max-w-[85%] animate-[message-appear_0.3s_ease-out]',
        isUser ? 'ml-auto items-end' : 'mr-auto items-start',
        className
      )}
    >
      <div
        className={cn(
          'px-3 py-2 rounded-md text-sm shadow-sm',
          isUser ? 'message-bubble-out' : 'message-bubble-in'
        )}
      >
        {message.text}
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-500 space-x-1">
        <span>{message.timestamp}</span>
        {isUser && message.isSent && (
          <span className="text-[10px] ml-1">
            {message.isRead ? '✓✓' : '✓'}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
