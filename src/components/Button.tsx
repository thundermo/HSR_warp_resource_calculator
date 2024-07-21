import React from "react";

interface Props {
  children: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  style?: string;
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary", style }: Props) => {
  return (
    <button className={"btn btn-" + color + " " + style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
