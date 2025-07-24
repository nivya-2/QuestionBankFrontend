import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'interviews',
    pathMatch: 'full',
  },
  {
    path: 'interviews',
    loadComponent: () =>
      import(
        './features/interview-management/components/list-interview/list-interview'
      ).then((m) => m.ListInterview),
  },
  {
    path: 'interviews/:id',
    loadComponent: () =>
      import(
        './features/interview-management/components/interview-details/interview-details'
      ).then((m) => m.InterviewDetails),
  },
  {
    path: 'interviews/add',
    loadComponent: () =>
      import(
        './features/interview-management/components/interview-details/interview-details'
      ).then((m) => m.InterviewDetails),
  },
];
