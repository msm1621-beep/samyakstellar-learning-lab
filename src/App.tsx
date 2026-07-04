import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoinsProvider } from "@/contexts/CoinsContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

import { GamePassProvider } from "@/contexts/GamePassContext";
import { PerksProvider } from "@/contexts/PerksContext";
import { AchievementsProvider } from "@/contexts/AchievementsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import DreamJourney from "./pages/DreamJourney";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import AccountSlide from "./components/AccountSlide";

const queryClient = new QueryClient();

const App = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [accountDone, setAccountDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CoinsProvider>
          <SubscriptionProvider>
            <GamePassProvider>
              <PerksProvider>
              <AchievementsProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
                  {splashDone && !accountDone && <AccountSlide onComplete={() => setAccountDone(true)} />}
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dream-journey" element={<DreamJourney />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </AchievementsProvider>
              </PerksProvider>
            </GamePassProvider>
          </SubscriptionProvider>
        </CoinsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
