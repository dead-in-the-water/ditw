import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { _head, _words } from 'lodash'

import Dialog from 'material-ui/Dialog'
// import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

// Trying out NoHomey's material-ui-number-input
import { NumberInput, NumberInputChangeHandler, NumberInputError, EventValue, NumberInputErrorHandler, NumberInputValidHandler, NumberInputReqestValueHandller } from 'material-ui-number-input';

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
								verb='Bid'
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
		maxBid: PropTypes.number.isRequired,
		verb: PropTypes.string.isRequired
	}

		// private onKeyDown: React.KeyboardEventHandler;
		// private onChange: NumberInputChangeHandler;
		// private onError: NumberInputErrorHandler;
		// private onValid: NumberInputValidHandler;
		// private onRequestValue: NumberInputReqestValueHandller;

	_onKeyDown = (event: React.KeyboardEvent): void => {
			console.log(`onKeyDown ${event.key}`)
	}

	_onChange = (event: React.FormEvent, value: string): void => {
			console.log(' >>>>>> In GameActionTable._onChange')

			const e: EventValue = event
			console.log(`onChange ${e.target.value}, ${value}`)

			console.log('\n  about to decode the bid')
			
			const playerIdx = e.target.getAttribute('data-item')

			console.log('    player index = ' + playerIdx)
			console.log('    player is id: ' + this.props.players[playerIdx].id + ' - ' + this.props.players[playerIdx].firstName)
			console.log('    round = ' + this.props.currentRound)
	}

	_onError = (error: NumberInputError): void => {
			let errorText: string;
			switch(error) {
					case 'required':
							errorText = 'This field is required'
							break
					case 'invalidSymbol':
							errorText = 'You are tring to enter non-numeric symbol'
							break
					case 'incompleteNumber':
							errorText = 'Number is incomplete'
							break
					case 'singleMinus':
							errorText = 'Bids must be positive'
							break
					case 'singleFloatingPoint':
							errorText = 'There is already a floating point'
							break
					case 'singleZero':
							errorText = 'Floating point is expected'
							break
					case 'min':
							errorText = 'You are tring to enter number less than 0'
							break
					case 'max':
							errorText = 'You are tring to enter number greater than ' + this.props.maxBid
							break
			}
	}

	_onValid = (value: number): void => {
			console.debug(`${value} is a valid number!`)
	}

	_onRequestValue = (value: string): void => {
			console.log(`request ${JSON.stringify(value)}`)
	}


	render() {
		
		const myErrorText = ""

		return (
			<table className='game-action-table'>
				<thead className='game-action-table-header'>
					<tr className='game-action-table-header-row'>
						<th className='game-action-table-header-cell-left'>Player</th>
						<th className='game-action-table-header-cell'>{this.props.verb}</th>
					</tr>
				</thead>
				<tbody className='game-action-table-body'>
					{ this.props.players.filter((player) => player.inThisGame).map((player, i) =>
							(
							<tr key={i} className='game-action-table-data-row'>
								<td className='game-action-table-name-cell'>{
																												(this.props.sortOrder === SORT_SPECIAL_1)
																													? player.firstName + ' ' + player.lastName
																													: player.nickName
																											}
								</td>
								<td className='game-action-table-bid-cell'>
									<NumberInput
											id="bid"
											required
											min={0}
											max={this.props.maxBid}
											strategy="warn"
											errorText={myErrorText}
											onError={this._onError}
											onValid={this._onValid}
											onRequestValue={this._onRequestValue}
											onChange={this._onChange}
											onKeyDown={this._onKeyDown} 
											autoFocus={ (i === 0) ? true : false}
											hintText={'0 - ' + this.props.maxBid + ' tricks'}
											defaultValue={0}
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




