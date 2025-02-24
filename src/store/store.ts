import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '../api/fetchData';
import { counterSlice } from './counterSlice';
import { selectedPokemonSlice } from './selectedPokemon ';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    selectedPokemon: selectedPokemonSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
