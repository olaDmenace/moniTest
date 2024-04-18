import React from "react";
import Image from "next/image";
// import Logo from "@/images/yalaLogo.svg";
import Logo from "../../images/yalaLogo.svg";

const Navbar = () => {
  return (
    <div className="w-full px-[3%] py-6 lg:max-w-7xl mx-auto">
      <Image src={Logo} alt="logo" />
    </div>
  );
};

export default Navbar;
