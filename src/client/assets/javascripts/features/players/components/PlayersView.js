import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as playersActions, selector } from '../';
import PlayersLayout from './PlayersLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(playersActions, dispatch)
}))
export default class PlayersView extends Component {
  render() {
    return (
      <div>
        <PlayersLayout {...this.props} />
      </div>
    );
  }
}
