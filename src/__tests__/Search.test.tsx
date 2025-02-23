import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '../components/search/SearchBar';
import { beforeEach, describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { counterSlice } from '../store/counterSlice';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { pokemonApi } from '../api/fetchData';
import { selectedPokemonSlice } from '../store/selectedPokemon ';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithProviders = (
    ui: React.ReactNode,
    preloadedState = {
      counter: { value: 1 },
      selectedPokemon: { selectedPokemon: [] }
    }
  ) => {
    const store = configureStore({
      reducer: {
        counter: counterSlice.reducer,
        selectedPokemon: selectedPokemonSlice.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
      preloadedState
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );
  };

  test('renders pagination and flyout panel', async () => {
    renderWithProviders(<Search />, { counter: { value: 1 } });

    expect(await screen.findByTestId('flyout-panel')).toBeInTheDocument();
  });

  test('hides flyout panel when count is zero', async () => {
    renderWithProviders(<Search />, { counter: { value: 0 } });

    await waitFor(() => {
      expect(screen.queryByTestId('flyout-panel')).not.toBeInTheDocument();
    });
  });

  test('pagination buttons work correctly', async () => {
    renderWithProviders(<Search />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(prevButton).not.toBeDisabled();
  });

  test('shows loading indicator when fetching data', async () => {
    renderWithProviders(<Search />);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  test('updates search input value and filters special characters', () => {
    renderWithProviders(<Search />);

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu123!' } });

    expect(input.value).toBe('Pikachu123');
  });

  test('preserves search query in localStorage', () => {
    renderWithProviders(<Search />);

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Bulbasaur' } });

    expect(localStorage.getItem('name')).toBe('Bulbasaur');
  });
});
