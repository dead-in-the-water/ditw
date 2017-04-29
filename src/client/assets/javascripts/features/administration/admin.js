// @flow

import { createStructuredSelector } from 'reselect'

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'

// This will be used in our root reducer and selectors

export const NAME = 'gameState'

// Reducer
export default function reducer(gameState: GameState = initialStatus, action: any = {}): GameState {

  switch (action.type) {
    default:
      return gameState
  }
}

// Support functions

// Action Creators

// Selectors

const gameStatus = (state) => state[NAME]

export const selector = createStructuredSelector({
  gameStatus
})

export const actionCreators = {

}

