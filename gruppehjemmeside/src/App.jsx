import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import MemberPage from "./components/MemberPage";
import groupMembers from "./scripts/GroupMembers";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="members/:slug"
        element={<MemberPage groupMembers={groupMembers} />}
      />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
