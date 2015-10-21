import React from 'react';
import _ from 'underscore';
import HangmanDrawing from './hangman_drawing';
import HangmanKeyboard from './keyboard';
import LetterSlots from './letter_slots';
import words from './words';

export default React.createClass({

  componentWillMount() {
    this.newGame();
  },

  newGame() {
    let word = _.sample(words);
    let strikes = 0;
    let guesses = [];
    let over = false;
    let won = false;
    this.setState({word, strikes, guesses, over, won});
    console.log(word);
  },

  hasWon() {
    let {word, guesses} = this.state;
    return !_.chain(word.split(''))
      .map(letter => _.contains(guesses, letter))
      .contains(false)
      .value();
  },

  checkLetter(letter) {
    let {strikes, guesses, over, won} = this.state;

    if (_.contains(this.state.word,letter)) {

    } else {
      strikes++;
    }
    
    guesses.push(letter);

    won = this.hasWon();

    console.log('won', won);

    if (strikes >= 6 && !won) {
      strikes = 6;
      over = true;
    }

    this.setState({strikes, guesses, over, won});
  },

  getTitle() {
    if (this.state.won) {
      return 'YOU WON!';
    } else if (this.state.over) {
      return 'Game Over';
    } else {
      return 'Hang Man';
    }
  },

  render() {
    return (
      <div>
        <h1>{this.getTitle()}</h1>
        <HangmanDrawing
          won={this.state.won}
          strikes={this.state.strikes}/>
        <LetterSlots
          word={this.state.word}
          reveal={this.state.over}
          guesses={this.state.guesses}/>
        <HangmanKeyboard
          onPress={this.checkLetter}
          enabled={!this.state.over && !this.state.won}
          disabledLetters={this.state.guesses}/>
      </div>
    );
  }

});
