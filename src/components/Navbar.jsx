/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var LoginBar = React.createClass({
  render() {
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
  render() {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link className="navbar-brand" to="home">{'Welcome back, '+this.props.username}</Link>
          </li>
          <li>
            <Link className="navbar-brand" to="home">Logout</Link>
          </li>
        </ul>
      );
  }
});

var Navbar = React.createClass({
  render: function() {
    return (
      <nav class="navbar navbar-default" role="navigation">
        <div className="navbar-top">
          <div className="container">
            <Link className="navbar-brand row" to="home">
              <span className="glyphicon glyphicon-list-alt navbar-logo-color"></span> XL2List
            </Link>
            <div className="navbar-collapse collapse">
                {(this.props.currentuser == '' ? 
                  <LoginBar /> : 
                  <LoggedBar username={this.props.currentuser} />
                )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
