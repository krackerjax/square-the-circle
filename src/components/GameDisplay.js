import React, { PureComponent } from 'react';

import Circle from './Circle';
import Rectangle from './Rectangle';

class GameDisplay extends PureComponent {
  calculateSquareCenter = (dimension, squareLength) => {
    return (dimension / 2) - (squareLength / 2);
  }

  render() {
    const { gameHeight, gameWidth, circleRadius, circleColor, squareLength, squareColor } = this.props;
    return (
      <svg height={gameHeight} width={gameWidth} style={{ backgroundColor: "#BFEFFF" }}>
        <Circle
          cx={gameWidth / 2}
          cy={gameHeight / 2}
          radius={circleRadius}
          stroke={circleColor}
          fill={circleColor}
        />
        <Rectangle
          cx={this.calculateSquareCenter(gameWidth, squareLength)}
          cy={this.calculateSquareCenter(gameHeight, squareLength)}
          radius={squareLength}
          stroke={squareColor}
          fill={squareColor}
        />
      </svg>
    );
  }
}

export default GameDisplay;