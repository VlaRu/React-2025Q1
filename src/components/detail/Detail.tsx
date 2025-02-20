import { useGetPokemonDetailQuery } from '../../api/fetchData';
import spinner from './../../assets/spinner.svg';
import './Detail.css';

interface DetailProps {
  id: string;
  handleCloseCard: () => void;
}

export function DetailedCard({ id, handleCloseCard }: DetailProps) {
  const { data, error, isLoading } = useGetPokemonDetailQuery(id);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <img src={spinner} alt="Loading..." />
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>Error loading details!</p>
      ) : data ? (
        <div className="detail-container">
          <button className="close-detail_btn" onClick={handleCloseCard}>
            X
          </button>
          <img
            src={data.data.images?.small || ''}
            alt="pokemon-img"
            width={400}
          />
          <h2>{data.data.name}</h2>
          <p>
            `Description: {data.data.flavorText || 'No description available'}`
          </p>
        </div>
      ) : null}
    </div>
  );
}
