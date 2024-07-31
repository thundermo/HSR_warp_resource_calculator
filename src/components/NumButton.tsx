import React, { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";

// interface WarpDate {
//   date: Date;
//   daysRemaining: number | "";
//   firstDayOfMonthCount: number;
//   mondayCount: number;
//   treasuresLightwardCount: number;
// }
interface NumButtonProps<T extends Record<string, any>> {
  targetObject: T;
  targetItem: keyof T;
  setTarget: Dispatch<SetStateAction<T>>;
  addValue: number;
  subtractValue: number;
  max?: number;
}

const NumButton = <T extends Record<string, any>>({
  targetObject,
  targetItem,
  setTarget,
  addValue,
  subtractValue,
  max,
}: NumButtonProps<T>) => {
  const handleClick = (value: number) => {
    const item = targetObject[targetItem];
    const changedValue = item + value;
    if (changedValue < 0 || (max !== undefined && changedValue > max)) return;
    setTarget((prev: any) => ({
      ...prev,
      [targetItem]: changedValue,
    }));
  };

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="fw-bold"
        onClick={() => handleClick(addValue)}
      >
        +
      </Button>
      <Button
        size="sm"
        variant="secondary"
        className="fw-bold"
        onClick={() => handleClick(subtractValue)}
      >
        -
      </Button>
    </>
  );
};

export default NumButton;
