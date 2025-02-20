export type PokemonDetailResponse = {
  data: DataDetail
};
export interface DataDetail {
  id: string;
  images: {
    small?: string
  };
  name: string;
  flavorText: string;
}

export type DataFetchingState = {
  data: pokemonType[],
  isLoading?: boolean
};

export type pokemonType = {
  name: string,
  id: string,
  flavorText: string,
  images: {
    small?: string,
    large?: string
  }
};

export type ResultListProps = {
  submitName: string,
  currentPage: number
};
