import React from 'react';
import Tree from 'react-d3-tree';

export default class TreeRenderer extends React.Component {
  state = {}
  componentDidMount() {
    const { centered = 'default' } = this.props
    const dimensions = this.treeContainer.getBoundingClientRect();
    const values = {
      vertically: {
        x: 50,
        y: dimensions.height / 2
      },
      default: {
        x: dimensions.width / 2,
        y: dimensions.height / 5 // 20%
      }
    }
    this.setState({
      translate: {
        ...values[centered]
      }
    });
  }
  render() {
    const { data, style, orientation = 'vertical', pathFunc='straight' } = this.props
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
          orientation={orientation}
          pathFunc={pathFunc}
          translate={{...translate}}
          />
      </div>
    );
  }
}