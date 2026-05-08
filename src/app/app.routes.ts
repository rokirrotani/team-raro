import { Routes } from '@angular/router';
import { ContactsPageComponent } from './pages/contacts-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { QuotePageComponent } from './pages/quote-page.component';
import { ServicesPageComponent } from './pages/services-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Team Raro | Home',
  },
  {
    path: 'servizi',
    component: ServicesPageComponent,
    title: 'Team Raro | Servizi',
  },
  {
    path: 'preventivo',
    component: QuotePageComponent,
    title: 'Team Raro | Preventivo',
  },
  {
    path: 'contatti',
    component: ContactsPageComponent,
    title: 'Team Raro | Contatti',
  },
  {
    path: '**',
    redirectTo: '',
  },
];