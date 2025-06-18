import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const [storageUser, setStorageUser] = useState(localStorage.getItem("user"));

  console.log("Kommer fra storage", storageUser);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            signedIn ? (
              <Welcome />
            ) : (
              <Login storageUser={storageUser} setSignedIn={setSignedIn} />
            )
          }
        />
        <Route
          path="login"
          element={
            <Login storageUser={storageUser} setSignedIn={setSignedIn} />
          }
        />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
}

export default App;
