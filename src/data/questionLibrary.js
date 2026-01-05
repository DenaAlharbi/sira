export const questionLibrary = {
  'BasicFree': [
    { id: 'sec1', label: 'Basic Info', type: 'section' },
    // 1. FULL NAME IS NOW REQUIRED
    { 
      id: 'fullName', 
      label: 'Full Name', 
      key: 'fullName', 
      type: 'text', 
      placeholder: 'Your Name', 
      required: true 
    },
    // 2. TITLE IS OPTIONAL (Default)
    { 
      id: 'title', 
      label: 'Professional Title', 
      key: 'title', 
      type: 'text', 
      placeholder: 'e.g. Accountant' 
    },
    
    { id: 'sec2', label: 'About Me', type: 'section' },
    { id: 'bio', label: 'Professional Summary', sub: 'A brief introduction about yourself.', key: 'bio', type: 'textarea', required: true, minLength: 30 },

    { id: 'sec3', label: 'Experience', type: 'section' },
    { 
      id: 'experience', 
      label: 'Work History', 
      key: 'experience', 
      type: 'repeater',
      min: 1, 
      max: 1, // <--- RESTRICTION: Only 1 item allowed
      limitReason: 'Free plan includes 1 experience entry. Upgrade for unlimited history.',
      fields: [
        // 3. COMPANY & ROLE ARE REQUIRED
        { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Company X', required: true },
        { key: 'role', label: 'Your Role', type: 'text', placeholder: 'Manager', required: true },
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
      min: 1, 
      max: 1, // <--- RESTRICTION: Only 1 item allowed
      limitReason: 'Free plan includes 1 contact method. Upgrade to add more.',
      fields: [
        { 
          key: 'platform', 
          label: 'Platform', 
          type: 'select', 
          options: ['Email', 'LinkedIn', 'Phone', 'GitHub', 'Twitter / X', 'Website', 'Instagram', 'Behance'],
          placeholder: 'Select Platform',
          required: true
        },
        { key: 'value', label: 'Link / Number', type: 'text', placeholder: 'user@example.com or URL', required: true }
      ] 
    }
  ]
};