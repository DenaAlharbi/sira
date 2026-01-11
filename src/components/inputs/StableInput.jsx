import React, { useState, useEffect, useRef } from 'react';

export default function StableInput({ 
  value, 
  onChange, 
  type = "text", 
  placeholder, 
  ...props 
}) {
  // 1. Maintain local state for instant typing
  const [localValue, setLocalValue] = useState(value || '');
  
  // 2. Sync local state if parent value changes externally (e.g. navigation)
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val); // Update local UI immediately (fast)
    onChange(val);      // Send to parent (global state)
  };

  const commonClasses = "w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-colors";

  if (type === 'textarea') {
    return (
      <div className="flex flex-col w-full">
        <textarea
          rows={4}
          className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 resize-none transition-colors"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      className={commonClasses}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      {...props}
    />
  );
}