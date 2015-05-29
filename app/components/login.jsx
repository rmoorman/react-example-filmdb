'use strict';

import React from 'react';
import {Input, Button, Alert} from 'react-bootstrap';
import {changeHandler} from 'utils/component-utils';

import connectToStores from 'alt/utils/connectToStores';
import {defer} from 'lodash';

@connectToStores
@changeHandler
export default class FilmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {}
    };
    this.actions = props.flux.getActions('login');
    this.store = props.flux.getStore('login');
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    error: React.PropTypes.string
  }
  static router = null
  static getStores(props) {
    return [props.flux.getStore('login')];
  }
  static getPropsFromStores(props) {
    const state = props.flux.getStore('login').getState();
    if (state.user) {
      defer(FilmProfile.router.transitionTo.bind(this, 'directors'));
    }
    return state;
  }
  componentDidMount() {
    FilmProfile.router = this.context.router;
    this.state = {
      login: {}
    };
  }
  register() {
    this.actions.register(this.state.login);
  }
  login() {
    this.actions.login(this.state.login);
  }
  render() {
    var error;
    if (this.props.error) {
      error = <Alert bsStyle="danger">{this.props.error}</Alert>;
    }
    return (
    <div className="container">
      <div className="jumbotron col-centered col-xs-10 col-sm-8 col-md-7 ">
        <h1>FilmDB</h1>
        <p className="lead">Watch This™</p>
        <h2>Login or create account</h2>
        <br/>
        {error}
        <Input
          label='Username'
          type='text'
          value={this.state.login.username}
          onChange={this.changeHandler.bind(this, 'login', 'username')} />
        <Input
          label='Password'
          type='password'
          value={this.state.login.password}
          onChange={this.changeHandler.bind(this, 'login', 'password')} />
        <Button bsStyle="danger" onClick={this.register.bind(this)}>Create account</Button>
        <Button bsStyle="success" className="pull-right" onClick={this.login.bind(this)}>Sign in</Button>
      </div>
    </div>
    );
  }
}