import Image from "next/image";
// import mastercard from "@/images/mastercard.svg";
import mastercard from "../../images/mastercard.svg";
import chip from "../../images/chip.svg";
import connect from "../../images/connect.svg";
import React from "react";

const CreditCard = (props) => {
  return (
    <div className="relative">
      <div className="absolute right-[-15%] md:right-[-5%] top-[-15%] size-32 bg-gradient-radial from-amber-500 to-yalaPrimary rounded-full"></div>
      <div className="absolute left-[-15%] md:left-[-5%] bottom-[-15%] size-32 bg-[#FFA800] rounded-full"></div>
      <div className="bg-gradient-to-br border-yalaPrimary grid content-evenly px-8 from-white/50 to-[#5B5B5B]/80 h-60 md:h-72 lg:h-56 backdrop-blur-md backdrop-filter relative rounded-lg shadow-xl">
        <h4 className="text-yalaPrimary font-medium md:font-bold md:text-3xl text-2xl">
          <p className="text-yalaPrimary text-sm">Balance:</p>
          {`$ ${props.balance}`}
        </h4>
        <div className="flex gap-3">
          <Image src={chip} alt="chip" className="w-14" />
          <Image src={connect} alt="connect" className="w-6" />
        </div>
        <p className="font-medium text-lg text-white uppercase z-10">
          {props.name}
        </p>
        <Image
          src={mastercard}
          alt="mastercard"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default CreditCard;
