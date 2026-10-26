import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout.jsx'
import AboutPage from '../pages/public/AboutPage.jsx'
import CollaboratePage from '../pages/public/CollaboratePage.jsx'
import CreativeLabPage from '../pages/public/CreativeLabPage.jsx'
import GalleryPage from '../pages/public/GalleryPage.jsx'
import GiveAuditionPage from '../pages/public/GiveAuditionPage.jsx'
import HomePage from '../pages/public/HomePage.jsx'
import JoinCommunityPage from '../pages/public/JoinCommunityPage.jsx'
import JoinDholPathakPage from '../pages/public/JoinDholPathakPage.jsx'
import LegalPage from '../pages/public/LegalPage.jsx'
import SubmitIdeaPage from '../pages/public/SubmitIdeaPage.jsx'
import ChildSafetyPolicy from '../pages/public/ChildSafetyPolicy';
import CommunityGuidelines from '../pages/public/CommunityGuidelines';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collaborate" element={<CollaboratePage />} />
          <Route path="/submit-idea" element={<SubmitIdeaPage />} />
          <Route path="/join-community" element={<JoinCommunityPage />} />
          <Route path="/give-audition" element={<GiveAuditionPage />} />
          <Route path="/join-dhol-pathak" element={<JoinDholPathakPage />} />
          <Route path="/creative-lab" element={<CreativeLabPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/child-safety-policy"element={<ChildSafetyPolicy />}/>
          <Route path="/community-guidelines" element={<CommunityGuidelines />}/>
          
          <Route path="/terms-conditions" element={<LegalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
