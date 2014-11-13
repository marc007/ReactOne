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

var LoggedBar = React.createClass({
  loggingOut: function() {
    ParseUser.doLogout();
    this.props.onUserLogout();
    return;
  },
  render: function() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <span className="navbar-brand" >{'Welcome back, '+this.props.loggeduser.getEmail()}</span>
          </li>
          <li>
            <a className="navbar-brand" onClick={this.loggingOut}>Logout</a>
          </li>
        </ul>
    );
  }
});

var Navbar = React.createClass({
  logoutUser: function() {
    this.props.onUserLogout();
  },
  render: function() {
    var LoginNav = (this.props.currentuser === null ? 
                        <LoginBar /> : 
                        <LoggedBar loggeduser={this.props.currentuser}  onUserLogout={this.logoutUser} />);
    return (
      <nav class="navbar navbar-default" role="navigation">
        <div className="navbar-top">
          <div className="container">
            <Link className="navbar-brand row" to="home">
              <span className="glyphicon glyphicon-list-alt navbar-logo-color"></span> XL2List
            </Link>
            <div className="navbar-collapse collapse">
                {LoginNav}
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
