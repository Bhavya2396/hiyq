import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTimes, FaStar, FaFilter, FaComment, FaCheck } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import FilterOptions from '../components/FilterOptions';

// Mock data for profiles - moved outside component to prevent recreation
const mockProfiles = [
  {
    id: 1,
    name: 'Sarah',
    age: 20,
    college: 'Stanford University',
    major: 'Computer Science',
    bio: '📱 Building the next big app | Coffee addict ☕️ | Love exploring new places 🌎',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330'],
    interests: ['Coding', 'Coffee', 'Travel', 'Music'],
    verified: true,
  },
  {
    id: 2,
    name: 'Michael',
    age: 21,
    college: 'UC Berkeley',
    major: 'Data Science',
    bio: 'AI enthusiast 🤖 | Basketball player 🏀 | Always learning something new 📚',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e'],
    interests: ['AI', 'Sports', 'Books'],
    verified: true,
  },
  {
    id: 3,
    name: 'Emma',
    age: 19,
    college: 'MIT',
    major: 'Design',
    bio: 'UX Designer by day, artist by night 🎨 | Plant mom 🌿 | Dog lover 🐕',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb'],
    interests: ['Design', 'Plants', 'Dogs', 'Art'],
    verified: true,
  }
] as const;

// Compact Header component
const Header = ({ university, onChatClick, onFilterClick }: {
  university: string;
  onChatClick: () => void;
  onFilterClick: () => void;
}) => (
  <div className="sticky top-0 z-10">
    <div className="bg-[var(--primary)] text-white py-1.5 px-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">Discover</h1>
      <span className="text-sm font-medium">{university}</span>
      <div className="flex items-center gap-2">
        <button onClick={onChatClick} className="p-1.5 hover:bg-white/10 rounded-lg">
          <FaComment className="text-lg" />
        </button>
        <button onClick={onFilterClick} className="p-1.5 hover:bg-white/10 rounded-lg">
          <FaFilter className="text-lg" />
        </button>
      </div>
    </div>
  </div>
);

// Optimized Profile Card component
const ProfileCard = ({ profile }: { profile: typeof mockProfiles[number] }) => (
  <div className="relative h-[calc(100vh-8rem)] rounded-xl overflow-hidden shadow-sm">
    <img
      src={profile.photos[0]}
      alt={profile.name}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
    
    {/* Profile Info Overlay */}
    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-2xl font-bold">
          {profile.name}, {profile.age}
        </h2>
        {profile.verified && (
          <div className="px-2 py-0.5 bg-white/20 rounded-full flex items-center gap-1">
            <FaCheck className="text-xs" />
            <span className="text-xs">Verified</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-white/90 mb-2">
        {profile.college} • {profile.major}
      </p>
      
      <p className="text-sm text-white/80 mb-3">{profile.bio}</p>
      
      <div className="flex flex-wrap gap-1.5">
        {profile.interests.map((interest) => (
          <span
            key={interest}
            className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Compact Action Buttons
const ActionButtons = ({ onPass, onSuperLike, onLike }: {
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
}) => (
  <div className="fixed bottom-16 left-0 right-0 px-4">
    <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
      <button
        onClick={onPass}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-red-500 text-xl shadow-sm border border-gray-100 hover:bg-gray-50"
      >
        <FaTimes />
      </button>
      <button
        onClick={onSuperLike}
        className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-lg shadow-sm hover:bg-[var(--primary-dark)]"
      >
        <FaStar />
      </button>
      <button
        onClick={onLike}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-green-500 text-xl shadow-sm border border-gray-100 hover:bg-gray-50"
      >
        <FaHeart />
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(0);
  const [university, setUniversity] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/login');
      return;
    }

    const domain = email.split('@')[1];
    let universityName = '';
    
    if (domain?.includes('stanford.edu')) universityName = 'Stanford University';
    else if (domain?.includes('berkeley.edu')) universityName = 'UC Berkeley';
    else if (domain?.includes('mit.edu')) universityName = 'MIT';
    else if (domain?.includes('harvard.edu')) universityName = 'Harvard University';
    else universityName = 'Your University';

    setUniversity(universityName);
  }, [navigate]);

  const handleLike = useCallback(() => {
    setCurrentProfile((prev) => (prev + 1) % mockProfiles.length);
  }, []);

  const handlePass = useCallback(() => {
    setCurrentProfile((prev) => (prev + 1) % mockProfiles.length);
  }, []);

  const handleSuperLike = useCallback(() => {
    setCurrentProfile((prev) => (prev + 1) % mockProfiles.length);
  }, []);

  const profile = mockProfiles[currentProfile];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header 
        university={university}
        onChatClick={() => navigate('/chat')}
        onFilterClick={() => setShowFilters(true)}
      />

      <div className="p-3">
        <ProfileCard profile={profile} />
      </div>

      <ActionButtons
        onPass={handlePass}
        onSuperLike={handleSuperLike}
        onLike={handleLike}
      />

      <BottomNav />

      {showFilters && (
        <FilterOptions
          onClose={() => setShowFilters(false)}
          onApply={(filters) => {
            console.log('Applied filters:', filters);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard; 