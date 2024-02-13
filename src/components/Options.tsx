import React, { useEffect, useState } from "react";
import DropDown from "./Dropdown";

interface OptionsProps {
  onCalculate: (num: number, num2: number) => void;
}

const Options: React.FC<OptionsProps> = ({ onCalculate }) => {
  const [dimension1, setDimension1] = useState("20");
  const [dimension2, setDimension2] = useState("20");
  const [algo, setAlgo] = useState("");

  useEffect(() => {
    console.log("algo: " + algo);
  }, [algo]);

  const algorithmsList = [
    { id: "1", name: "Dijkstra" },
    {
      id: "2",
      name: "A*",
      children: [
        { id: "2-1", name: "Variant 1" },
        { id: "2-2", name: "Variant 2" },
      ],
    },
    { id: "3", name: "BFS" },
  ];

  const mazesList = [
    {
      id: "4",
      name: "Recursive Division",
      children: [
        { id: "4-1", name: "Vertical Skew" },
        { id: "4-2", name: "Horizontal Skew" },
      ],
    },
    { id: "5", name: "Random Maze" },
  ];

  const speedList = [
    { id: "6", name: "Fast" },
    { id: "7", name: "Medium" },
    { id: "8", name: "Slow" },
  ];

  return (
    <div className="w-full h-full gap-2 flex-col sm:flex-row flex p-2 bg-slate-400">
      <div className="bg-yellow-200 flex justify-between p-2 rounded-sm">
        <div className="flex flex-col space-y-1 items-start w-full">
          <div className="w-full bg-emerald-900 flex-col flex sm:!flex-row space-y-2 sm:space-y-0 justify-between">
            <div className="relative flex w-full  items-center justify-start">
              <DropDown
                title={"Algorithms"}
                list={algorithmsList}
                callBack={setAlgo}
              />
            </div>
            <div className="relative flex w-full  items-center justify-start">
              <DropDown title={"Mazes"} list={mazesList} callBack={setAlgo} />
            </div>
          </div>
          <div className="w-full bg-emerald-300">
            <div className="relative flex w-full  items-center justify-start">
              <DropDown title={"Speed"} list={speedList} callBack={setAlgo} />
            </div>
          </div>
          <div className="w-full z-10 bg-emerald-300">
            <h5>Dimensions</h5>
            <div className="flex gap-2 items-center">
              <input
                value={dimension1}
                onChange={(e) => setDimension1(e.target.value)}
                className="h-8 text-center w-10 rounded-sm"
                type="text"
              />
              <h3>X</h3>
              <input
                value={dimension2}
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
        <div>hi</div>
        <div>hi</div>
      </div>
    </div>
  );
};

export default Options;
