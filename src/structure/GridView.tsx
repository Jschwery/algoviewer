import React, { useEffect, useState } from "react";
import GridCell from "../components/GridCell";

interface GridProps {
  rowCount: number;
  colCount: number;
  pathFind: (start: number, end: number, walls: string[]) => void;
}

export interface DraggingCellInfo {
  id: string;
  type: "start" | "end" | "wall" | "";
  selected?: boolean;
}

/*
TODO:
Implement a callback that happens when 
start button is clicked

the buttons onclick calls the callback function 
which passes the start & end, and all of the walls

*/

export const parseCoordinate = (coords: string) => {
  const parts = coords.split("-");

  if (parts.length !== 2) {
    return [-1, -1];
  }
  return [Number(parts[0]), Number(parts[1])];
};

const GridView: React.FC<GridProps> = ({ rowCount, colCount }) => {
  const [selectedCells, setSelectedCells] = useState<{
    [key: string]: DraggingCellInfo;
  }>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingCell, setDraggingCell] = useState<DraggingCellInfo | null>(
    null
  );
  const [draggedCellType, setDraggedCellType] = useState<
    "start" | "end" | "wall" | ""
  >("");
  const [start, setStart] = useState<[number, number]>([0, 0]);
  const [end, setEnd] = useState<[number, number]>([
    rowCount / 2 - 1,
    colCount / 2 - 1,
  ]);

  useEffect(() => {
    setEnd([
      rowCount >= 10 ? Math.floor(rowCount / 2) : rowCount - 1,
      colCount >= 10 ? Math.floor(colCount / 2) : colCount - 1,
    ]);
  }, [rowCount, colCount]);
  const coordsEqual = (a: any[], b: any[]) => a[0] === b[0] && a[1] === b[1];

  const handleCellClick = (id: string) => {
    setSelectedCells((prev) => {
      const cellCoords = parseCoordinate(id);

      if (coordsEqual(cellCoords, start) || coordsEqual(cellCoords, end)) {
        return prev;
      }

      const cellInfo = prev[id];

      if (cellInfo) {
        return {
          ...prev,
          [id]: {
            ...cellInfo,
            selected: !cellInfo.selected,
            type: !!cellInfo.selected ? "wall" : "",
          },
        };
      } else {
        return { ...prev, [id]: { id, type: "wall", selected: true } };
      }
    });
  };

  // const traverseGrid = (id: string) => {
  //   setSelectedCells((prev) => {
  //     const cellCoords = parseCoordinate(id);

  //     if (coordsEqual(cellCoords, start) || coordsEqual(cellCoords, end)) {
  //       return prev;
  //     }

  //     const cellInfo = prev[id];
  //     if (cellInfo) {
  //       return { ...prev, [id]: { ...cellInfo, selected: !cellInfo.selected } };
  //     } else {
  //       return { ...prev, [id]: { id, type: "", selected: true } };
  //     }
  //   });
  // };

  const handleMouseDown = (id: string, cellType: "start" | "end" | "") => {
    setIsDragging(true);
    setDraggingCell({ id, type: cellType });
    setDraggedCellType(cellType);
  };

  const handleMouseUp = (id: string, type?: "start" | "end") => {
    if (!isDragging || !draggingCell) return;

    if (type === "start") {
      setStart(parseCoordinate(id) as [number, number]);
    }

    if (type === "end") {
      setEnd(parseCoordinate(id) as [number, number]);
    }

    setIsDragging(false);
    setDraggingCell(null);
    setDraggedCellType("");
  };

  const handleMouseEnter = (id: string) => {
    const cellCoords = parseCoordinate(id);

    if (isDragging) {
      if (!draggedCellType) {
        setSelectedCells((prev) => {
          const cellInfo = prev[id];

          if (coordsEqual(cellCoords, start) || coordsEqual(cellCoords, end)) {
            return prev;
          }

          if (cellInfo) {
            return {
              ...prev,
              [id]: { ...cellInfo, selected: !cellInfo.selected },
            };
          } else {
            if (
              coordsEqual(cellCoords, start) ||
              coordsEqual(cellCoords, end)
            ) {
              return prev;
            }
            return {
              ...prev,
              [id]: { id, type: "", selected: true },
            };
          }
        });
      }
    }
    if (draggedCellType === "start") {
      setStart(parseCoordinate(id) as [number, number]);
      setSelectedCells((prev) => {
        const cellInfo = prev[id];
        return { ...prev, [id]: { ...cellInfo, selected: false } };
      });
    } else if (draggedCellType === "end") {
      setEnd(parseCoordinate(id) as [number, number]);
      setSelectedCells((prev) => {
        const cellInfo = prev[id];
        return { ...prev, [id]: { ...cellInfo, selected: false } };
      });
    }
  };

  const cells = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const cellId = `${rowIndex}-${colIndex}`;
      const isStart = cellId === `${start[0]}-${start[1]}`;
      const isEnd = cellId === `${end[0]}-${end[1]}`;

      cells.push(
        <GridCell
          key={cellId}
          id={cellId}
          selected={!!selectedCells[cellId]?.selected}
          start={isStart}
          end={isEnd}
          onMouseEnter={() => handleMouseEnter(cellId)}
          callBack={() => handleCellClick(cellId)}
          onMouseDown={() =>
            handleMouseDown(cellId, isStart ? "start" : isEnd ? "end" : "")
          }
          onMouseUp={() => handleMouseUp(cellId)}
        />
      );
    }
  }

  return (
    <>
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rowCount}, 1fr)`,
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        }}
      >
        {cells}
      </div>
    </>
  );
};

export default GridView;
