import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import React from 'react';
import ReactDom from 'react-dom';

import Component from './component';

ReactDom.render(
  <Component label="Hello World"/>
  , document.querySelector('.react-wrapper')
);

console.log('Hello, World');
