/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loginform = require('../components/Loginform.jsx');

var LoginPage = React.createClass({
    loginUser: function() {
      this.props.onUserLogin();  
    },
    render: function() {
        return (
        	<div className="container">
        		<Loginform onUserLogin={this.loginUser} />
        	</div>
        );
    }
});

module.exports = LoginPage;
