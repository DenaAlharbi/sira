export const config = [
  // --- SECTION 1: THE INTRO (Hero) ---
  {
    id: 'heroSection',
    type: 'section',
    label: 'The Introduction',
  },
  {
    id: 'heroImage',
    key: 'heroImage',
    type: 'image',
    label: 'Main Hero Shot',
    helper: 'The most striking, high-resolution image that defines your style. Vertical orientation works best.',
  },
  {
    id: 'photographerName',
    key: 'photographerName',
    type: 'text',
    label: 'Photographer Name / Brand',
    placeholder: 'E L A R A   V O S S',
    required: true,
  },
  {
    id: 'tagline',
    key: 'tagline',
    type: 'text',
    label: 'Artist Tagline',
    placeholder: 'Capturing timeless elegance in natural light.',
  },

  // --- SECTION 2: THE ARTIST (Bio) ---
  {
    id: 'bioSection',
    type: 'section',
    label: 'The Artist',
  },
  {
    id: 'bioImage',
    key: 'bioImage',
    type: 'image',
    label: 'Artist Portrait',
    helper: 'A sophisticated portrait of yourself.',
  },
  {
    id: 'bioTitle',
    key: 'bioTitle',
    type: 'text',
    label: 'Bio Headline',
    placeholder: 'Behind the Lens',
  },
  {
    id: 'bioText',
    key: 'bioText',
    type: 'textarea',
    label: 'Biography',
    placeholder: 'Write about your philosophy, experience, and approach to luxury photography...',
    helper: 'Keep it elegant and evocative. 2-3 paragraphs.',
  },

  // --- SECTION 3: THE GALLERY (Portfolio) ---
  {
    id: 'gallerySection',
    type: 'section',
    label: 'The Showcase',
  },
  {
    id: 'gallery',
    key: 'gallery',
    type: 'repeater',
    label: 'Portfolio Images',
    min: 4,
    helper: 'Add your best work. Mix portrait and landscape orientations for an editorial feel.',
    fields: [
      {
        key: 'image',
        label: 'Photograph',
        type: 'image',
      },
      {
        key: 'caption',
        label: 'Category / Caption',
        type: 'text',
        placeholder: 'e.g., The Italian Wedding',
      }
    ]
  },

  // --- SECTION 4: SERVICES & INVESTMENT ---
  {
    id: 'servicesSection',
    type: 'section',
    label: 'Investment & Services',
  },
  {
    id: 'servicesIntro',
    key: 'servicesIntro',
    type: 'textarea',
    label: 'Services Intro Text',
    placeholder: 'I offer bespoke photography collections tailored to discerning clients seeking timeless imagery.',
  },
  {
    id: 'services',
    key: 'services',
    type: 'repeater',
    label: 'Service Collections',
    min: 1,
    max: 3,
    fields: [
      {
        key: 'title',
        label: 'Collection Title',
        type: 'text',
        placeholder: 'e.g., The Heirloom Collection',
      },
      {
        key: 'description',
        label: 'What is included?',
        type: 'textarea',
        placeholder: 'Full day coverage, fine art album, online gallery...',
      },
      {
        key: 'price',
        label: 'Starting Price',
        type: 'text',
        placeholder: 'Investment begins at $5,000',
      }
    ]
  },

  // --- SECTION 5: THE PROCESS ---
  {
    id: 'processSection',
    type: 'section',
    label: 'The Experience (Process)',
  },
  {
    id: 'processSteps',
    key: 'processSteps',
    type: 'repeater',
    label: 'Process Steps',
    min: 3,
    max: 4,
    fields: [
      {
        key: 'title',
        label: 'Step Title',
        type: 'text',
        placeholder: 'e.g., The Consultation',
      },
      {
        key: 'description',
        label: 'Step Description',
        type: 'textarea',
      }
    ]
  },

  // --- SECTION 6: CONTACT ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact Info',
  },
  {
    id: 'email',
    key: 'email',
    type: 'text',
    label: 'Email Address',
    placeholder: 'info@elaravoss.com',
  },
  {
    id: 'socials',
    key: 'socials',
    type: 'repeater',
    label: 'Social Links',
    fields: [
      {
        key: 'label',
        label: 'Platform',
        type: 'text',
        placeholder: 'Instagram',
      },
      {
        key: 'url',
        label: 'Link',
        type: 'text',
      }
    ]
  }
];