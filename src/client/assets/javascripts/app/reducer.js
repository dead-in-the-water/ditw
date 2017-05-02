import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import homePage, { NAME as gameStateName } from 'features/homePage'

export default combineReducers({
  routing,
  [gameStateName]: homePage,
  firebase: firebaseStateReducer
})
