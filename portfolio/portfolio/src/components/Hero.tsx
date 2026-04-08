import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from "@assets/380336355_1499215867326714_6191628112571812370_n_1775662985743.jpg";

function TypewriterText({ texts }: { texts: string[] }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[textIndex];

    if (phase === 'typing') {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 55);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 2000);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 28);
      } else {
        setTextIndex(i => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, textIndex, texts]);

  return (
    <span className="text-gradient">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block ml-0.5 w-0.5 h-[1em] bg-primary align-middle"
        aria-hidden="true"
      />
    </span>
  );
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Hero() {
  const { t, language } = useLanguage();

  const titleTexts = [
    t('heroTitle1'),
    t('heroTitle2'),
    t('heroTitle3'),
    t('heroTitle4'),
  ];

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" aria-label="Hero section" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background hero-premium-bg">

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-[35vw] h-[35vw] max-w-[480px] max-h-[480px] bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[8%] w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] bg-accent/10 rounded-full blur-[130px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-12">

        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('availableFor')}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4">
            <span className="text-foreground">{t('name')}</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 h-10 flex items-center justify-center lg:justify-start" aria-live="polite" aria-atomic="true">
            <TypewriterText key={language} texts={titleTexts} />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            {t('tagline')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link href="/portfolio">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  aria-label="View portfolio"
                  className="w-full sm:w-auto text-base font-semibold rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-shadow hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]"
                >
                  {t('viewPortfolio')}
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  aria-label="Hire Siddiqur Rahman"
                  className="w-full sm:w-auto text-base font-semibold rounded-full px-8 border-border hover:bg-secondary hover:border-primary/50 transition-all"
                >
                  {t('hireMe')}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center lg:justify-end relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-50 blur-xl animate-pulse" aria-hidden="true" />
            <div className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full p-[3px] bg-gradient-to-tr from-primary to-accent shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <div className="absolute inset-0 rounded-full bg-background m-[3px]" />
              <img
                src={heroImage}
                alt="Siddiqur Rahman — Digital Marketing Strategist & Founder of Boosting Agency BD"
                width={360}
                height={360}
                decoding="async"
                // @ts-ignore
                fetchpriority="high"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-background"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => scrollTo('trust')}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
        onKeyDown={e => e.key === 'Enter' && scrollTo('trust')}
      >
        <span className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{t('scrollDown')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
