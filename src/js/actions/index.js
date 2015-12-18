import {GUESS, NEW_GAME} from './types';

const guess = char => ({
  type: GUESS,
  char
});

const newGame = () => ({
  type: NEW_GAME
});

export {
  guess,
  newGame
}
