import React, { useEffect, useState } from "react";
import GridCell from "../components/GridCell";

interface GridProps {
  rowCount: number;
  colCount: number;
  pathFind: (
    start: [number, number],
    end: [number, number],
    walls: number[][]
  ) => void;
  setWalls: (walls: { [key: string]: DraggingCellInfo }) => void;
}

export interface DraggingCellInfo {
  id: string;
  type: "start" | "end" | "wall" | "";
  selected: boolean;
  hovered?: boolean;
}

type SelectedCells = {
  [key: string]: DraggingCellInfo;
};

export const parseCoordinate = (coords: string) => {
  const parts = coords.split("-");

  if (parts.length !== 2) {
    return [-1, -1];
  }
  return [Number(parts[0]), Number(parts[1])];
};

const GridView: React.FC<GridProps> = ({
  rowCount,
  colCount,
  pathFind,
  setWalls,
}) => {
  const [selectedCells, setSelectedCells] = useState<SelectedCells>({});
  const [searchedCell, setSearchedCell] = useState<{
    [key: string]: DraggingCellInfo;
  }>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingCell, setDraggingCell] = useState<DraggingCellInfo | null>(
    null
  );
  const [draggedCellType, setDraggedCellType] = useState<
    "start" | "end" | "wall" | "searched" | ""
  >("");
  const [start, setStart] = useState<[number, number]>([0, 0]);
  const [cellCords, setCellCords] = useState<string[]>([]);
  const [end, setEnd] = useState<[number, number]>([
    rowCount / 2 - 1,
    colCount / 2 - 1,
  ]);

  useEffect(() => {
    setWalls({ ...selectedCells });
    // console.log(selectedCells);
  }, [selectedCells]);

  const convertSelectedCells = (selected: {
    [key: string]: DraggingCellInfo;
  }) => {
    const selectedIds = Object.entries(selected)
      .filter(([_, value]) => value.selected)
      .map(([key, _]) => key);

    return selectedIds;
  };

  useEffect(() => {
    setCellCords(convertSelectedCells(selectedCells));
  }, [selectedCells]);

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
        if (cellInfo.selected) {
          const newCells = { ...prev };
          delete newCells[id];
          return newCells;
        } else {
          return {
            ...prev,
            [id]: {
              ...cellInfo,
              selected: true,
              type: "wall",
            },
          };
        }
      } else {
        return { ...prev, [id]: { id, type: "wall", selected: true } };
      }
    });
  };

  const handleWalls = () => {
    let grid: number[][] = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        if (selectedCells[`${rowIndex}-${colIndex}`]?.selected) {
          row.push(2);
        } else {
          row.push(1);
        }
      }
      grid.push(row);
    }
    return grid;
  };

  const handleMouseDown = (id: string, cellType: "start" | "end" | "") => {
    setIsDragging(true);
    setDraggingCell({ id, type: cellType, selected: true });
    setDraggedCellType(cellType);
  };

  const handleMouseUp = (id: string, type?: "start" | "end") => {
    if (!isDragging || !draggingCell) return;

    const cellCoords = parseCoordinate(id);

    if (type === "start") {
      setStart(cellCoords as [number, number]);
    } else if (type === "end") {
      setEnd(cellCoords as [number, number]);
    }

    setIsDragging(false);
    setDraggingCell(null);
    setDraggedCellType("");

    setSelectedCells((currentCells) => {
      const filteredCells = Object.entries(currentCells).reduce<SelectedCells>(
        (acc, [key, value]) => {
          if (value.selected) {
            acc[key] = value;
          }
          return acc;
        },
        {} as SelectedCells
      );

      return filteredCells;
    });
  };

  const handleMouseLeave = (id: string) => {
    setSelectedCells((prev) => {
      const cellInfo = prev[id];
      if (!cellInfo) return prev;

      return {
        ...prev,
        [id]: { ...cellInfo, hovered: false },
      };
    });
  };

  const handleMouseEnter = (id: string) => {
    const cellCoords = parseCoordinate(id);
    if (draggedCellType === "start") {
      setStart(parseCoordinate(id) as [number, number]);
    } else if (draggedCellType === "end") {
      setEnd(parseCoordinate(id) as [number, number]);
    }
    if (isDragging) {
      setSelectedCells((prev) => {
        const cellInfo = prev[id] || { id, type: "", selected: false };
        if (coordsEqual(cellCoords, start) || coordsEqual(cellCoords, end)) {
          return prev;
        }
        if (!draggedCellType) {
          if (cellInfo.selected) {
            const newCells = { ...prev };
            delete newCells[id];
            return newCells;
          } else {
            return {
              ...prev,
              [id]: {
                ...cellInfo,
                selected: true,
                hovered: true,
              },
            };
          }
        } else {
          if (draggedCellType === "start" || draggedCellType === "end") {
            return {
              ...prev,
              [id]: {
                ...cellInfo,
                hovered: true,
              },
            };
          }
        }

        return prev;
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
          selected={!!selectedCells[cellId]?.selected && !isStart && !isEnd}
          start={isStart}
          end={isEnd}
          hovered={!!selectedCells[cellId]?.hovered}
          onMouseEnter={() => handleMouseEnter(cellId)}
          onMouseLeave={() => handleMouseLeave(cellId)}
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
      <div
        onClick={() => pathFind(start, end, handleWalls())}
        className="mx-auto w-[30%] mt-1 py-2 rounded-md text-center hover:bg-cyan-500 cursor-pointer bg-cyan-600 text-white"
      >
        Start
      </div>
    </>
  );
};
export default GridView;
