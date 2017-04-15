// @flow

import { createStructuredSelector } from 'reselect'
import { _nth, _sortBy, assign, _floor } from 'lodash'

import { UserStatus } from 'models/gameState'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const SET_LOGGED_IN = 'redux-app/gameStatusUpdate/SET_LOGGED_IN'
const CLEAR_LOGGED_IN = 'redux-app/gameStatusUpdate/CLEAR_LOGGED_IN'
const SET_DEALER = 'redux-app/gameStatusUpdate/SET_DEALER'
const CLEAR_DEALER = 'redux-app/gameStatusUpdate/CLEAR_DEALER'
const SET_BIDDER = 'redux-app/gameStatusUpdate/SET_BIDDER'
const CLEAR_BIDDER = 'redux-app/gameStatusUpdate/CLEAR_BIDDER'
const ADD_PLAYER_TO_GAME = 'redux-app/gameStatusUpdate/ADD_PLAYER_TO_GAME'
const REMOVE_PLAYER_FROM_GAME = 'redux-app/gameStatusUpdate/REMOVE_PLAYER_FROM_GAME'
const REMOVE_ALL_PLAYERS_FROM_GAME = 'redux-app/gameStatusUpdate/REMOVE_ALL_PLAYERS_FROM_GAME'
const SORT_PLAYERS = 'redux-app/gameStatusUpdate/SORT_PLAYERS'
const TOGGLE_DEFAULT_SORT_ORDER = 'redux-app/gameStatusUpdate/TOGGLE_DEFAULT_SORT_ORDER'
const INITIALIZE_GAME_DATA = 'redux-app/gameStatusUpdate/INITIALIZE_GAME_DATA'
const RECORD_TRICKS_BID = 'redux-app/gameStatusUpdate/RECORD_TRICKS_BID'
const RECORD_TRICKS_WON = 'redux-app/gameStatusUpdate/RECORD_TRICKS_WON'
const SET_BIDDING = 'redux-app/gameStatusUpdate/SET_BIDDING'
const CLEAR_BIDDING = 'redux-app/gameStatusUpdate/CLEAR_BIDDING'
const SET_SCORING = 'redux-app/gameStatusUpdate/SET_SCORING'
const CLEAR_SCORING = 'redux-app/gameStatusUpdate/CLEAR_SCORING'
const INIT_CURRENT_ROUND = 'redux-app/gameStatusUpdate/INIT_CURRENT_ROUND'
const RELATIVE_CHANGE_CURRENT_ROUND = 'redux-app/gameStatusUpdate/RELATIVE_CHANGE_CURRENT_ROUND'
export const INVALID_NUMERIC_VALUE = Number.MAX_SAFE_INTEGER

// Sort options
export const SORT_DEFAULT = 0     // Sort based on value of gameState.defaultSortOrder (only valid for SORT_SPECIAL_1 or SORT_SPECIAL_2)
export const SORT_BY_ID = 1
export const SORT_BY_ORDINAL = 2
export const SORT_BY_FNAME = 3
export const SORT_BY_LNAME = 4
export const SORT_BY_NNAME = 5    // Sort by nick name
export const SORT_SPECIAL_1 = 6   // Sort inThisGame players by ordinal and others by first/last
export const SORT_SPECIAL_2 = 7   // Use nickName instead of first/last

// This will be used in our root reducer and selectors

export const NAME = 'gameState'

// Define the initial state for `friends` module

const testClub: CardClub = {
	id: "0000-0000-0000",
	name: "Extended Finkelstein Clan",
	members: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
}

const initialStatus: GameState = {
	currentUser: {
		loggedIn: false,
		id: INVALID_NUMERIC_VALUE,
		isAdmin: false
	},
	currentClub: {},
	currentDealer: INVALID_NUMERIC_VALUE,
	currentBidder: INVALID_NUMERIC_VALUE,
	currentRoundIdx: INVALID_NUMERIC_VALUE,
	bidding: false,
	scoring: false,
	currentRuleSet: {
		minPlayers: 3,
		maxPlayers: 10,
		contractBonus: 10,
		contractBonusMultiplicative: false,
		trickBonus: 1,
		screwTheDealer: false
	},
	gameRounds: [],
	defaultSortOrder: SORT_SPECIAL_1,
	playerRoster: [
		{
			id: 22,
			lastName: 'Walker',
			firstName: 'Alexandria',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Alex'
		},
		{
			id: 24,
			lastName: 'Elster',
			firstName: 'Andrew',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Andy'
		},
		{
			id: 21,
			lastName: 'Clements',
			firstName: 'Benjamin',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Ben'
		},
		{
			id: 12,
			lastName: 'Elster',
			firstName: 'Beth',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Beth'
		},
		{
			id: 16,
			lastName: 'Leavitt',
			firstName: 'Daniel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Dan'
		},
		{
			id: 10,
			lastName: 'Finkelstein',
			firstName: 'Elaine',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Gammy'
		},
		{
			id: 13,
			lastName: 'Finkelstein',
			firstName: 'Jack',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Gampa'
		},
		{
			id: 15,
			lastName: 'Elster',
			firstName: 'Jeremy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Jer'
		},
		{
			id: 19,
			lastName: 'Elster',
			firstName: 'Joel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Joel'
		},
		{
			id: 20,
			lastName: 'Finkelstein',
			firstName: 'Karin',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Care Bear'
		},
		{
			id: 23,
			lastName: 'Leavitt',
			firstName: 'Marc',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Marc'
		},
		{
			id: 17,
			lastName: 'Finkelstein',
			firstName: 'Mike',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Mike'
		},
		{
			id: 14,
			lastName: 'Leavitt',
			firstName: 'Rachel',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Rach'
		},
		{
			id: 18,
			lastName: 'Leavitt',
			firstName: 'Ron',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Ron'
		},
		{
			id: 11,
			lastName: 'Leavitt',
			firstName: 'Stacy',
			avgScore: 0,
			avgPosition: 0,
			gamesPlayed: 0,
			inThisGame: false,
			ordinalPosition: INVALID_NUMERIC_VALUE,
			nickName: 'Stacy'
		}
	],
}

// Reducer
export default function reducer(gameState: GameState = initialStatus, action: any = {}): GameState {

	switch (action.type) {
		case SET_LOGGED_IN: {
			return {
				...gameState,
				currentUser: {
					loggedIn: true,
					id: 0xffff,
					isAdmin: true
				},
				currentClub: testClub
			}
		}

		case CLEAR_LOGGED_IN:
			return {
				...gameState,
				currentUser: {
					loggedIn: false,
					id: INVALID_NUMERIC_VALUE,
					isAdmin: false
				},
				currentClub: {}
			}

		case SET_DEALER:
			return {
				...gameState,
				currentDealer: action.id
			}

		case CLEAR_DEALER:
			return {
				...gameState,
				currentDealer: INVALID_NUMERIC_VALUE
			}

		case SET_BIDDER:
			return {
				...gameState,
				currentBidder: action.id
			}

		case CLEAR_BIDDER:
			return {
				...gameState,
				currentBidder: INVALID_NUMERIC_VALUE
			}

		case ADD_PLAYER_TO_GAME:
			return {
				...gameState,
				playerRoster: cleanupOrdinals(gameState.playerRoster.map((player) => {
					if (player.id !== action.id) {
						return player
					}

					return {
						...player,
						inThisGame: true,
						ordinalPosition: getNextOrdinal(gameState.playerRoster)
					}
				}), gameState.defaultSortOrder)
			}

		case REMOVE_PLAYER_FROM_GAME:
			return {
				...gameState,
				playerRoster: cleanupOrdinals(gameState.playerRoster.map((player) => {
					if (player.id !== action.id) {
						return player
					}
					return {
						...player,
						inThisGame: false,
						ordinalPosition: INVALID_NUMERIC_VALUE
					}
				}), gameState.defaultSortOrder)
			}

		case REMOVE_ALL_PLAYERS_FROM_GAME:
			return {
				...gameState,
				playerRoster: gameState.playerRoster.map((player) => {
					if (!player.inThisGame) {
						return player
					}
					return {
						...player,
						inThisGame: false,
						ordinalPosition: INVALID_NUMERIC_VALUE
					}
				})
			}

		case SORT_PLAYERS:
			switch (action.sortKey) {
				case SORT_DEFAULT:
					return {
						...gameState,
						playerRoster: sortSpecial1(gameState.playerRoster, gameState.defaultSortOrder)
					}

				case SORT_BY_ID:
					return {
					...gameState,
						playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.id }]) 
					}

				case SORT_BY_ORDINAL:
					return {
						...gameState,
						playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.ordinalPosition }])
					}

				case SORT_BY_FNAME:
					return {
						...gameState,
						playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.firstName.concat(player.lastName) }])
					}

				case SORT_BY_LNAME:
					return {
						...gameState,
						playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.lastName.concat(player.firstName) }])
					}

				case SORT_BY_NNAME:
					return {
						...gameState,
						playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.lastName.concat(player.firstName) }])
					}
					
				case SORT_SPECIAL_1:
					return {
						...gameState,
						playerRoster: sortSpecial1(gameState.playerRoster, SORT_SPECIAL_1)
					}
				
				case SORT_SPECIAL_2:
					return {
						...gameState,
						playerRoster: sortSpecial1(gameState.playerRoster, SORT_SPECIAL_2)
					}
				
				default:
					return gameState
			}

		case TOGGLE_DEFAULT_SORT_ORDER:
			return {
				...gameState,
				defaultSortOrder: (gameState.defaultSortOrder === SORT_SPECIAL_1) ? SORT_SPECIAL_2 : SORT_SPECIAL_1
			}

		case INITIALIZE_GAME_DATA:

			// Assumes sorting all clean
			const players = gameState.playerRoster.filter((player) => player.inThisGame)
			const isEven = (val) => (val % 2 === 0)
			const lastPlayer = players.length - 1
			const maxHandSize = _.floor(52 / players.length)
			const totalRounds = maxHandSize
			const maxEvenHandSize = maxHandSize - (maxHandSize % 2)
			var curBidderIdx = 0
			var curDealerIdx = lastPlayer
			var curHandSize = 2
			var rounds = []

			for (var r = 0; r < totalRounds; r++) {
				rounds.push({
					dealer: curDealerIdx,
					bidder: curBidderIdx,
					handsize: curHandSize,
					results: players.map((player) => ({
						id: player.id,
						tricksBid: INVALID_NUMERIC_VALUE,
						tricksWon: INVALID_NUMERIC_VALUE
					}))
				})

				// If we've reached last player in list, wrap around to first
				if (++curDealerIdx > lastPlayer) { curDealerIdx = 0 }

				// Ditto for curBidder
				if (++curBidderIdx > lastPlayer) { curBidderIdx = 0 }

				// curHandSize a little trickier
				// If curHandSize is even, we've been on the going up side
				if (isEven(curHandSize)) {
					// If we've reach max even hand size
					if (curHandSize >= maxEvenHandSize) {
						// If maxHandSize > maxEvenHandSize, it can only be 1 larger
						if (maxHandSize > maxEvenHandSize) {
							curHandSize++
						} 
						// maxHandSize is even, so decrement to largest odd hand size
						else {
							curHandSize--
						}
					} 
					// Not at maxEvenHand size, keep incrementing by 2
					else {
						curHandSize = curHandSize + 2
					}
				} 
				// curHandSize is odd, so we're decreasing hand size - just check for end
				else {
					if (curHandSize > 1) { curHandSize = curHandSize - 2 }
				}
			}
			return {
				...gameState,
				gameRounds: rounds

				}
		case RECORD_TRICKS_BID:
			return {
				...gameState,
				gameRounds: gameState.gameRounds.map((round, i) => {
					if (i !== action.round) {
						return round
					}
					return {
						...round,
						results: round.results.map((result) => {
							if (action.id !== result.id) {
								return result
							}
							return {
								...result,
								tricksBid: action.tricksBid
							}
						})
					}
				})
			}

		case RECORD_TRICKS_WON:
			return {
				...gameState,
				gameRounds: gameState.gameRounds.map((round, i) => {
					if (i !== action.round) {
						return round
					}
					return {
						...round,
						results: round.results.map((result) => {
							if (action.id !== result.id) {
								return result
							}
							return {
								...result,
								tricksWon: action.tricksWon
							}
						})
					}
				})
			}

		case SET_BIDDING:
			return {
				...gameState,
				bidding: true
			}

		case CLEAR_BIDDING:
			return {
				...gameState,
				bidding: false
			}
			
		case SET_SCORING:
			return {
				...gameState,
				scoring: true
			}
			
		case CLEAR_SCORING:
			return {
				...gameState,
				scoring: false
			}
			
		case INIT_CURRENT_ROUND:
			return {
				...gameState,
				currentRoundIdx: 0
			}  

		case RELATIVE_CHANGE_CURRENT_ROUND:
			return {
				...gameState,
				currentRoundIdx: (gameState.currentRoundIdx + action.relativeChange)
			}  

		default:
			return gameState
	}
}

// Support functions

// Return the next available ordinal position, ignoring any & all gaps
function getNextOrdinal(players) {
	var nextOrd = -1

	// If there aren't any players, nothing to do
	if (players.length > 0 ) {
		for (var i = 0; i < players.length; i++) {
			if ((players[i].ordinalPosition !== INVALID_NUMERIC_VALUE) && (players[i].ordinalPosition > nextOrd)) {
				nextOrd = players[i].ordinalPosition
			}
		}
	}
	
	return ++nextOrd
}

/* 
** Reset ordinalPosition for each inThisGame player to leave no gaps
*/
function cleanupOrdinals(players, sortOrder) {
	// Addressing the array guaranteed to be in ordinalPosition order makes numbering scheme work
	return sortSpecial1(_.sortBy(players, ['ordinalPosition']).map((player, i) => ({
		...player,
		ordinalPosition: (player.inThisGame ? i : INVALID_NUMERIC_VALUE)
	})), sortOrder)
}

/* Special sort to support player selection table
** Sort players that are currently tagged as in this game by the updated ordinalPosition
** Sort players that are NOT (yet) tagged as in this game by their names (currently hard-coded first-then-last)
*/
function sortSpecial1(players, sortOrder) {
	// Sort players that are in this game by their ordinalPosition
	var itgPlayers = _.sortBy(players.filter((player) => (player.inThisGame)), ['ordinalPosition'])

	// Sort players that are not (yet) in this game by their names
	if (sortOrder == SORT_SPECIAL_1) {
		var nItgPlayers = _.sortBy(players.filter((player) => !player.inThisGame), ['firstName', 'lastName'])
	} else {
		var nItgPlayers = _.sortBy(players.filter((player) => !player.inThisGame), ['nickName'])
	}

	// And return the concatonated list
	return itgPlayers.concat(nItgPlayers)
}

// Action Creators

function setLoggedIn(userId = 0, clubId = 0) {
	return {
		type: SET_LOGGED_IN,
		userId,
		clubId,
	}
}

function clearLoggedIn() {
	return {
		type: CLEAR_LOGGED_IN
	}
}

function setDealer(id: number) {
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

function setBidder(id: number) {
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

function sortPlayers(sortKey) {
	return {
		type: SORT_PLAYERS,
		sortKey
	}
}

function toggleDefaultSortOrder() {
	return {
		type: TOGGLE_DEFAULT_SORT_ORDER
	}
}

function initGameData() {
	return {
		type: INITIALIZE_GAME_DATA
	}
}

function recordTricksBid(round, id, tricksBid) {
	return {
		type: RECORD_TRICKS_BID,
		round,
		id,
		tricksBid
	}
}

function recordTricksWon(round, id, tricksWon) {
	return {
		type: RECORD_TRICKS_WON,
		round,
		id,
		tricksWon
	}
}

function setBidding() {
	return {
		type: SET_BIDDING
	}
}

function clearBidding() {
	return {
		type: CLEAR_BIDDING
	}
}

function setScoring() {
	return {
		type: SET_SCORING
	}
}

function clearScoring() {
	return {
		type: CLEAR_SCORING
	}
}

function initCurrentRoundIdx() {
	return {
		type: INIT_CURRENT_ROUND
	}
}

function relativeChangeCurrentRoundIdx(relativeChange) {
	return {
		type: RELATIVE_CHANGE_CURRENT_ROUND,
		relativeChange
	}
}

// Selectors

const gameStatus = (state) => state[NAME];

export const selector = createStructuredSelector({
	gameStatus
})

export const actionCreators = {
	setLoggedIn,
	clearLoggedIn,
	setDealer,
	clearDealer,
	setBidder,
	clearBidder,
	addPlayerToGame,
	removePlayerFromGame,
	removeAllPlayersFromGame,
	sortPlayers,
	toggleDefaultSortOrder,
	initGameData,
	recordTricksBid,
	recordTricksWon,
	setBidding,
	clearBidding,
	setScoring,
	clearScoring,
	initCurrentRoundIdx,
	relativeChangeCurrentRoundIdx
}

