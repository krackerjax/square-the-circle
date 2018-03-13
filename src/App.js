import React, { Component } from 'react';
import './App.css';

import Intro from './components/Intro';
import GameDisplay from './components/GameDisplay';
import Result from './components/Result';
import TopScores from './components/TopScores';

import firebase from './firebase';

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
      gameHeight: 600,
      gameWidth: 1000,
      squareChangeDirection: 1,
      squareChangeAmount: 2,
      isRunning: false,
      changeInterval: 8,
      playerName: '',
      lastResult: {},
      hasSubmitted: false
    }
  }

  handleGameClick = () => {
    if (this.state.isRunning) {
      this.handleStop();
    } else {
      this.handleStart();
    }
  }

  handleStart = () => {
    if (!this.state.isRunning) {
      let newState = { ...this.state };
      newState.circleRadius = this.getRandomInt();
      newState.circleColor = this.getRandomColor();
      newState.squareLength = newState.circleRadius * 1.35;
      newState.squareColor = this.getRandomColor();
      newState.isRunning = true;
      newState.hasSubmitted = false;
      this.setState(newState);

      this.timer = setInterval(this.updateSquareSize, this.state.changeInterval);
    }
  }

  handleStop = () => {
    clearInterval(this.timer);

    let newState = { ...this.state };

    newState.lastResult = this.getResult(newState.squareLength, newState.circleRadius);

    const resultRef = firebase.database().ref('allResults/' + this.state.playerName);
    resultRef.push(newState.lastResult);

    newState.isRunning = false;

    this.setState(newState);
  }

  submitScore = () => {
    if (!this.state.hasSubmitted) {
      const resultRef = firebase.database().ref('highScores');
      resultRef.push({ ...this.state.lastResult, name: this.state.playerName });
      this.setState({ hasSubmitted: true });
    }
  }

  getResult = (squareLength, circleRadius) => {
    let squareArea = squareLength * squareLength;
    let rSquared = circleRadius * circleRadius;
    let circleArea = rSquared * Math.PI;
    let accuracy = squareArea / circleArea;
    if (accuracy > 1) {
      accuracy = (1 - (accuracy - 1));
    }
    let date = new Date();

    return {
      name: this.state.playerName,
      squareArea: squareArea,
      circleArea: circleArea,
      accuracy: accuracy,
      yourPI: squareArea / rSquared,
      date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
      timeStamp: date.getTime()
    }
  }

  handlePlayerNameChange = (e) => {
    this.setState({ playerName: e.target.value });
  }

  updateSquareSize = () => {
    let newState = { ...this.state };
    if (newState.squareLength > newState.circleRadius * 1.95 || newState.squareLength < newState.circleRadius * 1.3) {
      newState.squareChangeDirection *= -1;
    }

    newState.squareLength += newState.squareChangeDirection * newState.squareChangeAmount;
    this.setState(newState);
  }

  getRandomInt = (min = 175, max = 275) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor = () => {
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "2em" }}>
          <div className="left-pane">
            <Intro />
            <Result
              result={this.state.lastResult}
              isRunning={this.state.isRunning}
              submitScore={this.submitScore}
              hasSubmitted={this.state.hasSubmitted}
              handlePlayerNameChange={this.handlePlayerNameChange}
              playerName={this.state.playerName}
            />
            <TopScores />
          </div>
          <div style={{ textAlign: "center", width: "75%", height: "90%" }} onClick={this.handleGameClick}>
            <GameDisplay
              gameHeight={this.state.gameHeight}
              gameWidth={this.state.gameWidth}
              circleRadius={this.state.circleRadius}
              circleColor={this.state.circleColor}
              squareLength={this.state.squareLength}
              squareColor={this.state.squareColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
