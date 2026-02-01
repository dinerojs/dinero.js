import { useState, useEffect } from 'react';

export function useLocalStorage<TValue>(
  key: string,
  initialValue: TValue
): [TValue, (value: TValue | ((prev: TValue) => TValue)) => void] {
  const [storedValue, setStoredValue] = useState<TValue>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
