/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var LoggedBar = React.createClass({
  loggingOut: function() {
    this.props.onUserLogout();
  },
  render: function() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <span className="navbar-brand navbar-logo-color">{this.props.usernickname}</span>
          </li>
          <li>
            <button className="form-control btn-info" onClick={this.loggingOut}>Logout</button>
          </li>
        </ul>
    );
  }
});


module.exports = LoggedBar;
