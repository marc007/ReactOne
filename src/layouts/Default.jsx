/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');
var Navbar = require('../components/Navbar.jsx');
var Jumbotron = require('../components/Jumbotron.jsx');
var Navbarbottom = require('../components/Navbarbottom.jsx');
var today = new Date();

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
		    <Jumbotron />
        <this.props.activeRouteHandler />
        <Navbarbottom date={today} />
      </div>
    );
  }
});

module.exports = DefaultLayout;
