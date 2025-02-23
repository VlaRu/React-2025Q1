import { describe, expect, it, vi } from 'vitest';
import { DetailedCard } from '../components/detail/Detail';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import mockData from './msw/moc.json';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('DetailedCard Component', () => {
  const mockHandleCloseCard = vi.fn();

  it('should render loading state correctly', () => {
    render(
      <Provider store={store}>
        <DetailedCard id="basep-1" handleCloseCard={mockHandleCloseCard} />
      </Provider>
    );
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it('should render the detail correctly when data is available', async () => {
    render(
      <Provider store={store}>
        <DetailedCard id="basep-1" handleCloseCard={mockHandleCloseCard} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /When several of these Pokémon gather, their electricity could build and cause lightning storms./i
        )
      ).toBeInTheDocument();
      expect(screen.getByAltText(/pokemon-img/i)).toHaveAttribute(
        'src',
        mockData.data[0].images.small
      );
    });
  });

  it('should call handleCloseCard when close button is clicked', async () => {
    render(
      <Provider store={store}>
        <DetailedCard id="basep-1" handleCloseCard={mockHandleCloseCard} />
      </Provider>
    );

    await waitFor(() => screen.getByText(/Pikachu/i));

    fireEvent.click(screen.getByRole('button', { name: /x/i }));
    expect(mockHandleCloseCard).toHaveBeenCalled();
  });
});
