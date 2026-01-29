import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [`
    .bg-glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .bg-gradient-primary { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); }
  `]
})
export class HeaderComponent {
    isScrolled = false;
    displayMobileMenu = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
    }
}
