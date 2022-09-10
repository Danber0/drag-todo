import React, { FC } from "react";

import "./Button.scss";

interface ButtonProps {
  text: string;
  color: string;
  backgroundColor: string;
  type: "add" | "remove";
}

const Button: FC<ButtonProps> = ({ text, color, type, backgroundColor }) => {
  return (
    <React.Fragment>
      <button className="add-button" style={{ backgroundColor }}>
        <span style={{ color }}>{text}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.625 0H4.375V4.375H0V5.625H4.375V10H5.625V5.625H10V4.375H5.625V0Z"
            fill={color}
          />
        </svg>
      </button>
    </React.Fragment>
  );
};

export default Button;
