import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import GameActionTable from './GameActionTable'

export default class GameActionDialog extends Component {
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
