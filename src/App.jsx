import React, { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(0); // reset converted value
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2017/03/27/15/21/beach-2179361_640.jpg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // ✅ fixed
                selectCurrency={from}
                onAmountChange={(val) => setAmount(val)}
              />
            </div>

            <div className=" relative w-full h-0.5">
              <button
                type="button"
                className=" absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-600 text-white px-2 py-0.5 "
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)} // ✅ fixed
                selectCurrency={to} // ✅ fixed
                amountDisable
              />
            </div>

            <button
              type="submit"
              className=" w-full rounded-lg bg-blue-600 text-white px-4 py-3 "
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
