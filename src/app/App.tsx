import './App.css';
import { Search } from '../components/search/SearchBar';
import { createContext, useState } from 'react';
import { FlyoutPanel } from '../components/flyout/Flyout';
import { ResultList } from '../components/results/ResultList';
import { Pagination } from '../components/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/castomLocalStorage';
import { NameData, ThemeContextType } from '../utils/types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 0,
  setTheme: () => {}
});

function App() {
  const [theme, setTheme] = useState(1);
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [searchName, setSearchName] = useLocalStorage('');
  const [localData, setLocalData] = useState<NameData>({
    searchName: searchName || '',
    submitName: searchName || ''
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 1 ? 'container' : 'container light'}>
        <h1 className="header">Search pokemon!</h1>
        <main className="main-section">
          <Search
            setLocalData={setLocalData}
            setSearchName={setSearchName}
            localData={localData}
          />
          <ResultList
            submitName={localData.submitName}
            currentPage={currentPage}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <FlyoutPanel />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
