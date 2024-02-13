export interface HeapNode {
  coord: [number, number];
  distance: number;
}

class MinHeap {
  stack: HeapNode[] = [];

  constructor(items?: HeapNode[]) {
    if (items) {
      this.buildHeap(items);
    }
  }

  private heapify(array: HeapNode[], index: number) {
    let size = array.length;
    let smallest = index;

    while (true) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let leftChild =
        leftIndex < size
          ? array[leftIndex]
          : { coord: [Infinity, Infinity], distance: Infinity };
      let rightChild =
        rightIndex < size
          ? array[rightIndex]
          : { coord: [Infinity, Infinity], distance: Infinity };

      if (leftChild.distance < array[smallest].distance) {
        smallest = leftIndex;
      }
      if (rightChild.distance < array[smallest].distance) {
        smallest = rightIndex;
      }

      if (smallest != index) {
        [array[index], array[smallest]] = [array[smallest], array[index]];
        index = smallest;
      } else {
        break;
      }
    }
  }

  peak(): HeapNode | null {
    return this.stack.length > 0 ? this.stack[0] : null;
  }

  extractMin(): HeapNode | null {
    if (this.stack.length === 0) return null;
    let min = this.stack[0];
    if (this.stack.length > 1) {
      this.stack[0] = this.stack.pop()!;
      this.heapify(this.stack, 0);
    } else {
      this.stack.pop();
    }
    return min;
  }

  private buildHeap(nodes: HeapNode[]) {
    this.stack = nodes;
    let startIndex = Math.floor(this.stack.length / 2) - 1;

    for (let i = startIndex; i >= 0; i--) {
      this.heapify(this.stack, i);
    }
  }

  insert(node: HeapNode) {
    this.stack.push(node);
    let index = this.stack.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (
      index > 0 &&
      this.stack[parentIndex].distance > this.stack[index].distance
    ) {
      [this.stack[parentIndex], this.stack[index]] = [
        this.stack[index],
        this.stack[parentIndex],
      ];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }
}

export default MinHeap;
