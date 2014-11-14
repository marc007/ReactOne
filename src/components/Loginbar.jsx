/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LoginBar = React.createClass({
  render: function() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link className="navbar-brand" to="login">Login</Link>
          </li>
          <li>
            <Link className="navbar-brand" to="register">Register</Link>
          </li>
        </ul>
      );
  }
});

module.exports = LoginBar;
