import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-brand-bg/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-0' 
          : 'bg-transparent border-b border-transparent py-2'
      } ${isMobileMenuOpen ? 'bg-brand-bg border-white/10' : ''}`}
    >
      {/* Technical Scanline Effect */}
      {isScrolled && (
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent origin-center z-10"
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer relative z-50" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
            role="button"
            aria-label="Scroll to top"
          >
            <img 
              src="/Logo.png" 
              alt="Logia Initiative" 
              className="h-6 md:h-7 brightness-0 invert transition-transform duration-500 hover:scale-105" 
            />
          </motion.div>

          {/* Center Nav Desktop */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative px-5 py-2"
              >
                <span className="relative z-10 text-[13px] font-medium tracking-wide text-white/70 transition-colors duration-300 group-hover:text-white flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-brand-accent/0 transition-all duration-300 group-hover:text-brand-accent/60">
                    0{index + 1}
                  </span>
                  {item.name}
                </span>
                {/* Technical Hover Background */}
                <span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/5 group-hover:backdrop-blur-sm scale-90 group-hover:scale-100" />
                {/* Bottom Indicator */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-accent transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-3"
          >
            <a 
              href="#market" 
              className="px-5 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300 text-[12px] font-medium tracking-wide"
            >
              Market Reach
            </a>
            <a 
              href="#contact" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-brand-bg hover:bg-brand-accent hover:text-white transition-all duration-500 text-[12px] font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            >
              Initiate Collaboration 
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Mobile/Tablet Menu Toggle */}
          <div className="xl:hidden flex items-center ml-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-12 space-y-10">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.a 
                    key={item.name}
                    href={item.href} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-2xl font-serif font-normal text-white/60 hover:text-white transition-colors group"
                  >
                    <span className="font-mono text-xs text-brand-accent/40 group-hover:text-brand-accent">0{index + 1}</span>
                    {item.name}
                  </motion.a>
                ))}
              </div>
              <div className="pt-10 border-t border-white/5 flex flex-col gap-4">
                <a 
                  href="#market" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-6 py-4 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm font-medium tracking-wide"
                >
                  Market Reach
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-brand-bg hover:bg-brand-accent hover:text-white transition-all text-sm font-bold"
                >
                  Initiate Collaboration <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            {/* Technical Background Detail in Mobile Menu */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <div className="font-mono text-8xl font-bold uppercase tracking-tighter">Logia</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
