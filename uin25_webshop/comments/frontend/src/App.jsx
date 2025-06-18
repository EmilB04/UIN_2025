import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "../components/Users";
import User from "../components/User";
import Products from "../components/Products";
import Product from "../components/Product";
import Layout from "../components/Layout";
import { fetchUserById } from "../sanity/services/userServices";

function App() {
  const [count, setCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState([]);

  const getUserById = async () => {
    const data = await fetchUserById();
    setLoggedInUser(data[0]);
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="users/" element={<Users />} />
        <Route path="users/:user" element={<User />} />
        <Route path="products/" element={<Products />} />
        <Route
          path="products/:product"
          element={<Product loggedInUser={loggedInUser} />}
        />
      </Routes>
    </Layout>
  );
}
export default App;
