import React from 'react';
import classes from 'classnames';

const getSlots = ({word, guesses, reveal}) => (
  word.split('').map((letter, index) => {
    let className = classes('letter-slot', { 
      revealed: reveal && guesses.indexOf(letter) === -1
    });
    let content = reveal || guesses.indexOf(letter) >= 0 ? letter : ' '
    return (
      <div 
        key={index} 
        className={className}>
        {content}
      </div>
    );
  })
);

const LetterSlots = (props) => (
  <div className='letter-slots'>
    {getSlots(props)}
  </div>
);

export default LetterSlots;
