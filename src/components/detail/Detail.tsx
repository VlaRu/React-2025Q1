import { FetchDetailCard } from '../../api/fetchData';

interface DataDetail {
  id: string;
  images: {
    small?: string
  };
}

interface Detail {
  data: DataDetail;
  isActiveDetails: boolean;
  setActiveDetails: (id: boolean) => void;
}
export function DetailedCard({
  data,
  isActiveDetails,
  setActiveDetails
}: Detail) {
  FetchDetailCard({ idCard: data });

  function handleCloseCard() {
    setActiveDetails(false);
  }

  return (
    <>
      {isActiveDetails && (
        <div className="detail-container">
          <button onClick={handleCloseCard}>X</button>
          <img src={data.images.small} alt="pokemon-img" width={400} />
        </div>
      )}
    </>
  );
}
