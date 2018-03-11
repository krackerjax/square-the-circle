import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div>
        <h3>SQUARE the CIRCLE</h3>
        <p><i>by Kris Vitt</i></p>
        {/* <p>
          For thousands of years, amateur and professional mathematicians alike have tried to conquer the problem of 'squaring' the circle -- using a compass and straightedge to find a
          square with the same area as a circle. If this were possible, π wouldn't be transcendental. What a shame that would be!
          </p>
        <p>
          Here is your chance to square the circle, and perhaps win a prize if you are truly a transcendental mathlete!
        </p> */}
        <p>
          Geometers spent centuries trying to square the circle -- a sisyphean task that you too can now attempt! 
        </p>
        <p>To Play:</p>
        <ul>
          <li>Enter your name.</li>
          <li>Click the Big Button to Start.</li>
          <li>When you think the area of the circle and square match, click Stop.</li>
        </ul>
      </div>
    );
  }
}

export default Intro;