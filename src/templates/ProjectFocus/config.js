import { baseIntro, baseProjects, baseContact } from '../baseconfig.js';

export const config = [
  // 1. Standard Intro (Name, Title, Bio)
  // Uses the universal keys to ensure data persists from other templates
  ...baseIntro,

  // 2. Projects Section (Paid Limit)
  // We pass '50' so Project Focus users get way more slots than Basic users
  ...baseProjects(),

  // 3. Contact Section (Paid Limit)
  ...baseContact()
];