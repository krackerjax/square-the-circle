import React, { PureComponent } from 'react';

class Result extends PureComponent {

  render() {
    const { result } = this.props;
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h4>Score:</h4>
            <ul>
              <li>
                Accuracy: {result.accuracy && <b>{(result.accuracy * 100).toFixed(2)}%</b>}
              </li>
              <li>
                π by your estimate: {result.yourPI && <b>{result.yourPI ? result.yourPI.toFixed(5) : 0}</b>}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <input
            style={{ height: "1.5em" }}
            placeholder="Name"
            type="text"
            value={this.props.playerName}
            onChange={this.props.handlePlayerNameChange}
            maxLength="10"
          />
          <button className="high-score-submit" disabled={this.props.playerName === '' || this.props.hasSubmitted} onClick={this.props.submitScore}>Submit High Score!</button>
        </div>
      </div>
    );
  }
}

export default Result;