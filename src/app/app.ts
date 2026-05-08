import { ChangeDetectionStrategy, Component, afterNextRender, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

type Service = {
  title: string;
  description: string;
  highlight: string;
};

type Project = {
  name: string;
  url: string;
  domain: string;
  summary: string;
};

type TechGroup = {
  label: string;
  items: string[];
};

type Capability = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  badge: string;
};

type Collaborator = {
  name: string;
  title: string;
};

type AnimatedStat = {
  label: string;
  suffix: string;
  value: number;
  target: number;
};

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class App {
  // Nome studio centralizzato in un signal per riusarlo in hero, navbar e footer.
  protected readonly studioName = signal('Team Raro');

  // Stato visivo della pagina: serve per far reagire navbar e animazioni allo scroll/render.
  protected readonly hasScrolled = signal(false);
  protected readonly pageReady = signal(false);

  // I due collaboratori freelance vengono presentati con ruolo accademico/professionale, non con stack separati.
  protected readonly collaborators = signal<Collaborator[]>([
    {
      name: 'Roki Rrotani',
      title: 'Ingegnere informatico',
    },
    {
      name: 'Alessandro Olivero',
      title: 'Dottore in Informatica',
    },
  ]);

  // Servizi principali presentati nella vetrina.
  protected readonly services = signal<Service[]>([
    {
      title: 'Siti Vetrina ad Alto Impatto',
      description: 'Landing page e siti corporate per attività che vogliono presentarsi con ordine, personalità e autorevolezza.',
      highlight: 'Aziende, professionisti, studi e brand locali',
    },
    {
      title: 'Ristorazione & Locali',
      description: 'Siti per bar, locali, ristoranti e pizzerie con attenzione a atmosfera, leggibilità, velocità e fruizione mobile.',
      highlight: 'Bar, ristoranti, pizzerie, hospitality',
    },
    {
      title: 'Restyling Moderni',
      description: 'Ridisegniamo siti datati trasformandoli in presenze digitali più eleganti, reattive e credibili.',
      highlight: 'Refresh visuale, UX e performance',
    },
  ]);

  // Portfolio iniziale con URL corretti e descrizioni più professionali.
  protected readonly projects = signal<Project[]>([
    {
      name: 'Immobiliare Fides',
      url: 'https://www.immobiliarefides.com/',
      domain: 'Agenzia Immobiliare',
      summary: 'Presenza digitale elegante e orientata alla fiducia per il settore immobiliare.',
    },
    {
      name: 'Caffè Pellico',
      url: 'https://www.caffepellico.it',
      domain: 'Food & Beverage',
      summary: 'Sito pensato per rafforzare identità, atmosfera e percezione del locale.',
    },
    {
      name: 'Alkimia Saluzzo',
      url: 'https://www.alkimiasaluzzo.it',
      domain: 'Business Presence',
      summary: 'Esperienza web pulita e leggibile, costruita per raccontare servizi e brand con chiarezza.',
    },
  ]);

  // Stack diviso per aree per rendere la lettura immediata e più professionale.
  protected readonly techGroups = signal<TechGroup[]>([
    {
      label: 'Frontend',
      items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS puro', 'UI systems'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Java', 'Python', 'Rust', 'C', 'C++', 'C#', 'REST API'],
    },
    {
      label: 'Database',
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      label: 'AI, ML & Data',
      items: ['AI/ML', 'Big Data', 'Data Engineering', 'Analytics', 'LLM Apps', 'Automation'],
    },
    {
      label: 'Tooling & Delivery',
      items: ['Git', 'Responsive Design', 'SEO base', 'Deploy VPS', 'Performance tuning', 'Docker', 'CI/CD'],
    },
  ]);

  // Blocco istituzionale che sostituisce la vecchia sezione con competenze divise per persona.
  protected readonly studioHighlights = signal([
    'Due collaboratori freelance con sede a Torino, operativi su Torino e Provincia di Cuneo.',
    'Esperienze responsive progettate per funzionare bene su desktop, tablet e mobile.',
    'Approccio completo allo sviluppo: frontend, backend, dati, AI, integrazione e messa online.',
  ]);

  // Sezione visuale supportata da immagini reali per comunicare aree chiave dello studio.
  protected readonly capabilities = signal<Capability[]>([
    {
      title: 'Sicurezza e affidabilità',
      description: 'Progettiamo siti con attenzione a struttura, stabilità e protezione dei dati, perché la credibilità passa anche da come vengono trattate sicurezza e fiducia digitale.',
      imageSrc: 'foto_sicurezza_informatica.jpg',
      imageAlt: 'Visual tecnologico che richiama sicurezza informatica e protezione dei sistemi digitali.',
      width: 6016,
      height: 4016,
      badge: 'Security First',
    },
    {
      title: 'Responsive su ogni piattaforma',
      description: 'Pensiamo sempre al mobile e al responsive: i nostri siti sono ottimizzati per PC, tablet e smartphone, con layout leggibili e fluidi in ogni contesto d’uso.',
      imageSrc: 'mobile.JPG',
      imageAlt: 'Dispositivo mobile in stile futuristico che rappresenta responsive design e ottimizzazione multi piattaforma.',
      width: 5472,
      height: 3648,
      badge: 'Mobile Optimized',
    },
    {
      title: 'Visione aggiornata e web 3.0',
      description: 'Seguiamo linguaggi, interfacce e trend emergenti per costruire presenze digitali attuali, con una sensibilità rivolta anche ai mondi web3, innovazione e nuove esperienze online.',
      imageSrc: 'web3punto0.jpg',
      imageAlt: 'Scenario digitale futuristico che richiama innovazione, sistemi connessi e visione web 3.0.',
      width: 6560,
      height: 4373,
      badge: 'Always Updated',
    },
  ]);

  // Target dei contatori animati in hero.
  protected readonly heroStatTargets = computed<AnimatedStat[]>(() => [
    { value: 0, target: this.projects().length, suffix: '+', label: 'Progetti visibili' },
    { value: 0, target: this.services().length + this.capabilities().length, suffix: '', label: 'Aree di intervento' },
    { value: 0, target: this.techGroups().reduce((total, group) => total + group.items.length, 0), suffix: '+', label: 'Tecnologie coperte' },
  ]);

  protected readonly animatedHeroStats = signal<AnimatedStat[]>([]);

  // Claim brevi per introdurre il tono del brand nella hero.
  protected readonly spotlightPills = signal<string[]>([
    'Collaboratori freelance',
    'Responsive mobile-first',
    'Design sobrio e distintivo',
    'AI, ML & Big Data',
    'Performance e chiarezza',
  ]);

  constructor() {
    afterNextRender(() => {
      this.syncAnimatedStats();
      this.animateHeroStats();
      this.onWindowScroll();
      this.pageReady.set(true);
    });
  }

  protected onWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.hasScrolled.set(window.scrollY > 72);
  }

  private syncAnimatedStats(): void {
    this.animatedHeroStats.set(
      this.heroStatTargets().map((stat) => ({
        ...stat,
        value: 0,
      })),
    );
  }

  private animateHeroStats(): void {
    const targets = this.heroStatTargets();

    if (typeof window === 'undefined' || typeof performance === 'undefined') {
      this.animatedHeroStats.set(targets);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.animatedHeroStats.set(
        targets.map((stat) => ({
          ...stat,
          value: Math.round(stat.target * eased),
        })),
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}
