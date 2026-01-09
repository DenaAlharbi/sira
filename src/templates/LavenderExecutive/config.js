// src/templates/LavenderExecutive/config.js

export const config = [
  // --- SECTION 1: Identity & Summary ---
  {
    id: 'identity',
    type: 'section',
    label: 'Executive Identity',
  },
  {
    id: 'profileImage',
    key: 'profileImage',
    type: 'image',
    label: 'Professional Headshot',
    helper: 'A high-quality, professional photo. It will sit within the white card.',
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g., Alexandra Chen',
    required: true,
  },
  {
    id: 'roleTitle',
    key: 'roleTitle',
    type: 'text',
    label: 'Current Role / Professional Title',
    placeholder: 'e.g., Senior Director of Operations / Strategic Advisor',
  },
  {
    id: 'executiveSummary',
    key: 'executiveSummary',
    type: 'textarea',
    label: 'Executive Summary',
    placeholder: 'A concise, high-level overview of your career value, leadership philosophy, and what you bring to an organization. Not just a bio, but a value statement.',
    helper: 'Keep it powerful and concise (3-4 sentences maximum).',
  },

  // --- SECTION 2: Proven Impact ---
  {
    id: 'impactSection',
    type: 'section',
    label: 'Proven Impact & Achievements',
  },
  {
    id: 'achievements',
    key: 'achievements',
    type: 'repeater',
    label: 'Key Achievements',
    min: 1,
    max: 4, // Keep it curated and exclusive
    helper: 'Highlight your biggest wins. Focus on metrics and results, not just responsibilities.',
    fields: [
      {
        key: 'headline',
        label: 'Achievement Headline',
        type: 'text',
        placeholder: 'e.g., Led Market Expansion into APAC',
      },
      {
        key: 'metric',
        label: 'Key Metric / Result',
        type: 'text',
        placeholder: 'e.g., Generated $15M in new revenue within 18 months.',
      },
      {
        key: 'context',
        label: 'Brief Context',
        type: 'textarea',
        placeholder: 'Briefly explain the challenge and your strategic approach.',
      }
    ]
  },

  // --- SECTION 3: Strategic Expertise ---
  {
    id: 'expertiseSection',
    type: 'section',
    label: 'Strategic Expertise',
  },
  {
    id: 'expertiseAreas',
    key: 'expertiseAreas',
    type: 'repeater',
    label: 'Areas of Expertise',
    min: 1,
    max: 6,
    helper: 'Group your high-level skills into strategic buckets.',
    fields: [
      {
        key: 'areaTitle',
        label: 'Area Title',
        type: 'text',
        placeholder: 'e.g., Corporate Restructuring',
      },
      {
        key: 'skillsList',
        label: 'Specific Competencies',
        type: 'textarea',
        placeholder: 'Comma-separated list: e.g., M&A Integration, Talent Optimization, Process Streamlining',
      }
    ]
  },

  // --- SECTION 4: Endorsements (Social Proof) ---
  {
    id: 'endorsementsSection',
    type: 'section',
    label: 'Professional Endorsements',
  },
  {
    id: 'testimonials',
    key: 'testimonials',
    type: 'repeater',
    label: 'Testimonials',
    min: 0,
    max: 3,
    fields: [
      {
        key: 'quote',
        label: 'Quote',
        type: 'textarea',
        placeholder: '"Alexandra is a transformative leader who..."',
      },
      {
        key: 'author',
        label: 'Author Name',
        type: 'text',
      },
      {
        key: 'authorTitle',
        label: 'Author Title & Company',
        type: 'text',
        placeholder: 'e.g., CEO, Global Tech Innovations',
      }
    ]
  },

  // --- SECTION 5: Contact ---
  {
    id: 'contactSection',
    type: 'section',
    label: 'Connect',
  },
  {
    id: 'contactLinks',
    key: 'contactLinks',
    type: 'repeater',
    label: 'Professional Links',
    fields: [
      {
        key: 'label',
        label: 'Platform Label',
        type: 'text',
        placeholder: 'LinkedIn',
      },
      {
        key: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://linkedin.com/in/...',
      }
    ]
  }
];