import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import PlayerTable from './PlayerTable'

const style = {
  margin: 12
}

export default class PlayersTabView extends Component {
  handleRowSelection = (selectedRows) => {
    console.log('handleRowSelection called')
    console.log('..selectedRows has ' + selectedRows.length + ' entries')
    console.log('..the first of which is ' + selectedRows[0])
  }

  render () {
    return (
      <div>
        <PlayerTable rowSelectionHandler={this.handleRowSelection} />
        <TextField hintText='first name' /><br />
        <TextField hintText='last name' /><br />
        <TextField hintText='nickname' /><br />
        <RaisedButton
          label='Cancel'
          style={style}
          secondary
        />
        <RaisedButton
          label='Submit'
          style={style}
          primary
        />
      </div>
    )
  }
}
