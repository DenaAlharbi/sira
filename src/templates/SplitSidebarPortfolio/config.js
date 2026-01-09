// src/templates/SplitSidebarPortfolio/config.js

export const config = [
  // --- SIDEBAR SETTINGS ---
  {
    id: 'sidebarSection',
    type: 'section',
    label: 'Sidebar Profile',
  },
  {
    id: 'profileImage',
    key: 'profileImage',
    type: 'image',
    label: 'Profile Image',
    helper: 'A square or circular image works best.',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g., Jackson Ford',
    required: true,
  },
  {
    id: 'socials',
    key: 'socials',
    type: 'repeater',
    label: 'Social Media Links',
    fields: [
      {
        key: 'platform',
        label: 'Platform',
        type: 'select',
        options: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'Dribbble', 'GitHub'],
      },
      {
        key: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://...',
      }
    ]
  },
  {
    id: 'copyrightText',
    key: 'copyrightText',
    type: 'text',
    label: 'Copyright Text',
    placeholder: '© 2023 All rights reserved.',
  },

  // --- MAIN CONTENT: HOME / HERO ---
  {
    id: 'homeSection',
    type: 'section',
    label: 'Home Section',
  },
  {
    id: 'heroTitle',
    key: 'heroTitle',
    type: 'text',
    label: 'Hero Title',
    placeholder: "I'm a Designer",
    required: true,
  },
  {
    id: 'heroBio',
    key: 'heroBio',
    type: 'textarea',
    label: 'Short Bio',
    placeholder: '100% responsive, fully customizable template for..',
  },
  {
    id: 'resumeLink',
    key: 'resumeLink',
    type: 'text',
    label: 'Resume Download Link',
    placeholder: '/path/to/resume.pdf',
  },

  // --- MAIN CONTENT: ABOUT ---
  {
    id: 'aboutSection',
    type: 'section',
    label: 'About Section',
  },
  {
    id: 'aboutText',
    key: 'aboutText',
    type: 'textarea',
    label: 'About Me Description',
    placeholder: 'Write a detailed description about yourself...',
  },
  {
    id: 'skillsList',
    key: 'skillsList',
    type: 'repeater',
    label: 'Skills List',
    fields: [
      {
        key: 'skillName',
        label: 'Skill Name',
        type: 'text',
        placeholder: 'e.g., Graphic Design',
      }
    ]
  },

  // --- MAIN CONTENT: SERVICES ---
  {
    id: 'servicesSection',
    type: 'section',
    label: 'Services Section',
  },
  {
    id: 'services',
    key: 'services',
    type: 'repeater',
    label: 'Services Offered',
    fields: [
      {
        key: 'icon',
        label: 'Icon Name (from Lucide)',
        type: 'text',
        placeholder: 'e.g., Palette, Code, Smartphone',
        helper: 'Use Lucide React icon names.',
      },
      {
        key: 'title',
        label: 'Service Title',
        type: 'text',
        placeholder: 'Web Design',
      },
      {
        key: 'description',
        label: 'Service Description',
        type: 'textarea',
        placeholder: 'A small description of the service...',
      }
    ]
  },

  // --- MAIN CONTENT: PORTFOLIO ---
  {
    id: 'portfolioSection',
    type: 'section',
    label: 'Portfolio Section',
  },
  {
    id: 'projects',
    key: 'projects',
    type: 'repeater',
    label: 'Portfolio Projects',
    fields: [
      {
        key: 'image',
        label: 'Project Image',
        type: 'image',
      },
      {
        key: 'title',
        label: 'Project Title',
        type: 'text',
        placeholder: 'Project Name',
      },
      {
        key: 'category',
        label: 'Category',
        type: 'text',
        placeholder: 'Design, Branding',
      },
      {
        key: 'link',
        label: 'Project Link',
        type: 'text',
        placeholder: 'https://...',
      }
    ]
  },

  // --- MAIN CONTENT: CONTACT ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Contact Section',
  },
  {
    id: 'contactInfo',
    key: 'contactInfo',
    type: 'repeater',
    label: 'Contact Details',
    fields: [
      {
        key: 'icon',
        label: 'Icon Name (from Lucide)',
        type: 'text',
        placeholder: 'e.g., MapPin, Phone, Mail',
      },
      {
        key: 'text',
        label: 'Detail Text',
        type: 'text',
        placeholder: 'e.g., 123 Street, City',
      }
    ]
  }
];