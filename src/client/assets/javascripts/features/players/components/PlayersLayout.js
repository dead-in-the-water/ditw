import React, { Component, PropTypes } from 'react'

import PlayerTable from './PlayerTable'
import {SORT_SPECIAL_1, SORT_SPECIAL_2} from '../../homePage/homePage'

import Toggle from 'material-ui/Toggle'

import './PlayerTableApp.scss'

export default class PlayersLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    gameStatus: PropTypes.object.isRequired
  }

  _handleSortOrderToggle () {
    // Work around for this... not getting refreshed by requesting state change
    var newSortOrder = (this.props.gameStatus.defaultSortOrder === SORT_SPECIAL_1) ? SORT_SPECIAL_2 : SORT_SPECIAL_1
    this.props.actions.toggleDefaultSortOrder()
    this.props.actions.sortPlayers(newSortOrder)
  }

  render () {
    return (
      <div className='container text-center'>
        <Toggle label="Sort by nickname" onToggle={() => this._handleSortOrderToggle()} />
        <PlayerTable
          players={this.props.gameStatus.playerRoster}
          actions={this.props.actions}
          rules={this.props.gameStatus.currentRuleSet}
          sortOrder={this.props.gameStatus.defaultSortOrder}
        />
      </div>
    )
  }
}
