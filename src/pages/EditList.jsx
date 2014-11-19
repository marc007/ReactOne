/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var EditListPage = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>List {this.props.params.keyItem}</h3>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditListPage;
