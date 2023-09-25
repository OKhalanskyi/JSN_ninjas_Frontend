import { lazy } from 'react';

export const SuperheroPageAsync = lazy(
  async () => await import('./SuperheroPage.tsx'),
);