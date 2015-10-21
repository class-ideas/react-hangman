import React from 'react';
import _ from 'underscore';

const ROW_ONE = 'abcdefghijklm'.split('');
const ROW_TWO = 'nopqrstuvwxyz'.split('');

export default React.createClass({

  getButton(letter) {
    let disabled = _.includes(this.props.disabledLetters, letter);
    return <button key={letter} disabled={disabled}>{letter}</button>;
  },

  getRow(row) {
    return (
      <div className='button-row' key={row.join('')}>
        {row.map(this.getButton)}
      </div>
    );
  },

  render() {
    return (
      <div className='hangman-keyboard'>
        {[ROW_ONE, ROW_TWO].map(this.getRow)}
      </div>
    );
  }

});
