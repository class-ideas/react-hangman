import ReactDom from 'react-dom';
import React from 'react';

import HangmanGame from './hangman_game';

ReactDom.render(
  <HangmanGame/>,
  document.querySelector('.react-wrapper')
);
