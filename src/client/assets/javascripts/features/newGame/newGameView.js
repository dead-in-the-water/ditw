import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// firebase
import {
  firebaseConnect,
  dataToJS,
  pathToJS
} from 'react-redux-firebase'

// import { _head, _words } from 'lodash'
// import findIndex from 'lodash/findIndex'

import RaisedButton from 'material-ui/RaisedButton'

// Reducer hook-ups
import { actionCreators as gameStateActions, selector as gameStateSelector, SORT_SPECIAL_1, INVALID_NUMERIC_VALUE } from '../homePage/homePage'

// Components
import ChangePlayersButton from './components/ChangePlayersButton'
import ChangeCurrentRoundButton from './components/ChangeCurrentRoundButton'
import GameActionDialog from './components/GameActionDialog'

// Shared 'well-known' constants
// import { SORT_SPECIAL_1, INVALID_NUMERIC_VALUE } from '../homePage/homePage'

// Styles
import './gameTable.scss'

import dealerIcon from './images/card_dealer_luigi.png'
import bidderIcon from './images/three_fingers.png'

export const btnMarginStyle = {
  margin: 12
}

@connect(
({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  }))
@connect(gameStateSelector, (dispatch) => ({
  actions:
    bindActionCreators(gameStateActions, dispatch)
}))
@firebaseConnect(
  ({ auth, gameStatus }) => ([
    {
      path: '/players',
      queryParams: ['orderByChild=firstName', `equalTo=${gameStatus.bidding ? 'Marc' : ''}`]
    }
  ])
)
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    players: dataToJS(firebase, '/players'),
    clubs: dataToJS(firebase, '/clubs')
  })
)
export default class NewGameView extends Component {
  static propTypes = {
    gameStatus: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  _handleBidButton () {
    // Short handle to reduce typing
    const gs = this.props.gameStatus

    gs.playerRoster.filter((player) => player.inThisGame).map((player, i) => {
      if (gs.gameRounds[gs.currentRoundIdx].results[i].tricksBid === INVALID_NUMERIC_VALUE) {
        this.props.actions.recordTricksBid(gs.currentRoundIdx, player.id, 0)
      }
    })
    this.props.actions.setBidding()
  }

  _handleScoreButton () {
    const gs = this.props.gameStatus

    gs.playerRoster.filter((player) => player.inThisGame).map((player, i) => {
      if (gs.gameRounds[gs.currentRoundIdx].results[i].tricksWon === INVALID_NUMERIC_VALUE) {
        this.props.actions.recordTricksWon(gs.currentRoundIdx, player.id, gs.gameRounds[gs.currentRoundIdx].results[i].tricksBid)
      }
    })
    this.props.actions.setScoring()
  }

  _handleModifyPlayerListButton () {
    // Make sure the players are in correct order
    this.props.actions.sortPlayers(this.props.gameStatus.defaultSortOrder)

    // Clear the dealer & bidder
    this.props.actions.clearDealer()
    this.props.actions.clearBidder()

    // And head over to the add players view
    this.props.history.push('/PlayersView')
  }

// TODO: Removing players from game doesn't clear out scores & bids or re-init gameRounds
  _handleCancelButton () {
    this.props.actions.removeAllPlayersFromGame()
    this.props.history.push('/HomePageView')
  }

  render () {
    // Find the index into playerRoster for passed player id
    // const playerIndexById = (id) => findIndex(this.props.gameStatus.playerRoster, { 'id': id })

    // Test if there are valid bids for all players in current round
    const allBidsIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.filter((result) => result.tricksBid === INVALID_NUMERIC_VALUE).length === 0)

    const allScoresIn = (this.props.gameStatus.gameRounds[this.props.gameStatus.currentRoundIdx].results.filter((result) => result.tricksWon === INVALID_NUMERIC_VALUE).length === 0)

    // Get short handle for gameStatus
    const gs = this.props.gameStatus

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

    return (
      <div className='container text-center'>
        <table className='game-table'>
          <caption className='game-table-caption'>Round { gs.currentRoundIdx + 1 } of { gs.gameRounds.length }: { gs.gameRounds[gs.currentRoundIdx].handsize } tricks</caption>
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
                      {(player.id === this.props.gameStatus.currentDealer) ? <img src={dealerIcon} height='36px' width='auto'/> : ''}
                      {(player.id === this.props.gameStatus.currentBidder) ? <img src={bidderIcon} height='36px' width='auto'/> : '' }
                    </td>
                    <td className='game-table-name-cell'>
                      { (this.props.gameStatus.defaultSortOrder === SORT_SPECIAL_1)
                            ? player.firstName + ' ' + player.lastName
                            : player.nickName
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
                  autoFocus={ !allBidsIn }
                  secondary={ allBidsIn }
                  style={ btnMarginStyle }
                  onTouchTap={ () => this._handleBidButton() }
                />
                <RaisedButton
                  label='Score'
                  primary={ !allScoresIn }
                  autoFocus={ !allScoresIn }
                  secondary={ allScoresIn }
                  style={ btnMarginStyle }
                  disabled={ !allBidsIn }
                  onTouchTap={ () => this._handleScoreButton() }
                />
                <ChangeCurrentRoundButton
                  currentRoundIdx={ this.props.gameStatus.currentRoundIdx }
                  relativeChange={ 1 }
                  actions={ this.props.actions }
                  disabled={ !allScoresIn || (this.props.gameStatus.currentRoundIdx >= this.props.gameStatus.gameRounds.length) }
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
