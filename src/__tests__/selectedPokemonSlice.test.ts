import { describe, expect, it } from 'vitest';
import {
  clearAllSelectedPokemon,
  clearSelectedPokemon,
  selectedPokemonSlice,
  setSelectedPokemon
} from '../store/selectedPokemon ';

describe('selectedPokemonSlice', () => {
  const initialState = { selectedPokemon: [] };

  it('should handle setSelectedPokemon', () => {
    const newState = selectedPokemonSlice.reducer(
      initialState,
      setSelectedPokemon('basep-1')
    );
    expect(newState.selectedPokemon).toEqual(['basep-1']);
  });

  it('should handle clearSelectedPokemon', () => {
    const state = { selectedPokemon: ['basep-1', 'mcd19'] };
    const newState = selectedPokemonSlice.reducer(
      state,
      clearSelectedPokemon('basep-1')
    );
    expect(newState.selectedPokemon).toEqual(['mcd19']);
  });

  it('should handle clearAllSelectedPokemon', () => {
    const state = { selectedPokemon: ['basep-1', 'mcd19'] };
    const newState = selectedPokemonSlice.reducer(
      state,
      clearAllSelectedPokemon()
    );
    expect(newState.selectedPokemon).toEqual([]);
  });
});
