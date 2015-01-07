/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');

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
    var nickname = (this.state.islogged ? ParseToolHelper.loggeduser.nickname : '');
    return (
      <DocumentTitle title={this.props.AppInfo.name}>
        <div>
          <Navbar AppInfo={this.props.AppInfo} islogged={this.state.islogged} nickname={nickname} onUserLogout={this.logoutUser} />
  		    <Jumbotron AppInfo={this.props.AppInfo} islogged={this.state.islogged} />
          <RouteHandler islogged={this.state.islogged} onUserLogin={this.loginUser} onUserRegister={this.registerUser}/>
          <Navbarbottom />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = DefaultLayout;
