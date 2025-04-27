import { useEffect, useState } from 'react';

export function useLocalStorage(defaultValue: string) {
  const storedValue = localStorage.getItem('name') || defaultValue;
  const [query, setQuery] = useState<string>(storedValue);

  useEffect(() => {
    localStorage.setItem('name', query);
  }, [query]);

  return [query, setQuery] as const;
}
