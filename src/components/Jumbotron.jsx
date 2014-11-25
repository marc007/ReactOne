﻿/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Jumbotron = React.createClass({
  render: function() {
    var Sign = (this.props.currentuser === null ?
                    <div className="jumbotron">
                      <div className="container text-center">
                        <h1><span className="glyphicon glyphicon-list-alt jumbotron-logo-color"></span> XL2List</h1>
                        <p>Sharing lists made easier and secure</p>
                      </div>
                    </div>
                    :
                    <span></span>
    );
    return (
      <div>
        {Sign}
      </div>
    );
  }
});

module.exports = Jumbotron;
