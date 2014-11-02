/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Jumbotron = React.createClass({
  render() {
    return (
        <div className="jumbotron">
          <div className="container text-center">
            <h1>XL2List</h1>
            <p>EXCEL to list made easier</p>
          </div>
        </div>
    );
  }
});

module.exports = Jumbotron;
