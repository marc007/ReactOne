/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AppRouter = require('./components/Routes.jsx');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(AppRouter(), document.body);