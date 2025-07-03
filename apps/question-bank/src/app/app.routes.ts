import { Route } from '@angular/router';
import { ListInterview } from './features/interview-management/list-interview/list-interview';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'interviews',
    pathMatch: 'full'
  },
  {
    path: 'interviews',
    component: ListInterview
  }
];
