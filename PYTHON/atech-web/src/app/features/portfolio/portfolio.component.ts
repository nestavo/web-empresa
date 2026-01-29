import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent {
  projects = [
    { id: 1, name: 'FinTech Dashboard', category: 'Desarrollo Web', description: 'Plataforma de gestión financiera en tiempo real con Angular y Node.js.', tags: ['Angular', 'Node.js', 'Web3'] },
    { id: 2, name: 'HealthAI Diag', category: 'Inteligencia Artificial', description: 'Sistema de diagnóstico preliminar basado en imágenes médicas.', tags: ['Python', 'TensorFlow', 'MedTech'] },
    { id: 3, name: 'AutoLogistics', category: 'Automatización', description: 'Sistema de gestión de almacenes robotizados.', tags: ['IoT', 'Robótica', 'Industria 4.0'] },
    { id: 4, name: 'E-commerce NextGen', category: 'Desarrollo Web', description: 'Tienda virtual ultra-rápida con enfoque en experiencia de usuario móvil.', tags: ['React', 'Next.js', 'Shopify'] },
    { id: 5, name: 'AI Customer Bot', category: 'Chatbots & IA', description: 'Asistente inteligente con procesamiento de lenguaje natural avanzado.', tags: ['NLP', 'OpenAI', 'SaaS'] },
    { id: 6, name: 'CyberSec Audit', category: 'Consultoría', description: 'Auditoría integral de seguridad para infraestructuras críticas.', tags: ['Security', 'Cloud', 'Networking'] }
  ];
}
