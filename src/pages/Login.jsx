/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loginform = require('../components/Loginform.jsx');

Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

// Validate with Parse
var parseLogin = function(lg) {
    // var options = {
    //   username: lg.email,
    //   email: lg.email,
    //   password: lg.password
    // };

    // var user = new Parse.User(options);
    // user.logIn({
    Parse.User.logIn(lg.email, lg.password, {
        success: function(user) {
            console.log('login successful'+user.email);
            return 'login successful';
        },
        error: function(user,error) {
            console.log('login not successful'+error.message);
            return 'login error:'+error.message;
        }
    })
}

var LoginPage = React.createClass({
    getInitialState: function() {
        return {msg: 'try me'};
    },    
    handleLogin: function(login) {
        //var message = parseLogin(login);
        //console.log(message);
        console.log('set State');
        this.setState({msg: parseLogin(login)});
        console.log(this.state.msg);
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
