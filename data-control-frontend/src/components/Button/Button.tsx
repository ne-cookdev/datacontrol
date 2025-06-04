import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, type = "button", text, className = "" }) => {
  return (
    <button onClick={onClick} type={type} className={`button ${className}`}>
      {text}
    </button>
  );
};
