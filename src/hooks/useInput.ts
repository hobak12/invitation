import { useRef, useState } from "react";
import { debounce } from "lodash";

const useInput = (initialValue: string, target: string) => {
  const inputRef = useRef<any>();
  const [value, setValue] = useState(initialValue);
  const trimValue = value && value.trim();

  const changeValueHandler = debounce((event: React.ChangeEvent<any>) => {
    setValue(event.target.value);
  }, 500);

  return {
    inputRef,
    value,
    setValue,
    trimValue,
    changeValueHandler,
  };
};

export default useInput;
