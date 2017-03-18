import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as playersActions, selector } from '../players'

import IconButton from 'material-ui/IconButton';
import moveUpIcon from './images/move_up.png'
import moveDownIcon from './images/move_down.png'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
	margin: 12
}

@connect(selector, (dispatch) => ({
	actions: bindActionCreators(playersActions, dispatch)
}))
export default class NewGameView extends Component {

	_handleDoneButton() {
		console.log('Done button clicked')
		this.props.history.push('/NewGameView')
	}

	_handleModifyPlayerListButton() {
		console.log('Modify player list button clicked')
		this.props.history.push('/PlayersView')
	}

	_handleCancelButton() {
		console.log('Cancel button clicked')
		this.props.actions.removeAllPlayersFromGame()
		this.props.history.push('/HomePageView')
	}

	_handleUpButtons(key) {
		console.log('Up button clicked - key = ' + key)
	}

	_handleDownButtons(key) {
		console.log('Down button clicked - key = ' + key)
	}

	renderList () {
		return this.props.players.playersById.filter((player) => 
			 player.inThisGame
		).map((player, i) =>
			(
			<TableRow key={i} className='player-table-row'>
				<TableRowColumn>
					<IconButton onTouchTap={() => this._handleUpButtons(i)}>
						<img src={moveUpIcon} alt='move up icon' />
					</IconButton>
					<IconButton onTouchTap={() => this._handleDownButtons(i)}>
						<img src={moveDownIcon} alt='move down icon' />
					</IconButton>
				</TableRowColumn>
				<TableRowColumn>{player.firstName + ' ' + player.lastName}</TableRowColumn>
				<TableRowColumn>
					1st dealer indicator goes here
				</TableRowColumn>
			</TableRow>
			)
		)
	}

	render () {
		return (
			<div className='container text-center'>
				<Table
					className='newgame-table'
					multiSelectable={false}
					selectable={false}>
					<TableHeader
						className='newgame-table-header'
						displaySelectAll={false}
						adjustForCheckbox={false}>
						<TableRow className='newgame-table-header-row' displayBorder={false}>
							<TableHeaderColumn className='table-super-header'><h1>New Game Setup</h1></TableHeaderColumn>
						</TableRow>
						<TableRow className='newgame-table-header-row'>
							<TableHeaderColumn>Move up/dn</TableHeaderColumn>
							<TableHeaderColumn>Player</TableHeaderColumn>
							<TableHeaderColumn>1st dealer</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody className='newgame-table-body' displayRowCheckbox={false}>
						{this.renderList()}
					</TableBody>
				</Table>
				<RaisedButton
					label='Cancel'
					primary={false}
					style={style}
					onTouchTap={() => this._handleCancelButton()}
				/>
				<RaisedButton
					label={this.props.players.playersById.filter((player) => player.inThisGame).length > 0 ? 'Change players' : 'Add players'}
					secondary
					style={style}
					onTouchTap={() => this.props.history.push('/PlayersView')}
					/>
				<RaisedButton
					label='Play game'
					primary
					style={style}
					onTouchTap={() => alert('Not implemented (yet)')}
					/>
			</div>
		)
	}
}
