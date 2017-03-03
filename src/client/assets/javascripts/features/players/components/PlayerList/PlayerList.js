import React, { Component, PropTypes } from 'react';

import PlayerListItem from '../PlayerListItem';
import './PlayerList.scss';

import {List, ListItem} from 'material-ui/List';

export default class PlayerList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired
  };

  renderList() {
    return this.props.players.map((Player) =>
      (
        <PlayerListItem
          key={Player.id}
          id={Player.id}
          name={Player.name}
          lastName={Player.lastName}
          firstName={Player.firstName}
          avgScore={Player.avgScore}
          avgPosition={Player.avgPosition}
          gamesPlayed={Player.gamesPlayed}
          starred={Player.starred}
          {...this.props.actions} />
      )
    );
  }

  render() {
    return (
      <List className="playerList">
        {this.renderList()}
      </List>
    );
  }
}
