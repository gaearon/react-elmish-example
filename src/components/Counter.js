import React from 'react';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function view({ counter, dispatch }) {
  return (
    <div>
      {counter}
      <button onClick={() => dispatch({
        type: INCREMENT
      })}>+</button>
      <button onClick={() => dispatch({
        type: DECREMENT
      })}>-</button>
    </div>
  );
}

export function update({ counter = 0 } = {}, action) {
  switch (action.type) {
  case INCREMENT:
    return { counter: counter + 1 }; 
  case DECREMENT:
    return { counter: counter - 1 };
  default:  
    return { counter };
  }
}
