// src/templates/BasicFree/config.js
import { baseIntro, baseProjects, baseContact } from '../baseconfig';

export const config = [
  ...baseIntro,
  
  // LIMIT: 2 Projects
  ...baseProjects(2), 

  // LIMIT: 1 Contact
  ...baseContact(1)
];