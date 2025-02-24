import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeContext } from '../app/App';
import { Theme } from '../components/theme/Theme';

describe('Theme Component', () => {
  it('should render the range input with the correct initial value', () => {
    const mockSetTheme = vi.fn();
    const theme = 0;

    render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <Theme />
      </ThemeContext.Provider>
    );

    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute('value', theme.toString());
  });

  it('should call setTheme when the range input value changes', () => {
    const mockSetTheme = vi.fn();
    const theme = 0;

    render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <Theme />
      </ThemeContext.Provider>
    );

    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '1' } });

    expect(mockSetTheme).toHaveBeenCalledWith(1);
  });
});
