import { useState } from 'react';
import {
  getPokemonByName,
  getPokemonDetail,
  getRunningQueriesThunk
} from '../src/api/fetchData';
import { useRouter } from 'next/router';
import { wrapper } from '../src/store/store';
import React from 'react';
import { ResultList } from '../src/components/results/ResultList';
import { Pagination } from '../src/components/pagination/Pagination';
import { Search } from '../src/components/search/SearchBar';

const DEFAULT_PAGE: number = 1;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context): Promise<{ props: object }> => {
      const { name, page, details } = context.query;

      await store.dispatch(
        getPokemonByName.initiate({
          queryName: name?.toString() || '',
          page: Number(page) || DEFAULT_PAGE
        })
      );

      if (details) {
        await store.dispatch(getPokemonDetail.initiate(details.toString()));
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {}
      };
    }
);

export default function Home() {
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ query: { name: searchName, page: 1 } });
  };

  return (
    <main className="container">
      <h1 className="header">Search Pokémon</h1>
      <Search
        searchName={searchName}
        setSearchName={setSearchName}
        onSubmit={handleSearchSubmit}
      />
      <ResultList submitName={searchName} currentPage={currentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
