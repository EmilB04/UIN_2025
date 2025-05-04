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
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const [getPageType, setPageType] = useState(""); // Add setter for pageType
  const [getEvent, setEvent] = useState({}); // Add setter for event

  return (
    <Layout>
      {/* Global loading spinner */}
      {loading && (
        Loading()
      )}

      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage loading={loading} setLoading={setLoading} />} />
        <Route path="/event/:id" element={<EventPage loading={loading} setLoading={setLoading} />} />
        <Route path="/category/:slug" element={<CategoryPage loading={loading} setLoading={setLoading} />} />
        <Route
          path="/dashboard"
          element={<Dashboard loading={loading} setLoading={setLoading} setPageType={setPageType} setEvent={setEvent} />}
        />
        <Route
          path="/dashboard/:id"
          element={<DashboardMoreInfoPage event={getEvent} pageType={getPageType} />}
        />
        <Route path="/sanity-event/:id" element={<SanityEventDetails loading={loading} setLoading={setLoading} />} />
      </Routes>
    </Layout>
  );
}

export default App;