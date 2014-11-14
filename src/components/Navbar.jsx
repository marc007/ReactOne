/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LoginBar = require('../components/Loginbar.jsx');
var LoggedBar = require('../components/Loggedbar.jsx');

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
