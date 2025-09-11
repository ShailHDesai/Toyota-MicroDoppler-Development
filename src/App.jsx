// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import ProjectDescription from "./pages/ProjectDescription";
import ResearchPage from "./pages/ResearchPage";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";
import PreviewPage from "./pages/PreviewPage";
import DataLoading from "./pages/DataLoading";       // ✅ NEW
import CreateAccount from "./pages/CreateAccount";
import Contributors from "./pages/Contributors";
import "./styles/AppShell.css";

/* Gate that requires arriving from Login *this time only* */
function RequireLoginOnce({ children }) {
  const location = useLocation();
  const cameFromLogin = location.state?.fromLogin === true;
  if (!cameFromLogin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main" role="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/description" element={<ProjectDescription />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/contributors" element={<Contributors />} />

          {/* Public auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* /dataset requires a fresh hop from Login */}
          <Route
            path="/dataset"
            element={
              <RequireLoginOnce>
                <DataPage />
              </RequireLoginOnce>
            }
          />

          {/* /preview protected as well */}
          <Route
            path="/preview"
            element={
              <RequireLoginOnce>
                <PreviewPage />
              </RequireLoginOnce>
            }
          />

          {/* /loading – user reaches this from Preview's Download button */}
          <Route path="/loading" element={<DataLoading />} />  {/* ✅ NEW */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
