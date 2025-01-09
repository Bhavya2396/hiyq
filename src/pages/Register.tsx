import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaCheck } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    gender: '',
    collegeEmail: '',
    phoneNumber: '',
    collegeId: null as File | null,
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        collegeId: e.target.files![0]
      }));
    }
  };

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerified(true);
    setIsVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please verify your college email first');
      return;
    }
    // Store email for university confirmation page
    localStorage.setItem('userEmail', formData.collegeEmail);
    // Navigate to university confirmation
    navigate('/university-confirm');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join the coolest college dating app</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">College Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={formData.collegeEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, collegeEmail: e.target.value }))}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                disabled={isVerified}
              />
              <motion.button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isVerified || isVerifying || !formData.collegeEmail}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {isVerified ? (
                  <>
                    <FaCheck /> Verified
                  </>
                ) : isVerifying ? (
                  'Verifying...'
                ) : (
                  'Verify'
                )}
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">College ID</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="college-id"
                accept="image/*"
                required
              />
              <label
                htmlFor="college-id"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="text-blue-600" />
                <span className="text-gray-600">
                  {formData.collegeId ? formData.collegeId.name : 'Upload College ID'}
                </span>
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isVerified}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg mt-8 disabled:opacity-50"
          >
            Create Account
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/login')}
              className="text-blue-600 font-medium"
            >
              Sign in
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 