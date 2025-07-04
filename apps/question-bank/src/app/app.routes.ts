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
      import('./features/interview-management/list-interview/list-interview')
        .then(m => m.ListInterview)
  },
  {
    path: 'interviews/:id',
    loadComponent: () =>
      import('./features/interview-management/interview-details/interview-details')
        .then(m => m.InterviewDetails)
  }
];
