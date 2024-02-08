import React, { useEffect, useState } from "react";
import Options from "../components/Options";
import GridView from "./GridView";

function Container() {
  const [[rowCount, colCount], setRowColCount] = useState([0, 0]);

  const handleCalculate = (newRowCount: number, newColCount: number) => {
    setRowColCount([newRowCount, newColCount]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-400">
      <div className="w-full">
        <Options onCalculate={handleCalculate} />
      </div>
      <div className="w-full grow p-2">
        <GridView rowCount={rowCount} colCount={colCount} />
      </div>
    </div>
  );
}

export default Container;
