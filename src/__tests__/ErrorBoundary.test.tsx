import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/error/ErrorBoundary';
import { beforeAll, describe, expect, it, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorButton from '../components/error/ErrorButton';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p>Safe Content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Content')).toBeInTheDocument();
  });

  test('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return/i })).toBeInTheDocument();
  });

  test('reloads the page when return button is clicked', () => {
    vi.stubGlobal('location', { reload: vi.fn() });

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /return/i });
    fireEvent.click(button);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ErrorButton', () => {
  it('should render the button correctly', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /show error/i });
    expect(button).toBeInTheDocument();
  });

  it('should throw an error when clicked', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /show error/i });

    expect(() => fireEvent.click(button)).toThrowError('The error was occured');
  });
});
