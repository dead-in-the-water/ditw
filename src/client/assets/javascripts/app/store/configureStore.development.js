import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import promiseMiddleware from 'redux-promise'
import reduxImmutableState from 'redux-immutable-state-invariant'
import createLogger from 'redux-logger'

// firebase
import { reactReduxFirebase } from 'react-redux-firebase'

import rootReducer from '../reducer'
import DevTools from '../DevTools'

/**
 * Entirely optional.
 * This tiny library adds some functionality to your DevTools,
 * by logging actions/state to your console. Used in conjunction
 * with your standard DevTools monitor gives you great flexibility.
 */
const logger = createLogger()

const middlewares = [
  // reactReduxFirebase(firebaseConfig, { userProfile: 'users' }),
  promiseMiddleware,
  logger,
  reduxImmutableState({ ignore: ['firebase'] })
]

// By default we try to read the key from ?debug_session=<key> in the address bar
const getDebugSessionKey = function () {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length) ? matches[1] : null
}

// Firebase app config
const firebaseConfig = {
  apiKey: 'AIzaSyBZ613zFKwFCSpiyRPJYOGBBJd4uOqKsp0',
  authDomain: 'ditw-5e8ff.firebaseapp.com',
  databaseURL: 'https://ditw-5e8ff.firebaseio.com',
  projectId: 'ditw-5e8ff',
  storageBucket: 'ditw-5e8ff.appspot.com',
  messagingSenderId: '666669973769'
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  // firebase
  reactReduxFirebase(firebaseConfig, { userProfile: 'users' }),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  // Enable hot module replacement for reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
