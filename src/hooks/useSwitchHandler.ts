import { useState } from "react";

const useSwitchHandler = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  return {
    value,
    handleChange,
  };
};

export default useSwitchHandler;
