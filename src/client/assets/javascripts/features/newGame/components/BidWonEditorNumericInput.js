import React, { Component, PropTypes } from 'react'

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

  constructor (props: void) {
    super(props)

    this.state = {
      value: { INVALID_NUMERIC_VALUE },
      errorText: ''
    }
  }

  _onBlur = (event: React.FocusEvent): void => {
    const e: EventValue = event

    if (this.props.doBidding) {
      this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.player.id, parseInt(e.target.value))
    } else {
      this.props.actions.recordTricksWon(this.props.currentRoundIdx, this.props.player.id, parseInt(e.target.value))
    }
  }

  _onKeyDown = (event: React.KeyboardEvent): void => {
    console.debug(`onKeyDown ${event.key}`)
  }

  _onChange = (event: React.FormEvent, value: string): void => {
    const e: EventValue = event
    console.debug(`  onChange ${e.target.value}, ${value}`)
  }

  _onValid = (value: number): void => {
    console.debug(`${value} is a valid number!`)
  }

  _onRequestValue = (value: string): void => {
    console.debug(`request ${JSON.stringify(value)}`)
  }

  _onError = (error: NumberInputError): void => {
    let errorText: string
    switch (error) {
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
        errorText = 'You are tring to enter number greater than ' + this.props.maxEntry
        break
    }
    console.debug('In GameActionTable._onError. Error msg = \'' + errorText + '\'')
    this.setState({ errorText: errorText })
  }

  render () {
    const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? 0 : numericVal)

    return (
      <NumberInput
          id={this.props.componentId}
          required
          min={this.props.minEntry}
          max={this.props.maxEntry}
          strategy="warn"
          autoFocus={ (this.props.playerIdx === 0)}
          hintText={'0 - ' + this.props.maxBid + ' tricks'}
          errorText={this.state.errorText}
          defaultValue={ (this.props.doBidding
            ? validOrZero(this.props.currentRound.results[this.props.playerIdx].tricksBid)
            : validOrZero(this.props.currentRound.results[this.props.playerIdx].tricksBid))}
          data-item={ this.props.playerIdx }
          onBlur={ this._onBlur }
          onError={ this._onError }
        />
    )
  }
}
