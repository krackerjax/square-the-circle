import React, { Component } from 'react';

import firebase from './../firebase';

class TopScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    }
  }

  componentWillMount() {
    var scoresRef = firebase.database().ref("highScores");
    scoresRef.orderByChild("accuracy").on("value", (snapshot) => {
      let newScores = [];
      snapshot.forEach(function (data) {
        newScores.push(data.val());
      });

      this.setState({ scores: newScores.reverse().slice(0, 10) });
    });
  }

  render() {
    return (
      <div>
        <h3>Top Scores:</h3>
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
            {this.state.scores.map(s =>
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