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

  insert(value, current = this.root) {
    if (current === null) {
      return new Node(value);
    }

    if (value < current.data)
      current.left = this.insert(value, current.left);
    else
      current.right = this.insert(value, current.right)

    return current;
  }

  deleteItem(value, current = this.root) {
    if (current.data === value) {
      if (current.left && current.right)
        console.log('something');
      else if (current.left || current.right)
        console.log('other thing');
      else 
        return null;
    }

    if (value < current.data)
      current.left = this.deleteItem(value, current.left);
    else
      current.right = this.deleteItem(value, current.right)

    return current;
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const newTree = new Tree(array);


prettyPrint(newTree.root)
newTree.deleteItem(1)
prettyPrint(newTree.root)