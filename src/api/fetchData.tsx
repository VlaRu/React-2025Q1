import { useState, useEffect } from 'react';
import { URL } from './constants';
import { Pagination } from '../components/pagination/Pagination';
import { ResultList } from '../components/results/resultList';
import { pokemonType } from '../components/results/CardsResults';

type DataFetchingProps = {
  query: string
};

type DataFetchingState = {
  pokemonData: pokemonType[],
  isFetching: boolean
};

export default function FetchData({ query }: DataFetchingProps) {
  const [dataFetch, setDataFetch] = useState<DataFetchingState>({
    pokemonData: [],
    isFetching: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (query) {
      setCurrentPage(1);
    }
  }, [query]);

  const queryParameters = `?page=${currentPage}&pageSize=6&q=name:`;
  const queryString = query
    ? `${queryParameters}${query}*`
    : `${queryParameters}*`;

  useEffect(() => {
    const fetchData = async () => {
      setDataFetch((prevState) => ({ ...prevState, isFetching: true }));
      fetch(`${URL}${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          setDataFetch({ pokemonData: data.data, isFetching: false });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setDataFetch((prevState) => ({ ...prevState, isFetching: true }));
        });
    };

    fetchData();
  }, [query, queryString, currentPage]);

  return (
    <>
      <ResultList
        isFetching={dataFetch.isFetching}
        pokemonData={dataFetch.pokemonData}
      />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export async function FetchDetailCard({ idCard }) {
  try {
    const response = await fetch(`${URL}${idCard.id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
