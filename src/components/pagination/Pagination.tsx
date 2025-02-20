import { useNavigate, useSearchParams } from 'react-router-dom';
import './Pagination.css';

type PaginationProps = {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

export function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      const newPage = currentPage - 1;
      navigate(`/?page=${newPage}&q=${searchParams.get('q') || ''}`);
    }
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    const newPage = currentPage + 1;
    navigate(`/?page=${newPage}&q=${searchParams.get('q') || ''}`);
  };

  return (
    <div className="pagination-container">
      <button
        className="btn-pagination"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        prev
      </button>
      <p>{currentPage}</p>
      <button className="btn-pagination" onClick={handleNext}>
        next
      </button>
    </div>
  );
}
