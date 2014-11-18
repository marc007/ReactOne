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
  getInitialState: function() {
    return {
      activelisttype: "Private"
    };
  },
  changeListType: function(newtype,e) {
    e.preventDefault();
    this.setState({activelisttype : newtype});
  },
  render: function() {
    console.log(this.state.activelisttype);
    return (
      <div className="container">
      <nav class="navbar navbar-inverse" role="navigation">
        <div className="container">
          <ul className="nav nav-pills">
            <li role="presentation" onClick={this.changeListType.bind(this, 'Private')} className={(this.state.activelisttype == 'Private'? 'active' : '')}><a href="#">Private</a></li>
            <li role="presentation" onClick={this.changeListType.bind(this, 'Shared')} className={(this.state.activelisttype == 'Shared'? 'active' : '')}><a href="#">Shared</a></li>
            <li role="presentation" onClick={this.changeListType.bind(this, 'Public')} className={(this.state.activelisttype == 'Public'? 'active' : '')}><a href="#">Public</a></li>
          </ul>      
        </div>
      </nav>
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
