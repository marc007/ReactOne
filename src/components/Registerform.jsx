/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Registerform = React.createClass({
  render() {
    return (
        <div className="registerform">
			<form className="form-signin" role="form">
				<h2 className="form-signin-heading">Please sign in</h2>
				<input type="email" className="form-control" placeholder="Email address" required autofocus />
				<input type="password" className="form-control" placeholder="Password" required />
				<div className="checkbox">
					<label>
					<input type="checkbox" value="remember-me" /> Remember me
					</label>
				</div>
				<button className="btn btn-lg btn-block" type="submit">Sign in</button>
			</form>
		</div>
    );
  }
});

module.exports = Registerform;
