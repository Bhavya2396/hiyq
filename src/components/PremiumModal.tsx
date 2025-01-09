import { motion } from 'framer-motion';
import { FaBolt, FaStar, FaUndo, FaGlobe, FaEye, FaUserShield } from 'react-icons/fa';

interface PremiumModalProps {
  onClose: () => void;
  feature?: 'superlike' | 'rewind' | 'boost';
}

const features = [
  {
    icon: <FaStar className="text-yellow-500" />,
    title: 'Unlimited Super Likes',
    description: 'Stand out and get noticed by people you like',
  },
  {
    icon: <FaUndo className="text-blue-500" />,
    title: 'Unlimited Rewinds',
    description: 'Go back to profiles you accidentally passed',
  },
  {
    icon: <FaBolt className="text-purple-500" />,
    title: 'Profile Boosts',
    description: 'Get more visibility in your area',
  },
  {
    icon: <FaGlobe className="text-green-500" />,
    title: 'Global Access',
    description: 'Match with people from any college',
  },
  {
    icon: <FaEye className="text-pink-500" />,
    title: 'See Who Likes You',
    description: 'Know your admirers before matching',
  },
  {
    icon: <FaUserShield className="text-indigo-500" />,
    title: 'Priority Profile',
    description: 'Get seen by more people first',
  },
];

const plans = [
  {
    duration: 1,
    price: 14.99,
    save: 0,
  },
  {
    duration: 6,
    price: 9.99,
    save: 33,
  },
  {
    duration: 12,
    price: 7.99,
    save: 47,
  },
];

const PremiumModal = ({ onClose, feature }: PremiumModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative min-h-screen flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl"
            >
              ✨
            </motion.div>
            <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
            <p className="text-gray-600">
              {feature ? 'Unlock this feature and many more!' : 'Get the most out of your matches'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  feature && feat.title.toLowerCase().includes(feature)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="text-xl mb-2">{feat.icon}</div>
                <h3 className="font-semibold text-sm">{feat.title}</h3>
                <p className="text-xs text-gray-500">{feat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Plans */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Choose Your Plan</h3>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border ${
                    index === 1 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm font-semibold">
                    {plan.duration} {plan.duration === 1 ? 'Month' : 'Months'}
                  </div>
                  <div className="text-lg font-bold">${plan.price}/mo</div>
                  {plan.save > 0 && (
                    <div className="text-xs text-green-500">Save {plan.save}%</div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold"
            >
              Continue
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 text-gray-500 font-medium"
            >
              Maybe Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumModal; 