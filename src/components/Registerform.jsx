/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

// Parse Initialization
Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

var Registerform = React.createClass({
  getInitialState: function() {
      return {message: ''};
  },    
  handleLogin: function(e) {
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    //email = "test6@test.com";
    //password = "006";
    if(!email || !password)
    {
      return;
    }
    Parse.User.logIn(email, password, {
        success: function(user) {
            var currentUser = Parse.User.current();
            this.setState({message : 'login successful!'});
            return;
        }.bind(this),
        error: function(user,error) {
            this.setState({message : 'login not successful! --> '+error.message});
            return;
        }.bind(this)
    })
    //this.props.onFormSubmit({email: email, password: password});
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <div className="loginform">
        <form className="form-signin" role="form" onSubmit={this.handleLogin}>
          <h2 className="form-signin-heading">Registration</h2>
          <input type="email" ref="email" className="form-control" placeholder="Email address" required autofocus />
          <input type="password" ref="password" className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-block" type="submit">Register</button>
          <div className="alert alert-danger" role="alert">{this.state.message}</div>
        </form>
      </div>
    );
  }
});

module.exports = Registerform;
