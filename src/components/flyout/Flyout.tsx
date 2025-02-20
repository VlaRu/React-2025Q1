import { useDispatch, useSelector } from 'react-redux';
import './Flyout.css';
import { AppDispatch, RootState } from '../../store/store';
import { resetCount } from '../../store/counterSlice';
import { clearAllSelectedPokemon } from '../../store/selectedPokemon ';

export function FlyoutPanel() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  function handleReset() {
    dispatch(resetCount());
    dispatch(clearAllSelectedPokemon());
  }

  return (
    <div className="flyout-panel">
      <button className="flyout-btn" onClick={handleReset}>
        Unselect all
      </button>
      <p className="flyout-count">Saved:{count}</p>
      <button className="flyout-btn" onClick={handleReset}>
        Download
      </button>
    </div>
  );
}
