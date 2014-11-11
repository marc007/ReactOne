/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Routes, Route, NotFoundRoute, DefaultRoute} = require('react-router');

var DefaultPage = require('./layouts/Default.jsx');
var HomePage = require('./pages/Home.jsx');
var PrivacyPage = require('./pages/Privacy.jsx');
var LoginPage = require('./pages/Login.jsx');
var RegisterPage = require('./pages/Register.jsx');
var FourOFourPage = require('./pages/FourOFour.jsx');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(
  <Routes location="history">
    <Route name="app" path="/" handler={DefaultPage}>
      <Route name="home" path="/" handler={HomePage} />
      <Route name="privacy" handler={PrivacyPage} />
      <Route name="login" handler={LoginPage} />
      <Route name="register" handler={RegisterPage} />
      <DefaultRoute handler={DefaultPage} />
    </Route>
    <NotFoundRoute handler={FourOFourPage}/>
  </Routes>,
  document.body
);
