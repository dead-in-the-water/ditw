// @flow

import { createStructuredSelector } from 'reselect'
import assign from 'lodash/assign'

import { UserStatus } from 'models/gameState'
import { SORT_KEY_BY_ID, SORT_KEY_BY_ORDINAL, SORT_KEY_BY_NAME, INVALID_ORDINAL_POSITION, INVALID_ID } from '../players/players'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const SET_LOGGED_IN = 'redux-app/gameStatus/SET_LOGGED_IN'
const CLEAR_LOGGED_IN = 'redux-app/gameStatus/CLEAR_LOGGED_IN'
const SET_DEALER = 'redux-app/gameStatus/SET_DEALER'
const CLEAR_DEALER = 'redux-app/gameStatus/CLEAR_DEALER'
const SET_BIDDER = 'redux-app/gameStatus/SET_BIDDER'
const CLEAR_BIDDER = 'redux-app/gameStatus/CLEAR_BIDDER'

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
  currentPlayers: [],
  defaultSortOrder: SORT_KEY_BY_NAME
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

    default:
      return gameState;
  }
}

// Action Creators

function setLoggedIn(userId = 0, clubId = 0) {
  return {
    type: SET_LOGGED_IN,
    userId,
    clubId
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
  clearBidder

}

