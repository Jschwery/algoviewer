import React from "react";

interface GridCellProps {
  id: string;
  selected?: boolean;
  callBack: () => void;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseUp: () => void;
  start?: boolean;
  hovered?: boolean;
  end?: boolean;
}

const GridCell: React.FC<GridCellProps> = ({
  id,
  selected,
  callBack,
  hovered,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  onMouseEnter,
  start,
  end,
}) => {
  return (
    <div
      onClick={callBack}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={`grid-cell ${hovered ? "!bg-slate-300" : ""} ${
        selected ? "selected" : ""
      } ${start ? "start" : ""} ${end ? "end" : ""}`}
    >
      {start && (
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 flex-shrink"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      )}
      {end && (
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default GridCell;
