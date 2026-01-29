import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
