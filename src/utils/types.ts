type PokemonDetailResponse = {
  data: DataDetail
};

interface DataDetail {
  id: string;
  images: {
    small?: string
  };
  name: string;
  flavorText: string;
  weaknesses?: Weaknesses[] | undefined;
  attacks?: Attacks[] | undefined;
}

type Weaknesses = {
  type?: string,
  value?: string
};

type Attacks = {
  name?: string,
  convertedEnergyCost?: string,
  damage?: string,
  text?: string
};

type DataFetchingState = {
  data: pokemonType[],
  isLoading?: boolean
};

type pokemonType = {
  name: string,
  id: string,
  flavorText: string,
  images: {
    small?: string,
    large?: string
  }
};

type ResultListProps = {
  submitName: string,
  currentPage: number
};

type ThemeContextType = {
  theme: number,
  setTheme: (theme: number) => void
};

type NameData = {
  searchName: string,
  submitName: string
};

interface SearchProps {
  setLocalData: React.Dispatch<React.SetStateAction<NameData>>;
  setSearchName: (value: string) => void;
  localData: NameData;
}

export type {
  PokemonDetailResponse,
  DataDetail,
  DataFetchingState,
  pokemonType,
  ResultListProps,
  ThemeContextType,
  NameData,
  SearchProps
};
