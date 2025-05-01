import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./styles/app.scss";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import CategoryPage from "./pages/CategoryPage";
import Dashboard from "./pages/DashboardPage";
import SanityEventDetails from './components/SanityEventDetails';
import PageNotFound from "./pages/PageNotFound";
import DashboardMoreInfoPage from "./pages/DashboardMoreInfoPage";
//
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      {/* Global loading spinner */}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Laster inn...</p>
        </div>
      )}

      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage loading={loading} setLoading={setLoading} />} />
        <Route path="/event/:id" element={<EventPage loading={loading} setLoading={setLoading} />} />
        <Route path="/category/:slug" element={<CategoryPage loading={loading} setLoading={setLoading} />} />
        <Route path="/dashboard" element={<Dashboard loading={loading} setLoading={setLoading} />} />
        <Route path="/dashboard/:id" element={<DashboardMoreInfoPage loading={loading} setLoading={setLoading} />} />
        <Route path="/sanity-event/:id" element={<SanityEventDetails loading={loading} setLoading={setLoading} />} />
      </Routes>
    </Layout>
  );
}

export default App;