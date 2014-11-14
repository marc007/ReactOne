/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

// Parse Initialization
Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

var Registerform = React.createClass({
  getInitialState: function() {
      return {
        message: '',
        messageclass: 'alert' 
      };
  },    
  handleLogin: function(e) {
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if(!email || !password)
    {
      email = "test6@test.com";
      password = "006";
      //return;
    }
    Parse.User.logIn(email, password, {
        success: function(user) {
            var currentUser = Parse.User.current();
            this.setState({
              message : 'login successful!',
              messageclass : 'alert alert-info'
            });
            this.props.onUserLogin(currentUser);
            return;
        }.bind(this),
        error: function(user,error) {
            this.setState({
              message : 'login not successful! --> '+error.message,
              messageclass : 'alert alert-danger'
            });
            return;
        }.bind(this)
    })
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <div className="loginform">
        <form className="form-signin" role="form" onSubmit={this.handleLogin} >
          <h2 className="form-signin-heading">Registration</h2>
          <input type="text" ref="email" className="form-control" placeholder="Email address" />
          <input type="text" ref="password" className="form-control" placeholder="Password" />
          <button className="btn btn-lg btn-block" type="submit">Register</button>
          <p>
            <div className={this.state.messageclass} role="alert">{this.state.message}</div>
          </p>
        </form>
      </div>
    );
  }
});

module.exports = Registerform;
