import ReactDom from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Hangman from './containers';

ReactDom.render(
  <Provider store={store}>
    <Hangman/>
  </Provider>,
  document.querySelector('.react-wrapper')
);
