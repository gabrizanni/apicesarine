import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Laboratori from "./pages/Laboratori";
import Prenota from "./pages/Prenota";
import Educatori from "./pages/Educatori";
import MaterialiDocenti from "./pages/MaterialiDocenti";
import ChiSiamo from "./pages/ChiSiamo";
import Storie from "./pages/Storie";
import Galleria from "./pages/Galleria";
import Contatti from "./pages/Contatti";
import FAQ from "./pages/FAQ";
import Glossario from "./pages/Glossario";
import Admin from "./pages/Admin";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "./pages/NotFound";
import { RedirectHandler } from "./utils/redirects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/laboratori" element={<Laboratori />} />
          <Route path="/prenota" element={<Prenota />} />
          <Route path="/prenota/successo" element={<BookingSuccess />} />
          <Route path="/educatori" element={<Educatori />} />
          <Route path="/materiali-docenti" element={<MaterialiDocenti />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/storie" element={<Storie />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/glossario" element={<Glossario />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
