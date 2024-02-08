import React, { useEffect, useState } from "react";
import DropDown from "./Dropdown";
import { title } from "process";

interface OptionsProps {
  onCalculate: (num: number, num2: number) => void;
}

const Options: React.FC<OptionsProps> = ({ onCalculate }) => {
  const [dimension1, setDimension1] = useState("");
  const [dimension2, setDimension2] = useState("");
  const [algo, setAlgo] = useState("");

  return (
    <div className="w-full h-full gap-2 flex-col sm:flex-row flex p-2 bg-slate-400">
      <div className="grow bg-yellow-200 flex justify-between p-2 rounded-sm">
        <div className="flex flex-col space-y-1 items-start w-full">
          <div className="w-full bg-emerald-900 flex-col flex sm:!flex-row space-y-2 sm:space-y-0 justify-between">
            <div className="relative flex w-full  items-center justify-start">
              <DropDown
                title={"Algorithms"}
                list={["Dijkstra", "A*", "BFS", "agaom", "okays", ":)"]}
                callBack={function (title: string) {
                  setAlgo(title);
                }}
              />
            </div>
            <div className="relative flex w-full  items-center justify-start">
              <DropDown
                title={"Maze & Patterns"}
                list={[
                  "Recursive Divisionnnnnnnnnnnnn",
                  "Vertical Skew",
                  "Horizontal Skew",
                  "Random Maze",
                ]}
                callBack={function (title: string) {
                  setAlgo(title);
                }}
              />
            </div>
          </div>
          <div className="w-full bg-emerald-300">
            <div className="relative flex w-full  items-center justify-start">
              <DropDown
                title={"Speed"}
                list={["Fast", "Medium", "Slow"]}
                callBack={function (title: string) {
                  setAlgo(title);
                }}
              />
            </div>
          </div>
          <div className="w-full bg-emerald-300">
            <h5>Dimensions</h5>
            <div className="flex gap-2 items-center ">
              <input
                onChange={(e) => setDimension1(e.target.value)}
                className="h-8 text-center w-10 rounded-sm"
                type="text"
              />
              <h3>X</h3>
              <input
                onChange={(e) => setDimension2(e.target.value)}
                className="h-8 text-center w-10 rounded-sm"
                type="text"
              />
              <button
                onClick={() =>
                  onCalculate(Number(dimension1), Number(dimension2))
                }
                className="rounded-sm bg-purple-500 hover:bg-purple-400 h-8 px-2 cursor-pointer"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-300 min-w-[30%] flex justify-between p-2 rounded-sm">
        <div className="">hi</div>
        <div>hi</div>
      </div>
      <div></div>
    </div>
  );
};

export default Options;
