import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import GameActionTable from './GameActionTable'

import INVALID_NUMERIC_VALUE from '../../homePage/homePage'

export default class GameActionDialog extends Component {
  static propTypes = {
    gameRounds: PropTypes.array,
    currentRoundIdx: PropTypes.number,
    scoring: PropTypes.bool,
    bidding: PropTypes.bool,
    biddingComplete: PropTypes.bool,
    scoringComplete: PropTypes.bool,
    actions: PropTypes.object
  }

  _clearBids () {
    this.props.gameRounds[this.props.currentRoundIdx].results.map((result, i) => {
      this.props.actions.recordTricksBid(this.props.currentRoundIdx, result.id, INVALID_NUMERIC_VALUE)
    })
    this.props.actions.clearBidding()
  }

  _clearScores () {
    this.props.gameRounds[this.props.currentRoundIdx].results.map((result, i) => {
      this.props.actions.recordTricksWon(this.props.currentRoundIdx, result.id, INVALID_NUMERIC_VALUE)
    })
    this.props.actions.clearScoring()
  }

  render () {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={ true }
        onTouchTap={ ((this.props.bidding)
          ? () => this._clearBids()
          : () => this._clearScores())
        }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        disabled={ ((this.props.bidding)
          ? !this.props.biddingComplete
          : !this.props.scoringComplete)
        }
        onTouchTap={ ((this.props.bidding)
          ? () => this.props.actions.clearBidding()
          : () => this.props.actions.clearScoring())
        }
      />
    ]

    const okayToOpen = this.props.bidding || this.props.scoring

    // Sum all entered bids (for display of over- / under-subscription + option for implementing 'screw the dealer' rule)
    const sumOfBids = () => {
      var bid = 0

      for (var i = 0; i < this.props.gameRounds[this.props.currentRoundIdx].results.length; i++) {
        if (this.props.gameRounds[this.props.currentRoundIdx].results[i].tricksBid !== INVALID_NUMERIC_VALUE) {
          bid = bid + this.props.gameRounds[this.props.currentRoundIdx].results[i].tricksBid
        }
      }
      return bid
    }

    // Sum of all tricks won in current round (to support display status)
    const sumOfWon = () => {
      var won = 0

      for (var i = 0; i < this.props.gameRounds[this.props.currentRoundIdx].results.length; i++) {
        if (this.props.gameRounds[this.props.currentRoundIdx].results[i].tricksWon !== INVALID_NUMERIC_VALUE) {
          won = won + this.props.gameRounds[this.props.currentRoundIdx].results[i].tricksWon
        }
      }
      return won
    }

    return (
      <Dialog
        title={ (this.props.bidding ? 'Bidding' : 'Scoring') + ' round ' +
          (this.props.currentRoundIdx + 1) + ': ' +
          ((this.props.bidding) ? sumOfBids() : sumOfWon()) + ' of ' +
          this.props.gameRounds[this.props.currentRoundIdx].handsize +
          ' tricks accounted for'
        }
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
