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

var DefaultPage = require('../layouts/DefaultLayout.jsx');
var HomePage = require('../pages/Home.jsx');
var PrivacyPage = require('../pages/Privacy.jsx');
var LoginPage = require('../pages/Login.jsx');
var RegisterPage = require('../pages/Register.jsx');
var FourOFourPage = require('../pages/FourOFour.jsx');

var AppRouter = React.createClass({
  authenticated: function() {
    // this.transitionTo('home');
  },
  render: function() {
    return (
      <Routes location="history" >
        <Route name="app" path="/" handler={DefaultPage} onAuthenticate={this.authenticated} >
          <Route name="home" path="/" handler={HomePage} />
          <Route name="privacy" handler={PrivacyPage} />
          <Route name="login" handler={LoginPage} isOnline={isOnline} />
          <Route name="register" handler={RegisterPage} />
          <DefaultRoute handler={DefaultPage} />
        </Route>
        <NotFoundRoute handler={FourOFourPage}/>
      </Routes>
    );
  }
});

module.exports = AppRouter;
