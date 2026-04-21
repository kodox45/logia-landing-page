import React from 'react';
import { Linkedin, Github, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030304] border-t border-white/5 pt-16 pb-10 relative z-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/Logo.png"
                alt="Logia Initiative"
                className="h-7 brightness-0 invert"
              />
            </div>
            <p className="text-brand-gray text-base leading-relaxed max-w-sm font-light">
              AI-Driven Software Engineering Company.<br />
              Developing high-end software through the synergy of Humans and Agentic AI.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-5 items-center">
                <a href="https://www.linkedin.com/company/logia-initiative/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/kodox45" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all duration-300" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-0.5">
                <a href="mailto:logiainitiative@gmail.com" className="text-brand-gray/70 hover:text-brand-accent text-xs font-light transition-colors block">
                  logiainitiative@gmail.com
                </a>
                <p className="text-brand-gray/30 text-xs font-light">South Tangerang, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Products</h4>
              <ul className="space-y-4">
                {['Enterprise Audit', 'Agentic Engine', 'SME SaaS', 'Custom Dev'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-brand-gray hover:text-brand-accent text-sm transition-colors font-light flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-accent mr-0 group-hover:mr-2 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-4">
                {[
                  { label: 'About Us', href: '#about' },
                  { label: 'Methodology', href: '#methodology' },
                  { label: 'Market', href: '#market' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-brand-gray hover:text-brand-accent text-sm transition-colors font-light flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-accent mr-0 group-hover:mr-2 transition-all duration-300" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Newsletter</h4>
              <p className="text-brand-gray text-xs font-light leading-relaxed mb-4">
                Stay updated with our latest AI breakthroughs.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent/50 transition-all"
                  aria-label="Newsletter Email Address"
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-accent hover:text-white transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-widest">
            &copy; 2026 Logia Initiative. All Rights Reserved.
          </div>
          
          <div className="flex gap-8 text-[10px] font-mono text-brand-gray/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
