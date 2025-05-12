
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import ChallengeView from "./pages/ChallengeView";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeLibrary from "./pages/ChallengeLibrary";
import Signup from "./pages/Signup";
import Build from "./pages/Build";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import ReportProblem from "./pages/ReportProblem";
import DesignBasics from "./pages/learn/DesignBasics";
import Freelancing101 from "./pages/learn/Freelancing101";
import TechStarter from "./pages/learn/TechStarter";
import StartSprint from "./pages/StartSprint";
import GenerateCustomSprint from "./pages/GenerateCustomSprint";
import LearnCategoryPage from "./pages/learn/LearnCategoryPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sprints from "./pages/Challenges";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/report" element={<ReportProblem />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/learn/:category" element={<LearnCategoryPage />} />
                <Route path="/design-basics" element={<DesignBasics />} />
                <Route path="/freelancing-101" element={<Freelancing101 />} />
                <Route path="/tech-starter" element={<TechStarter />} />
                <Route path="/challenge-detail/:id" element={<ChallengeDetail />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/practice" element={
                  <ProtectedRoute>
                    <Practice />
                  </ProtectedRoute>
                } />
                <Route path="/sprints" element={
                  <ProtectedRoute>
                    <Sprints />
                  </ProtectedRoute>
                } />
                <Route path="/challenge/:id" element={
                  <ProtectedRoute>
                    <ChallengeView />
                  </ProtectedRoute>
                } />
                <Route path="/build" element={
                  <ProtectedRoute>
                    <Build />
                  </ProtectedRoute>
                } />
                <Route path="/community" element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } />
                <Route path="/start-sprint" element={
                  <ProtectedRoute>
                    <StartSprint />
                  </ProtectedRoute>
                } />
                <Route path="/generate-sprint" element={
                  <ProtectedRoute>
                    <GenerateCustomSprint />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
