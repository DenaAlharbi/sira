import { baseIntro, baseProjects, baseContact } from '../baseconfig';

// 1. Get standard projects
const standardProjects = baseProjects();

// 2. Modify to add the 'image' field specifically for Vanguard
const vanguardProjects = standardProjects.map(item => {
  if (item.key === 'projects') {
    return {
      ...item,
      inputs: [
        // Keep Title
        item.inputs[0], 
        
        // INSERT: The Smart Image Field
        { 
          key: 'image', 
          label: 'Project Visual', 
          type: 'image', // This will trigger our new component
          helper: 'Upload a file OR paste a direct image link (JPG/PNG). Recommended 16:9.' 
        },

        // Keep Description & Link
        ...item.inputs.slice(1) 
      ]
    };
  }
  return item;
});

export const config = [
  ...baseIntro,
  ...vanguardProjects,
  ...baseContact()
];