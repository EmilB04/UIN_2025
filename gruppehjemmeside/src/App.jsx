import { Route, Routes, Navigate, useParams } from "react-router";
import HomePage from "./components/HomePage";
import MemberPage from "./components/MemberPage";
import PageNotFound from "./components/PageNotFound";
import { useEffect, useState } from "react";
import { fetchAllGroupMembers } from "./sanity/memberServices";
import Layout from "./components/Layout";

// Wrapper component to validate slug and pass member data
function ValidSlugRoute({ groupMembers }) {
  const { slug } = useParams(); // Extract slug from URL params
  const member = groupMembers.find((m) => m.slug.current === slug); 

  if (!member) 
    return <Navigate to="/404" />;
  
  return <MemberPage member={member} />;
}

function App() {

  const [groupMembers, setGroupMembers] = useState([]);
  useEffect(() => {
    async function getGroupMembers() {
      const data = await fetchAllGroupMembers();
      setGroupMembers(data);
    }
    getGroupMembers();
  }, []);

  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage groupMembers={groupMembers} />} />
        <Route
          path="members/:slug"
          element={<ValidSlugRoute groupMembers={groupMembers} />}
        />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
