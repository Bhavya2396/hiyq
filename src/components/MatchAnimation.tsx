import { motion } from 'framer-motion';
import { FaComment, FaTimes } from 'react-icons/fa';

interface MatchAnimationProps {
  user1: {
    name: string;
    image: string;
  };
  user2: {
    name: string;
    image: string;
  };
  onClose: () => void;
  onMessage: () => void;
}

const MatchAnimation = ({ user1, user2, onClose, onMessage }: MatchAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#6B4EFF]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-50"
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
      >
        <FaTimes />
      </motion.button>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-[#E1FF4D] text-4xl font-bold mb-2">It's a Match!</h2>
        <p className="text-white/80">You and {user2.name} liked each other</p>
      </motion.div>

      <div className="flex items-center justify-center gap-4 mb-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#E1FF4D] shadow-lg"
        >
          <img src={user1.image} alt={user1.name} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#E1FF4D] shadow-lg"
        >
          <img src={user2.image} alt={user2.name} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMessage}
        className="w-full max-w-xs py-4 rounded-xl bg-[#E1FF4D] text-[#6B4EFF] font-semibold text-lg flex items-center justify-center gap-2 shadow-lg mb-4"
      >
        <FaComment />
        <span>Send a Message</span>
      </motion.button>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="w-full max-w-xs py-4 rounded-xl bg-white/10 text-white font-semibold text-lg shadow-lg"
      >
        Keep Swiping
      </motion.button>
    </motion.div>
  );
};

export default MatchAnimation; 