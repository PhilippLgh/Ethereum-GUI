import React from 'react';
import Tree from 'react-d3-tree';

export default class TreeRenderer extends React.Component {
  state = {}
  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 5 // 20%
      }
    });
  }
  render() {
    const { data, style } = this.props
    const { translate } = this.state
    return (
      <div 
      ref={tc => (this.treeContainer = tc)}
      style={{
        flex: 1,
        ...style
      }}>
        <Tree 
          data={data} 
          orientation="vertical" 
          pathFunc="step"
          translate={{...translate}}
          />
      </div>
    );
  }
}