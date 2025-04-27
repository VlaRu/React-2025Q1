import { NameData, SearchProps } from '../../utils/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Search.css';
import { Theme } from '../theme/Theme';
import { useState } from 'react';

export function Search({
  setLocalData,
  setSearchName,
  localData
}: SearchProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const currentPage = searchParams.get('page') || 1;
    const query = localData.searchName.trim();
    navigate(`/?page=${currentPage}&q=${encodeURIComponent(query)}`);

    setLocalData((prevState: NameData) => ({
      ...prevState,
      submitName: localData.searchName
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const validatedQuery = value.replace(/[^a-zA-Z0-9\s]/g, '');
    setLocalData((prevState: NameData) => ({
      ...prevState,
      searchName: validatedQuery
    }));
    setSearchName(validatedQuery);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setLocalData((prevState) => ({
      ...prevState,
      searchName: ''
    }));
    setSearchName('');
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmitSearch}>
        <input
          placeholder="Search..."
          value={localData.searchName}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          className="input-search"
        />
        <input type="submit" value="search" className="submit-search-btn" />
      </form>
      <Theme />
    </div>
  );
}
