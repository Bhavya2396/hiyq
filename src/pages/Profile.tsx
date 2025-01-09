import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaEdit, FaCheck } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-800">Profile</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600"
        >
          Save
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24">
        {/* Profile Photo */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <FaCamera className="text-2xl text-gray-400" />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
          >
            <FaEdit className="text-sm" />
          </motion.button>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">About Me</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell others about yourself..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[120px]"
            maxLength={500}
          />
          <p className="text-right text-sm text-gray-500 mt-1">
            {bio.length}/500
          </p>
        </div>

        {/* College Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">College Info</h3>
          <p className="text-gray-600">Stanford University</p>
          <p className="text-gray-600">Class of 2025</p>
        </div>

        {/* Verification Badge */}
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Verified Student</h3>
              <p className="text-gray-600">Your profile is verified</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FaCheck className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile; 