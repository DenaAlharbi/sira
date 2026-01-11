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
     isPaid: false,
     coverImage: '/assets/covers/basicfree.png',
     price: 'Free',
     description: 'A simple and clean portfolio template perfect for beginners.',
     category: 'Essential'
  },
  'ProjectFocus': { 
     component: ProjectFocus, 
     config: ProjectFocusConfig, 
     isPaid: true,
     coverImage: '/assets/covers/projectfocus.png',
     price: '50',
     description: 'A sleek, modern portfolio template designed to highlight your projects effectively.',
     category: 'Creative'
  },
  'Vanguard': { 
     component: Vanguard, 
     config: VanguardConfig, 
     isPaid: true,
     coverImage: '/assets/covers/vanguard.png',
     price: '50',
     description: 'A bold and dynamic portfolio template for creative professionals.', 
     category: 'Creative'
  },
  'PastelFolio': {
     component: PastelFolio,
     config: PastelFolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/fdf2f8/db2777?text=Pastel+Folio',
     price: '50',
     description: 'A soft and elegant portfolio template with pastel tones for a gentle aesthetic.',   
     category: 'Creative'
  },
  'ImmersivePortfolio': {
     component: ImmersivePortfolio,
     config: ImmersivePortfolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/111827/ffffff?text=Immersive',
     price: '50', 
     description: 'An engaging portfolio template with immersive visuals to captivate your audience.',
     category: 'Creative'
  },
  'AppleStyleFolio': {
     component: AppleStyleFolio,
     config: AppleStyleFolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/f5f5f7/000000?text=Apple+Light',
     price: '50',
     description: 'A sleek, minimalist portfolio template inspired by Apple\'s design philosophy.',
     category: 'Minimalist'
  },
  'AppleStyleFolioDark': {
     component: AppleStyleFolioDark,
     config: AppleStyleFolioDarkConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/000000/ffffff?text=Apple+Dark',
     price: '50',
     description: 'A dark mode version of the sleek, minimalist portfolio template inspired by Apple\'s design philosophy.',
     category: 'Minimalist'
  },
  'GoldNoir': {
     component: GoldNoir,
     config: GoldNoirConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/1a1a1a/D4AF37?text=Gold+Noir',
     price: '50',
     description: 'A luxurious dark-themed portfolio template with gold accents for a premium feel.',   
     category: 'Luxury'    
  },
  'VelvetGold': {
     component: VelvetGold,
     config: VelvetGoldConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/4A0E4E/FFD700?text=Velvet+Gold',
     price: '50',
     description: 'An elegant portfolio template featuring velvet textures and gold highlights.',
     category: 'Luxury'
  },
  'playfulCanvas': {
     component: PlayfulCanvas,
     config: PlayfulCanvasConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/FFDEE9/000000?text=Playful+Canvas',
     price: '50',
     description: 'A vibrant and creative portfolio template with playful design elements to showcase your work.',
     category: 'Creative'
  },
  'LavenderExecutive': {
     component: LavenderExecutive,
     config: LavenderExecutiveConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/E6E6FA/4B0082?text=Lavender+Executive',
     price: '50',
     description: 'A sophisticated portfolio template with lavender accents for a professional look.',
     category: 'Professional'
  }, 
  'DarkProductFolio': {
     component: DarkProductFolio,
     config: DarkProductFolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/121212/ffffff?text=Dark+Product',
     price: '50',
     description: 'A sleek dark-themed portfolio template designed to showcase products effectively.',  
     category: 'Technical'
  },
  'LuxGalleria': {
     component: LuxGalleria,
     config: LuxGalleriaConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/ffffff/000000?text=Lux+Galleria',
     price: '50',
     description: 'A luxurious portfolio template with a gallery-focused design to highlight visual work.',
     category: 'Luxury'
  },
  'SplitSidebarPortfolio': {
     component: SplitSidebarPortfolio,
     config: SplitSidebarPortfolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/f3f4f6/1f2937?text=Split+Sidebar',
     price: '50',
     description: 'A modern portfolio template featuring a split sidebar layout for easy navigation.',
     category: 'Professional'
  }, 
  'DarkDevCoral': {
     component: DarkDevCoral,
     config: DarkDevCoralConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/161821/FF6B6B?text=Dark+Dev+Coral',
     price: '50',
     description: 'A dark-themed portfolio template with coral accents, perfect for developers looking to showcase their work stylishly.',   
     category: 'Technical'
  },
  'MidnightTeal': {
     component: MidnightTeal,
     config: MidnightTealConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/0F172A/2DD4BF?text=Midnight+Teal',
     price: '50',
     description: 'A sleek midnight-themed portfolio template with teal highlights for technical professionals.',   
     category: 'Technical'
  },
  'TimelineFolio': {
     component: TimelineFolio,
     config: TimelineFolioConfig,
     isPaid: true,
     coverImage: 'https://via.placeholder.com/600x2500/1a1a1a/ffffff?text=Timeline+Folio',
     price: '50',
     description: 'A timeline-based portfolio template to showcase your career journey effectively.',
     category: 'Resume/CV'
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

// Helper 5: Get Template Metadata (CRITICAL FOR GALLERY)
export const getTemplateMetadata = (id) => {
    const entry = REGISTRY_DATA[id];
    if (!entry) return null;
    return {
        id: id,
        title: id.replace(/([A-Z])/g, ' $1').trim(), // Auto-format "DarkDev" -> "Dark Dev"
        isPaid: entry.isPaid,
        coverImage: entry.coverImage,
        price: entry.price,
        category: entry.category,
        description: entry.description
    };
};

// Helper 6: Get All Template Metadata List (CRITICAL FOR GALLERY)
export const getAllTemplatesList = () => {
    return Object.keys(REGISTRY_DATA).map(id => getTemplateMetadata(id));
};