/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Loginform = React.createClass({
  handleLogin: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if(!email || !password)
    {
      return;
    }
    this.props.onFormSubmit({email: email, password: password});
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <div className="loginform">
        <form className="form-signin" role="form" onSubmit={this.handleLogin}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <input type="email" ref="email" className="form-control" placeholder="Email address" required autofocus />
          <input type="password" ref="password" className="form-control" placeholder="Password" required />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" />
            Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-block" type="submit">Sign in</button>
          <p>{this.props.message}</p>
        </form>
      </div>
    );
  }
});

module.exports = Loginform;
