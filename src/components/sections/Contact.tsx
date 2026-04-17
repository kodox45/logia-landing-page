import React from 'react';
import { motion } from 'motion/react';
import { Globe, Lock, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative z-10 bg-brand-bg overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Narrative */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-mono uppercase tracking-widest mb-8">
              Initiation
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-normal text-white mb-8 tracking-tight leading-[1.1]">
              Start Your <br />
              <span className="italic text-white/80">Transformation.</span>
            </h2>
            <p className="text-brand-gray text-xl font-light leading-relaxed mb-12">
              Whether you are a corporation needing an Autonomous GRC System or an enterprise looking to modernize legacy infrastructure. Let's start the dialogue.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="luminous-icon w-12 h-12 shrink-0">
                  <Globe className="w-6 h-6 text-brand-accent/70" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Global Operations</h4>
                  <p className="text-brand-gray/60 text-sm font-light">Available for worldwide deployment and remote strategic consulting.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="luminous-icon w-12 h-12 shrink-0">
                  <Lock className="w-6 h-6 text-brand-accent/70" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Secure Protocol</h4>
                  <p className="text-brand-gray/60 text-sm font-light">All communications are handled through encrypted enterprise channels.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dna-glass-card rounded-[2.5rem] p-8 md:p-12"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-white/10" 
                      placeholder="Enterprise Corp"
                      aria-label="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">Corporate Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-white/10" 
                      placeholder="john@enterprise.com"
                      aria-label="Corporate Email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">Primary Focus</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all appearance-none"
                    aria-label="Primary Focus"
                  >
                    <option className="bg-brand-bg">Logia AI Enterprise Audit (GRC Product)</option>
                    <option className="bg-brand-bg">Custom Enterprise Software Development</option>
                    <option className="bg-brand-bg">Data & System Architecture Consulting</option>
                    <option className="bg-brand-bg">SMB Ecosystem / SaaS Services</option>
                  </select>
                </div>

                <button 
                  className="w-full group relative overflow-hidden rounded-xl bg-white p-px transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                  aria-label="Schedule a Discussion"
                >
                  <div className="relative flex items-center justify-center gap-3 bg-brand-bg group-hover:bg-transparent px-8 py-4 rounded-[11px] transition-all duration-300">
                    <span className="text-white group-hover:text-brand-bg font-bold tracking-tight">Schedule a Discussion</span>
                    <ArrowRight className="w-5 h-5 text-brand-accent group-hover:text-brand-bg transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
