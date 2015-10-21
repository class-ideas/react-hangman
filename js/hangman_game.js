import React from 'react';
import HangmanDrawing from './hangman_drawing';

export default React.createClass({

  getInitialState() {
    return {strikes: 0};
  },

  componentDidMount() {
    setInterval(() => {
      let next = this.state.strikes + 1;
      if (next > 6) {
        next = -1;
      }
      this.setState({
        strikes: next
      });
    }, 2000);
  },

  render() {
    return <HangmanDrawing strikes={this.state.strikes}/>;
  }

});
