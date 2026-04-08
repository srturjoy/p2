import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Mail, Phone, MapPin, ArrowRight, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

const quickLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'experience', path: '/experience' },
  { key: 'contact', path: '/contact' },
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/siddiqurrahman', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/60 hover:shadow-[0_0_12px_rgba(96,165,250,0.4)]' },
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500 hover:border-blue-500/60 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-400/60 hover:shadow-[0_0_12px_rgba(236,72,153,0.4)]' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter / X', color: 'hover:text-sky-400 hover:border-sky-400/60 hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]' },
  { icon: FaWhatsapp, href: 'https://wa.me/8801518961899', label: 'WhatsApp', color: 'hover:text-green-400 hover:border-green-400/60 hover:shadow-[0_0_12px_rgba(74,222,128,0.4)]' },
];

export default function Footer() {
  const { t } = useLanguage();
  const { ref, isInView } = useScrollAnimation(true, '-60px');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'hsl(222 50% 3%)' }}>
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-primary/60 blur-sm" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="pt-16 pb-12 grid md:grid-cols-12 gap-12"
        >
          {/* Brand + Newsletter — 5 cols */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <Link href="/" className="text-3xl font-display font-bold tracking-tighter text-gradient mb-1 block">
                SR.
              </Link>
              <motion.a
                href="https://boostingagencyofficial.site/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Boosting Agency BD"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors mb-3 group"
                whileHover={{ x: 2 }}
              >
                Boosting Agency BD
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mt-2">
                {t('footerTagline')}. Helping brands scale profitably through data-driven performance marketing, advanced analytics, and AI-powered automation.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground ${color} transition-all border border-border/50`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-card/30 border border-border/40 rounded-2xl p-5 backdrop-blur-sm">
              <h4 className="text-foreground font-bold text-sm mb-1">{t('footerNewsletterTitle')}</h4>
              <p className="text-muted-foreground text-xs mb-4">{t('footerNewsletterDesc')}</p>
              {submitted ? (
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✓</span>
                  {t('footerNewsletterSuccess')}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('footerEmailPlaceholder')}
                    className="flex-1 bg-background/50 border-border/60 text-sm h-9"
                    required
                    aria-label="Email address for newsletter"
                  />
                  <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 h-9 shrink-0" aria-label="Subscribe">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links — 3 cols */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-foreground font-bold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-border/40">{t('footerQuickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </motion.span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info — 3 cols */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-foreground font-bold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-border/40">{t('contactBadge')}</h4>
            <ul className="space-y-4">
              <li>
                <motion.a
                  href="mailto:turjoy144@gmail.com"
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 2 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t('contactEmail')}</p>
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors break-all">turjoy144@gmail.com</p>
                  </div>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="tel:+8801518961899"
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 2 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t('contactPhone')}</p>
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">+880 1518 961899</p>
                  </div>
                </motion.a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 border border-border/50">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t('contactLocation')}</p>
                    <p className="text-sm text-foreground">{t('contactLocationValue')}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t('availabilityValue')}</p>
                  </div>
                </div>
              </li>
              <li>
                <motion.a
                  href="https://boostingagencyofficial.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Boosting Agency BD website"
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 2 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Agency</p>
                    <p className="text-sm text-primary group-hover:text-accent transition-colors font-semibold">Boosting Agency BD</p>
                  </div>
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">{t('footerCopy')}</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a
              href="https://boostingagencyofficial.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold text-xs hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Boosting Agency BD
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
