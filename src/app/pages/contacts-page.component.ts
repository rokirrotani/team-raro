import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnViewDirective } from '../shared/reveal-on-view.directive';

@Component({
  selector: 'app-contacts-page',
  imports: [RevealOnViewDirective],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPageComponent {}