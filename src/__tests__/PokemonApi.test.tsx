import { setupServer } from 'msw/node';
import { handlers } from './msw/handlers';
import {
  pokemonApi,
  useGetPokemonByNameQuery,
  useGetPokemonDetailQuery
} from '../api/fetchData';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { Provider } from 'react-redux';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('pokemonApi', () => {
  const store = configureStore({
    reducer: { [pokemonApi.reducerPath]: pokemonApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware)
  });

  it('fetches Pokemon by name', async () => {
    const { result } = renderHook(
      () => useGetPokemonByNameQuery({ queryName: 'pikachu', page: 1 }),
      {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.data).toHaveLength(6);
    expect(result.current.data?.data[0].name).toBe('Pikachu');
  });

  it('fetches Pokemon detail by ID', async () => {
    const { result } = renderHook(() => useGetPokemonDetailQuery('basep-1'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    console.log(
      'Pokemon Detail API Response:',
      JSON.stringify(result.current.data, null, 1)
    );

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.data?.[0]?.name).toBe('Pikachu');
    expect(result.current.data?.data?.[0]?.id).toBe('basep-1');
    expect(result.current.isError).toBeFalsy();
  });
});
