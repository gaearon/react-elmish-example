import React from 'react';

const CHANGE = 'CHANGE';

export default function withLog(Child) {
  return {
    view({ log, state, dispatch }) {
      return (
        <div>
          <Child.view
            {...state}
            dispatch={action => dispatch({
              type: CHANGE,
              action
            })} />
          <ul>
            {log.map((action, index) =>
              <li key={index}>
                {JSON.stringify(action)}
              </li>
            )}
          </ul>
        </div>
      );
    },

    update({
      log = [],
      state = Child.update(undefined, {})
    } = {}, action) {
      switch (action.type) {
      case CHANGE:
        return {
          log: [...log, action.action],
          state: Child.update(state, action.action)
        };
      default:
        return { log, state };
      }
    }
  }
}