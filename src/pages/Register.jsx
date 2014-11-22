/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Registerform = require('../components/Registerform.jsx');

var RegisterPage = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Registerform />
      </div>
    );
  }
});

module.exports = RegisterPage;
