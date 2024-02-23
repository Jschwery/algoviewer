import React, { useEffect, useState } from "react";
import Options from "../components/Options";
import GridView, { parseCoordinate } from "./GridView";

function Container() {
  const [[rowCount, colCount], setRowColCount] = useState([0, 0]);
  const [coordinates, setCoordinates] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [walls, setWalls] = useState([]);
  const [algo, setAlgo] = useState("");

  const setStartEnd = ({
    start,
    end,
  }: {
    start: [number, number];
    end: [number, number];
  }) => {
    setCoordinates([start, end]);
  };

  const handleCalculate = (newRowCount: number, newColCount: number) => {
    setRowColCount([newRowCount, newColCount]);
  };

  const handleWallChange = (walls: string) => {
    let coords = parseCoordinate(walls);
  };

  const handleStartPointChange = (startPoint: string) => {
    let coords = parseCoordinate(startPoint);
    setCoordinates((prev) => [coords, prev[1]]);
  };

  const handleEndPointChange = (endPoint: string) => {
    let coords = parseCoordinate(endPoint);
    setCoordinates((prev) => [prev[0], coords]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-400">
      <div className="w-full">
        <Options onCalculate={handleCalculate} setAlgo={setAlgo} />
      </div>
      <div className="w-full grow p-2 bg-slate-400">
        <GridView
          setStartEnd={setStartEnd}
          rowCount={rowCount}
          colCount={colCount}
        />
      </div>
    </div>
  );
}

export default Container;
