import { useState, useEffect } from 'react';
import Cards, { pokemonType } from '../components/results/CardsResults';
import spinner from './../assets/spinner.svg';
import { URL } from './constants';

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

  useEffect(() => {
    const fetchData = async () => {
      setDataFetch((prevState) => ({ ...prevState, isFetching: true }));
      const queryString = query ? `q=name:${query}*` : '';
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

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <main>
      {dataFetch.isFetching ? (
        <div className="spinner-container">
          <img src={spinner} alt="Loading..." />
        </div>
      ) : (
        <Cards data={dataFetch.pokemonData} />
      )}
    </main>
  );
}
