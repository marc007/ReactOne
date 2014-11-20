/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var EditListform = require('../components/EditListform');

var EditListItem = React.createClass({
  render: function() {
    var li = this.props.listitem;
    if (li != null) {
      return (
        <EditListform isOnline={isOnline} item={li[0]} />
      );
    }
    else
    {
      return (<p>Sorry, Item Not Found!</p>);
    }
  }
});

var EditListPage = React.createClass({
  getInitialState: function() {
    return {
      listitem: null
    };
  },
  componentDidMount: function() {
    var key = this.props.params.keyItem;
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      success: function(data) {
        var key = this.props.params.keyItem;
        var datafiltered = data.filter(function(item) { return (item.key === key);})
        var li = (datafiltered.length == 1 ? datafiltered : null);
        this.setState({listitem : li});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <EditListItem isOnline={isOnline} listitem={this.state.listitem} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditListPage;
