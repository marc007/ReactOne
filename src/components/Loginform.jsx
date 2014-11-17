/**
 * @jsx React.DOM
 */

'use strict';

          // <!-- <input type="email" ref="email" className="form-control" placeholder="Email address" required autofocus /> -->
          // <!-- <input type="password" ref="password" className="form-control" placeholder="Password" required /> -->

var React = require('react');
var Router = require('react-router');
var {Button} = require('react-bootstrap');

// Parse Initialization
// Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

var Loginform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isLoading: false,
        message: '',
        messageclass: 'alert' 
      };
  },
  
  handleLogin: function(e) {
    e.preventDefault();
    
    this.setState({isLoading: true});
    
    var emailtxt = this.refs.email.getDOMNode().value.trim();
    var passwordtxt = this.refs.password.getDOMNode().value.trim();
    if(this.props.isOnline)
    {
      if(!emailtxt || !passwordtxt)
      {
        //return;
      }
      // Parse.User.logIn(email, password, {
      //     success: function(user) {
      //         var currentUser = Parse.User.current();
      //         this.setState({
      //           message : 'login successful!',
      //           messageclass : 'alert alert-info'
      //         });
      //         this.props.onUserLogin(currentUser);
      //         return;
      //     }.bind(this),
      //     error: function(user,error) {
      //         this.setState({
      //           message : 'login not successful! --> '+error.message,
      //           messageclass : 'alert alert-danger'
      //         });
      //         return;
      //     }.bind(this)
      // })
    }
    else
    {
      emailtxt = "test6@test.com";
      passwordtxt = "006";
    }
    var currentUser = {
      email : emailtxt
    }
    setTimeout(function() {

      this.refs.email.getDOMNode().value = '';
      this.refs.password.getDOMNode().value = '';
      this.props.onUserLogin(currentUser);
  
      this.transitionTo('userlist');
      
      this.setState({isLoading: false});
    }.bind(this), 2000);

    return;
  },
  render: function() {
    var isLoading = this.state.isLoading;
    return (
      <div className="loginform">
        <form className="form-signin" role="form">
          <h2 className="form-signin-heading">Login</h2>
          <input type="text" ref="email" className="form-control" placeholder="Email address" />
          <input type="text" ref="password" className="form-control" placeholder="Password" />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" />
            Remember me
            </label>
          </div>
          <Button
            block
            bStyle = 'primary'
            disabled={isLoading}
            onClick={!isLoading ? this.handleLogin : null}>
            {isLoading ? 'Please wait...' : 'Login'}
          </Button>
          <p>
            <div className={this.state.messageclass} role="alert">{this.state.message}</div>
          </p>
        </form>
      </div>
    );
  }
});

module.exports = Loginform;
