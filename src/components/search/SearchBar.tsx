import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultList } from '../results/ResultList';
import { Pagination } from '../pagination/Pagination';
import { FlyoutPanel } from '../flyout/Flyout';
import './Search.css';

type NameData = {
  searchName: string,
  submitName: string
};

function useSearchQuery(defaultValue: string) {
  const storedValue = localStorage.getItem('name') || defaultValue;
  const [query, setQuery] = useState<string>(storedValue);

  useEffect(() => {
    localStorage.setItem('name', query);
  }, [query]);

  return [query, setQuery] as const;
}

export function Search() {
  const [searchName, setSearchName] = useSearchQuery('');
  const [localData, setLocalData] = useState<NameData>({
    searchName: searchName || '',
    submitName: searchName || ''
  });

  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLocalData((prevState) => ({
      ...prevState,
      submitName: localData.searchName
    }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const validatedQuery = value.replace(/[^a-zA-Z0-9\s]/g, '');
    setLocalData((prevState) => ({
      ...prevState,
      searchName: validatedQuery
    }));
    setSearchName(validatedQuery);
  };

  return (
    <main className="main-section">
      <form onSubmit={handleSubmitSearch} className="search-form">
        <input
          placeholder="Search..."
          value={localData.searchName}
          onChange={handleSearchChange}
          className="input-search"
        />
        <input type="submit" value="search" className="submit-search-btn" />
      </form>
      <ResultList submitName={localData.submitName} currentPage={currentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <FlyoutPanel />
    </main>
  );
}
