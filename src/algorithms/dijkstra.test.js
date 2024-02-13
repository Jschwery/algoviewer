import Dijkstra from "./dijkstra";

it("should find the shortest path between two points on a grid", async () => {
  const grid = [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ];

  const dijkstra = new Dijkstra(grid);

  const start = [0, 0];
  const end = [2, 2];

  const path = await dijkstra.findPath(start, end);

  expect(path).toEqual([
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [2, 2],
  ]);
});
