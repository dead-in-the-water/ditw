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

	_handleScoreButton() {
		this.props.actions.setPlaying()
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

	render () {

		// Find the index into playerRoster for passed player id
		const playerIndexById = (id) => findIndex(this.props.gameStatus.playerRoster, { 'id': id })

		// Find the index into playerRoster for current dealer
		const theDealerIdx = playerIndexById(this.props.gameStatus.currentDealer)

		// Test if there are valid bids for all players in current round
		const allBidsIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.filter((result) => result.tricksBid === INVALID_NUMERIC_VALUE).length === 0)

		const allScoresIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.filter((result) => result.tricksWon === INVALID_NUMERIC_VALUE).length === 0)

		// Sum all entered bids (for display of over- / under-subscription + option for implementing 'screw the dealer' rule)
		const sumOfBids = () => {
			var bid = 0

			for (var i = 0; i < this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.length; i++) {
				if (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results[i].tricksBid !== INVALID_NUMERIC_VALUE) {
					bid = bid + this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results[i].tricksBid
				}
			}
			return bid
		}

		// Sum of all tricks won in current round (to support display status)
		const sumOfWon = () => {
			var won = 0

			for (var i = 0; i < this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.length; i++) {
				if (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results[i].tricksWon !== INVALID_NUMERIC_VALUE) {
					won = won + this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results[i].tricksWon
				}
			}
			return won
		}

		// Get short handle for the current round object
		const playerRound = (playerRosterIdx) => this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results[playerRosterIdx]

		// Shorthand for dealing with potential INVALID_NUMERIC_VALUE in display
		const validOrDash = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? '-' : numericVal)

		// Calculate score for a given player index -> playerRoster
		const calcScore = (playerIdx) => {
			const rules = this.props.gameStatus.currentRuleSet
			var score = 0

			// Only calculate score to the current round (allows going next/prev round to work w/scores)
			for (var i = 0; i <= this.props.gameStatus.currentRoundIdx; i++) {
				const tricksWon = this.props.gameStatus.gameRounds[i].results[playerIdx].tricksWon
				const tricksBid = this.props.gameStatus.gameRounds[i].results[playerIdx].tricksBid

				if ((tricksBid === INVALID_NUMERIC_VALUE) || (tricksWon === INVALID_NUMERIC_VALUE)) {
					break
				}				
				if (tricksWon === tricksBid) {
					if (rules.contractBonusMultiplicative) {
						score += tricksWon * rules.contractBonus
					} else {
						score += rules.contractBonus
					}
				} 
				score += (tricksWon * rules.trickBonus)
			}
			return score
		}

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
										<td className='game-table-bid-cell'>{ validOrDash(playerRound(i).tricksBid) }</td>
										<td className='game-table-won-cell'>{ validOrDash(playerRound(i).tricksWon) }</td>
										<td className='game-table-score-cell'>{ validOrDash(calcScore(i)) }</td>
									</tr>
								)
							)
						}
						<tr>
							<td colSpan='5'>
								<ChangeCurrentRoundButton
									currentRoundIdx={ this.props.gameStatus.currentRoundIdx }
									relativeChange={ -1 }
									actions={ this.props.actions }
									disabled={ this.props.gameStatus.currentRoundIdx === 0 }
									primary={ false }
									rounds={ this.props.gameStatus.gameRounds }
									players={ this.props.gameStatus.playerRoster }
								/>
								<ChangePlayersButton 
									currentRoundIdx={ this.props.gameStatus.currentRoundIdx }
									biddingComplete={ allBidsIn }
									buttonAction={ () => this._handleModifyPlayerListButton() }
								/>
								<RaisedButton
									label='Bid'
									primary={ !allBidsIn }
									autofocus={ !allBidsIn }
									secondary={ allBidsIn }
									style={ btnMarginStyle }
									onTouchTap={ () => this._handleBidButton() }
								/>
								<RaisedButton
									label='Score'
									primary={ !allScoresIn }
									autofocus={ !allScoresIn }
									secondary={ allScoresIn }
									style={ btnMarginStyle }
									disabled={ !allBidsIn }
									onTouchTap={ () => this._handleScoreButton() }
								/>
								<ChangeCurrentRoundButton
									currentRoundIdx={ this.props.gameStatus.currentRoundIdx }
									relativeChange={ 1 }
									actions={ this.props.actions }
									disabled={ !allScoresIn }
									primary={ allScoresIn }
									rounds={ this.props.gameStatus.gameRounds }
									players={ this.props.gameStatus.playerRoster }
								/>
							</td>
						</tr>
					</tbody>
				</table>
					<div>
						<GameActionDialog
							{ ...this.props.gameStatus }
							biddingComplete={ allBidsIn }
							scoringComplete={ allScoresIn }
							actions={ this.props.actions }
						/>
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
		doBidding: PropTypes.bool,
		doScoring: PropTypes.bool
	}

		// private onKeyDown: React.KeyboardEventHandler;
		// private onChange: NumberInputChangeHandler;
		// private onError: NumberInputErrorHandler;
		// private onValid: NumberInputValidHandler;
		// private onRequestValue: NumberInputReqestValueHandller;

_onBlur = (event: React.FocusEvent): void => {
		const e: EventValue = event
		const playerIdx = e.target.getAttribute('data-item')

		if (this.props.doBidding) {
			this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.players[playerIdx].id, parseInt(e.target.value))
		} else {
			this.props.actions.recordTricksWon(this.props.currentRoundIdx, this.props.players[playerIdx].id, parseInt(e.target.value))
		}
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

		const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? 0 : numericVal)

		return (
			<table className='game-action-table'>
				<thead className='game-action-table-header'>
					<tr className='game-action-table-header-row'>
						<th className='game-action-table-header-cell-left'>Player</th>
						<th className='game-action-table-header-cell'>{ ((this.props.doBidding) ? 'Bidding' : 'Scoring') }</th>
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
											id={'record-' + ((this.props.doBidding) ? 'bid' : 'score') + '-' + this.props.currentRoundIdx + '-' + player.id}
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
											defaultValue={ (this.props.doBidding ?
												validOrZero(this.props.currentRound.results[i].tricksBid) :
												validOrZero(this.props.currentRound.results[i].tricksWon))}
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

class GameActionDialog extends Component {
	static propTypes = {
		gameRounds: PropTypes.array,
		currentRoundIdx: PropTypes.number,
		playing: PropTypes.bool,
		bidding: PropTypes.bool,
		biddingComplete: PropTypes.bool,
		scoringComplete: PropTypes.bool,
		actions: PropTypes.object
	}

	_clearBids() {
			this.props.gameRounds[this.props.currentRoundIdx].results.map((result, i) => {
				this.props.actions.recordTricksBid(this.props.currentRoundIdx, result.id, INVALID_NUMERIC_VALUE)
			})
			this.props.actions.clearBidding()
	}

	_clearScores() {
			this.props.gameRounds[this.props.currentRoundIdx].results.map((result, i) => {
				this.props.actions.recordTricksBid(this.props.currentRoundIdx, result.id, INVALID_NUMERIC_VALUE)
			})
			this.props.actions.clearPlaying()
	}

	render() {

		const dialogActions = [
			<FlatButton
				label="Cancel"
				secondary={ true }
				onTouchTap={ ((this.props.bidding) ?
					() => this._clearBids() :
					() => this._clearScores())
				}
			/>,
			<FlatButton
				label="Submit"
				primary={ true }
				disabled={ ((this.props.bidding) ?
					!this.props.biddingComplete :
					!this.props.scoringComplete)
				}
				onTouchTap={ ((this.props.bidding) ?
					() => this.props.actions.clearBidding() :
					() => this.props.actions.clearPlaying())
				}
			/>
		]

		const okayToOpen = this.props.bidding || this.props.playing

		return (
			<Dialog
				title={ (this.props.bidding ? 'Bidding' : 'Scoring') + ': Round ' + (this.props.currentRoundIdx + 1) }
				actions={ dialogActions }
				modal={ true }
				open={ okayToOpen }
				autoScrollBodyContent={ true }
			>
				<GameActionTable 
					players={this.props.playerRoster} 
					actions={this.props.actions} 
					sortOrder={this.props.defaultSortOrder} 
					currentRoundIdx={this.props.currentRoundIdx}
					currentRound={this.props.gameRounds[this.props.currentRoundIdx]}
					maxBid={this.props.gameRounds[this.props.currentRoundIdx].handsize}
					doBidding={ this.props.bidding }
					doScoring={ this.props.scoring }
				/>
			</Dialog>		
		)
	}
}

class ChangeCurrentRoundButton extends Component {
	static propTypes = {
		currentRoundIdx: PropTypes.number.isRequired,
		relativeChange: PropTypes.number.isRequired,
		disabled: PropTypes.bool.isRequired,
		primary: PropTypes.bool.isRequired,
		actions: PropTypes.object.isRequired,
		rounds: PropTypes.array.isRequired,
		players: PropTypes.array.isRequired
	}

	_handleChangeCurrentRoundButtonClick(chg) {

		console.log('====== In ChangeCurrentRoundButton._handleChangeCurrentRoundButtonClick, chg = \'' + chg + '\'')
		console.log('  dumping this.props just to cover bases')
		console.log(this.props)

		var tgtDealerIdx = this.props.rounds[this.props.currentRoundIdx + chg].dealer
		var tgtBidderIdx = this.props.rounds[this.props.currentRoundIdx + chg].bidder
		console.log('  target dealer idx = \'' + tgtDealerIdx + '\'')
		console.log('  target bidder idx = \'' + tgtBidderIdx + '\'')

		var tgtDealerId = this.props.players[tgtDealerIdx].id
		var tgtBidderId = this.props.players[tgtBidderIdx].id
		console.log('  target dealer id = \'' + tgtDealerId + '\'')
		console.log('  target bidder id = \'' + tgtBidderId + '\'')

		this.props.actions.setDealer(tgtDealerId)
		this.props.actions.setBidder(tgtBidderId)
		this.props.actions.relativeChangeCurrentRoundIdx(this.props.relativeChange)
	}

	render() {
		// Only return objects to be rendered if it's still okay to change player list
		// This takes 2 conditions because I allow player list changes until bidding complete
		// in round 0
		return (
			<RaisedButton
				label={ ((this.props.relativeChange < 0) ? 'Prev' : 'Next') }
				labelPosition={ ((this.props.relativeChange < 0) ? 'after' : 'before') }
				primary={ this.props.primary }
				style={ btnMarginStyle }
				icon={ ((this.props.relativeChange < 0) ? <PrevRoundIcon /> : <NextRoundIcon />) }
				disabled={ this.props.disabled }
				onTouchTap={() => this._handleChangeCurrentRoundButtonClick(this.props.relativeChange) }
				autofocus={ this.props.primary }
			/>
		)
	}
}

class ChangePlayersButton extends Component {
	static propTypes = {
		currentRoundIdx: PropTypes.number.isRequired,
		biddingComplete: PropTypes.bool.isRequired,
		buttonAction: PropTypes.func.isRequired
	}

	render() {
		// Only return objects to be rendered if it's still okay to change player list
		// This takes 2 conditions because I allow player list changes until bidding complete
		// in round 0

		if ((this.props.currentRoundIdx === 0) && (!this.props.biddingComplete)) {
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
