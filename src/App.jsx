/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var AppRouter = require('./components/AppRouter');

// Export React so the dev tools can find it
if('production' != process.env.NODE_ENV)
{
    (window !== window.top ? window.top : window).React = React;
}

React.render(<AppRouter />, document.body);