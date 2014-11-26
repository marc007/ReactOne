/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var Navbar = require('../components/Navbar');
var Jumbotron = require('../components/Jumbotron');
var Navbarbottom = require('../components/Navbarbottom');

var ParseToolHelper = require('../libs/parse-tool.js');

var DefaultLayout = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        islogged: false
      }
  },
  loginUser: function() {
    this.setState({
      islogged : true
    });
  },
  registerUser: function() {
    this.setState({
      islogged : true
    });
  },
  logoutUser : function() {
    ParseToolHelper.logout();
    this.setState({
      islogged : false
    });
    this.transitionTo('home');
  },
  render: function() {
    var nickname = (this.state.islogged ? ParseToolHelper.ParseUser.nickname : '');
    return (
      <div>
        <Navbar islogged={this.state.islogged} nickname={nickname} onUserLogout={this.logoutUser} />
		    <Jumbotron islogged={this.state.islogged} />
        <this.props.activeRouteHandler onUserLogin={this.loginUser} onUserRegister={this.registerUser}/>
        <Navbarbottom />
      </div>
    );
  }
});

module.exports = DefaultLayout;
