import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ServicesComponent } from '../services/services.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, ServicesComponent, PortfolioComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showExitModal = false;
  hasShownExitModal = false;

  technologies = [
    { name: 'Angular', icon: 'pi pi-code', color: '#dd0031' },
    { name: 'Node.js', icon: 'pi pi-server', color: '#68a063' },
    { name: 'Python AI', icon: 'pi pi-cog', color: '#ffde57' },
    { name: 'React', icon: 'pi pi-spin pi-spinner', color: '#61dafb' },
    { name: 'Cloud', icon: 'pi pi-cloud', color: '#3b82f6' },
    { name: 'Security', icon: 'pi pi-lock', color: '#10b981' }
  ];

  testimonials = [
    { name: 'Carlos Ruíz', carg: 'CTO, TechFlow', quote: 'Atech transformó completamente nuestra infraestructura digital. La implementación de IA redujo nuestros costos en un 40%.' },
    { name: 'Ana Morán', carg: 'CEO, Innova', quote: 'El mejor equipo de desarrollo con el que hemos trabajado. Profesionales, rápidos y con una visión futurista increíble.' },
    { name: 'David Gil', carg: 'Director, Solares', quote: 'Su solución de automatización nos ahorró miles de horas hombre. Recomendados al 100%.' },
    { name: 'Elena Torres', carg: 'Manager, GreenCorp', quote: 'Excelente servicio al cliente y resultados que superaron nuestras expectativas. Definitivamente volveremos a trabajar con ellos.' }
  ];

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    // Exit Intent Logic
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 0 && !this.hasShownExitModal) {
        this.showExitModal = true;
        this.hasShownExitModal = true;
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  navigationToContact() {
    this.scrollToSection('contact-section');
  }
}
