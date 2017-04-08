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
		errorText: ""
	}

	handleChange = (event, index, value) => ((this.props.doBidding) ? 
		this.props.actions.recordTricksBid(this.props.currentRoundIdx, this.props.player.id, value) :
		this.props.actions.recordTricksWon(this.props.currentRoundIdx, this.props.player.id, value))

	render() {

		const validOrZero = (numericVal) => ((numericVal === INVALID_NUMERIC_VALUE) ? 0 : numericVal)

		const legalEntries = Array(this.props.maxEntry + 1).fill().map((x, i) => i)

		return (
			<SelectField
					id={this.props.componentId}
					autoFocus={ (this.props.playerIdx === 0) ? true : false}
					autoWidth={ true }
					errorText={ this.state.errorText }
					value={ this.props.currentRound.results[this.props.playerIdx].tricksBid }
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

			// {
			// 	legalEntries.map((entry, i) => (
			// 			<MenuItem 
			// 				key={ i }
			// 				value={ i } 
			// 				primaryText={entry + ' trick' + ((entry === 1) ? '' : 's')}
			// 			/>
			// 		))
			// }

