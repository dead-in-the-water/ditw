import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';

import './PlayerListItem.scss';

export default class PlayerListItem extends Component {
  static propTypes = {
    deletePlayer: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    avgScore: PropTypes.number,
    avgPosition: PropTypes.number,
    gamesPlayed: PropTypes.number,
    starPlayer: PropTypes.func.isRequired,
    starred: PropTypes.bool
  };

  render() {
    const myBtnStyle = {
      color: 'black',
      width: '48px',
      height: '48px'
    }

    return (
      <ListItem 
        primaryText={this.props.lastName +  ', ' + this.props.firstName}
        leftIcon={
                    <FloatingActionButton iconStyle={myBtnStyle}>
                      <ContentAdd />
                    </FloatingActionButton>
        }
      />
    );
  }
}
