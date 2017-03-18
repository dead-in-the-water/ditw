// @flow

import { createStructuredSelector } from 'reselect'
import assign from 'lodash/assign'

import { State } from 'models/players'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_PLAYER_TO_GAME = 'redux-app/players/ADD_PLAYER_TO_GAME'
const REMOVE_PLAYER_FROM_GAME = 'redux-app/players/REMOVE_PLAYER_FROM_GAME'
const REMOVE_ALL_PLAYERS_FROM_GAME = 'redux-app/players/REMOVE_ALL_PLAYERS_FROM_GAME'
const CHANGE_PLAYER_ORDINAL_POSITION = 'redux-app/players/CHANGE_PLAYER_ORDINAL_POSITION'

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
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 1,
			lastName: 'Leavitt',
			firstName: 'Stacy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 2,
			lastName: 'Elster',
			firstName: 'Beth',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 3,
			lastName: 'Finkelstein',
			firstName: 'Jack',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 4,
			lastName: 'Leavitt',
			firstName: 'Rachel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 5,
			lastName: 'Elster',
			firstName: 'Jeremy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 6,
			lastName: 'Leavitt',
			firstName: 'Daniel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 7,
			lastName: 'Finkelstein',
			firstName: 'Mike',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 8,
			lastName: 'Leavitt',
			firstName: 'Ron',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		},
		{
			id: 9,
			lastName: 'Elster',
			firstName: 'Joel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: -1
		}
	]
}

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
		case ADD_PLAYER_TO_GAME:
			return {
				...state,
				playersById: state.playersById.map((player) => {
					if (player.id !== action.id) {
						return player
					}
					return {
						...player,
						inThisGame: true,
						ordinalPosition: 25
					}
				})
			}

		case REMOVE_PLAYER_FROM_GAME:
			return {
				...state,
				playersById: state.playersById.map((player) => {
					if (player.id !== action.id) {
						return player
					}
					return {
						...player,
						inThisGame: false,
						ordinalPosition: -1
					}
				})
			}

		case REMOVE_ALL_PLAYERS_FROM_GAME:
			return {
				...state,
				playersById: state.playersById.map((player) => {
					if (!player.inThisGame) {
						return player
					}
					return {
						...player,
						inThisGame: false,
						ordinalPosition: -1
					}
				})
			}

		case CHANGE_PLAYER_ORDINAL_POSITION:
			return {
				...state,
				playersById: state.playersById.map((player) => {
					if (player.id !== action.id) {
						return player
					}


					return {
						...player,
						ordinalPosition: false
					}
				})
			}

		default:
			return state;
	}
}

// Action Creators

function addPlayerToGame(id: number) {
	return {
		type: ADD_PLAYER_TO_GAME,
		id
	}
}

function removePlayerFromGame(id: number) {
	return {
		type: REMOVE_PLAYER_FROM_GAME,
		id
	}
}

function removeAllPlayersFromGame() {
	return {
		type: REMOVE_ALL_PLAYERS_FROM_GAME
	}
}

function changePlayerOrdinalPosition(id: number, newOrdPos: number) {
	return {
		type: CHANGE_PLAYER_ORDINAL_POSITION,
		id,
		newOrdPos
	}
}

// Selectors

const players = (state) => state[NAME];

export const selector = createStructuredSelector({
	players
})

export const actionCreators = {
	addPlayerToGame,
	removePlayerFromGame,
	removeAllPlayersFromGame,
	changePlayerOrdinalPosition
}
