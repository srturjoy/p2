import { useLanguage } from '@/contexts/LanguageContext';

const tools = [
  { name: 'Meta Ads', icon: '📣' },
  { name: 'Google Ads', icon: '🔍' },
  { name: 'YouTube Ads', icon: '▶️' },
  { name: 'GA4 Analytics', icon: '📊' },
  { name: 'Power BI', icon: '📈' },
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Meta CAPI', icon: '🔗' },
  { name: 'HubSpot CRM', icon: '🤝' },
  { name: 'Looker Studio', icon: '🎯' },
  { name: 'TikTok Ads', icon: '🎵' },
  { name: 'LinkedIn Ads', icon: '💼' },
  { name: 'Klaviyo', icon: '📧' },
  { name: 'GPT-4 AI', icon: '🤖' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'Shopify', icon: '🛒' },
];

const ToolItem = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-2 mx-6 px-4 py-2 rounded-full bg-card/60 border border-border/60 backdrop-blur-sm shrink-0 group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
    <span className="text-base" role="img" aria-hidden="true">{icon}</span>
    <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{name}</span>
  </div>
);

export default function Marquee() {
  const { t } = useLanguage();
  const doubled = [...tools, ...tools];

  return (
    <section aria-label="Tools and platforms" className="py-10 bg-background border-y border-border/40 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="mb-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">{t('marqueeLabel')}</p>
      </div>

      <div className="flex items-center" style={{ animation: 'marquee-scroll 40s linear infinite' }}>
        {doubled.map((tool, i) => (
          <ToolItem key={i} name={tool.name} icon={tool.icon} />
        ))}
      </div>
    </section>
  );
}
