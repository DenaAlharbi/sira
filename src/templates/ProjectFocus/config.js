export const config = [
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
  ];
  