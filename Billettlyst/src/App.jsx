import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import CategoryPage from "./pages/CategoryPage";
import Dashboard from "./pages/DashboardPage";
import SanityEventDetails from './components/SanityEventDetails';
//
import "@fortawesome/fontawesome-free/css/all.min.css";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<PageNotFound /> } />
        <Route path="/" element={<HomePage /> } />
        <Route path="/event/:id" element={<EventPage /> } />
        <Route path="/category:slug" element={<CategoryPage /> } />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/sanity-event/:id" element={<SanityEventDetails />} />
        
      </Routes>
    </Layout>
  );
}

export default App;
