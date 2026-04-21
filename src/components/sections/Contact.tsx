import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Lock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WA_HREF = `https://wa.me/6281318732870?text=${encodeURIComponent(
  "Hello Logia Initiative! I found your website and I'm interested in learning more about your services. I'd love to discuss a potential collaboration."
)}`;

interface FormData {
  contactPerson: string;
  company: string;
  email: string;
  phone: string;
  primaryFocus: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  contactPerson: '',
  company: '',
  email: '',
  phone: '',
  primaryFocus: 'Logia AI Enterprise Audit (GRC Product)',
  message: '',
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Required';
    if (!formData.company.trim()) errs.company = 'Required';
    if (!formData.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    setSubmitError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7d755ee3-faa9-4ae3-a334-165cd2d2f0cf',
          subject: `New Inquiry — ${formData.company}`,
          from_name: formData.contactPerson,
          email: formData.email,
          message: [
            `Contact Person : ${formData.contactPerson}`,
            `Company        : ${formData.company}`,
            `Email          : ${formData.email}`,
            `Phone/WhatsApp : ${formData.phone || '—'}`,
            `Primary Focus  : ${formData.primaryFocus}`,
            `Message        : ${formData.message || '—'}`,
          ].join('\n'),
        }),
      });
      const data = await res.json();
      if (data.success) setIsSuccess(true);
      else setSubmitError('Submission failed. Please try again.');
    } catch {
      setSubmitError('Connection error. Please try again or reach us via WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    } rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-white/20`;

  return (
    <section id="contact" className="py-32 relative z-10 bg-brand-bg overflow-hidden">
      {/* Background Glow */}
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
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              className="dna-glass-card rounded-[2.5rem] p-8 md:p-12"
            >
              <AnimatePresence mode="wait">

                {/* Success State */}
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-6"
                  >
                    <div className="luminous-icon w-20 h-20">
                      <CheckCircle2 className="w-10 h-10 text-brand-accent" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-serif font-normal text-white">Inquiry Received</h3>
                      <p className="text-brand-gray/70 font-light leading-relaxed max-w-sm mx-auto">
                        Thank you for reaching out. We'll be in touch within 24–48 business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => { setIsSuccess(false); setFormData(INITIAL_FORM); setErrors({}); setSubmitError(''); }}
                      className="text-sm text-brand-accent/60 hover:text-brand-accent transition-colors font-mono tracking-wide mt-2"
                    >
                      ← Send another inquiry
                    </button>
                  </motion.div>
                ) : (

                  /* Form State */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                      {/* Row 1: Contact Person + Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contactPerson" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                            Contact Person <span className="text-brand-accent/50">*</span>
                          </label>
                          <input
                            id="contactPerson"
                            type="text"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            className={inputClass('contactPerson')}
                            placeholder="John Smith"
                          />
                          {errors.contactPerson && (
                            <p className="text-xs text-red-400/80 mt-1 ml-1">{errors.contactPerson}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                            Company / Organization <span className="text-brand-accent/50">*</span>
                          </label>
                          <input
                            id="company"
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={inputClass('company')}
                            placeholder="Enterprise Corp"
                          />
                          {errors.company && (
                            <p className="text-xs text-red-400/80 mt-1 ml-1">{errors.company}</p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Email + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                            Business Email <span className="text-brand-accent/50">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass('email')}
                            placeholder="john@enterprise.com"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400/80 mt-1 ml-1">{errors.email}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                            Phone / WhatsApp{' '}
                            <span className="text-white/20 normal-case font-normal tracking-normal">(optional)</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass('phone')}
                            placeholder="+62 812 3456 7890"
                          />
                        </div>
                      </div>

                      {/* Row 3: Primary Focus */}
                      <div className="space-y-2">
                        <label htmlFor="primaryFocus" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                          Primary Focus <span className="text-brand-accent/50">*</span>
                        </label>
                        <select
                          id="primaryFocus"
                          name="primaryFocus"
                          value={formData.primaryFocus}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all appearance-none cursor-pointer"
                          aria-label="Primary Focus"
                        >
                          <option className="bg-brand-bg">Logia AI Enterprise Audit (GRC Product)</option>
                          <option className="bg-brand-bg">Custom Enterprise Software Development</option>
                          <option className="bg-brand-bg">Data &amp; System Architecture Consulting</option>
                          <option className="bg-brand-bg">SMB Ecosystem / SaaS Services</option>
                        </select>
                      </div>

                      {/* Row 4: Brief Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest ml-1">
                          Brief Message{' '}
                          <span className="text-white/20 normal-case font-normal tracking-normal">(optional)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          maxLength={300}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-white/20 resize-none"
                          placeholder="Tell us briefly about your needs or goals..."
                          aria-label="Brief Message"
                        />
                        <p className="text-[10px] text-white/20 text-right mr-1 font-mono">
                          {formData.message.length}/300
                        </p>
                      </div>

                      {/* Row 5: Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">

                        {/* Primary: Initiate Collaboration */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 group relative overflow-hidden rounded-xl bg-white p-px transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Initiate Collaboration"
                        >
                          <div className="relative flex items-center justify-center gap-3 bg-brand-bg group-hover:bg-transparent px-8 py-4 rounded-[11px] transition-all duration-300">
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                                <span className="text-white font-bold tracking-tight">Sending...</span>
                              </>
                            ) : (
                              <>
                                <span className="text-white group-hover:text-brand-bg font-bold tracking-tight">Initiate Collaboration</span>
                                <ArrowRight className="w-5 h-5 text-brand-accent group-hover:text-brand-bg transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </div>
                        </button>

                        {/* Secondary: WhatsApp */}
                        <a
                          href={WA_HREF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/60 transition-all duration-300 font-medium text-sm tracking-wide whitespace-nowrap"
                          aria-label="Chat on WhatsApp"
                        >
                          <WhatsAppIcon className="w-4 h-4 shrink-0" />
                          Chat on WhatsApp
                        </a>
                      </div>

                      {/* Submit Error */}
                      {submitError && (
                        <p className="text-xs text-red-400/80 text-center">{submitError}</p>
                      )}

                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
