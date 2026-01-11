// src/templates/baseConfig.js

// --- 1. INTRO (Shared by ALL) ---
export const baseIntro = [
  {
    id: 'section-intro',
    type: 'section',
    label: 'Introduction',
  },
  {
    id: 'fullName',
    key: 'fullName', // MASTER KEY
    label: 'Full Name',
    type: 'text',
    placeholder: 'e.g. Alex Vonder',
    required: true,
  },
  {
    id: 'title',
    key: 'title', // MASTER KEY
    label: 'Professional Title',
    type: 'text',
    max: 50,
    placeholder: 'e.g. Creative Developer',
    required: true,
  },
  {
    id: 'bio',
    key: 'bio', // MASTER KEY
    label: 'Professional Bio',
    type: 'textarea',
    min: 30,
    max: 500,
    placeholder: 'Briefly describe your background...',
    required: true,
  },
];

// --- 2. PROJECTS (Shared with Variable Limit) ---
export const baseProjects = (limit = 50) => [
  {
    id: 'section-projects',
    type: 'section',
    label: 'Selected Works',
  },
  {
    id: 'projects',
    key: 'projects', // MASTER KEY
    label: `Add Projects`,
    type: 'repeater',
    required: true,
    min: 1,
    max: limit, // <--- Variable Limit
    inputs: [
      { key: 'title', label: 'Title', type: 'text',required: true },
      { key: 'link', label: 'Link', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
];

// --- 3. CONTACT (Shared with Variable Limit) ---
export const baseContact = (limit = 10) => [
  {
    id: 'section-contact',
    type: 'section',
    label: 'Contact Info',
  },
 {
    id: 'contact',
    key: 'contact',
    label: `Contact Links`,
    type: 'repeater',
    required: true,
    min: 1,
    max: limit,
    inputs: [
      { 
        key: 'platform', 
        label: 'Platform', 
        type: 'select', // <--- CHANGED TO SELECT
        options: [
          'Email', 
          'Phone', 
          'LinkedIn', 
          'GitHub', 
          'Twitter / X', 
          'Website', 
          'Instagram', 
          'Behance'
        ],
        placeholder: 'Select Platform',
        required: true
      },
      { 
        key: 'value', 
        label: 'Link / Email / Number', 
        type: 'text', 
        placeholder: 'e.g. hello@alex.dev',
        required: true
      },
    ],
  },
];