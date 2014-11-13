/**
 * @jsx React.DOM
 */

'use strict';

          // <!-- <input type="email" ref="email" className="form-control" placeholder="Email address" required autofocus /> -->
          // <!-- <input type="password" ref="password" className="form-control" placeholder="Password" required /> -->

var React = require('react');
var Router = require('react-router');

// Parse Initialization
Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

var Loginform = React.createClass({
  getInitialState: function() {
      return {
        message: '',
        messageclass: 'alert' 
      };
  },    
  handleGoHome: function() {
    this.transitionTo('home');
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
          <h2 className="form-signin-heading">Login</h2>
          <input type="text" ref="email" className="form-control" placeholder="Email address" />
          <input type="text" ref="password" className="form-control" placeholder="Password" />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" />
            Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-block" type="submit">Login</button>
          <button className="btn btn-lg btn-block" onClick={this.handleGoHome}>Go Home</button>
          <p>
            <div className={this.state.messageclass} role="alert">{this.state.message}</div>
          </p>
        </form>
      </div>
    );
  }
});

module.exports = Loginform;
