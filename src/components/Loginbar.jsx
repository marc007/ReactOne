/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LoginBar = React.createClass({
  mixins: [Router.Navigation],
  loggingIn: function() {
    this.transitionTo('login');
  },
  register: function() {
    this.transitionTo('register');
  },
  render: function() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button className="form-control btn-info" onClick={this.loggingIn}>Login</button>
          </li>
          <li>
            <button className="form-control btn-info" onClick={this.register}>Register</button>
          </li>
        </ul>
      );
  }
});

module.exports = LoginBar;
