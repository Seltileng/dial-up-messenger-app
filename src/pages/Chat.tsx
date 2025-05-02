
import React, { useState, useEffect } from 'react';
import RetroWindow from '@/components/RetroWindow';
import ContactList, { Contact } from '@/components/ContactList';
import ChatWindow from '@/components/ChatWindow';
import { Message } from '@/components/MessageBubble';
import ConnectingAnimation from '@/components/ConnectingAnimation';
import DialupSound from '@/components/DialupSound';
import { useIsMobile } from '@/hooks/use-mobile';
import RetroButton from '@/components/RetroButton';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialContacts: Contact[] = [
  { id: '1', name: 'Alice Smith', status: 'online' },
  { id: '2', name: 'Bob Johnson', status: 'online' },
  { id: '3', name: 'Charlie Brown', status: 'away', lastSeen: '5m ago' },
  { id: '4', name: 'David Williams', status: 'offline', lastSeen: '1h ago' },
  { id: '5', name: 'Eva Martinez', status: 'online' },
  { id: '6', name: 'Frank Miller', status: 'offline', lastSeen: '2d ago' },
  { id: '7', name: 'Grace Davis', status: 'away', lastSeen: '15m ago' },
];

const initialMessagesByContact: Record<string, Message[]> = {
  '1': [
    { id: '1', text: 'Hey there!', sender: '1', timestamp: '10:30 AM', isRead: true, isUser: false },
    { id: '2', text: 'How are you doing?', sender: 'user', timestamp: '10:31 AM', isSent: true, isRead: true, isUser: true },
    { id: '3', text: 'I\'m good! Just getting used to this retro messenger.', sender: '1', timestamp: '10:32 AM', isRead: true, isUser: false },
    { id: '4', text: 'It\'s so nostalgic!', sender: 'user', timestamp: '10:33 AM', isSent: true, isRead: true, isUser: true },
  ],
  '2': [
    { id: '1', text: 'Did you hear about the new software update?', sender: '2', timestamp: '9:20 AM', isRead: true, isUser: false },
    { id: '2', text: 'No, what\'s new in it?', sender: 'user', timestamp: '9:25 AM', isSent: true, isRead: true, isUser: true },
  ],
};

const Chat: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessagesByContact);
  const [isConnecting, setIsConnecting] = useState(true);
  const [playDialup, setPlayDialup] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const isMobile = useIsMobile();
  
  const activeContact = activeContactId 
    ? initialContacts.find(contact => contact.id === activeContactId) ?? null
    : null;
    
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  useEffect(() => {
    // Start connection sequence
    setPlayDialup(true);
  }, []);

  const handleConnectionComplete = () => {
    setIsConnecting(false);
  };
  
  const handleSoundComplete = () => {
    // Sound has completed
  };

  const handleSelectContact = (contactId: string) => {
    setActiveContactId(contactId);
    if (isMobile) {
      setShowMobileChat(true);
    }
  };
  
  const handleBackToContacts = () => {
    if (isMobile) {
      setShowMobileChat(false);
    }
  };

  const handleSendMessage = (text: string) => {
    if (!activeContactId) return;

    const newMessage: Message = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      isRead: false,
      isUser: true,
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage],
    }));

    // Simulate reply after random delay
    if (initialContacts.find(c => c.id === activeContactId)?.status === 'online') {
      setTimeout(() => {
        const replies = [
          'Oh, interesting!',
          'Tell me more about that.',
          'I see what you mean.',
          'That sounds great!',
          'I\'m not sure I follow...',
          'Haha, that\'s funny!',
          'I was thinking the same thing.',
          'What else is new?',
          'Have you tried turning it off and on again?',
          'This dial-up messenger is so retro!',
        ];
        
        const replyMessage: Message = {
          id: generateId(),
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: activeContactId,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
        };

        setMessages(prev => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), replyMessage],
        }));

        // Mark user message as read
        setMessages(prev => {
          const updatedMessages = prev[activeContactId].map(msg => 
            msg.isUser && !msg.isRead ? { ...msg, isRead: true } : msg
          );
          return { ...prev, [activeContactId]: updatedMessages };
        });
      }, Math.random() * 3000 + 1000);
    }
  };

  if (isConnecting) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RetroWindow title="Connecting..." className="w-96 h-96">
          <ConnectingAnimation onComplete={handleConnectionComplete} />
          <DialupSound play={playDialup} onComplete={handleSoundComplete} />
        </RetroWindow>
      </div>
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="h-[calc(100vh-7rem)]">
        <RetroWindow 
          title={showMobileChat ? activeContact?.name || 'Chat' : 'Dial-Up Messenger'}
          className="w-full h-full"
        >
          {showMobileChat && activeContact ? (
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <RetroButton onClick={handleBackToContacts} size="sm">
                  Back to Contacts
                </RetroButton>
              </div>
              <div className="flex-1">
                <ChatWindow 
                  activeContact={activeContact} 
                  messages={activeMessages} 
                  onSendMessage={handleSendMessage} 
                />
              </div>
            </div>
          ) : (
            <ContactList 
              contacts={initialContacts} 
              activeContactId={activeContactId} 
              onSelectContact={handleSelectContact} 
            />
          )}
        </RetroWindow>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-7rem)]">
      <RetroWindow title="Contacts" className="h-full">
        <ContactList 
          contacts={initialContacts} 
          activeContactId={activeContactId} 
          onSelectContact={handleSelectContact} 
          className="h-full"
        />
      </RetroWindow>
      <RetroWindow title="Messages" className="col-span-2 h-full">
        <ChatWindow 
          activeContact={activeContact} 
          messages={activeMessages} 
          onSendMessage={handleSendMessage} 
          className="h-full"
        />
      </RetroWindow>
    </div>
  );
};

export default Chat;
