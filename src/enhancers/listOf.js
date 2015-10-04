import React from 'react';

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const CHANGE = 'CHANGE';

export default function listOf(Item, what) {
  return {
    view({ items, dispatch }) {
      return (
        <div>
          <button onClick={() => dispatch({
            type: ADD
          })}>
            Add {what}
          </button>
          <button onClick={() => dispatch({
            type: REMOVE,
            index: items.length - 1
          })}>
            Remove {what}
          </button>
          {items.map((item, i) =>
            <Item.view
              key={i}
              {...item}
              dispatch={action => dispatch({
                type: CHANGE,
                index: i,
                action
              })} />
          )}
        </div>
      );
    },

    update({ items = [] } = {}, action) {
      switch (action.type) {
      case ADD:
        return {
          items: [
            ...items,
            Item.update(undefined, { type: 'INIT' })
          ]
        };
      case REMOVE:
        return {
          items: [
            ...items.slice(0, action.index),
            ...items.slice(action.index + 1)
          ]
        };
      case CHANGE:
        return {
          items: [
            ...items.slice(0, action.index),
            Item.update(items[action.index], action.action),
            ...items.slice(action.index + 1)
          ]
        };
      default:
        return { items };
      }
    }
  }
}