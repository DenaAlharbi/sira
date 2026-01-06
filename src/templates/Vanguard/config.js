export const config = [
    {
      id: 'intro',
      type: 'section',
      label: 'System Identity', // Techy naming
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
      label: 'Role / Specialization',
      placeholder: 'e.g. Full Stack Architect',
    },
    {
      id: 'bio',
      key: 'bio',
      type: 'textarea',
      label: 'About Me',
      placeholder: 'Tell us a bit about yourself...',
      minLength: 30,
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
      label: 'Project Section',
      min: 1, // Minimum 1 required
      fields: [
        { key: 'name', label: 'Project Name', placeholder: 'e.g. Nexus API', required: true },
        { key: 'image', label: 'Cover Image URL', placeholder: 'Upload an image', type: 'image',helper: 'Recommended: 1600x900px JPG or PNG' }, // NEW IMAGE FIELD
        { key: 'desc', label: 'Tech Stack / Desc', placeholder: 'React, Node, AI...', type: 'textarea' },
        { key: 'link', label: 'Live Link', placeholder: 'https://...', type: 'text' }
      ]
    },
    {
      id: 'contactSection',
      type: 'section',
      label: 'Contact Section',
    },
    {
      id: 'contact',
      key: 'contact',
      type: 'repeater',
      label: 'Communication Channels',
      min: 1, // Minimum 1 required
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
  ];
