import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealOnViewDirective } from '../shared/reveal-on-view.directive';

@Component({
  selector: 'app-services-page',
  imports: [RevealOnViewDirective],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent {
  protected readonly serviceGroups = signal([
    {
      title: 'Siti vetrina per aziende',
      text: 'Progetti per imprese che vogliono comunicare struttura, competenza e qualità in modo chiaro e contemporaneo.',
    },
    {
      title: 'Landing page ad alta conversione',
      text: 'Pagine mirate per servizi, campagne o presentazioni commerciali con struttura ordinata e forte gerarchia visiva.',
    },
    {
      title: 'Ristorazione e hospitality',
      text: 'Siti per locali, ristoranti, pizzerie e bar pensati per atmosfera, velocità e lettura perfetta da smartphone.',
    },
    {
      title: 'Restyling e rebranding digitale',
      text: 'Rinnoviamo siti esistenti con una nuova direzione estetica, tecnica e comunicativa più attuale.',
    },
    {
      title: 'Full stack e integrazione',
      text: 'Frontend, backend, database, AI/ML e integrazione di sistemi quando il progetto richiede una base tecnica più ampia.',
    },
    {
      title: 'Performance e responsive',
      text: 'Ogni pagina viene costruita per essere veloce, leggibile e coerente su desktop, tablet e mobile.',
    },
  ]);
}