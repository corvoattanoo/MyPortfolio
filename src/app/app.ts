import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  constructor(private sanitizer: DomSanitizer) {}
  dockItems: { label: string; link: string; target: string; icon: SafeHtml }[] = [];
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
  

onDockHover(e: MouseEvent) {
  const item = e.currentTarget as HTMLElement;
  item.style.transform = 'scale(1.4) translateY(-8px)';
  item.style.transition = 'transform 0.2s ease';
  const siblings = item.parentElement?.children;
  if (siblings) {
    Array.from(siblings).forEach((sib: any) => {
      if (sib !== item) {
        const dist = Math.abs(Array.from(siblings).indexOf(sib) - Array.from(siblings).indexOf(item));
        if (dist === 1) {
          sib.style.transform = 'scale(1.2) translateY(-4px)';
          sib.style.transition = 'transform 0.2s ease';
        }
      }
    });
  }
}
initBeams() {
  const canvas = document.getElementById('beams-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;

  interface Beam {
    x: number; y: number; width: number; length: number;
    angle: number; speed: number; opacity: number;
    hue: number; pulse: number; pulseSpeed: number;
  }

  let beams: Beam[] = [];

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    beams = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25,
      y: Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25,
      width: 30 + Math.random() * 60,
      length: window.innerHeight * 2.5,
      angle: -35 + Math.random() * 10,
      speed: 0.4 + Math.random() * 0.8,
      opacity: 0.08 + Math.random() * 0.12,
      hue: 190 + Math.random() * 70,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));
  };

  resize();
  window.addEventListener('resize', resize);

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'blur(35px)';

    beams.forEach((beam, i) => {
      beam.y -= beam.speed;
      beam.pulse += beam.pulseSpeed;

      if (beam.y + beam.length < -100) {
        const col = i % 3;
        const spacing = window.innerWidth / 3;
        beam.y = window.innerHeight + 100;
        beam.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
        beam.opacity = 0.08 + Math.random() * 0.12;
      }

      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate(beam.angle * Math.PI / 180);

      const pOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
      const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
      grad.addColorStop(0.1, `hsla(${beam.hue},85%,65%,${pOpacity * 0.5})`);
      grad.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${pOpacity})`);
      grad.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${pOpacity})`);
      grad.addColorStop(0.9, `hsla(${beam.hue},85%,65%,${pOpacity * 0.5})`);
      grad.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  };

  animate();
}

onDockLeave(e: MouseEvent) {
  const item = e.currentTarget as HTMLElement;
  item.style.transform = 'scale(1) translateY(0)';
  const siblings = item.parentElement?.children;
  if (siblings) {
    Array.from(siblings).forEach((sib: any) => {
      sib.style.transform = 'scale(1) translateY(0)';
    });
  }
}

  skills = [
    { label: 'Backend', items: ['Laravel', 'Node.js', 'Express.js', 'REST API'] },
    { label: 'Frontend', items: ['Angular', 'RxJS', 'TypeScript', 'HTML/CSS'] },
    { label: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    { label: 'DevOps', items: ['Docker', 'Nginx', 'Linux', 'AWS EC2'] },
  ];

  ngOnInit() {
    this.initBeams();
    this.dockItems = [
    {
      label: 'GitHub',
      link: 'https://github.com/corvoattanoo',
      target: '_blank',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`)
    },
    {
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/yigit-efe-sozer',
      target: '_blank',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`)
    },
    {
      label: 'Medium',
      link: 'https://medium.com/@yigit.3f3',
      target: '_blank',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`)
    },
    {
      label: 'Email',
      link: 'mailto:yigit.3f3@gmail.com',
      target: '_self',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`)
    },
    {
      label: 'Download CV',
      link: '/assets/Yigit_Efe_Sozer_CV.pdf',
      target: '_blank',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`)
    },
  ];
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