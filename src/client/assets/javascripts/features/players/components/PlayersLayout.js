import React, { Component, PropTypes } from 'react'

import AddPlayerInput from './AddPlayerInput'
import PlayerTable from './PlayerTable'
import './PlayerTableApp.scss'

export default class PlayersLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired
  }

  render() {
    const { players: { playersById }, actions } = this.props

    return (
      <div className="playerListApp">
        <h1>Available Players List</h1>
        <PlayerTable players={playersById} actions={actions} />
      </div>
    ) 
  }
}
