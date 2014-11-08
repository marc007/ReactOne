/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loginform = require('../components/Loginform.jsx');

var LoginPage = React.createClass({
    getInitialState: function() {
        return {msg: ''};
    },    
    handleLogin: function(login) {
        // Validate with Parse
        // Parse.User.logIn(login.email,login.password, {
        //     success: function(object) {
        //         this.setState(message: 'login successful');
        //     },
        //     error: function(error) {
        //         this.setState(message: 'login error:'+error.message);
        //     }
        // });
    },
    render: function() {
        return (
        	<div className="container">
        		<Loginform onFormSubmit={this.handleLogin} message={this.state.msg}/>
        	</div>
        );
    }
});

module.exports = LoginPage;
