import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

interface Photo {
  url: string;
  id: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onLike?: () => void;
}

const PhotoGallery = ({ photos, onLike }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    if (
      (currentIndex === 0 && newDirection === -1) ||
      (currentIndex === photos.length - 1 && newDirection === 1)
    ) {
      return;
    }
    setDirection(newDirection);
    setCurrentIndex((prev) => prev + newDirection);
  };

  const handleDoubleTap = () => {
    if (onLike) {
      setShowLikeAnimation(true);
      onLike();
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            duration: 0.3,
            type: "spring",
            damping: 30
          }}
          className="absolute inset-0"
          onDoubleClick={handleDoubleTap}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${photos[currentIndex].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E1FF4D] rounded-full flex items-center justify-center text-[#6B4EFF] shadow-lg"
          onClick={() => paginate(-1)}
        >
          <FaChevronLeft className="text-lg" />
        </motion.button>
      )}
      {currentIndex < photos.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E1FF4D] rounded-full flex items-center justify-center text-[#6B4EFF] shadow-lg"
          onClick={() => paginate(1)}
        >
          <FaChevronRight className="text-lg" />
        </motion.button>
      )}

      {/* Photo Indicators */}
      <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1.5">
        {photos.map((_, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              width: index === currentIndex ? 24 : 6,
              backgroundColor: index === currentIndex ? '#E1FF4D' : 'rgba(255,255,255,0.5)'
            }}
            className="h-1.5 rounded-full transition-all duration-300"
          />
        ))}
      </div>

      {/* Like Animation */}
      <AnimatePresence>
        {showLikeAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.5, 1]
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6],
                repeat: Infinity
              }}
            >
              <FaHeart className="text-7xl text-[#E1FF4D] drop-shadow-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery; 