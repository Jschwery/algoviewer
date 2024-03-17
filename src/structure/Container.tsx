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
  const [grid, setGrid] = useState<number[][]>();

  const dijkstraRef = useRef<Dijkstra | null>(null);

  useEffect(() => {
    console.log("Selected Algorithm: " + algoId);
  }, [algoId]);

  useEffect(() => {
    if (grid) {
      if (!dijkstraRef.current) {
        dijkstraRef.current = new Dijkstra(grid);
      }
    }
  }, []);
  const handleGridUpdate = (grid: number[][]) => {
    // console.log("within handle grid update");
    // console.log(grid);
    setGrid([...grid]);
  };
  useEffect(() => {
    let newGrid = Array.from({ length: rowCount }, () =>
      Array(colCount).fill(1)
    );
    Object.keys(walls).forEach((wallKey) => {
      const [x, y] = wallKey.split("-").map(Number);
      if (x >= 0 && x < rowCount && y >= 0 && y < colCount) {
        newGrid[x][y] = Infinity;
      }
    });

    setGrid(newGrid);
  }, [rowCount, colCount, walls]);

  useEffect(() => {
    // console.log(grid);
    if (grid) {
      dijkstraRef.current = new Dijkstra(grid);
    }
  }, [grid]);

  const pathFind = async (
    start: [number, number],
    end: [number, number],
    walls: number[][]
  ) => {
    if (dijkstraRef.current) {
      try {
        const path = await dijkstraRef.current.findPath(
          start,
          end,
          handleGridUpdate
        );
        console.log("Path found:", path);
      } catch (error) {
        console.error("Error finding path:", error);
      }
    } else {
      console.log("Dijkstra instance is not ready.");
    }
  };

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
        <GridView
          rowCount={rowCount}
          colCount={colCount}
          pathFind={pathFind}
          setWalls={setWalls}
        />
      </div>
    </div>
  );
}

export default Container;
