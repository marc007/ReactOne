/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var UserList = require('../models/list-in-memory.js');

var ListBox = React.createClass({
  render: function() {
    var items = this.props.listitems.map(function (item) {
      return (
        <Link to="editlist" params={{keyItem: item.key}} className="list-group-item">{item.title} - {item.type}</Link>
      );
    });
    return (
        <span>{items}</span>
    );
  }
});

var UserListPage = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
    console.log('getInitialState');
    return {
      listtype: UserList.Private,
      listitems : [],
      listitemkey: ''
    };
  },
  dataLoaded: function() {
    console.log('dataLoaded');
    this.setState({
      listitems : UserList.getAllOfType(this.state.listtype)
    });
  },
  componentDidMount: function() {
    console.log('componentDidMount');
    UserList.initialize(this.dataLoaded);
  },
  changeListType: function(newtype, e) {
    e.preventDefault();
    this.setState({
      listitems : UserList.getAllOfType(newtype),
      listtype : newtype      
    });
  },
  newList: function(e) {
    e.preventDefault();
    this.transitionTo('newlist');
  },
  addList: function(newlist) {
    var newitems = this.state.listitems;
    newitems.push(newlist);
    this.setState({
      listitems : newitems
    });
  },
  render: function() {
    console.log('render');
    var filter = this.state.listtype;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-8">
                <h3>My Lists</h3>
              </div>
              <div className="col-sm-4">
                <button type="button" className="btn btn-default btn-lg" onClick={this.newList}>Add New List</button>
              </div>
            </div>
            <div className="row">
              <nav class="navbar navbar-inverse" role="navigation">
                <div className="container">
                  <ul className="nav nav-tabs">
                    <li role="presentation" onClick={this.changeListType.bind(this, UserList.Private)} className={(this.state.listtype == UserList.Private? 'active' : '')}>
                      <a href="#">{UserList.Private} <span className='badge'>{UserList.listitemsprivate.length}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserList.Shared)} className={(this.state.listtype == UserList.Shared? 'active' : '')}>
                      <a href="#">{UserList.Shared} <span className='badge'>{UserList.listitemsshared.length}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserList.Public)} className={(this.state.listtype == UserList.Public? 'active' : '')}>
                      <a href="#">{UserList.Public} <span className='badge'>{UserList.listitemspublic.length}</span></a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="list-group">
                <ListBox listitems={this.state.listitems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
