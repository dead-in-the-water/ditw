// @flow

import { createStructuredSelector } from 'reselect'
import assign from 'lodash/assign'

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

export const INVALID_ORDINAL_POSITION = Number.MAX_SAFE_INTEGER
export const INVALID_ID = Number.MAX_SAFE_INTEGER
export const SORT_BY_ID = 0
export const SORT_BY_ORDINAL = 1
export const SORT_BY_FNAME = 2
export const SORT_BY_LNAME = 3
export const SORT_BY_GNAME = 4

/* This is the sort for the add players table -
** players currently marked inThisGame on top sorted by ordinalPosition
** players NOT (yet) marked inThisGame on follwing, sorted by First then Last
*/
export const SORT_SPECIAL_1 = 5

// This will be used in our root reducer and selectors

export const NAME = 'gameState'

// Define the initial state for `friends` module

const initialStatus: GameState = {
  currentUser: {
    loggedIn: false,
    id: INVALID_ID,
    activeClubId: INVALID_ID,
    isAdmin: false
  },
  currentDealer: INVALID_ID,
  currentBidder: INVALID_ID,
  currentRuleSet: {
    minPlayers: 2,
    maxPlayers: 8
  },
  playerRoster: [
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
  ],
  currentPlayers: [],
  defaultSortOrder: SORT_SPECIAL_1
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
          activeClubId: 0xffff,
          isAdmin: true
        }
      }
    }

    case CLEAR_LOGGED_IN:
      return {
        ...gameState,
        currentUser: {
          loggedIn: false,
          id: INVALID_ID,
          activeClubId: INVALID_ID,
          isAdmin: false
        }
      }

    case SET_DEALER:
      return {
        ...gameState,
        currentDealer: action.id
      }

    case CLEAR_DEALER:
      return {
        ...gameState,
        currentDealer: INVALID_ID
      }

    case SET_BIDDER:
      return {
        ...gameState,
        currentBidder: action.id
      }

    case CLEAR_BIDDER:
      return {
        ...gameState,
        currentBidder: INVALID_ID
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
        }))
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
            ordinalPosition: INVALID_ORDINAL_POSITION
          }
        }))
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
            ordinalPosition: INVALID_ORDINAL_POSITION
          }
        })
      }

    case SORT_PLAYERS:
      switch (action.sortKey) {
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

        case SORT_BY_GNAME:
          return {
            ...gameState,
            playerRoster: _.sortBy(gameState.playerRoster, [function(player) { return player.lastName.concat(player.firstName) }])
          }
          
        case SORT_SPECIAL_1:
          return {
            ...gameState,
            playerRoster: sortSpecial1(gameState.playerRoster)
          }
        
        default:
          return gameState
      }

    default:
      return gameState;
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

/* 
** Reset ordinalPosition for each inThisGame player to leave no gaps
*/
function cleanupOrdinals(players) {
  // Addressing the array guaranteed to be in ordinalPosition order makes numbering scheme work
  return sortSpecial1(sortByOrdinal(players).map((player, i) => ({
    ...player,
    ordinalPosition: (player.inThisGame ? i : INVALID_ORDINAL_POSITION)
  })))
}

function sortByOrdinal(players) {
  return _.sortBy(players, [function(player) { return player.ordinalPosition }])
}

/* Special sort to support player selection table
** Sort players that are currently tagged as in this game by the updated ordinalPosition
** Sort players that are NOT (yet) tagged as in this game by their names (currently hard-coded first-then-last)
*/
function sortSpecial1(players) {
  // Sort players that are in this game by their ordinalPosition
  var itgPlayers = _.sortBy(players.filter((player) => (player.inThisGame)), [function(player) { return player.ordinalPosition}])

  // Sort players that are not (yet) in this game by their names
  var nItgPlayers = _.sortBy(players.filter((player) => !player.inThisGame), ['firstName', 'lastName'])

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
  sortPlayers
}

