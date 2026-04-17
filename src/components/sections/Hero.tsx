import React, { memo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = memo(() => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.2]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  // Animation variants for better performance and readability
  const containerVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] as any, 
        delay: 0.3 
      } 
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] as any, 
        delay: 0.55 
      } 
    }
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden z-10 h-screen flex items-center" id="hero">
      {/* Video Background */}
      <motion.div 
        style={{ opacity: videoOpacity, scale: videoScale }}
        className="absolute inset-0 z-0 bg-brand-bg overflow-hidden"
      >
        <video 
          className="w-full h-full object-cover will-change-transform"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/background-cut2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="hero-overlay-gradient pointer-events-none"></div>
      <div className="bg-grain pointer-events-none"></div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
      >
        <div className="max-w-[720px]">
          <motion.h1 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-5xl md:text-6xl lg:text-[72px] font-serif font-normal text-white tracking-tight leading-[1.05] mb-6 will-change-[transform,opacity]"
          >
            Building Software <br /> with <span className="italic text-white/90">Agentic AI.</span>
          </motion.h1>
          
          <motion.p 
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-[15px] md:text-base text-white/60 mb-0 leading-relaxed font-light max-w-[480px] will-change-[transform,opacity]"
          >
            AI-driven enterprise engineering. We design, build, and scale
            end-to-end technology solutions through autonomous AI systems.
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Nav Pill */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[28px] left-1/2 transform -translate-x-1/2 hidden lg:flex z-20"
      >
        <div className="hero-bottom-nav flex items-center justify-center space-x-10 px-8 py-3 rounded-full bg-brand-bg/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          {['Enterprise', 'AI Audit', 'SaaS', 'Consulting'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="group relative flex items-center justify-center transition-all duration-300"
              aria-label={`Navigate to ${item} section`}
            >
              <span className="relative z-10 text-[11px] font-semibold tracking-[0.15em] pl-[0.15em] text-white/50 group-hover:text-white uppercase transition-colors duration-300">
                {item}
              </span>
              
              {/* Active/Hover Scanline */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-accent/50 transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';
