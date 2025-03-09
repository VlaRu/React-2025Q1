import { useGetPokemonDetailQuery } from '../../api/fetchData';
import spinner from '../../../public/assets/spinner.svg';
import './Detail.css';

interface DetailProps {
  id: string;
  handleCloseCard: () => void;
}

export function DetailedCard({ id, handleCloseCard }: DetailProps) {
  const { data, error, isLoading } = useGetPokemonDetailQuery(id);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <img src={spinner} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error loading details!</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div data-testId="detailed-card" className="detail-container">
      <button className="close-detail_btn" onClick={handleCloseCard}>
        X
      </button>
      <img
        src={data.data.images?.small || ''}
        alt="pokemon-img"
        className="detail-img"
      />
      <div className="detail-text_container">
        <h2>{data.data.name}</h2>
        <p>Description: {data.data.flavorText || 'description available'}</p>
      </div>
    </div>
  );
}
