import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12
}

export default class NewGameView extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>This is where game setup starts</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <RaisedButton
          label='Cancel'
          primary={false}
          style={style}
          onTouchTap={() => this.props.history.push('/HomePageView')}
        />
        <RaisedButton
          label='Add players'
          secondary
          style={style}
          onTouchTap={() => this.props.history.push('/PlayersView')}
          />
        <RaisedButton
          label='Done'
          primary
          style={style}
          onTouchTap={() => this.props.history.push('/HomePageView')}
          />
      </div>
    )
  }
}
