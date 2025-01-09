import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEllipsisV, FaBell, FaCircle } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

// Mock data for chats - moved outside component
const mockChats = [
  {
    id: 1,
    name: 'Sarah',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Hey! I saw you like coffee too ☕️',
    timestamp: '2m',
    unread: 2,
    online: true,
    typing: true,
  },
  {
    id: 2,
    name: 'Michael',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastMessage: 'What kind of music do you like? 🎵',
    timestamp: '15m',
    unread: 0,
    online: true,
    typing: false,
  },
  {
    id: 3,
    name: 'Emma',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    lastMessage: 'That art exhibition sounds amazing!',
    timestamp: '1h',
    unread: 1,
    online: false,
    typing: false,
  }
] as const;

// Header Component with notification badge
const Header = () => (
  <div className="sticky top-0 z-10">
    <div className="bg-[var(--primary)] text-white py-2.5 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Messages</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaBell className="text-lg" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <FaEllipsisV className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Search Component
const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="px-4 pt-3">
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search messages"
        className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-2xl text-[var(--text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all duration-200"
      />
    </div>
  </div>
);

// Typing Animation Component
const TypingIndicator = () => (
  <div className="flex gap-1 items-center">
    <FaCircle className="text-[4px] text-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
    <FaCircle className="text-[4px] text-[var(--primary)] animate-bounce" style={{ animationDelay: '200ms' }} />
    <FaCircle className="text-[4px] text-[var(--primary)] animate-bounce" style={{ animationDelay: '400ms' }} />
  </div>
);

// Enhanced Chat List Item Component
const ChatItem = ({ chat, onClick }: { 
  chat: typeof mockChats[number];
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
  >
    <div className="relative">
      <img
        src={chat.image}
        alt={chat.name}
        className="w-14 h-14 rounded-full object-cover ring-2 ring-offset-2 ring-[var(--primary-light)]/20"
      />
      {chat.online && (
        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[var(--text)] truncate text-base">{chat.name}</h3>
        <span className="text-xs text-gray-400 whitespace-nowrap font-medium">{chat.timestamp}</span>
      </div>
      <div className="flex items-center justify-between mt-0.5">
        {chat.typing ? (
          <TypingIndicator />
        ) : (
          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        )}
        {chat.unread > 0 && (
          <span className="ml-2 w-5 h-5 bg-[var(--primary)] text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  </button>
);

// Quick Actions Component
const QuickActions = () => (
  <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
    <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl text-sm font-medium whitespace-nowrap hover:bg-[var(--primary-dark)] transition-colors">
      All Messages
    </button>
    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
      Unread
    </button>
    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
      Online
    </button>
  </div>
);

const Chat = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <QuickActions />
      
      <div className="mt-2 pb-16 divide-y divide-gray-100">
        {filteredChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onClick={() => navigate(`/chat/${chat.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat; 