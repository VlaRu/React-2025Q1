import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPokemonState {
  selectedPokemon: string[];
}

const initialPokemonState: SelectedPokemonState = { selectedPokemon: [] };

export const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState: initialPokemonState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemon.push(action.payload);
    },
    clearSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemon = state.selectedPokemon.filter(
        (id) => id !== action.payload
      );
    },
    clearAllSelectedPokemon: (state) => {
      state.selectedPokemon = [];
    }
  }
});

export const {
  setSelectedPokemon,
  clearSelectedPokemon,
  clearAllSelectedPokemon
} = selectedPokemonSlice.actions;
