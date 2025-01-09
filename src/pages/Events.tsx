import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock, FaUsers, FaFilter, FaChevronRight } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

// Mock data for events - moved outside component
const mockEvents = [
  {
    id: 1,
    title: 'Coffee & Code',
    description: 'Join fellow CS students for coffee and coding session',
    date: '2024-02-15',
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
    description: 'Discussion on latest developments in AI and Machine Learning',
    date: '2024-02-18',
    time: '5:00 PM',
    location: 'Engineering Building',
    attendees: 25,
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    tags: ['AI', 'Research', 'Tech'],
    isRegistered: true,
  },
  {
    id: 3,
    title: 'Startup Networking',
    description: 'Network with student entrepreneurs and startup founders',
    date: '2024-02-20',
    time: '6:30 PM',
    location: 'Innovation Hub',
    attendees: 18,
    maxAttendees: 40,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    tags: ['Networking', 'Startup', 'Business'],
    isRegistered: false,
  }
] as const;

// Enhanced Header Component
const Header = ({ onCreateEvent, onFilter }: { 
  onCreateEvent: () => void;
  onFilter: () => void;
}) => (
  <div className="sticky top-0 z-10">
    <div className="bg-[var(--primary)] text-white py-2.5 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Events</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={onFilter}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaFilter className="text-lg" />
          </button>
          <button 
            onClick={onCreateEvent}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCalendarPlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Date Filter Component
const DateFilter = () => {
  const dates = ['Today', 'Tomorrow', 'This Week', 'This Month'];
  const [selected, setSelected] = useState('Today');

  return (
    <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {dates.map((date) => (
        <button
          key={date}
          onClick={() => setSelected(date)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
            selected === date
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
                  {event.attendees}/{event.maxAttendees} spots filled
                </span>
              </div>
              {isAlmostFull && (
                <span className="text-xs text-red-500 font-medium animate-pulse">
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEvents = selectedDate
    ? mockEvents.filter(event => event.date === selectedDate)
    : mockEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCreateEvent={() => console.log('Create new event')}
        onFilter={() => console.log('Open filters')}
      />
      <DateFilter />
      
      <div className="pb-16">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => navigate(`/events/${event.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Events; 