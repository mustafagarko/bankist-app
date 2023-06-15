import "./App.css";
import React, { useState, useEffect } from "react";
import TransactionItem from "./transactionItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessCard from "./SuccessCard";

function App() {
  const [allTransactions, setTransactions] = useState([]);
  const [expencies, setExpencies] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState({
    amount: 0,
    date: "",
    desc: "",
    selectedOption: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [totalInc, setTotalInc] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    if (allTransactions[0]) {
      console.log(allTransactions);
      addExpOrInc();
    }
  }, [allTransactions]);

  useEffect(() => {
    if (expencies[0]) {
      console.log(expencies);
      setTotalExp(expencies.reduce((acc, num) => acc + num, 0));
    }
  }, [expencies]);

  useEffect(() => {
    if (incomes[0]) {
      console.log(incomes);
      setTotalInc(incomes.reduce((acc, num) => acc + num, 0));
    }
  }, [incomes]);

  useEffect(() => {
    if (selectedOption) {
      console.log(selectedOption);
    }
  }, [selectedOption]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const addTransaction = () => {
    if (inputValue?.amount > 0 && inputValue?.date && selectedOption) {
      setTransactions([...allTransactions, inputValue]);

      setInputValue({
        amount: 0,
        date: "",
        desc: "",
        selectedOption: "",
      });
    }
  };
  const addExpOrInc = function () {
    if (selectedOption === `exp`) {
      setExpencies([
        ...expencies,
        +allTransactions[allTransactions?.length - 1]?.amount,
      ]);
      setBalance(
        () =>
          Number(balance) -
          Number(allTransactions[allTransactions?.length - 1]?.amount)
      );
    }
    if (selectedOption === `inc`) {
      setIncomes([
        ...incomes,
        +allTransactions[allTransactions?.length - 1]?.amount,
      ]);
      setBalance(
        () =>
          Number(balance) +
          Number(allTransactions[allTransactions?.length - 1]?.amount)
      );
    }
    if (!selectedOption) {
      alert(`no selected option`);
    }
  };

  const handleChange = (e) => {
    console.log(e);
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const deleteElement = (index) => {
    console.log(index);

    let temp = [...allTransactions];
    console.log();
    temp.splice(index, 1);
    setTransactions(temp);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue({ ...inputValue, selectedOption: event.target.value });
  };

  const handleNotify = () => {
    if (!inputValue.amount) toast.error("Incorrect amount!");
    else if (!inputValue.date) toast.error("Incorrect date!");
    else if (!inputValue.desc) toast.error("Incorrect description!");
    else if (!inputValue.selectedOption)
      toast.error("Incorrect type of operation!");
  };

  return (
    <div className="bg-[#DF7390] min-h-screen">
      <div
        className={`
      text-center flex justify-center items-center flex-col gap-10`}
      >
        <div className="text-[#440009] ">
          <h1>Welcome to</h1>
          <h1>Financial Tracker App!</h1>
        </div>

        <div
          className={`${
            isActive ? "hidden" : ""
          } flex flex-col gap-5 items-center py-10 bg-[#E4B5D6] rounded-2xl px-5`}
          style={{ width: "350px", height: "600px" }}
        >
          <div className="flex justify-between gap-4 ">
            <h2>
              Balance <br /> {balance}$
            </h2>
            <button className="bg-[#8C385A] px-8" onClick={() => handleClick()}>
              ADD
            </button>
          </div>
          <div className="flex justify-between border-b-2 border-[#8C385A]">
            <h2> 🛍️ EXPENCIES: {totalExp}$ </h2>
            <h2>💸 INCOMES: {totalInc}$ </h2>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="flex justify-end">History</h2>
            {allTransactions.length
              ? allTransactions.map((e, index) => {
                  console.log(">> need to be mapped", e);
                  return (
                    <SuccessCard
                      key={index}
                      data={e}
                      deleteEl={deleteElement}
                      index={index}
                    />
                  );
                })
              : null}
          </div>
        </div>

        {/* SECOND FIELD */}
        <div
          className={`${
            !isActive ? "hidden" : ""
          } flex flex-col px-10 py-10 items-center gap-8 bg-[#E4B5D6] rounded-2xl`}
          // style={{ width: "350px", height: "900px" }}
        >
          <div className="flex justify-between items-center gap-4">
            <h2>
              Balance <br /> {balance}$
            </h2>
            <button className="bg-[#8C385A] px-6" onClick={() => handleClick()}>
              {" "}
              CANCEL
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <h2>﹩Amount</h2>

            <input
              value={inputValue?.amount}
              type="number"
              name="amount"
              onChange={handleChange}
            ></input>

            <h2>📅 Date</h2>
            <input
              type="date"
              value={inputValue?.date}
              name="date"
              onChange={handleChange}
            ></input>
            <h2>📝 Description</h2>
            <input
              value={inputValue?.desc}
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-10">
            <div>
              <input
                type="radio"
                name="expInc"
                value="exp"
                checked={selectedOption === `exp`}
                onChange={handleOptionChange}
                className="w-6 h-6 cursor-pointer"
              />
              <h2>EXPENSE</h2>
            </div>

            <div>
              <input
                type="radio"
                name="expInc"
                value="inc"
                checked={selectedOption === `inc`}
                onChange={handleOptionChange}
                className="w-6 h-6 cursor-pointer"
              />
              <h2>INCOME</h2>
            </div>

            {/* <p>selected optin: {selectedOption}</p> */}
          </div>
          <button
            className="bg-[#8C385A]"
            onClick={() => {
              addTransaction();
              handleNotify();
              // console.log(allTransactions);
            }}
          >
            ADD TRANSACTION
          </button>
          <div className="flex gap-20 border-b-2 border-[#8C385A]">
            <h2>
              {" "}
              🛍️ EXPENSE:
              <br /> {totalExp}${" "}
            </h2>
            <h2>
              💸 INCOME:
              <br /> {totalInc}${" "}
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="flex justify-end text-right">History</h2>

            {/* reusable components */}

            {allTransactions.length
              ? allTransactions.map((e, index) => {
                  console.log(">> need to be mapped", e);
                  // return (
                  //   <TransactionItem
                  //     data={e}
                  //     key={index}
                  //     index={index}
                  //     deleteEl={deleteElement}
                  //   />
                  // );
                  return (
                    <SuccessCard
                      key={index}
                      data={e}
                      deleteEl={deleteElement}
                      index={index}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose="3000" />
    </div>
  );
}

export default App;
