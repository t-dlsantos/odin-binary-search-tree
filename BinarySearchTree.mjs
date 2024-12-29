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
      if (current.left && current.right) {
        let temp = current;
        temp = temp.right;
        while(temp.left !== null) {
          temp = temp.left;
        }
        this.deleteItem(temp.data);
        current.data = temp.data;
        return current;
      }
        
      else if (current.left || current.right)
        return current.left ?? current.right;
      else 
        return null;
    }

    if (value < current.data)
      current.left = this.deleteItem(value, current.left);
    else if (value > current.data)
      current.right = this.deleteItem(value, current.right)

    return current;
  }

  find(value) {
    let current = this.root;
    

    while (current !== null) {
      if (current.data === value) 
        return current;

      if (value < current.data)
        current = current.left;
      else if (value > current.data)
        current = current.right;
    }
    
    return "node doesn't exist";
  }

  levelOrder(callback) {
    if (callback === undefined)
      throw new Error("Callback is required");
    
    let queue = [];
    let current = null;
    
    queue.push(this.root);

    while (queue.length !== 0) {
      current = queue[0];

      console.log(current.data);

      if (current.left !== null)
        queue.push(current.left);

      if (current.right !== null)
        queue.push(current.right)

      callback(queue.shift());
    }
  }

  inOrder(current = this.root, callback) {
    if (callback === undefined)
      throw new Error("Callback is required");

    if (current.left !== null)
      this.inOrder(current.left, callback);
    callback(current);
    if (current.right !== null)
      this.inOrder(current.right, callback);
  }

  postOrder(current = this.root, callback) {
    if (callback === undefined)
      throw new Error("Callback is required");

    if (current.left !== null)
      this.postOrder(current.left, callback);
    if (current.right !== null)
      this.postOrder(current.right, callback);
    callback(current);
  }

  preOrder(current = this.root, callback) {
    if (callback === undefined)
      throw new Error("Callback is required");

    callback(current);
    if (current.left !== null)
      this.preOrder(current.left, callback);
    if (current.right !== null)
      this.preOrder(current.right, callback);
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

const array = [20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85];
const newTree = new Tree(array);


prettyPrint(newTree.root)
newTree.preOrder(undefined, (node) => console.log(node.data) );