import './Cards.css';
import { DetailedCard } from '../detail/Detail';
import { pokemonType } from '../../utils/types';
import HeartIcon from '../heart/heartSvg';
import { useNavigate } from 'react-router';

export interface CreateCardsProps {
  data: pokemonType[];
}

export default function Cards({ data }: CreateCardsProps) {
  const searchParams = new URLSearchParams(window.location.search);
  const selectedCardId = searchParams.get('id');
  const navigate = useNavigate();

  function handleOpenCard(id: string) {
    searchParams.set('id', id);
    navigate(`?${searchParams.toString()}`, { replace: false });
  }

  function handleCloseCard() {
    searchParams.delete('id');
    navigate(`?${searchParams.toString()}`, { replace: false });
  }

  return (
    <div className="cards-section">
      {!data ? (
        <p className="error-info">Loading data...</p>
      ) : data.length > 0 ? (
        <div className="container-cards">
          {data.map((pokemon: pokemonType) => (
            <div
              key={pokemon.id}
              className="container-card"
              onClick={() => handleOpenCard(pokemon.id)}
            >
              <HeartIcon id={pokemon.id} />
              <div>
                <h2 className="title-name">Name: {pokemon.name}</h2>
              </div>
              <div className="container-img_card">
                <div className="card-inner">
                  <div className="card-front">
                    <img
                      src={pokemon.images.small}
                      alt="pokemon-front"
                      className="pokemon-img"
                    />
                  </div>
                  <div className="card-back">
                    <img
                      src="https://images.pokemontcg.io/mcd14/1.png"
                      alt="pokemon-back"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="error-info">Not found...</p>
      ) : (
        <p className="error-info">Loading data...</p>
      )}
      {selectedCardId && (
        <DetailedCard id={selectedCardId} handleCloseCard={handleCloseCard} />
      )}
    </div>
  );
}