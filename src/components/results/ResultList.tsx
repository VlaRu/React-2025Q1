import Cards from './CardsResults';
import spinner from './../../assets/spinner.svg';
import { useGetPokemonByNameQuery } from '../../api/fetchData';
import { ResultListProps } from '../../utils/types';

export function ResultList({ submitName, currentPage }: ResultListProps) {
  const { data, error, isLoading } = useGetPokemonByNameQuery({
    queryName: submitName,
    page: currentPage
  });
  return (
    <>
      {error ? (
        <p style={{ color: 'red' }}>Oh no, there was an error!</p>
      ) : isLoading ? (
        <div className="spinner-container">
          <img src={spinner} alt="Loading..." />
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <>
          <Cards data={data.data} />
        </>
      ) : (
        <p>No Pokémon found.</p>
      )}
    </>
  );
}
