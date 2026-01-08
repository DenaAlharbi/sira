export const config = [
  // --- SECTION 1: HEADER & IDENTITY ---
  {
    id: 'intro',
    type: 'section',
    label: 'Header & Identity',
  },
  {
    id: 'headerImage',
    key: 'headerImage',
    type: 'image',
    label: 'Header Background',
    helper: 'A dark, moody, or professional background image works best.',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g. MICHAEL SOUDRIN',
    required: true,
  },
  {
    id: 'title',
    key: 'title',
    type: 'text',
    label: 'Professional Title',
    placeholder: 'e.g. SENIOR ARCHITECT',
  },
  {
    id: 'aboutMe',
    key: 'aboutMe',
    type: 'textarea',
    label: 'About Me',
    placeholder: 'Brief professional bio...',
  },
  
  // --- SECTION 2: CONTACTS ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact Info',
  },
  {
    id: 'contact',
    key: 'contact',
    type: 'repeater',
    label: 'Social Links',
    min: 1,
    fields: [
      {
        key: 'type',
        label: 'Platform',
        type: 'select',
        options: ['LinkedIn', 'Twitter', 'GitHub', 'Behance', 'Email', 'Website'],
      },
      {
        key: 'value',
        label: 'Link / Email',
        type: 'text',
      }
    ]
  },

  // --- SECTION 3: SKILLS (The Belt Area) ---
  {
    id: 'skillsSection',
    type: 'section',
    label: 'Skills',
  },
  {
    id: 'skills',
    key: 'skills',
    type: 'repeater',
    label: 'Skills List',
    min: 1,
    fields: [
      {
        key: 'skillName',
        label: 'Skill',
        type: 'text',
      }
    ]
  },

  // --- SECTION 4: PROJECTS ---
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
        label: 'Project Title',
        type: 'text',
      },
      {
        key: 'projectImage',
        label: 'Thumbnail',
        type: 'image',
      },
      {
        key: 'projectLink',
        label: 'Live Link',
        type: 'text',
      }
    ]
  }
];