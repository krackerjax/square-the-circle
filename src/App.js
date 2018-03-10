import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return <PiGame />;
  }
}

class PiGame extends Component {
  constructor(props) {
    super(props);
    const startSize = this.getRandomInt(100, 400);
    const circleColor = this.getRandomColor();
    const squareColor = this.getRandomColor();

    this.state = {
      circleColor: circleColor,
      squareColor: squareColor,
      circleRadius: startSize,
      squareLength: startSize * 1.35,
      gameHeight: 800,
      gameWidth: 1600,
      squareChangeAmount: 1,
      isRunning: false,
      changeInterval: 5,
      playerNameInput: '',
      results: [],
      lastResult: null
    }
  }

  updateSquareSize = () => {
    let newState = { ...this.state };
    if (newState.squareLength > newState.circleRadius * 1.95 || newState.squareLength < newState.circleRadius * 1.3) {
      newState.squareChangeAmount *= -1;
    }

    newState.squareLength += newState.squareChangeAmount;
    this.setState(newState);
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor = () => {
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  }

  calculateSquareCenterX = () => {
    const center = this.state.gameWidth / 2;
    return center - (this.state.squareLength / 2);
  }

  calculateSquareCenterY = () => {
    const center = this.state.gameHeight / 2;
    return center - (this.state.squareLength / 2);
  }

  handleStart = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timer = setInterval(this.updateSquareSize, this.state.changeInterval);
    }
  }

  handleStop = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
    let square = this.state.squareLength * this.state.squareLength;
    let rSquared = this.state.circleRadius * this.state.circleRadius;
    let circle = rSquared * Math.PI;
    let yourPI = square / rSquared;
    console.log("Square Area: " + square)
    console.log("Circle Area: " + circle);
    console.log("PI " + yourPI.toFixed(5))
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ padding: 10 }}>
            <h3>SQUARE the CIRCLE</h3>
            <p><i>by Kris Vitt</i></p>
            <p>
              For thousands of years, amateur and professional mathematicians alike have tried to conquer the problem of 'squaring' the circle -- generally finding a
              square with the same area as a circle. If this were possible, π wouldn't be transcendental! What a shame that would be!
          </p>
            <p>
              Here is your chance to square the circle, and perhaps win a prize if you are truly a transcendental mathlete!
          </p>
            <p>To Play:</p>
            <ul>
              <li>Enter your name</li>
              <li>Click the Big Button to Start</li>
              <li>When you think the area of the circle and square match, click Stop</li>
              <li>Only one turn per person, per round please</li>
            </ul>
          </div>
          <div style={{ textAlign: "center" }}>
            <svg onClick={this.handleClick} height={this.state.gameHeight} width={this.state.gameWidth} style={{ backgroundColor: "#BFEFFF" }}>
              <Circle cx={this.state.gameWidth / 2} cy={this.state.gameHeight / 2} radius={this.state.circleRadius} stroke={this.state.circleColor} fill={this.state.circleColor} />
              <Rectangle cx={this.calculateSquareCenterX()} cy={this.calculateSquareCenterY()} radius={this.state.squareLength} stroke={this.state.squareColor} fill={this.state.squareColor} />
            </svg>
            Your Name: <input type="text" value={this.state.playerNameInput} onChange={this.handlePlayerNameChange} />
            <div>
              {!this.state.isRunning && <button className="bigButton" style={{ backgroundColor: "blue" }} onClick={this.handleStart}>Start</button>}
              {this.state.isRunning && <button className="bigButton" style={{ backgroundColor: "red" }} onClick={this.handleStop}>Stop</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Circle extends Component {
  render() {
    return <circle cx={this.props.cx} cy={this.props.cy} r={this.props.radius} stroke={this.props.stroke} strokeWidth="8" fill={this.props.fill} />
  }
}

export class Rectangle extends Component {
  render() {
    return <rect x={this.props.cx} y={this.props.cy} width={this.props.radius} height={this.props.radius} stroke={this.props.stroke} strokeWidth="8" fill={this.props.fill} />
  }
}

export default App;
