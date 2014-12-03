/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var EditListform = require('../components/EditListform.jsx');
var ParseToolHelper = require('../libs/parse-tool.js');

var EditListItem = React.createClass({
  render: function() {
    var li = this.props.listitem;
    var loading = this.props.isloading;
    if (li != null && li.length == 1) {
      return (
        <EditListform isOnline={isOnline} item={li[0]} />
      );
    }
    else {
      return (loading ? <div className="container"><h1>Loading...</h1></div> : <div className="container"><h1>Sorry, Item Not Found!</h1></div>);
    }
  }
});

var EditListPage = React.createClass({
  mixins: [ Router.State ],
  
  url: '../datas/userlist.json',
  
  getInitialState: function() {
    return {
      isloading: true,
      listitem: null
    };
  },
  componentDidMount: function() {
    var key = this.getParams().keyItem;
    var li = ParseToolHelper.getlistitem(key);
    if(li != null)
    {
      this.setState({
        listitem : li, 
        isloading : false
      });
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <EditListItem isOnline={isOnline} listitem={this.state.listitem} isloading={this.state.isloading} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditListPage;
