import { useGetPokemonDetailQuery } from '../../api/fetchData';
import spinner from './../../assets/spinner.svg';
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
      <div className="detail-content-container">
        <div className="detail-img_container">
          <img
            src={data.data.images?.small || ''}
            alt="pokemon-img"
            className="detail-img"
          />
        </div>
        <div className="detail-text_container">
          <h2>{data.data.name}</h2>
          <p>
            <b>Description:</b>{' '}
            {data.data.flavorText || 'description available'}
          </p>
          <h3>Weaknesses:</h3>
          <p>
            <b>type:</b>
            {data.data.weaknesses?.[0]?.type || 'description available'}
          </p>
          <p>
            <b>value:</b>{' '}
            {data.data.weaknesses?.[0]?.value || 'description available'}
          </p>
          <p>
            <b>Attacks:</b>
          </p>
          <p>
            <b>Type:</b>{' '}
            {data.data.attacks?.[0]?.name || 'description available'}
          </p>
          <p>
            <b>Damage:</b>
            {data.data.attacks?.[0]?.damage || 'description available'}
          </p>
          <p>
            <b>Converted Energy Cost:</b>{' '}
            {data.data.attacks?.[0]?.convertedEnergyCost ||
              'description available'}
          </p>
          <p>
            <b>Text:</b>{' '}
            {data.data.attacks?.[0]?.text || 'description available'}
          </p>
        </div>
      </div>
    </div>
  );
}
