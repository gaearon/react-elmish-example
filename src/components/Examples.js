import React from 'react';
import * as Counter from './Counter';
import listOf from '../enhancers/listOf';
import withLog from '../enhancers/withLog';
import undoable from '../enhancers/undoable';

const CHANGE = 'CHANGE';

const examples = [{
  Example: Counter,
  name: 'Counter'
}, {
  Example: listOf(Counter, 'counter'),
  name: 'listOf(Counter)'
}, {
  Example: withLog(Counter),
  name: 'withLog(Counter)'
}, {
  Example: withLog(listOf(Counter, 'counter')),
  name: 'withLog(listOf(Counter))'  
}, {
  Example: undoable(Counter),
  name: 'undoable(Counter)'
}, {
  Example: withLog(undoable(Counter)),
  name: 'withLog(undoable(Counter))'
}, {
  Example: undoable(listOf(Counter, 'counter')),
  name: 'undoable(listOf(Counter))'
}, {
  Example: listOf(undoable(Counter), 'counter'),
  name: 'listOf(undoable(Counter))'
}]

export function view({ state, dispatch }) {
  return (
    <div>
      <h4>
        <a href='https://github.com/gaearon/react-elmish-example'
           target='_blank'>
          Source on Github
        </a>
      </h4>
      {examples.map(({ Example, name }, index) =>
        <div key={index}>
          <h1>{name}</h1>
          <Example.view
            {...state[index]}
            dispatch={action => dispatch({
              type: CHANGE,
              index,
              action
            })} />
        </div>
      )}
    </div>
  );
}

export function update({
  state = examples.map(({ Example }) =>
    Example.update(undefined, {})
  )
} = {}, action) {
  switch (action.type) {
  case CHANGE:
    const { index } = action;
    return {
      state: [
        ...state.slice(0, index),
        examples[index].Example.update(state[index], action.action),
        ...state.slice(index + 1)
      ]
    };
  default:
    return { state };
  }
}