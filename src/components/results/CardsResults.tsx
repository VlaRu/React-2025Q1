import { useState } from 'react';
import './CardsResults.css';
import { DetailedCard } from '../detail/Detail';

export type pokemonType = {
  name: string,
  id: string,
  flavorText: string,
  images: {
    small?: string,
    large?: string
  }
};

export interface CreateCardsProps {
  data: pokemonType[];
}

export default function Cards({ data }: CreateCardsProps) {
  const [selectedCard, setSelectedCard] = useState<pokemonType | null>(null);
  const [isActiveDetails, setActiveDetails] = useState(false);

  function handleOpenCard(cardId: pokemonType) {
    setSelectedCard(cardId);
    setActiveDetails(true);
  }

  return (
    <main className="main-section">
      {data && data.length > 0 ? (
        <div className="container-cards">
          {data.map((pokemon: pokemonType) => (
            <div
              key={pokemon.id}
              className="container-card"
              onClick={() => handleOpenCard(pokemon)}
            >
              <h2>Name: {pokemon.name}</h2>
              <div className="container-img_card">
                <img src={pokemon.images.small} alt="pokemon-img" />
              </div>
              {pokemon.flavorText ? (
                <h3 style={{ fontSize: '18px' }}>
                  Description: {pokemon.flavorText}
                </h3>
              ) : (
                <h3>Description is absent</h3>
              )}
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="error-info">Not found...</p>
      ) : (
        <p className="error-info">Loading data...</p>
      )}
      {selectedCard && (
        <DetailedCard
          data={selectedCard}
          isActiveDetails={isActiveDetails}
          setActiveDetails={setActiveDetails}
        />
      )}
    </main>
  );
}
