// @flow

import { createStructuredSelector } from 'reselect'
import { assign, _sortBy, _slice } from 'lodash'
import { State } from 'models/players'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_PLAYER_TO_GAME = 'redux-app/players/ADD_PLAYER_TO_GAME'
const REMOVE_PLAYER_FROM_GAME = 'redux-app/players/REMOVE_PLAYER_FROM_GAME'
const REMOVE_ALL_PLAYERS_FROM_GAME = 'redux-app/players/REMOVE_ALL_PLAYERS_FROM_GAME'
const CHANGE_PLAYER_ORDINAL_POSITION = 'redux-app/players/CHANGE_PLAYER_ORDINAL_POSITION'
const SORT_PLAYERS = 'redux-app/players/SORT_PLAYERS'
const SET_DEALER = 'redux-app/players/SET_DEALER'
const CLEAR_DEALER = 'redux-app/players/CLEAR_DEALER'
const SET_BIDDER = 'redux-app/players/SET_BIDDER'
const CLEAR_BIDDER = 'redux-app/players/CLEAR_BIDDER'

export const INVALID_ORDINAL_POSITION = Number.MAX_SAFE_INTEGER
export const INVALID_ID = Number.MAX_SAFE_INTEGER
export const SORT_KEY_BY_ID = 0
export const SORT_KEY_BY_ORDINAL = 1
export const SORT_KEY_BY_NAME = 2;

// This will be used in our root reducer and selectors

export const NAME = 'players'

// Define the initial state for `players` module

const initialState: State = {
	playersById: [
		{
			id: 10,
			lastName: 'Finkelstein',
			firstName: 'Elaine',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 11,
			lastName: 'Leavitt',
			firstName: 'Stacy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 12,
			lastName: 'Elster',
			firstName: 'Beth',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 13,
			lastName: 'Finkelstein',
			firstName: 'Jack',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 14,
			lastName: 'Leavitt',
			firstName: 'Rachel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 15,
			lastName: 'Elster',
			firstName: 'Jeremy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 16,
			lastName: 'Leavitt',
			firstName: 'Daniel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 17,
			lastName: 'Finkelstein',
			firstName: 'Mike',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 18,
			lastName: 'Leavitt',
			firstName: 'Ron',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		},
		{
			id: 19,
			lastName: 'Elster',
			firstName: 'Joel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION
		}
	],
	currentDealer: INVALID_ID,
	currentBidder: INVALID_ID
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
						ordinalPosition: getNextOrdinal(state.playersById)
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
						ordinalPosition: INVALID_ORDINAL_POSITION
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
						ordinalPosition: INVALID_ORDINAL_POSITION
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
						ordinalPosition: action.newOrdPos
					}
				})
			}

		case SORT_PLAYERS:

				if (action.sortKey === SORT_KEY_BY_ID) {
					return {
					...state,
						playersById: _.sortBy(state.playersById, [function(player) { return player.id }]) 
					}
				}

				if (action.sortKey === SORT_KEY_BY_ORDINAL) {
					return {
						...state,
						playersById: _.sortBy(state.playersById, [function(player) { return player.ordinalPosition }])
					}
				}

				if (action.sortKey === SORT_KEY_BY_NAME) {
					console.log('Sorting by name')
					return {
						...state,
						playersById: _.sortBy(state.playersById, [function(player) { return player.firstName.concat(player.lastName) }])
					}
				}

				return state

		case SET_DEALER:
			return {
				...state,
				currentDealer: action.id
			}

		case CLEAR_DEALER:
			return {
				...state,
				currentDealer: INVALID_ID
			}

		case SET_BIDDER:
			return {
				...state,
				currentBidder: action.id
			}

		case CLEAR_BIDDER:
			return {
				...state,
				currentBidder: INVALID_ID
			}

		default:
			return state
	}
}

// Support functions

// Return the next available ordinal position, ignoring any & all gaps
function getNextOrdinal(players) {
	var nextOrd = -1

	// If there aren't any players, nothing to do
	if (players.length > 0 ) {
		for (var i = 0; i < players.length; i++) {
			if ((players[i].ordinalPosition !== INVALID_ORDINAL_POSITION) && (players[i].ordinalPosition > nextOrd)) {
				nextOrd = players[i].ordinalPosition
			}
		}
	}
	
	return ++nextOrd
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

function sortPlayers(sortKey) {
	return {
		type: SORT_PLAYERS,
		sortKey
	}
}

function setDealer(id) {
	return {
		type: SET_DEALER,
		id
	}
}

function clearDealer() {
	return {
		type: CLEAR_DEALER
	}
}

function setBidder(id) {
	return {
		type: SET_BIDDER,
		id
	}
}

function clearBidder() {
	return {
		type: CLEAR_BIDDER
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
	changePlayerOrdinalPosition,
	sortPlayers,
	setDealer,
	clearDealer,
	setBidder,
	clearBidder
}
