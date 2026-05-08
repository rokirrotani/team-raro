import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class App {
  // Brand e stato navbar condivisi tra tutte le pagine.
  protected readonly studioName = signal('Team Raro');
  protected readonly hasScrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      this.onWindowScroll();
    });
  }

  protected onWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.hasScrolled.set(window.scrollY > 72);
  }
}
