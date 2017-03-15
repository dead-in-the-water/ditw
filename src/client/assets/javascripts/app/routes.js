import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './App'
import NotFoundView from 'components/NotFound'
import HomePageView from 'features/homePage/homePageView'
import ProfileView from 'features/profile/components/profile'
import PlayersView from 'features/players/components/PlayersView'
import NewGameView from 'features/newGame/newGameView'
import SaveGameView from 'features/saveGame/saveGameView'
import LoadGameView from 'features/loadGame/loadGameView'
import AdminView from 'features/administration/adminView'
import ChangeClubView from 'features/changeClub/changeClubView'
import HelpView from 'features/help/helpView'
import SignOutView from 'features/signOut/signOutView'
import SignOnPage from 'features/signOnPage/components/signOnPage'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePageView} />
    <Route path='SignOnPage' component={SignOnPage} />
    <Route path='PlayersView' component={PlayersView} />
    <Route path='HomePageView' component={HomePageView} />
    <Route path='NewGameView' component={NewGameView} />
    <Route path='SaveGameView' component={SaveGameView} />
    <Route path='LoadGameView' component={LoadGameView} />
    <Route path='AdminView' component={AdminView} />
    <Route path='ProfileView' component={ProfileView} />
    <Route path='ChangeClubView' component={ChangeClubView} />
    <Route path='HelpView' component={HelpView} />
    <Route path='SignOutView' component={SignOutView} />
    <Route path='404' component={NotFoundView} />
    <Redirect from='*' to='404' />
  </Route>
)
