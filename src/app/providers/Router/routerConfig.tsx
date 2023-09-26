import { RouteObject } from 'react-router-dom';
import { getHomePath, getSuperheroPath } from '@/shared/constants/getRoutes.ts';
import { HomePage } from '@/pages/HomePage/';
import { SuperheroPage } from '@/pages/SuperheroPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routerConfig: RouteObject[] = [
  {
    path: getHomePath(),
    element: <HomePage />,
  },
  {
    path: getSuperheroPath(':superheroId'),
    element: <SuperheroPage />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];