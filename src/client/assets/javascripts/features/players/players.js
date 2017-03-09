// @flow

import { createStructuredSelector } from 'reselect';
import assign from 'lodash/assign';

import { State } from 'models/players';

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_PLAYER = 'redux-app/players/ADD_PLAYER';
const STAR_PLAYER = 'redux-app/players/STAR_PLAYER';
const DELETE_PLAYER = 'redux-app/players/DELETE_PLAYER';

// This will be used in our root reducer and selectors

export const NAME = 'players';

// Define the initial state for `players` module

const initialState: State = {
  playersById: [
    {
      id: 0,
      lastName: 'Finkelstein',
      firstName: 'Elaine',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    },
    {
      id: 1,
      lastName: 'Leavitt',
      firstName: 'Stacy',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    },
    {
      id: 2,
      lastName: 'Elster',
      firstName: 'Beth',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    },
    {
      id: 3,
      lastName: 'Finkelstein',
      firstName: 'Jack',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    },
    {
      id: 4,
      lastName: 'Leavitt',
      firstName: 'Rachel',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    },
    {
      id: 5,
      lastName: 'Elster',
      firstName: 'Jeremy',
      avgScore: 0,
      avgPosition: 0,
      gamesPlayed: 0
    }
  ]
};

// Reducer

/**
 * Another clever approach of writing reducers:
 *
 * export default function(state = initialState, action) {
 *   const actions = {
 *      [ACTION_TYPE]: () => [action.payload.data, ...state]
 *   };
 *
 *   return (_.isFunction(actions[action.type])) ? actions[action.type]() : state
 * }
 */

export default function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case ADD_PLAYER: {
      const len = state.players.length ? state.players.length : 1;
      const newId = (state.players[len - 1] + 1) || 0;
      return {
        ...state,
        players: state.players.concat(newId),
        playersById: [
          ...state.playersById,
          {
            id: newId,
            name: action.name
          }
        ]
      };
    }

    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter((id) => id !== action.id),
        playersById: state.playersById.filter((player) => player.id !== action.id)
      };

    case STAR_PLAYER:
      return {
        ...state,
        playersById: state.playersById.map((player) => {
          if (player.id !== action.id) {
            return player;
          }

          return assign({}, player, {
            starred: !player.starred
          });
        })
      };

    default:
      return state;
  }
}

// Action Creators

function addPlayer(name: string) {
  return {
    type: ADD_PLAYER,
    name
  };
}

// or in a form of arrow function

// const addPlayer = (name: string) => ({
//   type: ADD_PLAYER,
//   name
// });

function deletePlayer(id: number) {
  return {
    type: DELETE_PLAYER,
    id
  };
}

function starPlayer(id: number) {
  return {
    type: STAR_PLAYER,
    id
  };
}

// Selectors

const players = (state) => state[NAME];

export const selector = createStructuredSelector({
  players
});

export const actionCreators = {
  addPlayer,
  deletePlayer,
  starPlayer
};
