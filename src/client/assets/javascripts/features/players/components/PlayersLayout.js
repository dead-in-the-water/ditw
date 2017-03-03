import React, { Component, PropTypes } from 'react';

import AddPlayerInput from './AddPlayerInput';
import PlayerList from './PlayerList';
import './PlayerListApp.scss';

export default class PlayersLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired
  };

  render() {
    const { players: { playersById }, actions } = this.props;

    return (
      <div className="playerListApp">
        <h1>Available Players List</h1>
        <AddPlayerInput addPlayer={actions.addPlayer} />
        <PlayerList players={playersById} actions={actions} />
      </div>
    );
  }
}
