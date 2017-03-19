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

const INVALID_ORDINAL_POSITION = Number.MAX_SAFE_INTEGER

// This will be used in our root reducer and selectors

export const NAME = 'players';

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
				playersById: sortPlayersByOrdinal(state.playersById.map((player) => {
					if (player.id !== action.id) {
						return player
					}
					return {
						...player,
						inThisGame: true,
						ordinalPosition: getNextOrdinal(state.playersById)
					}
				}))
			}

		case REMOVE_PLAYER_FROM_GAME:
			return {
				...state,
				playersById: sortPlayersByOrdinal(state.playersById.map((player) => {
					if (player.id !== action.id) {
						return player
					}
					return {
						...player,
						inThisGame: false,
						ordinalPosition: INVALID_ORDINAL_POSITION
					}
				}))
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

		default:
			return state;
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

// Returns a new playersById sorted by ordinal position and cleaned up by cleanUpOrdinalPosition
function sortPlayersByOrdinal(players) {
	
/*	var sortedPlayers = players.slice().sort((a, b) => (a.ordinalPosition - b.ordinalPosition))

	console.log('====== In sortPlayersByOrdinal. sortedPlayers has ' + sortedPlayers.length + ' entries')
	sortedPlayers.map((player, i) => ( console.log('  ' + i + ': ' + player.id + ' : ' + player.firstName + ' : ' + player.ordinalPosition)))
*/
	return(cleanUpOrdinalPosition(players.slice().sort((a, b) => (a.ordinalPosition - b.ordinalPosition))))
}

// Returns a new playersById with the ordinal positions cleaned up/compacted
function cleanUpOrdinalPosition(players) {
	return players

/*	return players.map((player, i) => (
		player.ordinalPosition === INVALID_ORDINAL_POSITION ? player : {
			...player,
			ordinalPosition: i + 1
		}
	))
*/	
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
