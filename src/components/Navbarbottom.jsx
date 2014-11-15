/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var today = new Date();

var Navbarbottom = React.createClass({
  render: function(){
    return (
			<div className="navbar-footer">
				<div className="container">
				<p className="text-muted">
					{' © MHC '}{today.getFullYear()}{' • '}
					<Link to="home">Home</Link> {' • '}
					<Link to="privacy">Privacy</Link>
				</p>
				</div>
			</div>
    );
  }
});

module.exports = Navbarbottom;
 