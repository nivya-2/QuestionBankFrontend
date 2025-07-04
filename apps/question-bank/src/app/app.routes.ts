import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'interviews',
    pathMatch: 'full'
  },
  {
    path: 'interviews',
    loadComponent: () =>
      import('./features/interview-management/components/list-interview/list-interview')
        .then(m => m.ListInterview)
  }
];
