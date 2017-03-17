import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import { actionCreators as playersActions, selector } from '../'
import PlayersLayout from './PlayersLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(playersActions, dispatch)
}))
export default class PlayersView extends Component {
  _handleDoneButton() {
    console.log('Done button clicked')
    this.props.history.push('/NewGameView')
  }

  _handleCancelButton() {
    console.log('Done button clicked')
    this.props.actions.removeAllPlayersFromGame()
    this.props.history.push('/NewGameView')
  }

  // TODO: Cancel needs to clear all inThisGame flags
  render() {
    return (
      <div className='players-view'>
        <PlayersLayout {...this.props} />
        <RaisedButton 
          label="Cancel" 
          secondary={true} 
          onTouchTap={() => this._handleCancelButton()}
        />
        <RaisedButton 
          label="Done" 
          primary={true} 
          onTouchTap={() => this._handleDoneButton()}
        />
      </div>
    );
  }
}

