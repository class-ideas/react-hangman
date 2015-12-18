import React from 'react';
import {connect} from 'react-redux';
import {guess, newGame} from '../actions';
import classes from 'classnames';
import HangmanDrawing from '../components/hangman_drawing';
import HangmanKeyboard from '../components/keyboard';
import LetterSlots from '../components/letter_slots';

class Hangman extends React.Component {

  getTitle() {
    let {won, lost} = this.props;

    if (won) {
      return 'YOU WON!';
    } else if (lost) {
      return 'Game Over';
    } else {
      return 'Hang Man';
    }
  }

  newGameClass() {
    let {won, lost} = this.props;
    return classes('new-game', {shown: lost || won});
  }

  render() {
    let {dispatch, won, lost, word, guesses, strikes} = this.props;
    console.log('props', this.props);

    return (
      <div>
        <h1>{this.getTitle()}</h1>
        
        <HangmanDrawing
          won={won}
          strikes={strikes}/>
        
        <LetterSlots
          word={word}
          reveal={lost}
          guesses={guesses}/>
        
        <HangmanKeyboard
          onPress={char => dispatch(guess(char))}
          enabled={!lost && !won}
          disabledLetters={guesses}/>
        
        <button 
          className={this.newGameClass()}
          disabled={!lost && !won}
          onClick={() => dispatch(newGame())}>
          New Game
        </button>
      </div>
    );
  }

};

function select(state) {
  return {
    word: state.word,
    guesses: Array.from(state.guesses.values()),
    strikes: state.strikes,
    won: state.strikes === -1,
    lost: state.strikes === 6
  };
}

export default connect(select)(Hangman);
