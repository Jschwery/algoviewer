import React, { useEffect, useState } from "react";
import Options from "../components/Options";
import GridView, { DraggingCellInfo, parseCoordinate } from "./GridView";
import { algorithmsList } from "../algorithms/util/algoList";

function Container() {
  const [[rowCount, colCount], setRowColCount] = useState([0, 0]);

  const [walls, setWalls] = useState<{
    [key: string]: DraggingCellInfo;
  }>({});

  const [algoId, setAlgoId] = useState("");
  const algoName = algorithmsList[Number(algoId) - 1]?.name ?? "";

  useEffect(() => {
    console.log("Selected Algorithm: " + algoName);
  }, [algoId]);

  const handleCalculate = (newRowCount: number, newColCount: number) => {
    setRowColCount([newRowCount, newColCount]);
  };

  const handleWallChange = (wall: string, selected: boolean) => {
    setWalls((prev) => {
      const cellInfo = prev[wall];
      if (cellInfo) {
        return {
          ...prev,
          [wall]: {
            ...cellInfo,
            selected: selected,
            id: wall,
            type: selected ? "wall" : "",
          },
        };
      } else {
        return {
          ...prev,
          [wall]: {
            id: wall,
            type: "wall",
            selected: true,
          },
        };
      }
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-400">
      <div className="w-full">
        <Options onCalculate={handleCalculate} algoCallback={setAlgoId} />
      </div>
      <div className="w-full grow p-2 bg-slate-400">
        <GridView rowCount={rowCount} colCount={colCount} />
      </div>
    </div>
  );
}

export default Container;
