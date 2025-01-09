import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Logo placeholder - to be replaced with actual logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-32 h-32 mx-auto mb-8 flex items-center justify-center"
        >
          <span className="text-5xl font-bold text-blue-600">HiyQ</span>
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          The world's coolest college dating app
        </h1>

        <p className="text-gray-600 mb-12">
          Connect with verified students from your university
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
          className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg mb-6"
        >
          Get Started Now
        </motion.button>

        <p className="text-gray-500">
          Already have an account?{' '}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/login')}
            className="text-blue-600 font-medium"
          >
            Sign in
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
};

export default Landing; 