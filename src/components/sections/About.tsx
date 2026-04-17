import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="py-32 bg-brand-bg relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none"></div>
      <div className="bg-dna-pattern"></div>

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:flex md:justify-between md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white mb-6 tracking-tight">Our Innovation DNA</h2>
            <p className="text-brand-gray text-lg font-light leading-relaxed max-w-[540px]">
              Logia Initiative is founded on three pillars of expertise, synergizing human business strategy with autonomous artificial intelligence execution.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Founder 1 */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="dna-glass-card rounded-2xl p-10 group"
          >
            <div className="relative z-10">
              <span className="text-xs font-mono text-white/30 tracking-widest block mb-6">01.</span>
              <div className="value-tag border-brand-accent/20 text-brand-accent/80 bg-brand-accent/5">Strategy</div>
              <h3 className="text-2xl font-serif font-normal text-white mb-4 tracking-tight">Business Analyst</h3>
              <p className="text-brand-gray text-[15px] leading-relaxed font-light">
                Translating complex business visions and real market needs into logical architectural frameworks. We ensure every line of code written delivers a clear, measurable <span className="text-white font-medium">Return on Investment (ROI)</span> for our clients.
              </p>
            </div>
          </motion.div>

          {/* Founder 2 */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="dna-glass-card rounded-2xl p-10 group"
          >
            <div className="relative z-10">
              <span className="text-xs font-mono text-white/30 tracking-widest block mb-6">02.</span>
              <div className="value-tag border-brand-accent/20 text-brand-accent/80 bg-brand-accent/5">Core Engine</div>
              <h3 className="text-2xl font-serif font-normal text-white mb-4 tracking-tight">AI Architect Engineer</h3>
              <p className="text-brand-gray text-[15px] leading-relaxed font-light">
                Designing and training <span className="text-white font-medium">Agentic AI models</span> as our 'digital workforce'. These AI agents act autonomously within our internal operations, dramatically accelerating coding, predictive analytics, and automated testing across all systems.
              </p>
            </div>
          </motion.div>

          {/* Founder 3 */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [110, -110]) }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="dna-glass-card rounded-2xl p-10 group"
          >
            <div className="relative z-10">
              <span className="text-xs font-mono text-white/30 tracking-widest block mb-6">03.</span>
              <div className="value-tag border-brand-accent/20 text-brand-accent/80 bg-brand-accent/5">Execution</div>
              <h3 className="text-2xl font-serif font-normal text-white mb-4 tracking-tight">System Developer</h3>
              <p className="text-brand-gray text-[15px] leading-relaxed font-light">
                Executing system designs into <span className="text-white font-medium">highly scalable software</span>. Working alongside AI Agents to build robust, secure, and resilient microservices infrastructure ready to handle millions of Enterprise requests.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
