import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import Tree from '../../../../widgets/Tree'
import { transformTree } from '../../../../js/TreeWalker'

export default class JsonTreeView extends Component {
  renderTree(ast) {
    if (!ast) {
      return <span>No data</span>
    }
    console.log('ast', ast)
    const transformer = node => ({
      name: node.nodeType || 'root',
      attributes: {
        name: node.name,
        // type: node.nodeType === "VariableDeclaration" && node.typeDescription.typeString ? node.typeDescription.typeString : ''
      },
      children: []
    })
    const d3Tree = ast ? transformTree(ast, transformer) : undefined
    console.log('t', d3Tree)
    return (
      <Tree data={d3Tree} style={{
        border: '1px solid gray'
      }} />
    )
  }
  renderJSON(data) {
    return (
      <ReactJson
        src={data}
        theme="monokai"
        name="storage"
        displayDataTypes={false}
        enableClipboard={false}
        style={{
          padding: 10,
          flex: 1
        }}
      />
    )
  }
  render() {
    const { data } = this.props
    const isTree = true
    return (
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        {isTree
          ? this.renderTree(data)
          : this.renderJSON(data)
        }
      </div>
    )
  }
}