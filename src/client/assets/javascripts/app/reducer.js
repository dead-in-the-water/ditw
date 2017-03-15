import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import players, { NAME as playersName } from 'features/players'
import homePage, { NAME as loggedInName } from 'features/homePage'

export default combineReducers({
  routing,
  [playersName]: players,
  [loggedInName]: homePage
})
