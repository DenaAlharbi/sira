// src/templates/AppleStyleFolio/config.js

export const config = [
  // --- SECTION 1: Header & Profile ---
  {
    id: 'introSection',
    type: 'section',
    label: 'Header & Profile',
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
  id: 'bio', 
  label: 'Professional Bio', 
  key: 'bio',  // <--- Standardize this key everywhere
  type: 'textarea', 
  placeholder: 'I am a passionate developer...', 
  required: true, 
  minLength: 30,
  maxLength: 600 
},
 {
    id: 'profileImage',
    key: 'profileImage',
    type: 'image-select', // <--- NEW TYPE
    label: 'Profile Image',
    helper: 'Choose a preset avatar or upload your own.',
    options: [
  '/assets/avatars/character_01.png',
  '/assets/avatars/character_02.png',
  '/assets/avatars/character_03.png',
  '/assets/avatars/character_04.png',
  '/assets/avatars/character_05.png',
  '/assets/avatars/character_06.png'
]
  },

  // --- SECTION 2: Projects ---
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Projects',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'My Projects',
    min: 1,
    fields: [
      {
        key: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
      },
      {
        key: 'projectDescription',
        label: 'Short Description',
        type: 'text',
        placeholder: 'e.g., Visual design, Branding',
      },
      {
        key: 'projectImage',
        label: 'Project Icon/Logo',
        type: 'image',
        helper: 'A small, circular image for the project.',
      },
      {
        key: 'projectLink',
        label: 'Project Link',
        type: 'text',
        placeholder: 'https://...',
      },
    ],
  },

  // --- SECTION 3: Contact ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact',
  },
  {
    id: 'contact',
    key: 'contact',
    type: 'repeater',
    label: 'Social Media Links',
    min: 1,
    fields: [
      {
        key: 'type',
        label: 'Platform',
        type: 'select',
        options: ['LinkedIn', 'Twitter', 'GitHub', 'Dribbble', 'Instagram', 'Website', 'Email'],
      },
      {
        key: 'value',
        label: 'URL',
        type: 'text',
        placeholder: 'https://...',
      },
    ],
  },
];