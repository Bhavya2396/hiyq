import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaVenusMars } from 'react-icons/fa';

interface FilterOptionsProps {
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

interface FilterState {
  ageRange: [number, number];
  distance: number;
  college: string;
  showVerifiedOnly: boolean;
  gender: string;
}

const FilterOptions = ({ onApply, onClose }: FilterOptionsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    ageRange: [18, 25],
    distance: 10,
    college: '',
    showVerifiedOnly: false,
    gender: 'all',
  });

  const handleAgeChange = (value: number, index: number) => {
    const newRange = [...filters.ageRange] as [number, number];
    newRange[index] = value;
    setFilters({ ...filters, ageRange: newRange });
  };

  return (
    <div className="space-y-6">
      {/* Age Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Age Range</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="range"
              min={18}
              max={30}
              value={filters.ageRange[0]}
              onChange={(e) => handleAgeChange(Number(e.target.value), 0)}
              className="w-full accent-primary-500"
            />
            <span className="text-sm text-gray-500">{filters.ageRange[0]}</span>
          </div>
          <span className="text-gray-400">to</span>
          <div className="flex-1">
            <input
              type="range"
              min={18}
              max={30}
              value={filters.ageRange[1]}
              onChange={(e) => handleAgeChange(Number(e.target.value), 1)}
              className="w-full accent-primary-500"
            />
            <span className="text-sm text-gray-500">{filters.ageRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Maximum Distance</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="range"
              min={1}
              max={100}
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: Number(e.target.value) })}
              className="w-full accent-primary-500"
            />
          </div>
          <span className="text-sm text-gray-500 w-16">{filters.distance} km</span>
        </div>
      </div>

      {/* College */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">College</h4>
        <div className="relative">
          <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.college}
            onChange={(e) => setFilters({ ...filters, college: e.target.value })}
            placeholder="Enter college name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Show Me</h4>
        <div className="flex space-x-2">
          {['all', 'women', 'men'].map((gender) => (
            <button
              key={gender}
              onClick={() => setFilters({ ...filters, gender })}
              className={`flex-1 py-2 rounded-lg text-sm capitalize ${
                filters.gender === gender
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Verified Profiles Only</h4>
          <p className="text-xs text-gray-500">Show only verified college students</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.showVerifiedOnly}
            onChange={(e) => setFilters({ ...filters, showVerifiedOnly: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
        >
          Reset
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onApply(filters);
            onClose();
          }}
          className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium"
        >
          Apply Filters
        </motion.button>
      </div>
    </div>
  );
};

export default FilterOptions; 