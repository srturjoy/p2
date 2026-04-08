import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Award, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import faceImage from "@assets/380336355_1499215867326714_6191628112571812370_n_1775662985743.jpg";
import silhouetteImage from "@assets/WhatsApp_Image_2026-04-06_at_01.12.44_1775662980513.jpeg";

const highlights = [
  { icon: TrendingUp, value: '5+', label: 'Years Experience', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Users, value: '50+', label: 'Happy Clients', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: Award, value: '$2M+', label: 'Ad Spend Managed', color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

export default function About() {
  const { ref, isInView } = useScrollAnimation(true, "-100px");
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-md mx-auto">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-2xl relative">
                <img
                  src={faceImage}
                  alt="Siddiqur Rahman — Digital Marketing Strategist & Founder of Boosting Agency BD"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" aria-hidden="true" />

                <div className="absolute bottom-6 left-6 right-6 bg-card/80 backdrop-blur-md rounded-xl p-4 border border-border/60 shadow-xl">
                  <div className="flex items-center justify-between">
                    {highlights.map((h, i) => (
                      <div key={i} className="text-center flex-1">
                        <div className={`w-8 h-8 rounded-lg ${h.bg} flex items-center justify-center mx-auto mb-1.5`}>
                          <h.icon className={`w-4 h-4 ${h.color}`} aria-hidden="true" />
                        </div>
                        <div className={`text-lg font-display font-bold ${h.color}`}>{h.value}</div>
                        <div className="text-[10px] text-muted-foreground font-medium leading-tight">{h.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-xl overflow-hidden border border-border shadow-xl hidden md:block"
              >
                <img
                  src={silhouetteImage}
                  alt="Siddiqur Rahman — Dark atmospheric portrait"
                  loading="lazy"
                  decoding="async"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-2">
              {t('aboutBadge')}
            </div>
            <h2 id="about-heading" className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('aboutHeading').split('Through')[0]}<span className="text-gradient">Through Data.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p>{t('aboutP3')}</p>
            </div>

            {/* Boosting Agency BD badge with link */}
            <motion.a
              href="https://boostingagencyofficial.site/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Boosting Agency BD website"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 py-3 px-4 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-sm hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-xs" aria-hidden="true">BD</span>
              </div>
              <div className="flex-1">
                <span className="text-primary font-bold text-sm">Boosting Agency BD</span>
                <p className="text-xs text-muted-foreground">{t('heroTitle4')}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" aria-hidden="true" />
            </motion.a>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-border rounded-xl p-4 bg-card/50 backdrop-blur-sm">
                <h4 className="text-foreground font-bold mb-1 text-sm">{t('availability')}</h4>
                <p className="text-sm text-muted-foreground">{t('availabilityValue')}</p>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/50 backdrop-blur-sm">
                <h4 className="text-foreground font-bold mb-1 text-sm">{t('languages')}</h4>
                <p className="text-sm text-muted-foreground">{t('languagesValue')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/Siddiqur-Rahman-CV.pdf"
                download
                aria-label="Download Siddiqur Rahman's resume"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-7 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_32px_rgba(59,130,246,0.6)] transition-shadow font-semibold gap-2"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  {t('downloadCV')}
                </Button>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
