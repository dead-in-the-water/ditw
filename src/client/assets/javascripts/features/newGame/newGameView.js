import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { _head, _words } from 'lodash'
import findIndex from 'lodash/findIndex'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import PrevRoundIcon from 'material-ui/svg-icons/av/fast-rewind'
import NextRoundIcon from 'material-ui/svg-icons/av/fast-forward'
// Trying out NoHomey's material-ui-number-input
import { NumberInput, NumberInputChangeHandler, NumberInputError, EventValue, NumberInputErrorHandler, NumberInputValidHandler, NumberInputReqestValueHandller } from 'material-ui-number-input';

import { SORT_SPECIAL_1, SORT_SPECIAL_2, INVALID_NUMERIC_VALUE } from '../homePage/homePage'
import { actionCreators as gameStateActions, selector as gameStateSelector } from '../homePage/homePage'
import './gameTable.scss'

import dealerIcon from './images/card_dealer_luigi.png'
import bidderIcon from './images/three_fingers.png'

const btnMarginStyle = {
	margin: 12
}

@connect(gameStateSelector, (dispatch) => ({
	actions: 
		bindActionCreators(gameStateActions, dispatch),
}))
export default class NewGameView extends Component {

	_handleBidButton() {
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

	_clearBids() {
			this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results.map((result, i) => {
				this.props.actions.recordTricksBid(this.props.gameStatus.currentRound, result.id, INVALID_NUMERIC_VALUE)
			})
			this.props.actions.clearBidding()
	}

	render () {

		// Find the index into playerRoster for passed player id
		const playerIndexById = (id) => findIndex(this.props.gameStatus.playerRoster, { 'id': id })

		// Find the index into playerRoster for current dealer
		const theDealerIdx = playerIndexById(this.props.gameStatus.currentDealer)

		// Test if there are valid bids for all players in current round
		const allBidsIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results.filter((result) => result.tricksBid === INVALID_NUMERIC_VALUE).length === 0)

		console.log('****** allBidsIn = \'' + allBidsIn + '\'')

		const allScoresIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results.filter((result) => result.tricksWon === INVALID_NUMERIC_VALUE).length === 0)

		// Sum all entered bids (for display of over- / under-subscription + option for implementing 'screw the dealer' rule)
		const sumOfBids = () => {
			var bid = 0

			for (var i = 0; i < this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results.length; i++) {
				if (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results[i].tricksBid !== INVALID_NUMERIC_VALUE) {
					bid = bid + this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results[i].tricksBid
				}
			}
			return bid
		}

		// Sum of all tricks won in current round (to support display status)
		const sumOfWon = () => {
			var won = 0

			for (var i = 0; i < this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results.length; i++) {
				if (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results[i].tricksWon !== INVALID_NUMERIC_VALUE) {
					won = won + this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results[i].tricksWon
				}
			}
			return won
		}

		// Get short handle for the current round object
		const playerRound = (playerRosterIdx) => this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].results[playerRosterIdx]

		// Shorthand for dealing with potential INVALID_NUMERIC_VALUE in display
		const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? '-' : numericVal)

		// Calculate score for a given player id
		const calcScore = (playerRosterIdx) => '???'

		// Buttons for bid & score dialogs
		const dialogActions = [
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={() => this._clearBids()}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				disabled={!allBidsIn}
				onTouchTap={() => this.props.actions.clearBidding()}
			/>
		]


		return (
			<div className='container text-center'>
				<table className='game-table'>
					<thead className='game-table-header'>
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
										<td className='game-table-bid-cell'>{ validOrZero(playerRound(i).tricksBid) }</td>
										<td className='game-table-won-cell'>{ validOrZero(playerRound(i).tricksWon) }</td>
										<td className='game-table-score-cell'>{ calcScore(i) }</td>
									</tr>
								)
							)
						}
						<tr>
							<td colSpan='5'>
								<RaisedButton
									label='Prev'
									primary={false}
									style={btnMarginStyle}
									icon={<PrevRoundIcon />}
									disabled={this.props.gameStatus.currentRound === 0}
								/>
								<ChangePlayersButton
									currentRoundIdx={this.props.gameStatus.currentRoundIdx}
									bidsComplete={allBidsIn}
									buttonAction={ () => this._handleModifyPlayerListButton() }
								/>
								<RaisedButton
									label='Bid'
									primary={!allBidsIn}
									secondary={allBidsIn}
									style={btnMarginStyle}
									onTouchTap={() => this._handleBidButton() }
									/>
								<RaisedButton
									label='Score'
									primary={!allScoresIn}
									secondary={allScoresIn}
									style={btnMarginStyle}
									disabled={!allBidsIn}
									/>
								<RaisedButton
									label='Next'
									labelPosition='before'
									primary={false}
									style={btnMarginStyle}
									disabled={!allScoresIn}
									icon={<NextRoundIcon />}
								/>
							</td>
						</tr>
					</tbody>
				</table>

					<div>
						<Dialog
							title={
								'Round ' + this.props.gameStatus.currentRound + ' bidding: ' +
								((this.props.gameStatus.defaultSortOrder === SORT_SPECIAL_1) ?
									this.props.gameStatus.playerRoster[theDealerIdx].firstName + ' ' + this.props.gameStatus.playerRoster[theDealerIdx].lastName :
									this.props.gameStatus.playerRoster[theDealerIdx].nickName) + ' dealing ' +
									this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].handsize + ' cards'
							}
							actions={dialogActions}
							modal={true}
							open={this.props.gameStatus.bidding}
							autoScrollBodyContent={true}
						>
							<GameActionTable 
								players={this.props.gameStatus.playerRoster} 
								actions={this.props.actions} 
								sortOrder={this.props.gameStatus.defaultSortOrder} 
								currentRoundIdx={this.props.gameStatus.currentRound}
								currentRound={this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound]}
								maxBid={this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].handsize}
								verb='Bid'
							/>
							<span>
								{ 
									((this.props.gameStatus.bidding) ? sumOfBids() : sumOfWon()) + '/' + 
									this.props.gameStatus.gameRounds[this.props.gameStatus.currentRound].handsize + ' tricks accounted for'
								}
							</span>
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
		currentRoundIdx: PropTypes.number.isRequired,
		currentRound: PropTypes.object.isRequired,
		maxBid: PropTypes.number.isRequired,
		verb: PropTypes.string.isRequired
	}

		// private onKeyDown: React.KeyboardEventHandler;
		// private onChange: NumberInputChangeHandler;
		// private onError: NumberInputErrorHandler;
		// private onValid: NumberInputValidHandler;
		// private onRequestValue: NumberInputReqestValueHandller;

_onBlur = (event: React.FocusEvent): void => {
		const e: EventValue = event
		const playerIdx = e.target.getAttribute('data-item')

		this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.players[playerIdx].id, parseInt(e.target.value))
	}

	_onKeyDown = (event: React.KeyboardEvent): void => {
		const e: EventValue = event
		console.debug(`onKeyDown ${event.key}`)
	}

	_onChange = (event: React.FormEvent, value: string): void => {
		const e: EventValue = event
		console.debug(`  onChange ${e.target.value}, ${value}`)	

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
			console.debug('In GameActionTable._onError. Error msg = \'' + errorText + '\'')
	}

	_onValid = (value: number): void => {
			console.debug(`${value} is a valid number!`)
	}

	_onRequestValue = (value: string): void => {
			console.debug(`request ${JSON.stringify(value)}`)
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
																												((this.props.sortOrder === SORT_SPECIAL_1)
																													? player.firstName + ' ' + player.lastName
																													: player.nickName)
																											}
								</td>
								<td className='game-action-table-bid-cell'>
									<NumberInput
											id={'record-' + this.props.verb + '-' + i}
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
											defaultValue={
												((this.props.currentRound.results[i].tricksBid !== INVALID_NUMERIC_VALUE) ?
													this.props.currentRound.results[i].tricksBid : 0) }
											data-item={i}
											onBlur={this._onBlur}
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

class ChangePlayersButton extends Component {
	// static propTypes = {
	// 	currentRoundIdx: PropTypes.number.isRequired,
	// 	bidsComplete: PropTypes.boolean.isRequired,
	// 	buttonAction: PropTypes.func.isRequired
	// }

	render() {
		// Only return objects to be rendered if it's still okay to change player list
		// This takes 2 conditions because I allow player list changes until bidding complete
		// in round 0
		if ((this.props.currentRoundIdx === 0) && (!this.props.bidsComplete)) {
			return (
				<RaisedButton
					label='Players'
					secondary={true}
					style={btnMarginStyle}
					disabled={false}
					onTouchTap={() => this.props.buttonAction() }
				/>
			)
		} else {
			return null
		}
	}
}
