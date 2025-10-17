import { memo } from 'react';
import type { SortOption } from '../types/video.types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdownComponent = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort videos by
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block w-full bg-white dark:bg-gray-700 border border-slate-200 dark:border-slate-600 rounded-md px-3 py-2 pr-8 text-sm text-slate-700 dark:text-slate-200 shadow-sm transition duration-300 ease focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 hover:border-slate-300 dark:hover:border-slate-500 cursor-pointer appearance-none"
        aria-label="Sort videos"
      >
        <option value="position">Position (Default)</option>
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-200">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export const SortDropdown = memo(SortDropdownComponent);
