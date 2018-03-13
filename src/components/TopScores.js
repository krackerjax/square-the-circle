import React, { Component } from 'react';

import firebase from './../firebase';

class TopScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      hardScores: []
    }
  }

  componentWillMount() {
    var scoresRef = firebase.database().ref("highScores313-easy");
    scoresRef.orderByChild("accuracy").on("value", (snapshot) => {
      let newScores = [];
      snapshot.forEach(function (data) {
        newScores.push(data.val());
      });

      this.setState({ scores: newScores.reverse().slice(0, 10) });
    });

    var hardScoresRef = firebase.database().ref("highScores313-hard");
    hardScoresRef.orderByChild("accuracy").on("value", (snapshot) => {
      let newHardScores = [];
      snapshot.forEach(function (data) {
        newHardScores.push(data.val());
      });

      this.setState({ hardScores: newHardScores.reverse().slice(0, 10) });
    });
  }

  render() {
    const scores = this.props.difficulty === 'easy' ? this.state.scores : this.state.hardScores;
    return (
      <div>
        <h3>Top Scores ({this.props.difficulty}):</h3>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th align="left">
                Name
            </th>
              <th align="left">
                Accuracy
            </th>
              <th align="left">
                PI
            </th>
            </tr>
          </thead>
          <tbody>
            {scores.map(s =>
              <tr key={s.accuracy}>
                <td>{s.name}</td>
                <td>{(s.accuracy * 100).toFixed(2)}%</td>
                <td>{s.yourPI.toFixed(5)}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TopScores;