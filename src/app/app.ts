import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type Founder = {
  name: string;
  role: string;
  focus: string;
};

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
  // Signal principale: contiene il nome dello studio e rende facile cambiare branding in futuro.
  protected readonly studioName = signal('Team Raro');

  // Qui teniamo i dati dei founder direttamente nel componente perché il sito è solo vetrina.
  protected readonly founders = signal<Founder[]>([
    {
      name: 'Rrotani Roki',
      role: 'Frontend & Creative Development',
      focus: 'Esperienze React, Angular e interfacce che convertono.',
    },
    {
      name: 'Alessandro Olivero',
      role: 'Full Stack & Delivery',
      focus: 'Architetture solide, performance, backend e messa online.',
    },
  ]);

  // Sezioni dinamiche della landing: ogni card viene renderizzata con @for nel template.
  protected readonly services = signal<Service[]>([
    {
      title: 'Siti Vetrina ad Alto Impatto',
      description: 'Landing page e siti corporate one-page o multi-sezione per aziende che vogliono un’immagine forte e chiara.',
      highlight: 'Aziende, professionisti, studi e brand locali',
    },
    {
      title: 'Ristorazione & Locali',
      description: 'Siti per bar, locali, ristoranti e pizzerie con presentazione menu, eventi, atmosfera e call to action immediate.',
      highlight: 'Bar, ristoranti, pizzerie, hospitality',
    },
    {
      title: 'Restyling Moderni',
      description: 'Prendiamo un sito datato e lo trasformiamo in un’esperienza veloce, leggibile e professionale anche da mobile.',
      highlight: 'Refresh visuale, UX e performance',
    },
  ]);

  // Portfolio iniziale: lo user aggiornerà poi con nuovi progetti o dettagli più precisi.
  protected readonly projects = signal<Project[]>([
    {
      name: 'Immobiliare Fides',
      url: 'https://www.immobliarefides.com',
      domain: 'Real Estate',
      summary: 'Presenza digitale pulita e orientata alla fiducia per il settore immobiliare.',
    },
    {
      name: 'Caffè Pellico',
      url: 'https://www.caffepellico.it',
      domain: 'Food & Beverage',
      summary: 'Identità online più calda, immediata e centrata sull’esperienza del locale.',
    },
    {
      name: 'Alkimia Saluzzo',
      url: 'https://www.alkimiasaluzzo.it',
      domain: 'Business Presence',
      summary: 'Sito elegante e leggibile pensato per raccontare brand e servizi con chiarezza.',
    },
  ]);

  // Stack diviso per aree per semplificare il rendering e per studiare come organizzare dati in Angular.
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
      items: ['MySQL', 'MariaDB', 'PostgreSQL', 'MongoDB', 'NoSQL'],
    },
    {
      label: 'Tooling & Delivery',
      items: ['Git', 'REST API', 'Responsive Design', 'SEO base', 'Deploy VPS', 'Performance tuning'],
    },
  ]);

  // Computed: Angular ricalcola questi numeri automaticamente quando cambiano i signal da cui dipendono.
  protected readonly heroStats = computed(() => [
    { value: `${this.projects().length}+`, label: 'Progetti visibili' },
    { value: `${this.services().length}`, label: 'Linee di servizio' },
    { value: `${this.techGroups().reduce((total, group) => total + group.items.length, 0)}+`, label: 'Tecnologie coperte' },
  ]);

  // Piccoli claim dinamici per dare movimento al layout senza bisogno di backend o database.
  protected readonly spotlightPills = signal<string[]>([
    'One-page di impatto',
    'Responsive mobile-first',
    'Design sobrio ma forte',
    'Angular + React mindset',
    'Performance e chiarezza',
  ]);
}
