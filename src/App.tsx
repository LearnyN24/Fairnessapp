import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { DatasetsProvider } from "@/context/DatasetsContext";
import { ModelsProvider } from "@/context/ModelsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import Index from "@/pages/Index";
import Datasets from "@/pages/Datasets";
import Models from "@/pages/Models";
import TrainModel from "@/pages/TrainModel";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import FairnessDocumentation from "@/pages/FairnessDocumentation";
import { useAuth } from "@/context/AuthContext";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatasetsProvider>
          <ModelsProvider>
            <SettingsProvider>
              <Routes>
                {/* Redirect root to signin */}
                <Route path="/" element={<Navigate to="/signin" replace />} />

                {/* Public routes */}
                <Route path="/signin" element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                } />
                <Route path="/signup" element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/datasets" element={
                  <ProtectedRoute>
                    <Datasets />
                  </ProtectedRoute>
                } />
                <Route path="/models" element={
                  <ProtectedRoute>
                    <Models />
                  </ProtectedRoute>
                } />
                <Route path="/models/train" element={
                  <ProtectedRoute>
                    <TrainModel />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/fairness-docs" element={
                  <ProtectedRoute>
                    <FairnessDocumentation />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </SettingsProvider>
          </ModelsProvider>
        </DatasetsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
