import { Route, Routes } from "react-router";
import Layout from "./components/Home";
// import groupMembers from "./scripts/GroupMembers";
import Emil from './components/members/Emil';
import Andreas from './components/members/Andreas';
import Sebastian from './components/members/Sebastian';
import Ida from './components/members/Ida';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route path="/emil" element={<Emil />}></Route>
      <Route path="andreas" element={<Andreas />}></Route>
      <Route path="sebastian" element={<Sebastian />}></Route>
      <Route path="ida" element={<Ida />}></Route>

    </Routes>
  );
}

export default App;

/*
import { Route, Routes } from "react-router";
import Layout from "./components/Home";
import groupMembers from "./scripts/GroupMembers";
import Emil from "./components/members/Emil";
import Andreas from "./components/members/Andreas";
import Sebastian from "./components/members/Sebastian";
import Ida from "./components/members/Ida";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {groupMembers.map((member) => {
        const MemberComponent = {
          andreas: Andreas,
          emil: Emil,
          sebastian: Sebastian,
          ida: Ida,
        }[member.slug];

        return (
          <Route
            key={member.slug}
            path={`/${member.slug}`}
            element={<MemberComponent />}
          />
        );
      })}
    </Routes>
  );
}

export default App;


*/