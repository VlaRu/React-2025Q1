import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import './Flyout.css';
import { AppDispatch, RootState } from '../../store/store';
import { resetCount } from '../../store/counterSlice';
import { clearAllSelectedPokemon } from '../../store/selectedPokemon';

export function FlyoutPanel() {
  const count = useSelector((state: RootState) => state.counter.value);
  const selectedPokemon = useSelector(
    (state: RootState) => state.selectedPokemon.selectedPokemon
  );

  const dispatch = useDispatch<AppDispatch>();
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  function handleReset() {
    dispatch(resetCount());
    dispatch(clearAllSelectedPokemon());
  }

  function handleDownload() {
    if (count === 0) return;

    const csvContent = `Pokemon ID\n${selectedPokemon.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${count}_pokemon.csv`;
      downloadLinkRef.current.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    count > 0 && (
      <div
        data-testid="flyout-panel"
        className={`flyout-panel ${count > 0 ? 'show' : ''}`}
      >
        <button className="flyout-btn" onClick={handleReset}>
          Unselect all
        </button>
        <p className="flyout-count">Saved:{count}</p>
        <button className="flyout-btn" onClick={handleDownload}>
          <a ref={downloadLinkRef}>Download</a>
        </button>
      </div>
    )
  );
}
