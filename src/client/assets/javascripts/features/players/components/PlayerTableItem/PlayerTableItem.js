import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'

import './PlayerTableItem.scss'

export default class PlayerTableItem extends Component {
  static propTypes = {
		id: PropTypes.number.isRequired,
		lastName: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		avgScore: PropTypes.number,
		avgPosition: PropTypes.number,
		gamesPlayed: PropTypes.number,
		inThisGame: PropTypes.bool
  };

  render() {

		return (
			<TableRow>
				<TableRowColumn>{this.props.firstName + ' ' + this.props.lastName}</TableRowColumn>
				<TableRowColumn>{this.props.avgScore}</TableRowColumn>
				<TableRowColumn>{this.props.gamesPlayed}</TableRowColumn>
			</TableRow>
		)
  }
}
