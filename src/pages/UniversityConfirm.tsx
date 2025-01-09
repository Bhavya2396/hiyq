import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UniversityConfirm = () => {
  const navigate = useNavigate();
  const [university, setUniversity] = useState('');

  useEffect(() => {
    // Get the email from localStorage
    const email = localStorage.getItem('userEmail');
    if (!email) {
      // If no email is found, redirect to login
      navigate('/login');
      return;
    }

    // Extract university from email domain (this is a simple example)
    const domain = email.split('@')[1];
    let universityName = '';
    
    // Map common university domains to names (expand this list as needed)
    if (domain?.includes('stanford.edu')) universityName = 'Stanford University';
    else if (domain?.includes('berkeley.edu')) universityName = 'UC Berkeley';
    else if (domain?.includes('mit.edu')) universityName = 'MIT';
    else if (domain?.includes('harvard.edu')) universityName = 'Harvard University';
    else universityName = 'Your University'; // Default fallback

    setUniversity(universityName);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {/* University Logo */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-blue-600">
            {university.split(' ').map(word => word[0]).join('')}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Welcome to {university}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          You're about to join your university's exclusive dating community.
          Connect with people who share your campus experience!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard')}
          className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg mb-4"
        >
          Start Swiping
        </motion.button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500"
        >
          By continuing, you agree to our community guidelines
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UniversityConfirm; 