/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var listitems = [
  {title: "My Wines", type: "Private"},
  {title: "My Books", type: "Public"}
];

var ListBox = React.createClass({
  getInitialState: function() {
    return {
      listitems : []
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      success: function(data) {
        this.setState({listitems : data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var items = this.state.listitems.map(function (item) {
      return (
        <ListItem key={item.key} item={item} />
      );
    });
    return (
      <div>
        {items}
      </div>
    );
  }
});

var ListItem = React.createClass({
  render: function() {
    return (
      <div className="listitem">
        <li>{this.props.item.title} - {this.props.item.type}</li>
      </div>
    );
  }
});

var UserListPage = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>My Lists</h3>
            <ListBox url="../datas/userlist.json"/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
