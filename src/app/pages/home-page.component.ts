import { ChangeDetectionStrategy, Component, afterNextRender, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

type Project = {
  name: string;
  url: string;
  domain: string;
  summary: string;
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

type AnimatedStat = {
  label: string;
  suffix: string;
  value: number;
  target: number;
};

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly collaborators = signal([
    { name: 'Roki Rrotani', title: 'Ingegnere informatico' },
    { name: 'Alessandro Olivero', title: 'Dottore in Informatica' },
  ]);

  protected readonly heroTicker = signal([
    'Web design premium',
    'Landing ad alta conversione',
    'Responsive mobile-first',
    'AI, ML & Big Data',
    'Performance e chiarezza',
    'Restyling moderni',
  ]);

  protected readonly services = signal([
    {
      title: 'Siti vetrina e corporate',
      description: 'Presenze digitali pulite e credibili per aziende, studi e attività che vogliono comunicare qualità.',
      highlight: 'Brand, business, servizi',
    },
    {
      title: 'Ristorazione e locali',
      description: 'Interfacce chiare e veloci per bar, pizzerie, ristoranti e hospitality, con massima cura per mobile.',
      highlight: 'Food, bar, hospitality',
    },
    {
      title: 'Landing e restyling',
      description: 'Riprogettiamo siti datati o costruiamo landing page ad alto impatto con direzione visiva moderna.',
      highlight: 'Restyling, conversione, UX',
    },
  ]);

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

  protected readonly capabilities = signal<Capability[]>([
    {
      title: 'Sicurezza e affidabilità',
      description: 'Progettiamo siti con attenzione alla protezione dei dati, alla robustezza della struttura e alla fiducia percepita dall’utente finale.',
      imageSrc: 'foto_sicurezza_informatica.jpg',
      imageAlt: 'Visual tecnologico che richiama sicurezza informatica e protezione dei sistemi digitali.',
      width: 6016,
      height: 4016,
      badge: 'Security First',
    },
    {
      title: 'Responsive su ogni piattaforma',
      description: 'Ogni interfaccia viene pensata per desktop, tablet e smartphone, con un’esperienza coerente e leggibile.',
      imageSrc: 'mobile.JPG',
      imageAlt: 'Dispositivo mobile in stile futuristico che rappresenta responsive design e ottimizzazione multi piattaforma.',
      width: 5472,
      height: 3648,
      badge: 'Mobile Optimized',
    },
    {
      title: 'Visione aggiornata',
      description: 'Seguiamo linguaggi, interfacce e trend emergenti per costruire presenze digitali attuali e pronte ad evolvere.',
      imageSrc: 'web3punto0.jpg',
      imageAlt: 'Scenario digitale futuristico che richiama innovazione, sistemi connessi e visione web 3.0.',
      width: 6560,
      height: 4373,
      badge: 'Always Updated',
    },
  ]);

  protected readonly homeStatsVisible = signal(false);

  protected readonly heroStatTargets = computed<AnimatedStat[]>(() => [
    { value: 0, target: this.projects().length, suffix: '+', label: 'Progetti visibili' },
    { value: 0, target: this.services().length + this.capabilities().length, suffix: '', label: 'Aree di intervento' },
    { value: 0, target: 36, suffix: '+', label: 'Tecnologie coperte' },
  ]);

  protected readonly animatedHeroStats = signal<AnimatedStat[]>([]);

  constructor() {
    afterNextRender(() => {
      this.syncAnimatedStats();
      this.observeStatsSection();
    });
  }

  private syncAnimatedStats(): void {
    this.animatedHeroStats.set(
      this.heroStatTargets().map((stat) => ({
        ...stat,
        value: 0,
      })),
    );
  }

  private observeStatsSection(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
      this.homeStatsVisible.set(true);
      this.animateHeroStats();
      return;
    }

    const section = document.getElementById('home-stats');
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !this.homeStatsVisible()) {
          this.homeStatsVisible.set(true);
          this.animateHeroStats();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
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