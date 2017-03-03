import React, { Component, PropTypes } from 'react';

import './AddPlayerInput.scss';

export default class AddPlayerInput extends Component {
  static propTypes = {
    addPlayer: PropTypes.func.isRequired,
    name: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      name: this.props.name || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    const name = e.target.value.trim();
    if (e.which === 13) {
      this.props.addPlayer(name);
      this.setState({ name: '' });
    }
  }

  render() {
    return (
      <input
        type="text"
        autoFocus="true"
        className="form-control addPlayerInput"
        placeholder="Type the name of a player"
        value={this.state.name}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    );
  }
}
