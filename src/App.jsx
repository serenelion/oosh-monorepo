import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { navItems } from "./nav-items";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <Routes>
      {navItems.map(({ to, page }) => (
        <Route key={to} path={to} element={page} />
      ))}
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
