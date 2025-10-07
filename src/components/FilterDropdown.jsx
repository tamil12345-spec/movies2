import React from 'react';

const FilterDropdown = ({ selectedType, onTypeChange }) => {
  const types = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episodes' }
  ];

  return (
    <div className="mb-6">
      <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Type
      </label>
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {types.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;