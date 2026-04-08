import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

function WhatsAppGlowButton({ number }: { number: string }) {
  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-3 group relative overflow-hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Animated glow rings */}
      <span className="absolute inset-0 rounded-2xl pointer-events-none">
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-green-400/40"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-2xl border border-green-400/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
      </span>
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0"
        animate={{ boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 18px rgba(34,197,94,0.6)', '0 0 0px rgba(34,197,94,0)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FaWhatsapp className="w-5 h-5 text-green-400" />
      </motion.div>
      <div className="relative z-10">
        <div className="text-sm font-bold text-green-400">WhatsApp</div>
        <div className="text-xs text-muted-foreground">+880 1518 961899</div>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const { ref, isInView } = useScrollAnimation(true, "-50px");
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = language === 'bn'
      ? `হ্যালো সিদ্দিকুর, আমি ${name}। ইমেইল: ${email}। ${message}`
      : `Hello Siddiqur, I am ${name}. Email: ${email}. ${message}`;
    window.open(`https://wa.me/8801518961899?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputClass = (field: string) =>
    `w-full bg-background/50 border rounded-xl px-4 py-4 text-foreground placeholder-transparent transition-all duration-300 outline-none focus:ring-2 ${
      focused === field
        ? 'border-primary ring-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
        : 'border-border hover:border-border/80'
    }`;

  const labelClass = (field: string, hasValue: boolean) =>
    `absolute left-4 transition-all duration-200 pointer-events-none ${
      focused === field || hasValue
        ? 'top-1.5 text-xs font-semibold text-primary'
        : 'top-4 text-sm text-muted-foreground'
    }`;

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
              {t('contactBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t('contactHeading').split('Something')[0]}<span className="text-gradient">Something Great.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md">{t('contactSubtext')}</p>

            <div className="space-y-5 mb-8">
              {[
                { icon: Mail, label: t('contactEmail'), value: 'turjoy144@gmail.com', href: 'mailto:turjoy144@gmail.com' },
                { icon: Phone, label: t('contactPhone'), value: '+880 1518 961899', href: 'tel:+8801518961899' },
                { icon: MapPin, label: t('contactLocation'), value: t('contactLocationValue'), href: null },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-foreground font-semibold">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium WhatsApp CTA */}
            <div className="mb-10">
              <WhatsAppGlowButton number="8801518961899" />
            </div>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: FaLinkedin, href: 'https://linkedin.com/in/siddiqurrahman', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/50' },
                { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500 hover:border-blue-500/50' },
                { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400 hover:border-sky-400/50' },
                { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500 hover:border-pink-500/50' },
                { icon: FaWhatsapp, href: 'https://wa.me/8801518961899', label: 'WhatsApp', color: 'hover:text-green-400 hover:border-green-400/50' },
              ].map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground ${color} transition-all hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: WhatsApp Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-card-border rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/8 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"
                  animate={{ boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 16px rgba(34,197,94,0.5)', '0 0 0px rgba(34,197,94,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaWhatsapp className="w-5 h-5 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t('sendMessage')}</h3>
                  <p className="text-xs text-muted-foreground">{t('whatsappNote')}</p>
                </div>
              </div>

              <form onSubmit={handleWhatsApp} className="space-y-5" noValidate>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder={t('yourName')}
                    className={inputClass('name')}
                    data-testid="input-contact-name"
                  />
                  <label htmlFor="name" className={labelClass('name', !!name)}>{t('yourName')}</label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder={t('yourEmail')}
                    className={inputClass('email')}
                    data-testid="input-contact-email"
                  />
                  <label htmlFor="email" className={labelClass('email', !!email)}>{t('yourEmail')}</label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={4}
                    placeholder={t('yourMessage')}
                    className={`${inputClass('message')} resize-none`}
                    data-testid="textarea-contact-message"
                  />
                  <label htmlFor="message" className={labelClass('message', !!message)}>{t('yourMessage')}</label>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    className="w-full h-13 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-xl shadow-[0_0_24px_rgba(34,197,94,0.35)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 gap-2"
                    data-testid="button-contact-whatsapp"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    {t('sendWhatsApp')}
                  </Button>
                </motion.div>

                <p className="text-center text-xs text-muted-foreground">{t('whatsappDisclaimer')}</p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
