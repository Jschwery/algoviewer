import React, { useState } from "react";

type ListItem = {
  id: string;
  name: string;
  children?: ListItem[];
};

type DropDownProps = {
  title: string;
  list: ListItem[];
  callBack: (name: string) => void;
};

function DropDown(props: DropDownProps) {
  let [[selected, selectedName], setSelected] = useState([false, props.title]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleCallback = (listName: string) => {
    props.callBack(listName);
    setSelected([!selected, listName]);
  };

  const toggleExpand = (itemId: string) => {
    setExpandedIds((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return newExpanded;
    });
  };

  const renderList = (list: ListItem[], indentLevel: number = 0) => {
    return list.map((item) => (
      <React.Fragment key={item.id}>
        <div
          style={{ marginLeft: `${indentLevel * 20}px` }}
          className="flex items-center cursor-pointer"
          onClick={() =>
            item.children ? toggleExpand(item.id) : handleCallback(item.name)
          }
        >
          <div className="flex-grow">{item.name}</div>
          {item.children && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transform transition-transform ${
                expandedIds.has(item.id) ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </div>
        {item.children &&
          expandedIds.has(item.id) &&
          renderList(item.children, indentLevel + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div
      onClick={() => setSelected([!selected, selectedName])}
      className="relative cursor-pointer min-w-[100px] bg-slate-400 space-x-2 items-center justify-between p-1 rounded-sm"
    >
      <h4>{selectedName}</h4>
      <div
        className={`absolute top-9 z-50 overflow-hidden -left-2 right-0 bg-slate-100 flex-col flex transition-all duration-500 ${
          selected ? "max-h-[25vh]" : "max-h-0 overflow-hidden"
        }`}
        style={{ width: "min-content" }}
      >
        {renderList(props.list)}
      </div>
    </div>
  );
}

export default DropDown;
