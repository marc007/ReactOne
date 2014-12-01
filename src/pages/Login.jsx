/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Loginform = require('../components/Loginform.jsx');

var LoginPage = React.createClass({
    mixins: [Router.Navigation],
    
    statics: {
        attemptedTransition: null
    },
    
    loginUser: function() {
        this.props.onUserLogin();  

        if (LoginPage.attemptedTransition) {
            var transition = LoginPage.attemptedTransition;
            LoginPage.attemptedTransition = null;
            transition.retry();
        } else {
            this.replaceWith('/userlist');
        }    
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
