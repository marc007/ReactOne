/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var EditListform = require('../components/EditListform.jsx');

var EditListItem = React.createClass({
  render: function() {
    var li = this.props.listitem;
    var loading = this.props.isloading;
    if (li != null) {
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
    $.ajax({
      url: this.url,
      datatype: 'json',
      success: function(data, key) {
        //var key = this.getParams().keyItem;
        var datafiltered = data.filter(function(item) { return (item.key === key);})
        var li = (datafiltered.length == 1 ? datafiltered : null);
        this.setState({listitem : li, isloading : false});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        this.setState({isloading : false});
      }.bind(this)
    });
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
