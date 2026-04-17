import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { ArrowUpRight, Check, ArrowRight, Shield, Zap, Lock, Database, Globe, Layers, Cpu, Server, Activity, Users, Clock } from 'lucide-react';
import { 
  ProductData, 
  HeadingBlock, 
  TextBlock, 
  ListBlock, 
  MediaBlock, 
  ButtonBlock 
} from './types/product-showcase';

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
import { SEO } from './components/common/SEO';

// Data
import { productsData } from './data/products';
import { servicesData } from './data/services';
import { methodologyPoints } from './data/methodology';

export default function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    "Initiating Agentic Protocols...",
    "Validating ERP compliance matrices...",
    "Closing the Audit Black Hole...",
    "Delivering Real-time Assurance...",
    "System Standby. Awaiting commands."
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex(prev => prev - 1), 20);
      } else {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % phrases.length);
        timer = setTimeout(() => {}, 500);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        timer = setTimeout(() => setCharIndex(prev => prev + 1), 60 + Math.random() * 40);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className="min-h-screen">
      <SEO />
      {/* Ambient Subtle Light */}
      <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-50"></div>

      <Navbar />
      <Hero />
      <About />

      <Services />

      <Methodology />

      <ProductStage />

      <Market />

      <Contact />

      <Footer />
    </div>
  );
}
