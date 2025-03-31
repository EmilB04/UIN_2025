import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import MemberPage from "./components/MemberPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<MemberPage />} />
    </Routes>
  );
}

export default App;
