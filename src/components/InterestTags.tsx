import { motion } from 'framer-motion';

interface Interest {
  id: number;
  name: string;
  emoji: string;
}

interface InterestTagsProps {
  interests: Interest[];
  onTagClick?: (interest: Interest) => void;
  selectable?: boolean;
  selected?: number[];
}

const InterestTags = ({ interests, onTagClick, selectable = false, selected = [] }: InterestTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => (
        <motion.button
          key={interest.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagClick?.(interest)}
          className={`px-4 py-2 rounded-full text-sm flex items-center space-x-2 ${
            selectable && selected.includes(interest.id)
              ? 'bg-[#E1FF4D] text-[#6B4EFF]'
              : 'bg-[#7B5CFF] text-white hover:bg-[#8468FF]'
          }`}
        >
          <span role="img" aria-label={interest.name} className="text-base">
            {interest.emoji}
          </span>
          <span className="font-medium">{interest.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default InterestTags; 