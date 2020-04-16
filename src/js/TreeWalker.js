export class Visitor {
  visit(node, callback = () => { }, context = {}) {
    const contextNew = callback(node, context)
    const childNodes = node.nodes || []
    for (const child of childNodes) {
      this.visit(child, callback, {
        ...context,
        ...contextNew
      })
    }
  }
}

export const transformTree = (t1, transformer) => {
  const initialContext = {}
  const visitor = new Visitor()
  visitor.visit(t1, (node, context) => {
    const newNode = transformer(node)
    if (context.lastNode) {
      context.lastNode.children.push(newNode)
    } else {
      context.root = newNode
    }
    return {
      lastNode: newNode
    }
  }, initialContext)
  return initialContext.root
}

export const getNodes = (tree) => {
  const visitor = new Visitor()
  const nodes = [] // depth first
  visitor.visit(tree, (node) => nodes.push(node) )
  return nodes
}