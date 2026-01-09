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
    placeholder: 'Amogoe',
    required: true,
    helper: 'This replaces the logo text in the top left.',
  },
  {
    id: 'role',
    key: 'role',
    type: 'text',
    label: 'Your Role',
    placeholder: 'a Front End Developer',
    helper: 'Completes the sentence "Hello, I\'m..."',
  },
  {
    id: 'about',
    key: 'about',
    type: 'textarea',
    label: 'About Me (Short)',
    placeholder: 'Fond of creating web application designs and bringing them to life...',
  },
  {
    id: 'resume',
    key: 'resume',
    type: 'text', // CHANGED: 'text' is safer than 'file' to prevent crashes
    label: 'Resume Link (URL)',
    placeholder: 'https://example.com/my-resume.pdf',
    helper: 'Paste a link to your PDF (Google Drive, Dropbox, or hosted file).',
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
        label: 'Icon Name (Lucide)',
        type: 'text',
        placeholder: 'Github',
      },
      {
        key: 'title',
        label: 'Skill Title',
        type: 'text',
        placeholder: 'Git Version Control',
      },
      {
        key: 'desc',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Brief description of your experience...',
      }
    ]
  },

  // --- CONTACT ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact Info',
  },
  {
    id: 'email',
    key: 'email',
    type: 'text',
    label: 'Your Email Address',
    placeholder: 'contact@example.com',
    helper: 'Where you want to receive messages.',
  }
];