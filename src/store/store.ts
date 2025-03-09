import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '../api/fetchData';
import { counterSlice } from './counterSlice';
import { selectedPokemonSlice } from './selectedPokemon';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  selectedPokemon: selectedPokemonSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware)
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);

setupListeners(makeStore().dispatch);
