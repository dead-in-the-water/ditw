import React, { Component, PropTypes } from 'react'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { INVALID_NUMERIC_VALUE } from '../../homePage/homePage'

export default class BidWonEditor extends Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    minEntry: PropTypes.number.isRequired,
    maxEntry: PropTypes.number.isRequired,
    defaultEntry: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired,
    playerIdx: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    currentRound: PropTypes.object.isRequired,
    currentRoundIdx: PropTypes.number.isRequired,
    doBidding: PropTypes.bool,
    doScoring: PropTypes.bool
  }

  state = {
    errorText: ''
  }

  handleChange = (event, index, value) => ((this.props.doBidding)
    ? this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.player.id, value)
    : this.props.actions.recordTricksWon(this.props.currentRoundIdx, this.props.player.id, value))

  render () {
    const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? 0 : numericVal)

    const legalEntries = Array(this.props.maxEntry + 1).fill().map((x, i) => i)

    /*
    ** Default value depends on whether we're bidding or scoring.
    **   If bidding, then the value is either 0, if previously uninitialized, else the previously entered bid value.
    **   If scoring, the default is either the previuosly bid value if score is uninitialized, else the previously entered
    **   score value.
    */
    const defVal = ((this.props.doScoring && (this.props.currentRound.results[this.props.playerIdx].tricksWon !== INVALID_NUMERIC_VALUE))
                      ? this.props.currentRound.results[this.props.playerIdx].tricksWon
                      : validOrZero(this.props.currentRound.results[this.props.playerIdx].tricksBid)
                    )

    console.log('------ In BidWonEditor.render')
    console.log('  this.props.doScoring = ' + this.props.doScoring)
    console.log('  this.props.currentRound.results[this.props.playerIdx].tricksWon = ' + this.props.currentRound.results[this.props.playerIdx].tricksWon)
    return (
      <SelectField
          id={this.props.componentId}
          autoFocus={ (this.props.playerIdx === 0)}
          autoWidth={ true }
          errorText={ this.state.errorText }
          value={ defVal }
          onChange={ this.handleChange }
      >
      { legalEntries.map((entry, i) => (
            <MenuItem
              key={i}
              value={ entry }
              primaryText={ entry + ((entry === 1) ? ' trick' : ' tricks') }
            />
        ))
      }
      </SelectField>
    )
  }
}
