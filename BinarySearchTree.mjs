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

      if (current.left !== null)
        queue.push(current.left);

      if (current.right !== null)
        queue.push(current.right)

      callback(queue.shift());
    }
  }

  inOrder(callback, current = this.root) {
    if (callback === undefined)
      throw new Error("Callback is required");

    if (current.left !== null)
      this.inOrder(callback, current.left);
    callback(current);
    if (current.right !== null)
      this.inOrder(callback, current.right);
  }

  postOrder(callback, current = this.root) {
    if (callback === undefined)
      throw new Error("Callback is required");

    if (current.left !== null)
      this.postOrder(callback, current.left);
    if (current.right !== null)
      this.postOrder(callback, current.right);
    callback(current);
  }

  preOrder(callback, current = this.root) {
    if (callback === undefined)
      throw new Error("Callback is required");

    callback(current);
    if (current.left !== null)
      this.preOrder(callback, current.left);
    if (current.right !== null)
      this.preOrder(callback, current.right);
  }

  height(node) {
    if (node == null)
      return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, current = this.root, count = 0) {
    if (current.data === node.data)
      return count;

    if (current.data > node.data)
      return this.depth(node, current.left, count + 1);
    else if (current.data < node.data)
      return this.depth(node, current.right, count + 1);
  }

  isBalanced() {
    return (Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1);
  }

  rebalance() {
    let array = [];

    this.inOrder((node) => array.push(node.data))

    this.root = buildTree(array);

    return 'The tree is now balanced';
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


newTree.insert(90);
newTree.insert(100);
newTree.insert(110);
prettyPrint(newTree.root);
console.log(newTree.isBalanced())

newTree.rebalance();
prettyPrint(newTree.root);
console.log(newTree.isBalanced())