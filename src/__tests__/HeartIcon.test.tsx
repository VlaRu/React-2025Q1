import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import HeartIcon from '../components/results/heartSvg';
import { store } from '../store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { incremented } from '../store/counterSlice';
import { setSelectedPokemon } from '../store/selectedPokemon ';
import '@testing-library/jest-dom';

describe('HeartIcon Component', () => {
  const mockId = 'pop6-9';

  it('should render unchecked heart initially', () => {
    render(
      <Provider store={store}>
        <HeartIcon id={mockId} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should dispatch incremented and setSelectedPokemon when checked', () => {
    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <HeartIcon id={mockId} />
      </Provider>
    );

    const heartIcon = screen.getByRole('checkbox');
    fireEvent.click(heartIcon);

    expect(dispatchMock).toHaveBeenCalledWith(incremented());
    expect(dispatchMock).toHaveBeenCalledWith(setSelectedPokemon(mockId));
  });
});
