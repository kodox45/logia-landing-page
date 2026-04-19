import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring, useInView } from 'motion/react';
import { methodologyPoints } from '../../data/methodology';

// Optimization: Move static data outside component
const PARTICLE_COUNT = 50;
// More tech-like, subtle colors (dimmer whites, mostly brand blues)
const PARTICLE_COLORS = ['#ffffff40', '#0ea5e980', '#0ea5e940', '#0284c760'];

interface ParticleData {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  // New properties for constant subtle motion
  driftSpeed: number;
  driftPhase: number;
}

const ParallaxParticles: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // OPTIMIZATION 1: Pause animation when not in view to save CPU/Battery
  const isInView = useInView(canvasRef, { margin: "100px" });
  
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 3, // Slightly smaller, sharper particles
      speed: 0.05 + Math.random() * 0.4, // Smoother scroll parallax
      opacity: 0.1 + Math.random() * 0.3,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      driftSpeed: 0.005 + Math.random() * 0.015,
      driftPhase: Math.random() * Math.PI * 2
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // OPTIMIZATION 2: Pre-render glowing particles to offscreen canvases.
    // shadowBlur is extremely expensive in a render loop on mobile.
    // By pre-rendering the glow once, we just draw an image (drawImage) which is vastly faster.

    // Create a dictionary to hold offscreen canvases for each color
    const glowCache: Record<string, HTMLCanvasElement> = {};

    PARTICLE_COLORS.forEach(color => {
        const glowCanvas = document.createElement('canvas');
        // Size needs to accommodate the max particle size + shadow blur
        // Max size = ~3.5. Shadow blur = size * 3 =~ 10.5. Total radius =~ 14.
        // Diameter = 28. Pad it to 40x40.
        glowCanvas.width = 40;
        glowCanvas.height = 40;
        const gCtx = glowCanvas.getContext('2d');

        if (gCtx) {
            const centerX = 20;
            const centerY = 20;
            // Pre-render logic for a standard "large" particle to scale later
            const baseSize = 3;

            gCtx.beginPath();
            gCtx.arc(centerX, centerY, baseSize, 0, Math.PI * 2);
            gCtx.fillStyle = color;

            gCtx.shadowBlur = baseSize * 3;
            gCtx.shadowColor = color.substring(0, 7); // Hex without alpha
            gCtx.fill();
            gCtx.shadowBlur = 0;
        }
        glowCache[color] = glowCanvas;
    });


    let rafId: number;
    let time = 0;
    
    const render = () => {
      // Don't render if not visible — and crucially, don't re-queue the RAF.
      // The effect re-runs when isInView becomes true (it's in the dep array),
      // which calls render() again and restarts the loop from there.
      if (!isInView) {
        return;
      }

      const progress = scrollProgress.get();
      const { width, height } = canvas;
      time += 0.01;
      
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // 1. Scroll-based Parallax
        const parallaxYOffset = -1000 * p.speed * progress;
        
        // 2. Constant subtle drifting (Float effect)
        const driftY = Math.sin(time * p.driftSpeed + p.driftPhase) * 20;
        const driftX = Math.cos(time * p.driftSpeed * 0.8 + p.driftPhase) * 15;

        const xPos = (p.x / 100) * width + driftX;
        const yPos = (p.y / 100) * height + parallaxYOffset + driftY;
        
        // Wrap around vertically to keep particles visible smoothly
        let finalY = yPos;
        const wrapHeight = height + 200; // Give breathing room for wrapping
        
        // Accurate wrapping logic regardless of scroll speed
        finalY = ((finalY % wrapHeight) + wrapHeight) % wrapHeight - 100;
        
        
        // Draw particle
        ctx.globalAlpha = p.opacity;
        
        if (p.size > 1.5 && glowCache[p.color]) {
             // Use pre-rendered glowing image
             const scaleRatio = p.size / 3; // 3 is the baseSize we used in pre-render
             const drawWidth = 40 * scaleRatio;
             const drawHeight = 40 * scaleRatio;
             ctx.drawImage(
                 glowCache[p.color], 
                 xPos - (drawWidth/2), 
                 finalY - (drawHeight/2), 
                 drawWidth, 
                 drawHeight
             );
        } else {
             // Standard small particle without expensive glow
             ctx.beginPath();
             ctx.arc(xPos, finalY, p.size, 0, Math.PI * 2);
             ctx.fillStyle = p.color;
             ctx.fill();
        }
      });
      
      rafId = requestAnimationFrame(render);
    };

    // Debounce resize: without this, dragging the browser edge triggers 50+
    // canvas clears per second. 150ms wait ensures we only resize once the
    // user has stopped, eliminating resize jank entirely.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    // Set initial size immediately (no debounce needed on first run)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
    };
  }, [particles, scrollProgress, isInView]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export const Methodology: React.FC = () => {
  const methodologyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: methodologyRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress for animations
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [methodologyStage, setMethodologyStage] = useState(0);
  const methodologyStageRef = useRef(0);

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    let stage = 0;
    if (latest < 0.08) stage = 0;      // Title centered
    else if (latest < 0.20) stage = 1; // Title minimizing
    else if (latest < 0.40) stage = 2; // Card 1
    else if (latest < 0.60) stage = 3; // Card 2
    else if (latest < 0.80) stage = 4; // Card 3
    else stage = 5;                    // Card 4

    if (stage !== methodologyStageRef.current) {
      methodologyStageRef.current = stage;
      setMethodologyStage(stage);
    }
  });

  const isTitleMinimized = methodologyStage > 0;

  return (
    <section id="methodology" ref={methodologyRef} className="h-[400vh] relative z-10 bg-brand-bg">
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">
        
        {/* Base Layer: Parallax Particles - Now Canvas Based with Drifting */}
        <ParallaxParticles scrollProgress={smoothScroll} />

        {/* Technical Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
        </div>

        {/* 
          SEAMLESS BRIDGE TO SERVICES: 
          Ultra-long gradient at the top to perfectly dissolve the hard edge 
          as the Services sticky container scrolls upwards.
        */}
        <div className="absolute top-0 inset-x-0 h-[35vh] bg-gradient-to-b from-brand-bg via-brand-bg/90 to-transparent pointer-events-none z-10" />

        {/* Cinematic Overlays */}
        {/* We keep the bottom gradient as it was (via-transparent to-brand-bg/40) for the Products transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg/40 pointer-events-none z-10"></div>
        <div className="hero-overlay-gradient pointer-events-none opacity-40 z-10"></div>
        
        {/* Unified Cinematic Grain Texture */}
        <div className="bg-grain pointer-events-none z-10 opacity-[0.15]"></div>

        {/* Brand Ambient Glows: Expanded size, lowered opacity, and used screen blend mode to prevent hard banding edges */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-brand-accent/[0.03] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vh] bg-brand-accent/[0.03] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-full flex flex-col justify-center z-20">
          
          {/* Intro Title Layer - Now state-driven, synchronized, and smooth */}
          <div className="text-center max-w-4xl mx-auto relative z-10 flex flex-col items-center">

            {/* Main Title: Scales down and moves to a balanced top header position */}
            <motion.h2 
              initial={false}
              animate={{ 
                y: isTitleMinimized ? "-15dvh" : "0dvh",
                scale: isTitleMinimized ? 0.6 : 1,
                opacity: 1 
              }}
              style={{ willChange: "transform" }}
              transition={{ type: "spring", stiffness: 90, damping: 25 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-6 md:mb-8 tracking-tight leading-[1.1] origin-top text-balance"
            >
              Beyond Prompting: <br className="hidden md:block"/>
              <span className="italic text-white/80">The Graph-Centric Production Engine.</span>
            </motion.h2>

            {/* Description: Fades out entirely */}
            <motion.p 
              initial={false}
              animate={{ 
                opacity: isTitleMinimized ? 0 : 1, 
                y: isTitleMinimized ? -20 : 0 
              }}
              transition={{ type: "spring", stiffness: 90, damping: 25 }}
              className="text-brand-gray text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto text-pretty px-4"
            >
              We don't just use AI to write code. We deploy an autonomous Virtual IT Division that understands, reasons, and builds through persistent Project Intelligence.
            </motion.p>
          </div>

          {/* Points Container - Orchestrated Cinematic Stagger with physical isolation */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[32dvh] md:pt-[35dvh]">
            <AnimatePresence mode="wait">
              {methodologyPoints.map((point, index) => {
                const stage = index + 2;
                const isLastPoint = index === methodologyPoints.length - 1;
                
                if (methodologyStage === stage || (isLastPoint && methodologyStage > stage)) {
                  
                  // Cinematic orchestration variants
                  const containerVariants = {
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                    },
                    exit: {
                      opacity: 0,
                      y: -40,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
                    }
                  };

                  const itemVariants = {
                    hidden: { opacity: 0, y: 40 },
                    show: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
                    }
                  };

                  return (
                    <motion.div
                      key={index}
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      exit={isLastPoint && methodologyStage > stage ? "show" : "exit"}
                      className="flex flex-col items-center text-center max-w-4xl px-4 mt-8 md:mt-12"
                    >
                      <motion.span variants={itemVariants} className="text-[10px] md:text-sm font-bold font-mono uppercase tracking-[0.3em] text-brand-accent mb-4 md:mb-6">
                        {point.index}
                      </motion.span>
                      
                      <motion.h3 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white mb-6 md:mb-8 tracking-tight leading-[1.1] md:leading-[1.05] text-balance px-4">
                        {point.punchline}
                      </motion.h3>
                      
                      <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-brand-gray font-light leading-relaxed mb-10 md:mb-14 max-w-2xl mx-auto text-pretty px-2">
                        {point.narrative}
                      </motion.p>
                      
                      <motion.div variants={itemVariants} className="px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.1em] md:tracking-[0.2em] text-brand-accent/90 text-center leading-snug">
                          {point.technical}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
