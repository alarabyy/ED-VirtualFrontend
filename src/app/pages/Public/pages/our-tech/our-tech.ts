import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-our-tech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-tech.html',
  styleUrls: ['./our-tech.scss']
})
export class OurTechComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  @ViewChildren('animItem') animatedItems!: QueryList<ElementRef>;

  // Departments (بدلاً من المهارات الفردية، نعرضها كأقسام شركة)
  departments = [
    {
      id: '01',
      name: 'Core Engineering',
      stack: '.NET • Microservices • Cloud',
      icon: 'bi-server',
      desc: 'Building scalable, high-performance backends that power the entire ecosystem.'
    },
    {
      id: '02',
      name: 'Web Innovation',
      stack: 'Angular • WebXR • SSR',
      icon: 'bi-globe',
      desc: 'Crafting immersive web experiences with the latest frontend technologies.'
    },
    {
      id: '03',
      name: 'Mobility Solutions',
      stack: 'Flutter • iOS • Android',
      icon: 'bi-phone',
      desc: 'Cross-platform excellence delivering seamless native performance.'
    },
    {
      id: '04',
      name: 'Cyber Security',
      stack: 'Pen-Testing • NetSec • Encryption',
      icon: 'bi-shield-lock',
      desc: 'Iron-clad security protocols protecting data integrity and infrastructure.'
    },
    {
      id: '05',
      name: 'Network Ops',
      stack: 'DevOps • CI/CD • Infrastructure',
      icon: 'bi-hdd-network',
      desc: 'Ensuring 99.99% uptime and seamless connectivity across all nodes.'
    },
    {
      id: '06',
      name: 'Creative Studio',
      stack: 'UI/UX • 3D Modeling • Motion',
      icon: 'bi-bezier2',
      desc: 'Designing intuitive interfaces that merge art with functionality.'
    }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      this.animatedItems.forEach(item => observer.observe(item.nativeElement));
    }
  }
}