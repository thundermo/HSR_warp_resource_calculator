import React from "react";
import { Button } from "react-bootstrap";

type WrapDate = {
  date: Date;
  daysRemaining: number | "";
  firstDayOfMonthCount: number;
  mondayCount: number;
  treasuresLightwardCount: number;
};

interface NumButtonProps {
  target: WrapDate;
  setTarget: React.Dispatch<React.SetStateAction<WrapDate>>;
  addValue: number;
  subtractValue: number;
}

const NumButton: React.FC<NumButtonProps> = ({
  target,
  setTarget,
  addValue,
  subtractValue,
}) => {
  const handleClick = (value: number) => {
    if (target.daysRemaining === "") return;
    if (typeof value !== "number") console.log("wrong type: value=");
    const changeValue =
      target.daysRemaining + value < 0 ? 0 : target.daysRemaining + value;
    setTarget((prev) => ({
      ...prev,
      daysRemaining: changeValue,
    }));
  };

  return (
    <>
      <Button
        variant="secondary"
        className="fw-bold"
        onClick={() => handleClick(addValue)}
      >
        +
      </Button>
      <Button
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
