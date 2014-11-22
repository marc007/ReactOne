/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loginform = require('../components/Loginform.jsx');

var LoginPage = React.createClass({
    loginUser: function(usr) {
      this.props.onUserLogin(usr);  
    },
    render: function() {
        return (
        	<div className="container">
        		<Loginform isOnline={isOnline} onUserLogin={this.loginUser} />
        	</div>
        );
    }
});

module.exports = LoginPage;
