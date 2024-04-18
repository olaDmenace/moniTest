import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      className="border border-yalaPrimary px-4 py-2 text-yalaPrimary rounded-lg hover:bg-yalaPrimary hover:text-white/80 transition duration-500 ease-in-out"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default PrimaryButton;
