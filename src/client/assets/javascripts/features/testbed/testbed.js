import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import assign from 'lodash/assign'
import RaisedButton from 'material-ui/RaisedButton'

// Types for 'fruit' example
type FruitDesc = {
	id?: Number,
	name: String,
	qty: Number
};

// This is the model of our module fruitState
type FruitState = {
  inventory: Array<FruitDesc>
};

// Action Types
// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const ADD_FRUIT = 'redux-app/players/ADD_PLAYER_TO_GAME'
const REMOVE_FRUIT = 'redux-app/players/REMOVE_PLAYER_FROM_GAME'
const SORT_FRUIT = 'redux-app/players/REMOVE_ALL_PLAYERS_FROM_GAME'

const SORT_BY_ID = 0
const SORT_BY_NAME = 1
const SORT_BY_QTY = 2

// This will be used in our root reducer and selectors

export const NAME = 'inventory';

// Define the initial fruitState for `fruit` 

const initialState: FruitState = {
	inventory: [
		{ id: 10, name: 'Apple', qty: 55 },
		{ id: 11, name: 'Orange',qty: 54 },
		{ id: 12, name: 'Banana', qty: 53 },
		{ id: 13, name: 'Strawberry', qty: 52 },
		{ id: 14, name: 'Red grapes', qty: 51 },
		{ id: 15, name: 'Green grapes',qty: 50 }
	]
}

// Reducer

export default function reducer(fruitState: FruitState = initialState, action: any = {}): FruitState {
	switch (action.type) {
		case ADD_FRUIT:
			return {
				fruitState
			}

		case REMOVE_FRUIT:
			return {
				fruitState
			}

		case SORT_FRUIT:
			return {
				fruitState
			}

		default:
			return { 
				fruitState
		}
	}
}

// Support functions


// Action Creators

function addFruit(id: number) {
	return {
		type: ADD_FRUIT,
		id
	}
}

function removeFruit(id: number) {
	return {
		type: REMOVE_FRUIT,
		id
	}
}

function sortFruit(sortKey: number) {
	return {
		type: SORT_FRUIT,
		sortKey
	}
}

// Selectors

const inventoryStatus = (fruitState) => fruitState[NAME];

export const selector = createStructuredSelector({
	inventoryStatus
})

export const actionCreators = {
	addFruit,
	removeFruit,
	sortFruit
}

const buttonStyle = {
  margin: 12
}


@connect(selector, (dispatch) => ({
  actions: bindActionCreators(playersActions, dispatch)
}))
export class TestBed extends Component {
  _sortButtonClick() {
  }

  _handleRowSelection(rowsSelected) {
  }

  render() {
    return (
      <div className='container text-center'>
	      <Table 
	        className='player-table' 
	        multiSelectable={true}
	        onRowSelection={(rowList) => this._handleRowSelection(rowList)}
	      >
	        <TableHeader 
	          displaySelectAll={false}
	          adjustForCheckbox={false}
	        >
	          <TableRow>
	            <TableHeaderColumn><h1>Fruit</h1></TableHeaderColumn>
	          </TableRow>
	          <TableRow>
	            <TableHeaderColumn>Fruit id</TableHeaderColumn>
	            <TableHeaderColumn>Fruit name</TableHeaderColumn>
	            <TableHeaderColumn>Qty on hand</TableHeaderColumn>
	          </TableRow>
	        </TableHeader>
	        <TableBody deselectOnClickaway={false}>
	          {this.props.inventory.map((fruit) =>
	            <TableRow key={fruit.id}>
	              <TableRowColumn>{fruit.id}</TableRowColumn>
	              <TableRowColumn>{fruit.name}</TableRowColumn>
	              <TableRowColumn>{fruit.qty}</TableRowColumn>
	            </TableRow>
	          )}
	            <TableRow>
		            <TableRowColumn>
		            	<RaisedButton style="buttonStyle" label="By id" primary={true} />
								</TableRowColumn>
		            <TableRowColumn>
		            	<RaisedButton ltyle="buttonStyle" abel="By name" primary={true} />
		            </TableRowColumn>
		            <TableRowColumn>
		            	<RaisedButton tyle="buttonStyle" label="By name" primary={true} />
		            </TableRowColumn>
	            </TableRow>
	        </TableBody>
	      </Table>
      </div>
    );
  }
}
