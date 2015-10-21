import React from 'react';
import _ from 'underscore';

export default React.createClass({

  getSlot(letter, index) {
    let contents = _.contains(this.props.guesses, letter) 
                 ? letter 
                 : ' ';
    return <div key={index} className='letter-slot'>{contents}</div>;
  },

  getSlots() {
    return this.props.word.split('').map(this.getSlot);
  },

  render() {
    return (
      <div className='letter-slots'>
        {this.getSlots()}
      </div>
    );
  }

});
