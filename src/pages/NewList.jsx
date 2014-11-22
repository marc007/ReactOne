/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var NewListform = require('../components/NewListform.jsx');

var NewListPage = React.createClass({
  getInitialState: function() {
    return {
      isloading: true
    };
  },
  componentDidMount: function() {
    this.setState({
      isloading : false
    });
  },
  render: function() {
    return (
      <NewListform isOnline={isOnline} listtype={this.props.params.listtype} />
    );
  }
});

module.exports = NewListPage;
