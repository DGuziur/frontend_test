import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { MainPageComponent } from './modules/task/pages/main-page/main-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
      },
      {
        path: 'app',
        title: 'zadanie rekrutacyjne',
        loadComponent: () =>
          import('./modules/task/pages/main-page/main-page.component').then(
            (m) => m.MainPageComponent
          ),
      },
    ],
  },
];
