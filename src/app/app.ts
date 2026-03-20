import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  activeSection = 'hero';
  menuOpen = false;

  projects = [
    {
      name: 'MightyInvest',
      description: 'Real-time stock market analytics SaaS platform. API-First architecture reduced DB load by ~70% through live data streaming.',
      stack: ['Laravel', 'Angular', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
      repo: 'https://github.com/corvoattanoo/mightyinvest',
      featured: true
    },
    {
      name: 'CampSphere',
      description: 'Full-stack campground listing platform with interactive maps, image storage, and session-based authentication.',
      stack: ['Node.js', 'Express', 'MongoDB', 'Mapbox', 'Cloudinary'],
      repo: 'https://github.com/corvoattanoo/CampApp',
      featured: false
    },
    {
      name: 'Todo API',
      description: 'RESTful task management API deployed on AWS EC2 with Nginx reverse proxy and Dockerized development environment.',
      stack: ['Laravel', 'MySQL', 'Nginx', 'AWS EC2', 'Docker'],
      repo: 'https://github.com/corvoattanoo',
      featured: false
    }
  ];

  skills = [
    { label: 'Backend', items: ['Laravel', 'Node.js', 'Express.js', 'REST API'] },
    { label: 'Frontend', items: ['Angular', 'RxJS', 'TypeScript', 'HTML/CSS'] },
    { label: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    { label: 'DevOps', items: ['Docker', 'Nginx', 'Linux', 'AWS EC2'] },
  ];

  ngOnInit() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.observe').forEach(el => {
      el.classList.add('section-hidden');
      observer.observe(el);
    });
  }, 100);

  document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.glow-card').forEach((card: any) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Mouse'un karta olan uzaklığı
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const maxDistance = 300; // px cinsinden etki alanı
    
    if (distance < maxDistance) {
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 90 + 180;
      const opacity = 1 - (distance / maxDistance);
      card.style.setProperty('--angle', `${angle}deg`);
      card.style.setProperty('--glow-opacity', `${opacity}`);
    } else {
      card.style.setProperty('--glow-opacity', '0');
    }
  });
});
}

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll() {
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
        }
      }
    }
  }
}