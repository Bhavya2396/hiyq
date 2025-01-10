import { useState } from 'react';
import { FaFilter, FaGraduationCap } from 'react-icons/fa';

interface FilterOptionsProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  university: string;
  major: string;
  yearOfStudy: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    university: '',
    major: '',
    yearOfStudy: '',
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text)]">Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaFilter className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University
            </label>
            <div className="relative">
              <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filters.university}
                onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                placeholder="Enter university name"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Major
            </label>
            <input
              type="text"
              value={filters.major}
              onChange={(e) => setFilters({ ...filters, major: e.target.value })}
              placeholder="Enter your major"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year of Study
            </label>
            <select
              value={filters.yearOfStudy}
              onChange={(e) => setFilters({ ...filters, yearOfStudy: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5+">5+ Year</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions; 