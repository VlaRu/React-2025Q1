/* import './App.css';
import { Search } from '../src/components/search/SearchBar';
import ErrorButton from '../src/components/error/ErrorButton';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import ErrorPage from '../pages/_404';
import { DetailedCard } from '../src/components/detail/Detail';
import { createContext, useState } from 'react';
import { Theme } from '../src/components/theme/Theme';

type ThemeContextType = {
  theme: number,
  setTheme: (theme: number) => void
};
export const ThemeContext = createContext<ThemeContextType>({
  theme: 0,
  setTheme: () => {}
});

function App() {
  const [theme, setTheme] = useState(1);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 1 ? 'container' : 'container light'}>
        <ErrorButton />
        <h1 className="header">Search pokemon!</h1>
        <Theme />
        <Routes>
          <Route index path="/" element={<Search />} />
          <Route
            path="/pokemon/:id"
            element={<DetailedCard id={''} handleCloseCard={() => {}} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App; */
