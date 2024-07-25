import { useState } from "react";

const useInputHandler = (initialValue = "0") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleFocus = () => {
    if (value === "0") setValue("");
  };

  const handleBlur = () => {
    if (value === "") setValue("0");
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
