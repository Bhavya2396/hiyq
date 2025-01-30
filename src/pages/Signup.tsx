import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Step = 'basic' | 'personality' | 'photos' | 'interests';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [formData, setFormData] = useState({
    firstName: '',
    gender: '',
    photos: [] as string[],
    interests: [] as string[],
    astrologicalSign: '',
    showAstrologicalSign: false,
    phoneNumber: '',
    personalityAnswers: [] as number[],
  });

  const interests = ['Style', 'Anime', 'Cooking', 'Art', 'Music'];
  const personalityQuestions = [
    "I'm comfortable making new acquaintances",
    "I enjoy trying new things",
    "I prefer deep conversations",
    "I'm usually the life of the party",
  ];

  const handleComplete = () => {
    // Save user data (you can enhance this later)
    localStorage.setItem('userData', JSON.stringify(formData));
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentStep === 'personality') {
      setCurrentStep('basic');
    } else if (currentStep === 'interests') {
      setCurrentStep('personality');
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="First name"
          className="w-full px-4 py-4 bg-[#8B6FFF] text-white placeholder-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E2FF54]"
        />
      </div>

      <div className="relative">
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full px-4 py-4 bg-[#8B6FFF] text-white rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#E2FF54]"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => {}}
            className="aspect-square bg-[#8B6FFF] rounded-2xl flex items-center justify-center"
          >
            <FaEdit className="text-2xl text-white/70" />
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <select
            value={formData.astrologicalSign}
            onChange={(e) => setFormData({ ...formData, astrologicalSign: e.target.value })}
            className="w-full px-4 py-4 bg-[#8B6FFF] text-white rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#E2FF54]"
          >
            <option value="">Astrological sign</option>
            <option value="aries">Aries</option>
            <option value="taurus">Taurus</option>
            {/* Add other signs */}
          </select>
        </div>

        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={formData.showAstrologicalSign}
            onChange={(e) => setFormData({ ...formData, showAstrologicalSign: e.target.checked })}
            className="form-checkbox text-[#E2FF54]"
          />
          <span>Show my astrological sign</span>
        </label>
      </div>

      <div className="relative">
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="Phone number"
          className="w-full px-4 py-4 bg-[#8B6FFF] text-white placeholder-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E2FF54]"
        />
      </div>
    </div>
  );

  const renderPersonality = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Personality type</h2>
        <p className="text-white/70">Question {formData.personalityAnswers.length + 1}/4</p>
        <div className="w-full bg-[#8B6FFF] h-2 rounded-full mt-4">
          <div 
            className="bg-[#E2FF54] h-full rounded-full transition-all"
            style={{ width: `${(formData.personalityAnswers.length) * 25}%` }}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl text-white font-medium mb-8">
          {personalityQuestions[formData.personalityAnswers.length]}
        </h3>

        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => {
                const newAnswers = [...formData.personalityAnswers, value];
                setFormData({ ...formData, personalityAnswers: newAnswers });
                if (newAnswers.length === 4) {
                  setCurrentStep('interests');
                }
              }}
              className="w-12 h-12 rounded-full bg-[#8B6FFF] text-white flex items-center justify-center hover:bg-[#E2FF54] hover:text-[#6B4EFF] transition-colors"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-white/70 text-sm mt-2">
          <span>Disagree</span>
          <span>Not sure</span>
          <span>Agree</span>
        </div>
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <motion.button
            key={interest}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const newInterests = formData.interests.includes(interest)
                ? formData.interests.filter((i) => i !== interest)
                : [...formData.interests, interest];
              setFormData({ ...formData, interests: newInterests });
            }}
            className={`px-4 py-2 rounded-full font-medium ${
              formData.interests.includes(interest)
                ? 'bg-[#E2FF54] text-[#6B4EFF]'
                : 'bg-[#8B6FFF] text-white'
            }`}
          >
            {interest}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#6B4EFF] px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        {currentStep !== 'basic' && (
          <button
            onClick={handleBack}
            className="text-white"
          >
            <FaArrowLeft className="text-xl" />
          </button>
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-white">
            {currentStep === 'basic' ? 'Create Profile' : 
             currentStep === 'personality' ? 'Personality Quiz' : 
             'Select Interests'}
          </h1>
        </div>
        {currentStep === 'personality' && (
          <button
            onClick={() => setCurrentStep('interests')}
            className="text-white text-sm"
          >
            Skip
          </button>
        )}
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          {currentStep === 'basic' && renderBasicInfo()}
          {currentStep === 'personality' && renderPersonality()}
          {currentStep === 'interests' && renderInterests()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {currentStep === 'basic' && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep('personality')}
          className="w-full py-4 bg-[#E2FF54] text-[#6B4EFF] font-bold rounded-full text-lg"
        >
          Start
        </motion.button>
      )}

      {currentStep === 'interests' && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          className="w-full py-4 bg-[#E2FF54] text-[#6B4EFF] font-bold rounded-full text-lg"
        >
          Complete Profile
        </motion.button>
      )}
    </div>
  );
};

export default Signup; 