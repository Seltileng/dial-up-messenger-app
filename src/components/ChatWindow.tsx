
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble, { Message } from './MessageBubble';
import { Contact } from './ContactList';
import { Send } from 'lucide-react';
import RetroButton from './RetroButton';

interface ChatWindowProps {
  activeContact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  activeContact,
  messages,
  onSendMessage,
  className,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (activeContact?.status === 'online' && messages.length > 0) {
      const typingTimeout = Math.random() * 10000 + 5000; // Random time between 5-15 seconds
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
        
        // Stop typing after 1-3 seconds
        const stopTypingTimer = setTimeout(() => {
          setIsTyping(false);
        }, Math.random() * 2000 + 1000);
        
        return () => clearTimeout(stopTypingTimer);
      }, typingTimeout);
      
      return () => clearTimeout(typingTimer);
    }
  }, [messages, activeContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!activeContact) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <div className="text-gray-500 text-center">
          <p>Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Chat header */}
      <div className="bg-retro-darkgray text-white px-3 py-1 flex items-center">
        <div className="w-3 h-3 rounded-full mr-2">
          {activeContact.status === 'online' && <div className="w-full h-full bg-green-500 rounded-full"></div>}
          {activeContact.status === 'away' && <div className="w-full h-full bg-yellow-400 rounded-full"></div>}
          {activeContact.status === 'offline' && <div className="w-full h-full bg-gray-400 rounded-full"></div>}
        </div>
        <div className="font-medium">{activeContact.name}</div>
        <div className="ml-auto text-xs">
          {activeContact.status === 'online' ? 'Online' : 
           activeContact.status === 'away' ? 'Away' : 
           activeContact.lastSeen ? `Last seen ${activeContact.lastSeen}` : 'Offline'}
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-3 overflow-y-auto bg-retro-lightgray inset-98 retro-scrollbar">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-1 p-2 max-w-[100px] bg-white border border-retro-darkgray rounded-md">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-loading-dot-1"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-loading-dot-2"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-loading-dot-3"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="mt-2 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border inset-98 text-sm bg-white focus:outline-none"
        />
        <RetroButton
          type="submit"
          className="ml-2 flex items-center justify-center"
          disabled={!newMessage.trim()}
        >
          <Send size={16} className="mr-1" />
          Send
        </RetroButton>
      </form>
    </div>
  );
};

export default ChatWindow;
