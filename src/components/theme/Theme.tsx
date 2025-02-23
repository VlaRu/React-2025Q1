import { useContext } from 'react';
import { ThemeContext } from '../../app/App';

export function Theme() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleChangeTheme(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    setTheme(value);
  }
  return (
    <>
      <input
        type="range"
        value={theme}
        onChange={handleChangeTheme}
        min="0"
        max="1"
      />
    </>
  );
}
