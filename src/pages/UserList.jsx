/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var UserListPage = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>My Lists</h3>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
