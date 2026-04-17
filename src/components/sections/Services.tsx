import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';

export const Services: React.FC<{ onReady?: () => void }> = ({ onReady }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0); // Synchronous tracking of active text slide
  const targetSlideRef = useRef(0); // Tracks the intended destination based on scroll
  const animationRafId = useRef<number | null>(null); // To cancel ongoing animations
  
  const [isReady, setIsReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  
  // Reduced frame count by another 5, down to 86 for a snappier transition end
  const frameCount = 86;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const progressBarWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    springConfig
  );

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const framePaths = Array.from({ length: frameCount }, (_, i) => `/frames/${String(i + 1).padStart(5, '0')}.png`);

    const preloadImages = async () => {
      const loadPromises = framePaths.map((path, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            images.current[index + 1] = img;
            loadedCount++;
            if (loadedCount === frameCount) resolve();
            else resolve(); 
          };
          img.onerror = () => resolve(); 
        });
      });

      await Promise.all(loadPromises);
      setIsReady(true);
      if (onReady) onReady();
      
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d', { alpha: false });
        const firstImg = images.current[1];
        if (context && firstImg) {
          drawFrame(context, canvas, firstImg);
        }
      }
    };

    preloadImages();
    
    // Cleanup on unmount
    return () => {
        if (animationRafId.current !== null) cancelAnimationFrame(animationRafId.current);
    };
  }, []);

  const drawFrame = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgAspect;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }
    
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const animateToFrame = (targetFrame: number) => {
    // 1. Cancel any currently running animation immediately (Interruptible)
    if (animationRafId.current !== null) {
      cancelAnimationFrame(animationRafId.current);
    }

    const startFrame = currentFrameRef.current;
    if (startFrame === targetFrame) return;

    // 2. Dynamic Duration: If we reverse mid-way, it shouldn't take the full 1.8s
    const framesToTravel = Math.abs(targetFrame - startFrame);
    const maxDuration = 1600; // Slightly faster base speed
    const duration = Math.max((framesToTravel / (frameCount - 1)) * maxDuration, 300); // Minimum 300ms so it doesn't snap instantly

    const startTime = performance.now();
    const middleFrame = Math.round(frameCount / 2);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth Easing function (easeInOutQuad)
      // This curve provides the dramatic start/mid you like, but with a much smoother 
      // and less drastic deceleration at the tail end to prevent frame stuttering.
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const nextFrame = Math.round(startFrame + (targetFrame - startFrame) * ease);
      
      // Update canvas if frame changed
      if (nextFrame !== currentFrameRef.current) {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d', { alpha: false });
          const img = images.current[nextFrame];
          if (context && img && img.complete) {
            drawFrame(context, canvas, img);
            currentFrameRef.current = nextFrame;
          }
        }
        
        // 3. Precision Text Sync: Swap text slightly earlier than the exact middle 
        // to make it feel more synchronized with the leading edge of the visual transition
        const swapFrameTrigger = Math.round(frameCount * 0.30); // Swaps at 30% instead of 40%
        const currentTargetSlide = currentFrameRef.current >= swapFrameTrigger ? 1 : 0;
        if (currentTargetSlide !== activeSlideRef.current) {
            activeSlideRef.current = currentTargetSlide;
            setActiveSlide(currentTargetSlide); // Trigger React re-render for text
        }
      }

      if (progress < 1) {
        animationRafId.current = requestAnimationFrame(animate);
      } else {
        animationRafId.current = null;
        // Failsafe ensure final state is perfect
        const finalSlide = targetFrame === frameCount ? 1 : 0;
        if (activeSlideRef.current !== finalSlide) {
            activeSlideRef.current = finalSlide;
            setActiveSlide(finalSlide);
        }
      }
    };

    animationRafId.current = requestAnimationFrame(animate);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;

    // 4. Target-State Hysteresis Logic
    // We check absolute scroll boundaries instead of scroll direction. 
    // This makes fast-scrolling immune to desyncing.
    let newTargetSlide = targetSlideRef.current;
    
    if (latest > 0.52) {
        newTargetSlide = 1; // Passed halfway down, target AI
    } else if (latest < 0.48) {
        newTargetSlide = 0; // Passed halfway up, target Enterprise
    }

    // If target changed due to fast scroll, immediately interrupt and reverse!
    if (newTargetSlide !== targetSlideRef.current) {
        targetSlideRef.current = newTargetSlide;
        animateToFrame(newTargetSlide === 1 ? frameCount : 1);
    }
  });

  return (
    <section id="services" ref={containerRef} className="relative h-[220vh] bg-brand-bg">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center">
        {/* Background Frame Sequence - Tuned to match Hero's cinematic tone */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.95) contrast(1.10) saturate(1.05)' 
            }}
            width={1920}
            height={1080}
          />
          {/* Top and Bottom gradient blending for seamless transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg opacity-100"></div>
          {/* Mobile-specific text protection gradient (darkens the center on small screens) */}
          <div className="absolute inset-0 bg-brand-bg/40 md:hidden pointer-events-none"></div>
          {/* Hero-like bottom vignette, slightly reduced to not overpower the seamless edge */}
          <div className="hero-overlay-gradient opacity-60"></div>
        </div>

        {/* Unified Cinematic Grain Texture */}
        <div className="bg-grain pointer-events-none z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col h-full justify-center py-16 md:py-20">
          <div className="relative h-[50dvh] flex items-center mt-8 md:mt-0">
            <AnimatePresence mode="wait">
              {activeSlide === 0 ? (
                /* Slide 1: Enterprise (Text Right on Desktop, Center on Mobile) */
                <motion.div 
                  key="enterprise"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center md:justify-end px-2 sm:px-6 md:px-12"
                >
                  <div className="max-w-xl text-center md:text-right flex flex-col items-center md:items-end">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-widest mb-4 md:mb-6 w-fit">
                      {servicesData[0].tag}
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight tracking-tight">
                      {servicesData[0].title}
                    </h3>
                    <p className="text-brand-gray text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-lg">
                      {servicesData[0].description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 mb-8 md:mb-10 w-full md:w-auto">
                      {servicesData[0].features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/70 font-light">
                          {feature}
                          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                        </div>
                      ))}
                    </div>
                    <button 
                      className="flex items-center gap-2 text-brand-accent text-sm md:text-base font-semibold group w-fit hover:text-white transition-colors"
                      aria-label={`Explore ${servicesData[0].title} solution`}
                    >
                      Explore Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Slide 2: AI (Text Left on Desktop, Center on Mobile) */
                <motion.div 
                  key="ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center md:justify-start px-2 sm:px-6 md:px-12"
                >
                  <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-widest mb-4 md:mb-6 w-fit">
                      {servicesData[1].tag}
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight tracking-tight">
                      {servicesData[1].title}
                    </h3>
                    <p className="text-brand-gray text-base sm:text-lg md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-lg">
                      {servicesData[1].description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 mb-8 md:mb-10 w-full md:w-auto">
                      {servicesData[1].features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/70 font-light">
                          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button 
                      className="flex items-center gap-2 text-brand-accent text-sm md:text-base font-semibold group w-fit hover:text-white transition-colors"
                      aria-label={`Explore ${servicesData[1].title} solution`}
                    >
                      Explore Solution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Responsive Scroll Progress & Indicator */}
          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 md:gap-6">
            <div className="w-full max-w-[200px] md:max-w-xs h-px bg-white/10 relative overflow-hidden">
              <motion.div 
                style={{ width: progressBarWidth }}
                className="absolute inset-y-0 left-0 bg-brand-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-6 md:h-8 bg-gradient-to-b from-brand-accent to-transparent"></div>
              <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30 md:text-white/30">Scroll to Explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
