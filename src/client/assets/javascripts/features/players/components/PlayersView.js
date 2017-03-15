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
  render() {
    return (
      <div>
        <PlayersLayout {...this.props} />
				<RaisedButton 
					label="Cancel" 
					secondary={true} 
					onTouchTap={() => this.props.history.push('/NewGameView')}
				/>
				<RaisedButton 
					label="Done" 
					primary={true} 
					onTouchTap={() => this.props.history.push('/NewGameView')}
				/>
      </div>
    );
  }
}

