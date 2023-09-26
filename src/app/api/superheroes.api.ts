import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/shared/constants/api';
import { ISuperhero, ISuperheroWithDetails } from '@/app/models/ISuperhero.ts';

export const superheroesApi = createApi({
  reducerPath: 'superheroesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: () => {}
  }),
  endpoints: (build) => ({
    getAllSuperheroes: build.query<{ superheroes: ISuperhero[], total: number, pages: number }, Record<string, number | string>>({
      query: ({ page = 1 }) => ({
        url: 'superhero',
        method: 'GET',
        params: {
          page
        }
      }),
    }),
    getSuperheroById: build.query<ISuperheroWithDetails, string>({
      query: (id) => ({
        url: `superhero/${id}`,
        method: 'GET'
      })
    })
  }),
});

export const {
  useGetAllSuperheroesQuery,
  useGetSuperheroByIdQuery
} = superheroesApi;
