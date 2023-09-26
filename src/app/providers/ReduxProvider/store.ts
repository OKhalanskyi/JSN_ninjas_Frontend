import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { superheroesApi } from '@/app/api/superheroes.api.ts';

const rootReducer = combineReducers({
  [superheroesApi.reducerPath]: superheroesApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(superheroesApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];