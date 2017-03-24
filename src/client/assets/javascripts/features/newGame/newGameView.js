import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

import { SORT_SPECIAL_1, INVALID_ORDINAL_POSITION } from '../homePage/homePage'
import { actionCreators as gameStateActions, selector as gameStateSelector } from '../homePage/homePage'

import dealerIcon from './images/card_dealer_luigi.png'
import bidderIcon from './images/three_fingers.png'
import './gameTable.scss'

const style = {
	margin: 12
}

@connect(gameStateSelector, (dispatch) => ({
	actions: 
		bindActionCreators(gameStateActions, dispatch),
}))
export default class NewGameView extends Component {

	_handleDoneButton() {
		this.props.history.push('/NewGameView')
	}

	_handleModifyPlayerListButton() {
		this.props.actions.sortPlayers(SORT_SPECIAL_1)
		console.log('====== in _handleCancelButton. About to dump this.props')
		console.log(this.props)
		
/*		this.props.actions.clearDealer()
		this.props.actions.clearBidder()
*/
		this.props.history.push('/PlayersView')
	}

	_handleCancelButton() {
		this.props.actions.removeAllPlayersFromGame()
		this.props.history.push('/HomePageView')
	}

					// {(player.id === this.props.gameStatus.currentDealer ) ? <img src={dealerIcon} height='36px' width='auto'/> : ''}
					// {(player.id === this.props.gameStatus.currentBidder ) ? <img src={bidderIcon} height='36px' width='auto'/> : '' }

	renderList () {
		return this.props.gameStatus.playerRoster.filter((player) => 
			 player.inThisGame
		).map((player, i) =>
			(
			<TableRow key={i} className='gametable-data-row'>
				<TableRowColumn className='gametable-icon-cell'>
					Icons
				</TableRowColumn>
				<TableRowColumn className='gametable-name-cell'>{player.firstName + ' ' + player.lastName}</TableRowColumn>
				<TableRowColumn className='gametable-bid-cell'>0</TableRowColumn>
				<TableRowColumn className='gametable-won-cell'>0</TableRowColumn>
				<TableRowColumn className='gametable-score-cell'>0</TableRowColumn>
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
							<TableHeaderColumn className='gametable-icon-cell'>Role</TableHeaderColumn>
							<TableHeaderColumn className='gametable-name-cell'>Player</TableHeaderColumn>
							<TableHeaderColumn className='gametable-bid-cell'>Tricks bid</TableHeaderColumn>
							<TableHeaderColumn className='gametable-won-cell'>Tricks won</TableHeaderColumn>
							<TableHeaderColumn className='gametable-score-cell'>Score</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody className='newgame-table-body' displayRowCheckbox={false}>
						{ this.props.gameStatus.playerRoster.filter((player) => player.inThisGame).map((player, i) =>
								(
									<TableRow key={i} className='gametable-data-row'>
										<TableRowColumn className='gametable-icon-cell'>
											Icons
										</TableRowColumn>
										<TableRowColumn className='gametable-name-cell'>{player.firstName + ' ' + player.lastName}</TableRowColumn>
										<TableRowColumn className='gametable-bid-cell'>0</TableRowColumn>
										<TableRowColumn className='gametable-won-cell'>0</TableRowColumn>
										<TableRowColumn className='gametable-score-cell'>0</TableRowColumn>
									</TableRow>
								)
							)
						}
					</TableBody>
				</Table>
				<RaisedButton
					label='Cancel'
					primary={false}
					style={style}
					onTouchTap={() => this._handleCancelButton()}
				/>
				<RaisedButton
					label={this.props.gameStatus.playerRoster.filter((player) => player.inThisGame).length > 0 ? 'Change players' : 'Add players'}
					secondary={true}
					style={style}
					onTouchTap={() => this._handleModifyPlayerListButton()}
					/>
				<RaisedButton
					label='Play!'
					primary
					style={style}
					onTouchTap={() => alert('Not implemented (yet)')}
					/>
			</div>
		)
	}
}
