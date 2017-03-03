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
  players: [0, 1, 2, 3, 4],
  playersById: [
    {
      id: 0,
      lastName: 'B.I.G.',
      firstName: 'Notorious',
      avgScore: 41.3,
      avgPosition: 1.7,
      gamesPlayed: 213
    },
    {
      id: 1,
      lastName: 'Shakur',
      firstName: 'Tupac',
      avgScore: 37.1,
      avgPosition: 2.1,
      gamesPlayed: 117
    },
    {
      id: 2,
      lastName: 'Dre',
      firstName: 'Dr.',
      avgScore: 37.1,
      avgPosition: 2.1,
      gamesPlayed: 117
    },
    {
      id: 3,
      lastName: 'Pun',
      firstName: 'Big',
      avgScore: 44.2,
      avgPosition: 1.3,
      gamesPlayed: 197
    },
    {
      id: 4,
      lastName: 'Rakim',
      firstName: '',
      avgScore: 34.9,
      avgPosition: 3.2,
      gamesPlayed: 38
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
