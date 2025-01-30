import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock, FaUsers, FaFilter, FaChevronRight, FaSearch } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

// Mock data for events - moved outside component
const mockEvents = [
  {
    id: 1,
    title: 'Coffee & Code',
    description: 'Join fellow CS students for coffee and coding session. Work on personal projects, get help with assignments, or just hang out!',
    date: new Date().toISOString().split('T')[0], // Today
    time: '3:00 PM',
    location: 'Campus Coffee Shop',
    attendees: 12,
    maxAttendees: 20,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096',
    tags: ['Tech', 'Social', 'Coffee'],
    isRegistered: false,
  },
  {
    id: 2,
    title: 'AI Research Meetup',
    description: 'Discussion on latest developments in AI and Machine Learning. Special focus on Large Language Models and their applications.',
    date: '2024-02-18',
    time: '5:00 PM',
    location: 'Engineering Building Room 101',
    attendees: 25,
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    tags: ['AI', 'Research', 'Tech'],
    isRegistered: true,
  },
  {
    id: 3,
    title: 'Startup Networking Night',
    description: 'Network with student entrepreneurs and startup founders. Great opportunity to find co-founders or join exciting projects!',
    date: '2024-02-20',
    time: '6:30 PM',
    location: 'Innovation Hub',
    attendees: 38,
    maxAttendees: 40,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    tags: ['Networking', 'Startup', 'Business'],
    isRegistered: false,
  },
  {
    id: 4,
    title: 'Campus Band Night',
    description: 'Live performances from our talented student bands! Food trucks and refreshments available.',
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
    time: '7:00 PM',
    location: 'Student Center Plaza',
    attendees: 85,
    maxAttendees: 200,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    tags: ['Music', 'Entertainment', 'Food'],
    isRegistered: true,
  },
  {
    id: 5,
    title: 'Resume Workshop',
    description: 'Get your resume reviewed by industry professionals from top tech companies. Bring your laptop and current resume!',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // 3 days from now
    time: '2:00 PM',
    location: 'Career Center',
    attendees: 15,
    maxAttendees: 25,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    tags: ['Career', 'Workshop', 'Professional'],
    isRegistered: false,
  },
  {
    id: 6,
    title: 'International Food Festival',
    description: 'Celebrate diversity with food from around the world! Student cultural organizations will showcase their traditional cuisines.',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // 5 days from now
    time: '12:00 PM',
    location: 'Main Quad',
    attendees: 150,
    maxAttendees: 500,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    tags: ['Food', 'Culture', 'Social'],
    isRegistered: false,
  },
  {
    id: 7,
    title: 'Hackathon 2024',
    description: '24-hour coding competition! Build innovative solutions, win prizes, and meet fellow developers. All skill levels welcome.',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // 7 days from now
    time: '9:00 AM',
    location: 'Computer Science Building',
    attendees: 80,
    maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    tags: ['Tech', 'Competition', 'Coding'],
    isRegistered: false,
  },
  {
    id: 8,
    title: 'Wellness Wednesday',
    description: 'Join us for yoga, meditation, and stress management workshops. Take a break from studying and focus on your mental health.',
    date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], // 14 days from now
    time: '11:00 AM',
    location: 'Recreation Center',
    attendees: 20,
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    tags: ['Wellness', 'Health', 'Workshop'],
    isRegistered: false,
  },
  {
    id: 9,
    title: 'Research Symposium',
    description: 'Undergraduate and graduate students present their research projects. Great networking opportunity with faculty and researchers.',
    date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0], // 20 days from now
    time: '10:00 AM',
    location: 'Science Center Auditorium',
    attendees: 45,
    maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846',
    tags: ['Research', 'Academic', 'Networking'],
    isRegistered: false,
  },
  {
    id: 10,
    title: 'Game Night',
    description: 'Board games, video games, and snacks! Come make new friends and show off your gaming skills.',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], // 2 days from now
    time: '6:00 PM',
    location: 'Student Lounge',
    attendees: 28,
    maxAttendees: 40,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8',
    tags: ['Gaming', 'Social', 'Entertainment'],
    isRegistered: false,
  }
] as const;

// Enhanced Header Component with Search
const Header = ({ onCreateEvent, onFilter, onSearch }: { 
  onCreateEvent: () => void;
  onFilter: () => void;
  onSearch: (query: string) => void;
}) => (
  <div className="sticky top-0 z-10 bg-white shadow-sm">
    <div className="bg-[var(--primary)] text-white py-2.5 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Events</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={onFilter}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Filter events"
          >
            <FaFilter className="text-lg" />
          </button>
          <button 
            onClick={onCreateEvent}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Create new event"
          >
            <FaCalendarPlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <div className="px-4 py-2 bg-white">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
    </div>
  </div>
);

// Date Filter Component
const DateFilter = ({ initialSelected, onSelect }: {
  initialSelected: string;
  onSelect: (selected: string) => void;
}) => {
  const dates = ['Today', 'Tomorrow', 'This Week', 'This Month'];

  return (
    <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white border-b border-gray-100">
      {dates.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
            initialSelected === date
              ? 'bg-[var(--primary)] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {date}
        </button>
      ))}
    </div>
  );
};

// Enhanced Event Card Component
const EventCard = ({ event, onClick }: {
  event: typeof mockEvents[number];
  onClick: () => void;
}) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const isAlmostFull = event.attendees / event.maxAttendees > 0.8;
  const spotsLeft = event.maxAttendees - event.attendees;

  return (
    <div className="p-4">
      <button
        onClick={onClick}
        className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="relative h-48">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            {formattedDate}
          </div>
          {event.isRegistered && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[var(--primary)] rounded-full text-white text-sm font-medium">
              Registered
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[var(--text)] text-lg">
              {event.title}
            </h3>
            <FaChevronRight className="text-gray-400 mt-1.5" />
          </div>
          
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {event.description}
          </p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FaClock className="text-sm" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FaMapMarkerAlt className="text-sm" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-gray-500">
                <FaUsers className="text-sm" />
                <span className="text-sm font-medium">
                  {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                </span>
              </div>
              {isAlmostFull && (
                <span className="text-xs text-red-500 font-medium">
                  Almost Full!
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--primary)] transition-all duration-500"
                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-4">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[var(--primary-light)]/10 text-[var(--primary)] rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery) ||
      event.description.toLowerCase().includes(searchQuery) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery));

    if (!matchesSearch) return false;

    if (selectedDate === 'Today') {
      const today = new Date().toISOString().split('T')[0];
      return event.date === today;
    }
    if (selectedDate === 'Tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return event.date === tomorrow.toISOString().split('T')[0];
    }
    if (selectedDate === 'This Week') {
      const today = new Date();
      const endOfWeek = new Date();
      endOfWeek.setDate(today.getDate() + 7);
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= endOfWeek;
    }
    if (selectedDate === 'This Month') {
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= endOfMonth;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCreateEvent={() => console.log('Create new event')}
        onFilter={() => console.log('Open filters')}
        onSearch={handleSearch}
      />
      <DateFilter initialSelected={selectedDate} onSelect={setSelectedDate} />
      
      <div className="pb-20">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No events found for your search criteria.</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => navigate(`/events/${event.id}`)}
            />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Events; 