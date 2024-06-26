import React, { useEffect, useState } from "react";

const TransactionItem = ({ amount, sender, spendType, sent }) => {
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    if (sender) {
      setSenderName(sender);
    } else {
      setSenderName("Unknown Sender");
    }
  }, [sender]);

  return (
    <div className="flex font-bold justify-between items-center h-fit py-3 lg:py-1 md:py-2 even:bg-white odd:bg-slate-200 px-2">
      <span className="text-xs text-black/50">
        {spendType}
        <h3 className="text-black lg:text-sm">{senderName}</h3>
      </span>
      <h3
        className={sent ? "text-red-600" : "text-green-600"}
      >{`$${amount}`}</h3>
    </div>
  );
};

export default TransactionItem;
