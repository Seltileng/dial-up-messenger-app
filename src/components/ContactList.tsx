
import React from 'react';
import { cn } from '@/lib/utils';

export type Contact = {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar?: string;
  lastSeen?: string;
};

interface ContactListProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (contactId: string) => void;
  className?: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  activeContactId,
  onSelectContact,
  className,
}) => {
  return (
    <div className={cn('inset-98 p-1 h-full overflow-auto retro-scrollbar', className)}>
      <div className="text-xs mb-2 font-bold text-retro-blue">Online Buddies:</div>
      <div className="space-y-1">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className={cn(
              'flex items-center px-2 py-1 cursor-pointer select-none',
              activeContactId === contact.id ? 'bg-retro-blue text-white' : 'hover:bg-gray-200'
            )}
          >
            <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0">
              {contact.status === 'online' && <div className="w-full h-full bg-green-500 rounded-full"></div>}
              {contact.status === 'away' && <div className="w-full h-full bg-yellow-400 rounded-full"></div>}
              {contact.status === 'offline' && <div className="w-full h-full bg-gray-400 rounded-full"></div>}
            </div>
            <div className="truncate text-sm">{contact.name}</div>
            {contact.status === 'offline' && contact.lastSeen && (
              <div className="text-xs ml-auto opacity-60">{contact.lastSeen}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
