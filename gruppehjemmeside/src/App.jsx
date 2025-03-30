import { Route, Routes } from "react-router";
import Layout from "./components/Home";
import Emil from "./components/members/Emil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/:slug" element={<Emil />} />
    </Routes>
  );
}

export default App;
