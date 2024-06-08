import React from 'react';

const UnderscoreDisplay = ({ choosenWord, guessed }) => {
  const displayWord = Array.from(choosenWord).map((char, index) => (
    guessed ? char : '_'
  ));

  return (
    <div>
      <div style={{ color: 'white' }}>
      {choosenWord.length}
        {displayWord.map((char, index) => (
          <span key={index} style={{ marginLeft: '5px' }}>{char}</span>
        ))}
      </div>
    </div>
  );
};

export default UnderscoreDisplay;
