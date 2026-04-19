import React from 'react';
import { motion } from 'motion/react';

export const Market: React.FC = () => {
  return (
    <section id="market" className="py-32 relative z-10 overflow-hidden bg-brand-bg">
      {/* Background Image with Brightened Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/market.png"
          alt="Market Background"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        {/* Brighter Vignette / Seamless Blending Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent/20 to-brand-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/40 via-transparent to-brand-bg/40" />
        <div className="absolute inset-0 bg-brand-bg/10" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono uppercase tracking-widest mb-6">
            Strategic Ecosystem
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-normal text-white mb-6 tracking-tight">Market Reach</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Our philosophy: Enterprise-grade technology shouldn't only be accessible to giant corporations. We democratize software architecture across all business echelons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Enterprise Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col min-h-[600px]"
          >
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/enterprise.png"
                alt="Enterprise Scale"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {/* Dark Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-10 md:p-12 flex flex-col h-full">
              <div className="mb-auto">
                <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                  Macro Scale
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-normal text-white mb-6 tracking-tight leading-tight">
                  Mid-to-Large <br /> Enterprises
                </h3>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md font-light">
                  Serving companies with complex organizational structures requiring absolute reliability, deep customization, and seamless integration across hundreds of internal systems.
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/10">
                <span className="block text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-4">Engagement Methods</span>
                <div className="flex flex-wrap gap-2">
                  {['Dedicated Teams', 'Strict SLA Contracts', 'Private Cloud'].map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-white/80 font-medium">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SMB Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col min-h-[600px]"
          >
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/smb.png"
                alt="SMB Scale"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {/* Dark Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-10 md:p-12 flex flex-col h-full">
              <div className="mb-auto">
                <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                  Micro Scale
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-normal text-white mb-6 tracking-tight leading-tight">
                  SMB Consulting <br /> & SaaS
                </h3>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md font-light">
                  Providing ready-to-use, highly affordable Software as a Service (SaaS) products that resolve core operational bottlenecks for Small & Medium Businesses.
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/10">
                <span className="block text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-4">Engagement Methods</span>
                <div className="flex flex-wrap gap-2">
                  {['SaaS Subscriptions', 'Agile Consulting', 'Digital Transformation'].map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-white/80 font-medium">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
