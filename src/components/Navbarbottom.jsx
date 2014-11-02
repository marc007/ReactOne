/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbarbottom = React.createClass({
  render() {
    return (
		<div className="navbar-footer">
			<div className="container">
			<p className="text-muted">
				{' © MHC '}{this.props.date.getFullYear()}{' • '}
				<Link to="home">Home</Link> {' • '}
				<Link to="privacy">Privacy</Link> {' • '}
				<Link to="login">Login</Link>
			</p>
			</div>
		</div>
    );
  }
});

module.exports = Navbarbottom;
 