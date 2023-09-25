import { RouteObject } from 'react-router-dom';
import { getHomePath } from '@/shared/constants/getRoutes.ts';
import HomePage from '@/pages/HomePage/HomePage.tsx';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.tsx';

export const routerConfig: RouteObject[] = [
  {
    path: getHomePath(),
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];