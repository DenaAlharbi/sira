// src/data/questionLibrary.js

export const questionLibrary = {
  'BasicFree': [
    { id: 'sec1', label: 'Basic Info', type: 'section' },
    { id: 'fullName', label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'Your Name' },
    { id: 'title', label: 'Professional Title', key: 'title', type: 'text', placeholder: 'e.g. Accountant' },
    
    { id: 'sec2', label: 'About Me', type: 'section' },
    { id: 'bio', label: 'Professional Summary', sub: 'A brief introduction about yourself (Required).', key: 'bio', type: 'textarea' },

    { id: 'sec3', label: 'Experience', type: 'section' },
    { 
      id: 'experience', 
      label: 'Work History', 
      key: 'experience', 
      type: 'repeater',
      min: 1, // <--- REQUIRED: User must add at least 1 item
      fields: [
        { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Company X' },
        { key: 'role', label: 'Your Role', type: 'text', placeholder: 'Manager' },
        { key: 'duration', label: 'Duration', type: 'text', placeholder: '2020 - Present' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Briefly describe your tasks...' }
      ] 
    },

    { id: 'sec4', label: 'Contact Details', type: 'section' },
    { 
      id: 'contact', 
      label: 'Contact Methods', 
      key: 'contact', 
      type: 'repeater',
      min: 1, // <--- REQUIRED: User must add at least 1 item
      fields: [
        { 
          key: 'platform', 
          label: 'Platform', 
          type: 'select', // <--- Changed to Dropdown
          options: ['Email', 'LinkedIn', 'Phone', 'GitHub', 'Twitter / X', 'Website', 'Instagram', 'Behance'],
          placeholder: 'Select Platform'
        },
        { key: 'value', label: 'Link / Number', type: 'text', placeholder: 'user@example.com or URL' }
      ] 
    }
  ]
};