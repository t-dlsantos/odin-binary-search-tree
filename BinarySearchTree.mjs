import Node from "./Node.mjs";
import { sortArray } from "./SortArray.mjs";

const buildTree = (array, start = 0, end = array.length - 1) => {
  if (start > end)
    return null;

  const mid = Math.floor((start + end) / 2);
  const root = new Node(array[mid])
  
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

class Tree {
  constructor(array) {
    array = sortArray(array);
    this.root = buildTree(array);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const newTree = new Tree(array);
prettyPrint(newTree.root)