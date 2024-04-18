import React from "react";

const TransactionItem = (props) => {
  return (
    <div className="flex font-bold justify-between items-center h-fit py-3 lg:py-1 md:py-2 even:bg-white odd:bg-slate-200 px-2">
      <span className="text-xs text-black/50">
        {/* Udemy */}
        <h3 className="text-black lg:text-sm">{props.spendType}</h3>
      </span>
      <h3>{`$${props.amount}`}</h3>
    </div>
  );
};

export default TransactionItem;
