/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loginform = require('../components/Loginform.jsx');

var LoginPage = React.createClass({
  render() {
    return (
		<div className="container">
			<Loginform />
		</div>
    );
  }
});

module.exports = LoginPage;
