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
import Quiz9 from "./pages/Quiz9";
import Quiz10 from "./pages/Quiz10";
import Quiz11 from "./pages/Quiz11";
import Quiz12 from "./pages/Quiz12";
import Quiz13 from "./pages/Quiz13";
import Quiz14 from "./pages/Quiz14";
import Quiz15 from "./pages/Quiz15";
import Quiz16 from "./pages/Quiz16";
import Quiz17 from "./pages/Quiz17";
import Quiz18 from "./pages/Quiz18";
import Quiz19 from "./pages/Quiz19";
import Quiz20 from "./pages/Quiz20";
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
            <Route path="/quiz9" element={<Quiz9 />} />
            <Route path="/quiz10" element={<Quiz10 />} />
            <Route path="/quiz11" element={<Quiz11 />} />
            <Route path="/quiz12" element={<Quiz12 />} />
            <Route path="/quiz13" element={<Quiz13 />} />
            <Route path="/quiz14" element={<Quiz14 />} />
            <Route path="/quiz15" element={<Quiz15 />} />
            <Route path="/quiz16" element={<Quiz16 />} />
            <Route path="/quiz17" element={<Quiz17 />} />
            <Route path="/quiz18" element={<Quiz18 />} />
            <Route path="/quiz19" element={<Quiz19 />} />
            <Route path="/quiz20" element={<Quiz20 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FunnelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
