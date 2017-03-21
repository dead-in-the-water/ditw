// @flow

import { createStructuredSelector } from 'reselect'
import assign from 'lodash/assign'

import { UserStatus } from 'models/userStatus'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const SET_LOGGED_IN = 'redux-app/user/SET_LOGGED_IN'
const CLEAR_LOGGED_IN = 'redux-app/user/CLEAR_LOGGED_IN'

// This will be used in our root reducer and selectors

export const NAME = 'loggedIn'

// Define the initial state for `friends` module

const initialStatus: UserStatus = {
  loggedIn: false
}

// Reducer
export default function reducer(userStatus: UserStatus = initialStatus, action: any = {}): UserStatus {

  switch (action.type) {
    case SET_LOGGED_IN: {
      return {
        ...userStatus,
        loggedIn: true
      }
    }

    case CLEAR_LOGGED_IN:
      return {
        ...userStatus,
        loggedIn: false
      }

    default:
      return userStatus;
  }
}

// Action Creators

function setLoggedIn() {
  return {
    type: SET_LOGGED_IN,
  }
}

function clearLoggedIn() {
  return {
    type: CLEAR_LOGGED_IN
  }
}

// Selectors

const loggedInStatus = (userStatus) => userStatus[NAME];

export const selector = createStructuredSelector({
  loggedInStatus
})

export const actionCreators = {
  setLoggedIn,
  clearLoggedIn
}

