/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var DefaultPage = require('../layouts/DefaultLayout');
var HomePage = require('../pages/Home');
var PrivacyPage = require('../pages/Privacy');
var LoginPage = require('../pages/Login');
var RegisterPage = require('../pages/Register');
var UserListPage = require('../pages/UserList');
var FourOFourPage = require('../pages/FourOFour');
  
var AppRouter = React.createClass({
  render: function() {
    return (
      <Routes location="history" >
        <Route name="app" path="/" handler={DefaultPage} >
          <Route name="home" handler={HomePage} />
          <Route name="privacy" handler={PrivacyPage} />
          <Route name="login" handler={LoginPage} isOnline={isOnline} />
          <Route name="register" handler={RegisterPage} />
          <Route name="userlist" path="/" handler={UserListPage} />
          <DefaultRoute handler={DefaultPage} />
        </Route>
        <NotFoundRoute handler={FourOFourPage}/>
      </Routes>  
    );
  }
});

module.exports = AppRouter;
