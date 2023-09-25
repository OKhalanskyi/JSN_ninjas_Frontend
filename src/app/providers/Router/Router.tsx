import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routerConfig } from './routerConfig.tsx';

const Router = () => {
  const routing = useRoutes(routerConfig);

  return <Suspense fallback={<h1>loading</h1>}>{routing}</Suspense>;
};

export default Router;