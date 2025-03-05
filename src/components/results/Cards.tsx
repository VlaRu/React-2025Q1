import { useState } from 'react';
import './Cards.css';
import { DetailedCard } from '../detail/Detail';
import HeartIcon from './heartSvg';
import { pokemonType } from '../../utils/types';

export interface CreateCardsProps {
  data: pokemonType[];
}

export default function Cards({ data }: CreateCardsProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  function handleOpenCard(id: string) {
    setSelectedCardId(id);
  }

  function handleCloseCard() {
    setSelectedCardId(null);
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
                <h2>Name: {pokemon.name}</h2>
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
