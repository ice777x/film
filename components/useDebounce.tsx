import React from "react";

function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
export default useDebounce;
