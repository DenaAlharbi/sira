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

import AppleStyleFolio from './AppleStyleFolio/Index';  
import { config as AppleStyleFolioConfig } from './AppleStyleFolio/config';

import AppleStyleFolioDark from './AppleStyleFolioDark/Index';  
import { config as AppleStyleFolioDarkConfig } from './AppleStyleFolioDark/config'; 

import GoldNoir from './GoldNoir/Index';  
import { config as GoldNoirConfig } from './GoldNoir/config';

import VelvetGold from './VelvetGold/Index';  
import { config as VelvetGoldConfig } from './VelvetGold/config';

import PlayfulCanvas from './PlayfulCanvas/Index';
import { config as PlayfulCanvasConfig } from './PlayfulCanvas/config';

import LavenderExecutive from './LavenderExecutive/Index';  
import { config as LavenderExecutiveConfig } from './LavenderExecutive/config';

import DarkProductFolio from './DarkProductFolio/Index';
import { config as DarkProductFolioConfig } from './DarkProductFolio/config';

import LuxGalleria from './LuxGalleria/Index';
import { config as LuxGalleriaConfig } from './LuxGalleria/config';

import SplitSidebarPortfolio from './SplitSidebarPortfolio/Index';
import { config as SplitSidebarPortfolioConfig } from './SplitSidebarPortfolio/config';

import DarkDevCoral from './DarkDevCoral/Index';
// FIX: Renamed alias to avoid duplicate identifier
import { config as DarkDevCoralConfig } from './DarkDevCoral/config'; 

import MidnightTeal from './MidnightTeal/Index';
import { config as MidnightTealConfig } from './MidnightTeal/config';

import TimelineFolio from './TimelineFolio/Index';          
import { config as TimelineFolioConfig } from './TimelineFolio/config';



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
  },
  'ImmersivePortfolio': {
     component: ImmersivePortfolio,
     config: ImmersivePortfolioConfig,
     isPaid: true
  },
  'AppleStyleFolio': {
     component: AppleStyleFolio,
     config: AppleStyleFolioConfig,
     isPaid: true
  },
  'AppleStyleFolioDark': {
     component: AppleStyleFolioDark,
     config: AppleStyleFolioDarkConfig,
     isPaid: true
  },
  'GoldNoir': {
     component: GoldNoir,
     config: GoldNoirConfig,
     isPaid: true
  },
  'VelvetGold': {
     component: VelvetGold,
     config: VelvetGoldConfig,
     isPaid: true
  },
  'playfulCanvas': {
     component: PlayfulCanvas,
     config: PlayfulCanvasConfig,
     isPaid: true
  },
  'LavenderExecutive': {
     component: LavenderExecutive,
     config: LavenderExecutiveConfig,
     isPaid: true
  }, 
  'DarkProductFolio': {
     component: DarkProductFolio,
     config: DarkProductFolioConfig,
     isPaid: true
  },
  'LuxGalleria': {
     component: LuxGalleria,
     config: LuxGalleriaConfig,
     isPaid: true
  },
  'SplitSidebarPortfolio': {
     component: SplitSidebarPortfolio,
     config: SplitSidebarPortfolioConfig,
     isPaid: true
  }, 
  'DarkDevCoral': {
     component: DarkDevCoral,
     config: DarkDevCoralConfig, // FIX: Use the correct config name
     isPaid: true
  },
  'MidnightTeal': {
     component: MidnightTeal,
     config: MidnightTealConfig,
     isPaid: true
  },
  'TimelineFolio': {
     component: TimelineFolio,
     config: TimelineFolioConfig,
     isPaid: true
  }
};

// --- HELPERS ---

// Helper 1: Get Component (For rendering)
export const getTemplateComponent = (id) => {
  const entry = REGISTRY_DATA[id] || REGISTRY_DATA['BasicFree'];
  return entry.component;
};

// Helper 2: Get Questions (For the Editor)
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