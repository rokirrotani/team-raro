import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type Option = {
  label: string;
  value: string;
  price: number;
  description: string;
};

type Section = {
  title: string;
  helper: string;
  options: Option[];
};

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrl: './quote-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotePageComponent {
  protected readonly selectedSiteType = signal('vetrina');
  protected readonly selectedPages = signal('small');
  protected readonly selectedDesign = signal('premium');
  protected readonly selectedExtras = signal<string[]>(['seo']);

  protected readonly siteTypeOptions: Section = {
    title: 'Tipo di progetto',
    helper: 'Scegli la base da cui partire.',
    options: [
      { label: 'Sito vetrina', value: 'vetrina', price: 900, description: 'Presentazione chiara, elegante e professionale.' },
      { label: 'Landing page', value: 'landing', price: 700, description: 'Pagina mirata ad alto focus e conversione.' },
      { label: 'Multipagina', value: 'multi', price: 1500, description: 'Struttura più ampia con sezioni dedicate.' },
    ],
  };

  protected readonly pageOptions: Section = {
    title: 'Dimensione del sito',
    helper: 'Quante aree contenuto vuoi coprire?',
    options: [
      { label: 'Essenziale', value: 'small', price: 0, description: 'Fino a 4 sezioni o pagine mirate.' },
      { label: 'Intermedio', value: 'medium', price: 350, description: 'Più contenuti, più gerarchia, più profondità.' },
      { label: 'Esteso', value: 'large', price: 700, description: 'Esperienza più ampia e strutturata.' },
    ],
  };

  protected readonly designOptions: Section = {
    title: 'Livello creativo',
    helper: 'Quanto vuoi spingere la direzione visuale?',
    options: [
      { label: 'Clean', value: 'clean', price: 0, description: 'Pulito, rapido e minimale.' },
      { label: 'Premium', value: 'premium', price: 400, description: 'Più personalità, ritmo e dettaglio.' },
      { label: 'Signature', value: 'signature', price: 800, description: 'Art direction più forte e più distintiva.' },
    ],
  };

  protected readonly extras = signal<Option[]>([
    { label: 'SEO base', value: 'seo', price: 180, description: 'Struttura iniziale per motori di ricerca.' },
    { label: 'Copy support', value: 'copy', price: 220, description: 'Supporto nella scrittura dei contenuti.' },
    { label: 'Animazioni premium', value: 'motion', price: 240, description: 'Micro-animazioni e transizioni dedicate.' },
    { label: 'Multilingua', value: 'lang', price: 320, description: 'Seconda lingua o struttura multilingua.' },
  ]);

  protected readonly estimate = computed(() => {
    const site = this.siteTypeOptions.options.find((option) => option.value === this.selectedSiteType())?.price ?? 0;
    const size = this.pageOptions.options.find((option) => option.value === this.selectedPages())?.price ?? 0;
    const design = this.designOptions.options.find((option) => option.value === this.selectedDesign())?.price ?? 0;
    const extraTotal = this.selectedExtras().reduce((total, selected) => {
      const found = this.extras().find((option) => option.value === selected)?.price ?? 0;
      return total + found;
    }, 0);

    return site + size + design + extraTotal;
  });

  protected readonly estimateRange = computed(() => {
    const total = this.estimate();
    return {
      min: total,
      max: total + 350,
    };
  });

  protected setSiteType(value: string): void {
    this.selectedSiteType.set(value);
  }

  protected setPages(value: string): void {
    this.selectedPages.set(value);
  }

  protected setDesign(value: string): void {
    this.selectedDesign.set(value);
  }

  protected toggleExtra(value: string): void {
    this.selectedExtras.update((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }
}