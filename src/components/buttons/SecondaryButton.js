import React from "react";

const SecondaryButton = (props) => {
  return (
    <button
      className="border disabled:animate-pulse disabled:bg-yalaPrimary/25 hover:border-yalaPrimary px-7 py-3 hover:text-yalaPrimary hover:bg-transparent rounded-lg bg-yalaPrimary text-white transition duration-500 ease-in-out"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default SecondaryButton;
