import { describe, expect, it } from 'vitest';
import Cards from '../components/results/Cards';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockData from './msw/moc.json';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '@testing-library/jest-dom';

describe('Cards Component', () => {
  it('renders loading message when no data is provided', async () => {
    render(<Cards data={[]} />);
    await waitFor(() => {
      expect(screen.getByText(/Not found.../i)).toBeInTheDocument();
    });
  });

  it("displays 'Not found...' when data is empty", () => {
    render(<Cards data={[]} />);
    expect(screen.getByText('Not found...')).toBeInTheDocument();
  });

  it('renders cards correctly when data is provided', async () => {
    console.log('mockData:', mockData);
    console.log('mockData.data:', mockData.data);
    if (!Array.isArray(mockData.data)) {
      throw new Error('mockData.data is NOT an array!');
    }

    expect(Array.isArray(mockData.data)).toBe(true);
    render(
      <Provider store={store}>
        <Cards data={mockData.data} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByText(/Name: Pikachu/i)).toHaveLength(5);
    });
  });

  it('opens detailed card when a card is clicked', () => {
    render(
      <Provider store={store}>
        <Cards data={mockData.data} />
      </Provider>
    );
    const cardImage = screen.getAllByAltText('pokemon-front')[0];
    fireEvent.click(cardImage);
    expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
  });
});
