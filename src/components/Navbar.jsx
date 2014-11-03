/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = React.createClass({
  render() {
    return (
	<nav class="navbar navbar-default" role="navigation">
      <div className="navbar-top">
        <div className="container">
          <Link className="navbar-brand row" to="home">
            <img src="/images/logo-small.png" width="38" height="38" alt="React" />
            {' XL2List'}
          </Link>
		  <div className="navbar-collapse collapse">
			<ul className="navbar-nav navbar-right">
				<li><Link className="navbar-brand" to="login">Login</Link></li>
				<li><Link className="navbar-brand" to="login">Register</Link></li>
			</ul>
		  </div>
        </div>
      </div>
	</nav>
    );
  }
});

module.exports = Navbar;
