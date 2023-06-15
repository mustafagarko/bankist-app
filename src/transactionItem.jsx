import React from "react";

const TransactionItem = ({ data, index, deleteEl }) => {
  return (
    <section>
      <div className="flex gap-20 justify-between">
        <button
          onClick={() => deleteEl(index)}
          className="rounded-full bg-[#8C385A] text-white text-lg w-2 h-2 flex items-center justify-center px-0 py-0"
        >
          ⛔️
        </button>
        <h2>{data.desc}</h2>
      </div>
      <div className="flex justify-between border-b-2 border-[#8C385A] py-1 ">
        <h2>{data.date}</h2>
        <h2
          className={`${
            data.selectedOption === `exp` ? `text-red-500` : `text-green-500`
          }`}
        >
          {data.selectedOption === "exp" ? `-` : `+`}
          {data.amount}
        </h2>
      </div>
    </section>
  );
};

export default TransactionItem;
