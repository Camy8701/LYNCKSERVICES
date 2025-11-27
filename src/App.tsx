import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import ForBusinesses from "./pages/ForBusinesses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Impressum from "./pages/Impressum";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServiceDetail from "./pages/ServiceDetail";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeads from "./pages/AdminLeads";
import AdminLeadDetail from "./pages/AdminLeadDetail";
import AdminCompanies from "./pages/AdminCompanies";
import AdminCompanyForm from "./pages/AdminCompanyForm";
import AdminServices from "./pages/AdminServices";
import AdminAds from "./pages/AdminAds";
import AdminAdDetail from "./pages/AdminAdDetail";
import AdminAnalytics from "./pages/AdminAnalytics";
import Advertise from "./pages/Advertise";
import AdvertiseCreate from "./pages/AdvertiseCreate";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/for-businesses" element={<ForBusinesses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/danke" element={<ThankYou />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><AdminLeads /></ProtectedRoute>} />
            <Route path="/admin/leads/:id" element={<ProtectedRoute><AdminLeadDetail /></ProtectedRoute>} />
            <Route path="/admin/companies" element={<ProtectedRoute><AdminCompanies /></ProtectedRoute>} />
            <Route path="/admin/companies/:id" element={<ProtectedRoute><AdminCompanyForm /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/ads" element={<ProtectedRoute><AdminAds /></ProtectedRoute>} />
            <Route path="/admin/ads/:id" element={<ProtectedRoute><AdminAdDetail /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />

            {/* Advertising Routes */}
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/advertise/create" element={<AdvertiseCreate />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
