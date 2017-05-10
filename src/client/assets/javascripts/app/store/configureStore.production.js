import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import { reactReduxFirebase } from 'react-redux-firebase'

import rootReducer from '../reducer'

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
  applyMiddleware(promiseMiddleware),
  // firebase
  reactReduxFirebase(firebaseConfig, { userProfile: 'users' })
)(createStore)

export default function configureStore (initialState) {
  return enhancer(rootReducer, initialState)
}
