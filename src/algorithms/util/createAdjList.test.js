import CreateAdjList from './createAdjList';

function tuplesAreEqual(tuple1, tuple2) {
    return tuple1[0] === tuple2[0] && tuple1[1] === tuple2[1];
}

test("create adjacency list of 2D grid and check for value adjacency", () => {
 
    let graph = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ];

    let adjList = CreateAdjList(graph);
    let testKey = "0-2";
    let expectedNeighbor = [1,2]; 
    console.log(adjList); 
    console.log(adjList[testKey]); 
    
    if (!adjList[testKey]) {
        console.error(`Key '${testKey}' not found in adjacency list.`);
        expect(adjList[testKey]).toBeDefined();
        return; 
    }
 
    let exists = adjList[testKey].some(tuple => tuplesAreEqual(tuple, expectedNeighbor));

    expect(exists).toBeTruthy();
});
