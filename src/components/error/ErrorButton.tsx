import { useState } from 'react';

export default function ErrorButton() {
  const [isError, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('The error was occured');
  }
  return (
    <button onClick={handleClick} className="error-btn">
      Show error
    </button>
  );
}
