import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appRevealOnView]',
  standalone: true,
  host: {
    '[class.is-visible]': 'isVisible()',
  },
})
export class RevealOnViewDirective implements AfterViewInit, OnDestroy {
  readonly delay = input(0);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  protected readonly isVisible = signal(false);

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.setProperty('--reveal-delay', `${this.delay()}ms`);

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}