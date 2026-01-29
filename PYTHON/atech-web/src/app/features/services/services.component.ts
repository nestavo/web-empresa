import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      title: 'Desarrollo Web',
      description: 'Creación de sitios y aplicaciones web escalables, rernidmientos optimizados y diseño responsive.',
      icon: 'pi pi-desktop',
      color: '#3b82f6',
      gradient: 'linear-gradient(to right, #3b82f6, #06b6d4)',
      features: ['Single Page Apps (SPA)', 'E-commerce', 'Portales Corporativos']
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Implementación de soluciones de IA para análisis de datos, automatización y toma de decisiones.',
      icon: 'pi pi-android', // closest to AI/Robot
      color: '#8b5cf6',
      gradient: 'linear-gradient(to right, #8b5cf6, #d946ef)',
      features: ['Machine Learning', 'Chatbots NLP', 'Análisis Predictivo']
    },
    {
      title: 'Automatización',
      description: 'Optimización de procesos empresariales mediante software inteligente y flujos de trabajo.',
      icon: 'pi pi-cog',
      color: '#f59e0b',
      gradient: 'linear-gradient(to right, #f59e0b, #f97316)',
      features: ['RPA', 'Integración API', 'Workflows Digitales']
    }
  ];
}
