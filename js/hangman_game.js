import React from 'react';
import _ from 'underscore';
import HangmanDrawing from './hangman_drawing';
import HangmanKeyboard from './keyboard';
import words from './words';

export default React.createClass({

  componentWillMount() {
    this.newGame();
  },

  newGame() {
    let word = _.sample(words);
    let strikes = 0;
    let guesses = [];
    this.setState({word, strikes, guesses});
    console.log(word);
  },

  checkLetter(letter) {
    let {strikes, guesses} = this.state;

    if (_.contains(this.state.word,letter)) {

    } else {
      strikes++;
    }
    
    guesses.push(letter);

    this.setState({strikes, guesses});
  },

  render() {
    return (
      <div>
        <HangmanDrawing
          strikes={this.state.strikes}/>
        <HangmanKeyboard
          onPress={this.checkLetter}
          disabledLetters={this.state.guesses}/>
      </div>
    );
  }

});
