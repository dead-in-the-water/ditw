// @flow

import { createStructuredSelector } from 'reselect'
import { assign, _sortBy, _slice, _cloneDeep, _map } from 'lodash'
import { State } from 'models/players'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_PLAYER_TO_GAME = 'redux-app/players/ADD_PLAYER_TO_GAME'
const REMOVE_PLAYER_FROM_GAME = 'redux-app/players/REMOVE_PLAYER_FROM_GAME'
const REMOVE_ALL_PLAYERS_FROM_GAME = 'redux-app/players/REMOVE_ALL_PLAYERS_FROM_GAME'
const CHANGE_PLAYER_ORDINAL_POSITION = 'redux-app/players/CHANGE_PLAYER_ORDINAL_POSITION'
const SORT_PLAYERS = 'redux-app/players/SORT_PLAYERS'

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
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Gammy',
			useGameName: true
		},
		{
			id: 11,
			lastName: 'Leavitt',
			firstName: 'Stacy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Stacy',
			useGameName: true
		},
		{
			id: 12,
			lastName: 'Elster',
			firstName: 'Beth',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Beth',
			useGameName: true
		},
		{
			id: 13,
			lastName: 'Finkelstein',
			firstName: 'Jack',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Gampa',
			useGameName: true
		},
		{
			id: 14,
			lastName: 'Leavitt',
			firstName: 'Rachel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Rach',
			useGameName: true
		},
		{
			id: 15,
			lastName: 'Elster',
			firstName: 'Jeremy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Jer',
			useGameName: true
		},
		{
			id: 16,
			lastName: 'Leavitt',
			firstName: 'Daniel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Dan',
			useGameName: true
		},
		{
			id: 17,
			lastName: 'Finkelstein',
			firstName: 'Mike',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Mike',
			useGameName: true
		},
		{
			id: 18,
			lastName: 'Leavitt',
			firstName: 'Ron',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Ron',
			useGameName: true
		},
		{
			id: 19,
			lastName: 'Elster',
			firstName: 'Joel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_ORDINAL_POSITION,
			gameName: 'Joel',
			useGameName: true
		}
	]
}

// Reducer
export default function reducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case ADD_PLAYER_TO_GAME:
			return {
				...state,
				playersById: cleanupOrdinals(state.playersById.map((player) => {
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
				playersById: cleanupOrdinals(state.playersById.map((player) => {
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
					return {
						...state,
						playersById: _.sortBy(state.playersById, [function(player) { return player.firstName.concat(player.lastName) }])
					}
				}

				return state

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


function cleanupOrdinals(playersRO) {

	console.log('====== In cleanupOrdinals')

	// Safety 1st - make a copy
	console.log('  about to cloneDeep')
	var safeCopy = _.cloneDeep(playersRO)


	console.log('  about to filter itg')
	var itgPlayers1 = safeCopy.filter((player) => (player.inThisGame))
	console.log(itgPlayers1)
	console.log('  about to map itg ')
	var itgPlayers2 = itgPlayers1.map((player, i) => player.ordinalPosition = (player.inThisGame ? i : player.ordinalPosition))
	console.log(itgPlayers2)
	console.log('  about to sort itg')
	var itgPlayers = _.sortBy(itgPlayers2, [function(player) { return (player.ordinalPosition) }])
	console.log(itgPlayers)

	console.log('  itgPlayers has ' + itgPlayers.length + ' members')
	itgPlayers.map((player, i) => console.log('    idx: ' + i + '; id ' + player.id + '; ordinalPosition: ' + player.ordinalPosition))

	console.log('  about to filter nItg')
	var nItgPlayers1 = safeCopy.filter((player) => !player.inThisGame)
	console.log('  about to map nItg')
	var nItgPlayers2 = nItgPlayers1.map((player) => player.ordinalPosition = INVALID_ORDINAL_POSITION)
	console.log('  about to sort nItg')
	var nItgPlayers = _.sortBy(nItgPlayers2, [function(player) { return (player.firstName + player.lastName) }])

	console.log('  nItgPlayers has ' + nItgPlayers.length + ' members')
	nItgPlayers.map((player, i) => console.log('    idx: ' + i + '; id ' + player.id + '; Name: ' + player.firstName + ' ' + player.lastName))

	return itgPlayers.concat(nItgPlayers)
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
	sortPlayers
}
