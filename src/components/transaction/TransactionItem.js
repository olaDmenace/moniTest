import React, { useEffect, useState } from "react";

const TransactionItem = ({ amount, sender, spendType, sent }) => {
  const [senderName, setSenderName] = useState("");

  // console.log(sender);

  useEffect(() => {
    if (sender) {
      setSenderName(sender);
    } else {
      setSenderName("Unknown Sender");
    }
    // console.log(sender.displayName);
    // // Check if sender data is available
    // if (sender && typeof sender === "object" && sender.displayName) {
    //   setSenderName(sender.displayName);
    // } else {
    //   // Handle if sender data is not available
    //   setSenderName("Unknown Sender");
    // }
  }, [sender]);

  return (
    <div className="flex font-bold justify-between items-center h-fit py-3 lg:py-1 md:py-2 even:bg-white odd:bg-slate-200 px-2">
      <span className="text-xs text-black/50">
        <h3 className="text-black lg:text-sm">{senderName}</h3>
        {spendType}
      </span>
      <h3
        className={sent ? "text-red-600" : "text-green-600"}
      >{`$${amount}`}</h3>
    </div>
  );
};

export default TransactionItem;
