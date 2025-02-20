import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FlyoutPanel } from '../components/flyout/Flyout';
import { clearAllSelectedPokemon } from '../store/selectedPokemon ';
import { resetCount } from '../store/counterSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore();
const dispatchMock = vi.fn();

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: () => dispatchMock
  };
});

describe('FlyoutPanel', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should not render when count is 0', () => {
    store = mockStore({ counter: { value: 0 } });

    render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    expect(screen.queryByText('Saved:0')).not.toBeInTheDocument();
  });

  it('should render when count is greater than 0', () => {
    store = mockStore({ counter: { value: 3 } });

    render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    expect(screen.getByText('Saved:3')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it("should dispatch actions when 'Unselect all' button is clicked", () => {
    store = mockStore({ counter: { value: 3 } });

    render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    const button = screen.getByText('Unselect all');
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(resetCount());
    expect(dispatchMock).toHaveBeenCalledWith(clearAllSelectedPokemon());
  });

  it("should dispatch actions when 'Download' button is clicked", () => {
    store = mockStore({ counter: { value: 3 } });

    render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    const button = screen.getByText('Download');
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(resetCount());
    expect(dispatchMock).toHaveBeenCalledWith(clearAllSelectedPokemon());
  });
});
