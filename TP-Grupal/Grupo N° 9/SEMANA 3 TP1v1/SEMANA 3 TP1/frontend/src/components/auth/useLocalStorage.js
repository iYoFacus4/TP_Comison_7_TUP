import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setLocalStorage = (value) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setLocalStorage];
}
