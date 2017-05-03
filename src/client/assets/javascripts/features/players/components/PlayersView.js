import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import nth from 'lodash/nth'

import RaisedButton from 'material-ui/RaisedButton'

import { actionCreators as gameStateActions, selector as gameStateSelector } from '../../homePage/homePage'

import PlayersLayout from './PlayersLayout'

import './PlayerTableApp.scss'

const doneButtonStyle = {
  margin: 12
}

@connect(gameStateSelector, (dispatch) => ({
  actions: bindActionCreators(gameStateActions, dispatch)
}))
export default class PlayersView extends Component {
  static propTypes = {
    gameStatus: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  _handleDoneButton () {
    this.props.actions.sortPlayers(this.props.gameStatus.defaultSortOrder)

    var activePlayers = this.props.gameStatus.playerRoster.filter((player) => player.inThisGame)

    // First ordinal player is first bidder
    this.props.actions.setBidder(nth(activePlayers, 0).id)

    // Player in last ordinal position is first dealer
    this.props.actions.setDealer(nth(activePlayers, -1).id)
    this.props.actions.initGameData()
    this.props.actions.initCurrentRoundIdx()
    this.props.history.push('/NewGameView')
  }

  render () {
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
            disabled={ this.props.gameStatus.playerRoster.filter((player) => player.inThisGame).length < this.props.gameStatus.currentRuleSet.minPlayers }
          />
        </div>
      </div>
    )
  }
}
