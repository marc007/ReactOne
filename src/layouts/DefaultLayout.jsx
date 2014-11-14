/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Navbar = require('../components/Navbar.jsx');
var Jumbotron = require('../components/Jumbotron.jsx');
var Navbarbottom = require('../components/Navbarbottom.jsx');
var today = new Date();

var DefaultLayout = React.createClass({
  getInitialState: function() {
      return {user: null};
  },
  loginUser: function(usr) {
    this.setState({user : usr});
    this.props.onAuthenticate();
  },
  logoutUser : function() {
    this.setState({user : null});
  },
  render: function() {
    return (
      <div>
        <Navbar currentuser={this.state.user} onUserLogout={this.logoutUser} />
		    <Jumbotron />
        <this.props.activeRouteHandler onUserLogin={this.loginUser} />
        <Navbarbottom date={today} />
      </div>
    );
  }
});

module.exports = DefaultLayout;
