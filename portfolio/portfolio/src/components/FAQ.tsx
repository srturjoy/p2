import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqs = [
  { q: 'faqQ1', a: 'faqA1' },
  { q: 'faqQ2', a: 'faqA2' },
  { q: 'faqQ3', a: 'faqA3' },
  { q: 'faqQ4', a: 'faqA4' },
  { q: 'faqQ5', a: 'faqA5' },
  { q: 'faqQ6', a: 'faqA6' },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-border/60 rounded-2xl overflow-hidden bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-6 text-left gap-4 group"
      >
        <span className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {t(q)}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
        }`}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-border/40 pt-4">
              {t(a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const { ref } = useScrollAnimation(true, '-80px');

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14" ref={ref}>
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
            {t('faqBadge')}
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('faqHeading').split('Asked')[0]}<span className="text-gradient">Asked</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">{t('faqSubtext')}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            {t('faqCta')}{' '}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              {t('faqCtaLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
