/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var Navbar = require('../components/Navbar');
var Jumbotron = require('../components/Jumbotron');
var Navbarbottom = require('../components/Navbarbottom');

var DefaultLayout = React.createClass({
  getInitialState: function() {
      return {user: null};
  },
  loginUser: function(usr) {
    this.setState({user : usr});
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
        <Navbarbottom />
      </div>
    );
  }
});

module.exports = DefaultLayout;
