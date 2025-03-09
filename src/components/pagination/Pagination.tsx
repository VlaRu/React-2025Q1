import { useRouter } from 'next/router';

type PaginationProps = {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

export function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  const router = useRouter();
  const { query } = router;

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      router.push({ query: { ...query, page: newPage } });
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    router.push({ query: { ...query, page: newPage } });
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
