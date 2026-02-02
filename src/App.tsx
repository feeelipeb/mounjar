import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FunnelProvider } from "@/contexts/FunnelContext";
import Index from "./pages/Index";
import Quiz1 from "./pages/Quiz1";
import Quiz2 from "./pages/Quiz2";
import Quiz3 from "./pages/Quiz3";
import Quiz4 from "./pages/Quiz4";
import Quiz5 from "./pages/Quiz5";
import Quiz6 from "./pages/Quiz6";
import Quiz7 from "./pages/Quiz7";
import Quiz8 from "./pages/Quiz8";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FunnelProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz1" element={<Quiz1 />} />
            <Route path="/quiz2" element={<Quiz2 />} />
            <Route path="/quiz3" element={<Quiz3 />} />
            <Route path="/quiz4" element={<Quiz4 />} />
            <Route path="/quiz5" element={<Quiz5 />} />
            <Route path="/quiz6" element={<Quiz6 />} />
            <Route path="/quiz7" element={<Quiz7 />} />
            <Route path="/quiz8" element={<Quiz8 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FunnelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
