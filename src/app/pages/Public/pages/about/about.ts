import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  // Reference to all elements we want to animate on scroll
  @ViewChildren('animItem') animatedItems!: QueryList<ElementRef>;

  // Project Stats (Social Proof)
  stats = [
    { label: 'Interactive Models', value: '500+' },
    { label: 'Active Students', value: '15k' },
    { label: 'Partner Schools', value: '50+' },
    { label: 'Hours Saved', value: '99%' }
  ];

  // Core Project Values
  values = [
    {
      title: 'Innovation',
      desc: 'Shattering the boundaries of traditional "flat" education systems.'
    },
    {
      title: 'Accessibility',
      desc: 'High-quality, immersive education available on any device, anywhere.'
    },
    {
      title: 'Immersion',
      desc: 'We believe in learning by doing, feeling, and experiencing the subject.'
    }
  ];

  // Project Roadmap/Timeline
  timeline = [
    { year: '2023', title: 'The Inception', desc: 'R&D phase: Converting physics books into Unity 3D prototypes.' },
    { year: '2024', title: 'Beta Testing', desc: 'Deployed VR headsets to 3 pilot schools. 90% engagement increase.' },
    { year: '2025', title: 'Global Launch', desc: 'Releasing the AR mobile app and WebXR platform worldwide.' },
    { year: 'FUTURE', title: 'Neural Integration', desc: 'exploring direct BCI (Brain-Computer Interface) for learning.' }
  ];

  constructor() {}

  ngAfterViewInit() {
    // Only run animation logic in the browser (SSR safety)
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'visible' class when element enters viewport
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 }); // Trigger when 10% of the item is visible

      this.animatedItems.forEach((item) => {
        observer.observe(item.nativeElement);
      });
    }
  }
}