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
          url: `?page=${page}&pageSize=8&q=name:${queryName || '*'}`
        })
      }),
      getPokemonDetail: builder.query<PokemonDetailResponse, string>({
        query: (id) => `/${id}`
      }),
      getDataLength: builder.query<{ totalCount: number }, string>({
        query: (queryName) => ({
          url: `?page=1&pageSize=1&q=name:${queryName || '*'}`
        }),
        transformResponse: (response: { totalCount: number }) => ({
          totalCount: response.totalCount
        })
      })
    };
  }
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonDetailQuery,
  useGetDataLengthQuery
} = pokemonApi;
