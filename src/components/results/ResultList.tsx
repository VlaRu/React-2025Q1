import Cards, { pokemonType } from './CardsResults';
import spinner from './../../assets/spinner.svg';

type ResultListProps = {
  isFetching: boolean,
  pokemonData: pokemonType[]
};

export function ResultList({ isFetching, pokemonData }: ResultListProps) {
  return (
    <>
      {isFetching ? (
        <div className="spinner-container">
          <img src={spinner} alt="Loading..." />
        </div>
      ) : (
        <Cards data={pokemonData} />
      )}
    </>
  );
}
