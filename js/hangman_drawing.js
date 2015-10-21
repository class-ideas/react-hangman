import React from 'react';
import _ from 'underscore';

const WINNING_LEVEL = -1;
const LOSING_LEVEL = 6;
const LEVEL_MAP = {
  'strike-0': 0,
  'strike-1': 1,
  'strike-2': 2,
  'strike-3': 3,
  'strike-4': 4,
  'strike-5': 5,
  
  gameover: LOSING_LEVEL,
  gamewon: WINNING_LEVEL
};

export default React.createClass({

  level() {
    if (this.props.won) {
      return WINNING_LEVEL;
    } else {
      return Math.min(
        LOSING_LEVEL,
        Number(this.props.strikes)
      );
    }
  },

  getClass(label, strikes) {
    let current = '';
    if (strikes === this.level()) {
      current = 'current';
    }

    return `${label} ${current}`;
  },

  getSprites() {
    return _.map(LEVEL_MAP, (strikes, label) => {
      return (
        <div
          key={label}
          className={this.getClass(label, strikes)}/>
      );
    });
  },

  render() {
    return (
      <div className='hangman-sprites'>
        {this.getSprites()}
      </div>
    );
  }

});
