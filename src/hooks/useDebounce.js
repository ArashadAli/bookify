import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of `value`.
 * @param {any}    value
 * @param {number} delay  — milliseconds (default 350ms)
 */
export const useDebounce = (value, delay = 350) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};