import { SlowBuffer } from "buffer";
import React, { useEffect, useState } from "react";

type DropDown = {
  title: string;
  list: string[] | string[];
  callBack: (title: string) => void;
};

function DropDown(props: DropDown) {
  let [[selected, selectedName], setSelected] = useState([false, props.title]);

  const handleCallback = (listName: string) => {
    props.callBack(listName);
    setSelected([!selected, listName]);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <div
        onClick={() => setSelected([!selected, selectedName])}
        className="flex cursor-pointer min-w-[100px] bg-slate-400 space-x-2 relative items-center justify-between p-1 rounded-sm"
      >
        <h4>{selectedName}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 pt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        <div
          className={`absolute top-9 z-50 overflow-hidden -left-2 right-0 bg-slate-100 flex-col flex transition-all duration-500 ${
            selected ? "max-h-[25vh]" : "max-h-0 overflow-hidden"
          } width-auto`}
          style={{ width: "min-content" }}
        >
          {props.list.map((li) => (
            <h5
              className="px-2 py-1 hover:!bg-purple-100 hover:scale-105 hover:shadow-md  text-black cursor-pointer text-nowrap"
              onClick={() => handleCallback(li)}
            >
              {li}
            </h5>
          ))}
        </div>
      </div>
    </>
  );
}

export default DropDown;