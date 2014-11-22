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
					<span className="copyright">{' © MHC '}{today.getFullYear()}{' • '}</span>
					<Link className="navbar-logo-color" to="home">Home</Link> {' • '}
					<Link className="navbar-logo-color" to="privacy">Privacy</Link>
				</p>
				</div>
			</div>
    );
  }
});

module.exports = Navbarbottom;
 