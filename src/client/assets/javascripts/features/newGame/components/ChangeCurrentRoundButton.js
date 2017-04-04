import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { btnMarginStyle } from '../newGameView'
import PrevRoundIcon from 'material-ui/svg-icons/av/fast-rewind'
import NextRoundIcon from 'material-ui/svg-icons/av/fast-forward'

export default class ChangeCurrentRoundButton extends Component {
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

		var tgtDealerIdx = this.props.rounds[this.props.currentRoundIdx + chg].dealer
		var tgtBidderIdx = this.props.rounds[this.props.currentRoundIdx + chg].bidder
		var tgtDealerId = this.props.players[tgtDealerIdx].id
		var tgtBidderId = this.props.players[tgtBidderIdx].id

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
				autoFocus={ this.props.primary }
			/>
		)
	}
}

