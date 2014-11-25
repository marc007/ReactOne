/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var UserListHelper = require('../models/list-in-memory.js');

var ListItemWrapper = React.createClass({
  render: function() {
      return (
        <Link to="editlist" params={{keyItem: this.props.data.key}} className="list-group-item">{this.props.data.title} - {this.props.data.type} [{this.props.data.key}]</Link>
      );
  }
});

var UserListPage = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
    //console.log('getInitialState');
    return {
      listtype: UserListHelper.Private,
      listitems : [],
      listitemkey: ''
    };
  },
  dataLoaded: function dataloaded() {
    //console.log('dataLoaded');
    this.setState({
      listitems : UserListHelper.getAllOfType(this.state.listtype)
    });
  },
  componentDidMount: function() {
    //console.log('componentDidMount');
    UserListHelper.initialize(this.dataLoaded);
  },
  changeListType: function(newtype, e) {
    e.preventDefault();
    this.setState({
      listitems : UserListHelper.getAllOfType(newtype),
      listtype : newtype      
    });
  },
  newList: function(e) {
    e.preventDefault();
    this.transitionTo('newlist');
  },
  render: function() {
    //console.log('render');
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
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Private)} className={(this.state.listtype == UserListHelper.Private? 'active' : '')}>
                      <a href="#">{UserListHelper.Private} <span className='badge'>{UserListHelper.listitemsprivate.length}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Shared)} className={(this.state.listtype == UserListHelper.Shared? 'active' : '')}>
                      <a href="#">{UserListHelper.Shared} <span className='badge'>{UserListHelper.listitemsshared.length}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Public)} className={(this.state.listtype == UserListHelper.Public? 'active' : '')}>
                      <a href="#">{UserListHelper.Public} <span className='badge'>{UserListHelper.listitemspublic.length}</span></a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="list-group">
                {this.state.listitems.map( function(item) {
                  return <ListItemWrapper key={item.key} data={item}/>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
