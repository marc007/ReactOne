/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var LoggedBar = React.createClass({
  mixins: [Router.Navigation],
  loggingOut: function() {
    if(this.props.isOnline)
    {
      //ParseUser.doLogout();
    }
    else
    {
    }
    this.props.onUserLogout();
    this.transitionTo('home');
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
