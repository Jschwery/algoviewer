import React from "react";
import { parseCoordinate } from "../../structure/GridView";

export type Coordinate = [number, number, number];
export type CoordinateMap = { [key: string]: Coordinate[] };

export function CreateAdjList(graph: number[][]): {
  [key: string]: Coordinate[];
} {
  const adjList: CoordinateMap = {};
  let directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      adjList[`${i}-${j}`] = [];
      for (const direction of directions) {
        if (
          i + direction[0] < 0 ||
          i + direction[0] >= graph.length ||
          j + direction[1] < 0 ||
          j + direction[1] >= graph[0].length
        )
          continue;
        adjList[`${i}-${j}`].push([i + direction[0], j + direction[1], 1]);
      }
    }
  }
  return adjList;
}

export default CreateAdjList;
