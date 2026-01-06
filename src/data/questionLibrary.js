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
  ],
  ProjectFocus:[
    {
      id: 'intro',
      type: 'section',
      label: 'The Basics',
    },
    {
      id: 'fullName',
      key: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Your Name',
      required: true,
    },
    {
      id: 'title',
      key: 'title',
      type: 'text',
      label: 'Main Title',
      placeholder: 'e.g. UI/UX Designer',
    },
    {
      id: 'bio',
      key: 'bio',
      type: 'textarea',
      label: 'About Me',
      placeholder: 'Tell us a bit about yourself...',
      minLength: 50,
    },
    {
      id: 'projectsSection',
      type: 'section',
      label: 'Portfolio',
    },
    {
      id: 'projects',
      key: 'projects',
      type: 'repeater',
      label: 'Projects',
      min: 1,
      // REMOVED: max: 6
      // REMOVED: limitReason
      fields: [
        { key: 'name', label: 'Project Name', placeholder: 'e.g. AI Chatbot', required: true },
        { key: 'desc', label: 'Short Description', placeholder: 'What did you build?', type: 'textarea' },
        { key: 'link', label: 'Link (URL)', placeholder: 'https://...', type: 'text' }
      ]
    },
    {
      id: 'contactSection',
      type: 'section',
      label: 'Contact',
    },
    {
      id: 'contact',
      key: 'contact',
      type: 'repeater',
      label: 'Contact Links',
      min: 1,
      fields: [
        { 
          key: 'type', 
          label: 'Platform', 
          type: 'select', 
          options: ['Email', 'LinkedIn', 'Twitter', 'Behance', 'GitHub', 'Website'],
          required: true 
        },
        { key: 'value', label: 'Username / Link', placeholder: 'e.g. user@example.com', required: true }
      ]
    }
  ],
  Vanguard: [
    {
      id: 'intro',
      type: 'section',
      label: 'System Identity', // Techy naming
    },
    {
      id: 'fullName',
      key: 'fullName',
      type: 'text',
      label: 'Operator Name',
      placeholder: 'e.g. Sarah Connor',
      required: true,
    },
    {
      id: 'title',
      key: 'title',
      type: 'text',
      label: 'Role / Specialization',
      placeholder: 'e.g. Full Stack Architect',
    },
    {
      id: 'bio',
      key: 'bio',
      type: 'textarea',
      label: 'System Logs (Bio)',
      placeholder: 'Initialize bio sequence...',
      minLength: 20,
    },
    {
      id: 'projectsSection',
      type: 'section',
      label: 'Deployments',
    },
    {
      id: 'projects',
      key: 'projects',
      type: 'repeater',
      label: 'Project Nodes',
      min: 1, // Minimum 1 required
      fields: [
        { key: 'name', label: 'Project Name', placeholder: 'e.g. Nexus API', required: true },
        { key: 'image', label: 'Cover Image URL', placeholder: 'https://...', type: 'text' }, // NEW IMAGE FIELD
        { key: 'desc', label: 'Tech Stack / Desc', placeholder: 'React, Node, AI...', type: 'textarea' },
        { key: 'link', label: 'Live Link', placeholder: 'https://...', type: 'text' }
      ]
    },
    {
      id: 'contactSection',
      type: 'section',
      label: 'Uplink',
    },
    {
      id: 'contact',
      key: 'contact',
      type: 'repeater',
      label: 'Communication Channels',
      min: 1, // Minimum 1 required
      max: 4,
      fields: [
        { 
          key: 'type', 
          label: 'Protocol', 
          type: 'select', 
          options: ['Email', 'GitHub', 'LinkedIn', 'Twitter', 'Discord'],
          required: true 
        },
        { key: 'value', label: 'Address', placeholder: 'user@network.com', required: true }
      ]
    }
  ]

};