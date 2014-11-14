/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LoggedBar = React.createClass({
  loggingOut: function() {
    // ParseUser.doLogout();
    this.props.onUserLogout();
    return;
  },
  render: function() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <span className="navbar-brand" >{'Welcome back, '+this.props.loggeduser.email}</span>
          </li>
          <li>
            <a className="navbar-brand" onClick={this.loggingOut}>Logout</a>
          </li>
        </ul>
    );
  }
});


module.exports = LoggedBar;
