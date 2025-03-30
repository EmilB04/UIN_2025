import { Route, Routes } from "react-router";
import Layout from "./components/Home";
import GroupMembers from "./components/GroupMembers";
import Emil from './components/members/Emil';
import Andreas from './components/members/Andreas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route path="/emil" element={<Emil />}></Route>
      <Route path="andreas" element={<Andreas />}></Route>
    </Routes>
  );
}

export default App;
