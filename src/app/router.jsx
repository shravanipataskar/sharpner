
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicLayout from '../components/layout/PublicLayout.jsx';

import AboutPage from '../pages/public/AboutPage.jsx';
import CollaboratePage from '../pages/public/CollaboratePage.jsx';
import CreativeLabPage from '../pages/public/CreativeLabPage.jsx';
import GalleryPage from '../pages/public/GalleryPage.jsx';
import GiveAuditionPage from '../pages/public/GiveAuditionPage.jsx';
import HomePage from '../pages/public/HomePage.jsx';
import JoinCommunityPage from '../pages/public/JoinCommunityPage.jsx';
import JoinDholPathakPage from '../pages/public/JoinDholPathakPage.jsx';
import LegalPage from '../pages/public/LegalPage.jsx';
import ChildAuditionForm from '../pages/public/ChildAuditionForm.jsx';
import ChildSafetyPolicy from '../pages/public/ChildSafetyPolicy.jsx';
import CommunityGuidelines from '../pages/public/CommunityGuidelines.jsx';
import CreativeIdeaSubmission from '../pages/public/CreativeIdeaSubmission.jsx';
import LoginPage from "../pages/public/LoginPage.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collaborate" element={<CollaboratePage />} />

          {/* Creative Idea Submission */}
          <Route
            path="/submit-idea"
            element={<CreativeIdeaSubmission />}
          />

          <Route path="/join-community" element={<JoinCommunityPage />} />
          <Route path="/give-audition" element={<ChildAuditionForm />} />
          <Route path="/join-dhol-pathak" element={<JoinDholPathakPage />} />
          <Route path="/creative-lab" element={<CreativeLabPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/legal" element={<LegalPage />} />

          {/* Policy pages */}
          <Route
            path="/child-safety-policy"
            element={<ChildSafetyPolicy />}
          />

          <Route
            path="/community-guidelines"
            element={<CommunityGuidelines />}
          />

          <Route path="/terms-conditions" element={<LegalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
