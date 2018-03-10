import React from 'react';

class Circle extends React.PureComponent {
  render() {
    return (
      <circle cx={this.props.cx} cy={this.props.cy} r={this.props.radius} stroke={this.props.stroke} strokeWidth="8" fill={this.props.fill} />
    );
  }
}

export default Circle;