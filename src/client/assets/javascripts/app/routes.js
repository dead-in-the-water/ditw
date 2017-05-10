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

// TODO: Fix lint issue here
export default (store) => {
  const authRequired = (nextState, replaceState) => {
    // Now you can access the store object here.
    const state = store.getState()

    // TODO: Should be cleaner way to access
    if (!state.firebase._root.entries[0][1]) {
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
      <Route path='SaveGameView' component={SaveGameView} onEnter={authRequired} />
      <Route path='LoadGameView' component={LoadGameView} onEnter={authRequired} />
      <Route path='AdminView' component={AdminView} onEnter={authRequired} />
      <Route path='ProfileView' component={ProfileView} onEnter={authRequired} />
      <Route path='ChangeClubView' component={ChangeClubView} onEnter={authRequired} />
      <Route path='HelpView' component={HelpView} />
      <Route path='PlayersView' component={PlayersView} onEnter={authRequired} />
      <Route path='404' component={NotFoundView} />
      <Redirect from='*' to='404' />
    </Route>
  )
}
