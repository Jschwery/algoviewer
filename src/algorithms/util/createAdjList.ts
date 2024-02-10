import React from 'react'


function CreateAdjList(graph: number[][]) {
    type Coordinate = [number, number];
    type CoordinateMap = {[key: string]: Coordinate[]};
    
    const adjList: CoordinateMap = {};
    let directions = [[0,1], [0,-1], [-1,0], [0,-1]]

  for(let i = 0; i < graph.length; i++){
    for(let j = 0; j < graph[0].length; j++){
        for(const direction of directions){
            //ensure the coordinates are in bounds
            if(i + direction[0] < 0 || i + direction[0] >= graph.length || j + direction[1] < 0 || j + direction[1] >= graph[0].length) continue;

            adjList[`${i}-${j}`].push([i+direction[0], j + direction[1]])
        }
    }
  }
}

export default CreateAdjList