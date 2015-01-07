/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Jumbotron = React.createClass({
  render: function() {
    return (
      <div>
        {
          (!this.props.islogged ?
            <div className="jumbotron">
              <div className="container text-center">
                <h1><span className="glyphicon glyphicon-list-alt jumbotron-logo-color"></span> {this.props.AppInfo.name}</h1>
                <p>{this.props.AppInfo.line}</p>
              </div>
            </div>
            :
            <span></span>
          )         
        }
      </div>
    );
  }
});

module.exports = Jumbotron;
