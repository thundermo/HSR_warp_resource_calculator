import { useState } from "react";

const useInputHandler = (initialValue = 0) => {
  const [value, setValue] = useState<number | "">(initialValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleFocus = () => {
    if (value === 0) setValue("");
  };

  const handleBlur = () => {
    if (value === "") setValue(0);
  };

  return {
    value,
    setValue,
    handleChange,
    handleFocus,
    handleBlur,
  };
};

export default useInputHandler;
