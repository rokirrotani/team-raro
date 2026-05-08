import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

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

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Nome studio centralizzato in un signal per riusarlo in hero, navbar e footer.
  protected readonly studioName = signal('Team Raro');

  // I nomi del team vengono usati nel copy istituzionale, senza separare competenze personali.
  protected readonly founders = signal(['Rrotani Roki', 'Alessandro Olivero']);

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
      items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS puro'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Java', 'Python', 'Rust', 'C', 'C++', 'C#'],
    },
    {
      label: 'Database',
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'MongoDB'],
    },
    {
      label: 'Tooling & Delivery',
      items: ['Git', 'REST API', 'Responsive Design', 'SEO base', 'Deploy VPS', 'Performance tuning'],
    },
  ]);

  // Blocco istituzionale che sostituisce la vecchia sezione con competenze divise per persona.
  protected readonly studioHighlights = signal([
    'Siti corporate e vetrina con identità visiva chiara, pulita e affidabile.',
    'Esperienze responsive progettate per funzionare bene su desktop, tablet e mobile.',
    'Approccio completo allo sviluppo: frontend, backend, dati, integrazione e messa online.',
  ]);

  // Computed: Angular ricalcola questi numeri quando cambiano i dati sorgente.
  protected readonly heroStats = computed(() => [
    { value: `${this.projects().length}+`, label: 'Progetti visibili' },
    { value: `${this.services().length}`, label: 'Linee di servizio' },
    { value: `${this.techGroups().reduce((total, group) => total + group.items.length, 0)}+`, label: 'Tecnologie coperte' },
  ]);

  // Claim brevi per introdurre il tono del brand nella hero.
  protected readonly spotlightPills = signal<string[]>([
    'Siti vetrina professionali',
    'Responsive mobile-first',
    'Design sobrio e distintivo',
    'Frontend & full stack',
    'Performance e chiarezza',
  ]);
}
