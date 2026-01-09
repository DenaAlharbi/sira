export const config = [
  // --- SECTION 1: IDENTITY ---
  {
    id: 'identitySection',
    type: 'section',
    label: 'Profile Info',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Abdulrahman',
    required: true,
  },
  {
    id: 'about',
    key: 'about',
    type: 'textarea',
    label: 'About Me',
    placeholder: 'I am a UI Developer passionate about creating...',
  },

  // --- SECTION 2: TIMELINE ---
  {
    id: 'timelineSection',
    type: 'section',
    label: 'Experience Timeline',
  },
  {
    id: 'sectionTitle',
    key: 'sectionTitle',
    type: 'text',
    label: 'Timeline Section Title',
    placeholder: 'Education And Experience',
  },
  {
    id: 'timelineItems',
    key: 'timelineItems',
    type: 'repeater',
    label: 'Timeline Entries',
    fields: [
      {
        key: 'date',
        label: 'Date Range',
        type: 'text',
        placeholder: 'e.g., 2006 - 2008',
      },
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Job Title or Degree',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        key: 'color',
        label: 'Box Color',
        type: 'select',
        options: ['yellow', 'gray', 'red', 'green', 'blue'],
      },
    ]
  },

  // --- SECTION 3: PROJECTS ---
  {
    id: 'projectsSection',
    type: 'section',
    label: 'Projects',
  },
  {
    id: 'projectTitle',
    key: 'projectTitle',
    type: 'text',
    label: 'Projects Section Title',
    placeholder: 'Selected Works',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'Project Cards',
    fields: [
      {
        key: 'title',
        label: 'Project Title',
        type: 'text',
        placeholder: 'Portfolio V1',
      },
      {
        key: 'desc',
        label: 'Description',
        type: 'textarea',
        placeholder: 'A brief description of the project...',
      },
      {
        key: 'link',
        label: 'Project Link',
        type: 'text',
        placeholder: 'https://...',
      },
      {
        key: 'color',
        label: 'Card Color',
        type: 'select',
        options: ['gray', 'blue', 'green'],
      }
    ]
  },

  // --- SECTION 4: CONTACT ---
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
  },
  {
    id: 'socials',
    key: 'socials',
    type: 'repeater',
    label: 'Social Icons',
    fields: [
      {
        key: 'platform',
        label: 'Icon Name (Lucide)',
        type: 'text',
        placeholder: 'Github',
      },
      {
        key: 'url',
        label: 'Profile URL',
        type: 'text',
        placeholder: 'https://...',
      }
    ]
  }
];