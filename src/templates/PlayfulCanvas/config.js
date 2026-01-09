export const config = [
  // --- HERO SECTION ---
  {
    id: 'hero',
    type: 'section',
    label: 'Hero & Intro',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Brand / Full Name',
    placeholder: 'Sinqlo',
    required: true,
    helper: 'This appears huge in the top left corner.',
  },
  {
    id: 'introText',
    key: 'introText',
    type: 'textarea',
    label: 'Intro Headline',
    helper: 'Wrap words in *asterisks* to highlight them! (e.g. "One *smart* link for every *client*")',
    placeholder: 'One *smart* link for every logo file, *variation* and *format* your client will ever need.',
  },
  {
    id: 'tagline',
    key: 'tagline',
    type: 'text',
    label: 'Tagline / Role',
    placeholder: 'Effortless Logo Delivery',
    helper: 'Appears smaller below your name.',
  },

  // --- PROJECTS ---
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Selected Work',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'Projects',
    min: 1,
    fields: [
      {
        key: 'projectName',
        label: 'Project Name',
        type: 'text',
      },
      {
        key: 'projectTag',
        label: 'Tag (e.g. Branding)',
        type: 'text',
      },
      {
        key: 'projectImage',
        label: 'Thumbnail',
        type: 'image',
      },
      {
        key: 'projectLink',
        label: 'Link',
        type: 'text',
      }
    ]
  },

  // --- CONTACT ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Links',
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
        label: 'Label',
        type: 'text',
        placeholder: 'Instagram',
      },
      {
        key: 'value',
        label: 'Link',
        type: 'text',
      }
    ]
  }
];