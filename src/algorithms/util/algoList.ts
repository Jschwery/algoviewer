export const algorithmsList = [
  { id: "1", name: "Dijkstra" },
  {
    id: "2",
    name: "A*",
    children: [
      { id: "2-1", name: "Variant 1" },
      { id: "2-2", name: "Variant 2" },
    ],
  },
  { id: "3", name: "BFS" },
];

const mazesList = [
  {
    id: "4",
    name: "Recursive Division",
    children: [
      { id: "4-1", name: "Vertical Skew" },
      { id: "4-2", name: "Horizontal Skew" },
    ],
  },
  { id: "5", name: "Random Maze" },
];

const speedList = [
  { id: "6", name: "Fast" },
  { id: "7", name: "Medium" },
  { id: "8", name: "Slow" },
];
