export const config = [
  {
    id: 'intro',
    type: 'section',
    label: 'Header Title',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Main Portfolio Title',
    placeholder: 'UI/UX DESIGNER',
    required: true,
  },
  {
    id: 'skillsSection',
    type: 'section',
    label: 'Skills List',
  },
  {
      id: 'skills',
      key: 'skills',
      type: 'repeater',
      label: 'Add Skills (Hard & Soft)',
      fields: [
          { key: 'skillName', label: 'Skill', placeholder: 'e.g. Figma / Communicative' }
      ]
  },
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Projects Grid',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'Projects',
    min: 1,
    fields: [
      { key: 'image', label: 'Project Thumbnail', type: 'image', helper: 'Recommended: Landscape (16:9 aspect ratio)' },
      { key: 'link', label: 'Link to Case Study', placeholder: 'https://...', type: 'text' }
    ]
  },
  {
    id: 'contactSection',
    type: 'section',
    label: 'Footer Info',
  },
  {
    id: 'contact',
    key: 'contact',
    type: 'repeater',
    label: 'Contact & Socials',
    min: 1,
    fields: [
      { 
        key: 'type', 
        label: 'Platform', 
        type: 'select', 
        options: ['Email', 'Phone', 'LinkedIn', 'Behance', 'Dribbble', 'Website'],
        required: true 
      },
      { key: 'value', label: 'Value / Link', placeholder: 'e.g. user@example.com', required: true }
    ]
  }
];