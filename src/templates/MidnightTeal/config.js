export const config = [
  // --- IDENTITY ---
  {
    id: 'identitySection',
    type: 'section',
    label: 'Identity',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Your Name (Logo)',
    placeholder: 'AlexDev',
    required: true,
  },
  {
    id: 'role',
    key: 'role',
    type: 'text',
    label: 'Your Role',
    placeholder: 'Full Stack Engineer',
  },
  {
    id: 'about',
    key: 'about',
    type: 'textarea',
    label: 'About Me',
    placeholder: 'Building scalable applications with modern technologies...',
  },
  {
    id: 'resume',
    key: 'resume',
    type: 'text',
    label: 'Resume Link (URL)',
    placeholder: 'https://...',
  },

  // --- SKILLS ---
  {
    id: 'skillsSection',
    type: 'section',
    label: 'Skills',
  },
  {
    id: 'skills',
    key: 'skills',
    type: 'repeater',
    label: 'Skill Cards',
    fields: [
      {
        key: 'icon',
        label: 'Icon (Lucide)',
        type: 'text',
        placeholder: 'Code',
      },
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'React.js',
      },
      {
        key: 'desc',
        label: 'Description',
        type: 'textarea',
      }
    ]
  },

  // --- PROJECTS (NEW SECTION) ---
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Projects',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'Project Cards',
    fields: [
      {
        key: 'image',
        label: 'Thumbnail Image',
        type: 'image',
      },
      {
        key: 'title',
        label: 'Project Title',
        type: 'text',
        placeholder: 'E-Commerce Dashboard',
      },
      {
        key: 'desc',
        label: 'Short Description',
        type: 'textarea',
        placeholder: 'A react-based dashboard with real-time data.',
      },
      {
        key: 'link',
        label: 'Project URL',
        type: 'text',
        placeholder: 'https://github.com/...',
      }
    ]
  },

  // --- CONTACT ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact',
  },
  {
    id: 'email',
    key: 'email',
    type: 'text',
    label: 'Email Address',
    placeholder: 'hello@example.com',
  }
];