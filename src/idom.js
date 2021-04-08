let currentNode = null;
let currentParent = null;

function enterNode() {
  currentParent = currentNode;
  currentNode = null;
}

function nextNode() {
  currentNode = currentNode
    ? currentNode.nextSibling
    : currentParent.firstChild;
}

export function exitNode() {
  currentNode = currentParent;
  currentParent = currentParent.parentNode;
}

const matches = function (matchNode, name) {
  const data = getData(matchNode);
  return name === data.name;
};

function renderDOM(name) {
  if (currentNode && matches(currentNode, name)) {
    return currentNode;
  }

  const node =
    name === '#text'
      ? document.createTextNode('')
      : document.createElement(name);

  currentParent.insertBefore(node, currentNode);
  currentNode = node;
  return node;
}

export function elementOpen(name) {
  nextNode();
  const node = renderDOM(name);
  enterNode();

  return currentParent;
}

export function elementClose(node) {
  let unvisitedNode = currentNode
    ? currentNode.nextSibling
    : currentParent.firstChild;

  while (unvisitedNode) {
    const next = unvisitedNode.nextSibling;
    currentParent.removeChild(unvisitedNode);
    unvisitedNode = next;
  }

  exitNode();
  return currentNode;
}

export function text(value) {
  nextNode();
  const node = renderDOM('#text');
  const data = getData(node);
  if (data.text !== value) {
    data.text = value;
    node.data = value;
  }

  node.data = value;
  return currentNode;
}

const NODE_DATA_KEY = '__ID_Data__';

class NodeData {
  constructor(name) {
    this.name = name;
    this.text = null;
  }
}

function getData(node) {
  if (!node[NODE_DATA_KEY]) {
    node[NODE_DATA_KEY] = new NodeData(node.nodeName.toLowerCase());
  }

  return node[NODE_DATA_KEY];
}

export function patch(node, fn, data) {
  currentNode = node;
  enterNode();
  fn(data);
  exitNode();
}
