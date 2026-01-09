export const config = [
  // --- SECTION 1: IDENTITY (Left Card) ---
  {
    id: 'identitySection',
    type: 'section',
    label: 'Identity Card',
  },
  {
    id: 'profileImage',
    key: 'profileImage',
    type: 'image',
    label: 'Profile Photo',
    helper: 'A photo with a transparent background works best, or a solid portrait.',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Mark Smith',
    required: true,
  },
  {
    id: 'cardBio',
    key: 'cardBio',
    type: 'textarea',
    label: 'Short Card Bio',
    placeholder: 'A Product Designer who has crafted countless user experiences.',
    helper: 'Appears on the small white card under your name.',
  },

  // --- SECTION 2: HEADER & STATS (Right Side) ---
  {
    id: 'mainSection',
    type: 'section',
    label: 'Main Header & Stats',
  },
  {
    id: 'roleTitle',
    key: 'roleTitle',
    type: 'text',
    label: 'Role Title (Headline)',
    placeholder: 'Product Designer',
    helper: 'The second word will be outlined/faded automatically.',
  },
  {
    id: 'mainBio',
    key: 'mainBio',
    type: 'textarea',
    label: 'Main Bio',
    placeholder: 'Passionate about creating intuitive and engaging user experiences...',
  },
  {
    id: 'stats',
    key: 'stats',
    type: 'repeater',
    label: 'Key Stats',
    min: 3,
    max: 3,
    fields: [
      {
        key: 'number',
        label: 'Number',
        type: 'text',
        placeholder: '+12',
      },
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        placeholder: 'Years of Experience',
      }
    ]
  },

  // --- SECTION 3: FEATURED SKILL CARDS ---
  {
    id: 'skillsSection',
    type: 'section',
    label: 'Skill Cards',
  },
  {
    id: 'skillCards',
    key: 'skillCards',
    type: 'repeater',
    label: 'Skill Cards',
    min: 1,
    max: 2, // Matches the design (Orange & Green cards)
    fields: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Dynamic Animation',
      },
      {
        key: 'desc',
        label: 'Description / Tools',
        type: 'text',
        placeholder: 'Motion Design, After Effects',
      }
    ]
  },

  // --- SECTION 4: EXPERIENCE ---
  {
    id: 'experienceSection',
    type: 'section',
    label: 'Experience Timeline',
  },
  {
    id: 'experience',
    key: 'experience',
    type: 'repeater',
    label: 'Roles',
    fields: [
      {
        key: 'company',
        label: 'Company Name',
        type: 'text',
        placeholder: 'PixelForge Studios',
      },
      {
        key: 'role',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Led the design team in creating user-centric mobile apps...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'text',
        placeholder: 'Jan 2020 - Present',
      }
    ]
  },

  // --- SECTION 5: SOCIALS ---
  {
    id: 'contact',
    key: 'contact',
    type: 'repeater',
    label: 'Social Icons (Card)',
    fields: [
      {
        key: 'type',
        label: 'Platform',
        type: 'select',
        options: ['Dribbble', 'Twitter', 'Instagram', 'Email', 'LinkedIn'],
      },
      {
        key: 'value',
        label: 'URL',
        type: 'text',
      }
    ]
  }
];