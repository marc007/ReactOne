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
            <span className="navbar-brand navbar-logo-color">{this.props.loggeduser.nickname}</span>
          </li>
          <li>
            <button className="form-control btn-info" onClick={this.loggingOut}>Loggout</button>
          </li>
        </ul>
    );
  }
});


module.exports = LoggedBar;
