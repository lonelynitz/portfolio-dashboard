import { useEffect, useState } from "react";

interface DebounceProps {
    initialValue : string,
    debounce : number,
    onChange : (value: string) => void
}

const useDebounce = ({initialValue, debounce , onChange} : DebounceProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);
};

export default useDebounce
