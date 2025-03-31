import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import MemberPage from "./components/MemberPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path=":slug" element={<MemberPage />} />
      {/* TODO: Add fix for wrong URL's. Show 404 error*/}
    </Routes>
  );
}

export default App;
