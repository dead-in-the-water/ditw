import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { _nth, _sortBy } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

import { actionCreators as gameStateActions, selector as gameStateSelector} from '../../homePage/homePage'
import { SORT_BY_ID, SORT_BY_ORDINAL, SORT_BY_NAME, SORT_SPECIAL_1 } from '../../homePage/homePage'

import PlayersLayout from './PlayersLayout';

import './PlayerTableApp.scss'

const doneButtonStyle = {
  margin: 12
}

@connect(gameStateSelector, (dispatch) => ({
  actions: bindActionCreators(gameStateActions, dispatch)
}))
export default class PlayersView extends Component {
  _handleDoneButton() {
    this.props.actions.sortPlayers(SORT_SPECIAL_1)

    // Work-around for the async execution of previous call
    // var activePlayers = _.sortBy(_.slice(this.props.players.playerRoster).filter((player) => (player.inThisGame)), [function(player) { return player.ordinalPosition }])

    // First ordinal player is first bidder
    // this.props.actions.setBidder(_.nth(activePlayers, 0).id)

    // Player in last ordinal position is first dealer
    // this.props.actions.setDealer(_.nth(activePlayers, -1).id)

    this.props.history.push('/NewGameView')
  }

  // TODO: Cancel needs to clear all inThisGame flags
  render() {
    return (
      <div className='container'>
        <PlayersLayout {...this.props} />
        <div className='player-page-top-div'>
          <RaisedButton 
            style={doneButtonStyle}
            className='done-button'
            label="Done" 
            primary={true} 
            onTouchTap={() => this._handleDoneButton()}
          />
        </div>
      </div>
    );
  }
}

