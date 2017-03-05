import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import NotFoundView from 'components/NotFound';
import MainView from 'components/MainView';
import HomePageView from 'features/HomePage/components/homePage';
import ProfileView from 'features/profile/components/profile';
import PlayersView from 'features/players/components/PlayersView';

export default (
  <Route path='/' component={App}>
  	<IndexRoute component={HomePageView} />
  	<Route path='ProfileView' component={ProfileView} />
  	<Route path='PlayersView' component={PlayersView} />
  	<Route path='404' component={NotFoundView} />
    <Redirect from='*' to='404' />
  </Route>
)
