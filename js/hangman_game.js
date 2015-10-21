import React from 'react';
import HangmanDrawing from './hangman_drawing';
import HangmanKeyboard from './keyboard';

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
    return (
      <div>
        <HangmanDrawing strikes={this.state.strikes}/>
        <HangmanKeyboard disabledLetters={['j','d']}/>
      </div>
    );
  }

});
