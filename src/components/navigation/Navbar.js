import React from "react";
import Image from "next/image";
import Logo from "../../images/yalaLogo.svg";

const Navbar = ({ onClick }) => {
  return (
    <>
      <div className="w-full px-[3%] py-6 lg:max-w-7xl mx-auto flex items-start justify-between">
        <Image src={Logo} alt="logo" />
        <svg viewBox="0 0 100 80" width="30" height="30" onClick={onClick}>
          <rect width="100" height="10" rx="5"></rect>
          <rect y="30" width="100" height="10" rx="5"></rect>
          <rect y="60" width="100" height="10" rx="5"></rect>
        </svg>
      </div>
    </>
  );
};

export default Navbar;
