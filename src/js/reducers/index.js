import words from '../words';
import {GUESS, NEW_GAME} from '../actions/types';

const nextWord = () => (
  words[Math.floor(Math.random()*words.length)]
);

const getDefaultState = () => ({
  word: nextWord(),
  guesses: new Set(),
  strikes: 0
});

function reduceNewGame(state, action) {
  return getDefaultState();
}

function reduceGuess(state, {char}) {
  let guesses = new Set(state.guesses.values());
  if (!guesses.has(char)) {
    guesses.add(char);
    let letters = new Set(state.word);
    let correct = new Set();
    for (let letter of letters) {
      if (guesses.has(letter)) {
        correct.add(letter);
      }
    }
    let strikes = correct.size === letters.size
      ? -1
      : Math.min(guesses.size - correct.size, 6);
    return Object.assign({}, state, {guesses, strikes});
  } else {
    return state;
  }
}

function reducer(state = getDefaultState(), action) {
  switch(action.type) {
    case GUESS:
      return reduceGuess(state, action);
    break;
    
    case NEW_GAME:
      return reduceNewGame(state, action);
    break;
    
    default:
      return state;
    break;
  }
}

export default reducer;
