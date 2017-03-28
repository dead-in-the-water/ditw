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
		this.props.actions.initGameData()
		alert('Not fully implemented (yet)')
	}

	_handleModifyPlayerListButton() {
		this.props.actions.sortPlayers(SORT_SPECIAL_1)
		
		this.props.actions.clearDealer()
		this.props.actions.clearBidder()

		this.props.history.push('/PlayersView')
	}

	_handleCancelButton() {
		this.props.actions.removeAllPlayersFromGame()
		this.props.history.push('/HomePageView')
	}

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
				<table className='game-table'>
					<thead className='game-table-header'>
						<tr className='game-table-super-header-row'>
							<th className='game-table-super-header-cell'>
								<h1>New Game Setup</h1>
							</th>
						</tr>
						<tr className='game-table-header-row'>
							<th className='text-center'>Role</th>
							<th className='game-table-header-cell-left'>Player</th>
							<th className='game-table-header-cell'>Bid</th>
							<th className='game-table-header-cell'>Won</th>
							<th className='game-table-header-cell'>Score</th>
						</tr>
					</thead>
					<tbody className='game-table-body'>
						{ this.props.gameStatus.playerRoster.filter((player) => player.inThisGame).map((player, i) =>
								(
									<tr key={i} data-item={i} className='game-table-data-row'>
										<td className='game-table-icon-cell'>
											{(player.id === this.props.gameStatus.currentDealer ) ? <img src={dealerIcon} height='36px' width='auto'/> : ''}
											{(player.id === this.props.gameStatus.currentBidder ) ? <img src={bidderIcon} height='36px' width='auto'/> : '' }
										</td>
										<td className='game-table-name-cell'>{player.firstName + ' ' + player.lastName}</td>
										<td className='game-table-bid-cell'>0</td>
										<td className='game-table-won-cell'>0</td>
										<td className='game-table-score-cell'>0</td>
									</tr>
								)
							)
						}
					</tbody>
				</table>

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
					label='Start Game'
					primary
					style={style}
					onTouchTap={() => this._handleDoneButton() }
					/>
			</div>
		)
	}
}
