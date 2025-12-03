import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  @ViewChildren('animItem') animatedItems!: QueryList<ElementRef>;

  features = [
    {
      title: 'True VR Immersion',
      desc: 'Block out the world and step into a distraction-free 3D classroom built for deep focus.',
      icon: 'vr'
    },
    {
      title: 'AR Holograms',
      desc: 'Project complex biological models and physics engines directly onto your desk via smartphone.',
      icon: 'ar'
    },
    {
      title: 'Mixed Reality (MR)',
      desc: 'Seamlessly blend digital coursework with your physical environment using spatial computing.',
      icon: 'mr'
    }
  ];

  partners = [
    'UNITY TECHNOLOGIES', 'UNREAL ENGINE', 'META QUEST', 'APPLE VISION PRO', 'HTC VIVE'
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      this.animatedItems.forEach((item) => {
        observer.observe(item.nativeElement);
      });
    }
  }
}