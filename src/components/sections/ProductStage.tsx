import React from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, Lock, Database, Globe, Layers, Cpu, Server, ArrowRight, ArrowUpRight, Activity, Users, Clock } from 'lucide-react';
import { 
  ProductData, 
  HeadingBlock, 
  TextBlock, 
  ListBlock, 
  MediaBlock, 
  ButtonBlock 
} from '../../types/product-showcase';
import { productsData } from '../../data/products';

const IconMap: Record<string, any> = {
  Check, Shield, Zap, Lock, Database, Globe, Layers, Cpu, Server, ArrowRight, ArrowUpRight, Activity, Users, Clock
};

const ProductCard: React.FC<{ product: ProductData; index: number }> = ({ product, index }) => {
  const heading = product.blocks.find((b): b is HeadingBlock => b.type === 'heading');
  const text = product.blocks.find((b): b is TextBlock => b.type === 'text');
  const list = product.blocks.find((b): b is ListBlock => b.type === 'list');
  const media = product.blocks.find((b): b is MediaBlock => b.type === 'media');
  const button = product.blocks.find((b): b is ButtonBlock => b.type === 'button');

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="dna-glass-card rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[500px] group"
    >
      {/* Content Side */}
      <div className={`flex-1 p-8 md:p-16 flex flex-col justify-center ${!isEven ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="value-tag border-brand-accent/20 text-brand-accent/80 bg-brand-accent/5">
            {product.slug.replace(/-/g, ' ')}
          </div>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        
        <h3 className="text-3xl md:text-5xl font-serif font-normal text-white mb-6 tracking-tight leading-tight">
          {heading?.text}
        </h3>
        
        <p className="text-brand-gray text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
          {text?.text}
        </p>
        
        {list && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
            {list.items.map((item, i) => {
              const iconName = list.icons?.[i] || list.icon || 'Check';
              const Icon = IconMap[iconName] || Check;
              return (
                <div key={i} className="flex items-start gap-4 group/item">
                  <div className="luminous-icon w-10 h-10 shrink-0">
                    <Icon className="w-5 h-5 text-brand-accent/70" />
                  </div>
                  <span className="text-sm md:text-base text-brand-offwhite/70 font-light leading-snug pt-1">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {button && (
          <a 
            href={button.url}
            className="group/btn inline-flex items-center gap-3 text-white font-medium text-lg hover:text-brand-accent transition-colors duration-300"
            aria-label={`${button.label} for ${heading?.text}`}
          >
            <span className="relative">
              {button.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover/btn:w-full" />
            </span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
          </a>
        )}
      </div>

      {/* Media Side */}
      <div className={`lg:w-[45%] relative overflow-hidden bg-brand-darker/40 border-white/5 ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'}`}>
        {media && (
          <div className="absolute inset-0">
            <img
              src={media.url}
              alt={media.alt}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            {/* Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent lg:bg-gradient-to-r ${isEven ? 'lg:from-brand-bg/40' : 'lg:to-brand-bg/40'}`} />
            <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay" />
          </div>
        )}
        
        {/* Decorative Element */}
        <div className="absolute bottom-8 right-8 text-white/5 font-mono text-8xl font-bold select-none pointer-events-none">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

export const ProductStage: React.FC = () => {
  return (
    <section id="products" className="relative w-full bg-brand-bg border-t border-white/5 py-32 z-20">
      {/* Top Border Glow */}
      <div 
        className="absolute top-0 inset-x-0 h-40 bg-brand-accent/10 blur-[60px] pointer-events-none -translate-y-1/2 z-20"
        style={{ clipPath: 'inset(-100% -100% 50% -100%)' }}
      />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-serif font-normal text-white mb-8 tracking-tight leading-[1.1]">
              Proprietary <br />
              <span className="italic text-white/80">Solutions.</span>
            </h2>
            <p className="text-brand-gray text-xl font-light leading-relaxed">
              Engineered for the Enterprise. Our products bridge the gap between static corporate knowledge and autonomous AI execution.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-6" />
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {productsData.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
