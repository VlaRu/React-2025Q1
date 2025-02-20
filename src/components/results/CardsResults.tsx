import { useState } from 'react';
import './CardsResults.css';
import { DetailedCard } from '../detail/Detail';
import HeartIcon from './heartSvg';
import { pokemonType } from '../../utils/types';
import { Outlet } from 'react-router-dom';

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
    <main className="main-section">
      {!data ? (
        <p className="error-info">Loading data...</p>
      ) : data.length > 0 ? (
        <div className="container-cards">
          {data.map((pokemon: pokemonType) => (
            <div key={pokemon.id} className="container-card">
              <HeartIcon id={pokemon.id} />
              <div>
                <h2>Name: {pokemon.name}</h2>
              </div>
              <div
                className="container-img_card"
                onClick={() => handleOpenCard(pokemon.id)}
              >
                <img src={pokemon.images.small} alt="pokemon-img" />
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
      <Outlet />
    </main>
  );
}
