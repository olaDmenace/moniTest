import Image from "next/image";
import avatar from "../../images/avatar.png";
import React from "react";

const UserSummary = (props) => {
  return (
    <div className="max-w-full text-white/70 flex items-center">
      <Image src={avatar} alt="avatar" className="size-12 rounded-full" />
      <div>
        <h3 className="font-medium text-xl lg:text-lg">{props.username}</h3>
        <p className="text-[8px]">{props.email}</p>
      </div>
    </div>
  );
};

export default UserSummary;
