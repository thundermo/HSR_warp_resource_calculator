import { Dispatch, SetStateAction } from "react";

const useInputHandler = <T extends Record<string, any>>(
  targetObject: T,
  setTargetObject: Dispatch<SetStateAction<T>>
) => {
  const handleNumberChange = (e: React.ChangeEvent<any>) => {
    const newValue = e.target.value;
    if (newValue !== "" && !/^[0-9]*$/.test(newValue)) return;
    setTargetObject({
      ...targetObject,
      [e.target.name]: newValue === "" ? "" : parseInt(newValue),
    });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetObject({
      ...targetObject,
      [e.target.name]: e.target.checked,
    });
  };

  const handleFocus = (e: React.FocusEvent<any>) => {
    if (e.target.value === "0")
      setTargetObject({
        ...targetObject,
        [e.target.name]: "",
      });
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    if (e.target.value === "")
      setTargetObject({
        ...targetObject,
        [e.target.name]: 0,
      });
  };

  return {
    handleNumberChange,
    handleSwitchChange,
    handleFocus,
    handleBlur,
  };
};

export default useInputHandler;
