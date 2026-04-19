import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [isFadingBg, setIsFadingBg] = useState(false);

  // Manage body scroll lock cleanly to avoid passive event listener warnings
  useEffect(() => {
    if (isLoading || internalLoading || !isFadingBg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [isLoading, internalLoading, isFadingBg]);

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
                {/* Pure White Logo with Cinematic Breathing (Opacity) */}
                <motion.img
                  src="/icon.png"
                  alt="Logia Logo"
                  className="w-full h-full object-contain relative z-10 pointer-events-none"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
