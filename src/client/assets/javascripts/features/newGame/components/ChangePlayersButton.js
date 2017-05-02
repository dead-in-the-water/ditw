import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { btnMarginStyle } from '../newGameView'

export default class ChangePlayersButton extends Component {
  static propTypes = {
    currentRoundIdx: PropTypes.number.isRequired,
    biddingComplete: PropTypes.bool.isRequired,
    buttonAction: PropTypes.func.isRequired
  }

  render () {
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
