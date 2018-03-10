import React, { Component } from 'react';
import './App.css';

import Intro from './components/Intro';
import GameDisplay from './components/GameDisplay';
import Result from './components/Result';

class App extends Component {
  render() {
    return <PiGame />;
  }
}

class PiGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      circleColor: '',
      squareColor: '',
      circleRadius: 0,
      squareLength: 0,
      gameHeight: 800,
      gameWidth: 1200,
      squareChangeDirection: 1,
      squareChangeAmount: 2,
      isRunning: false,
      changeInterval: 5,
      playerName: 'Anonymous',
      results: [],
      lastResult: {}
    }
  }

  updateSquareSize = () => {
    let newState = { ...this.state };
    if (newState.squareLength > newState.circleRadius * 1.95 || newState.squareLength < newState.circleRadius * 1.3) {
      newState.squareChangeDirection *= -1;
    }

    newState.squareLength += newState.squareChangeDirection * newState.squareChangeAmount;
    this.setState(newState);
  }

  getRandomInt = (min = 150, max = 350) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor = () => {
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  }

  handleStart = () => {
    if (!this.state.isRunning) {
      let newState = { ...this.state };
      newState.circleRadius = this.getRandomInt();
      newState.circleColor = this.getRandomColor();
      newState.squareLength = newState.circleRadius * 1.35;
      newState.squareColor = this.getRandomColor();
      newState.isRunning = true;
      this.setState(newState);

      this.timer = setInterval(this.updateSquareSize, this.state.changeInterval);
    }
  }

  handleStop = () => {
    clearInterval(this.timer);

    let newState = { ...this.state };

    if (newState.lastResult) {
      newState.results.push({ ...newState.lastResult });
    }

    newState.lastResult.squareArea = newState.squareLength * newState.squareLength;
    newState.lastResult.rSquared = newState.circleRadius * newState.circleRadius;
    newState.lastResult.circleArea = newState.lastResult.rSquared * Math.PI;
    newState.lastResult.yourPI = newState.lastResult.squareArea / newState.lastResult.rSquared;
    newState.lastResult.accuracy = newState.lastResult.squareArea / newState.lastResult.circleArea;
    if (newState.lastResult.accuracy > 1) {
      newState.lastResult.accuracy = (1 - (newState.lastResult.accuracy - 1));
    }
    newState.lastResult.name = newState.playerName;

    newState.isRunning = false;

    this.setState(newState);
  }

  handlePlayerNameChange = (e) => {
    this.setState({ playerName: e.target.value });
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1em" }}>
          <div className="left-pane">
            <Intro />
            <Result
              result={this.state.lastResult}
              isRunning={this.state.isRunning}
            />

          </div>
          <div style={{ textAlign: "center" }}>
            <GameDisplay
              gameHeight={this.state.gameHeight}
              gameWidth={this.state.gameWidth}
              circleRadius={this.state.circleRadius}
              circleColor={this.state.circleColor}
              squareLength={this.state.squareLength}
              squareColor={this.state.squareColor}
            />

            Your Name: <input style={{ marginRight: "2em", height: "2em" }} type="text" value={this.state.playerName} onChange={this.handlePlayerNameChange} />

            {!this.state.isRunning && <button className="bigButton" style={{ backgroundColor: "blue" }} onClick={this.handleStart}>Start</button>}
            {this.state.isRunning && <button className="bigButton" style={{ backgroundColor: "red" }} onClick={this.handleStop}>Stop</button>}


          </div>
        </div>
      </div>
    );
  }
}

export default App;
