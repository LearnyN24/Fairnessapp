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

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatasetsProvider>
          <ModelsProvider>
            <SettingsProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/datasets" element={<Datasets />} />
                <Route path="/models" element={<Models />} />
                <Route path="/models/train" element={<TrainModel />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/fairness-docs" element={<FairnessDocumentation />} />
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
