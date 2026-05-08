import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealOnViewDirective } from '../shared/reveal-on-view.directive';

@Component({
  selector: 'app-about-page',
  imports: [RevealOnViewDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  protected readonly blocks = signal([
    {
      title: 'Chi siamo',
      text: 'Questa pagina e pronta per essere completata con storia, approccio, background e tono del team.',
    },
    {
      title: 'Come lavoriamo',
      text: 'Puoi aggiungere processo, metodo, fasi operative e il modo in cui accompagni i clienti.',
    },
    {
      title: 'Per chi lavoriamo',
      text: 'Qui potrai raccontare settori, tipologie di clienti, collaborazioni e posizionamento.',
    },
  ]);
}