import React, { Component } from 'react';

class Intro extends Component {
  render() {
    return (
      <div style={{marginRight:"1em", backgroundImage:`url(require("sc.png"))`}}>
        <h2 style={{marginTop:0}}>SQUARE the CIRCLE</h2>
        <p><i>by Kris Vitt</i></p>
        {/* <p>
          For thousands of years, amateur and professional mathematicians alike have tried to conquer the problem of 'squaring' the circle -- using a compass and straightedge to find a
          square with the same area as a circle. If this were possible, π wouldn't be transcendental. What a shame that would be!
          </p>
        <p>
          Here is your chance to square the circle, and perhaps win a prize if you are truly a transcendental mathlete!
        </p> */}
        <p>
          Geometers spent centuries <a href="https://commons.wikimedia.org/wiki/File:01-Squaring_the_circle-Ramanujan-1914.gif#/media/File:Squaring_the_circle-Ramanujan-1914.svg" rel="noopener noreferrer" target="_blank">trying</a> to <a href="https://en.wikipedia.org/wiki/Squaring_the_circle" rel="noopener noreferrer" target="_blank">square the circle</a> -- a sisyphean task that you too can now attempt! 
        </p>
        <p>To Play:</p>
        <ul>
          <li>Click or tap the blue play area to start.</li>
          <li>When you think the area of the circle and square match, tap the play area again.</li>
          <li>Enter your name and submit a highscore to compete for a prize!</li>
        </ul>
      </div>
    );
  }
}

export default Intro;