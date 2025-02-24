import { URL } from './constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataFetchingState, PokemonDetailResponse } from '../utils/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL
  }),
  endpoints(builder) {
    return {
      getPokemonByName: builder.query<
        DataFetchingState,
        { queryName: string, page: number }
      >({
        query: ({ queryName, page }) => ({
          url: `?page=${page}&pageSize=6&q=name:${queryName || '*'}`
        })
      }),
      getPokemonDetail: builder.query<PokemonDetailResponse, string>({
        query: (id) => `/${id}`
      })
    };
  }
});

export const { useGetPokemonByNameQuery, useGetPokemonDetailQuery } =
  pokemonApi;
