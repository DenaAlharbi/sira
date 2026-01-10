export const config = [
  { id: 'sec1', label: 'Basic Info', type: 'section' },
  { 
    id: 'fullName', 
    label: 'Full Name', 
    key: 'fullName', 
    type: 'text', 
    placeholder: 'Your Name', 
    required: true 
  },
  { 
    id: 'title', 
    label: 'Professional Title', 
    key: 'title', 
    type: 'text', 
    placeholder: 'e.g. Creative Developer' 
  },
  
  { id: 'sec2', label: 'About Me', type: 'section' },
  { 
    id: 'bio', 
    label: 'Professional Bio', 
    key: 'bio', 
    type: 'textarea', 
    required: true, 
    minLength: 30 ,
    maxLength: 600,
    placeholder: 'I am a passionate developer...'
  },

  { id: 'sec3', label: 'Projects', type: 'section' },
  { 
    id: 'projects', 
    label: 'Selected Projects', 
    key: 'projects', 
    type: 'repeater',
    min: 1, 
    max: 2,
    fields: [
      { key: 'title', label: 'Project Name', type: 'text', required: true },
      { key: 'description', label: 'Short Description', type: 'textarea' },
      { key: 'link', label: 'Project URL', type: 'text' }
    ] 
  },

  { id: 'sec4', label: 'Contact Details', type: 'section' },
  { 
    id: 'contact', 
    label: 'Contact Methods', 
    key: 'contact', 
    type: 'repeater',
    min: 1, 
    max: 1,
    limitReason: 'The free template allows only one contact method.', // <--- EDIT THIS TEXT
    fields: [
      { 
        key: 'platform', 
        label: 'Platform', 
        type: 'select', 
        options: ['Email', 'LinkedIn', 'Phone', 'GitHub', 'Twitter / X', 'Website', 'Instagram', 'Behance'],
        required: true
      },
      { key: 'value', label: 'Link / Number', type: 'text', required: true }
    ] 
  }
];