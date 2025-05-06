import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
}
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
  placeholder = 'Select an option'
}) => {
  return <div className={`relative ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>}
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>;
};
export default Select;