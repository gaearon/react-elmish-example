import React from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const CHANGE = 'CHANGE';

export default function undoable(Child) {
  return {
    view({ past, present, future, dispatch }) {
      return (
        <div>
          <button
            disabled={past.length === 0}
            onClick={() => dispatch({
              type: UNDO
            })}>
            Undo
          </button>
          <button
            disabled={future.length === 0}
            onClick={() => dispatch({
              type: REDO
            })}>
            Redo
          </button>
          <Child.view
            {...present}
            dispatch={action => dispatch({
              type: CHANGE,
              action
            })} />
        </div>
      );
    },

    update({
      past = [],
      present = Child.update(undefined, {}),
      future = []
    } = {}, action) {
      switch (action.type) {
      case UNDO:
        return {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future]
        }
      case REDO:
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1)
        }
      case CHANGE:
        return {
          past: [...past, present],
          present: Child.update(present, action.action),
          future: []
        };
      default:
        return { past, present, future };
      }
    }
  }
}