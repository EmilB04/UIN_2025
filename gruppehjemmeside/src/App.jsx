import { Route, Routes, Navigate, useParams } from "react-router";
import HomePage from "./components/HomePage";
import MemberPage from "./components/MemberPage";
import groupMembers from "./scripts/GroupMembers";
import PageNotFound from "./components/PageNotFound";

// Wrapper component to validate slug and pass member data
function ValidSlugRoute({ groupMembers }) {
  const { slug } = useParams(); // Extract slug from URL params
  const member = groupMembers.find((m) => m.slug === slug); 

  if (!member) 
    return <Navigate to="/404" />;
  
  return <MemberPage member={member} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage groupMembers={groupMembers} />} />
      <Route
        path="members/:slug"
        element={<ValidSlugRoute groupMembers={groupMembers} />}
      />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
