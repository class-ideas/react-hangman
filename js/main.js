import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import React from 'react';
import ReactDom from 'react-dom';

import HangmanGame from './hangman_game';

ReactDom.render(
  <HangmanGame/>,
  document.querySelector('.react-wrapper')
);
