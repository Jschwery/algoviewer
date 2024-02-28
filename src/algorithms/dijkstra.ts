import React from "react";
import PathFindingAlgorithm from "./pathFinding";
import CreateAdjList, { CoordinateMap } from "./util/createAdjList";
import MinHeap from "./util/minHeap";

class Dijkstra implements PathFindingAlgorithm {
  private distArray: number[][];
  private adjList!: CoordinateMap;
  private prev: { [key: string]: [number, number] | null };

  constructor(grid: number[][]) {
    this.distArray = [];
    this.prev = {};
    this.initializeGrid(grid);
  }

  calculateDistance(a: [number, number], b: [number, number]): number {
    let xIndex = Math.abs(a[0] - b[0]);
    let yIndex = Math.abs(a[1] - b[1]);

    return yIndex + xIndex;
  }

  async initializeGrid(grid: number[][]): Promise<void> {
    this.distArray = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(Infinity)
    );
    this.prev = {};
  }

  async findPath(
    start: [number, number],
    end: [number, number],
    onProgress?: ((currentGrid: number[][]) => void) | undefined
  ): Promise<[number, number][]> {
    this.distArray[start[0]][start[1]] = 0;
    this.prev[`${start[0]}-${start[1]}`] = null;

    let minHeap = new MinHeap();
    minHeap.insert({ coord: start, distance: 0 });

    while (minHeap.peak()) {
      let currentNode = minHeap.extractMin();
      let [currentX, currentY] = currentNode!.coord;
      let currentDist = currentNode!.distance;

      if (currentX === end[0] && currentY === end[1]) break;

      let neighbors = this.adjList[`${currentX}-${currentY}`];
      for (const neighbor of neighbors) {
        let [nextX, nextY, distToNeighbor] = neighbor;
        let newDist = currentDist + distToNeighbor;

        if (newDist < this.distArray[nextX][nextY]) {
          this.distArray[nextX][nextY] = newDist;
          this.prev[`${nextX}-${nextY}`] = [currentX, currentY];
          minHeap.insert({ coord: [nextX, nextY], distance: newDist });

          if (onProgress) {
            onProgress([...this.distArray]);
          }
        }
      }
    }

    return this.reconstructPath(start, end);
  }

  private reconstructPath(
    start: [number, number],
    end: [number, number]
  ): [number, number][] {
    let path: [number, number][] = [];
    let current: [number, number] | null = end;
    while (current && !(current[0] === start[0] && current[1] === start[1])) {
      path.unshift(current);
      current = this.prev[`${current[0]}-${current[1]}`];
    }
    if (current) {
      path.unshift(current);
    }
    return path;
  }
}

export default Dijkstra;
