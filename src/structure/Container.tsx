import React, { useEffect, useRef, useState } from "react";
import Options from "../components/Options";
import GridView, { DraggingCellInfo, parseCoordinate } from "./GridView";
import { algorithmsList } from "../algorithms/util/algoList";
import Dijkstra from "../algorithms/dijkstra";

function Container() {
  const [[rowCount, colCount], setRowColCount] = useState([0, 0]);

  const [walls, setWalls] = useState<{
    [key: string]: DraggingCellInfo;
  }>({});

  const [algoId, setAlgoId] = useState("");
  const algoName = algorithmsList[Number(algoId) - 1]?.name ?? "";
  const [grid, setGrid] = useState<number[][]>();
  const dijkstraRef = useRef<Dijkstra | null>(null);

  useEffect(() => {
    console.log("Selected Algorithm: " + algoName);
  }, [algoId]);

  useEffect(() => {
    if (grid) {
      if (!dijkstraRef.current) {
        dijkstraRef.current = new Dijkstra(grid);
      } else {
        dijkstraRef.current.initializeGrid(grid);
      }
    }
  }, [grid]);

  useEffect(() => {
    let grid = Array.from({ length: rowCount }, () => Array(colCount).fill(1));

    Object.keys(walls).forEach((wallKey) => {
      const [x, y] = wallKey.split("-").map(Number);
      if (x >= 0 && x < rowCount && y >= 0 && y < colCount) {
        grid[x][y] = Infinity;
      }
    });

    setGrid([...grid]);
  }, [rowCount, colCount, walls]);

  const pathFind = (
    start: [number, number],
    end: [number, number],
    walls: string[]
  ) => {};

  const handleCalculate = (newRowCount: number, newColCount: number) => {
    setRowColCount([newRowCount, newColCount]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-400">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl p-3">Path Finder</h2>
      </div>
      <div className="w-full">
        <Options onCalculate={handleCalculate} algoCallback={setAlgoId} />
      </div>
      <div className="w-full grow p-2 bg-slate-400">
        <GridView rowCount={rowCount} colCount={colCount} pathFind={pathFind} />
      </div>
    </div>
  );
}

export default Container;
