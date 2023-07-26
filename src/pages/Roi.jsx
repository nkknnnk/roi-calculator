import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PiPencilSimpleLight } from "react-icons/pi";
import { BsCheck2 } from "react-icons/bs";
import { LiaAngleDownSolid, LiaAngleRightSolid } from "react-icons/lia";

const Roi = ({ setShowCalculator }) => {
  const [showDetails, setshowDetails] = useState(false);
  const [input, setInput] = useState({ cake: 0, usd: 0 });
  const roiforTimeFrame = {
    day1: "63.34",
    day7: "33.12",
    day30: "23.56",
    year1: "17.83",
    year5: "14.67",
  };
  const [chooseRoi, setchooseRoi] = useState(roiforTimeFrame.day1);
  const [roiArg, setRoiArg] = useState({investment: 0, apy: 63.34, timeframe: 1})
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: `${e.target.value}` });
  };
  const activebtn = (clases, id) => {
    if (id === "active4") {
      setchooseRoi(roiforTimeFrame.day1);
      setRoiArg({...roiArg, apy: 63.34, timeframe: 1})
    } else if (id === "active5") {
      setchooseRoi(roiforTimeFrame.day7);
      setRoiArg({...roiArg, apy: 33.12, timeframe: 7})

    } else if (id === "active6") {
      setchooseRoi(roiforTimeFrame.day30);
      setRoiArg({...roiArg, apy: 23.56, timeframe: 30})

    } else if (id === "active7") {
      setchooseRoi(roiforTimeFrame.year1);
      setRoiArg({...roiArg, apy: 17.83, timeframe: "1year"})

    } else if (id === "active8") {
      setchooseRoi(roiforTimeFrame.year5);
      setRoiArg({...roiArg, apy: 14.67, timeframe: "5year"})

    }
    document.querySelectorAll(clases).forEach((e) => {
      e.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
  };

  const [estimate, setEstimate] = useState({ cake: 0, usd: 0 });

  useEffect(() => {
    setEstimate({ ...estimate, usd: +input.cake * 2, cake: input.usd / 2 });
    // setRoiArg({...roiArg, investment: +input.usd})
    calculateProfit(+input.usd, roiArg.apy, roiArg.timeframe)
  }, [input]);

  function calculateProfit(investment, apy, timeframe) {
    if (timeframe > 0 && timeframe < 366) {
      let profitbytimeFram = 365 / timeframe;
      // Calculate the profit.
      let profit = ((investment * apy) / 100) / profitbytimeFram;

      // Return the profit.
      setInput({...input, cake: (profit/2).toFixed(4)})
    } else {
      // Calculate the profit.
      let profit = ((investment * apy) / 100) * +(timeframe[0]);

      setInput({...input, cake: (profit/2).toFixed(4)})
    }
  }

  const [isPencilIcon, setIsPencilIcon] = useState(true)

  const onFocus = () => setIsPencilIcon(false);
  const onBlur = () => setIsPencilIcon(true);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-body">
        <div
          className="flex justify-between items-center flex-row w-full relative"
          style={{ marginTop: "-17px" }}
        >
          <h2>ROI Calculator</h2>
          <button
            className="text-xl font-bold uppercase text-red-600 absolute right-0 top-1"
            onClick={() => setShowCalculator(false)}
          >
            X
          </button>
        </div>
        <div className="flex justify-end">
          <div className="text-bold text-slate-500 mb-4">
            <span className="mx-3">Cake</span>
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-yellow-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-neutral-300 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5  checked:after:border-none checked:after:bg-yellow-100 hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1]  focus:after:content-[''] checked:focus:border-yellow-600 checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100  dark:bg-yellow-600 dark:after:bg-neutral-400 dark:checked:bg-yellow-100 dark:checked:after:bg-yellow-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <span>USD</span>
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <div className=" flex w-full relative">
            <span className="text-black text-xl font-extrabold absolute top-3 right-2">
              CAKE
            </span>
            <input
              type="number"
              name="cake"
              className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-right text-black text-xl font-extrabold pr-16"
              value={input.cake}
              onChange={onChange}
              disabled
            />
          </div>
          <div className="w-100 flex justify-between">
            <div>
              <span
                id="active1"
                className="isrmvactive1 active cursor-pointer uppercase text-sm font-bold p-2 m-2 ml-0 bg-slate-100 rounded-md"
                onClick={() => {
                  activebtn(".isrmvactive1", "active1");
                  setInput({ ...input, usd: 0 });
                }}
              >
                use balance
              </span>
              <span
                id="active2"
                className="isrmvactive1 cursor-pointer  p-2 m-2 bg-slate-100 rounded-md"
                onClick={() => {
                  activebtn(".isrmvactive1", "active2");
                  setInput({ ...input, usd: 1000 });
                }}
              >
                $1000
              </span>
              <span
                id="active3"
                className="isrmvactive1 cursor-pointer  p-2 m-2 bg-slate-100 rounded-md"
                onClick={() => {
                  activebtn(".isrmvactive1", "active3");
                  setInput({ ...input, usd: 100 });
                }}
              >
                $100
              </span>
            </div>
            <span>~ ${estimate.usd}</span>
          </div>
        </div>
        <div className="w-100 mt-4 flex flex-col justify-between">
          <span className="text-black font-bold p-2">Timeframe</span>
          <div className="w-100 flex justify-between">
            <span
              id="active4"
              className="cursor-pointer active isrmvactive2 pt-2 pb-2 pr-5 pl-5 m-2 ml-0 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive2", "active4")}
            >
              1 Day
            </span>
            <span
              id="active5"
              className="cursor-pointer isrmvactive2 pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive2", "active5")}
            >
              7 Days
            </span>
            <span
              id="active6"
              className="cursor-pointer isrmvactive2 pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive2", "active6")}
            >
              30 Days
            </span>
            <span
              id="active7"
              className="cursor-pointer isrmvactive2 pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive2", "active7")}
            >
              1 Year
            </span>
            <span
              id="active8"
              className="cursor-pointer isrmvactive2 pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive2", "active8")}
            >
              5 Years
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-black font-bold">Enable Accelerated APY</div>
          <div className="inline-flex items-center mr-4">
            <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
              <input
                id="switch-component"
                type="checkbox"
                className="peer absolute h-4 w-8 cursor-pointer appearance-none bg-slate-200 rounded-full bg-blue-gray-100 transition-colors duration-300 checked:bg-pink-500 peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
              />
              <label
                for="switch-component"
                className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-gray-100 bg-slate-100 shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
              >
                <div
                  className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
                  data-ripple-dark="true"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="w-100 mt-4 flex flex-col justify-between">
          <span className="text-black font-bold p-2">Select Tier</span>
          <div className="w-100 flex justify-between">
            <span
              id="active9"
              className="isrmvactive3 cursor-pointer pt-2 pb-2 pr-5 pl-5 m-2 ml-0 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive3", "active9")}
            >
              Tier 1
            </span>
            <span
              id="active10"
              className="isrmvactive3 cursor-pointer pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive3", "active10")}
            >
              Tier 2
            </span>
            <span
              id="active11"
              className="isrmvactive3 cursor-pointer pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive3", "active11")}
            >
              Tier 3
            </span>
            <span
              id="active12"
              className="isrmvactive3 active cursor-pointer pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive3", "active12")}
            >
              Tier 4
            </span>
            <span
              id="active13"
              className="isrmvactive3 cursor-pointer pt-2 pb-2 pr-5 pl-5 m-2 bg-slate-100 rounded-full"
              onClick={() => activebtn(".isrmvactive3", "active13")}
            >
              Tier 5
            </span>
          </div>
        </div>
        <div className=" mt-3 flex flex-col justify-center ">
          <div className="w-100 flex justify-end">
            <span className="mb-3 text-sm text-slate-400 font-bold">
              ROI at Current Rates
            </span>
          </div>
          <div className="w-full relative">
            <div className="absolute top-4 left-4">
              {isPencilIcon?<PiPencilSimpleLight className="text-2xl text-slate-400" />:<BsCheck2 className="text-2xl text-slate-400"/>}
            </div>
            <span className="text-black text-2xl font-extrabold absolute top-3 right-2">
              USD
            </span>
            <input
              type="number"
              name="usd"
              className="pl-64 appearance-none block w-full bg-gray-100 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-right text-black text-2xl font-extrabold pr-16"
              value={input.usd}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          </div>
          <div className="w-100 flex justify-end">
            <span className="text-sm text-slate-400 font-bold">
              ~ {estimate.cake} CAKE
            </span>
          </div>
        </div>
        <div className="flex mt-4 w-full justify-between">
          <button className="pt-3 pb-3 pr-20 pl-20 rounded-lg bg-gray-800 text-white">
            Apply
          </button>
          <button className="pt-3 pb-3 pr-20 pl-20 rounded-lg bg-slate-100 text-gray-800 border-gray-800 border-2" onClick={()=>setInput({ cake: 0, usd: 0 })}>
            Cancel
          </button>
        </div>
        <div
          className="flex justify-center items-center mt-5 text-sm font-bold cursor-pointer"
          onClick={() => setshowDetails(showDetails ? false : true)}
        >
          <span>Show Details</span>{" "}
          <span className="ml-2">
            {showDetails ? <LiaAngleDownSolid /> : <LiaAngleRightSolid />}
          </span>
        </div>

        {showDetails && (
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <span className="text-black font-bold">APY</span>
              <span className="text-yellow-400 font-bold text-2xl">
                {chooseRoi}%
              </span>
            </div>
            <div>
              <ul>
                <li>Calculated based on current rates</li>
                <li>
                  all figures are estimates provided for your convinence only.
                  and by no means represent guarendted returns
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.querySelector(".t-modal")
  );
};

export default Roi;
