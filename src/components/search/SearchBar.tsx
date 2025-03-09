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

type SearchProps = {
  searchName: string;
  setSearchName: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function useSearchQuery(defaultValue: string) {
  const storedValue =
    typeof window !== 'undefined' ? localStorage.getItem('name') : null;  const [query, setQuery] = useState<string>(storedValue);

  useEffect(() => {
    localStorage.setItem('name', query);
  }, [query]);

  return [query, setQuery] as const;
}

export function Search({ searchName, setSearchName, onSubmit }: SearchProps) {
  const router = useRouter();
  const { query } = router;
  const initialPage = Number(query.page) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, query.page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const validatedQuery = value.replace(/[^a-zA-Z0-9\s]/g, '');
    setSearchName(validatedQuery);
  };

  return (
    <main className="main-section">
      <form onSubmit={onSubmit} className="search-form">
        <input
          placeholder="Search..."
          value={searchName}
          onChange={handleSearchChange}
          className="input-search"
        />
        <input type="submit" value="search" className="submit-search-btn" />
      </form>
      <FlyoutPanel />
    </main>
  );
}
