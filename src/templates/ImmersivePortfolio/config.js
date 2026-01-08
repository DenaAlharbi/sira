export const config = [
  // --- SECTION 1: HEADER ---
  {
    id: 'intro',
    type: 'section',
    label: 'Header & Identity',
  },
  {
    id: 'headerImage',
    key: 'headerImage', 
    type: 'image',
    label: 'Header Background Image',
    helper: 'Upload a high-quality image for the header background.',
  },
  {
    id: 'fullName', 
    key: 'fullName', // <--- WAS 'userName', NOW 'fullName' (Matches other templates)
    type: 'text',
    label: 'Your Name',
    placeholder: 'e.g. Madison',
    required: true,
  },
  {
    id: 'title',
    key: 'title', // <--- WAS 'userProfession', NOW 'title'
    type: 'text',
    label: 'Your Profession',
    placeholder: 'e.g. DIGITAL PRODUCT DESIGNER',
    required: true,
  },

  // --- SECTION 2: PROJECTS ---
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Recent Projects',
  },
  {
    id: 'projects',
    key: 'projects', // (Already matches)
    type: 'repeater',
    label: 'Recent Projects',
    min: 1,
    fields: [
      {
        key: 'projectImage',
        type: 'image',
        label: 'Project Image',
      },
      {
        key: 'projectName', // NOTE: If other templates use 'name', change this to 'name' too!
        type: 'text',
        label: 'Project Name',
        required: true,
      },
      {
        key: 'projectDescription', // NOTE: Check if others use 'desc' or 'description'
        type: 'textarea',
        label: 'Project Description',
      },
      {
        key: 'projectLink', // NOTE: Check if others use 'link'
        type: 'text', 
        label: 'Project Link',
        placeholder: 'https://...',
      },
    ],
  },

  // --- SECTION 3: SKILLS ---
  {
    id: 'skillsSection',
    type: 'section',
    label: 'Skills',
  },
  {
    id: 'skills',
    key: 'skills',
    type: 'repeater',
    label: 'Skills',
    min: 1,
    fields: [
      {
        key: 'skillName', // Check if other templates use just 'name' or 'skill'
        type: 'text',
        label: 'Skill Name',
        required: true,
      },
    ],
  },

  // --- SECTION 4: CONTACTS ---
  {
    id: 'contactsSection',
    type: 'section',
    label: 'Contacts',
  },
  {
    id: 'contact',
    key: 'contact', // <--- WAS 'contacts' (plural), NOW 'contact' (singular) to match Vanguard/Basic
    type: 'repeater',
    label: 'Contacts',
    min: 1,
    fields: [
      {
        key: 'type', // <--- WAS 'contactType', NOW 'type' (Matches Vanguard)
        type: 'select',
        label: 'Contact Type',
        options: ['Email', 'Phone', 'LinkedIn', 'GitHub', 'Twitter', 'Dribbble'],
        required: true,
      },
      {
        key: 'value', // <--- WAS 'contactValue', NOW 'value' (Matches Vanguard)
        type: 'text',
        label: 'Contact Value/URL',
        required: true,
        placeholder: 'e.g. user@example.com',
      },
    ],
  },
];