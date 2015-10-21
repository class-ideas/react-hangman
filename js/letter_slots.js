import React from 'react';
import _ from 'underscore';

export default React.createClass({

  getSlot(letter, index) {
    let classNames = ['letter-slot'];
    let contents = _.contains(this.props.guesses, letter) ? letter : ' ';

    if (contents === ' ' && this.props.reveal) {
      classNames.push('revealed');
      contents = letter;
    }
    return (
      <div 
        key={index} 
        className={classNames.join(' ')}>
        {contents}
      </div>
    );
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
