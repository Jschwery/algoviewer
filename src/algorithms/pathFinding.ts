export default interface PathfindingAlgorithm {
    initializeGrid(grid: number[][]): Promise<void>;
    findPath(start: [number, number], end: [number, number], onProgress?: (currentGrid: number[][]) => void): Promise<[number, number][]>;
    calculateDistance(a: [number, number], b: [number, number]): number;
    findNeighbors(position: [number, number]): [number, number][];
  }
  
  