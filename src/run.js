import React from 'react';
import { render } from 'react-dom';

export default function run(Component) {
  const rootEl = document.getElementById('root');
  let state;

  function dispatch(action) {
    state = Component.update(state, action);

    render(
      <Component.view {...state} dispatch={dispatch} />,
      rootEl
    );
  }

  dispatch({ type: 'INIT' });
}
