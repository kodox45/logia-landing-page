import React, { useState, useEffect } from 'react';
import { SEO } from './components/common/SEO';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Methodology } from './components/sections/Methodology';
import { ProductStage } from './components/sections/ProductStage';
import { Market } from './components/sections/Market';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Cinematic minimum delay (2.5 seconds) so the loading screen doesn't just flash
    const timer = setTimeout(() => setMinTimeElapsed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Screen is loading if either the assets aren't ready OR the minimum time hasn't passed
  const isLoading = !(isAssetsReady && minTimeElapsed);

  return (
    <div className="min-h-screen relative">
      <SEO />
      
      {/* Loading Screen overlays everything */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Ambient Subtle Light */}
      <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-50"></div>

      <Navbar />
      <Hero />
      <About />

      <Services onReady={() => setIsAssetsReady(true)} />

      <Methodology />

      <ProductStage />

      <Market />

      <Contact />

      <Footer />
    </div>
  );
}
