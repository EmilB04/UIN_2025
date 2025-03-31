import { Route, Routes } from "react-router";
import Layout from "./components/Home";
import MemberPage from "./components/MemberPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/:slug" element={<MemberPage />} />
    </Routes>
  );
}

export default App;
