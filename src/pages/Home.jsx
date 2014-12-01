/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var HomePage = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Welcome Home!</h3>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
