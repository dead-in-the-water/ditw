import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import replaceState from 'react-router-redux'

import App from './App'
import NotFoundView from 'components/NotFound'
import HomePageView from 'features/homePage/homePageView'
import ProfileView from 'features/profile/components/profile'
import NewGameView from 'features/newGame/newGameView'
import SaveGameView from 'features/saveGame/saveGameView'
import LoadGameView from 'features/loadGame/loadGameView'
import AdminView from 'features/administration/adminView'
import ChangeClubView from 'features/changeClub/changeClubView'
import HelpView from 'features/help/helpView'
import PlayersView from 'features/players/components/PlayersView'

export default (store) => {
  const authRequired = (nextState, replaceState) => {
    // Now you can access the store object here.
    const state = store.getState()

    console.log('====== In authRequired, about to dump state')
    console.log(state)

    if (!state.gameState.currentUser.loggedIn) {
      // Not authenticated, redirect to login.
      replaceState({ nextPathname: nextState.location.pathname }, '/')
    }

    // Special handling for transitions to NewGameView when no players are yet marked in the game
    // In that case, go directly to the player selection view
    if ((state.routing.locationBeforeTransitions.pathname === '/NewGameView') &&
      (state.gameState.playerRoster.filter((player) => (player.inThisGame)).length === 0)) {
      replaceState({ nextPathname: nextState.location.pathname }, '/PlayersView')
    }
  }

  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePageView} />
      <Route path='HomePageView' component={HomePageView} />
      <Route path='NewGameView' component={NewGameView} onEnter={authRequired} />
      <Route path='SaveGameView' component={SaveGameView} />
      <Route path='LoadGameView' component={LoadGameView} />
      <Route path='AdminView' component={AdminView} />
      <Route path='ProfileView' component={ProfileView} />
      <Route path='ChangeClubView' component={ChangeClubView} />
      <Route path='HelpView' component={HelpView} />
      <Route path='PlayersView' component={PlayersView} />
      <Route path='404' component={NotFoundView} />
      <Redirect from='*' to='404' />
    </Route>
  )
}
