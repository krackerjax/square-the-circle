import React, { PureComponent } from 'react';

class Result extends PureComponent {

  render() {
    const { result, isRunning } = this.props;

    if (!result.circleArea && !isRunning) {
      return null;
    }

    return (
      !isRunning ?
        <div>
          <h3>Thanks for playing, {result.name}!</h3>
          <h4>Score:</h4>
          <ul>
            <li>
              Circle Area: {Math.round(result.circleArea)}
            </li>
            <li>
              Square Area: {Math.round(result.squareArea)}
            </li>
            <li>
              Accuracy: {(result.accuracy * 100).toFixed(2)}%
          </li>
            <li>
              π by your estimate: {result.yourPI ? result.yourPI.toFixed(5) : 0}
            </li>
          </ul>
        </div>
        :
        <div><h5>Calculating ...</h5></div>
    );
  }
}

export default Result;