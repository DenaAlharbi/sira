// 1. Import Components AND Configs
import BasicFree from './BasicFree/Index';
import { config as BasicFreeConfig } from './BasicFree/config';

import ProjectFocus from './ProjectFocus/Index';
import { config as ProjectFocusConfig } from './ProjectFocus/config';

import Vanguard from './Vanguard/Index';
import { config as VanguardConfig } from './Vanguard/config';

import PastelFolio from './PastelFolio/Index';
import { config as PastelFolioConfig } from './PastelFolio/config';

import ImmersivePortfolio from './ImmersivePortfolio/Index';
import { config as ImmersivePortfolioConfig } from './ImmersivePortfolio/config';
// 2. MASTER REGISTRY
const REGISTRY_DATA = {
  'BasicFree': { 
     component: BasicFree, 
     config: BasicFreeConfig, 
     isPaid: false 
  },
  'ProjectFocus': { 
     component: ProjectFocus, 
     config: ProjectFocusConfig, 
     isPaid: true 
  },
  'Vanguard': { 
     component: Vanguard, 
     config: VanguardConfig, 
     isPaid: true 
  },
    'PastelFolio': {
        component: PastelFolio,
        config: PastelFolioConfig,
        isPaid: true
    }
    ,'ImmersivePortfolio': {
        component: ImmersivePortfolio,
        config: ImmersivePortfolioConfig,
        isPaid: true
    }
};

// --- HELPERS ---

// Helper 1: Get Component (For rendering)
export const getTemplateComponent = (id) => {
  const entry = REGISTRY_DATA[id] || REGISTRY_DATA['BasicFree'];
  return entry.component;
};

// Helper 2: Get Questions (For the Editor) <--- NEW
export const getTemplateQuestions = (id) => {
  const entry = REGISTRY_DATA[id] || REGISTRY_DATA['BasicFree'];
  return entry.config;
};

// Helper 3: Check Payment Status
export const isTemplatePaid = (id) => {
  const entry = REGISTRY_DATA[id];
  return entry ? entry.isPaid : false;
};

// Helper 4: List of Free Templates
export const FREE_TEMPLATES = Object.keys(REGISTRY_DATA).filter(
  (id) => !REGISTRY_DATA[id].isPaid
);