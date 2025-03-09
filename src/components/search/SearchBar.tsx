import { useEffect, useState } from 'react';
import { ResultList } from '../results/ResultList';
import { Pagination } from '../pagination/Pagination';
import { FlyoutPanel } from '../flyout/Flyout';
import './Search.css';
import { useRouter } from 'next/router';

type NameData = {
  searchName: string,
  submitName: string
};

function useSearchQuery(defaultValue: string) {
  const storedValue =
    typeof window !== 'undefined' ? localStorage.getItem('name') : null;  const [query, setQuery] = useState<string>(storedValue);

  useEffect(() => {
    localStorage.setItem('name', query);
  }, [query]);

  return [query, setQuery] as const;
}

export function Search() {
  const router = useRouter();
  const { query } = router;

  const [searchName, setSearchName] = useSearchQuery('');
  const [localData, setLocalData] = useState<NameData>({
    searchName: searchName || '',
    submitName: searchName || ''
  });

  const initialPage = Number(query.page) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, query.page]);

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push({
      pathname: '/',
      query: { name: localData.searchName, page: 1 }
    });
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
