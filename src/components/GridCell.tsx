import React from "react";

interface GridCellProps {
  id: string;
  selected: boolean;
  callBack: () => void;
}

const GridCell: React.FC<GridCellProps> = ({ id, selected, callBack }) => {
  return (
    <div
      onClick={callBack}
      className={`grid-cell hover:!bg-slate-300 !cursor-pointer ${
        selected ? "!bg-purple-400" : "!bg-slate-400"
      }`}
    ></div>
  );
};

export default GridCell;
