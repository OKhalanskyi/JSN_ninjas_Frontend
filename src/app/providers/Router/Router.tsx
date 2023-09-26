import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routerConfig } from './routerConfig.tsx';
import Loader from '@/components/Loader/Loader.tsx';

const Router = () => {
  const routing = useRoutes(routerConfig);

  return <Suspense fallback={<Loader />}>{routing}</Suspense>;
};

export default Router;