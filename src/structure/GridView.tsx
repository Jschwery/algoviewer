import React, { useState } from "react";
import GridCell from "../components/GridCell";

interface GridProps {
  rowCount: number;
  colCount: number;
}
const GridView = (gridProps: GridProps) => {
  const [selectedCells, setSelectedCells] = useState<{
    [key: string]: boolean;
  }>({});
  const handleCellClick = (id: string) => {
    setSelectedCells((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${gridProps.rowCount}, 1fr)`,
        gridTemplateColumns: `repeat(${gridProps.colCount}, 1fr)`,
      }}
    >
      {Array.from({ length: gridProps.rowCount }).map((_, rowIndex) =>
        Array.from({ length: gridProps.colCount }).map((_, colIndex) => {
          const cellId = `${rowIndex}-${colIndex}`;
          return (
            <GridCell
              key={cellId}
              id={cellId}
              selected={!!selectedCells[cellId]}
              callBack={() => handleCellClick(cellId)}
            />
          );
        })
      )}
    </div>
  );
};

export default GridView;
