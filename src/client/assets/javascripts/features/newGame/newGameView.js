import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { _head, _words } from 'lodash'

import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { SORT_SPECIAL_1, SORT_SPECIAL_2, INVALID_NUMERIC_VALUE } from '../homePage/homePage'
import { actionCreators as gameStateActions, selector as gameStateSelector } from '../homePage/homePage'
import './gameTable.scss'

import dealerIcon from './images/card_dealer_luigi.png'
import bidderIcon from './images/three_fingers.png'

const style = {
	margin: 12
}

@connect(gameStateSelector, (dispatch) => ({
	actions: 
		bindActionCreators(gameStateActions, dispatch),
}))
export default class NewGameView extends Component {

	_handleDoneButton() {
		this.props.actions.setBidding()
	}

	_handleModifyPlayerListButton() {
		// Make sure the players are in correct order
		this.props.actions.sortPlayers(this.props.gameStatus.defaultSortOrder)
		
		// Clear the dealer & bidder
		this.props.actions.clearDealer()
		this.props.actions.clearBidder()

		// And head over to the add players view
		this.props.history.push('/PlayersView')
	}

	_handleCancelButton() {
		this.props.actions.removeAllPlayersFromGame()
		this.props.history.push('/HomePageView')
	}

	_handleClose() {
		this.props.actions.clearBidding()
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

		const dialogActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.props.actions.clearBidding}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				disabled={true}
				onTouchTap={this.props.actions.clearBidding}
			/>
		]

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
										<td className='game-table-name-cell'>
											{ (this.props.gameStatus.defaultSortOrder == SORT_SPECIAL_1) ?
														player.firstName + ' ' + player.lastName :
														player.nickName
											}
										</td>
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
					<div>
						<Dialog
							title="Bid Entry"
							actions={dialogActions}
							modal={true}
							open={this.props.gameStatus.bidding}
							autoScrollBodyContent={true}
						>
							<GameActionTable 
								players={this.props.gameStatus.playerRoster} 
								actions={this.props.actions} 
								sortOrder={this.props.gameStatus.defaultSortOrder} 
								currentRound={this.props.gameStatus.currentRound}
								maxBid={this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].handsize}
							/>
						</Dialog>
					</div>
			</div>
		)
	}
}




class GameActionTable extends Component {

	static propTypes = {
		players: PropTypes.array.isRequired,
		actions: PropTypes.object.isRequired,
		sortOrder: PropTypes.number.isRequired,
		currentRound: PropTypes.number.isRequired,
		maxBid: PropTypes.number.isRequired
	}


	_handleBidChange = (event) => {
		console.log('@@@@@@ Entered GameActionTable._handleBidChange')
		console.log('  event.target.value = \'' + event.target.value + '\'')
	}

	_handleBlur = (event) => {
		const nv = event.target.value
		const idx = event.target.getAttribute('data-item')

		console.log('****** Entered GameActionTable._handleBlur')
		console.log('  player index = \'' + idx + '\'')
		console.log('  player: ' + this.props.players[idx].id + ' ' + 
			this.props.players[idx].firstName + ' ' + 
			this.props.players[idx].lastName)
		console.log('  value = \'' + nv + '\'')	
	}

	render() {

		const phaseName = () => _.head(_.words(this.props.title))
		
		return (
			<table className='game-action-table'>
				<thead className='game-action-table-header'>
					<tr className='game-action-table-header-row'>
						<th className='game-action-table-header-cell-left'>Player</th>
						<th className='game-action-table-header-cell'>Bid</th>
					</tr>
				</thead>
				<tbody className='game-action-table-body'>
					{ this.props.players.map((player, i) =>
							(
	<tr key={i} className='game-action-table-data-row'>
		<td className='game-action-table-name-cell'>{
																						(this.props.sortOrder === SORT_SPECIAL_1)
																							? player.firstName + ' ' + player.lastName
																							: player.nickName
																					}
		</td>
		<td className='game-action-table-bid-cell'>
     <TextField
				hintText={phaseName() + ': 0 - ' + this.props.maxBid + ' tricks'}
				onChange={this._handleBidChange}
				onBlur={this._handleBlur}
				autoFocus={ (i === 0) ? true : false}
				data-item={i} 
			/>
		</td>
	</tr>
							)
						)
					}
				</tbody>
			</table>
		)
	}
}




