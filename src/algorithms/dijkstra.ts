import React from 'react'
import PathFindingAlgorithm from './pathFinding'

class Dijkstra implements PathFindingAlgorithm{

    distArrat: number[];
    constructor(grid: number[][]){
        this.distArrat = Array(grid.length).fill(Infinity);
    }


    async initializeGrid(grid: number[][]): Promise<void> {
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
            

            }
        }


    }



    async findPath(start: [number, number], end: [number, number], onProgress?: ((currentGrid: number[][]) => void) | undefined): Promise<[number, number][]> {
        //



    }
    calculateDistance(a: [number, number], b: [number, number]): number {
        throw new Error('Method not implemented.')
    }
    findNeighbors(position: [number, number]): [number, number][] {
        throw new Error('Method not implemented.')
    }
   
}


export default Dijkstra