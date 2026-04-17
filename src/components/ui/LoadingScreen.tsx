import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [isFadingBg, setIsFadingBg] = useState(false);

  // Sequential Orchestration: 
  // When external isLoading becomes false, we first fade out the logo.
  // After logo fades, we trigger the background fade.
  useEffect(() => {
    if (!isLoading) {
      // Step 1: Trigger Logo Fade Out
      setInternalLoading(false);

      // Step 2: Wait for logo fade duration (600ms), then trigger BG fade out
      const bgTimer = setTimeout(() => {
        setIsFadingBg(true);
      }, 600);

      return () => clearTimeout(bgTimer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {!isFadingBg && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-brand-bg flex items-center justify-center"
          style={{ touchAction: 'none' }} // Prevents mobile scrolling behind the overlay
          onWheel={(e) => e.preventDefault()} // Prevents mouse wheel scrolling behind the overlay
          onTouchMove={(e) => e.preventDefault()} // Secondary mobile prevention
        >
          <AnimatePresence>
            {internalLoading && (
              <motion.div
                key="logo-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-24 h-24 flex items-center justify-center"
              >
                {/* Cinematic Background Glow (Behind Logo) */}
                <div 
                  className="absolute inset-0 w-[160%] h-[160%] left-[-30%] top-[-30%] animate-breathing-bg-glow pointer-events-none mix-blend-screen rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.5) 0%, rgba(14, 165, 233, 0.15) 30%, transparent 55%)'
                  }}
                />
                
                {/* Pure White Logo (Foreground) */}
                <img
                  src="/icon.png"
                  alt="Logia Logo"
                  className="w-full h-full object-contain relative z-10 pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
