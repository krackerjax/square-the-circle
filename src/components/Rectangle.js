import React, { PureComponent } from 'react';

class Rectangle extends PureComponent {
  render() {
    return (
      <rect x={this.props.cx} y={this.props.cy} width={this.props.radius} height={this.props.radius} stroke={this.props.stroke} fill={this.props.fill} />
    );
  }
}

export default Rectangle;