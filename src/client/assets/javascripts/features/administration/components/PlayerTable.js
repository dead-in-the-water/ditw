import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

export default class PlayersTabView extends Component {
  render () {
    return (
      <Table onRowSelection={this.props.rowSelectionHandler}>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>First name</TableHeaderColumn>
            <TableHeaderColumn>Last name</TableHeaderColumn>
            <TableHeaderColumn>Nickname</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          delectOnClickaway={false}
        >
          <TableRow>
            <TableRowColumn>-KhVrsiz8rq-xwQHlsj2</TableRowColumn>
            <TableRowColumn>Beth</TableRowColumn>
            <TableRowColumn>Elster</TableRowColumn>
            <TableRowColumn>Beth</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>-KhVrtkinTOKpxx3SqsQ</TableRowColumn>
            <TableRowColumn>Daniel</TableRowColumn>
            <TableRowColumn>Leavitt</TableRowColumn>
            <TableRowColumn>Dan</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>-KhVrunQXNOoW78kKZuv</TableRowColumn>
            <TableRowColumn>Benjamin</TableRowColumn>
            <TableRowColumn>Clements</TableRowColumn>
            <TableRowColumn>Ben</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>-KhVrvvtit7Zhn3u07U8</TableRowColumn>
            <TableRowColumn>Andrew</TableRowColumn>
            <TableRowColumn>Elster</TableRowColumn>
            <TableRowColumn>Andy</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
