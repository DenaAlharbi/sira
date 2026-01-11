import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Import Pages
import EditorPage from './pages/EditorPage';
import PublicProfile from './pages/PublicProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: The Builder (Home) */}
        <Route path="/" element={<EditorPage />} />
        
        {/* Route 2: The Live Profile (e.g. /alex) */}
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-and-conditions" element={<TermsConditions />} />
      </Routes>
    </BrowserRouter>
  );
}